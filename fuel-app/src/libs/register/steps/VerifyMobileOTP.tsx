/* eslint-disable @typescript-eslint/indent */
import { makeStyles } from '@material-ui/core'
import { useEffect, useMemo, useState } from 'react'
import colors from '@/shared-ui/colors'
import { Button, Typography, OTPInput } from '@/shared-ui/components'
import { registerSlice } from 'src/redux/slicers'
import {
  verifyPrimaryOTPAction,
  validateSecondaryMFACodeAction,
  sendPrimaryMFAByPhoneAction,
  sendSecondaryMFAByPhoneAction,
} from 'src/redux/actions/register'
import { useDispatch, useSelector } from 'react-redux'
import ModalWrapper from '../components/ModalWrapper'
import ActionModal from '../components/ActionModal'
import TimeoutMessage from '../components/TimeoutMessage'
import { State } from 'src/redux/types'
import { maskEmail, maskPhoneNumber } from 'src/utils/register'
import { RegisterStep } from 'src/redux/types/registerTypes'
import { useAppData, usePageLoadEvents, useWindowDimensions } from 'src/hooks'
import {
  CUSTOMER,
  SERVICEABLE,
  ACCOUNT_EXISTS_ALREADY,
  REG_SUNVERIFIED_MODAL,
  REG_SUNVERIFIED_CONTINUE,
  REG_ACCOUNTEXISTSMODAL_LOGIN,
  REG_ACCOUNTEXISTSMODAL_FORGOTPWD,
  WIFI,
  WIFI_REGISTRATION,
  VERIFY_SECONDARY_OTP,
} from 'src/constants'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { addBracketAndHypen } from 'src/utils/mobile-helpers'
import {
  authorizationType,
  authorizationMethodsType,
} from 'src/constants/register'
import { getMethod } from '../util'
import { formatUrl } from 'src/utils/urlHelpers'

