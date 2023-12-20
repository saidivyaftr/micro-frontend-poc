import customStaticProps from 'src/utils/appData'
import MainLayout from '@/shared-ui/layouts/main'
import { usePageLoadEvents } from '../hooks'
import { SERVICEABLE, SITE_MAP, VISITOR } from 'src/constants'
import SiteMap from 'src/libs/sitemap/Sitemap'
import SiteMapHelp from 'src/libs/sitemap/Sitemap-help'
import SiteMapFrontierCommunications from 'src/libs/sitemap/Sitemap-communications'

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
      pageName: SITE_MAP,
      eVar22: VISITOR,
      eVar49: SERVICEABLE,
    },
  })
  return (
    <MainLayout {...props}>
      <SiteMap />
      <SiteMapHelp />
      <SiteMapFrontierCommunications />
    </MainLayout>
  )
}
export const getStaticProps = customStaticProps('/page-sitemap')

export default SSR
