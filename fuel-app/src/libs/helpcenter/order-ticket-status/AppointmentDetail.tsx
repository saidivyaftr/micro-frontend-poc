import { makeStyles } from '@material-ui/core'
import colors from '@/shared-ui/colors'
import { Button, Typography } from 'src/blitz'
import { OrderPageModals } from './types'
import WarningOutline from '@/shared-ui/react-icons/warning-outline'
import { useAppData } from 'src/hooks'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { HELP_CENTER } from 'src/constants'
import { useDispatch } from 'react-redux'
import { setOrderData, setOrderModal } from 'src/redux/slicers/orderTicket'
import { TICKET_NUMBER } from './helper'
const AppointmentDetail = ({ data }: any) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const {
    technicianArrival,
    editAppointment,
    installationAppointmentTitle,
    missedAppointment,
    appointmentMissedWarn,
    eventOccursContent,
    appointmentTime,
  } = useAppData('resultScenario', true)
  const {
    hasAppointment,
    isMissedAppointment,
    isReschedulable,
    appointmentFormatted,
    ticketType,
  } = data
  if (!hasAppointment) return null
  const { startTime, endTime, month, day } = appointmentFormatted

  const onEditAppointmentHandler = () => {
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: `${HELP_CENTER}/order-ticket-status:${
          isMissedAppointment ? 'reschedule' : 'edit-appointment'
        }`,
      },
      'tl_o',
    )
    dispatch(setOrderModal(OrderPageModals.EditAppointment))
    dispatch(setOrderData(data))
  }
  const EditRescheduleButton = () => {
    return (
      <div className={classes.editButtonOuterContainer}>
        <Button
          buttonSize="large"
          onClick={onEditAppointmentHandler}
          variant="tertiary"
          type="button"
          hoverVariant="secondary"
          text={
            isMissedAppointment
              ? missedAppointment?.value
              : editAppointment?.value
          }
          className={classes.editButtonContainer}
        />
      </div>
    )
  }

  return (
    <>
      <Typography
        styleType="p2"
        fontType="boldFont"
        tagType="h6"
        className={classes.title}
      >
        {ticketType === TICKET_NUMBER
          ? appointmentTime?.value
          : installationAppointmentTitle?.value}
      </Typography>
      {isMissedAppointment && (
        <div className={classes.missedAppt}>
          <WarningOutline />
          <Typography tagType="div" styleType="p2">
            {appointmentMissedWarn?.value}
          </Typography>
        </div>
      )}
      <div className={classes.appointmentContainer}>
        <div className={classes.installContainer}>
          <div className={classes.date}>
            <Typography
              styleType="p2"
              className={classes.month}
              fontType="boldFont"
              color="tertiary"
            >
              {month}
            </Typography>
            <Typography
              styleType="h5"
              className={classes.day}
              color="secondary"
            >
              {day}
            </Typography>
          </div>
          <div className={classes.appointmentDetailContainer}>
            <Typography styleType="p2">
              {isMissedAppointment
                ? eventOccursContent?.value
                : technicianArrival?.value}
            </Typography>
            {!isMissedAppointment && (
              <Typography styleType="p2" fontType="boldFont">
                {`${startTime} - ${endTime}`}
              </Typography>
            )}
          </div>
        </div>
        {isReschedulable && <EditRescheduleButton />}
      </div>
      <hr className={classes.borderWrapper} />
    </>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  title: {
    margin: '0 0 0.5rem',
  },
  appointmentContainer: {
    display: 'flex',
    alignItems: 'center',
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  appointmentDetailContainer: {
    flexDirection: 'column',
    display: 'flex',
    gap: '.5rem',
    justifyContent: 'center',
  },
  installContainer: {
    display: 'flex',
    gap: '1rem',
    width: '50%',
    [breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  editButtonOuterContainer: {
    [breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  editButtonContainer: {
    marginTop: '2rem',
    minWidth: 'auto',
    whiteSpace: 'nowrap',
    maxWidth: '15.5rem',
    [breakpoints.up('md')]: {
      flex: 'unset',
      marginBottom: '1rem',
      marginTop: 0,
    },
    [breakpoints.down('sm')]: {
      maxWidth: '100%',
    },
  },
  date: {
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '4px',
    background: colors.main.black,
    flex: '0 0 5rem',
    height: '5rem',
    textAlign: 'center',
    flexDirection: 'column',
  },
  month: {
    fontSize: '1rem',
    lineHeight: '22px',
  },
  day: {
    fontSize: '1.5rem',
    lineHeight: '32px',
  },
  borderWrapper: {
    margin: '2rem 0',
    border: `1px solid ${colors.main.borderGrey}`,
  },
  missedAppt: {
    marginBottom: '1rem',
    background: colors.main.blushRed,
    padding: '1rem',
    borderRadius: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    '& svg path': {
      fill: colors.main.inputError,
    },
  },
}))

export default AppointmentDetail
