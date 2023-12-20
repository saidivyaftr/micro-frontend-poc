import MainLayout from '@/shared-ui/layouts/main'
import customStaticProps from 'src/utils/appData'
import {
  Hero,
  AppleTVFAQ,
  WhyFrontier,
  AppleOriginals,
  RedeemCard,
  AppleExperiance,
  FiberTwoGig,
} from 'src/libs/offer/apple-tv'
import { usePageLoadEvents } from 'src/hooks'
import { APPLE_TV_PAGE, VISITOR, SERVICEABLE } from 'src/constants'

interface PageProps {
  data: any
  success: boolean
}

const AppleTV = (props: PageProps) => {
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    shouldTriggerInvoca: props?.success,
    eventData: {
      pageName: APPLE_TV_PAGE,
      eVar22: VISITOR,
      eVar49: SERVICEABLE,
    },
  })

  return (
    <MainLayout {...props}>
      <Hero />
      <RedeemCard />
      <AppleExperiance />
      <AppleOriginals />
      <WhyFrontier />
      <FiberTwoGig />
      <AppleTVFAQ />
    </MainLayout>
  )
}

export const getStaticProps = customStaticProps('/offer/apple-tv')

export default AppleTV
