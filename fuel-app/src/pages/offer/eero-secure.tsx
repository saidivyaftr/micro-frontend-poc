import MainLayout from '@/shared-ui/layouts/main'
import customStaticProps from 'src/utils/appData'
import { FAQ, Hero, MobileApp } from 'src/libs/offer/eero-secure'
import { usePageLoadEvents } from 'src/hooks'
import { OFFER_EERO_SECURE_PAGE, VISITOR, SERVICEABLE } from 'src/constants'
import GetEeroSecure from 'src/libs/offer/eero-secure/GetEeroSecure'
import StickyBannerEero from 'src/libs/offer/eero-secure/StickyBanner'
// Todo : getStaticProps Props path to be changed
interface PageProps {
  data: any
  success: boolean
}

const Eero = (props: PageProps) => {
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    shouldTriggerInvoca: props?.success,
    eventData: {
      pageName: OFFER_EERO_SECURE_PAGE,
      eVar22: VISITOR,
      eVar49: SERVICEABLE,
    },
  })
  return (
    <MainLayout {...props}>
      <Hero />
      <StickyBannerEero />
      <MobileApp />
      <GetEeroSecure />
      <FAQ />
    </MainLayout>
  )
}

export const getStaticProps = customStaticProps('/offer/eero-secure')

export default Eero
