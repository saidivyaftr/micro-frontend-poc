import { customStaticPropsfromAzure } from 'src/utils/appData'
import MainLayout from '@/shared-ui/layouts/main'
import {
  HeroSection,
  BeforeTheStorm,
  ServiceImpact,
  FAQ,
  NeedMoreHelp,
  DownloadApp,
} from 'src/libs/resources/emergency-preparation'
import { usePageLoadEvents } from '../../hooks'
import {
  UNVERIFIED_SERVICE_AREA,
  VISITOR,
  EMERGENCY_PREPARATION_PAGE,
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
      pageName: EMERGENCY_PREPARATION_PAGE,
      eVar22: VISITOR,
      eVar49: UNVERIFIED_SERVICE_AREA,
    },
  })
  return (
    <div>
      <MainLayout {...props} showChat={true}>
        <HeroSection />
        <BeforeTheStorm />
        <ServiceImpact />
        <FAQ />
        <DownloadApp />
        <NeedMoreHelp />
      </MainLayout>
    </div>
  )
}

export const getStaticProps = customStaticPropsfromAzure(
  '/resources/emergency-preparation',
)

export default SSR
