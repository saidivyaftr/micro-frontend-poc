import { makeStyles } from '@material-ui/core'
import { Button } from 'src/blitz'
import {
  SITE_INTERACTION,
  WELCOME_UPS_TRACKING_LINK_CLICK,
} from 'src/constants'
import { hasUPSTrackingNumber } from '../helper'
import { useWelcomePageData } from 'src/selector-hooks'
const UpsTrackingNumber = () => {
  const classes = useStyles()
  const { unprovisionedServiceOrder } = useWelcomePageData()

  if (!unprovisionedServiceOrder) {
    return null
  }

  const { trackingNumbers } = unprovisionedServiceOrder

  if (!hasUPSTrackingNumber(trackingNumbers)) {
    return null
  }

  return (
    <div className={classes.upsTrackingDetails} data-testid="ups-test">
      {trackingNumbers?.map((item: { id: string; url: string }) => (
        <Button
          key={item.id}
          buttonSize="small"
          className={classes.trackingNumber}
          type="link"
          href={item.url}
          target="_blank"
          variant="lite"
          text={item.id}
          triggerEvent={true}
          eventObj={{
            events: 'event14',
            eVar14: WELCOME_UPS_TRACKING_LINK_CLICK,
          }}
          interactionType={SITE_INTERACTION}
        />
      ))}
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  upsTrackingDetails: {
    display: 'flex',
    gap: '.5rem',
    flexDirection: 'column',
    [breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
  },
  trackingNumber: {
    textDecoration: 'underline',
    fontSize: '1.125rem',
    height: '1.625rem',
    lineHeight: '1.625rem',
  },
}))

export default UpsTrackingNumber
