import customStaticProps from 'src/utils/appData'
import MainLayout from '@/shared-ui/layouts/main'
import Script from 'next/script'
import { useRouter } from 'next/router'
import { useAppData, usePageLoadEvents } from '../hooks'
import { SEARCH_PAGE, UNVERIFIED_SERVICE_AREA, VISITOR } from 'src/constants'
import Head from 'next/head'
interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}

function SSR(props: PageProps): JSX.Element {
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: SEARCH_PAGE,
      eVar22: VISITOR,
      eVar49: UNVERIFIED_SERVICE_AREA,
    },
  })

  const { query } = useRouter() || {}
  const { embedLink } = useAppData('yext', true)
  const scriptLink = '//script.crazyegg.com/pages/scripts/0027/3707.js'
  let fullLink =
    embedLink?.value ||
    'https://answers-embed_frontier_com.yextpages.net/iframe.js'
  if (query.query) {
    fullLink += '?query=' + query.query
  }
  return (
    <>
      <Head>
        <script type="text/javascript" src={scriptLink} async></script>
      </Head>
      <MainLayout {...props} showDotcomChatbot={true}>
        <div id="answers-container"></div>
        <Script src={fullLink}></Script>
      </MainLayout>
    </>
  )
}
export const getStaticProps = customStaticProps('/search')

export default SSR
