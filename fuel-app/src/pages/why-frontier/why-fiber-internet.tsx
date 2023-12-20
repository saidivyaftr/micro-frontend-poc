import customStaticProps from 'src/utils/appData'
import {
  WHY_FRONTIER_PAGE,
  VISITOR,
  UNVERIFIED_SERVICE_AREA,
} from 'src/constants'
import MainLayout from '@/shared-ui/layouts/main'
import {
  HeroSection,
  QuickAccess,
  WhyFiber,
  SwiperContent,
  SpecialAboutFiber,
  OurFrontierPromise,
  InternetCredit,
  GamingBadge,
} from 'src/libs/why-frontier/why-fiber-internet'
import FAQ from 'src/components/FAQ'
import { usePageLoadEvents } from 'src/hooks'
import { GTagPageLoadEvent, GTAG_ID } from 'src/utils/gtag'
import { Testimonials } from 'src/components/Testimonials'
import { InternetPlansTable } from 'src/components/InternetPlansTable'
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
    <>
      <GTagPageLoadEvent id={GTAG_ID} />
      <MainLayout {...props}>
        <HeroSection />
        <QuickAccess />
        <TrophyCase />
        <SpecialAboutFiber />
        <SwiperContent />
        <GamingBadge />
        <InternetPlansTable />
        <InternetCredit />
        <OurFrontierPromise />
        <Testimonials />
        <WhyFiber />
        <FAQ page="why-frontier/why-fiber-internet" />
      </MainLayout>
    </>
  )
}
export const getStaticProps = customStaticProps(
  '/why-frontier/why-fiber-internet',
)

export default SSR
