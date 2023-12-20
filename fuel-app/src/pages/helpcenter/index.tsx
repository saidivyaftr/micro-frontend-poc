import customStaticProps from 'src/utils/appData'
import MainLayout from '@/shared-ui/layouts/main'
import { HelpCenterPage } from 'src/libs/helpcenter/help-center'
import { usePageLoadEvents } from 'src/hooks'
import { UNVERIFIED_SERVICE_AREA, VISITOR, HELP_CENTER } from 'src/constants'

interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}

function SSR(props: PageProps): JSX.Element {
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: HELP_CENTER,
      eVar22: VISITOR,
      eVar49: UNVERIFIED_SERVICE_AREA,
    },
  })
  return (
    <MainLayout {...props}>
      <HelpCenterPage page="" />
    </MainLayout>
  )
}
export const getStaticProps = customStaticProps('/helpcenter')

export default SSR
