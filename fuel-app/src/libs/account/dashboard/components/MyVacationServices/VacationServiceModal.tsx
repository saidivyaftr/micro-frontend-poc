import colors from '@/shared-ui/colors'
import { Modal } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import { VacationServiceModals } from './types'
import TurningOffConfirmation from './TurningOffConfirmation'
import { ModalCloseIcon } from '@/shared-ui/react-icons'
import TurnedOffSuccessContent from './TurnedOffSuccessContent'
import CancelSuccessContent from './CancelSuccessContent'
import CancelConfirmation from './CancelConfirmation'
import TechnicalError from './TechnicalError'
const VacationServiceModal = ({ modal, setModal, setVacationType }: any) => {
  const classes = useStyles()
  const showModal = modal !== VacationServiceModals.Init
  let modalContent = <></>
  let stopDefaultExit = false
  switch (modal) {
    case VacationServiceModals.Confirmation: {
      modalContent = (
        <TurningOffConfirmation
          setModal={setModal}
          setVacationType={setVacationType}
        />
      )
      stopDefaultExit = true
      break
    }
    case VacationServiceModals.Success: {
      modalContent = <TurnedOffSuccessContent setModal={setModal} />
      break
    }
    case VacationServiceModals.CancelConfirmation: {
      stopDefaultExit = true
      modalContent = (
        <CancelConfirmation
          setModal={setModal}
          setVacationType={setVacationType}
        />
      )
      break
    }
    case VacationServiceModals.CancelSuccess: {
      modalContent = <CancelSuccessContent setModal={setModal} />
      break
    }
    case VacationServiceModals.TechnicalError: {
      modalContent = <TechnicalError />
      break
    }
    default:
      modalContent = <></>
  }

  return (
    <Modal
      modalOpen={showModal}
      setModalOpen={() => {
        setModal(VacationServiceModals.Init)
      }}
      modalContent={
        <div className={classes.modalContentWrapper}>
          {[
            VacationServiceModals.Success,
            VacationServiceModals.CancelSuccess,
          ].includes(modal) && (
              <div className={classes.modalCloseIconWrapper}>
                <ModalCloseIcon
                  strokeWidth="4"
                  color={colors.main.black}
                  onClick={() => {
                    setModal(VacationServiceModals.Init)
                  }}
                  className={classes.closeIcon}
                />
              </div>
            )}
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
      width="calc(100% - 75px)"
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
      fill: colors.main.brightRed,
      stroke: colors.main.brightRed,
      color: colors.main.brightRed,
    },
  },
}))

export default VacationServiceModal
