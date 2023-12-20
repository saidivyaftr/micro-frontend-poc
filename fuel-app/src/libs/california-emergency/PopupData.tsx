import { Popup } from 'react-leaflet'
import moment from 'moment'
import { OUTAGE, DISASTER, SERVICE_OUTAGE } from 'src/constants'

interface PageProps {
  data: any
  isPin: string
  classes: any
}

const popupData = (props: PageProps) => {
  const { data, isPin, classes } = props

  const getRestorationTime = (date: string) => {
    let restorationTime = ''
    if (date.length > 1) {
      restorationTime = moment(date).format('h:mm a MM/DD [PST/PDT]')
      if (restorationTime == 'Invalid date') {
        restorationTime = moment(
          date.replace(
            /^(.{4})(.{2})(.{2})(.{2})(.{2})(.{2})(.{2})/,
            '$1-$2-$3 $4:$5:$6$7',
          ),
        ).format('h:mm a MM/DD [PST/PDT]')
      }
      if (restorationTime == 'Invalid date') {
        restorationTime = 'Not currently available'
      }
    } else {
      restorationTime = 'Not currently available'
    }
    return restorationTime
  }

  if (props.isPin == OUTAGE) {
    return (
      <>
        <Popup>
          <div className={classes.wrapper}>
            Outage Count:
            <div className={classes.popupContent}>
              {data.properties.OUTAGE_COUNT}
            </div>
          </div>
          <div className={classes.wrapper}>
            Outage Cause:
            <div className={classes.popupContent}>
              {props.data.properties.OUTAGE_CAUSE === 'null'
                ? ' Not currently available'
                : data.properties.OUTAGE_CAUSE}
            </div>
          </div>
          <div className={classes.wrapper}>
            Estimated Restoration Time:
            <div className={classes.popupContent}>
              {getRestorationTime(data.properties.ESTIMATED_RESTORE_DT)}
            </div>
          </div>
        </Popup>
      </>
    )
  } else if (isPin == SERVICE_OUTAGE) {
    return (
      <>
        <Popup>
          <div className={classes.wrapper}>
            Outage Type:
            <div className={classes.popupContent}>
              {data.properties.OUTAGE_TYPE}
            </div>
          </div>
          <div className={classes.wrapper}>
            Outage County:
            <div className={classes.popupContent}>
              {data.properties.OUTAGE_COUNTY}
            </div>
          </div>
          <div className={classes.wrapper}>
            Area Impacted:
            <div className={classes.popupContent}>
              {data.properties.OUTAGE_AREA_IMPACTED}
            </div>
          </div>
          <div className={classes.wrapper}>
            Impacted Users:
            <div className={classes.popupContent}>
              {data.properties.OUTAGE_COUNT}
            </div>
          </div>
          <div className={classes.wrapper}>
            Estimated Restoral Time:
            <div className={classes.popupContent}>
              {data.properties.ESTIMATED_RESTORATION_DT}
            </div>
          </div>
        </Popup>
      </>
    )
  } else if (isPin == DISASTER) {
    return (
      <>
        <Popup>
          <div className={classes.wrapper}>
            <h2 className={classes.disasterPopupRoot}>County: </h2>
            <div className={classes.popupContent}>
              <h2 className={classes.disasterPopupRoot}>
                {data.properties.soe[0].COUNTY_NAME}
              </h2>
            </div>
          </div>
          <div className={classes.wrapper}>
            Emergency:
            <div className={classes.popupContent}>
              {data.properties.soe[0].json_featuretype.replace(/_/g, ' ')}
            </div>
          </div>
          <div className={classes.wrapper}>
            Type:
            <div className={classes.popupContent}>
              {data.properties.soe[0].SOE_TYPE.replace(/_/g, ' ')}
            </div>
          </div>
        </Popup>
      </>
    )
  } else {
    return <></>
  }
}

export default popupData
