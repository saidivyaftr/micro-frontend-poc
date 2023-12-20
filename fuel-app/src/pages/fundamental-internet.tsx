import customStaticProps from 'src/utils/appData'
import MainLayout from '@/shared-ui/layouts/main'
import {
  FUNDAMENTAL_INTERNET,
  UNVERIFIED_SERVICE_AREA,
  VISITOR,
} from 'src/constants'

import {
  HeroSection,
  SwiperContent,
  TwoTiles,
  FundamentalFAQ,
} from 'src/libs/fundamental-internet'
import { usePageLoadEvents } from 'src/hooks'

interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}

function SSR(props: PageProps): JSX.Element {
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    shouldTriggerInvoca: props?.success,
    eventData: {
      pageName: FUNDAMENTAL_INTERNET,
      eVar22: VISITOR,
      eVar49: UNVERIFIED_SERVICE_AREA,
    },
  })
  return (
    <div>
      <MainLayout {...props}>
        <HeroSection />
        <TwoTiles />
        <SwiperContent />
        <FundamentalFAQ />
      </MainLayout>
    </div>
  )
}
// TODO Update SC Path once the data is added
export const getStaticProps = customStaticProps('/fundamental-internet')

export default SSR
