import colors from '@/shared-ui/colors'
import { Typography, Button } from '@/shared-ui/components'
import { Confirmation } from '@/shared-ui/react-icons/index'
import { makeStyles } from '@material-ui/core'
import { OrderPageModals } from './types'
import { useAppData, usePageLoadEvents } from 'src/hooks'
import { State } from 'src/redux/types'
import { useDispatch, useSelector } from 'react-redux'
import { setOrderModal } from 'src/redux/slicers/orderTicket'
import { HELP_CENTER, UNVERIFIED_SERVICE_AREA, VISITOR } from 'src/constants'

const EditAppointmentConfirmModal = () => {
  const { orderData } = useSelector((state: State) => state.orderTicket) || {}
  const dispatch = useDispatch()
  const classes = useStyles()
  const serviceOrderDetails = orderData
  const { rescheduleSuccessTitle, rescheduleSuccessContent, gotIt } =
    useAppData('editAppointmentModal', true)
  const { appointmentFormatted } = serviceOrderDetails
  const { startTime, endTime, fullDay, date } = appointmentFormatted
  const handleClose = () => {
    dispatch(setOrderModal(OrderPageModals.Init))
  }
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: `${HELP_CENTER}/order-ticket-status/appointment changed`,
      eVar22: VISITOR,
      eVar49: UNVERIFIED_SERVICE_AREA,
    },
  })

  return (
    <div className={classes.mainWrapper}>
      <div className={classes.confirmIconWrapper}>
        <Confirmation />
      </div>
      <Typography styleType="h5" className={classes.titleContent}>
        {rescheduleSuccessTitle?.value}
      </Typography>
      <div>
        <Typography styleType="p1">
          {rescheduleSuccessContent?.value}
        </Typography>
        <Typography styleType="h6">{`${fullDay}, ${date}`}</Typography>
        <Typography styleType="h6">{`${startTime} - ${endTime}`}</Typography>
      </div>
      <Button
        buttonSize="large"
        hoverVariant="primary"
        text={gotIt?.value}
        type="button"
        onClick={handleClose}
        variant="primary"
        className={classes.gotItBtn}
      />
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  mainWrapper: {
    margin: '0 2.5rem 2.5rem 2.5rem ',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [breakpoints.down('sm')]: {
      margin: '0',
      marginBottom: 8,
    },
  },
  confirmIconWrapper: {
    width: '5rem',
    height: '5rem',
    background: `${colors.main.blue}`,
    borderRadius: '2.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [breakpoints.down('sm')]: {
      width: '4rem',
      height: '4rem',
    },
  },
  titleContent: {
    marginTop: '2rem',
    marginBottom: '0.5rem',
  },
  gotItBtn: {
    marginTop: '2rem',
  },
}))

export default EditAppointmentConfirmModal
