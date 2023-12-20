import customStaticProps from 'src/utils/appData'
import MainLayout from '@/shared-ui/layouts/main'
import {
  REGISTRATION_INVITE_SUCCESS,
  SERVICEABLE,
  VISITOR,
} from 'src/constants'
import { usePageLoadEvents } from '@/shared-ui/hooks/index'
import InviteSent from 'src/libs/invite/invite-sent/InviteSent'

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
      pageName: REGISTRATION_INVITE_SUCCESS,
      eVar22: VISITOR,
      eVar49: SERVICEABLE,
    },
  })
  return (
    <MainLayout {...props}>
      <InviteSent />
    </MainLayout>
  )
}
export const getStaticProps = customStaticProps('/invite/invite-sent')

export default SSR
