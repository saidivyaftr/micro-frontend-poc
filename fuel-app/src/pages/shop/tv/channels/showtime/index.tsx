import customStaticProps from 'src/utils/appData'
import MainLayout from '@/shared-ui/layouts/main'
import { VISITOR, SERVICEABLE, SHOWTIME_PAGE } from 'src/constants'
import { usePageLoadEvents } from 'src/hooks'
import {
  ShowTimeBreakThrough,
  ShowTimeHero,
  ShowTimeOrder,
} from 'src/libs/shop/tv/channels/showtime'

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
      pageName: SHOWTIME_PAGE,
      eVar22: VISITOR,
      eVar49: SERVICEABLE,
    },
  })
  return (
    <MainLayout {...props}>
      <ShowTimeHero />
      <ShowTimeOrder />
      <ShowTimeBreakThrough />
    </MainLayout>
  )
}
export const getStaticProps = customStaticProps('/shop/tv/channels/showtime')

export default SSR
