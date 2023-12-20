import customStaticProps from 'src/utils/appData'
import MainLayout from '@/shared-ui/layouts/main'

import {
  HeroSection,
  NeedHelp,
  PayBillOnline,
} from 'src/libs/resources/pay-bill-online'
import DownloadMobileApp from 'src/components/DownloadMobileApp'

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
        <DownloadMobileApp />
        <PayBillOnline />
        <NeedHelp />
      </MainLayout>
    </div>
  )
}

export const getStaticProps = customStaticProps('/resources/pay-bill-online')

export default SSR
