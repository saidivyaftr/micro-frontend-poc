import { Typography } from '@/shared-ui/components'
import useAppData from '@/shared-ui/hooks/useAppData'
import { paymentsTable } from './sitecore-mock'
import { makeStyles } from '@material-ui/core'
import { formatDate, formatCurrency } from 'src/libs/account/payments/util'
import { SchedulePayIcon } from '@/shared-ui/react-icons'
import colors from '@/shared-ui/colors'
const PaymentSuccess = ({ payment }: any) => {
  const { amount = '', date = '', method = '', emailAddress = '' } = payment
  const classes = useStyles()
  const data: any = paymentsTable
  const {
    paymentSuccessTitle,
    paymentSuccessDesc,
    details,
    paymentMethod,
    scheduledFor,
  } = useAppData('paymentsTable', true, data)

  return (
    <div className={classes.root}>
      <div className={classes.iconHeader}>
        <SchedulePayIcon />
      </div>
      <Typography tagType="h3" styleType="h5">
        {paymentSuccessTitle?.value}
      </Typography>
      <Typography tagType="p" styleType="p1" className={classes.label}>
        {`${paymentSuccessDesc?.value} ${emailAddress}.`}
      </Typography>
      <div>
        <Typography tagType="h6" styleType="p1" className={classes.label}>
          {details?.value}
        </Typography>
        <Typography tagType="p" styleType="p1" className={classes.label}>
          {`${formatCurrency(amount)} ${scheduledFor?.value} ${
            date ? formatDate(date, 'long') : '-'
          }`}
        </Typography>
      </div>
      <div>
        <Typography tagType="h6" styleType="p1" className={classes.label}>
          {paymentMethod?.value}
        </Typography>
        <Typography tagType="p" styleType="p1" className={classes.label}>
          {method}
        </Typography>
      </div>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    padding: '2rem',
  },
  iconHeader: {
    background: colors.main.blue,
    padding: '1rem',
    borderRadius: '2.5rem',
    display: 'flex',
    alignItems: 'center',
  },
  label: {
    margin: 0,
  },
}))

export default PaymentSuccess
