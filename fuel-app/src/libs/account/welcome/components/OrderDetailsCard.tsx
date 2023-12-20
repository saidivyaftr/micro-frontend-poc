import { makeStyles } from '@material-ui/core'
import { CardWithTitle } from '@/shared-ui/components/Card/Card'
import AppointmentDetail from './AppointmentDetail'
import OrderInfo from './OrderInfo'
import ContactNumber from './ContactNumber'
import colors from '@/shared-ui/colors'
import { Typography } from 'src/blitz'
import AppointmentDetailsMissing from './AppointmentDetailsMissing'
import { hasAppointmentDetails } from '../helper'
import useAppData from '@/shared-ui/hooks/useAppData'
import clsx from 'classnames'
import { useWelcomePageData } from 'src/selector-hooks'

const OrderDetails = () => {
  const {
    isCancelledOrder,
    isSelfInstallationOrder,
    isNoInstallationOrder,
    unprovisionedServiceOrder,
  } = useWelcomePageData()

  const classes = useStyles()
  const { title, installationAppointmentTitle } =
    useAppData('OrderDetails', true) || {}

  if (!unprovisionedServiceOrder) {
    return null
  }
  const showAppointmentDetail =
    !isCancelledOrder && !isSelfInstallationOrder && !isNoInstallationOrder
  const appointmentDetailsExist = hasAppointmentDetails(unprovisionedServiceOrder)

  return (
    <CardWithTitle
      className={clsx(classes.wrapper, {
        [classes.cancelWrapper]: isCancelledOrder,
      })}
    >
      <>
        <Typography styleType="h5" className={classes.title}>
          {title?.value}
        </Typography>
        {showAppointmentDetail && (
          <>
            <Typography styleType="p2">
              {installationAppointmentTitle?.value}
            </Typography>
            {appointmentDetailsExist ? (
              <AppointmentDetail />
            ) : (
              <AppointmentDetailsMissing />
            )}
            <div className={classes.border} />
          </>
        )}
        <OrderInfo />
        <ContactNumber />
      </>
    </CardWithTitle>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    padding: '2rem 1rem',
    gap: '1rem',
    [breakpoints.up('xs')]: {
      padding: '2rem 1rem',
    },
    [breakpoints.up('sm')]: {
      padding: '2rem',
    },
    [breakpoints.up('md')]: {
      padding: '3rem',
    },
  },
  cancelWrapper: {
    [breakpoints.up('md')]: {
      minHeight: 336,
    },
  },
  border: {
    borderTop: `1px solid ${colors.main.borderGrey}`,
    [breakpoints.down('xs')]: {
      marginTop: '1rem',
    },
    [breakpoints.down('xs')]: {
      marginTop: '1rem',
    },
  },
  title: {
    marginBottom: '1rem !important',
    [breakpoints.up('sm')]: {
      marginBottom: '0',
    },
  },
}))

export default OrderDetails
