import customStaticProps from 'src/utils/appData'
import MainLayout from '@/shared-ui/layouts/main'
import {
  OFFER_AFFORDABLE_BROADBAND_PAGE,
  UNVERIFIED_SERVICE_AREA,
  VISITOR,
} from 'src/constants'

import {
  HeroSection,
  StayConnectedLoop,
  GetInternet,
} from 'src/libs/offer/affordable-broadband'
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
      pageName: OFFER_AFFORDABLE_BROADBAND_PAGE,
      eVar22: VISITOR,
      eVar49: UNVERIFIED_SERVICE_AREA,
    },
  })
  return (
    <div>
      <MainLayout {...props}>
        <HeroSection />
        <GetInternet />
        <StayConnectedLoop />
      </MainLayout>
    </div>
  )
}
// TODO Update SC Path once the data is added
export const getStaticProps = customStaticProps('/offer/affordable-broadband')

export default SSR
