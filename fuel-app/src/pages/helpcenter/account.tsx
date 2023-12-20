import customStaticProps from 'src/utils/appData'
import MainLayout from '@/shared-ui/layouts/main'
import { HelpCenterPage } from 'src/libs/helpcenter/help-center'
import { usePageLoadEvents } from 'src/hooks'
import { HELP_CENTER, UNVERIFIED_SERVICE_AREA, VISITOR } from 'src/constants'
interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}

function SSR(props: PageProps): JSX.Element {
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: `${HELP_CENTER}/account`,
      eVar22: VISITOR,
      eVar49: UNVERIFIED_SERVICE_AREA,
    },
  })
  return (
    <MainLayout {...props}>
      <HelpCenterPage page="account" />
    </MainLayout>
  )
}
export const getStaticProps = customStaticProps('/helpcenter/account')

export default SSR
