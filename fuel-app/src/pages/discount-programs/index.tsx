import {
  DISCOUNT_PROGRAMS_PAGE,
  UNVERIFIED_SERVICE_AREA,
  VISITOR,
} from 'src/constants'
import { usePageLoadEvents } from 'src/hooks'
import MainLayout from '@/shared-ui/layouts/main'
import {
  DiscountProgramFAQ,
  Funding,
  AffordableConnectivityProgram,
  LifeLineServices,
  CardClicks,
  HeroSection,
} from 'src/libs/discount-programs'
import customStaticProps from 'src/utils/appData'

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
      pageName: DISCOUNT_PROGRAMS_PAGE,
      eVar22: VISITOR,
      eVar49: UNVERIFIED_SERVICE_AREA,
    },
  })
  return (
    <>
      <MainLayout {...props}>
        <HeroSection />
        <AffordableConnectivityProgram />
        <LifeLineServices />
        <Funding />
        <DiscountProgramFAQ />
        <CardClicks />
      </MainLayout>
    </>
  )
}
export const getStaticProps = customStaticProps('/discount-programs')

export default SSR
