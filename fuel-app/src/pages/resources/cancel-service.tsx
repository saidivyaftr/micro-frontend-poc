import customStaticProps from 'src/utils/appData'
import MainLayout from '@/shared-ui/layouts/main'

import {
  HeroSection,
  ServiceHelp,
  InternetCredit,
  TwoColumnLayoutWithImage,
} from 'src/libs/resources/cancel-service'
import { usePageLoadEvents } from '../../hooks'
import {
  CANCEL_SERVICE_PAGE,
  UNVERIFIED_SERVICE_AREA,
  VISITOR,
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
      pageName: CANCEL_SERVICE_PAGE,
      eVar22: VISITOR,
      eVar49: UNVERIFIED_SERVICE_AREA,
    },
  })

  return (
    <div>
      <MainLayout {...props} showChat={false}>
        <HeroSection />
        <ServiceHelp />
        <TwoColumnLayoutWithImage />
        <InternetCredit />
      </MainLayout>
    </div>
  )
}

export const getStaticProps = customStaticProps('/resources/cancel-service')

export default SSR
