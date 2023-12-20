import Script from 'next/script'
import { useDispatch, useSelector } from 'react-redux'
import { appConfigSlice } from 'src/redux/slicers'
import { Fragment } from 'react'
import Image from 'next/future/image'

type GoogleTagType = {
  id?: string
}

const Library = (id: string) => {
  const dispatch = useDispatch()
  const { GTAG } = useSelector((state: any) => state?.appConfig?.configs)
  if (GTAG[id]) return null
  const SOURCE = 'https://www.googletagmanager.com/gtag/js?id=' + id
  return (
    <Script
      src={SOURCE}
      strategy="afterInteractive"
      onLoad={() => {
        dispatch(appConfigSlice.actions.setGTAGConfig({ [id]: true }))
      }}
    />
  )
}

export const GTAGPageLoad = ({ id }: GoogleTagType) => {
  const { GTAG } = useSelector((state: any) => state?.appConfig?.configs)
  if (!id || !GTAG[id] || typeof gtag === 'undefined') return null
  return (
    <Script
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag() { dataLayer.push(arguments); }
          gtag('js', new Date());
          gtag('config','${id}');`,
      }}
    />
  )
}

export const GTagPageLoadEvent = ({ id }: GoogleTagType) => {
  const { GTAG } = useSelector((state: any) => state?.appConfig?.configs)
  if (
    !id ||
    !GTAG[id] ||
    typeof window === 'undefined' ||
    typeof gtag === 'undefined'
  )
    return null
  const URL = window?.location?.href
  return (
    <Fragment>
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                gtag('event', 'conversion', {
                  'allow_custom_scripts': true,
                  'u4': '[${URL}]',
                  'send_to': '${id}/fronhp/trili006+standard'
                });
                gtag('event', 'conversion', {
                  'allow_custom_scripts': true,
                  'u4': '[${URL}]',
                  'send_to': '${id}/fronhp/trili00b+unique'
                });
                  `,
        }}
      />
      <noscript>
        <img
          src="https://ad.doubleclick.net/ddm/activity/src=8577835;type=fronhp;cat=trili006;u4=[URL];dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?"
          width="1"
          height="1"
          alt=""
          loading="lazy"
        />
      </noscript>
      <noscript>
        <img
          src="https://ad.doubleclick.net/ddm/activity/src=8577835;type=fronhp;cat=trili00b;u4=[URL];dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1;num=1?"
          width="1"
          height="1"
          alt=""
          loading="lazy"
        />
      </noscript>
    </Fragment>
  )
}

export const GTag5GigPageLoadEvent = () => {
  const { GTAG } = useSelector((state: any) => state?.appConfig?.configs)
  if (!GTAG[GTAGID_5GIG] || typeof gtag === 'undefined') return null
  return (
    <Fragment>
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          gtag('event', 'conversion', {
            'allow_custom_scripts': true,
            'send_to': '${GTAGID_5GIG}/front0/front0+standard'
          });`,
        }}
      />
      <noscript>
        <Image
          loader={() =>
            'https://ad.doubleclick.net/ddm/activity/src=12667201;type=front0;cat=front0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?'
          }
          src="https://ad.doubleclick.net/ddm/activity/src=12667201;type=front0;cat=front0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?"
          width="1"
          height="1"
          alt=""
        />
      </noscript>
    </Fragment>
  )
}

export const GTM_TRACKING_PAGES: any = {
  '/discount-programs/affordable-connectivity-program': 'GTM-K67NKTS',
}
export const GTAG_ID = 'DC-8577835'
export const GTAG_TUTORIALS_ID = 'DC-8577835'
const GTAGID_5GIG = 'DC-12667021'
export const GTM_ID = 'GTM-W8MX7L5'

export const GTAG_TRACKING_PAGES: any = {
  '/shop/internet/fiber-internet/5-gig': GTAGID_5GIG,
  '/helpcenter/topics/tutorials': GTAG_TUTORIALS_ID,
}

export default {
  Library,
}
