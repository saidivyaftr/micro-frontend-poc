import React from 'react'
import Script from 'next/script'
const DynatraceTracking = () => {
  const SOURCE = '/ruxitagentjs_ICA27Vfgjqrux_10247220811100421.js'
  const CONFIG =
    'app=2d1479aa85a6dd11|rcdec=1209600000|featureHash=ICA27Vfgjqrux|vcv=2|reportUrl=/rb_d40724e8-4da5-4795-854b-8f813ddd2358|rdnt=1|uxrgce=1|bp=3|srmcrv=10|cuc=yoqzg8j0|mel=100000|dpvc=1|ssv=4|lastModification=1648103489062|dtVersion=10247220811100421|srmcrl=1|tp=500,50,0,1|uxdcw=1500|agentUri=/ruxitagentjs_ICA27Vfgjqrux_10247220811100421.js'
  return (
    <Script strategy="afterInteractive" src={SOURCE} data-dtconfig={CONFIG} />
  )
}
export default React.memo(DynatraceTracking)
