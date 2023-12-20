export type AccountAccess = {
  users: {
    serviceId: string | null
    isLoading: boolean
    data: User[]
    errorFetching: boolean
  }
  discoverIdentity: {
    isLoading: boolean
    data: DiscoveryIdentity | undefined
    errorFetching: boolean
  }
}

export type User = {
  created: string
  email: string
  firstName: string
  lastLogin: string
  lastName: string
  loginId: string
  uid: string
}

type DiscoveryIdentity = {
  token: string
  authenticationOptions: AuthenticationOption[]
}

export type AuthenticationOption = {
  id: string
  type: string
  telephoneNumber?: string
  address?: string
}
