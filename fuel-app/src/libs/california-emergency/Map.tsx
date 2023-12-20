import {
  MapContainer,
  TileLayer,
  Marker,
  GeoJSON,
  Polygon,
} from 'react-leaflet'
import { useState, useEffect } from 'react'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import * as topojson from 'topojson-client'
import ToggleButton from './Toggle'
import { makeStyles } from '@material-ui/core'
import { GeometryObject, Topology } from 'topojson-specification'
import AdjustZoomLevel from './AdjustZoomLevel'
import PopupData from './PopupData'
import { LocationMarker } from '@/shared-ui/react-icons'
import ReactDOMServer from 'react-dom/server'
import ErrorHandling from './ErrorHandling'
import { PADDING, OUTAGE, DISASTER, SERVICE_OUTAGE } from 'src/constants'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'
import APIClient from 'src/api-client'

const Map = () => {
  const [isService, setIsService] = useState(false)
  const [isPower, setIsPower] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(5)
  const [disaster, setDisaster] = useState<{
    type: string
    name: string
    features: any
  }>({
    type: '',
    name: '',
    features: [],
  })
  const [outage, setOutage] = useState<{
    type: string
    name: string
    features: any
  }>({
    type: '',
    name: '',
    features: [],
  })
  const [serviceOutage, setServiceOutage] = useState<{
    type: string
    name: string
    features: any
  }>({
    type: '',
    name: '',
    features: [],
  })
  const [serviceOutageError, setServiceOutageError] = useState('')
  const [outageError, setOutageError] = useState('')
  const [disasterError, setDisasterError] = useState('')

  const mapData = useAppData('map', true)
  const jsonData = mapData?.jsonData?.value
    ? JSON.parse(mapData?.jsonData?.value)
    : {}
  const serviceCounties =
    jsonData?.objects != null &&
    topojson.feature(
      jsonData as unknown as Topology,
      jsonData.objects?.Service_Counties as GeometryObject,
    )
  const serviceBounds =
    jsonData?.objects != null &&
    topojson.feature(
      jsonData as unknown as Topology,
      jsonData.objects?.Service_Bounds as GeometryObject,
    )
  const CaState =
    jsonData?.objects != null &&
    topojson.feature(
      jsonData as unknown as Topology,
      jsonData.objects?.CA_State as GeometryObject,
    )
  const ZipCodes =
    jsonData?.objects != null &&
    topojson.feature(
      jsonData as unknown as Topology,
      jsonData.objects?.Service_ZipCodes as GeometryObject,
    )

  const OnEachZipCodeFeature = (feature: any, layer: any) => {
    const tooltipChildren = feature.properties.zcta5ce10
    const content = `<div> ${tooltipChildren} </div>`
    return layer.bindTooltip(content, {
      direction: 'center',
      permanent: true,
      className: classes.toolTipContent,
    })
  }

  useEffect(() => {
    const getMapData = async () => {
      const outages = await getOutages()
      const serviceOutages = await getServiceOutages()
      const disaster = await getDisasters()
      if (outages) {
        setOutage(outages)
      }
      if (serviceOutages) {
        setServiceOutage(serviceOutages)
      }
      if (disaster) {
        const counties = mapDisasterEventsToCounties(disaster, serviceCounties)
        setDisaster(counties)
      }
    }

    getMapData()
  }, [])

  const mapDisasterEventsToCounties = (
    disasterData: any[],
    serviceCounties: any,
  ) => {
    const disasterCounties = serviceCounties?.features?.reduce(
      (soeCounties: any, county: any) => {
        county.properties.soe = disasterData?.filter((event) => {
          if (event.COUNTY_NAME == county.properties.name) {
            return event
          }
        })
        if (county.properties.soe?.length > 0) {
          return soeCounties.concat(county)
        }
        return soeCounties
      },
      [],
    )

    const disasterCountiesData = {
      type: 'FeatureCollection',
      name: 'GeoJSON',
      features: disasterCounties,
    }
    return disasterCountiesData
  }

  const getDisasters = async () => {
    try {
      const disasters = await APIClient.getDisaster()
      return disasters.data
    } catch (error) {
      setDisasterError(mapData?.disasterError?.value)
    }
  }

  const getOutages = async () => {
    try {
      const outages = await APIClient.getOutages()
      return outages.data
    } catch (error) {
      setOutageError(mapData?.outageError?.value)
    }
  }

  const getServiceOutages = async () => {
    try {
      const serviceOutages = await APIClient.getServiceOutages()
      return serviceOutages.data
    } catch (error) {
      setServiceOutageError(mapData?.serviceOutageError?.value)
    }
  }

  const classes = useStyles()

  const onToggleHandler = (isService: boolean, isPower: boolean) => {
    setIsPower(isPower)
    setIsService(isService)
  }

  const mapMarker = (color: string): L.DivIcon => {
    return L.divIcon({
      html: ReactDOMServer.renderToString(
        <LocationMarker color={color} height={34} width={34} />,
      ),
      iconSize: [0, 0],
      className: `<style>
        backgroundColor: 'transparent',
         borderColor: 'transparent',
      </style>`,
    })
  }

  const eventHandlers = {
    mouseover: (event: any) => {
      event.target.openPopup()
    },
    click: (event: any) => event.target.openPopup(),
    popupopen: (event: any) => {
      event.popup._closeButton.removeAttribute('href')
      event.popup._closeButton.style.cursor = 'pointer'
    },
  }

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <ToggleButton onToggleHandler={onToggleHandler} />
        <ErrorHandling
          outageError={outageError}
          serviceOutageError={serviceOutageError}
          disasterError={disasterError}
        />
        <MapContainer
          center={[36.78991208264064, -118.94444972062315]}
          zoom={5}
          scrollWheelZoom={true}
          style={{ height: 500, width: '100%' }}
          id="map"
          className={classes.mapContainer}
        >
          <TileLayer
            url={mapData?.tileLayer?.url}
            bounds={[
              [-123.233256, 42.006186],
              [-122.378853, 42.011663],
            ]}
          />

          {!isPower &&
            outage.features.map(
              (
                data: {
                  geometry: { type: any; coordinates: any }
                  properties: {
                    OUTAGE_COUNT: any
                    OUTAGE_CAUSE: any
                    ESTIMATED_RESTORE_DT: any
                  }
                },
                index: number,
              ) => {
                if (data.geometry.type === 'Point') {
                  return (
                    <Marker
                      position={[
                        data.geometry.coordinates[1],
                        data.geometry.coordinates[0],
                      ]}
                      icon={mapMarker(colors.main.steelBlue)}
                      eventHandlers={eventHandlers}
                      key={index}
                    >
                      <PopupData data={data} isPin={OUTAGE} classes={classes} />
                    </Marker>
                  )
                }
              },
            )}

          {isPower &&
            disaster?.features?.map((item: any, index: number) => {
              const cord = item.geometry.coordinates[0].map((cord: any[]) => [
                cord[1],
                cord[0],
              ])
              return (
                <Polygon
                  pathOptions={{
                    fillColor: colors.main.cyan,
                    weight: 0.5,
                    opacity: 1,
                    color: colors.main.white,
                    fillOpacity: 0.3,
                  }}
                  positions={cord}
                  eventHandlers={eventHandlers}
                  key={index}
                >
                  <PopupData data={item} isPin={DISASTER} classes={classes} />
                </Polygon>
              )
            })}

          {!isService &&
            serviceOutage?.features?.map((data: any, index: number) => {
              return (
                <Marker
                  position={[
                    data.geometry.coordinates[1],
                    data.geometry.coordinates[0],
                  ]}
                  icon={mapMarker(colors.main.pumpkin)}
                  eventHandlers={eventHandlers}
                  zIndexOffset={2000}
                  key={index}
                >
                  <PopupData
                    data={data}
                    isPin={SERVICE_OUTAGE}
                    classes={classes}
                  />
                </Marker>
              )
            })}

          {serviceCounties && CaState && serviceBounds && (
            <>
              <GeoJSON
                data={serviceCounties}
                style={{
                  fillColor: colors.main.newBackgroundGray,
                  weight: 0.2,
                  fillOpacity: 0,
                }}
              />
              <GeoJSON
                data={CaState}
                style={{
                  fillColor: colors.main.lightBlack,
                  weight: 0.3,
                  fillOpacity: 0.3,
                }}
              />
              <GeoJSON
                data={serviceBounds}
                style={{
                  fillColor: colors.main.red,
                  weight: 0.8,
                  fillOpacity: 0.3,
                }}
              />
            </>
          )}

          <AdjustZoomLevel setZoomLevel={setZoomLevel} />
          {zoomLevel > 9 && ZipCodes && (
            <GeoJSON
              data={ZipCodes}
              style={{
                fillColor: colors.main.shadowRed,
                weight: 0.8,
                color: colors.main.cyan,
                fillOpacity: 0,
              }}
              onEachFeature={OnEachZipCodeFeature}
            ></GeoJSON>
          )}
        </MapContainer>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    padding: `0px ${PADDING}px`,
    [breakpoints.down('sm')]: {
      padding: '0px',
    },
  },
  content: {
    padding: '0.7rem 0.7rem 0',
    width: '90%',
    margin: 'auto',
    background: colors.main.newBackgroundGray,
    [breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  wrapper: {
    marginBottom: '1rem',
  },
  popupContent: {
    display: 'inline',
    fontWeight: 'bold',
    marginLeft: '3px',
    fontSize: '12px',
  },
  toolTipContent: {
    background: 'transparent',
    border: 'none',
    boxShadow: 'none',
    color: colors.main.white,
  },
  disasterPopupRoot: {
    display: 'inline',
  },
  mapContainer: {
    zIndex: 0,
  },
}))

export default Map
