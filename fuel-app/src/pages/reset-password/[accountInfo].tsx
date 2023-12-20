/* eslint-disable @typescript-eslint/indent */
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import MainLayout from 'src/layouts/MainLayout'
import { COMPONENT_WRAPPER } from 'src/constants/'
import { Logo } from '@/shared-ui/react-icons'
import { Loading } from '@/shared-ui/components'
import ResetPasswordForm from 'src/libs/forgot/password/ResetPasswordForm'
import { useWindowDimensions, useIsLoadingFromApp } from 'src/hooks'
import { makeStyles } from '@material-ui/core'
import colors from 'src/styles/theme/colors'
import { decrypt } from 'src/utils/secure'
import { AppRoutes } from 'src/constants/'
import { formatUrl } from 'src/utils/urlHelpers'
import customStaticProps from 'src/utils/appData'
import SystemError from 'src/libs/forgot/password/systemError'
interface PageProps {
  data: any
  success: boolean
}
const ResetPassword = (props: PageProps) => {
  const classes = useStyles()
  const { width } = useWindowDimensions()
  const isMobile = width <= 812
  const router = useRouter()
  const isFromMobileApp = useIsLoadingFromApp()
  const [encryptedAccountInfo, setEncryptedAccountInfo] = useState<
    string | undefined
  >(undefined)
  const [email, setEmail] = useState('')
  const [expired, setExpiration] = useState<boolean>(false)
  const [showSystemErrorModal, setShowSystemErrorModal] = useState(false)
  const redirectExpired = () =>
    (window.location.href = formatUrl('/account/password-link-expired'))
  useEffect(() => {
    const getInfo = async () => {
      const accountInfo = await decrypt(router.query.accountInfo as string)
      if (
        accountInfo &&
        accountInfo?.expire &&
        accountInfo?.expire < new Date().getTime()
      ) {
        setExpiration(true)
        redirectExpired()
      } else if (accountInfo && accountInfo.email) {
        setExpiration(false)
        setEncryptedAccountInfo(router.query.accountInfo as string)
        setEmail(accountInfo.email)
      } else {
        {
          redirectExpired()
        }
      }
    }
    router.query.accountInfo && getInfo()
  }, [router.query.accountInfo])

  return (
    <MainLayout
      hideHeader={isFromMobileApp}
      hideFooter={isFromMobileApp}
      {...props}
      success
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
          <div className={classes.container}>
            {!expired && email ? (
              <ResetPasswordForm
                setShowSystemErrorModal={setShowSystemErrorModal}
                email={email as string}
                upn={encryptedAccountInfo as string}
              />
            ) : (
              <Loading className={classes.loaderArea} />
            )}
          </div>
        </div>
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
  },
  backButtonLink: {
    padding: 0,
    display: 'inline-flex',
    alignItems: 'center',
    '& span': {
      marginLeft: 10,
    },
  },
  loaderArea: {
    ...COMPONENT_WRAPPER,
    width: 400,
    height: 500,
  },
}))

export const getStaticPaths = async () => {
  const fallback =
    'abcd1ef234ghij5klm6no7890p1234q722305a39c5c315bae030f06fafd86e72cbdf10d50d21d4b2531064bdc7ecc4c245f3b0837b7ddcc4952f519d8469c2f77a38af245cf492f764c32fde6467eb7b087d92a24158933de70c7882c9d9f9ce7f557fd25cf749d70181eb2a95627765'
  const paths = [`${AppRoutes.ResetPasswordPage}/${fallback}`]
  return {
    paths: paths,
    fallback: true,
  }
}

export const getStaticProps = customStaticProps(AppRoutes.ResetPasswordPage)
export default ResetPassword
