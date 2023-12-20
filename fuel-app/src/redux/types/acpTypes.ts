export type SamRecord = {
  environment: string
  controlNumber: string
}

export type Address = {
  addressKey: string
  address: {
    addressLine1: string
    addressLine2: string
    city: string
    stateProvince: string
    zipCode: string
  }
  parsedAddress: {
    streetNumber: string
    streetPreDirectional: string
    streetName: string
    streetSuffix: string
    streetPostDirectional: string
    unitType: string
    unitNumber: string
    city: string
    stateProvince: string
    zipCodeBase: string
    zipCodePlus4: string
  }
  samRecords: SamRecord[]
  latitude: number
  longitude: number
  isParent: boolean
  inFootprint: boolean
}

export type AcpPage = {
  selectedAddress?: Address
  isServiceabilityLoading: boolean
  step: 'acp-form' | 'success' | 'error' | 'not-serviceable'
  submitModal?: {
    showModal: boolean
    title: string
    subTitle: string
    isLoading: boolean
    isFooterCloseButton: boolean
    buttonName: string
    modalContentClassName: boolean
  }
  availabilityResponse?: {
    zipCode: string
    serviceType: string
  }
  apiErrorData: undefined | { status: number; errorCode: string }
}

export type AcpUsageState = {
  step: 'confirm' | 'success' | 'error'
}
