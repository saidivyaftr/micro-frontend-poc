import customStaticProps from 'src/utils/appData'
import MainLayout from '@/shared-ui/layouts/main'
import { UPGRADE_FIBER, VISITOR, UNVERIFIED_SERVICE_AREA } from 'src/constants'
import {
  HeroSection,
  CallToUpgrade,
  ScheduleInstallationBanner,
  FiberServices,
  SpecialAboutFiber,
  FiberOfferings,
  FiberUpgradeFAQ,
} from 'src/libs/why-frontier/why-fiber-internet/fiber-upgrade'
import { Testimonials } from 'src/components/Testimonials'
import { usePageLoadEvents } from 'src/hooks'
interface PageProps {
  data: any
  success: boolean
}

function SSR(props: PageProps): JSX.Element {
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    shouldTriggerInvoca: false,
    eventData: {
      pageName: UPGRADE_FIBER,
      eVar22: VISITOR,
      eVar49: UNVERIFIED_SERVICE_AREA,
    },
  })
  return (
    <MainLayout {...props}>
      <HeroSection />
      <ScheduleInstallationBanner />
      <FiberServices />
      <FiberOfferings />
      <SpecialAboutFiber />
      <Testimonials />
      <CallToUpgrade />
      <FiberUpgradeFAQ />
    </MainLayout>
  )
}

export const getStaticProps = customStaticProps(
  '/why-frontier/why-fiber-internet/upgrade-fiber',
)

export default SSR
