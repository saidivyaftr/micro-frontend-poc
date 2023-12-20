import Script from 'next/script'

const Library = () => {
  return <Script src="/at.js" strategy="afterInteractive" />
}

export default {
  Library,
}
