/* eslint-disable @typescript-eslint/indent */
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

export type ProductsState = {
  details: {
    isLoading: boolean
    data: ProductDetails
    error?: boolean
  }
}
