export type Profile = {
  notificationSettings: {
    isLoading: boolean
    emailPreferences: {
      billReadyNotification: boolean
      serviceUpdates: boolean
      marketingPromotions: boolean
      accountInformation: boolean
    }
    mobilePreferences: {
      serviceUpdates: boolean
      marketingPromotions: boolean
      accountInformation: boolean
    }
    enrolled: boolean
    errorFetching: boolean
  }
  ccpaReview: {
    isLoading: boolean
    data: any
  }
  phoneNumbers: {
    isLoading: boolean
    data: Array<{
      id: string
      number: string
      type: string
      isPrimary: boolean
      created: any
      updated: any
      verified: any
    }>
    errorFetching: boolean
  }
  emailAddresses: {
    isLoading: boolean
    data: Array<{
      id: string
      address: string
      isPrimary: boolean
      created: any
      updated: any
      verified: any
    }>
    errorFetching: boolean
  }
}
