import {
  VISITOR,
  SERVICEABLE,
  SOCIAL_MEDIA_COMMUNITY_GUIDELINES,
} from 'src/constants'
import customStaticProps from 'src/utils/appData'
import MainLayout from '@/shared-ui/layouts/main'
import { Banner, Guidelines } from 'src/libs/social'
import { usePageLoadEvents } from 'src/hooks'

interface PageProps {
  data: any
  success: boolean
}

function SSR(props: PageProps): JSX.Element {
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: SOCIAL_MEDIA_COMMUNITY_GUIDELINES,
      eVar22: VISITOR,
      eVar49: SERVICEABLE,
    },
  })

  return (
    <MainLayout {...props}>
      <Banner />
      <Guidelines />
    </MainLayout>
  )
}

export const getStaticProps = customStaticProps('/social/socialguidelines')

export default SSR
