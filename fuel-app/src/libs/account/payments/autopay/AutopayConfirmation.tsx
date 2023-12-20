/* eslint-disable @typescript-eslint/indent */
import { useEffect } from 'react'
import Image from 'next/image'
import {
  AUTOPAY_CANCEL_SUCCESSFUL,
  AUTOPAY_DISCOUNT_HEADER,
  AUTOPAY_ENROLL_WARNING_LINK_TEXT,
  AUTOPAY_ENROLL_WARNING_TEXT,
  AUTOPAY_SIGNUP_SUCCESSFUL,
  AUTOPAY_UPDATE_SUCCESSFUL,
  CONFIRMATION_EMAIL,
  NEXT_PAYMENT_DUE,
  SCHEDULE_AUTO_PAYMENT,
} from 'src/constants'
import Success from './accept-icon.svg'
import { useDispatch } from 'react-redux'
import { fetchAutopayDetails } from 'src/redux/slicers/payment'
import { useRouter } from 'next/router'
import { Loading } from 'src/blitz'
import { Info } from '../../shared/Info'
import moment from 'moment'
import { AppRoutes } from 'src/constants/appRoutes'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core'
import AutopayField from '../shared/AutopayField'
import {
  useActiveAccount,
  useAutopayDetails,
  useProductDetails,
  useActiveAccountId,
} from 'src/selector-hooks'

const useStyles = makeStyles(() => ({
  paddingSpace: { padding: '0 1rem' },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: '8px',
    '& *': {
      margin: 0,
      padding: 0,
    },
  },
  headerSection: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  title: {
    fontSize: '20px',
  },
  updatedTitle: {
    margin: 'auto',
    marginLeft: '24px',
    fontSize: '20px',
  },
  headerButton: {
    margin: '0px 8px',
    padding: 0,
    textTransform: 'capitalize',
    '& span': {
      paddingTop: '8px',
    },
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  cancelledContent: {
    display: 'flex',
    flexDirection: 'column',
    margin: '16px 0px',
  },
  loaderCtr: {
    position: 'fixed',
    inset: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  warning: {
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem 1.5rem',
    background: '#e1e1e1',
  },
  warningLink: {
    color: '#297981',
    fontWeight: 'bolder',
    textDecoration: 'underline',
    textTransform: 'capitalize',
    cursor: 'pointer',
  },
}))

const AutopayConfirmation = () => {
  const css = useStyles()
  const dispatch = useDispatch()
  const router = useRouter()
  const { type } = router.query
  const accountDetails = useActiveAccount()
  const autopayDetails = useAutopayDetails()
  const productDetails = useProductDetails()
  const activeAccountId = useActiveAccountId()
  const dueDate = accountDetails.data.bill?.currentBalance?.dueDate

  const isEligibleForDiscount = !!(
    productDetails.data.map?.eligibleForAPdiscount &&
    !productDetails.data.map?.hasAutopayDiscount
  )

  const paymentMethodName =
    (typeof autopayDetails.data[0]?.paymentMethod === 'object'
      ? autopayDetails.data[0].paymentMethod.name
      : autopayDetails.data[0]?.paymentMethod) || ''

  useEffect(() => {
    if (
      type !== 'cancel' &&
      (!accountDetails.isLoading || !accountDetails.error)
    ) {
      const type = accountDetails.data.autopayType
        ? String(accountDetails.data.autopayType)
        : ''
      type && dispatch(fetchAutopayDetails(activeAccountId, type))
    }
  }, [accountDetails])

  const renderLoader = () => (
    <div className={css.loaderCtr}>
      <Loading />
    </div>
  )

  const renderEnrollWarning = () => {
    const dueDateMoment = moment(dueDate).utcOffset('+0800')
    const warnDateMoment = dueDateMoment.subtract(2, 'days')
    const showWarning =
      moment().isBefore(dueDateMoment) && moment().isAfter(warnDateMoment)

    return (
      showWarning && (
        <div className={css.warning}>
          <div>{AUTOPAY_ENROLL_WARNING_TEXT}</div>
          <div>
            <Link href={AppRoutes.MakeAPaymentPage}>
              <a className={css.warningLink}>
                {AUTOPAY_ENROLL_WARNING_LINK_TEXT}
              </a>
            </Link>
          </div>
        </div>
      )
    )
  }

  const renderError = () => (
    <Info
      type="error"
      message="Failed to fetch the data. Please try again later."
    />
  )

  const renderDetails = () => (
    <div>
      <header className={css.header}>
        <section className={css.headerSection}>
          <Image src={Success} height={50} width={50} alt="confirmation-icon" />
          <p className={`${css.title} ${css.updatedTitle}`}>
            {type === 'signup'
              ? isEligibleForDiscount
                ? AUTOPAY_DISCOUNT_HEADER
                : AUTOPAY_SIGNUP_SUCCESSFUL
              : type === 'update'
              ? AUTOPAY_UPDATE_SUCCESSFUL
              : AUTOPAY_CANCEL_SUCCESSFUL}
          </p>
        </section>
      </header>
      <main className={css.paddingSpace}>
        {type === 'cancel' ? (
          <div className={css.cancelledContent}>
            <div>
              {NEXT_PAYMENT_DUE}
              {moment(dueDate).format('MMM DD, yyyy')}.
            </div>
            <div>{SCHEDULE_AUTO_PAYMENT}</div>
          </div>
        ) : (
          <>
            <AutopayField
              label="Payment Amount"
              value="The total due for billing cycle"
            />
            <AutopayField label="Payment Date" value="On due date" />
            <AutopayField label="Payment Method" value={paymentMethodName} />
          </>
        )}
      </main>
      <footer className={css.paddingSpace}>
        {type !== 'cancel' && (
          <>
            <p>
              {CONFIRMATION_EMAIL} {autopayDetails.data[0]?.email || ''}
            </p>
            {type === 'signup' && renderEnrollWarning()}
          </>
        )}
      </footer>
    </div>
  )

  return (
    <>
      {accountDetails.isLoading || autopayDetails.isLoading
        ? renderLoader()
        : accountDetails.error || autopayDetails.error
        ? renderError()
        : renderDetails()}
    </>
  )
}

export default AutopayConfirmation
