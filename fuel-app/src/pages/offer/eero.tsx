import MainLayout from '@/shared-ui/layouts/main'
import customStaticProps from 'src/utils/appData'
import {
  Hero,
  WhatMakesEero,
  FrontierEero,
  SwiperContent,
  EeroSecure,
} from 'src/libs/offer/eero'
import { usePageLoadEvents } from 'src/hooks'
import { Testimonials } from 'src/components/Testimonials'
import { OFFER_EERO_PAGE, VISITOR, SERVICEABLE } from 'src/constants'
import { InternetPlansTable } from '../../components/InternetPlansTable'
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
      pageName: OFFER_EERO_PAGE,
      eVar22: VISITOR,
      eVar49: SERVICEABLE,
    },
  })
  return (
    <MainLayout {...props} showChat={false}>
      <Hero />
      <FrontierEero />
      <SwiperContent />
      <EeroSecure />
      <WhatMakesEero />
      <InternetPlansTable />
      <Testimonials />
    </MainLayout>
  )
}

export const getStaticProps = customStaticProps('/offer/eero')

export default Eero
