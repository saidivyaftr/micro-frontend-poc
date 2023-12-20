import { Typography, Button } from '@/shared-ui/components'
import useAppData from '@/shared-ui/hooks/useAppData'
import { paymentsTable } from './sitecore-mock'
import { makeStyles } from '@material-ui/core'
import { PaymentPageModals, IPaymentFailure } from './types'
import WarningIcon from '@/shared-ui/react-icons/warning'
const PaymentFailure = ({ setModal, isEdit = false }: IPaymentFailure) => {
  const classes = useStyles()
  const data: any = paymentsTable
  const { paymentFailureTitle, paymentFailureDesc, tryAgain } = useAppData(
    'paymentsTable',
    true,
    data,
  )
  return (
    <div className={classes.root}>
      <div className={classes.errorIcon}>
        <WarningIcon />
      </div>
      <Typography tagType="h3" styleType="h4">
        {paymentFailureTitle?.value}
      </Typography>
      <Typography tagType="p" styleType="p1" className={classes.label}>
        {paymentFailureDesc?.value}
      </Typography>
      <div className={classes.btnWrapper}>
        <Button
          text={tryAgain?.value}
          type="button"
          variant="primary"
          onClick={() =>
            setModal(
              isEdit
                ? PaymentPageModals.EditPayment
                : PaymentPageModals.CancelPayment,
            )
          }
        />
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    padding: '5rem 4rem',
    [breakpoints.down('sm')]: {
      padding: '1rem 0',
    },
  },
  label: {
    margin: 0,
  },
  errorIcon: {
    marginBottom: '1rem',
    '& svg': {
      width: 80,
      height: 80,
    },
  },
  btnWrapper: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    marginTop: '1rem',
    justifyContent: 'center',
  },
}))

export default PaymentFailure
