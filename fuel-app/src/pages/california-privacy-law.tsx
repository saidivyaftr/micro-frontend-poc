import { customStaticPropsfromAzure } from 'src/utils/appData'
import MainLayout from '@/shared-ui/layouts/main'

import {
  BlackHeader,
  RichContent,
  CaliforniaPrivacyForm,
} from 'src/libs/privacy-law'

import { usePageLoadEvents } from 'src/hooks'
import { CCPA, VISITOR } from 'src/constants'

interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}

function SSR(props: PageProps): JSX.Element {
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: CCPA,
      eVar22: VISITOR,
    },
  })
  return (
    <MainLayout {...props}>
      <BlackHeader />
      <RichContent />
      <CaliforniaPrivacyForm />
    </MainLayout>
  )
}
export const getStaticProps = customStaticPropsfromAzure(
  '/california-privacy-law',
)

export default SSR
