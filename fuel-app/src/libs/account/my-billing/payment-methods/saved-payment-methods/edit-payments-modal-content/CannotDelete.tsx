import { Button, InjectHTML } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import { paymentSlice } from 'src/redux/slicers'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { AppRoutes } from 'src/constants'
import useAppData from '@/shared-ui/hooks/useAppData'

export const CannotDelete = ({
  isAutoPay,
  handleClose,
}: {
  isAutoPay: boolean
  handleClose: any
}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const router = useRouter()
  const editPaymentMethodModalsData = useAppData(
    'editPaymentMethodModalsData',
    true,
  )
  const {
    cannotDeleteDescriptionForAutoPay,
    cannotDeleteDescriptionForScheduledPayment,
    cancel,
    manageAutoPay,
    managePayments,
  } = editPaymentMethodModalsData

  const handleCancel = async () => {
    handleClose()
  }

  const handleManageAutoPay = () => {
    dispatch(paymentSlice.actions.setShowAutoPayEditForm(true))
    handleClose()
  }

  const handleManagePayments = () => {
    router.push(
      { pathname: AppRoutes.PaymentActivityPage, query: router.query },
      undefined,
      { shallow: false },
    )
  }

  const description = isAutoPay
    ? cannotDeleteDescriptionForAutoPay?.value
    : cannotDeleteDescriptionForScheduledPayment?.value

  return (
    <div className={classes.root}>
      <InjectHTML className={classes.description} value={description} />
      <div className={classes.actionBtnContainer}>
        <Button
          type="button"
          onClick={handleCancel}
          variant="tertiary"
          text={cancel?.value}
        />
        <Button
          type="button"
          onClick={isAutoPay ? handleManageAutoPay : handleManagePayments}
          text={isAutoPay ? manageAutoPay?.value : managePayments?.value}
        />
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    textAlign: 'left',
  },
  description: {
    textAlign: 'center',
  },
  actionBtnContainer: {
    display: 'flex',
    gap: 16,
    justifyContent: 'center',
    maxWidth: 480,
    margin: 'auto',
    marginTop: 32,
    [breakpoints.down('xs')]: {
      marginTop: 48,
      flexDirection: 'column',
    },
  },
}))
