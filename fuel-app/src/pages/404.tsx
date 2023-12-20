import dynamic from 'next/dynamic'
import { NOT_FOUND_PAGE, UNVERIFIED_SERVICE_AREA, VISITOR } from 'src/constants'
const PageHead = dynamic(() => import('src/components/PageHead'))
import { NotFound } from 'src/libs/404'
import { usePageLoadEvents } from 'src/hooks'
import Head from 'next/head'

export default function SSR(): JSX.Element {
  const currentPageUrl =
    (typeof window !== 'undefined' && window?.location?.href) || ''
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: NOT_FOUND_PAGE,
      eVar22: VISITOR,
      eVar49: UNVERIFIED_SERVICE_AREA,
      prop31: '404 error',
      pageUrl: currentPageUrl,
      events: 'event28',
      pageType: 'errorPage',
    },
  })

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/pages/favicon.ico" />
        <link rel="icon" href="/pages/favicon.ico" type="image/ico" />
      </Head>
      <PageHead />
      <NotFound />
    </>
  )
}
