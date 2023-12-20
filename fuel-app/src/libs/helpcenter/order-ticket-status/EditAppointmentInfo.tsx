import { Typography } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import TechnicalErrorIcon from '@/shared-ui/react-icons/technical-error-icon'
import { useAppData } from 'src/hooks'
import { useOrderData } from 'src/selector-hooks'

const EditAppointmentInfo = () => {
  const classes = useStyles()
  const {
    title,
    missedTitle,
    selectDateandTimeContent,
    appointmentScheduleContent,
    missedScheduleContent,
  } = useAppData('editAppointmentModal', true)
  const orderData = useOrderData()
  const { isMissedAppointment, appointmentFormatted } = orderData
  const { startTime, endTime, date } = appointmentFormatted
  const slotDate = `${date},`
  const slotTime = `${startTime} - ${endTime} `
  return (
    <div className={classes.root}>
      {isMissedAppointment && (
        <div className={classes.missedIcon}>
          <TechnicalErrorIcon />
        </div>
      )}
      <Typography
        tagType="h4"
        className={classes.titleContent}
        styleType="h5"
        fontType="boldFont"
      >
        {isMissedAppointment ? missedTitle?.value : title?.value}
      </Typography>
      <Typography className={classes.descriptionWrapper} styleType="p1">
        {isMissedAppointment ? (
          missedScheduleContent?.value
        ) : (
          <>
            {appointmentScheduleContent?.value}
            <b>{` ${slotDate} ${slotTime}`}</b>
            {selectDateandTimeContent?.value}
          </>
        )}
      </Typography>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  missedIcon: {
    marginBottom: '1.75rem',
  },
  titleContent: {
    margin: 0,
  },
  descriptionWrapper: {
    padding: '0.5rem 0 2rem 0',
    [breakpoints.down('sm')]: {
      padding: '0.5rem 0 1rem 0',
    },
  },
}))

export default EditAppointmentInfo
