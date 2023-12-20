/* eslint-disable @typescript-eslint/indent */
import { makeStyles } from '@material-ui/core'
import { useEffect, useState } from 'react'
import colors from '@/shared-ui/colors'
import { Button, Typography, OTPInput } from '@/shared-ui/components'
import { registerSlice } from 'src/redux/slicers'
import {
  sendPrimaryMFAByEmailAction,
  verifyPrimaryOTPAction,
  validateSecondaryMFACodeAction,
  sendSecondaryMFAByEmailAction,
} from 'src/redux/actions/register'
import { useDispatch, useSelector } from 'react-redux'
import ActionModal from '../components/ActionModal'
import ModalWrapper from '../components/ModalWrapper'
import TimeoutMessage from '../components/TimeoutMessage'
import { State } from 'src/redux/types'
import { maskEmail } from 'src/utils/register'
import { RegisterStep } from 'src/redux/types/registerTypes'
import { useAppData, usePageLoadEvents, useWindowDimensions } from 'src/hooks'
import {
  authorizationType,
  authorizationMethodsType,
} from 'src/constants/register'
import {
  CUSTOMER,
  SERVICEABLE,
  REG_SUNVERIFIED_MODAL,
  REG_SUNVERIFIED_CONTINUE,
  WIFI,
  WIFI_REGISTRATION,
  VERIFY_SECONDARY_OTP,
} from 'src/constants'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { formatUrl } from 'src/utils/urlHelpers'
import { getMethod } from '../util'

