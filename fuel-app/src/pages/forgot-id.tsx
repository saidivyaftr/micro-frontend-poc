import customStaticProps from 'src/utils/appData'
import MainLayout from 'src/layouts/MainLayout'
import { AppRoutes } from 'src/constants/'
import ForgotId from 'src/libs/forgot/id/ForgotId'
import { ReCaptchaProvider } from 'next-recaptcha-v3'
import { useIsLoadingFromApp } from '../hooks'

interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}

function ForgotIdPage(props: PageProps): JSX.Element {
  const key = process.env.GOOGLE_CAPTCHA_V3_PUBLIC_KEY || ''
  const isFromMobileApp = useIsLoadingFromApp()

  return (
    <MainLayout
      hideHeader={isFromMobileApp}
      hideFooter={isFromMobileApp}
      {...props}
      miniFooter
      showChat={true}
    >
      <ReCaptchaProvider reCaptchaKey={key}>
        <ForgotId />
      </ReCaptchaProvider>
    </MainLayout>
  )
}

export const getStaticProps = customStaticProps(AppRoutes.ForgotIdPage)

export default ForgotIdPage
