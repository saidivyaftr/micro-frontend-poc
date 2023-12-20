import customStaticProps from 'src/utils/appData'
import MainLayout from '@/shared-ui/layouts/main'

import {
  HeroSection,
  DownloadAppQR,
  MobileApp,
  QuickAccess,
  TrackYourOrders,
  DownloadApp,
} from 'src/libs/resources/myfrontier-mobile-app'
import {
  APP_LANDING_PAGE,
  UNVERIFIED_SERVICE_AREA,
  VISITOR,
} from 'src/constants'
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
      pageName: APP_LANDING_PAGE,
      eVar22: VISITOR,
      eVar49: UNVERIFIED_SERVICE_AREA,
    },
  })
  return (
    <div>
      <MainLayout {...props}>
        <HeroSection />
        <DownloadAppQR />
        <MobileApp />
        <TrackYourOrders />
        <QuickAccess />
        <DownloadApp />
      </MainLayout>
    </div>
  )
}

export const getStaticProps = customStaticProps(
  '/resources/myfrontier-mobile-app',
)

export default SSR
