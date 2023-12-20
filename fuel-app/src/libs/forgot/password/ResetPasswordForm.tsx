import { makeStyles } from '@material-ui/core'
import { Button, Typography } from '@/shared-ui/components'
import { useEffect, useState, useRef } from 'react'
import colors from 'src/styles/theme/colors'
import { useDispatch } from 'react-redux'
import clx from 'classnames'
import APIClient from 'src/api-client'
import ReCAPTCHA from 'react-google-recaptcha'
import { loginUserPostRegistration } from 'src/redux/actions/register'
import { useAppData, usePageLoadEvents } from 'src/hooks'
import { FORGOT_PAGES, CUSTOMER, SITE_INTERACTION } from 'src/constants'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'

import {
  Verified,
  Unverified,
  HidePassword,
  ShowPassword,
} from '@/shared-ui/react-icons'
interface PageProps {
  setShowAppBanner?: React.Dispatch<React.SetStateAction<any>>
  setShowSystemErrorModal: React.Dispatch<React.SetStateAction<any>>
  email?: string
  upn?: string
}

const ResetPasswordForm = ({
  setShowAppBanner,
  setShowSystemErrorModal,
  email,
  upn,
}: PageProps) => {
  const classes = useStyles()
  const [password, setPassword] = useState<string>('')
  const [isReadyForSubmit, setIsReadyForSubmit] = useState<boolean>(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const dispatch = useDispatch()

  const containsNumber = (str: string) => /\d/.test(str)
  const containsCapitalLetter = (str: string) => /[A-Z]/.test(str)

  const hasMinimumOf8Characters = password.length >= 8
  const hasAtlestOneDigit = containsNumber(password)
  const hasAtleastOneCapitalLetter = containsCapitalLetter(password)
  const hasPasswordAndConfirmPassMatches =
    password !== '' && password === confirmPassword

  setShowAppBanner && setShowAppBanner(true)
  const ResetPasswordFormContent = useAppData('ResetPasswordForm', true) || {}

  const handleNext = async (loginId: string, password: string) => {
    setIsLoading(true)
    const token = await recaptchaRef?.current?.executeAsync?.()
    if (token) {
      // Handle login
      dispatch(
        loginUserPostRegistration(
          loginId || '',
          password || '',
          token,
          'reset password',
        ),
      )
    }
    recaptchaRef?.current?.reset()
  }

  useEffect(() => {
    const isValid =
      hasMinimumOf8Characters &&
      hasAtlestOneDigit &&
      hasAtleastOneCapitalLetter &&
      hasPasswordAndConfirmPassMatches
    setIsReadyForSubmit(isValid)
  }, [password, confirmPassword])

  const submitHandler = async () => {
    try {
      DTMClient.triggerEvent(
        {
          events: 'event14',
          eVar14: 'RESET PASSWORD',
        },
        'tl_o',
        SITE_INTERACTION,
      )
      setIsLoading(true)
      const response = await APIClient.resetPassword({
        encryptedAccountInfo: upn,
        password: password,
      })

      if (response.status === 200) {
        handleNext(email || '', password || '')
      }
    } catch (error: any) {
      setShowSystemErrorModal(false)
    }
  }

  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: FORGOT_PAGES.RESET_PASSWORD_PAGE,
      eVar22: CUSTOMER,
    },
  })

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <Typography tagType="h3" styleType="h3" className={classes.headingText}>
          {ResetPasswordFormContent?.title?.value}
        </Typography>
        <Typography tagType="h6" styleType="h6" fontType="regularFont">
          {ResetPasswordFormContent?.message?.value}
        </Typography>
        <Typography
          tagType="h5"
          styleType="h5"
          className={clx(classes.sectionContainer)}
          fontType="boldFont"
        >
          {email}
        </Typography>

        <div className={classes.codeWrapper}>
          <Typography tagType="h6" styleType="h6" fontType="regularFont">
            {ResetPasswordFormContent?.inputPasswordHeading?.value}
          </Typography>
        </div>
        <div className={classes.inputContainer}>
          <input
            aria-label={`password`}
            type={showPassword ? 'text' : 'password'}
            value={password}
            data-tid="input-confirm-password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <button
            data-tid="show-input-confirm-password"
            aria-label="re-enter-password"
            className={classes.showHideBtn}
            onClick={() => {
              setShowPassword(!showPassword)
            }}
          >
            {showPassword ? (
              <HidePassword className={classes.hidePasswordIcon} />
            ) : (
              <ShowPassword className={classes.showPasswordIcon} />
            )}
          </button>
        </div>
        <div className={classes.sectionContainer}>
          <Typography className={classes.passwordRulesText}>
            {ResetPasswordFormContent?.passwordRulesLabel?.value}
          </Typography>
          <ul className={classes.passwordRules} data-tid="password-rules">
            <li>
              <div>
                {hasMinimumOf8Characters ? <Verified /> : <Unverified />}
              </div>
              {ResetPasswordFormContent?.characterLimit?.value}
            </li>
            <li>
              <div>
                {hasAtleastOneCapitalLetter ? <Verified /> : <Unverified />}
              </div>
              {ResetPasswordFormContent?.capitalLetter?.value}
            </li>
            <li>
              <div>{hasAtlestOneDigit ? <Verified /> : <Unverified />}</div>
              {ResetPasswordFormContent?.numberInPassword?.value}
            </li>
            <li>
              <div>
                {hasPasswordAndConfirmPassMatches ? (
                  <Verified />
                ) : (
                  <Unverified />
                )}
              </div>
              {ResetPasswordFormContent?.passwordsMustMatch?.value}
            </li>
          </ul>
        </div>

        <Typography tagType="h6" styleType="h6" fontType="regularFont">
          {ResetPasswordFormContent?.inputRepeatHeading?.value}
        </Typography>
        <div className={classes.inputContainer}>
          <input
            aria-label={'confirmPassword'}
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            data-tid="input-confirm-password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            data-tid="show-input-confirm-password"
            aria-label="re-enter-password"
            className={classes.showHideBtn}
            onClick={() => {
              setShowConfirmPassword(!showConfirmPassword)
            }}
          >
            {showConfirmPassword ? (
              <HidePassword className={classes.hidePasswordIcon} />
            ) : (
              <ShowPassword className={classes.showPasswordIcon} />
            )}
          </button>
        </div>
        <div className={classes.submitButtonContainer}>
          <Button
            id="submitBtn"
            type="button"
            text={ResetPasswordFormContent?.buttonText?.value}
            disabled={!isReadyForSubmit}
            onClick={submitHandler}
            isBusy={isLoading}
          />
        </div>
      </div>
      <ReCAPTCHA
        sitekey={process?.env?.GOOGLE_CAPTCHA_V3_PUBLIC_KEY || ''}
        size="invisible"
        ref={recaptchaRef}
      />
    </div>
  )
}
const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    background: colors.main.white,
    width: 'unset',
    [breakpoints.up('sm')]: {
      position: 'relative',
      width: '600px',
    },
    [breakpoints.up('lg')]: {
      position: 'relative',
      width: '683px',
    },
  },
  codeWrapper: {
    paddingTop: '32px',
    display: 'flex',
    paddingBottom: '6px',
  },
  headingText: {
    paddingTop: '16px',
    paddingBottom: '32px',
    textAlign: 'center',
  },
  sectionContainer: {
    marginTop: 32,
  },
  submitButtonContainer: {
    marginTop: 32,
    textAlign: 'center',
  },
  inputContainer: {
    display: 'flex',
    width: '100%',
    border: `1px solid ${colors.main.borderGrey}`,
    height: 50,
    borderRadius: 25,
    marginTop: 8,
    marginBottom: 16,
    '& input': {
      width: '100%',
      border: 0,
      margin: 8,
      outline: 'none',
      fontSize: 18,
      fontFamily: 'PP Object Sans',
      paddingLeft: 12,
    },
    '&:hover': {
      borderColor: colors.main.greenishBlue,
    },
  },
  showHideBtn: {
    background: 'transparent',
    border: 'none',
    marginRight: 10,
    cursor: 'pointer',
  },
  iconClass: {
    paddingRight: '6px',
  },
  textField: {
    height: '50px',
    width: '100%',
    borderRadius: '32px',
    padding: '8px 6px 2px 16px',
    background: colors.main.white,
    border: '1px solid rgba(196, 197, 201, 1)',
    [breakpoints.up('sm')]: {
      borderRadius: '25px',
    },
  },
  passwordRulesText: {
    paddingTop: '6px',
    display: 'flex',
    textAlign: 'center',
  },
  passwordRules: {
    padding: 0,
    listStyleType: 'none',
    '& li': {
      display: 'flex',
      marginBottom: 10,
      '& svg': {
        width: 16,
        height: 16,
        marginTop: 2,
        marginRight: 6,
      },
    },
  },
  hidePasswordIcon: {
    '&:hover': {
      '& path': {
        fill: colors.main.brightRed,
      },
    },
  },
  showPasswordIcon: {
    '&:hover': {
      '& path': {
        fill: colors.main.brightRed,
      },
    },
  },
  toolTipIcon: {
    display: 'inline-flex',
    left: 6,
    top: 3,
    '& svg': {
      width: 16,
      height: 16,
    },
  },
  tooltipArrow: {
    transform: 'rotate(138deg)',
    top: 5,
    left: 18,
    width: 8,
    height: 8,
  },
  toolTipContent: {
    top: -20,
    left: '22px !important',
    borderRadius: 8,
    right: '140px !important',
    boxShadow: `0px 2px 15px ${colors.main.shadowBlack}`,
    minWidth: 250,
    bottom: 'auto',
    '& > div': {
      margin: 8,
    },
  },
}))

export default ResetPasswordForm
