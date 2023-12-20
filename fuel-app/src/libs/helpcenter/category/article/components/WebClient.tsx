import Script from 'next/script'
const WebClient = ({ data }: any) => {
  if (!data || !data?.show?.value) return null
  return (
    <div className="container table-class">
      <div className="row">
        <br />
        <br />
      </div>
      <Script
        src="https://static.customersaas.com/frontier-us/en-us/webclient.js"
        strategy="afterInteractive"
      />
      <div id="qelpClient"></div>
    </div>
  )
}

export default WebClient
