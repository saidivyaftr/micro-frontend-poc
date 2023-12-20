import { VOICEMAIL_ACCESS_PAGE } from 'src/constants'
import { usePageLoadEvents } from 'src/hooks'
import MainLayout from '@/shared-ui/layouts/main'
import { VoicemailAccess } from 'src/libs/helpcenter/phone/VoicemailAccess'
import customStaticProps from 'src/utils/appData'

interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}

function SSR(props: PageProps): JSX.Element {
  const currentPageUrl =
    (typeof window !== 'undefined' && window?.location?.href) || ''
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: VOICEMAIL_ACCESS_PAGE,
      pageUrl: currentPageUrl,
    },
  })

  return (
    <MainLayout {...props}>
      <VoicemailAccess />
    </MainLayout>
  )
}

export const getStaticProps = customStaticProps(
  '/helpcenter/phone/voicemail-access',
)

export default SSR
