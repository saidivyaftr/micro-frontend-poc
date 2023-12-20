import customStaticProps from 'src/utils/appData'
import MainLayout from '@/shared-ui/layouts/main'
import { NEW_CHANNELS_PAGE, VISITOR, SERVICEABLE } from 'src/constants'
import {
  Hero,
  EntertainmentChannels,
  SportsFanFavorites,
  DirectKick,
  SwiperContent,
} from 'src/libs/shop/tv/channels'
import { usePageLoadEvents } from 'src/hooks'
import { InternetPlansTable } from 'src/components/InternetPlansTable'

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
      pageName: NEW_CHANNELS_PAGE,
      eVar22: VISITOR,
      eVar49: SERVICEABLE,
    },
  })

  return (
    <MainLayout {...props} showChat={false}>
      <Hero />
      <EntertainmentChannels />
      <SwiperContent />
      <SportsFanFavorites />
      <InternetPlansTable />
      <DirectKick />
    </MainLayout>
  )
}

export const getStaticProps = customStaticProps('/shop/tv/channels')

export default SSR
