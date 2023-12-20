import colors from '@/shared-ui/colors'
import { Modal } from '@/shared-ui/components'
import { ModalCloseIcon } from '@/shared-ui/react-icons/index'
import { makeStyles } from '@material-ui/core'
import { PaymentPageModals } from './types'
import CancelPayment from './CancelPayment'
import EditPayment from './EditPayment'
import PaymentFailure from './PaymentFailure'
import PaymentSuccess from './PaymentSuccess'

const PaymentModal = ({ modal, setModal, payment, setPayment }: any) => {
  const classes = useStyles()
  const showModal = modal !== PaymentPageModals.Init
  let modalContent = <></>
  let stopDefaultExit = false
  switch (modal) {
    case PaymentPageModals.CancelPayment: {
      modalContent = <CancelPayment payment={payment} setModal={setModal} />
      stopDefaultExit = true
      break
    }
    case PaymentPageModals.EditPayment: {
      modalContent = (
        <EditPayment
          payment={payment}
          setModal={setModal}
          setPayment={setPayment}
        />
      )
      stopDefaultExit = true
      break
    }
    case PaymentPageModals.EditPaymentFailure: {
      modalContent = <PaymentFailure setModal={setModal} isEdit />
      break
    }
    case PaymentPageModals.CancelPaymentFailure: {
      modalContent = <PaymentFailure setModal={setModal} />
      break
    }
    case PaymentPageModals.PaymentSuccess: {
      modalContent = <PaymentSuccess payment={payment} setModal={setModal} />
      break
    }
    default:
      modalContent = <></>
  }

  return (
    <Modal
      modalOpen={showModal}
      setModalOpen={() => setModal(PaymentPageModals.Init)}
      modalContent={
        <div className={classes.modalContentWrapper}>
          <div className={classes.modalCloseIconWrapper}>
            <ModalCloseIcon
              strokeWidth="4"
              color={colors.main.black}
              onClick={() => setModal(PaymentPageModals.Init)}
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
    position: 'absolute',
    right: '1.5rem',
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

export default PaymentModal
