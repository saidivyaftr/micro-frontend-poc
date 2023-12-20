import EditAppointmentInfo from './EditAppointmentInfo'
import UpdateAppointment from './UpdateAppointment'
import { makeStyles } from '@material-ui/core'
const EditAppointment = () => {
  const classes = useStyles()
  return (
    <div className={classes.mainWrapper}>
      <EditAppointmentInfo />
      <UpdateAppointment />
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  mainWrapper: {
    padding: '0 3.5rem',
    margin: '0',
    [breakpoints.down('sm')]: {
      padding: '0 1rem',
      margin: '0',
    },
  },
}))

export default EditAppointment
