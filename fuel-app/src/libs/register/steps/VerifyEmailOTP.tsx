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
import { useAppData, usePageLoadEvents } from 'src/hooks'
import {
  VERIFY_PRIMARY_OTP,
  VERIFY_SECONDARY_OTP,
  CUSTOMER,
  SERVICEABLE,
  REG_SUNVERIFIED_MODAL,
  REG_SUNVERIFIED_CONTINUE,
} from 'src/constants'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'

const VerifyEmailOTP = () => {
  const classes = useStyles()
  const {
    title,
    incorrectCodeText,
    info,
    incorrectInfoText,
    incorrectInfoText2,
    disclaimer,
    codeExpiry,
    confirmBtnText,
    UpdateNumberLink,
    invalidOTPMessage,
    supportUrl,
    supportInfo,
    supportLink,
  } = useAppData('OTPEmail', true)
  const securityTimeout = useAppData('securityTimeout', true)
  const unverifiedContactMethod = useAppData('unverifiedContactMethod', true)

  const {
    confirmMFA,
    email,
    isAddressVerified,
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

  const [OTPvalue, setOTPValue] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const [failedOTP, setFailedOTP] = useState(false)
  const [showNewCodeSentMessage, setShowNewCodeSentMessage] = useState(false)
  const dispatch = useDispatch()

  const isOTPValid = OTPvalue.length === 6

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

  useEffect(() => {
    if (isAccountLocked) {
      if (
        flowType != 'LAST_NAME_AND_ADDRESS' ||
        (flowType == 'LAST_NAME_AND_ADDRESS' && hasReachedMaxEmailAttempts)
      ) {
        setOTPValue('')
        setOpenDialog(true)
      }
    }
  }, [isAccountLocked])

  useEffect(() => {
    if (failedReason) {
      if (
        flowType != 'LAST_NAME_AND_ADDRESS' ||
        (flowType == 'LAST_NAME_AND_ADDRESS' && emailFailedReason)
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
    if (isAddressVerified) {
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
    return isAddressVerified ? 'CREATE_PASSWORD' : 'CONFIRM_ADDRESS'
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
    if (isAddressVerified) {
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

  const getDisplayEmail = () => {
    if (isAddressVerified) {
      return email
    }
    const filteredMethod = authorizationMethods?.find(
      ({ method }) => method === 'mfaEmail',
    )
    if (isPrimaryVerificationDone || !filteredMethod) {
      return maskEmail(email ?? '')
    }
    return filteredMethod?.maskedDeliveryLocation
  }

  const dismissModal = () => {
    setOpenDialog(false)
    dispatch(registerSlice.actions.resetRegistrationFlow())
  }

  return (
    <div>
      <Typography styleType="h4" tagType="h3" className={classes.title}>
        {failedOTP ? incorrectCodeText?.value : title?.value}
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
          fontType={failedOTP ? '' : 'boldFont'}
          data-tid="otp-title"
        >
          {failedOTP ? incorrectInfoText2?.value : info?.value}
        </Typography>
        &nbsp;
        <Typography
          styleType="p1"
          fontType={failedOTP ? '' : 'boldFont'}
          data-tid="email"
        >
          {getDisplayEmail()}
        </Typography>
      </div>
      <OTPInput
        value={OTPvalue}
        onChange={setOTPValue}
        isInvalidOTP={!!failedOTP}
        invalidOTPMessage={`${invalidOTPMessage?.value}.`}
      />
      <Typography
        styleType="p1"
        className={classes.description}
        data-tid="code-expiry"
      >
        {codeExpiry?.value}
      </Typography>
      <Typography styleType="p1" className={classes.description}>
        {disclaimer?.value}
      </Typography>
      <Button
        type="button"
        variant="primary"
        hoverVariant="primary"
        className={classes.continueBtn}
        text={confirmBtnText?.value}
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
              {UpdateNumberLink?.value}
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
    marginLeft: '15px',
    textDecoration: 'underline',
    color: `${colors.main.brightRed}`,
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: 'inherit',
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
