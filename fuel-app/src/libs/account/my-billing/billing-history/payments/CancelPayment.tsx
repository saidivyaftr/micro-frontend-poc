import { Typography, Button } from '@/shared-ui/components'
import useAppData from '@/shared-ui/hooks/useAppData'
import { paymentsTable } from './sitecore-mock'
import { makeStyles } from '@material-ui/core'
import { ICancelPayment, PaymentPageModals } from './types'
import { formatCurrency } from 'src/libs/account/payments/util'
import moment from 'moment'
import WarningIcon from '@/shared-ui/react-icons/warning'
import { useActiveAccountId } from 'src/selector-hooks'
import APIClient from 'src/api-client'
import { fetchPaymentHistory } from 'src/redux/slicers/payment'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { SITE_ERROR } from 'src/constants'

const CancelPayment = ({ payment, setModal }: ICancelPayment) => {
  const { amount = '', date = '', method = '', paymentId } = payment
  const [loading, setLoading] = useState(false)
  const accountId = useActiveAccountId()
  const dispatch = useDispatch()
  const classes = useStyles()
  const data: any = paymentsTable
  const {
    cancelPayment,
    amountlabel,
    dateLabel,
    paymentMethod,
    dontCancel,
    yesCancel,
  } = useAppData('paymentsTable', true, data)

  const handleCancelPayment = async () => {
    const UPDATE_PAYMENT_CLICK = 'payments:cancel payment'
    try {
      setLoading(true)
      await APIClient.deletePayment(accountId, paymentId)

      DTMClient.triggerEvent(
        {
          events: 'event14',
          eVar14: UPDATE_PAYMENT_CLICK,
        },
        'tl_o',
        UPDATE_PAYMENT_CLICK,
      )

      setModal(PaymentPageModals.Init)
      if (accountId) dispatch(fetchPaymentHistory(accountId))
    } catch {
      setModal(PaymentPageModals.CancelPaymentFailure)
      DTMClient.triggerEvent(
        {
          events: 'event88',
          eVar2: UPDATE_PAYMENT_CLICK,
          eVar88: 'Failed to delete payment',
        },
        'tl_o',
        SITE_ERROR,
      )
    }
    setLoading(false)
  }

  return (
    <div className={classes.root}>
      <div className={classes.errorIcon}>
        <WarningIcon />
      </div>
      <Typography tagType="h3" styleType="h5">
        {cancelPayment?.value}
      </Typography>
      <div>
        <Typography
          tagType="h6"
          styleType="p1"
          fontType="boldFont"
          className={classes.label}
        >
          {amountlabel?.value}
        </Typography>
        <Typography tagType="p" styleType="p1" className={classes.label}>
          {formatCurrency(amount)}
        </Typography>
      </div>
      <div>
        <Typography
          tagType="h6"
          styleType="p1"
          fontType="boldFont"
          className={classes.label}
        >
          {dateLabel?.value}
        </Typography>
        <Typography tagType="p" styleType="p1" className={classes.label}>
          {date ? moment(date).format('ll') : '-'}
        </Typography>
      </div>
      <div>
        <Typography
          tagType="h6"
          styleType="p1"
          fontType="boldFont"
          className={classes.label}
        >
          {paymentMethod?.value}
        </Typography>
        <Typography tagType="p" styleType="p1" className={classes.label}>
          {method}
        </Typography>
      </div>
      <div className={classes.btnWrapper}>
        <Button
          text={dontCancel?.value}
          type="button"
          variant="primary"
          onClick={() => setModal(PaymentPageModals.Init)}
          disabled={loading}
        />
        <Button
          text={yesCancel?.value}
          type="button"
          variant="tertiary"
          onClick={handleCancelPayment}
          isBusy={loading}
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
  errorIcon: {
    marginBottom: '1rem',
    '& svg': {
      width: 80,
      height: 80,
    },
  },
  label: {
    margin: 0,
  },
  btnWrapper: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    marginTop: '1rem',
    justifyContent: 'center',
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
}))

export default CancelPayment
