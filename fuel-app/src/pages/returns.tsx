import customStaticProps from 'src/utils/appData'
import MainLayout from '@/shared-ui/layouts/main'
import Returns from 'src/libs/returns/Returns'
import { usePageLoadEvents } from '../hooks'
import { EQUIPMENT_RETURN_FIND, SERVICEABLE, VISITOR } from 'src/constants'

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
      pageName: EQUIPMENT_RETURN_FIND,
      eVar22: VISITOR,
      eVar49: SERVICEABLE,
    },
  })
  return (
    <MainLayout {...props}>
      <Returns />
    </MainLayout>
  )
}
export const getStaticProps = customStaticProps('/returns')

export default SSR
