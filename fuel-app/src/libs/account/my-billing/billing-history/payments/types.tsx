import { IFailedPaymentHistory, PaymentHistory } from 'src/redux/types/payments'

export const PaymentTypes = {
  SchedulePayments: 'SCHEDULE_PAYMENTS',
  PastPayments: 'PAST_PAYMENT',
  FailedPayments: 'FAILED_PAYMENTS',
}

export type PaymentTypes = typeof PaymentTypes[keyof typeof PaymentTypes]

export const PaymentPageModals = {
  Init: 'INIT',
  CancelPayment: 'CANCEL_PAYMENT',
  EditPayment: 'EDIT_PAYMENT',
  EditPaymentFailure: 'EDIT_PAYMENT_FAILURE',
  CancelPaymentFailure: 'Cancel_PAYMENT_FAILURE',
  PaymentSuccess: 'PAYMENT_SUCCESS',
} as const

export type PaymentPageModals =
  typeof PaymentPageModals[keyof typeof PaymentPageModals]

export interface IPaymentFormValues {
  amount: string
  schedulePaymentDate: string
  paymentMethodId: string
}

export type ICancelPayment = {
  payment: PaymentHistory
  setPayment?: any
  setModal: (modal: PaymentPageModals) => void
}

export type IPaymentFailure = {
  setModal: (modal: PaymentPageModals) => void
  isEdit?: boolean
}

export type IPaymentSuccess = {
  payment: PaymentHistory
}

export type IFailedPayments = {
  data: [IFailedPaymentHistory] | []
  loading: boolean
  error?: any
}

export type IPastPayments = {
  historyPayments: [PaymentHistory]
  failedPayments: [PaymentHistory]
  loading: boolean
  error?: any
}

export type IPayment = {
  date: string
  status: string
  method: string
  amount: string
  message?: string
  rawDate?: string
  payment?: any
}
