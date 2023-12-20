import customStaticProps from 'src/utils/appData'
import MainLayout from '@/shared-ui/layouts/main'
import { FIBER_UPGRADE, VISITOR, UNVERIFIED_SERVICE_AREA } from 'src/constants'
import {
  HeroSection,
  CallToUpgrade,
  ScheduleInstallationBanner,
  FiberServices,
  SpecialAboutFiber,
  FiberUpgradeFAQ,
} from 'src/libs/why-frontier/why-fiber-internet/fiber-upgrade'
import { usePageLoadEvents } from 'src/hooks'
import { Testimonials } from 'src/components/Testimonials'
import { InternetPlansTable } from '../../../components/InternetPlansTable'
interface PageProps {
  data: any
  success: boolean
}

function SSR(props: PageProps): JSX.Element {
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    shouldTriggerInvoca: false,
    eventData: {
      pageName: FIBER_UPGRADE,
      eVar22: VISITOR,
      eVar49: UNVERIFIED_SERVICE_AREA,
    },
  })
  return (
    <MainLayout {...props}>
      <HeroSection />
      <ScheduleInstallationBanner />
      <FiberServices />
      <InternetPlansTable />
      <SpecialAboutFiber />
      <Testimonials />
      <CallToUpgrade />
      <FiberUpgradeFAQ />
    </MainLayout>
  )
}

export const getStaticProps = customStaticProps(
  '/why-frontier/why-fiber-internet/fiber-upgrade',
)

export default SSR
