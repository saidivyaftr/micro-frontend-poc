import { makeStyles } from '@material-ui/core'
import React, { useState, useEffect, useMemo } from 'react'
import { Button, Typography } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import ReCAPTCHA from 'react-google-recaptcha'
import { Input } from 'src/ui-kit'
import {
  isValidMobileNumber,
  isValidEmail,
  isMobileNumber,
} from 'src/utils/validator'
import { registerSlice } from 'src/redux/slicers'
import { searchEmailOrMobileAction } from 'src/redux/actions/register'
import { useDispatch, useSelector } from 'react-redux'
import ActionModal from '../components/ActionModal'
import ModalWrapper from '../components/ModalWrapper'
import { State } from 'src/redux/types'
import { useAppData, usePageLoadEvents } from 'src/hooks'
import {
  REGISTER_WITH_EMAIL_OR_MOBILE,
  ACCOUNT_NOTFOUND_MOBILE,
  ACCOUNT_NOTFOUND_EMAIL,
  ACCOUNT_EXISTS_ALREADY,
  MULTIPLE_ACCOUNT_EXISTS,
  CUSTOMER,
  SERVICEABLE,
  REG_ACCOUNTEXISTSMODAL_LOGIN,
  REG_ACCOUNTEXISTSMODAL_FORGOTPWD,
} from 'src/constants'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { validateCaptcha } from 'src/utils/captcha'
import { maskEmail } from 'src/utils/register'
import { useRouter } from 'next/router'

