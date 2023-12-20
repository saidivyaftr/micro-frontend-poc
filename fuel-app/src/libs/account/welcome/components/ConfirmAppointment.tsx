import colors from '@/shared-ui/colors'
import { Typography, Button } from '@/shared-ui/components'
import { Confirmation } from '@/shared-ui/react-icons/index'
import { makeStyles } from '@material-ui/core'
import { formatSchedule, getFormattedDate, getDayFromDate } from '../helper'
import { WelcomePageModals } from '../types'
import useAppData from '@/shared-ui/hooks/useAppData'
import {
  SITE_INTERACTION,
  WELCOME_EDIT_APPOINTMENT_GOT_IT,
} from 'src/constants'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { useDispatch } from 'react-redux'
import { welcomeSlice } from 'src/redux/slicers'
import { useWelcomePageData } from 'src/selector-hooks'

const ConfirmAppointment = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const { title, description, gotIt } = useAppData(
    'ConfirmAppointmentModal',
    true,
  )

  const { unprovisionedServiceOrder } = useWelcomePageData()

  if (!unprovisionedServiceOrder) {
    return null
  }

  const appointmentFormatted = formatSchedule(
    unprovisionedServiceOrder.appointment,
  )
  const { startTime, endTime } = appointmentFormatted
  const formattedAppointmentDate = getFormattedDate(
    unprovisionedServiceOrder?.appointment?.startDate,
  )
  const appointmentDay = getDayFromDate(
    unprovisionedServiceOrder?.appointment?.startDate,
  )

  const setModal = (value: WelcomePageModals) =>
    dispatch(welcomeSlice.actions.setModal(value))

  const handleClose = () => {
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: WELCOME_EDIT_APPOINTMENT_GOT_IT,
      },
      'tl_o',
      SITE_INTERACTION,
    )
    setModal(WelcomePageModals.Init)
  }

  return (
    <div className={classes.mainWrapper}>
      <div className={classes.confirmIconWrapper}>
        <Confirmation />
      </div>
      <Typography styleType="h5" className={classes.titleContent}>
        {title?.value}
      </Typography>
      <div>
        <Typography styleType="p1">{description?.value}</Typography>
        <Typography styleType="h6">{`${appointmentDay}, ${formattedAppointmentDate}`}</Typography>
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

export default ConfirmAppointment
