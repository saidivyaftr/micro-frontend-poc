import { ServiceOrders } from 'src/api-client/types'
import { WelcomePageModals } from 'src/libs/account/welcome/types'

export type WelcomeState = {
  isLoading: boolean
  unprovisionedServices: UnprovisionedList
  errorFetchingServices?: boolean
  selectedService: ServiceDetails | null

  isLoadingServiceOrders: boolean
  unprovisionedServiceOrder: ServiceOrders.ServiceOrderDetails | null
  orderBillingSummary: null
  errorFetchingUnprovisionedServiceOrder: boolean

  modal: WelcomePageModals
  isCancelledOrder: boolean
  isSelfInstallationOrder: boolean
  isNoInstallationOrder: boolean
  isTechInstallationOrder: boolean
  hasNoAppointment: boolean
}

export type ServiceAddress = {
  street: string
  city: string
  state: string
  zip: string

  streetName?: string
  streetNumber?: string
  stateAbbreviation?: string
  cityName?: string
  secondaryNumber?: string
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

export type UnprovisionedList = Array<ServiceDetails>

export type BillingAddress = {
  street: Array<string> | string
  city: string
  state: string
  zip: string
}


export type IBillingSummary = {
  environmentCode: string
  orderNumber: string
  status: string
  uuid: string
}