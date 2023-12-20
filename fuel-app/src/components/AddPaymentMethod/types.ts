import { IButtonVariant, ButtonSize } from '@/shared-ui/components/Button'
import { IDotColor } from '@/shared-ui/components/Loading/types'
import { IPaymentFormValues } from 'src/libs/account/payments/shared/types'
import { DstAuthDetails } from 'src/redux/types/payments'

export type AddPaymentMethodProps = {
  dstConfig: DstAuthDetails
  isBusy?: boolean
  successCallback?: (
    paymentID: string,
    isDefault: boolean,
    paymentType?: string,
    cardType?: string,
    formData?: IPaymentFormValues,
    methodName?: string,
    addedNewPaymentMethod?: boolean,
  ) => void
  handleCancel?: () => void
  primaryBtnText?: string
  primaryBtnVariant?: IButtonVariant
  primaryBtnSize?: ButtonSize
  primaryLoadingVariant?: IDotColor
  description?: any
  hideCancelBtn?: boolean
  primaryBtnDisabled?: boolean
  paymentFormData?: IPaymentFormValues
  showTitle?: boolean
}

export type PaymentIframeProps = {
  selectedPaymentType: PaymentType
  iframeURL: string | null
  iframeRef: any
  defaultPayment: boolean
  setDefaultPayment: (value: boolean) => void
  savePayment: boolean
  setSavePayment: (value: boolean) => void
  showSavePayment?: boolean
}

export type PaymentType = 'CARD' | 'BANK'

export type ErrorType =
  | 'CARD_NOT_SUPPORTED'
  | 'SESSION_TIMED_OUT'
  | 'PAYMENT_VELOCITY'
  | 'PAYMENT_BLOCKED'
  | 'SOMETHING_WENT_WRONG'
  | 'DUPLICATE'
  | null

export interface FiservData {
  result: Result
  fundingAccountValidationResult: FundingAccountValidationResult
}

interface StatusMessage {
  code: number
  type: string
  description: string
}

interface Result {
  statusCode: string
  statusMessages: StatusMessage[]
}

interface CheckValidationDetail {
  routingNumberState: string
  checkAccountValidationState: string
  fundingAccountType: string
  isBlocked: boolean
  isAccountValid: boolean
}

interface FundingAccount {
  fundingAccountToken: string
  fundingAccountLastFourDigit: string
  fundingMethod: string
  fundingCategory: string
  firstName: string
  lastName: string
  bankAccountType: string
}

interface CardValidationDetail {
  fundingMethodDetail: FundingMethodDetail
  expirationDateState: string
  securityCodeValidationState: string
  zipCodeValidationState: string
  isBlocked: boolean
  isAccountValid: boolean
}

interface FundingMethodDetail {
  fundingCategory: string
  fundingMethod: string
  fundingCardType: string
}

interface FundingAccountValidationResult {
  summaryValidationState: string
  checkValidationDetail: CheckValidationDetail
  cardValidationDetail: CardValidationDetail
  fundingAccount: FundingAccount
}
