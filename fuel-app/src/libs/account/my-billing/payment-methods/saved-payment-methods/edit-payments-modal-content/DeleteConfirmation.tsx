import { Button, InjectHTML } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import { useActiveAccountId } from 'src/selector-hooks'
import { fetchPaymentMethods } from 'src/redux/slicers/payment'
import { useDispatch } from 'react-redux'
import { useAppData } from '@/shared-ui/hooks/index'

export const DeleteConfirmation = ({ handleClose }: { handleClose: any }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const editPaymentMethodModalsData = useAppData(
    'editPaymentMethodModalsData',
    true,
  )
  const accountId = useActiveAccountId()

  const handleCancel = () => {
    if (accountId) {
      dispatch(fetchPaymentMethods(accountId))
    }
    handleClose()
  }

  return (
    <div className={classes.root}>
      <InjectHTML
        className={classes.description}
        value={editPaymentMethodModalsData?.deletedDescription?.value}
      />
      <div className={classes.actionBtnContainer}>
        <Button
          type="button"
          onClick={handleCancel}
          text={editPaymentMethodModalsData?.ok?.value}
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
