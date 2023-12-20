/* eslint-disable @next/next/no-sync-scripts */
import React from 'react'
import Head from 'next/head'
import Script from 'next/script'

const OneTrustCookie = () => {
  const SOURCE = 'https://cdn.cookielaw.org/scripttemplates/otSDKStub.js'
  const CONFIG = process.env.ONE_TRUST_DOMAIN_KEY
  return (
    <>
      <Head>
        <script
          type="text/javascript"
          // strategy="lazyOnload"
          src={SOURCE}
          data-domain-script={CONFIG}
        />
      </Head>
      <Script
        type="text/javascript"
        dangerouslySetInnerHTML={{ __html: `function OptanonWrapper(){}` }}
      />
    </>
  )
}
export default React.memo(OneTrustCookie)
