import Script from 'next/script'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { appConfigSlice } from 'src/redux/slicers'

const Library = () => {
  useEffect(() => {
    // @ts-ignore
    window.InvocaTagId = '1171/3920229500'
  }, [])
  const dispatch = useDispatch()
  const source = 'https://solutions.invocacdn.com/js/invoca-latest.min.js'

  return (
    <Script
      src={source}
      strategy="afterInteractive"
      onLoad={() => {
        dispatch(appConfigSlice.actions.setConfig({ INVOCA: true }))
      }}
    />
  )
}
function pageLoadEvent() {
  // @ts-ignore
  if (typeof Invoca != 'undefined' && typeof Invoca.PNAPI.run === 'function') {
    // @ts-ignore
    setTimeout(Invoca.PNAPI.run, 1500)
  }
}
export default {
  Library,
  pageLoadEvent,
}
