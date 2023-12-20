import customStaticProps from 'src/utils/appData'
import MainLayout from '@/shared-ui/layouts/main'
import {
  BlackHeader,
  RichContent,
  ConnecticutPrivacyForm,
} from 'src/libs/privacy-law'
import { usePageLoadEvents } from 'src/hooks'
import { CONNECTICUT_PRIVACY_LAW, VISITOR } from 'src/constants'

interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}

function SSR(props: PageProps): JSX.Element {
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: CONNECTICUT_PRIVACY_LAW,
      eVar22: VISITOR,
    },
  })
  return (
    <MainLayout {...props}>
      <BlackHeader />
      <RichContent />
      <ConnecticutPrivacyForm />
    </MainLayout>
  )
}
export const getStaticProps = customStaticProps('/connecticut-privacy-law')

export default SSR
