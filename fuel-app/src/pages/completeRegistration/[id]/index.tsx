import customStaticProps from 'src/utils/appData'
import MainLayout from '@/shared-ui/layouts/main'
import ActivateFrontierID from 'src/libs/complete-registration/ActivateFrontierID'
import { useRouter } from 'next/router'
import { LinearProgress } from '@material-ui/core'
import { ReCaptchaProvider } from 'next-recaptcha-v3'

const key = process.env.GOOGLE_CAPTCHA_V3_PUBLIC_KEY
interface PageProps {
  data: any
  success: boolean
  uid: string
  expires: string
}
const CompleteRegistrationPage = (props: PageProps): JSX.Element => {
  const router = useRouter()
  if (router.isFallback) return <LinearProgress />
  return (
    <MainLayout {...props}>
      <ReCaptchaProvider reCaptchaKey={key}>
        <ActivateFrontierID />
      </ReCaptchaProvider>
    </MainLayout>
  )
}

export const getStaticPaths = async () => {
  const fallback =
    'abcd1ef234ghij5klm6no7890p1234q722305a39c5c315bae030f06fafd86e72cbdf10d50d21d4b2531064bdc7ecc4c245f3b0837b7ddcc4952f519d8469c2f77a38af245cf492f764c32fde6467eb7b087d92a24158933de70c7882c9d9f9ce7f557fd25cf749d70181eb2a95627765'
  const paths = [`/completeRegistration/${fallback}`]
  return {
    paths: paths,
    fallback: true,
  }
}

export const getStaticProps = customStaticProps('/completeRegistration')

export default CompleteRegistrationPage
