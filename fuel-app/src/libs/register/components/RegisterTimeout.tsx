import { useIdleTimer } from 'react-idle-timer'
import { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerSlice } from 'src/redux/slicers'
import { State } from 'src/redux/types'
import ActionModal from './ActionModal'
import ModalWrapper from './ModalWrapper'
import useAppData from '@/shared-ui/hooks/useAppData'
import { REG_SECURITY_TIMEOUT } from 'src/constants'

const TIMEOUT_WARNING = 15 * 60 * 1000 // 15 mins
const SESSION_TIMEOUT = 5 * 60 * 1000 // 5 mins

const RegisterTimeout = ({ children }: { children: JSX.Element }) => {
  const [showIdealSessionWarning, setShowIdealSessionWarning] = useState(false)
  const [showSessionTimedOutMessage, setShowSessionTimedOutMessage] =
    useState(false)
  const [isTimedOut, setIsTimedOut] = useState(false)
  const dispatch = useDispatch()
  const { step, isAddressVerified } =
    useSelector((state: State) => state?.register) || {}
  const registerTimeout = useAppData('registerTimeout', true)

  const shouldShowSecOTPMsg = useMemo(() => {
    return (
      (step === 'VERIFY_EMAIL_OTP' || step === 'VERIFY_MOBILE_OTP') &&
      isAddressVerified
    )
  }, [step, isAddressVerified])

  const onIdle = () => {
    if (
      step !== 'REGISTER_WITH_EMAIL_OR_MOBILE' &&
      step !== 'REGISTER_WITH_NAME_AND_ADDRESS' &&
      !showSessionTimedOutMessage
    ) {
      setShowIdealSessionWarning(true)
      startSessionTimer()
    }
  }

  const restartRegistrationFlow = () => {
    if (window?.location?.reload) {
      window.location.reload()
    } else {
      dispatch(registerSlice.actions.resetRegistrationFlow())
      setShowSessionTimedOutMessage(false)
    }
  }

  const startSessionTimer = () => {
    setTimeout(() => {
      setIsTimedOut(true)
    }, SESSION_TIMEOUT)
  }

  useEffect(() => {
    if (isTimedOut && showIdealSessionWarning) {
      setShowIdealSessionWarning(false)
      setShowSessionTimedOutMessage(true)
      setIsTimedOut(false)
    }
  }, [isTimedOut, showSessionTimedOutMessage, showIdealSessionWarning])

  useIdleTimer({
    timeout: TIMEOUT_WARNING,
    onIdle: onIdle,
  })

  return (
    <div data-tid="timeout-modal-wrapper">
      <>{children}</>
      <ModalWrapper
        isOpen={showIdealSessionWarning}
        handleClose={() => setShowIdealSessionWarning(false)}
        modalContent={
          <ActionModal
            data={{
              title: registerTimeout?.warningTimeoutTitle,
              info: registerTimeout?.warningTimeoutSubtitle,
              info1: registerTimeout?.warningTimeoutInfo,
              btn1: {
                text: registerTimeout?.warningTimeoutButton,
              },
              trackingPageName: REG_SECURITY_TIMEOUT,
            }}
            btn1Handler={() => setShowIdealSessionWarning(false)}
            handleClose={() => setShowIdealSessionWarning(false)}
          />
        }
      />
      <ModalWrapper
        isOpen={showSessionTimedOutMessage}
        handleClose={restartRegistrationFlow}
        modalContent={
          <ActionModal
            data={{
              title: registerTimeout?.sessionTimeoutTitle,
              info: shouldShowSecOTPMsg
                ? registerTimeout?.sessionTimeoutSecOTPSubtitle
                : registerTimeout?.sessionTimeoutSubtitle,
              info1: shouldShowSecOTPMsg
                ? registerTimeout?.sessionTimeoutSecOTPInfo
                : registerTimeout?.sessionTimeoutInfo,
              btn1: {
                text: registerTimeout?.sessionTimeoutButton,
              },
              trackingPageName: REG_SECURITY_TIMEOUT,
            }}
            btn1Handler={restartRegistrationFlow}
            handleClose={restartRegistrationFlow}
          />
        }
      />
    </div>
  )
}

export default RegisterTimeout
