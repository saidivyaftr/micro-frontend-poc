import { Fragment, useMemo } from 'react'
import Head from 'next/head'
import DTMScripts from 'src/utils/adobe/dynamicTagManagement/components'
import InvocaScripts from 'src/utils/invoca'
import DynatraceTracking from 'src/utils/dynatrace'
import Script from 'next/script'
import GTagScripts, {
  GTAGPageLoad,
  GTAG_ID,
  GTAG_TRACKING_PAGES,
} from 'src/utils/gtag'
import { useRouter } from 'next/router'
const PageHead = () => {
  const router = useRouter()
  const { gtagId } = useMemo(
    () => ({
      gtagId: GTAG_TRACKING_PAGES[router.asPath],
    }),
    [router],
  )

  const skipLoading = useMemo(() => {
    const { loadscripts } = router.query
    const skipLoading = loadscripts && loadscripts === 'false' ? true : false
    return skipLoading
  }, [router])

  const renderGTagScripts = () => {
    if (skipLoading) return
    try {
      return (
        <>
          {/* GTAG global */}
          {GTagScripts.Library(GTAG_ID)}
          {/* // GTM global */}
          {/* GTAG init and dataLayer global */}
          <GTAGPageLoad id={GTAG_ID} />
          {/* GTAG page specific */}
          {GTagScripts.Library(gtagId)}
          <GTAGPageLoad id={gtagId} />
        </>
      )
    } catch (error) {
      console.error('UNABLE TO LOAD GTagScripts', error)
    }
  }

  const renderAdobeScripts = () => {
    if (skipLoading) return
    try {
      return <>{DTMScripts.Library()}</>
    } catch (error) {
      console.error('UNABLE TO LOAD DTMScripts', error)
    }
  }
  return (
    <Fragment>
      <Head>
        <Script
          src={`${process.env.CDN_URL}/at.js`}
          strategy="beforeInteractive"
        />
      </Head>
      {renderGTagScripts()}
      {renderAdobeScripts()}
      {!skipLoading && InvocaScripts.Library()}
      <DynatraceTracking />
    </Fragment>
  )
}

export default PageHead
