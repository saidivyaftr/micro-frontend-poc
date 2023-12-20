import colors from '@/shared-ui/colors'
import { Modal } from '@/shared-ui/components'
import { ModalCloseIcon } from '@/shared-ui/react-icons/index'
import { makeStyles } from '@material-ui/core'
import { OrderPageModals } from './types'
import CancelTicketModalContent from './CancelTicketModalContent'
import WhereToFindModalContent from './FindAccountNumberModalContent'
import TechnicalErrorModalContent from './TechnicalErrorModalContent'
import EditAppointmentContainer from './EditAppointmentContainer'
import EditAppointmentConfirmModal from './EditAppointmentConfirmation'
import { useDispatch, useSelector } from 'react-redux'
import { selectOrderModal, setOrderModal } from 'src/redux/slicers/orderTicket'
const TicketPageModal = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const modal = useSelector(selectOrderModal)
  const showModal = modal !== OrderPageModals.Init
  let modalContent = <></>
  const stopDefaultExit = false
  switch (modal) {
    case OrderPageModals.EditAppointment: {
      modalContent = <EditAppointmentContainer />
      break
    }
    case OrderPageModals.EditAppointmentConfirmation: {
      modalContent = <EditAppointmentConfirmModal />
      break
    }
    case OrderPageModals.CancelOrder: {
      modalContent = <CancelTicketModalContent />
      break
    }
    case OrderPageModals.FindAccountNumber: {
      modalContent = <WhereToFindModalContent />
      break
    }
    case OrderPageModals.TechnicalError: {
      modalContent = <TechnicalErrorModalContent />
      break
    }
    default:
      modalContent = <></>
  }

  return (
    <Modal
      modalOpen={showModal}
      setModalOpen={() => {
        dispatch(setOrderModal(OrderPageModals.Init))
      }}
      modalContent={
        <div className={classes.modalContentWrapper}>
          {modal !== OrderPageModals.CancelOrder && (
            <div className={classes.modalCloseIconWrapper}>
              <ModalCloseIcon
                strokeWidth="4"
                color={colors.main.black}
                onClick={() => {
                  dispatch(setOrderModal(OrderPageModals.Init))
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

export default TicketPageModal
