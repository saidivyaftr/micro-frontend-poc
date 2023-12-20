import customStaticProps from 'src/utils/appData'
import MainLayout from '@/shared-ui/layouts/main'
import { ACTIVATE_ID_EXPIRED, SERVICEABLE, VISITOR } from 'src/constants'
import { usePageLoadEvents } from '@/shared-ui/hooks/index'
import AccountExpired from 'src/libs/invite/expired/AccountExpired'

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
      pageName: ACTIVATE_ID_EXPIRED,
      eVar22: VISITOR,
      eVar49: SERVICEABLE,
    },
  })
  return (
    <MainLayout {...props}>
      <AccountExpired />
    </MainLayout>
  )
}
export const getStaticProps = customStaticProps('/invite/expired')

export default SSR
