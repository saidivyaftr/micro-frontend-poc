import customStaticProps from 'src/utils/appData'
import MainLayout from '@/shared-ui/layouts/main'
import {
  MULTIFAMILY_PAGE,
  UNVERIFIED_SERVICE_AREA,
  VISITOR,
} from 'src/constants'

import {
  HeroSection,
  FutureProof,
  WhiteGloveInstallation,
  SwiperContent,
  LagInfo,
  MultiFamilyCommunity,
  MultifamilyForm,
} from 'src/libs/resources/multifamily'
import { Testimonials } from 'src/components/Testimonials'
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
      pageName: MULTIFAMILY_PAGE,
      eVar22: VISITOR,
      eVar49: UNVERIFIED_SERVICE_AREA,
    },
  })
  return (
    <div>
      <MainLayout {...props}>
        <HeroSection />
        <FutureProof />
        <SwiperContent />
        <LagInfo />
        <MultiFamilyCommunity />
        <WhiteGloveInstallation />
        <Testimonials />
        <MultifamilyForm />
      </MainLayout>
    </div>
  )
}

export const getStaticProps = customStaticProps('/resources/multifamily')

export default SSR
