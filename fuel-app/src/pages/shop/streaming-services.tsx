import { STREAM_SERVICES_PAGE, VISITOR, SERVICEABLE } from 'src/constants'
import customStaticProps from 'src/utils/appData'
import MainLayout from '@/shared-ui/layouts/main'
import {
  Banner,
  Cards,
  FiberStreamingFAQ,
} from 'src/libs/shop/streaming-services'
import { usePageLoadEvents } from 'src/hooks'

interface PageProps {
  data: any
  success: boolean
}

function SSR(props: PageProps): JSX.Element {
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: STREAM_SERVICES_PAGE,
      eVar22: VISITOR,
      eVar49: SERVICEABLE,
    },
  })

  return (
    <MainLayout {...props}>
      <Banner />
      <Cards />
      <FiberStreamingFAQ />
    </MainLayout>
  )
}

export const getStaticProps = customStaticProps('/shop/streaming-services')

export default SSR
