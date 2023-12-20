/* eslint-disable @typescript-eslint/indent */
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  makeStyles,
} from '@material-ui/core'
import { parseCookies } from 'nookies'
import {
  CheckboxIcon,
  HidePassword,
  InfoIconRed,
  ShowPassword,
  ErrorTriangeOutline,
} from '@/shared-ui/react-icons'
import { useEffect, useMemo, useState } from 'react'
import colors from '@/shared-ui/colors'
import clx from 'classnames'
import { Button, InjectHTML, Tooltip, Typography } from '@/shared-ui/components'
import {
  COMPONENT_WRAPPER,
  SIGNIN_FORGOTEMAIL,
  SIGNIN_FORGOTPWD,
  SIGNIN_REGISTER,
  SIGNIN_REMEMBERID,
  SITE_INTERACTION,
} from 'src/constants'
import { useAppData } from 'src/hooks'
import { getIn, useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { signInAction } from 'src/redux/slicers/login'
import { State } from 'src/redux/types'
import { useRouter } from 'next/router'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { useReCaptcha } from 'next-recaptcha-v3'
import { formatUrl } from 'src/utils/urlHelpers'
import SystemError from './ErrorModal'

const checkBoxProps = {
  checked: {
    rect: {
      fill: colors.main.midnightExpress,
    },
    path: {
      stroke: colors.main.white,
    },
  },
  unchecked: {
    rect: {
      fill: colors.main.white,
    },
  },
}

const errorMessages = {
  emailRequired: 'Please enter a valid email address',
  invalidEmail: 'Please enter a valid email address',
  passwordRequired: 'Please enter a valid password',
}
const Login = () => {
  const classes = useStyles()
  const {
    title,
    info,
    emailLabel,
    passwordLabel,
    signInBtn,
    helpInfo,
    helpText,
    registerLink,
    forgotLabel,
    rememberMyIdText,
    invalidLogin = {},
    forgotPasswordRedirectLink,
    forgotEmailRedirectLink,
    lockoutWarning,
  } = useAppData('loginCard', true)
  const { executeRecaptcha } = useReCaptcha()
  const router = useRouter()
  const { isLoading, failedReason, failedLoginCount } = useSelector(
    (state: State) => state?.login,
  )
  const [borderErrors, setBorderErrors] = useState({
    loginId: false,
    password: false,
  })

  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()
  type LoginForm = {
    loginId: string
    password: string
    rememberMe: boolean
  }
  const cookieLoginId = parseCookies()?.loginId
  const decodedLoginId = cookieLoginId && decodeURI(cookieLoginId)
  const rememberMe =
    !router?.query?.loginId && typeof decodedLoginId === 'string'

  const initialValues: LoginForm = useMemo(
    () => ({
      loginId:
        typeof router?.query?.loginId === 'string'
          ? router?.query?.loginId
          : decodedLoginId || '',
      password: '',
      rememberMe,
    }),
    [router],
  )

  const checkCaptchaSkip = async () => {
    const params = new URLSearchParams(window.location.search)

    return params?.get('skipCaptcha')
  }

  const onSubmit = async (values: LoginForm) => {
    const token = await executeRecaptcha('form_submit')
    const skipCaptcha = await checkCaptchaSkip()

    if (values.rememberMe) {
      DTMClient.triggerEvent(
        {
          events: 'event14',
          eVar14: SIGNIN_REMEMBERID,
        },
        'tl_o',
        SITE_INTERACTION,
      )
    }
    values.loginId = values.loginId.trim()
    const formBody =
      skipCaptcha && skipCaptcha === 'true'
        ? { skipCaptcha, token, ...values }
        : { token, ...values }
    dispatch(signInAction(formBody))
  }

  const validationSchema = Yup.object({
    loginId: Yup.string()
      .trim()
      .email(errorMessages.emailRequired)
      .required(errorMessages.invalidEmail),
    password: Yup.string().required(errorMessages.passwordRequired),
  })
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit,
    validationSchema,
  })

  const handleForgotEmail = () => {
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: SIGNIN_FORGOTEMAIL,
      },
      'tl_o',
      SITE_INTERACTION,
    )
    window.location.href = formatUrl(forgotEmailRedirectLink?.value)
  }

  useEffect(() => {
    if (['INVALID_LOGIN', 'API_ERROR'].includes(failedReason || '')) {
      setBorderErrors({ loginId: true, password: true })
    }
  }, [failedReason])
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e
    const { name, value } = target
    formik.handleChange(e)
    if (
      (name === 'loginId' || name === 'password') &&
      formik?.values?.[name] !== value
    ) {
      setBorderErrors({ ...borderErrors, [name]: false })
    }
  }

  const handleForgotPassword = () => {
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: SIGNIN_FORGOTPWD,
      },
      'tl_o',
      SITE_INTERACTION,
    )
    // todo implement forgot password flow
    window.location.href = forgotPasswordRedirectLink?.value
  }

  const handleRememberId = () => {
    return formik.setFieldValue(
      `rememberMe`,
      !getIn(formik.values, 'rememberMe'),
    )
  }

  return (
    <div className={classes.root}>
      {!isLoading && ['CAPTCHA_ERROR'].includes(failedReason || '') ? (
        <SystemError showSystemErrorModal />
      ) : null}
      <Typography styleType="h4" tagType="h1" className={classes.textCenter}>
        {title?.value}
      </Typography>
      <div className={classes.registerText}>
        <Typography
          fontType="regularFont"
          className={classes.accountText}
          styleType="p2"
          tagType="h2"
        >
          {helpInfo?.value}
        </Typography>
        <Button
          type="link"
          variant="lite"
          hoverVariant="primary"
          href={registerLink?.value}
          className={classes.registerLinkBtn}
          text={helpText?.value}
          triggerEvent={true}
          eventObj={{ events: 'event14', eVar14: SIGNIN_REGISTER }}
        />
      </div>
      <form
        onSubmit={formik.handleSubmit}
        noValidate
        className={classes.formClass}
        id="login-form"
      >
        <div className={classes.emailContainer}>
          <div className={classes.loginLabel}>
            <Typography styleType="p1" tagType="label" htmlFor="loginId">
              {emailLabel?.value}
            </Typography>
            <Tooltip
              tooltipText={info?.value}
              tooltipIcon={<InfoIconRed />}
              tooltipClassName={classes.toolTipIcon}
              tooltipContentClass={classes.toolTipContent}
              tooltipArrowClass={classes.tooltipArrow}
            />
            <div className={classes.rightAlign} />
            <div
              onClick={handleForgotEmail}
              className={classes.forgotEmailText}
            >
              <Typography styleType="p1" tagType="span">
                {forgotLabel?.value}
              </Typography>
            </div>
          </div>
          <div
            className={clx(classes.inputContainer, {
              [classes.inputContainerError]:
                borderErrors.loginId ||
                (formik.touched.loginId && formik?.errors?.loginId),
            })}
          >
            <input
              type="text"
              name="loginId"
              id="loginId"
              value={formik?.values?.loginId}
              onFocus={(ev: any) => {
                formik.setFieldTouched(ev.target.name, false)
              }}
              onChange={onInputChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.loginId && formik?.errors?.loginId ? (
              <InjectHTML
                tagType="div"
                styleType="p4"
                className={classes.errorText}
                value={formik?.errors?.loginId}
              />
            ) : null}
          </div>
        </div>
        <div
          className={clx(classes.passwordContainer, {
            [classes.inputContainerError]:
              formik?.touched?.password && formik?.errors?.password,
          })}
        >
          <div className={classes.loginLabel}>
            <Typography styleType="p1" tagType="label" htmlFor="password">
              {passwordLabel?.value}
            </Typography>
            <div className={classes.rightAlign} />
            <div
              onClick={handleForgotPassword}
              className={classes.forgotEmailText}
            >
              <Typography styleType="p1" tagType="span">
                {forgotLabel?.value}
              </Typography>
            </div>
          </div>
          <div
            className={clx(classes.inputContainer, {
              [classes.inputContainerError]: borderErrors.password,
            })}
          >
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              value={formik.values.password}
              onChange={onInputChange}
              onBlur={formik.handleBlur}
            />
            {!isLoading &&
            ['INVALID_LOGIN', 'API_ERROR'].includes(failedReason || '') ? (
              failedLoginCount && failedLoginCount >= 4 ? (
                <div>
                  <div className={classes.lockoutIcon}>
                    <ErrorTriangeOutline />
                    <Typography
                      styleType="p3"
                      tagType="p"
                      className={classes.lockoutText}
                    >
                      {lockoutWarning?.value}
                    </Typography>
                  </div>
                </div>
              ) : (
                <InjectHTML
                  tagType="div"
                  styleType="p4"
                  className={classes.errorText}
                  value={invalidLogin?.value}
                />
              )
            ) : formik.touched.password && formik?.errors?.password ? (
              <InjectHTML
                tagType="div"
                styleType="p4"
                className={classes.errorText}
                value={formik?.errors?.password}
              />
            ) : null}
            <button
              type="button"
              className={classes.showHideBtn}
              aria-label="enter-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <HidePassword className={classes.hidePasswordIcon} />
              ) : (
                <ShowPassword className={classes.showPasswordIcon} />
              )}
            </button>
          </div>
        </div>
        <FormControl>
          <FormControlLabel
            className={classes.rememberId}
            control={
              <Checkbox
                icon={<CheckboxIcon {...checkBoxProps.unchecked} />}
                checkedIcon={
                  <CheckboxIcon checked {...checkBoxProps.checked} />
                }
                checked={getIn(formik.values, 'rememberMe')}
                onChange={handleRememberId}
                name="rememberMe"
                id="rememberMe"
                color="primary"
                disableRipple
              />
            }
            label={rememberMyIdText?.value}
          />
        </FormControl>
        <Button
          type="submit"
          variant="primary"
          hoverVariant="primary"
          isBusy={isLoading}
          disabled={isLoading}
          className={classes.loginBtn}
          text={signInBtn?.value}
          buttonSize="large"
        />
      </form>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    position: 'relative',
  },
  innerWrapper: {
    ...COMPONENT_WRAPPER,
    maxWidth: 610,
    paddingTop: 48,
    paddingBottom: 140,
  },
  errorText: {
    color: colors.main.error,
    marginLeft: '1rem',
    marginTop: '0.5rem',
  },
  lockoutText: {
    color: colors.main.error,
    marginLeft: '0.5rem',
  },
  lockoutIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountText: {
    marginTop: '0',
    textWrap: 'nowrap',
    [breakpoints.down('xs')]: {
      marginTop: '2px',
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
    top: -2,
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
    minWidth: 200,
    bottom: 'auto',
    '& > div': {
      margin: 8,
    },
  },
  rememberId: {
    gap: '0.5rem',
    margin: 0,
    '& .MuiIconButton-colorPrimary': {
      backgroundColor: 'transparent',
    },
    '& .MuiCheckbox-colorPrimary.Mui-checked': {
      backgroundColor: 'transparent',
    },
  },
  info: {
    margin: '16px 0px',
  },
  loginBtn: {
    margin: '1.438rem auto 0 auto',
    display: 'block',
    fontWeight: 700,
    outline: 'none',
  },
  rightAlign: {
    flex: '1 1 auto',
  },
  inputContainer: {
    width: '100%',
    marginTop: '0.5rem',
    marginBottom: '1rem',
    position: 'relative',
    '& input': {
      border: `1px solid ${colors.main.borderGrey}`,
      height: 50,
      borderRadius: '2rem',
      width: '100%',
      padding: '0.75rem 1rem',
      outline: 'none',
      fontSize: 18,
      fontFamily: 'PP Object Sans',
      '&:hover': {
        borderColor: colors.main.greenishBlue,
      },
    },
  },
  inputContainerError: {
    '& input': {
      border: `1px solid ${colors.main.error}`,
    },
  },
  showHideBtn: {
    background: 'transparent',
    border: 'none',
    right: 10,
    cursor: 'pointer',
    position: 'absolute',
    top: 10,
  },
  textCenter: {
    textAlign: 'center',
  },
  registerText: {
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'center',
  },
  registerLinkBtn: {
    marginLeft: '1rem',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: 'inherit',
  },
  forgotEmailText: {
    '&:hover': {
      '& span': {
        color: `${colors.main.brightRed} !important`,
        textDecoration: 'underline',
        cursor: 'pointer',
      },
    },
  },
  loginLabel: {
    display: 'flex',
    alignItems: 'center',
  },
  formClass: {
    paddingTop: 32,
  },
  emailContainer: {
    marginBottom: 32,
  },
  passwordContainer: {
    marginBottom: '1.438rem',
  },
}))

export default Login
