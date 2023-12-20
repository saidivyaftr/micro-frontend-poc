import MainLayout from '@/shared-ui/layouts/main'
import customStaticProps from 'src/utils/appData'
import { Hero, WithDirectv, Prices, Details } from 'src/libs/offer/directv'
import { usePageLoadEvents } from 'src/hooks'
import { OFFER_DIRECTV_PAGE, VISITOR, SERVICEABLE } from 'src/constants'

interface PageProps {
  data: any
  success: boolean
}

const Directv = (props: PageProps) => {
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    shouldTriggerInvoca: props?.success,
    eventData: {
      pageName: OFFER_DIRECTV_PAGE,
      eVar22: VISITOR,
      eVar49: SERVICEABLE,
    },
  })
  return (
    <MainLayout {...props}>
      <Hero />
      <WithDirectv />
      <Prices />
      <Details />
    </MainLayout>
  )
}

export const getStaticProps = customStaticProps('/offer/directv')

export default Directv
