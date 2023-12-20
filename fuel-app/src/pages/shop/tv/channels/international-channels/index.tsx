import customStaticProps from 'src/utils/appData'
import MainLayout from '@/shared-ui/layouts/main'
import {
  NEW_CHANNELS_INTERNATIONAL_CHANNELS_PAGE,
  VISITOR,
  SERVICEABLE,
} from 'src/constants'
import {
  Hero,
  SwiperContent,
  CheckAvailabilityInfo,
} from 'src/libs/shop/tv/channels/international-channels'
import { usePageLoadEvents } from 'src/hooks'
import { useAppData } from 'src/hooks'

interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}

function SSR(props: PageProps): JSX.Element {
  const { tabsData } = useAppData('internationalChannelsTabs', true)
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    shouldTriggerInvoca: props?.success,
    eventData: {
      pageName: NEW_CHANNELS_INTERNATIONAL_CHANNELS_PAGE,
      eVar22: VISITOR,
      eVar49: SERVICEABLE,
    },
  })

  return (
    <>
      <MainLayout {...props} showChat={false}>
        <Hero />
        {tabsData?.tabs.map((eachTab: any, index: number) => (
          <SwiperContent {...eachTab} key={index + 'item'} />
        ))}
      </MainLayout>
      <CheckAvailabilityInfo />
    </>
  )
}

export const getStaticProps = customStaticProps(
  '/shop/tv/channels/international-channels',
)

export default SSR
