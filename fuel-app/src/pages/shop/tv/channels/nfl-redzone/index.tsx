import customStaticProps from 'src/utils/appData'
import { NFL_REDZONE_PAGE, VISITOR } from 'src/constants'
import MainLayout from '@/shared-ui/layouts/main'
import {
  InternetCredit,
  NbaAbout,
  NbaHero,
  NbaPricing,
} from 'src/libs/shop/tv/channels/nfl-redzone'
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
      pageName: NFL_REDZONE_PAGE,
      eVar22: VISITOR,
    },
  })
  return (
    <MainLayout {...props}>
      <NbaHero />
      <NbaPricing />
      <NbaAbout />
      <InternetCredit />
    </MainLayout>
  )
}

export const getStaticProps = customStaticProps('/shop/tv/channels/nfl-redzone')

export default SSR
