import { makeStyles } from '@material-ui/core'
import colors from '@/shared-ui/colors'
import { Button, Typography } from 'src/blitz'
import { formatSchedule } from '../helper'
import { WelcomePageModals } from '../types'
import useAppData from '@/shared-ui/hooks/useAppData'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { WELCOME_EDIT_APPOINTMENT, SITE_INTERACTION } from 'src/constants'
import { useDispatch } from 'react-redux'
import { welcomeSlice } from 'src/redux/slicers'
import { useWelcomePageData } from 'src/selector-hooks'
import AddToCalendar from './AddToCalendar'

const AppointmentDetail = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { technicianArrival, editAppointment } =
    useAppData('OrderDetails', true) || {}

  const { unprovisionedServiceOrder } = useWelcomePageData()
  const { title } = useAppData('addToCalendar', true) || {}

  if (!unprovisionedServiceOrder) {
    return null
  }

  const { isModifiable, appointment } = unprovisionedServiceOrder
  const { startTime, endTime, month, day, startDateTime, endDateTime } =
    formatSchedule(appointment)

  const setModal = (value: WelcomePageModals) =>
    dispatch(welcomeSlice.actions.setModal(value))

  const onEditAppointmentHandler = () => {
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: WELCOME_EDIT_APPOINTMENT,
      },
      'tl_o',
      SITE_INTERACTION,
    )
    setModal(WelcomePageModals.EditAppointment)
  }

  return (
    <>
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
            <Typography fontType="regularFont" styleType="p2">
              {technicianArrival?.value}
            </Typography>
            <Typography fontType="boldFont" styleType="p2">
              {`${startTime} - ${endTime}`}
            </Typography>
          </div>
        </div>
        {isModifiable && (
          <div>
            <Button
              buttonSize="large"
              onClick={onEditAppointmentHandler}
              variant="tertiary"
              type="button"
              hoverVariant="secondary"
              text={editAppointment?.value}
              className={classes.editButtonContainer}
            />
          </div>
        )}
      </div>
      <AddToCalendar
        title={title?.value}
        description={`${technicianArrival?.value} ${startTime} - ${endTime}`}
        start={startDateTime}
        end={endDateTime}
      />
    </>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  appointmentContainer: {
    display: 'flex',
    justifyContent: 'space-between',
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
    width: '100%',
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
}))

export default AppointmentDetail
