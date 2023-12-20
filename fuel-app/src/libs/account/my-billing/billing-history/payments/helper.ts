import { PaymentTypes } from './types'
import moment from 'moment'
import { formatAmountInDollar } from 'src/utils/amount'

export const formPayments = (type: PaymentTypes, payment: any) => {
  switch (type) {
    case PaymentTypes.SchedulePayments:
      return {
        date: formatDate(payment?.date),
        rawDate: getRawDate(payment?.date) || '-',
        status: payment?.status || '-',
        method: payment?.method || '-',
        amount: formatAmountInDollar(payment.amount),
        payment,
      }
    case PaymentTypes.FailedPayments:
      return {
        date: formatDate(payment?.processDateTime),
        rawDate: getRawDate(payment?.processDateTime) || '-',
        method: payment?.paymentMethod || '-',
        message: payment?.reason?.customerMessage || '-',
        amount: formatAmountInDollar(payment.paymentAmount),
        status: 'Declined',
      }
    case PaymentTypes.PastPayments:
      return {
        date: formatDate(payment?.date),
        rawDate: getRawDate(payment?.date) || '-',
        status: payment?.status || '-',
        method: payment?.method,
        amount:
          payment.status === 'Chargeback'
            ? payment.amount
            : formatAmountInDollar(payment.amount),
      }
    default:
      return payment
  }
}

const getRawDate = (date: string) => (date ? date.split('T')?.[0] : null)

const formatDate = (date: string) => {
  if (!date) {
    return '-'
  }
  const datePart = getRawDate(date)
  return moment(datePart || date).format('ll')
}