const VerifyEmailOTP = () => {
  const classes = useStyles()
  const otpEmail = useAppData('OTPEmail', true) || {}
  const securityTimeout = useAppData('securityTimeout', true) || {}
  const unverifiedContactMethod =
    useAppData('unverifiedContactMethod', true) || {}

  const {
    confirmMFA,
    email,
    isAddressVerified,
    isIPAddressVerified,
    isPhoneVerified,
    authorizationMethods,
    accountInformation,
    flowType,
  } = useSelector((state: State) => state.register)
  const {
    isBusy,
    failedReason,
    remainingAttempts,
    isAccountLocked,
    hasReachedMaxEmailAttempts,
    emailFailedReason,
    accountLockedUntil,
  } = confirmMFA || {}

  const isPrimaryVerificationDone = !!accountInformation

  const mobileDevice = 767
  const { width } = useWindowDimensions()
  const isMobile = width <= mobileDevice
  const hasPhoneMethod = getMethod(
    authorizationMethods,
    authorizationMethodsType.MFA_SMS,
  )

  const [OTPvalue, setOTPValue] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const [failedOTP, setFailedOTP] = useState(false)
  const [showNewCodeSentMessage, setShowNewCodeSentMessage] = useState(false)
  const dispatch = useDispatch()

  const isOTPValid = OTPvalue.length === 6
  const isWIFI = flowType === WIFI
  const pageStr = isWIFI
    ? WIFI_REGISTRATION.VERIFY_ACCOUNT_EMAIL
    : VERIFY_SECONDARY_OTP

  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: pageStr,
      eVar22: CUSTOMER,
      eVar49: SERVICEABLE,
      events: 'event68',
      eVar68: pageStr,
    },
  })

  useEffect(() => {
    if (isAccountLocked) {
      if (
        flowType != authorizationType.LAST_NAME_AND_ADDRESS ||
        (flowType == authorizationType.LAST_NAME_AND_ADDRESS &&
          hasReachedMaxEmailAttempts)
      ) {
        setOTPValue('')
        setOpenDialog(true)
      }
    }
  }, [isAccountLocked])

  useEffect(() => {
    if (failedReason) {
      if (
        flowType != authorizationType.LAST_NAME_AND_ADDRESS ||
        (flowType == authorizationType.LAST_NAME_AND_ADDRESS &&
          emailFailedReason)
      ) {
        setFailedOTP(true)
        setOTPValue('')
      }
    }
  }, [failedReason])

  const onSubmit = async () => {
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: 'Registration: Submit Email OTP',
      },
      'tl_o',
    )
    if (isAddressVerified || (isIPAddressVerified && isPhoneVerified)) {
      dispatch(
        validateSecondaryMFACodeAction(
          OTPvalue,
          'EMAIL',
          getStepPostOTPVerification(),
        ),
      )
    } else {
      dispatch(
        verifyPrimaryOTPAction(
          parseInt(OTPvalue),
          'EMAIL',
          getStepPostOTPVerification(),
        ),
      )
    }
  }
  const getStepPostOTPVerification = (): RegisterStep => {
    if (isWIFI) {
      return isPhoneVerified
        ? 'CREATE_PASSWORD'
        : hasPhoneMethod
        ? 'CONFIRM_MOBILE'
        : 'ADD_NEW_MOBILE_NUMBER'
    } else {
      return isAddressVerified ? 'CREATE_PASSWORD' : 'CONFIRM_ADDRESS'
    }
  }

  const onHandleShowSentCodeMessage = () => {
    setShowNewCodeSentMessage(true)
    setTimeout(() => {
      setShowNewCodeSentMessage(false)
    }, 5000)
  }

  const handleResendCode = () => {
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: 'Registration: Resend Email OTP code',
      },
      'tl_o',
    )
    if (isAddressVerified || (isIPAddressVerified && isPhoneVerified)) {
      dispatch(sendSecondaryMFAByEmailAction(onHandleShowSentCodeMessage))
    } else {
      dispatch(sendPrimaryMFAByEmailAction(onHandleShowSentCodeMessage))
    }
    setShowNewCodeSentMessage(true)
    setOTPValue('')
  }

  const proceedToCreatePwd = () => {
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: REG_SUNVERIFIED_CONTINUE,
      },
      'tl_o',
    )
    setOpenDialog(false)
    dispatch(registerSlice.actions.setStep('CREATE_PASSWORD'))
  }

  const securityTimeoutModalData = {
    title: securityTimeout.title,
    info: securityTimeout.info,
    info1: { value: <TimeoutMessage timeout={accountLockedUntil || ''} /> },
    btn1: {
      text: securityTimeout.btn1,
    },
    supportInfo: otpEmail.supportInfo?.value,
    supportLink: otpEmail.supportLink?.value,
    supportUrl: otpEmail.supportUrl?.value,
  }

  const unverifiedContactMethodModalData = {
    title: unverifiedContactMethod.title,
    info: unverifiedContactMethod.info,
    btn1: {
      text: unverifiedContactMethod.btn1,
    },
    hideChatWithUsMsg: true,
    trackingPageName: REG_SUNVERIFIED_MODAL,
  }

  const getModalContentForAccountLockout = () => {
    if (isAddressVerified) {
      return (
        <ActionModal
          data={unverifiedContactMethodModalData}
          btn1Handler={proceedToCreatePwd}
        />
      )
    } else {
      return (
        <ActionModal
          data={securityTimeoutModalData}
          btn1Handler={dismissModal}
          handleClose={dismissModal}
        />
      )
    }
  }

  const getDisplayEmail = () => {
    if (isAddressVerified) {
      return email
    }
    const filteredMethod = authorizationMethods?.find(
      ({ method }) => method === authorizationMethodsType.MFA_EMAIL,
    )
    if (!email && filteredMethod?.maskedDeliveryLocation) {
      return filteredMethod?.maskedDeliveryLocation
    }
    if (isPrimaryVerificationDone || !filteredMethod) {
      return maskEmail(email ?? '')
    }
    return filteredMethod?.maskedDeliveryLocation
  }

  const dismissModal = () => {
    if (isWIFI) {
      window.location.href = formatUrl('/login')
    } else {
      setOpenDialog(false)
      dispatch(registerSlice.actions.resetRegistrationFlow())
    }
  }

  const infoText = failedOTP
    ? otpEmail.incorrectInfoText2?.value
    : otpEmail.info?.value

  const displayEmail = getDisplayEmail()

  const resentOTPStyleStyle = isMobile ? 'p1' : 'p3'
  return (
    <div>
      <Typography styleType="h4" tagType="h3" className={classes.title}>
        {failedOTP ? otpEmail.incorrectCodeText?.value : otpEmail.title?.value}
      </Typography>
      {remainingAttempts != null && (
        <Typography
          styleType="p1"
          fontType="boldFont"
          tagType="p"
          className={classes.info}
          data-tid="remaining-attempts"
        >
          {otpEmail.incorrectInfoText?.value.replace(
            '{{count}}',
            remainingAttempts.toString(),
          )}
        </Typography>
      )}
      <div className={classes.info}>
        <Typography
          styleType="p1"
          fontType={failedOTP ? '' : 'boldFont'}
          data-tid="otp-title"
        >
          {`${infoText + ' ' + displayEmail}`}
        </Typography>
      </div>
      <OTPInput
        value={OTPvalue}
        onChange={setOTPValue}
        isInvalidOTP={!!failedOTP}
        invalidOTPMessage={otpEmail.invalidOTPMessage?.value}
      />
      <Typography
        styleType="p1"
        className={classes.description}
        data-tid="code-expiry"
      >
        {otpEmail.codeExpiry?.value}
      </Typography>
      {!failedOTP && (
        <Typography styleType="p1" className={classes.description}>
          {otpEmail.disclaimer?.value}
        </Typography>
      )}
      <Button
        type="button"
        variant="primary"
        hoverVariant="primary"
        className={classes.continueBtn}
        text={otpEmail.confirmBtnText?.value}
        onClick={onSubmit}
        data-tid="submit-btn"
        disabled={!isOTPValid}
        isBusy={isBusy}
      />
      {showNewCodeSentMessage ? (
        <Typography fontType="boldFont" className={classes.newCodeSent}>
          New code sent!
        </Typography>
      ) : (
        <div className={classes.textCenter}>
          {isWIFI && (
            <Typography styleType={resentOTPStyleStyle} tagType="span">
              {otpEmail.codeNotRecieved?.value}
            </Typography>
          )}
          <button
            disabled={isBusy || showNewCodeSentMessage}
            onClick={handleResendCode}
            className={classes.tryAnotherWayText}
            data-tid="resend-code-btn"
          >
            <Typography
              fontType="boldFont"
              className={
                showNewCodeSentMessage
                  ? undefined
                  : classes.tryAnotherWayTypography
              }
            >
              {otpEmail.UpdateNumberLink?.value}
            </Typography>
          </button>
        </div>
      )}
      <ModalWrapper
        isOpen={openDialog}
        handleClose={dismissModal}
        modalContent={getModalContentForAccountLockout()}
      />
    </div>
  )
}

const useStyles = makeStyles(() => ({
  title: {
    textAlign: 'center',
    margin: ' 0rem auto 2rem auto',
  },
  info: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 16,
  },
  description: {
    margin: '32px 0',
  },
  continueBtn: {
    margin: '32px auto',
    maxWidth: 246,
    display: 'block',
  },
  textCenter: {
    textAlign: 'center',
  },
  tryAnotherWayText: {
    background: 'transparent',
    border: 0,
    textDecoration: 'underline',
    cursor: 'pointer',
    '&:hover': {
      color: `${colors.main.brightRed} !important`,
    },
    '&:disabled': {
      opacity: 0.5,
      '&:hover': {
        color: `${colors.main.dark} !important`,
        cursor: 'not-allowed',
      },
    },
  },
  tryAnotherWayTypography: {
    '&:hover': {
      color: `${colors.main.brightRed} !important`,
    },
  },
  newCodeSent: {
    textAlign: 'center',
    marginTop: 8,
    paddingTop: 2,
  },
}))

export default VerifyEmailOTP
