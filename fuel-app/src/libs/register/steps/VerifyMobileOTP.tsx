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
import { useAppData, usePageLoadEvents } from 'src/hooks'
import {
  VERIFY_PRIMARY_OTP,
  VERIFY_SECONDARY_OTP,
  CUSTOMER,
  SERVICEABLE,
  ACCOUNT_EXISTS_ALREADY,
  REG_SUNVERIFIED_MODAL,
  REG_SUNVERIFIED_CONTINUE,
  REG_ACCOUNTEXISTSMODAL_LOGIN,
  REG_ACCOUNTEXISTSMODAL_FORGOTPWD,
} from 'src/constants'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { addBracketAndHypen } from 'src/utils/mobile-helpers'

const VerifyMobileOTP = () => {
  const classes = useStyles()
  const {
    title,
    incorrectCodeText,
    info,
    info2,
    incorrectInfoText,
    incorrectInfoText2,
    confirmBtnText,
    UpdateNumberLink,
    supportUrl,
    supportInfo,
    supportLink,
    invalidOTPMessage,
  } = useAppData('OTPMobile', true)
  const securityTimeout = useAppData('securityTimeout', true)
  const unverifiedContactMethod = useAppData('unverifiedContactMethod', true)
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

  // State management
  const [OTPvalue, setOTPValue] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const [openAlreadyRegisteredDialog, setOpenAlreadyRegisteredDialog] =
    useState(false)
  const [showNewCodeSentMessage, setShowNewCodeSentMessage] = useState(false)
  const dispatch = useDispatch()

  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: isAddressVerified ? VERIFY_SECONDARY_OTP : VERIFY_PRIMARY_OTP,
      eVar22: CUSTOMER,
      eVar49: SERVICEABLE,
      events: 'event68',
      eVar68: isAddressVerified ? VERIFY_SECONDARY_OTP : VERIFY_PRIMARY_OTP,
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
    window.location.href = '/login'
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
    window.location.href = '/forgot-password'
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
      if (failedReason === 'MOBILE_ALREADY_REGISTERED') {
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
    if (isAddressVerified) {
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
    if (isAddressVerified) {
      if (flowType == 'EMAIL') {
        return 'CREATE_PASSWORD'
      }
      return email ? 'CONFIRM_EMAIL' : 'ADD_NEW_EMAIL_ADDRESS'
    }
    return 'CONFIRM_ADDRESS'
  }

  const dismissModal = () => {
    openDialog ? setOpenDialog(false) : setOpenAlreadyRegisteredDialog(false)
    dispatch(registerSlice.actions.resetRegistrationFlow())
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
    if (flowType == 'LAST_NAME_AND_ADDRESS') {
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
    if (isAddressVerified) {
      dispatch(sendSecondaryMFAByPhoneAction(onHandleShowSentCodeMessage))
    } else {
      dispatch(sendPrimaryMFAByPhoneAction(onHandleShowSentCodeMessage))
    }
    setOTPValue('')
  }

  const securityTimeoutModalData = {
    title: securityTimeout?.title,
    info: securityTimeout?.info,
    info1: { value: <TimeoutMessage timeout={accountLockedUntil || ''} /> },
    btn1: {
      text: securityTimeout?.btn1,
    },
    supportInfo,
    supportLink,
    supportUrl,
  }

  const unverifiedContactMethodModalData = {
    title: unverifiedContactMethod?.title,
    info: unverifiedContactMethod?.info,
    btn1: {
      text: unverifiedContactMethod?.btn1,
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
      ({ method }) => method === 'mfaSms',
    )
    if (isPrimaryVerificationDone || !filteredMethod) {
      return maskPhoneNumber(phone ?? '') ?? ''
    }
    return filteredMethod?.maskedDeliveryLocation
  }

  return (
    <div>
      <Typography styleType="h4" tagType="h3" className={classes.title}>
        {failedReason ? incorrectCodeText?.value : title?.value}
      </Typography>
      {remainingAttempts != null && (
        <Typography
          styleType="p1"
          fontType="boldFont"
          tagType="p"
          className={classes.info}
          data-tid="remaining-attempts"
        >
          {incorrectInfoText?.value.replace(
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
          {failedReason ? incorrectInfoText2?.value : info?.value}
        </Typography>
        &nbsp;
        <Typography
          styleType="p1"
          fontType={failedReason ? '' : 'boldFont'}
          data-tid="phone"
        >
          {getDisplayPhone()}
        </Typography>
      </div>
      <OTPInput
        value={OTPvalue}
        onChange={setOTPValue}
        isInvalidOTP={!!failedReason}
        invalidOTPMessage={`${invalidOTPMessage?.value}.`}
      />
      <Typography styleType="p1" tagType="p" className={classes.description}>
        {info2?.value}
      </Typography>
      <Button
        type="button"
        variant="primary"
        hoverVariant="primary"
        className={classes.continueBtn}
        text={confirmBtnText?.value}
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
        <Button
          type="button"
          variant="lite"
          hoverVariant="primary"
          className={classes.updateLinkBtn}
          onClick={handleResendCode}
          disabled={showNewCodeSentMessage}
          text={UpdateNumberLink?.value}
          data-tid="resend-code-btn"
        />
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
  error: {
    color: `${colors.main.error}`,
    marginLeft: '8px',
  },
  continueBtn: {
    margin: '32px auto',
    maxWidth: 246,
    display: 'block',
    fontWeight: 700,
    fontSize: '0.875rem',
  },
  textCenter: {
    textAlign: 'center',
  },
  textWrongNo: {
    fontWeight: 500,
  },
  updateLinkBtn: {
    textDecoration: 'underline',
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: 'inherit',
    textAlign: 'center',
    display: 'block !important',
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
