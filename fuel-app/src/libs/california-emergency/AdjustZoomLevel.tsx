import { useMapEvents } from 'react-leaflet'
import { useEffect } from 'react'

interface PageProps {
  // eslint-disable-next-line no-unused-vars
  setZoomLevel: (event: any) => void
}

const AdjustZoomLevel = (props: PageProps) => {
  const { setZoomLevel } = props

  useEffect(() => {
    mapEvents
      .getContainer()
      .children[1].firstElementChild?.firstElementChild?.children[1].attributes?.removeNamedItem(
        'href',
      )
    mapEvents
      .getContainer()
      .children[1].firstElementChild?.firstElementChild?.children[0].attributes?.removeNamedItem(
        'href',
      )
  }, [])

  const mapEvents = useMapEvents({
    zoomend: () => {
      setZoomLevel(mapEvents.getZoom())
    },
  })
  return null
}

export default AdjustZoomLevel
