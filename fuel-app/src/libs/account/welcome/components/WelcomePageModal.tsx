import colors from '@/shared-ui/colors'
import { Modal } from '@/shared-ui/components'
import { ModalCloseIcon } from '@/shared-ui/react-icons/index'
import { makeStyles } from '@material-ui/core'
import TechnicalErrorModalContent from 'src/libs/account/welcome/components/TechnicalErrorModalContent'
import AppointmentErrorModalContent from 'src/libs/account/welcome/components/AppoitmentErrorModalContent'
import { WelcomePageModals } from '../types'
import ConfirmAppointment from './ConfirmAppointment'
import EditAppointmentContainer from './EditAppointmentContainer'
import { useWelcomePageData } from 'src/selector-hooks'
import { welcomeSlice } from 'src/redux/slicers'
import { useDispatch } from 'react-redux'

const WelcomePageModal = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const { modal } = useWelcomePageData()
  const showModal = modal !== WelcomePageModals.Init

  let modalContent = <></>
  let stopDefaultExit = false
  switch (modal) {
    case WelcomePageModals.EditAppointment: {
      modalContent = <EditAppointmentContainer />
      stopDefaultExit = true
      break
    }
    case WelcomePageModals.AppointmentConfirmation: {
      modalContent = <ConfirmAppointment />
      break
    }
    case WelcomePageModals.TechnicalError: {
      modalContent = <TechnicalErrorModalContent />
      break
    }
    case WelcomePageModals.AppointmentError: {
      modalContent = <AppointmentErrorModalContent />
      break
    }
    default:
      modalContent = <></>
  }

  const setModal = (value: WelcomePageModals) =>
    dispatch(welcomeSlice.actions.setModal(value))

  return (
    <Modal
      modalOpen={showModal}
      setModalOpen={() => setModal(WelcomePageModals.Init)}
      modalContent={
        <div className={classes.modalContentWrapper}>
          <div className={classes.modalCloseIconWrapper}>
            <ModalCloseIcon
              strokeWidth="4"
              color={colors.main.black}
              onClick={() => setModal(WelcomePageModals.Init)}
              className={classes.closeIcon}
            />
          </div>
          {modalContent}
        </div>
      }
      stopDefaultExit={stopDefaultExit}
      strokeWidth="4"
      iconColor={colors.main.black}
      modalCloseIconClassName={classes.modalCloseBtn}
      padding="1.5rem"
      height="auto"
      background={colors.main.white}
      borderRadius="2rem"
    />
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  modalCloseBtn: {
    display: 'none',
    top: '1rem',
    right: '.5rem',
  },
  modalContentWrapper: {
    textAlign: 'center',
  },
  modalCloseIconWrapper: {
    textAlign: 'end',
  },
  closeIcon: {
    width: '1.5rem',
    height: '1.5rem',
    cursor: 'pointer',
    [breakpoints.down('sm')]: {
      width: '1rem',
      height: '1rem',
    },
    '&:hover *': {
      fill: colors.main.red,
      stroke: colors.main.red,
      color: colors.main.red,
    },
  },
}))

export default WelcomePageModal
