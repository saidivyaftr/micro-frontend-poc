/* eslint-disable @typescript-eslint/indent */

export type AccountState = {
  list: { isLoading: boolean; data: AccountList; error?: boolean }
  activeAccount: {
    id: string
    uuid: string
    details: {
      isLoading: boolean
      data: AccountDetails | Record<string, never>
      error?: boolean
    }
  }
  accountInfoOnLoad: {
    isLoading: boolean
    data: AccountInfoOnLoad | Record<string, never>
    error?: boolean
  }
  vacationServices: {
    isLoading: boolean
    data: any
    error?: boolean
  }
}

export type ServiceAddress = {
  street: string
  city: string
  state: string
  zip: string
}

export type ServiceDetails = {
  id: string
  ref: string
  type: string
  details: {
    subType: string
    usi: string
    hasKobie: boolean
    environment: string
    billingAddress?: BillingAddress
    serviceAddress?: ServiceAddress
    label?: string
  }
}

export type Account = {
  accountNumber: string
  accountStatus: string
  accountStatusNew: string
  accountType: string
  firstName: string
  id: string
  lastName: string
  name: string
  pin: string
  preferred: boolean
  serviceDetails?: ServiceDetails
  accountUuid?: string
}

export type AccountList = Array<Account>

export type AccountPin = {
  accountUuid: string
  pinNumber: string
  created: {
    userId: any
    source: string
    dateTime: string
  }
  updated: {
    userId: any
    source: string
    dateTime: string
  }
}

export type AccountBillsType = {
  balanceBeforeCurrentCharges: { amount: number }
  lastStatementBalance: { amount: number; date: string }
  paymentSinceLastStatement: { amount: number; date: string }
  paymentReceivedSinceLastStatement: { amount: number }
  creditsOrAdjustments: { amount: number; status: string }
  pendingPayment: { amount: number; date: string; isAutoPayMode: boolean }
  pendingPayments: { amount: number }
  scheduledPayments: { amount: number }
  pastDueBalance: { amount: number; date: string }
  currentBalance: { amount: number; dueDate: string }
  manageBillData: {
    balanceBeforeCurrentCharges: number
    currentCharges: number
    amountOfLastBill: number
    paymentReceivedThruText: string
    lastBillDate: string
    paymentReceivedThruAmount: number
  }
  isPastDue: boolean
  consolidatedBalance: {
    pendingEBPPPaymentsNotInDPI: { amount: string }
    pendingUnpostedPayments: { amount: string }
    postedUnbilledBelowTheLineAdjustments: { amount: string }
    currentBalanceInDPI: { amount: string }
    consolidatedBalanceDue: { amount: string }
  }
}

export type BillingAddress = {
  street: Array<string> | string
  city: string
  state: string
  zip: string
}

export type AccountDetails = {
  id: string
  accountNumber: string
  accountUID?: string
  pin: string
  accountPin: AccountPin | string
  dataRegion: string
  firstName: string
  lastName: string
  accountType: string
  paperless: boolean
  paperBillFee: string
  bill?: AccountBillsType
  billingAddress: BillingAddress
  billingContactEmail: string
  primaryContact: string
  serviceRefreshEligible?: boolean
  preferredLanguageCode: string
  preferredLanguageEditable?: boolean
  obpStatus: boolean
  constraints?: {
    payments: {
      minimumAmount: number
      maximumAmount: number
      latestScheduledPaymentDate: string
    }
    blocking: {
      isBlockedForACH: boolean
      isBlockedForCard: boolean
      isBlockedForPaymentVelocity: boolean
    }
  }
  autopayType: string | boolean
  ecommerceEnabled: boolean
  usi: string
  icaseId: string
}

export type ProductDetails =
  | {
      displayOrder: string[]
      map: {
        [x: string]: any
        eligibleForAPdiscount: boolean
        hasAutopayDiscount: boolean
      }
    }
  | Record<string, never>

export type AccountInfoOnLoad = {
  currentDueBalance: string
  billingAddressLine: string
  billingAddressState: string
  billingAddressCity: string
  billingAddressZip: string
  accountHolderLastName: string
  accountHolderFirstName: string
  usi: string
  billDueDate: string
  accountNumber: string
  pin: string
  uuid: string
  btn: string
  scheduledAutopayDate: string
  lastPaymentAmount: string
  lastPaymentdate: string
  nextPaymentAmount?: string
  nextPaymentdate?: string
}
