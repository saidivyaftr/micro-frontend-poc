import { PostPaymentPayload } from 'src/api-client/types'

/* eslint-disable @typescript-eslint/indent */
export type PaymentMethod = {
  id: string
  status: string
  type: string
  default: boolean
  nickName: string
  subtype: string
  accountNumberEndsWith: string
  systemOfOrigin: string
  description: string
  updateable: boolean
  deleteable: boolean
  class: string
  accountHolderName?: { firstName: string; lastName: string }
  disabled?: boolean | null
}

export type PaymentMethodProfile = {
  email: string
  address: {
    addressLine1: string
    addressLine2: string
    city: string
    state: string
    zipCode: string
  }
}

export type PaymentMethodList = Array<PaymentMethod>

export type PaymentMethodsData =
  | {
      profile: PaymentMethodProfile
      paymentMethods: PaymentMethodList
    }
  | Record<string, never>

export type DstAuthDetails =
  | {
      auth: string
      APIKey: string
      sessionToken: string
      creditUrl: string
      bankUrl: string
      messageId: string
      customerName: string
      accountId: string
      customerType: string
    }
  | Record<string, never>

export type NewPaymentMethodType = {
  id: string
  value: string
  displayLabel: string
}

export type PaymentConfirmationType = 'autopay-signup' | 'autopay-update'

export type AutopayPaymentMethod = string | { name: string }

export type AutopayDetails = {
  id: string
  amount: {
    type: string
    value: string
  }
  email: string
  status: string
  paymentMethodId: string
  paymentMethod: AutopayPaymentMethod
  last4: string
  scheduleDayBefore: string
  startDate: string
  lastUpdated: string
  endDate: string
  systemOfOrigin: string
}

export type Autopay = Array<AutopayDetails>

export type OneTimePaymentConfirmation = {
  paymentAmount: string
  paymentDate: string
  paymentMethod: string
  confirmationNumber: string
  email: string
  confirmationCode: string
}

export type PaymentState = {
  paymentList: { isLoading: boolean; data: any; error?: boolean }
  paymentConfirmation:
    | { kind: 'Init' }
    | {
        kind: 'OneTimePayment'
        data: OneTimePaymentConfirmation
      }
    | {
        kind: 'AutoPaySignup'
        data: Record<string, any>
      }

  autopayDetails: { isLoading: boolean; data: Autopay; error?: boolean }
  showAutoPayEditForm: boolean
  paymentMethods: {
    isLoading: boolean
    data: PaymentMethodsData
    error?: boolean
  }
  dstConfigDetails: {
    isLoading: boolean
    data: DstAuthDetails
    error?: boolean
  }
  postPaymentDetails: {
    isLoading: boolean
    data: PostPaymentPayload | Record<string, never>
    error?: any
  }
}

export type IFailedPaymentHistory = {
  account: {
    invoiceBillingAccountNumber: string
  }
  agentId: string
  confirmationNumber: string
  paymentAmount: string
  paymentChannel: string
  paymentMethod: string
  processDateTime: string
  transmissionDate: string
  reason: {
    processorResponseCode: number
    customerMessage: string
    cardDeclineType: string
  }
}

export type PaymentHistory = {
  source: string
  batchId: string
  paymentId: string
  date: string
  status: string
  amount: number
  postdate: string
  method: string
  paymentMethodId: string
  emailAddress: string
  apportioning: [Apportioning]
  confirmation: string
  automaticPaymentMethodId: any
  updateable: boolean
  deletable: boolean
  paymentType: string
}
export type PaymentsHistory = {
  failedPayments: [IFailedPaymentHistory]
  history: [PaymentHistory]
  scheduled: [PaymentHistory]
}
export type Apportioning = {
  accountId: AccountId
  amount: number
  reason: Reason
}

export type AccountId = {
  accountNumber: string
  phoneNumber: PhoneNumber
}

export type PhoneNumber = {
  phoneNumber: number
}

export type Reason = {
  type: string
}
