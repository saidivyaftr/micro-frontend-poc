import { makeStyles } from '@material-ui/core'
import { ErrorType } from './types'
import { Typography } from '@/shared-ui/components'
import { WarningOutline } from '@/shared-ui/react-icons/index'
import { paymentForm } from './sitecore-mock'
import { useMemo } from 'react'

export const PaymentError = ({ error }: { error: ErrorType }) => {
  const classes = useStyles()
  const errorMessage = useMemo(() => getMessage(error), [error])

  if (!error) {
    return null
  }

  return (
    <div className={classes.warningContainer}>
      <WarningOutline />
      <Typography>{errorMessage}</Typography>
    </div>
  )
}

const getMessage = (error: ErrorType) => {
  switch (error) {
    case 'CARD_NOT_SUPPORTED':
      return paymentForm.cardNotSupportedError?.value
    case 'DUPLICATE':
      return paymentForm?.duplicateError?.value
    case 'PAYMENT_BLOCKED':
      return paymentForm?.paymentBlockedError?.value
    case 'PAYMENT_VELOCITY':
      return paymentForm?.paymentVelocityError?.value
    case 'SESSION_TIMED_OUT':
      return paymentForm?.sessionTimedOutError?.value
    case 'SOMETHING_WENT_WRONG':
    default:
      return paymentForm?.somethingWentWrongError?.value
  }
}

const useStyles = makeStyles({
  warningContainer: {
    display: 'flex',
    gap: 8,
    margin: '24px 0',
  },
})
