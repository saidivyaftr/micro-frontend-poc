export type offersData = {
  sCaseID: string
  Offers: offerData[]
  CartLineItems: CartLineItem[]
  AddressLine1: string
  AddressLine2?: string
  City: string
  State: string
  ZipCode: string
  ServiceAddress: string
  Email: string
  newServicesInCart: CartLineItem[]
  exisitingServicesTotal: number
  newServicesTotal: number
  monthlyRecurringChargesTotal: number
  oneTimeChargesInCart: CartLineItem[]
  oneTimeChargesTotal: number
  newItemsInCart: CartLineItem[]
  exisitingItemsInCart: CartLineItem[]
  ExtenderLimit?: ExtendersLimits
  Category: string
  IsExtenderEligible: boolean
}

export type ExtendersLimits = {
  TotalExtendersNewlyAdded: number
  MaxLimit: number
  quantityValue: number
  RemainingQuantity: number
  IsWwifiAdded: boolean
}

export type offerData = {
  ItemCode: string
  Action?: string
  FeatureGroup?: string
  Description?: string
  ItemSequence: number
  IsDisabled?: boolean
  MaximumQuantity?: number
  FeatureClass?: string
  AdditionalText?: string
  Type?: string
  Recurring?: boolean
  Price: number
  featureCategory?: string
  SummaryLevel?: string
  Category: string
}

export type tileData = {
  addMeshExtender: siteCoreData
  ItemCode: string
  id: siteCoreData
  title: siteCoreData
  subTitle: siteCoreData
  description: siteCoreData
  WHWFinOffersDescription: siteCoreData
  href: siteCoreData
  icon: siteCoreData
  buttonText: siteCoreData
  Price: string
  ItemSequence: number
  addToCartButtonText: siteCoreData
  addToCartremoveCartIcon: siteCoreData
  Category: string
}

export type siteCoreData = {
  value: string
  url: string
  rendered: string
}

export type CartLineItemsData = {
  CartLineItems: CartLineItem[]
  ServiceAddress: string
}
export type CartLineItem = {
  Type?: string
  Description?: string
  Recurring?: boolean
  Price: number
  SummaryLevel?: string
  FeatureClass?: string
  ItemCode: string
  ItemSequence: number
  Discounts: number
  Category: string
  Quantity: number
}

export type SelfServicesHeaderTypes = {
  sourceId: string
  pageCode: string
  getOfferData?: offerData
  pdpOffersData?: offersData
  cartItemCount: number
  setCartItemCount: React.Dispatch<React.SetStateAction<number>>
  isViewedMatching: boolean
  setIsViewedMatching: React.Dispatch<React.SetStateAction<boolean>>
  servicesHeaderSitecoreData: siteCoreData
  clickEventName: string
  productPriceSubText?: string
  skipExtenderModal?: boolean
  setSkipExtenderModal?: React.Dispatch<React.SetStateAction<boolean>>
  openExtenderModal?: boolean
  setOpenExtenderModal?: React.Dispatch<React.SetStateAction<boolean>>
  setShowSpinner?: React.Dispatch<React.SetStateAction<boolean>>
}

export type offersDataForAnalytics = {
  productInfo: offerDataForAnalytics
}

export type offerDataForAnalytics = {
  id: string
  type: string
}
