import Script from 'next/script'
import { useDispatch, useSelector } from 'react-redux'
import { appConfigSlice } from 'src/redux/slicers'

const Library = () => {
  const dispatch = useDispatch()
  const { DTM } = useSelector((state: any) => state?.appConfig?.configs)
  if (DTM) return null
  const source =
    'https://assets.adobedtm.com/fc19531c0bf6205e4c8c1a357c620866eec50643/satelliteLib-4b8641237ab881231ea9edcc135d0fdd111e2a40.js'
  return (
    <Script
      src={source}
      strategy="afterInteractive"
      onLoad={() => {
        dispatch(appConfigSlice.actions.setConfig({ DTM: true }))
      }}
    />
  )
}
export default {
  Library,
}
