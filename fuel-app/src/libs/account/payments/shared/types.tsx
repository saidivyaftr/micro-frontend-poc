/* eslint-disable @typescript-eslint/indent */
import { InputField } from './payment-form-fields/InputField'

export interface IOption {
  id: number
  value: string
  displayLabel: string
}

export interface IAutoPayFormValues {
  paymentMethod?: string | number
  newPaymentOption?: string
  termsAndCondition?: boolean
  saveAdditionalPayment?: boolean
  emailId?: string
}

export interface IPaymentFormValues {
  paymentAmount?: string
  paymentDate?: string
  paymentAmountOther?: number | string
  schedulePaymentDate?: string
  paymentMethod?: string | number
  newPaymentOption?: string
  termsAndCondition?: boolean
  saveAdditionalPayment?: boolean
  emailId?: string
  addedNewPaymentMethod?: boolean
  paymentMethodDescription?: string
  fundingType?: string
}

export interface IAddPaymentFormValues {
  newPaymentOption?: string
  nickname: string
  termsAndCondition: boolean
  saveAsDefault?: boolean
}

export interface IFieldProps {
  type: string
  name: string
  value: string
  disabled?: boolean
  label?: string
  icon?: string
  component?: React.ReactNode | typeof InputField
}
export interface IButtonProps {
  type: string
  disabled?: boolean
  label?: string
}

export type PaymentType = 'BankAccount' | 'Card'

export type PaymentAction = 'Payment' | 'AddWallet'

export interface Callback<R, E> {
  (err: E, result?: undefined | null): void
  (err: undefined | null, result: R): void
}

export type OnIframeMessageCallback = Callback<
  PaymentInfoResult | WalletInfoResult,
  PaymentIframeError
>

export type PaymentIframeError = {
  code?: number
  message: string
  analytics?: { event: string; eVar: string }
}

export type PaymentInfoResult = {
  paymentType: 'ONE_TIME_ACH' | 'ONE_TIME_CARD'
  token: string
  paymentMethod: string
  type?: string
  description?: string
}

export type WalletInfoResult = {
  status: 'Active'
  token: string
  type: 'Checking' | 'Card'
  subType: string
  accountNumberEndsWith: string
  description: string
  class: string
  accountHolderName: {
    firstName: string
    lastName: string
  }
}

export type Init = { kind: 'Init' }
export type Intermediate = { kind: 'Intermediate' }
export type Failure = { kind: 'Failure'; error: string }
export type ProcessingState = Init | Intermediate | Failure
