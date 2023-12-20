import { makeStyles } from '@material-ui/core'
import { Button, Typography } from 'src/blitz'
import {
  SITE_INTERACTION,
  WELCOME_UPS_TRACKING_LINK_CLICK,
} from 'src/constants'
import { isEmpty } from 'lodash'
import { RenderField } from './ResultCard'

const UpsTrackingNumber = ({ orderData, label = '' }: any) => {
  const { trackingNumber } = orderData
  const classes = useStyles()

  if (isEmpty(trackingNumber)) {
    return null
  }
  return (
    <RenderField>
      <Typography tagType="p" styleType="p2" fontType="boldFont">
        {label}
      </Typography>
      <div className={classes.upsTrackingDetails} data-testid="ups-test">
        <Button
          key={trackingNumber?.id}
          buttonSize="small"
          className={classes.trackingNumber}
          type="link"
          href={trackingNumber?.url}
          target="_blank"
          variant="lite"
          text={trackingNumber?.id}
          triggerEvent={true}
          eventObj={{
            events: 'event14',
            eVar14: WELCOME_UPS_TRACKING_LINK_CLICK,
          }}
          interactionType={SITE_INTERACTION}
        />
      </div>
    </RenderField>
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
