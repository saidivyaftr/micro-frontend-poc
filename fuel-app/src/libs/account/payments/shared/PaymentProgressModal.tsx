import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
} from '@material-ui/core'
import ReportProblemIcon from '@material-ui/icons/ReportProblem'
import { PostPaymentPayload } from 'src/api-client/types'
import { PAYMENT_ERROR_PRIMARY, PAYMENT_ERROR_DESCRIPTION } from 'src/constants'
import css from '../payments.module.scss'

type PaymentProgressModalProps = {
  postPaymentDetails: {
    isLoading: boolean
    data: PostPaymentPayload | Record<string, never>
    error?: any
  }
  closeModal: () => void
}
const useDialogStyles = makeStyles({
  dialog: {
    position: 'absolute',
    top: 50,
  },
})

const PaymentProgressModal = ({
  postPaymentDetails,
  closeModal,
}: PaymentProgressModalProps) => {
  const dialogStyles = useDialogStyles()
  return (
    <Dialog
      open={Boolean(postPaymentDetails.error) || postPaymentDetails.isLoading}
      onClose={closeModal}
      className={`${css.acceptedCardsModal} ${css.autopayCancelModal}`}
      classes={{ paper: dialogStyles.dialog }}
      fullWidth
      maxWidth="xs"
    >
      <div className={css.paymentErrorModel}>
        {postPaymentDetails.isLoading ? (
          <>
            <DialogTitle className={css.loader}>Saving Changes</DialogTitle>
            <DialogContent className={css.loader}>
              <CircularProgress color="primary" size="5rem" />
            </DialogContent>{' '}
          </>
        ) : (
          <DialogContent>
            <div className={css.header}>
              <ReportProblemIcon color="primary" />{' '}
              <p>{PAYMENT_ERROR_PRIMARY}</p>
            </div>
            <div className={css.content}>{PAYMENT_ERROR_DESCRIPTION}</div>
            <section className={css.footer}>
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={closeModal}
              >
                OK
              </Button>
            </section>
          </DialogContent>
        )}
      </div>
    </Dialog>
  )
}

export default PaymentProgressModal
