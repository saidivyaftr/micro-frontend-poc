import { Fragment, useEffect, useState } from 'react'
import Head from 'next/head'
import { metaData, TESTING_DOMAINS } from 'src/constants'

const PageHead = ({ pageMeta = {}, hideTitle, hideDescription }: any) => {
  const {
    metaTitle,
    metaDescription,
    metaKeywords,
    CanonicalTag,
    index,
    favIcon,
    appleMetaContent,
    googleMetaContent,
    smartIcon,
    heroImage,
    heroMobileImage,
  } = pageMeta

  const [robotsDesc, setRobotsDesc] = useState('')

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      !TESTING_DOMAINS.includes(window?.location?.hostname)
    )
      setRobotsDesc(index?.value)
    else setRobotsDesc(metaData?.robotsValue)
  }, [index])
  return (
    <Fragment>
      <Head>
        <>
          {!hideTitle && (
            <title>
              {metaTitle?.value ? metaTitle.value : metaData?.metaTitle}
            </title>
          )}
          <meta name="author" content={metaData?.metaTitle}></meta>
          {!hideDescription && (
            <meta
              name="description"
              content={
                metaDescription?.value
                  ? metaDescription.value
                  : metaData?.metaDescription
              }
            />
          )}
          <meta
            name="keywords"
            content={
              metaKeywords?.value ? metaKeywords.value : metaData?.metaKeywords
            }
          />
          <meta httpEquiv="Cache-control" content="public" />
          <meta name="theme-color" content="#317EFB" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          {!hideTitle && (
            <meta
              name="title"
              content={metaTitle?.value ? metaTitle.value : metaData?.metaTitle}
            />
          )}
          <meta name="robots" content={robotsDesc} />
          {favIcon?.url && <link rel="shortcut icon" href={favIcon?.url} />}
          {favIcon?.url && (
            <link rel="icon" href={favIcon?.url} type="image/ico" />
          )}
          {CanonicalTag?.value && (
            <link rel="canonical" href={CanonicalTag?.value} />
          )}
          {CanonicalTag?.value && (
            <link
              rel="alternate"
              hrefLang="x-default"
              href={CanonicalTag?.value}
            />
          )}
          {CanonicalTag?.value && (
            <link rel="alternate" hrefLang="en-us" href={CanonicalTag?.value} />
          )}
          {heroImage?.src && (
            <link rel="preload" href={heroImage?.src} as="image" />
          )}
          {heroMobileImage?.src && (
            <link rel="preload" href={heroMobileImage?.src} as="image" />
          )}
        </>
        <meta name="apple-itunes-app" content={appleMetaContent?.value} />
        <meta name="google-play-app" content={googleMetaContent?.value} />
        <link rel="apple-touch-icon" href={smartIcon?.src} />
        <link rel="android-touch-icon" href={smartIcon?.src} />
      </Head>
    </Fragment>
  )
}

export default PageHead
