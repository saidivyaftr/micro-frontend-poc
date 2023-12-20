import customStaticProps from 'src/utils/appData'
import MainLayout from '@/shared-ui/layouts/main'
import { usePageLoadEvents } from 'src/hooks'
import { HELP_CENTER, UNVERIFIED_SERVICE_AREA, VISITOR } from 'src/constants'

import {
  Header,
  WhatToExpect,
  TrackOrders,
  FrontierInstallationFAQ,
} from 'src/libs/helpcenter/frontier-installation'
interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}

function SSR(props: PageProps): JSX.Element {
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: `${HELP_CENTER}/frontier-installation`,
      eVar22: VISITOR,
      eVar49: UNVERIFIED_SERVICE_AREA,
    },
  })
  return (
    <MainLayout {...props}>
      <Header />
      <TrackOrders />
      <WhatToExpect />
      <FrontierInstallationFAQ />
    </MainLayout>
  )
}
export const getStaticProps = customStaticProps(
  '/helpcenter/frontier-installation',
)

export default SSR