const VerifyMobileOTP = () => {
  const classes = useStyles()
  const otpMobile = useAppData('OTPMobile', true) || {}
  const securityTimeout = useAppData('securityTimeout', true) || {}
  const unverifiedContactMethod =
    useAppData('unverifiedContactMethod', true) || {}
  const nameAndAddressAccountExisting = useAppData(
    'nameAndAddressAccountExisting',
    true,
  )
  const nameOrServiceAddressNotFound = useAppData(
    'nameOrServiceAddressNotFound',
    true,
  )

  const {
    confirmMFA,
    phone,
    isAddressVerified,
    isIPAddressVerified,
    isEmailVerified,
    accountInformation,
    authorizationMethods,
    email,
    flowType,
  } = useSelector((state: State) => state.register)
  const {
    isBusy,
    failedReason,
    remainingAttempts,
    isAccountLocked,
    accountLockedUntil,
  } = confirmMFA || {}
  const isPrimaryVerificationDone = !!accountInformation

  const mobileDevice = 768
  const { width } = useWindowDimensions()
  const isMobile = width <= mobileDevice
  const hasEmailMethod = getMethod(
    authorizationMethods,
    authorizationMethodsType.MFA_EMAIL,
  )
  // State management
  const [OTPvalue, setOTPValue] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const [openAlreadyRegisteredDialog, setOpenAlreadyRegisteredDialog] =
    useState(false)
  const [showNewCodeSentMessage, setShowNewCodeSentMessage] = useState(false)
  const dispatch = useDispatch()
  const isWIFI = flowType === WIFI
  const pageStr = isWIFI
    ? WIFI_REGISTRATION.VERIFY_ACCOUNT_MOBILE
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
  const handleSignIn = () => {
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: REG_ACCOUNTEXISTSMODAL_LOGIN,
      },
      'tl_o',
    )
    setOpenDialog(false)
    window.location.href = formatUrl('/login')
  }

  const handleResetPassword = () => {
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: REG_ACCOUNTEXISTSMODAL_FORGOTPWD,
      },
      'tl_o',
    )
    setOpenDialog(false)
    window.location.href = formatUrl('/forgot-password')
  }

  const emailInfo = useMemo(() => {
    const info2Text = nameAndAddressAccountExisting?.info2?.value?.replace(
      '{{emailAddress}}',
      maskEmail(email ?? ''),
    )
    return (
      <div>
        <Typography fontType="boldFont">{info2Text}</Typography>
      </div>
    )
  }, [email])

  const accountAlreadyExistsMobileModalData = {
    title: nameAndAddressAccountExisting?.title,
    info: nameAndAddressAccountExisting?.info1,
    info1: { value: emailInfo },
    btn1: {
      text: nameAndAddressAccountExisting?.signInBtnText,
    },
    btn2: {
      text: nameAndAddressAccountExisting?.resetPasswordText,
    },
    supportInfo: nameAndAddressAccountExisting?.supportInfoText,
    supportLink: {
      value: nameOrServiceAddressNotFound?.contactSupportText?.value,
    },
    supportUrl: {
      value: nameOrServiceAddressNotFound?.contactSupportLink?.value,
    },
    trackingPageName: ACCOUNT_EXISTS_ALREADY,
  }

  const getModalContent = () => {
    return (
      <ActionModal
        data={accountAlreadyExistsMobileModalData}
        btn1Handler={handleSignIn}
        btn2Handler={handleResetPassword}
        handleClose={dismissModal}
      />
    )
  }

  useEffect(() => {
    if (isAccountLocked) {
      setOTPValue('')
      setOpenDialog(true)
    }
  }, [isAccountLocked])

  useEffect(() => {
    if (failedReason) {
      setOTPValue('')
      if (failedReason === authorizationType.MOBILE_ALREADY_REGISTERED) {
        setOpenAlreadyRegisteredDialog(true)
      }
    }
  }, [failedReason])
  const onSubmit = async () => {
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: 'Registration: Submit Mobile OTP',
      },
      'tl_o',
    )
    if (isAddressVerified || (isIPAddressVerified && isEmailVerified)) {
      dispatch(
        validateSecondaryMFACodeAction(
          OTPvalue,
          'PHONE',
          getStepPostOTPVerification(),
        ),
      )
    } else {
      dispatch(
        verifyPrimaryOTPAction(
          parseInt(OTPvalue),
          'PHONE',
          getStepPostOTPVerification(),
        ),
      )
    }
  }

  const getStepPostOTPVerification = (): RegisterStep => {
    if (isWIFI) {
      return isEmailVerified
        ? 'CREATE_PASSWORD'
        : hasEmailMethod
        ? 'CONFIRM_EMAIL'
        : 'ADD_NEW_EMAIL_ADDRESS'
    } else {
      if (isAddressVerified) {
        if (flowType == authorizationType.EMAIL) {
          return 'CREATE_PASSWORD'
        }
        return email ? 'CONFIRM_EMAIL' : 'ADD_NEW_EMAIL_ADDRESS'
      }
      return 'CONFIRM_ADDRESS'
    }
  }

  const dismissModal = () => {
    if (isWIFI) {
      window.location.href = formatUrl('/login')
    } else {
      openDialog ? setOpenDialog(false) : setOpenAlreadyRegisteredDialog(false)
      dispatch(registerSlice.actions.resetRegistrationFlow())
    }
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
    if (flowType == authorizationType.LAST_NAME_AND_ADDRESS) {
      dispatch(
        registerSlice.actions.setStep(
          email ? 'CONFIRM_EMAIL' : 'ADD_NEW_EMAIL_ADDRESS',
        ),
      )
    } else {
      dispatch(registerSlice.actions.setStep('CREATE_PASSWORD'))
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
        eVar14: 'Registration: Resend Mobile OTP',
      },
      'tl_o',
    )
    if (isAddressVerified || (isIPAddressVerified && isEmailVerified)) {
      dispatch(sendSecondaryMFAByPhoneAction(onHandleShowSentCodeMessage))
    } else {
      dispatch(sendPrimaryMFAByPhoneAction(onHandleShowSentCodeMessage))
    }
    setOTPValue('')
  }

  const securityTimeoutModalData = {
    title: securityTimeout.title,
    info: securityTimeout.info,
    info1: { value: <TimeoutMessage timeout={accountLockedUntil || ''} /> },
    btn1: {
      text: securityTimeout.btn1,
    },
    supportInfo: otpMobile.supportInfo?.value,
    supportLink: otpMobile.supportLink?.value,
    supportUrl: otpMobile.supportUrl?.value,
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

  const getDisplayPhone = () => {
    if (isAddressVerified) {
      return addBracketAndHypen(`${phone ?? ''}`)
    }
    const filteredMethod = authorizationMethods?.find(
      ({ method }) => method === authorizationMethodsType.MFA_SMS,
    )
    if (isPrimaryVerificationDone || !filteredMethod) {
      return maskPhoneNumber(phone ?? '') ?? ''
    }
    return filteredMethod?.maskedDeliveryLocation
  }

  const infoText = failedReason
    ? otpMobile.incorrectInfoText2?.value
    : otpMobile.info?.value

  const displayPhone = getDisplayPhone()

  const resentOTPStyle = isMobile ? 'p1' : 'p3'

  return (
    <div>
      <Typography styleType="h4" tagType="h3" className={classes.title}>
        {failedReason
          ? otpMobile.incorrectCodeText?.value
          : otpMobile.title?.value}
      </Typography>
      {remainingAttempts != null && (
        <Typography
          styleType="p1"
          fontType="boldFont"
          tagType="p"
          className={classes.info}
          data-tid="remaining-attempts"
        >
          {otpMobile.incorrectInfoText?.value.replace(
            '{{count}}',
            remainingAttempts.toString(),
          )}
        </Typography>
      )}
      <div className={classes.info}>
        <Typography
          styleType="p1"
          fontType={failedReason ? '' : 'boldFont'}
          data-tid="otp-title"
        >
          {`${infoText + ' ' + displayPhone}`}
        </Typography>
      </div>
      <OTPInput
        value={OTPvalue}
        onChange={setOTPValue}
        isInvalidOTP={!!failedReason}
        invalidOTPMessage={otpMobile.invalidOTPMessage?.value}
      />
      <Typography styleType="p1" tagType="p" className={classes.description}>
        {otpMobile.info2?.value}
      </Typography>
      <Button
        type="button"
        variant="primary"
        hoverVariant="primary"
        className={classes.continueBtn}
        text={otpMobile.confirmBtnText?.value}
        onClick={onSubmit}
        disabled={OTPvalue.length !== 6}
        isBusy={isBusy}
        data-tid="submit-btn"
      />
      {showNewCodeSentMessage ? (
        <Typography fontType="boldFont" className={classes.newCodeSent}>
          New code sent!
        </Typography>
      ) : (
        <div className={classes.resendCodeContainer}>
          {isWIFI && (
            <Typography styleType={resentOTPStyle} tagType="span">
              {otpMobile.codeNotRecieved?.value}
            </Typography>
          )}
          <Button
            type="button"
            variant="lite"
            hoverVariant="primary"
            className={classes.updateLinkBtn}
            onClick={handleResendCode}
            disabled={showNewCodeSentMessage}
            text={otpMobile.UpdateNumberLink?.value}
            data-tid="resend-code-btn"
          />
        </div>
      )}
      <ModalWrapper
        isOpen={openDialog}
        handleClose={dismissModal}
        modalContent={getModalContentForAccountLockout()}
      />
      <ModalWrapper
        isOpen={openAlreadyRegisteredDialog}
        handleClose={dismissModal}
        modalContent={getModalContent()}
      />
    </div>
  )
}

const useStyles = makeStyles(() => ({
  resendCodeContainer: {
    textAlign: 'center',
  },
  title: {
    textAlign: 'center',
    margin: ' 0rem auto 2rem auto',
  },
  info: {
    marginBottom: 16,
    display: 'flex',
    flexDirection: 'row',
  },
  description: {
    margin: '32px 0',
  },
  error: {
    color: `${colors.main.error}`,
    marginLeft: 8,
  },
  continueBtn: {
    margin: '32px auto',
    maxWidth: 246,
    display: 'block',
  },
  updateLinkBtn: {
    marginLeft: 6,
    minWidth: 100,
    textDecoration: 'underline',
    cursor: 'pointer',
    textAlign: 'center',
    margin: 'auto',
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
  newCodeSent: {
    textAlign: 'center',
    paddingTop: 12,
    marginBottom: 12,
  },
}))

export default VerifyMobileOTP
