import customStaticProps from 'src/utils/appData'
import MainLayout from '@/shared-ui/layouts/main'
import { MAX_PAGE, VISITOR } from 'src/constants'
import {
  Hero,
  HowToOrder,
  AdditionalCost,
  AllHBOMax,
  Discovers,
  GreatestCollection,
  Faq,
} from 'src/libs/shop/tv/channels/hbo-max'
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
      pageName: MAX_PAGE,
      eVar22: VISITOR,
    },
  })

  return (
    <MainLayout {...props}>
      <Hero />
      <HowToOrder />
      <AdditionalCost />
      <AllHBOMax />
      <Discovers />
      <GreatestCollection />
      <Faq />
    </MainLayout>
  )
}

export const getStaticProps = customStaticProps('/shop/tv/channels/max')

export default SSR
