import { Button, InjectHTML } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { useActiveAccount, useActiveAccountId } from 'src/selector-hooks'
import {
  fetchAutopayDetails,
  fetchPaymentMethods,
} from 'src/redux/slicers/payment'
import useAppData from '@/shared-ui/hooks/useAppData'

export const DefaultUpdateConfirmation = ({
  handleClose,
  hasAutoPayUpdated,
  hasScheduledPaymentUpdated,
  isAddFlow,
}: {
  handleClose: any
  hasAutoPayUpdated: boolean
  hasScheduledPaymentUpdated: boolean
  isAddFlow?: boolean
}) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const accountId = useActiveAccountId()
  const { data } = useActiveAccount()
  const editPaymentMethodModalsData = useAppData(
    'editPaymentMethodModalsData',
    true,
  )
  const {
    defaultMethodUpdatedDescription,
    defaultMethodDescriptionWithAutoPay,
    defaultMethodDescriptionWithScheduledPayment,
    defaultMethodDescriptionWithAutoPayAndScheduledPayment,
    ok,
  } = editPaymentMethodModalsData

  const handleOk = async () => {
    if (!isAddFlow) {
      if (accountId) {
        dispatch(fetchPaymentMethods(accountId))
      }
      if (hasAutoPayUpdated) {
        dispatch(fetchAutopayDetails(accountId, data?.accountType as string))
      }
    }
    handleClose()
  }

  let description = defaultMethodUpdatedDescription?.value
  if (hasAutoPayUpdated && hasScheduledPaymentUpdated) {
    description = defaultMethodDescriptionWithAutoPayAndScheduledPayment?.value
  } else if (hasAutoPayUpdated) {
    description = defaultMethodDescriptionWithAutoPay?.value
  } else if (hasScheduledPaymentUpdated) {
    description = defaultMethodDescriptionWithScheduledPayment?.value
  }

  return (
    <div className={classes.root}>
      <InjectHTML className={classes.description} value={description} />
      <div className={classes.actionBtnContainer}>
        <Button type="button" onClick={handleOk} text={ok?.value} />
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
