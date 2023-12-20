import { useEffect, useState, useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import { Typography } from '@/shared-ui/components'
import { LeftArrowIcon, Logo } from '@/shared-ui/react-icons'
import { COMPONENT_WRAPPER, REG_EXIT, WIFI } from 'src/constants'
import { useAppData } from 'src/hooks'
import colors from '@/shared-ui/colors'
import { useSelector, useDispatch } from 'react-redux'
import { State } from 'src/redux/types'
// components imports

import Card from './components/Card'
import ActionModal from './components/ActionModal'
import ApiErrorModal from './components/ApiErrorModal'
import RegisterTimeout from './components/RegisterTimeout'
import FrontierAppBanner from './components/FrontierAppBanner'
import ModalWrapper from './components/ModalWrapper'

// STEPS imports
import SearchByIP from './steps/SearchByIP'
import RegisterWithMobileOrEmail from './steps/RegisterWithMobileOrEmail'
import RegisterWithNameAndAddress from './steps/RegisterWithNameAndAddress'
import VerifyMobileOTP from './steps/VerifyMobileOTP'
import VerifyWithSSN from './steps/VerifyWithSSN'
import ConfirmMobile from './steps/ConfirmMobile'
import ConfirmEmail from './steps/ConfirmEmail'
import VerifyEmailOTP from './steps/VerifyEmailOTP'
import AddMobileNumber from './steps/AddMobileNumber'
import UpdateMobileNumber from './steps/UpdateMobileNumber'
import CreatePassword from './steps/CreatePassword'
import UpdateEmailAddress from './steps/UpdateEmailAddress'
import AddEmailAddress from './steps/AddEmailAddress'
import ConfirmAddress from './steps/ConfirmAddress'
import RegistrationConfirmation from './steps/RegistrationConfirmation'
import { registerSlice } from 'src/redux/slicers'
import MobileAndOrEmailFound from './steps/MobileAndOrEmailFound'

const BackArrowComponent = ({ text }: { text: string }) => {
  return (
    <>
      <LeftArrowIcon />
      <Typography fontType="mediumFont" className={'signInHeaderText'}>
        {text}
      </Typography>
    </>
  )
}

const Register = () => {
  const [openDialog, setOpenDialog] = useState(false)
  const classes = useStyles()
  const dispatch = useDispatch()
  const { step, phone, email, isAddressVerified, isIPAddressVerified } =
    useSelector((state: State) => state?.register) || {}
  const { signInLinkText, signInLinkHref, registerWithEmailOrMobileText } =
    useAppData('register', true)
  const { title: confirmMobileText } = useAppData('confirmMobileText', true)
  const { title: confirmEmailText } = useAppData('confirmEmailText', true)
  const { title: startRegistrationText } = useAppData(
    'startRegistrationText',
    true,
  )
  const { flowType } = useSelector((state: State) => state.register)
  const isWIFI = flowType === WIFI
  const areYouSureModal = useAppData('areYouSureModal', true)
  const areYouSureModalSecOTP = useAppData('areYouSureModalSecOTP', true)
  const backText = { back: { value: 'Back' } } || {}
  const renderStep = () => {
    switch (step) {
      case 'SEARCH_BY_IPADDRESS':
        return <SearchByIP />
      case 'REGISTER_WITH_EMAIL_OR_MOBILE':
        return <RegisterWithMobileOrEmail />
      case 'REGISTER_WITH_NAME_AND_ADDRESS':
        return <RegisterWithNameAndAddress />
      case 'VERIFY_WITH_SSN':
        return <VerifyWithSSN />
      case 'CONFIRM_EMAIL':
        return <ConfirmEmail />
      case 'ADD_NEW_EMAIL_ADDRESS':
        return <AddEmailAddress />
      case 'UPDATE_EMAIL_ADDRESS':
        return <UpdateEmailAddress />
      case 'VERIFY_EMAIL_OTP':
        return <VerifyEmailOTP />
      case 'CONFIRM_MOBILE':
        return <ConfirmMobile />
      case 'ADD_NEW_MOBILE_NUMBER':
        return <AddMobileNumber />
      case 'UPDATE_MOBILE_NUMBER':
        return <UpdateMobileNumber />
      case 'VERIFY_MOBILE_OTP':
        return <VerifyMobileOTP />
      case 'CONFIRM_ADDRESS':
        return <ConfirmAddress />
      case 'CREATE_PASSWORD':
        return <CreatePassword />
      case 'REGISTER_SUCCESS':
        return <RegistrationConfirmation />
      case 'MOBILE_EMAIL_FOUND':
        return <MobileAndOrEmailFound />
    }
  }

  const dismissModal = () => {
    setOpenDialog(false)
  }

  const handleExitRegistration = () => {
    window.location.href = '/login'
  }

  useEffect(() => {
    if (window !== undefined) {
      window.history.pushState(null, '', window.location.pathname)
      window.addEventListener('popstate', onBackButtonEvent)
      return () => {
        window.removeEventListener('popstate', onBackButtonEvent)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  })

  const onBackButtonEvent = () => {
    if (
      step !== 'REGISTER_WITH_EMAIL_OR_MOBILE' &&
      step !== 'REGISTER_WITH_NAME_AND_ADDRESS'
    )
      setOpenDialog(true)
  }

  const ARE_YOU_SURE_MODAL_DATA = {
    title: areYouSureModal?.title,
    info: areYouSureModal?.info,
    info1: areYouSureModal?.info1,
    btn1: {
      text: areYouSureModal?.btn1,
    },
    btn2: {
      text: areYouSureModal?.btn2,
    },
    trackingPageName: REG_EXIT,
  }

  const ARE_YOU_SURE_MODAL_SEC_OTP_DATA = {
    title: areYouSureModalSecOTP?.title,
    info: areYouSureModalSecOTP?.info,
    info1: areYouSureModalSecOTP?.info1,
    btn1: {
      text: areYouSureModalSecOTP?.btn1,
    },
    btn2: {
      text: areYouSureModalSecOTP?.btn2,
    },
    trackingPageName: REG_EXIT,
  }

  const handleBack = () => {
    const stepToNavigate =
      step === 'VERIFY_EMAIL_OTP' ? 'CONFIRM_EMAIL' : 'CONFIRM_MOBILE'
    dispatch(registerSlice.actions.setStep(stepToNavigate))
  }

  const shouldShowBack = useMemo(() => {
    return (
      (step === 'VERIFY_EMAIL_OTP' || step === 'VERIFY_MOBILE_OTP') &&
      (isAddressVerified || isIPAddressVerified)
    )
  }, [step, isAddressVerified, isIPAddressVerified])

  const wifiBackDisplayStep = () => {
    if (isWIFI) {
      switch (step) {
        case 'ADD_NEW_EMAIL_ADDRESS':
        case 'ADD_NEW_MOBILE_NUMBER':
          return true
        default:
          return false
      }
    } else {
      return false
    }
  }
  const wifiBackDisplay = wifiBackDisplayStep()

  return (
    <RegisterTimeout>
      <div className={classes.root}>
        <div className={classes.innerWrapper}>
          <div className={classes.headerLogoContainer}>
            <a
              data-id="frontier-logo-btn"
              aria-label="Frontier Logo"
              onClick={() => setOpenDialog(true)}
            >
              <Logo
                fill={colors.main.brightRed}
                width="63.99px"
                height="62.39px"
              />
            </a>
          </div>
          {step === 'REGISTER_WITH_EMAIL_OR_MOBILE' && (
            <a
              data-id="sign-in-btn"
              className={classes.signInHeader}
              href={signInLinkHref?.value}
            >
              <BackArrowComponent text={signInLinkText?.value} />
            </a>
          )}
          {wifiBackDisplay && (
            <div
              className={classes.signInHeader}
              role="button"
              data-id="register-with-email-and-mobile-back-btn"
              onClick={() =>
                dispatch(registerSlice.actions.setStep('CONFIRM_EMAIL'))
              }
            >
              <BackArrowComponent text={backText.back?.value} />
            </div>
          )}
          {step === 'REGISTER_WITH_NAME_AND_ADDRESS' && (
            <div
              className={classes.signInHeader}
              role="button"
              data-id="register-with-email-and-mobile-back-btn"
              onClick={() =>
                dispatch(
                  registerSlice.actions.setStep(
                    'REGISTER_WITH_EMAIL_OR_MOBILE',
                  ),
                )
              }
            >
              <BackArrowComponent text={registerWithEmailOrMobileText?.value} />
            </div>
          )}
          {step === 'UPDATE_MOBILE_NUMBER' && phone && (
            <div
              className={classes.signInHeader}
              role="button"
              data-id="confirm-mobile-back-btn"
              onClick={() =>
                dispatch(registerSlice.actions.setStep('CONFIRM_MOBILE'))
              }
            >
              <BackArrowComponent text={confirmMobileText?.value} />
            </div>
          )}
          {step === 'UPDATE_EMAIL_ADDRESS' && email && (
            <div
              className={classes.signInHeader}
              role="button"
              data-id="confirm-email-back-btn"
              onClick={() =>
                dispatch(registerSlice.actions.setStep('CONFIRM_EMAIL'))
              }
            >
              <BackArrowComponent text={confirmEmailText?.value} />
            </div>
          )}
          {step === 'VERIFY_WITH_SSN' && (
            <div
              className={classes.signInHeader}
              role="button"
              data-id="register-with-name-back-btn"
              onClick={() =>
                dispatch(
                  registerSlice.actions.setStep(
                    'REGISTER_WITH_NAME_AND_ADDRESS',
                  ),
                )
              }
            >
              <BackArrowComponent text={startRegistrationText?.value} />
            </div>
          )}
          {shouldShowBack && (
            <div
              className={classes.signInHeader}
              role="button"
              data-id="register-with-name-back-btn"
              onClick={handleBack}
            >
              <BackArrowComponent text={'Back'} />
            </div>
          )}
          <Card>{renderStep()}</Card>
        </div>
        {step === 'REGISTER_SUCCESS' && <FrontierAppBanner />}
        <ApiErrorModal />
        <ModalWrapper
          isOpen={openDialog}
          handleClose={dismissModal}
          modalContent={
            <ActionModal
              data={
                shouldShowBack
                  ? ARE_YOU_SURE_MODAL_SEC_OTP_DATA
                  : ARE_YOU_SURE_MODAL_DATA
              }
              btn1Handler={dismissModal}
              btn2Handler={handleExitRegistration}
              handleClose={dismissModal}
            />
          }
        />
      </div>
    </RegisterTimeout>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: colors.main.lightGray,
    minHeight: 'calc(100vh - 184px)',
  },
  innerWrapper: {
    ...COMPONENT_WRAPPER,
    //maxWidth: 680,
    maxWidth: 776,
    paddingTop: 42,
    paddingBottom: 42,
  },
  headerLogoContainer: {
    textAlign: 'center',
    marginBottom: 32,
    display: 'none',
    '& button': {
      border: 0,
      background: 'transparent',
      cursor: 'pointer',
    },
    [breakpoints.up('md')]: {
      display: 'block',
    },
  },
  signInHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
    '&:hover': {
      cursor: 'pointer',
      color: `${colors.main.brightRed} !important`,
      '& .signInHeaderText': {
        color: colors.main.brightRed,
      },
      '& svg': {
        '& path': {
          fill: colors.main.brightRed,
        },
      },
    },
  },
  accordionWrapper: {
    maxWidth: 800,
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 16,
  },
}))

export default Register
