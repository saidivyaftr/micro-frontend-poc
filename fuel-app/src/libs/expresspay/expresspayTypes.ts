export type ExpressPaymentLoginDetails = {
  auth: string
  APIKey: string
  sessionToken: string
  creditUrl: string
  bankUrl: string
  accountId: string
  customerType: string
  customerName: string
  messageId: string
  blocking: {
    isBlockedForACH: boolean
    isBlockedForCard: boolean
    isBlockedForPaymentVelocity: boolean
  }
  accountAmounts: any
}

export type PaymentConfirmationDetails = {
  accountNumber: string
  paymentAmount: string
  paymentDate: string
  confirmationNumber: string
  paymentMethod: string
}
