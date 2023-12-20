import React, { useState } from 'react'
import '../styles/globals.css'
import { Provider } from 'react-redux'
import theme from 'src/styles/theme'
import { ThemeProvider } from '@material-ui/core'
import store from 'src/redux/Store'
import 'swiper/swiper.min.css'
import PageHeadSeo from 'src/components/PageHeadSeo'
import { fetchPlaceholderData } from 'src/utils/appData/fetcher'
import { SessionProvider } from 'next-auth/react'
import 'react-smartbanner/dist/main.css'
import TagManager from 'react-gtm-module'
import { GTM_TRACKING_PAGES, GTM_ID } from 'src/utils/gtag'
import OneTrustCookie from 'src/utils/oneTrustCookie'
type IskipLoading = 'pending' | 'load' | 'ignore' | 'skip'
const MyApp = ({
  Component,
  pageProps,
  session,
  pageMeta,
  hideTitle,
  hideDescription,
  gtmIds = [],
}: any) => {
  const [skipLoading, setSkipLoading] = useState<IskipLoading>('pending')
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, [])
  const initializeGTM = () =>
    gtmIds.forEach((gtmId: string) => {
      TagManager.initialize({ gtmId })
    })
  React.useEffect(() => {
    try {
      const skipLoading = window?.location?.search?.includes(
        'loadscripts=false',
      )
        ? true
        : false
      setSkipLoading(skipLoading ? 'skip' : 'load')
      if (!skipLoading) initializeGTM()
    } catch {
      initializeGTM()
      setSkipLoading('ignore')
    }
  }, [])
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <PageHeadSeo
          pageMeta={pageMeta}
          hideTitle={hideTitle}
          hideDescription={hideDescription}
        />
        {['load', 'ignore'].includes(skipLoading) && <OneTrustCookie />}
        <SessionProvider
          session={session}
          basePath={process.env.NEXT_PUBLIC_NEXTAUTH_BASEPATH}
        >
          <Component {...pageProps} />
        </SessionProvider>
      </ThemeProvider>
    </Provider>
  )
}

MyApp.getInitialProps = async (context: any) => {
  const pageProps = {}
  const { asPath = '' } = context?.ctx
  let { pathname = '' } = context?.ctx
  const extractedPath = asPath?.split('?')
  if (asPath.includes('completeRegistration')) {
    pathname = '/completeRegistration'
    extractedPath[0] = '/completeRegistration'
  }

  if (pathname !== '/404') {
    const response = await fetchPlaceholderData(
      extractedPath?.[0] || pathname || '/',
      context.ctx.locale,
      'meta',
    )
    const pageMeta = response?.contextItem || {}
    const hideTitlePages = ['/verify', '/dummy-chatbot-test']
    const hideDescription = hideTitlePages.includes(pathname)
    const hideTitle = hideTitlePages.includes(pathname)
    const gtmIds = GTM_TRACKING_PAGES[pathname]
      ? [GTM_ID, GTM_TRACKING_PAGES[pathname]]
      : [GTM_ID]
    return {
      ...pageProps,
      pageMeta,
      hideDescription,
      hideTitle,
      gtmIds: extractedPath?.[1]?.includes('loadscripts=false') ? [] : gtmIds,
    }
  }
  return pageProps
}

export default MyApp
