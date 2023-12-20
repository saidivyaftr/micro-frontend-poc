// import { useEffect } from 'react'
import customStaticProps from 'src/utils/appData'
import MainLayout from '@/shared-ui/layouts/main'
import { Login } from 'src/libs/login'
import FrontierAppBanner from 'src/libs/register/components/FrontierAppBanner'
import { SIGN_IN, CUSTOMER, SERVICEABLE } from 'src/constants'
import { usePageLoadEvents } from 'src/hooks'
import { ReCaptchaProvider } from 'next-recaptcha-v3'

const key = process.env.GOOGLE_CAPTCHA_V3_PUBLIC_KEY

interface PageProps {
  data: any
  success: boolean
}
const LoginPage = (props: PageProps): JSX.Element => {
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: SIGN_IN,
      eVar22: CUSTOMER,
      eVar49: SERVICEABLE,
    },
  })

  return (
    <MainLayout {...props} miniFooter>
      <ReCaptchaProvider reCaptchaKey={key}>
        <Login />
        <FrontierAppBanner />
      </ReCaptchaProvider>
    </MainLayout>
  )
}
export const getStaticProps = customStaticProps('/login')

export default LoginPage
