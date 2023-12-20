import { formatSchedule, getFormattedDate } from '../helper'
import { Typography } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import useAppData from '@/shared-ui/hooks/useAppData'
import { useWelcomePageData } from 'src/selector-hooks'

const EditAppointmentInfo = () => {
  const classes = useStyles()
  const { appointmentScheduleContent, selectDateandTimeContent, title } =
    useAppData('EditAppointmentModal', true) || {}
  const { unprovisionedServiceOrder } = useWelcomePageData()

  if (!unprovisionedServiceOrder) {
    return null
  }

  const {arrivalWindow} = unprovisionedServiceOrder?.appointment;

  const { startTime, endTime } = formatSchedule(arrivalWindow)

  const formattedAppointmentDate = getFormattedDate(arrivalWindow.start)

  return (
    <>
      <Typography
        className={classes.titleContent}
        styleType="h5"
        fontType="boldFont"
      >
        {title?.value}
      </Typography>
      <Typography className={classes.descriptionWrapper}>
        <>
          {appointmentScheduleContent?.value}&nbsp;
          <b>{`${formattedAppointmentDate}, ${startTime} - ${endTime} `}</b>
          {selectDateandTimeContent?.value}
        </>
      </Typography>
    </>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  titleContent: {
    fontSize: '24px',
    [breakpoints.down('sm')]: {
      marginTop: '0.5rem',
      fontSize: '18px',
    },
  },
  descriptionWrapper: {
    padding: '0.5rem 0',
    fontSize: '18px',
    lineHeight: '1.5rem',
  },
}))

export default EditAppointmentInfo
