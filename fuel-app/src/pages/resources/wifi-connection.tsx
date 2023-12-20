import customStaticProps from 'src/utils/appData'
import MainLayout from '@/shared-ui/layouts/main'
import {
  HeroSection,
  NeedMoreHelp,
  HowToGetPerformance,
  TwoColumnLayoutWithImage,
  Understanding,
  GetSupport,
} from 'src/libs/resources/wifi-connection'
import DownloadMobileApp from 'src/components/DownloadMobileApp'
import { usePageLoadEvents } from '../../hooks'
import {
  UNVERIFIED_SERVICE_AREA,
  VISITOR,
  WIFI_CONNECTION_PAGE,
} from 'src/constants'

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
      pageName: WIFI_CONNECTION_PAGE,
      eVar22: VISITOR,
      eVar49: UNVERIFIED_SERVICE_AREA,
    },
  })
  return (
    <div>
      <MainLayout {...props} showChat={true}>
        <HeroSection />
        <Understanding />
        <HowToGetPerformance />
        <TwoColumnLayoutWithImage />
        <GetSupport />
        <DownloadMobileApp />
        <NeedMoreHelp />
      </MainLayout>
    </div>
  )
}

export const getStaticProps = customStaticProps('/resources/wifi-connection')

export default SSR
