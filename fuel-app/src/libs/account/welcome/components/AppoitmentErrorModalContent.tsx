import { makeStyles } from '@material-ui/core'
import { Typography, Button } from '@/shared-ui/components'
import TechnicalErrorIcon from '@/shared-ui/react-icons/technical-error-icon'
import useAppData from '@/shared-ui/hooks/useAppData'
import { WelcomePageModals } from '../types'
import {
  SITE_INTERACTION,
  WELCOME_EDIT_APPOINTMENT_CHOOSE_ANOTHER_TIME,
} from 'src/constants'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { useDispatch } from 'react-redux'
import { welcomeSlice } from 'src/redux/slicers'

const AppointmentErrorModalContent = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const { title, description, anotherTime } = useAppData(
    'AppointmentNotAvailableModal',
    true,
  )

  const setModal = (value: WelcomePageModals) =>
    dispatch(welcomeSlice.actions.setModal(value))

  const handleClose = () => {
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: WELCOME_EDIT_APPOINTMENT_CHOOSE_ANOTHER_TIME,
      },
      'tl_o',
      SITE_INTERACTION,
    )
    setModal(WelcomePageModals.EditAppointment)
  }
  return (
    <div className={classes.warpper}>
      <TechnicalErrorIcon />
      <Typography styleType="h5" className={classes.title} testId="test-title">
        {title?.value}
      </Typography>
      <Typography
        styleType="p1"
        className={classes.description}
        testId="test-description"
      >
        {description?.value}
      </Typography>
      <Button
        buttonSize="large"
        className="gotIt"
        hoverVariant="primary"
        text={anotherTime?.value}
        type="button"
        onClick={handleClose}
        variant="primary"
      />
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  warpper: {
    padding: '4rem 0rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    [breakpoints.down('xs')]: {
      padding: '0',
      paddingBottom: '24px',
    },
  },
  title: {
    marginTop: '32px',
    marginBottom: '16px',
    [breakpoints.down('xs')]: {
      marginBottom: '8px',
    },
  },
  description: {
    marginBottom: 32,
  },
}))

export default AppointmentErrorModalContent
