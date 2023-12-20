import customStaticProps from 'src/utils/appData'
import MainLayout from '@/shared-ui/layouts/main'
import {
  FIBER_CONSTRUCTION,
  VISITOR,
  UNVERIFIED_SERVICE_AREA,
} from 'src/constants'
import {
  SpecialAboutFiber,
  OurPromise,
  FiberInternetFAQ,
  PreferToCall,
  FiberImpact,
  WhatToExpect,
  HeroSection,
} from 'src/libs/why-frontier/why-fiber-internet/fiber-construction'
import { Testimonials } from 'src/components/Testimonials'
import { usePageLoadEvents } from 'src/hooks'
interface PageProps {
  data: any
  success: boolean
}

function SSR(props: PageProps): JSX.Element {
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    shouldTriggerInvoca: props?.success,
    eventData: {
      pageName: FIBER_CONSTRUCTION,
      eVar22: VISITOR,
      eVar49: UNVERIFIED_SERVICE_AREA,
    },
  })
  return (
    <MainLayout {...props}>
      <HeroSection />
      <WhatToExpect />
      <SpecialAboutFiber />
      <FiberImpact />
      <OurPromise />
      <Testimonials />
      <FiberInternetFAQ />
      <PreferToCall />
    </MainLayout>
  )
}

export const getStaticProps = customStaticProps(
  '/why-frontier/why-fiber-internet/fiber-construction',
)

export default SSR
