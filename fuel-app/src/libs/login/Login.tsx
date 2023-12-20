import { makeStyles } from '@material-ui/core'
import { COMPONENT_WRAPPER } from 'src/constants'
import colors from '@/shared-ui/colors'
import { useSelector } from 'react-redux'
import { State } from 'src/redux/types'
import LoginCard from './Card'
import { LeftArrowIcon, Logo } from '@/shared-ui/react-icons'
import { Typography } from '@/shared-ui/components'
import clx from 'classnames'
import css from 'src/blitz/components/Header/Header.module.scss'
import { useAppData } from 'src/hooks'
import SignIn from './SignIn'
import ForgotEmail from './ForgotEmail'
import MobileSecurityCode from './MobileSecurityCode'

const Login = () => {
  const classes = useStyles()
  const { title } = useAppData('loginCard', true)
  const { step } = useSelector((state: State) => state?.login) || {}
  const renderStep = () => {
    switch (step) {
      case 'SIGN_IN':
        return <SignIn />
      case 'FORGOT_EMAIL':
        return <ForgotEmail />
      case 'CONFIRM_MOBILE_OTP':
        return <MobileSecurityCode />
    }
  }
  return (
    <div className={classes.root}>
      <div className={classes.innerWrapper}>
        {step === 'SIGN_IN' ? (
          <div></div>
        ) : (
          <>
            <div className={classes.headerLogoContainer}>
              <a aria-label="Frontier Logo">
                <Logo
                  fill={colors.main.brightRed}
                  width="63.99px"
                  height="62.39px"
                  className={clx(css.headerLogo, css.hideLogoMobile)}
                />
              </a>
            </div>
            <a className={classes.signInHeader} href={'/login'}>
              <LeftArrowIcon />
              <Typography fontType="boldFont" className={'signInHeaderText'}>
                {title?.value}
              </Typography>
            </a>
          </>
        )}
        <LoginCard>{renderStep()}</LoginCard>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: colors.main.lightGray,
    minHeight: 'calc(100vh - 293px)',
    display: 'flex',
    [breakpoints.down('xs')]: {
      minHeight: 'calc(100vh - 406px)',
    },
  },
  innerWrapper: {
    ...COMPONENT_WRAPPER,
    maxWidth: 680,
    paddingTop: 42,
    paddingBottom: 42,
    width: '100%',
  },
  headerLogoContainer: {
    textAlign: 'center',
  },
  signInHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    textDecoration: 'underline',
    marginBottom: 24,
    '&:hover': {
      color: colors.main.brightRed,
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
}))

export default Login
