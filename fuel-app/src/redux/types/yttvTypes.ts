export type Offer = {
  billableAmount: number
  discountAmount: number
  freeTrial: boolean
  freeTrialDurationDays: number
  productDescription: string
  productName: string
  promotionLength: number
  subscriptionId: string
  vendor: string
  vendorProductId: string
}

export type Offers = {
  message?: string
  offers: Array<Offer>
  originalOfferEligibile: boolean
}
