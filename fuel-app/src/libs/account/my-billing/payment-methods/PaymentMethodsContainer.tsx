import { makeStyles } from '@material-ui/core'
import { COMPONENT_WRAPPER } from 'src/constants'
import AutoPay from './auto-pay'
import SavedPaymentMethods from './saved-payment-methods'
import PayYourBillCard from 'src/libs/account/my-billing/shared/pay-your-bill-card'
import { PaperLessBillingCard } from 'src/libs/account/my-billing/shared'

const PaymentMethodsContainer = () => {
  const classes = useStyles()

  return (
    <section className={classes.wrapper}>
      <div className={classes.root}>
        <div className={classes.layout}>
          <div className={classes.leftCol}>
            <AutoPay />
            <div id="savedPaymentMethods">
              <SavedPaymentMethods />
            </div>
          </div>
          <div className={classes.rightCol}>
            <PayYourBillCard />
            <PaperLessBillingCard />
          </div>
        </div>
      </div>
    </section>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    paddingBottom: '4rem',
  },
  root: {
    ...COMPONENT_WRAPPER,
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    padding: 0,
  },
  layout: {
    display: 'flex',
    gap: '1rem',
    [breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  leftCol: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  rightCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    width: 314,
    [breakpoints.down('md')]: {
      width: '100%',
    },
  },
  title: {
    marginBottom: 32,
  },
}))

export default PaymentMethodsContainer
