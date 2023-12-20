import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ExpressPayLoginForm from './ExpressPayLoginForm'
import APIClient from 'src/api-client'
import { ExpressPayLoginPayload } from 'src/api-client/types'
import ExpressPayPaymentForm from './ExpressPayPaymentForm'
import AutopayModal from '../account/payments/autopay/AutopayModal'
import ExpressPaymentConfirmation from './ExpressPayConfirmation'

const ExpressPay = () => {
  const [expressLoginDetails, setExpressLoginDetails] = React.useState(null)
  const [loginError, setLoginError] = React.useState(false)
  const [loginProgress, setIsLoginProgress] = React.useState(false)
  const [paymentConfirmation, setPaymentConfirmation] = React.useState(null)
  const classes = useStyles()

  const submitAccountDetails = async (data: ExpressPayLoginPayload) => {
    setIsLoginProgress(true)
    try {
      const response = await APIClient.expressPayLogin(data)
      if (!response || Object.keys(response.data).length <= 1) {
        throw 'INVALID_DETAILS'
      }
      setExpressLoginDetails(response.data)
      setLoginError(false)
      setIsLoginProgress(false)
    } catch (err) {
      setLoginError(true)
      setIsLoginProgress(false)
    }
  }

  if (paymentConfirmation) {
    return (
      <div className={classes.expressContainer}>
        <ExpressPaymentConfirmation paymentConfirmation={paymentConfirmation} />
      </div>
    )
  }

  return (
    <div className={classes.expressContainer}>
      <AutopayModal open={loginProgress} inProgress={loginProgress} />

      {!expressLoginDetails ? (
        <ExpressPayLoginForm
          loginError={loginError}
          submitAccountDetails={submitAccountDetails}
        />
      ) : (
        <ExpressPayPaymentForm
          expressLoginDetails={expressLoginDetails}
          paymentConfirmation={setPaymentConfirmation}
        />
      )}
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  expressContainer: {
    width: '100%',
    padding: '3rem 2rem',
    display: 'flex',
    flexFlow: 'column nowrap',
    minHeight: '50vh',
    alignItems: 'center',
    justifyContent: 'center',
    [breakpoints.down('md')]: {
      padding: '3rem 1rem',
    },
  },
  paymentIframeContainer: {
    marginTop: '1rem',
  },
  paymentAmountFormFields: {
    marginBottom: '0.5rem',
    fontWeight: 600,
  },
}))

export default ExpressPay
