import customStaticProps from 'src/utils/appData'
import {
  WHY_FRONTIER_PAGE,
  VISITOR,
  UNVERIFIED_SERVICE_AREA,
} from 'src/constants'
import MainLayout from '@/shared-ui/layouts/main'
import {
  HeroSection,
  WhyFrontierComponent,
  FastInternetVideo,
  OurFrontierPromise,
  FiberIsFuture,
  OurPastPresentFuture,
  FiveGig,
} from 'src/libs/why-frontier/why-frontier'
import { Testimonials } from 'src/components/Testimonials'
import FAQ from 'src/components/FAQ'
import { usePageLoadEvents } from 'src/hooks'
import TrophyCase from 'src/components/TrophyCase'

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
      pageName: WHY_FRONTIER_PAGE,
      eVar22: VISITOR,
      eVar49: UNVERIFIED_SERVICE_AREA,
    },
  })

  return (
    <MainLayout {...props}>
      <HeroSection />
      <WhyFrontierComponent />
      <TrophyCase />
      <FiveGig />
      <FastInternetVideo />
      <OurPastPresentFuture />
      <OurFrontierPromise />
      <FiberIsFuture />
      <Testimonials />
      <FAQ page="why-frontier" />
    </MainLayout>
  )
}
export const getStaticProps = customStaticProps('/why-frontier')

export default SSR
