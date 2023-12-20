import customStaticProps from 'src/utils/appData'
import { ACP_PAGE, VISITOR, UNVERIFIED_SERVICE_AREA } from 'src/constants'
import MainLayout from '@/shared-ui/layouts/main'
import {
  HeroSection,
  WhatsACP,
  ApplyACP,
  ACPSaveComparison,
  FrontierLifeLine,
  GroupFaqACP,
  BreadcrumbNav,
} from 'src/libs/discount-programs/affordable-connectivity-program'
import { GTagPageLoadEvent, GTAG_ID } from 'src/utils/gtag'
import Cohesion from 'src/utils/cohesion'
import { usePageLoadEvents } from 'src/hooks'
interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}

function SSR(props: PageProps): JSX.Element {
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    shouldTriggerInvoca: true,
    eventData: {
      pageName: ACP_PAGE,
      eVar22: VISITOR,
      eVar49: UNVERIFIED_SERVICE_AREA,
    },
  })
  return (
    <>
      <GTagPageLoadEvent id={GTAG_ID} />
      <Cohesion />
      <MainLayout {...props} showChat={false}>
        <HeroSection />
        <BreadcrumbNav />
        <WhatsACP />
        <ApplyACP />
        <ACPSaveComparison />
        <FrontierLifeLine />
        <GroupFaqACP />
      </MainLayout>
    </>
  )
}
export const getStaticProps = customStaticProps(
  '/discount-programs/affordable-connectivity-program',
)

export default SSR
