import customStaticProps from 'src/utils/appData'
import MainLayout from '@/shared-ui/layouts/main'

import {
  HeroSection,
  BillPayment,
  AutoPlayVideo,
  TwoWays,
  PageEndBanner,
} from 'src/libs/resources/autopay'

interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}

function SSR(props: PageProps): JSX.Element {
  return (
    <div>
      <MainLayout {...props}>
        <HeroSection />
        <BillPayment />
        <AutoPlayVideo />
        <TwoWays />
        <PageEndBanner />
      </MainLayout>
    </div>
  )
}

export const getStaticProps = customStaticProps('/resources/autopay')

export default SSR
