import customStaticProps from 'src/utils/appData'
import MainLayout from '@/shared-ui/layouts/main'
import { ACCOUNT_EXIST, SERVICEABLE, VISITOR } from 'src/constants'
import { usePageLoadEvents } from '@/shared-ui/hooks/index'
import AccountExists from 'src/libs/invite/account-exist/AccountExists'

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
      pageName: ACCOUNT_EXIST,
      eVar22: VISITOR,
      eVar49: SERVICEABLE,
    },
  })
  return (
    <MainLayout {...props}>
      <AccountExists />
    </MainLayout>
  )
}
export const getStaticProps = customStaticProps('/invite/account-exist')

export default SSR