const RegisterWithMobileOrEmail = () => {
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: REGISTER_WITH_EMAIL_OR_MOBILE,
      events: 'event70, event1',
      eVar22: CUSTOMER,
      eVar49: SERVICEABLE,
      eVar2: 'ftr:register',
    },
  })

  const classes = useStyles()
  const router = useRouter()
  const skipCaptcha = useMemo(
    () => router?.query?.skipCaptcha === '1',
    [router],
  )
  const accountNotFoundWithEmail = useAppData('accountNotFoundWithEmail', true)
  const multiAccountExistsEmail = useAppData('multiAccountExistsEmail', true)
  const multiAccountExistsMobile = useAppData('multiAccountExistsMobile', true)
  const accountNotFoundWithMobile = useAppData(
    'accountNotFoundWithMobile',
    true,
  )
  const nameAndAddressAccountExisting = useAppData(
    'nameAndAddressAccountExisting',
    true,
  )
  const nameOrServiceAddressNotFound = useAppData(
    'nameOrServiceAddressNotFound',
    true,
  )
  const {
    dataChargesApply,
    registerWithMobileHeader,
    registerWithMobileSubHeader,
    registerWithMobileFormTitle,
    submitBtnText,
    cantVerifyYourAccount,
    tryAnotherWay,
  } = useAppData('register', true)

  const recaptchaRef = React.useRef<ReCAPTCHA>(null)
  const dispatch = useDispatch()

  // State management
  const [emailOrPhoneInput, setEmailOrPhoneInput] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const { searchEmailOrMobile } = useSelector((state: State) => state.register)
  const { isBusy, failedReason } = searchEmailOrMobile || {}
  const [showError, setShowError] = useState<boolean>(false)
  useEffect(() => {
    if (failedReason) {
      setOpenDialog(true)
    }
  }, [failedReason])

  const isInputValuePhoneNumber = useMemo(
    () => isMobileNumber(emailOrPhoneInput ?? ''),
    [emailOrPhoneInput],
  )

  const isInputValid = useMemo(
    () =>
      isValidMobileNumber(emailOrPhoneInput ?? '') ||
      isValidEmail(emailOrPhoneInput ?? ''),
    [emailOrPhoneInput],
  )

  const handleSendCode = async () => {
    const isValidCaptcha = await validateCaptcha(recaptchaRef, skipCaptcha)
    if (isValidCaptcha) {
      DTMClient.triggerEvent(
        {
          events: 'event14,event76',
          eVar14: 'Registration: Submit Mobile/Email',
          eVar76: isInputValuePhoneNumber
            ? 'Identify:Mobile Number'
            : 'Identify:Email Address',
        },
        'tl_o',
      )
      dispatch(
        searchEmailOrMobileAction(
          isInputValuePhoneNumber
            ? emailOrPhoneInput.replace(/\D/g, '')
            : emailOrPhoneInput,
          isInputValuePhoneNumber ? 'PHONE' : 'EMAIL',
        ),
      )
    }
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

  const handleClose = () => {
    setEmailOrPhoneInput('')
    setOpenDialog(false)
  }

  const handleAddress = () => {
    setOpenDialog(false)
    setEmailOrPhoneInput('')
    dispatch(registerSlice.actions.setStep('REGISTER_WITH_NAME_AND_ADDRESS'))
  }

  const handleTryAnotherWay = () => {
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: 'Registration: Try another way',
      },
      'tl_o',
    )
    dispatch(registerSlice.actions.setStep('REGISTER_WITH_NAME_AND_ADDRESS'))
  }

  const dismissModal = () => {
    setOpenDialog(false)
  }

  const accountNotFoundWithEmailModalData = {
    title: accountNotFoundWithEmail?.title,
    info: accountNotFoundWithEmail?.info,
    btn1: {
      text: accountNotFoundWithEmail?.btn1,
    },
    btn2: {
      text: accountNotFoundWithEmail?.btn2,
    },
    trackingPageName: ACCOUNT_NOTFOUND_EMAIL,
  }

  const accountNotFoundWithMobileModalData = {
    title: accountNotFoundWithMobile?.title,
    info: accountNotFoundWithMobile?.info,
    btn1: {
      text: accountNotFoundWithMobile?.btn1,
    },
    btn2: {
      text: accountNotFoundWithMobile?.btn2,
    },
    trackingPageName: ACCOUNT_NOTFOUND_MOBILE,
  }
  const emailInfo = useMemo(() => {
    const info2Text = nameAndAddressAccountExisting?.info2?.value?.replace(
      '{{emailAddress}}',
      maskEmail(emailOrPhoneInput ?? ''),
    )
    return (
      <div>
        <Typography fontType="boldFont">{info2Text}</Typography>
      </div>
    )
  }, [emailOrPhoneInput])

  const accountAlreadyExistsEmailModalData = {
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
  const multiAccountExistsEmailModalData = {
    title: multiAccountExistsEmail?.title,
    info: multiAccountExistsEmail?.info,
    btn1: {
      text: multiAccountExistsEmail?.btn1,
    },
    btn2: {
      text: multiAccountExistsEmail?.btn2,
    },
    supportInfo: multiAccountExistsEmail?.supportInfo,
    supportLink: multiAccountExistsEmail?.supportLink,
    supportUrl: multiAccountExistsEmail?.supportUrl,
    trackingPageName: MULTIPLE_ACCOUNT_EXISTS,
  }
  const multiAccountExistsMobileModalData = {
    title: multiAccountExistsMobile?.title,
    info: multiAccountExistsMobile?.info,
    btn1: {
      text: multiAccountExistsMobile?.btn1,
    },
    btn2: {
      text: multiAccountExistsMobile?.btn2,
    },
    supportInfo: multiAccountExistsMobile?.supportInfo,
    supportLink: multiAccountExistsMobile?.supportLink,
    supportUrl: multiAccountExistsMobile?.supportUrl,
    trackingPageName: MULTIPLE_ACCOUNT_EXISTS,
  }

  const getModalContent = () => {
    if (failedReason === 'ALREADY_REGISTERED') {
      return (
        <ActionModal
          data={accountAlreadyExistsEmailModalData}
          btn1Handler={handleSignIn}
          btn2Handler={handleResetPassword}
          handleClose={dismissModal}
        />
      )
    }
    if (failedReason === 'MULTI_ACCOUNT_FOUND') {
      return (
        <ActionModal
          data={
            isInputValuePhoneNumber
              ? multiAccountExistsMobileModalData
              : multiAccountExistsEmailModalData
          }
          btn1Handler={handleAddress}
          btn2Handler={handleClose}
          handleClose={dismissModal}
        />
      )
    }
    return (
      <ActionModal
        data={
          isInputValuePhoneNumber
            ? accountNotFoundWithMobileModalData
            : accountNotFoundWithEmailModalData
        }
        btn1Handler={handleClose}
        btn2Handler={handleAddress}
        handleClose={dismissModal}
      />
    )
  }

  return (
    <div>
      <Typography styleType="h4" tagType="h3" className={classes.title}>
        {registerWithMobileHeader?.value}
      </Typography>
      <Typography styleType="p2" tagType="h6" className={classes.subTitle}>
        {registerWithMobileSubHeader?.value}
      </Typography>
      <div className={classes.row}>
        <label>
          <Typography fontType="boldFont">
            {registerWithMobileFormTitle?.value}
          </Typography>
        </label>
        <Input
          name={registerWithMobileFormTitle?.value}
          value={emailOrPhoneInput}
          onKeyDown={(e: any) => {
            if (e.which === 13 && isInputValid) {
              handleSendCode()
            }
          }}
          fullWidth
          onChange={(e: any) => {
            setEmailOrPhoneInput(e.target.value)
            setShowError(false)
          }}
          data-tid="email-or-mobile-input-container"
          className={classes.inputContainer}
          isError={emailOrPhoneInput && !isInputValid && showError}
          onBlur={() => setShowError(true)}
          helperText={
            emailOrPhoneInput && !isInputValid && showError
              ? 'Please enter a valid email address or mobile number'
              : ''
          }
        />
        <Typography styleType="p3" className={classes.dataChargesText}>
          {isInputValuePhoneNumber ? dataChargesApply?.value : ''}
        </Typography>
      </div>
      <Button
        type="button"
        variant="primary"
        hoverVariant="primary"
        onClick={handleSendCode}
        className={classes.submitBtn}
        text={submitBtnText?.value}
        isBusy={isBusy}
        disabled={!isInputValid}
        data-tid="submit-btn"
      />
      <div className={classes.tryAnotherWayContainer}>
        <Typography fontType="mediumFont">
          {cantVerifyYourAccount?.value}
        </Typography>
        <div
          onClick={handleTryAnotherWay}
          className={classes.tryAnotherWayText}
          data-tid="try-another-way-btn"
        >
          <Typography
            fontType="boldFont"
            className={classes.tryAnotherWayTypography}
          >
            {tryAnotherWay?.value}
          </Typography>
        </div>
      </div>
      <ModalWrapper
        isOpen={openDialog}
        handleClose={dismissModal}
        modalContent={getModalContent()}
      />
      <ReCAPTCHA
        sitekey={process?.env?.GOOGLE_CAPTCHA_V3_PUBLIC_KEY || ''}
        size="invisible"
        ref={recaptchaRef}
      />
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    paddingBottom: 8,
    marginBottom: 16,
    marginTop: 16,
  },
  row: {
    marginBottom: 16,
    marginTop: 32,
    [breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  title: {
    textAlign: 'center',
  },
  subTitle: {
    margin: '32px 0px',
  },
  button: {
    maxWidth: 700,
    [breakpoints.down('sm')]: {
      marginTop: 8,
    },
  },
  inputContainer: {
    '& .MuiFormHelperText-root': {
      color: colors.main.error,
      marginLeft: 16,
      marginTop: 8,
    },
    '& .MuiFilledInput-root': {
      borderRadius: 32,
      marginTop: 8,
    },
    '& div:hover': {
      borderColor: colors.main.black,
      outline: 'none',
    },
    '& div.Mui-focused': {
      borderColor: colors.main.greenishBlue,
    },
    '& input': {
      borderRadius: 32,
      padding: '8px 16px',
      height: 40,
    },
    [breakpoints.down('xs')]: {
      margin: '10px 0px',
      width: `100%`,
    },
    fontWeight: 'bolder',
    fontFamily: 'PP Object Sans',
  },
  submitBtn: {
    margin: '32px auto',
    maxWidth: 250,
    display: 'block',
  },
  tryAnotherWayContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: 16,
  },
  tryAnotherWayText: {
    textDecoration: 'underline',
    cursor: 'pointer',
    '&:hover': {
      color: `${colors.main.brightRed} !important`,
    },
  },
  tryAnotherWayTypography: {
    '&:hover': {
      color: `${colors.main.brightRed} !important`,
    },
  },
  dataChargesText: {
    height: 16,
    marginTop: 4,
    marginLeft: 18,
  },
}))

export default RegisterWithMobileOrEmail
