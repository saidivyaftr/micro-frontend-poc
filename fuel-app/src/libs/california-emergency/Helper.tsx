import dynamic from 'next/dynamic'

function MapHelper() {
  const Map = dynamic(() => import('./Map'), { ssr: false })
  return <Map />
}

export default MapHelper
