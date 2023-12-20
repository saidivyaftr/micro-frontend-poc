import customStaticProps from 'src/utils/appData'
import MainLayout from '@/shared-ui/layouts/main'
import {
  CONTACT_US_PAGE,
  VISITOR,
  UNVERIFIED_SERVICE_AREA,
} from 'src/constants'
import { usePageLoadEvents } from 'src/hooks'
import {
  ContactUsHero,
  SelfHelpTools,
  GetInTouch,
  SelfHelpArticles,
  ContactUsCenterFAQ,
} from 'src/libs/contactus'

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
      pageName: CONTACT_US_PAGE,
      pageUrl: currentPageUrl,
      eVar22: VISITOR,
      eVar49: UNVERIFIED_SERVICE_AREA,
    },
  })
  return (
    <MainLayout {...props}>
      <ContactUsHero />
      <SelfHelpTools />
      <GetInTouch />
      <SelfHelpArticles />
      <ContactUsCenterFAQ />
    </MainLayout>
  )
}
export const getStaticProps = customStaticProps('/contact-us')

export default SSR
