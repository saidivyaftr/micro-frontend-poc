import { Address } from './acpTypes'

type BGAStep =
  | 'check_availability'
  | 'nominate_area'
  | 'nominate_area_success'
  | 'building_fiber'
  | 'building_fiber_success'
  | 'fiber_is_coming'
  | 'fiber_is_coming_success'
  | 'fiber_nomination_success'
  | 'internet_is_available'
  | 'fiber_is_available'
  | 'nominate_thanks_greater_than_2'
  | 'nominate_thanks_less_than_2'

export type addressKeyTypes = {
  environment: string
  controlNumber: string
}

export type BgaPage = {
  selectedAddress?: Address
  step: BGAStep
  scenario: string
  status: string
  fiberComingDate: string
  isCopperAvailableLessThan2: boolean
  addressKey: addressKeyTypes
}

export type haveFiberNetType = {
  header: any
  body: {
    firstName: string
    lastName: string
    emailAddress: string
    mobilePhoneNumber: number
    accountId: any
    communication: any
    marketing: any
    address: any
    serviceAddressMasterId: any
    addressKey: string
    scenario: string
    fiberAvailableDate?: string
    GpsCoordinates: any
  }
}
