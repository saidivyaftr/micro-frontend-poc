/* eslint-disable @typescript-eslint/indent */
import { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import { AppRoutes } from 'src/constants/'
import customStaticProps from 'src/utils/appData'
import { Typography } from '@/shared-ui/components'
import {
  useWindowDimensions,
  useIsLoadingFromApp,
  usePageLoadEvents,
} from 'src/hooks'
import MainLayout from 'src/layouts/MainLayout'
import colors from 'src/styles/theme/colors'
import ForgotEmailSuccess from 'src/libs/forgot/password/ForgotEmailSuccess'
import { LeftArrowIcon, Logo } from '@/shared-ui/react-icons'
import { stateConstant } from 'src/constants/forgotPassword'
import EmailNotFound from 'src/libs/forgot/password/emailNotFound'
import ResetPasswordEmailForm from 'src/libs/forgot/password/ForgotPasswordForm'
import SystemError from 'src/libs/forgot/password/systemError'
import { formatUrl } from 'src/utils/urlHelpers'
import { FORGOT_PAGES, CUSTOMER } from 'src/constants'

const ForgotPasswordContent = {
  signin: {
    value: 'Sign in',
  },
  loginUrl: {
    value: '/login',
  },
}
interface PageProps {
  data: any
  success: boolean
}

function ForgotPassword(props: PageProps): JSX.Element {
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: FORGOT_PAGES.FORGOT_PASSWORD_PAGE,
      eVar22: CUSTOMER,
    },
  })
  const classes = useStyles()
  const { width } = useWindowDimensions()
  const isMobile = width <= 812
  const [currentState, setCurrentState] = useState<string>(
    stateConstant.RESET_PASSWORD_EMAIL_FORM,
  )

  const [showEmailNotFoundModal, setShowEmailNotFoundModal] = useState(false)
  const [showSystemErrorModal, setShowSystemErrorModal] = useState(false)
  const isFromMobileApp = useIsLoadingFromApp()
  const [showBackBtn, setShowBackBtn] = useState<boolean>(true)
  const handleBreadcrumb = () => {
    window.location.href = formatUrl(ForgotPasswordContent.loginUrl.value)
  }

  return (
    <MainLayout
      hideHeader={isFromMobileApp}
      hideFooter={isFromMobileApp}
      {...props}
      miniFooter
      showChat={false}
    >
      <div className={classes.wrapper}>
        <div className={classes.innerWrapper}>
          {!isMobile && (
            <div className={classes.redLogo}>
              <Logo fill={colors.main.brightRed} width="64px" height="64px" />
            </div>
          )}

          {showBackBtn &&
            currentState !== stateConstant.RESET_PASSWORD_SUCCESS && (
              <div className={classes.backButton}>
                <span
                  className={classes.backButtonLink}
                  onClick={handleBreadcrumb}
                >
                  <LeftArrowIcon />
                  <Typography tagType="span" fontType="boldFont">
                    {ForgotPasswordContent?.signin?.value}
                  </Typography>
                </span>
              </div>
            )}
          <div className={classes.container}>
            {currentState === stateConstant.RESET_PASSWORD_EMAIL_FORM && (
              <ResetPasswordEmailForm
                setShowBackBtn={setShowBackBtn}
                onSubmitState={setCurrentState}
                setShowEmailNotFoundModal={setShowEmailNotFoundModal}
                setShowSystemErrorModal={setShowSystemErrorModal}
              />
            )}
            {currentState === stateConstant.RESET_PASSWORD_SUCCESS && (
              <ForgotEmailSuccess />
            )}
          </div>
        </div>
        {showEmailNotFoundModal && <EmailNotFound showEmailNotFoundModal />}
        {showSystemErrorModal && <SystemError showSystemErrorModal />}
      </div>
    </MainLayout>
  )
}
const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    background: colors.main.backgroundLiteGrey,
    padding: '16px',
    [breakpoints.up('sm')]: {
      padding: '48px',
    },
  },
  innerWrapper: {
    padding: '40px 0px 40px 0px',
    width: '100%',
    margin: 'auto',
    [breakpoints.up('sm')]: {
      position: 'relative',
      padding: 0,
      width: 'min-content',
      margin: 'auto',
    },
    [breakpoints.up('md')]: {
      position: 'relative',
      padding: '152px 16px 205px 16px',
      width: 'min-content',
      margin: 'auto',
    },
  },
  container: {
    background: colors.main.white,
    borderRadius: '32px',
    padding: '40px 16px',
    [breakpoints.up('sm')]: {
      position: 'relative',
      padding: 48,
      width: 'min-content',
      margin: 'auto',
    },
  },
  redLogo: {
    display: 'none',
    [breakpoints.up('sm')]: {
      display: 'block',
      margin: '40px auto',
      textAlign: 'center',
      top: 0,
      right: 0,
      left: 0,
      position: 'absolute',
    },
  },
  backButton: {
    paddingBottom: 16,
    cursor: 'pointer',
  },
  backButtonLink: {
    padding: 0,
    display: 'inline-flex',
    alignItems: 'center',
    '& span': {
      marginLeft: 10,
    },
  },
}))

export const getStaticProps = customStaticProps(AppRoutes.ForgotPasswordPage)

export default ForgotPassword
