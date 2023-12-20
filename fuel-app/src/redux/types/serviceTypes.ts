/* eslint-disable @typescript-eslint/indent */

export type ServiceState = {
  list: { isLoading: boolean; data: ServiceList; error?: boolean }
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
  createdDate?: string
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

export type ServiceList = Array<ServiceDetails>

export type BillingAddress = {
  street: Array<string> | string
  city: string
  state: string
  zip: string
}
