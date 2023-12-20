import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles'
import StyleSheet from 'src/utils/link'
const fontFiles = [
  'PPObjectSans-Regular.woff2',
  'PPObjectSans-Medium.woff2',
  'PPObjectSans-Bold.woff2',
  'BandwidthDisplay_Rg.woff2',
]
const MyDocument = () => {
  return (
    <Html lang="en">
      <Head>
        <StyleSheet
          rel="preconnect"
          href={process.env.CDN_URL || ''}
          crossOrigin=""
        />
        {/* Pre loads the fonts to avoid font flickering - Also cached in next.config.js
              so it will cache fonts in the browser and avoid it from re-downloading it again and again */}
        {fontFiles.map((file, index) => (
          <StyleSheet
            key={`font-file-${index}`}
            rel="preload"
            href={`${process.env.CDN_URL}/${file}`}
            as="font"
            crossOrigin=""
          />
        ))}
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <StyleSheet href={`${process.env.CDN_URL}/font-loader.css`} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
MyDocument.getInitialProps = async (ctx: any) => {
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) => (props: any, i: number) =>
        sheets.collect(<App key={i} {...props} />),
    })

  const initialProps = await Document.getInitialProps(ctx)
  return {
    ...initialProps,
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  }
}

export default MyDocument
