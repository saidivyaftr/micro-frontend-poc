export type Register = {
  step: RegisterStep
  flowType: FlowType
  hasApiFailed: boolean

  accountUuid?: string
  cssAPIGrantToken?: string
  cssAPIAccountAccessToken?: string
  authorizationMethods: AuthorizationMethods[]
  tokenForVerificationForEmail?: string
  tokenForVerificationForMobile?: string

  firstName: string
  lastName: string
  companyName?: string
  accountInformation?: AccountInformation
  accountVerifiedAddress?: AccountAddress
  email?: string
  phone?: string
  emailAddressId?: string
  phoneId?: string
  isEmailVerified: boolean
  isPhoneVerified: boolean
  isPartialLogin: boolean
  gigyaUid?: string
  associatedEmailId?: string

  searchIpaddress?: SearchIpaddress
  searchEmailOrMobile?: SearchEmailOrMobile
  searchLastNameAndAddress?: SearchLastNameAndAddress
  verifySSNAndDOB?: VerifySSNAndDOB
  isBusySendingMFA: boolean
  confirmMFA?: ConfirmMFA
  updateEmail?: UpdateOrAddNewEmail
  updatePhone?: UpdateOrAddNewPhone
  isAddressVerified: boolean
  isIPAddressVerified: boolean
  createPassword?: CreatePassword
  password?: string
  completeRegistration?: CompleteRegistation
}

export type RegisterStep =
  | 'SEARCH_BY_IPADDRESS'
  | 'REGISTER_WITH_EMAIL_OR_MOBILE'
  | 'REGISTER_WITH_NAME_AND_ADDRESS'
  | 'VERIFY_WITH_SSN'
  | 'CONFIRM_EMAIL'
  | 'ADD_NEW_EMAIL_ADDRESS'
  | 'UPDATE_EMAIL_ADDRESS'
  | 'VERIFY_EMAIL_OTP'
  | 'CONFIRM_MOBILE'
  | 'ADD_NEW_MOBILE_NUMBER'
  | 'UPDATE_MOBILE_NUMBER'
  | 'VERIFY_MOBILE_OTP'
  | 'CONFIRM_ADDRESS'
  | 'CREATE_PASSWORD'
  | 'REGISTER_SUCCESS'
  | 'MOBILE_EMAIL_FOUND'

export type FlowType = 'WIFI' | 'EMAIL' | 'PHONE' | 'LAST_NAME_AND_ADDRESS'

export type VerifySSNAndDOB = {
  data?: {
    last4Ssn?: string
    dateOfBirth: string
  }
  isBusy: boolean
  failedReason?: VerifySSNErrorCode
  isVerified?: boolean
  remainingAttempts: number | undefined
  isAccountLocked?: boolean
  accountLockedUntil?: string
}

export type CreatePassword = {
  isBusy: boolean
  failedReason?: CreatePasswordErrorCode
  isCreated?: boolean
}

export type UpdateOrAddNewEmail = {
  isBusy: boolean
  failedReason?: UpdateOrAddNewEmailErrorCode
  errorMessage?: string
}

export type SearchIpaddress = {
  isBusy: boolean
  failedReason?: PrimarySearchErrorCode
  isFound: boolean
  isRegistered: boolean
  useSSNDOB: boolean
}

export type SearchEmailOrMobile = {
  isBusy: boolean
  failedReason?: PrimarySearchErrorCode
  isFound: boolean
}

export type UpdateOrAddNewPhone = {
  isBusy: boolean
  failedReason?: PrimarySearchErrorCode
  errorMessage?: string
}

export type SearchLastNameAndAddress = {
  isBusy: boolean
  failedReason?: PrimarySearchErrorCode
  isFound: boolean
}

export type ConfirmMFA = {
  isBusy: boolean
  failedReason?: MFAFailedReason
  remainingAttempts: number | undefined
  isAccountLocked?: boolean
  accountLockedUntil?: string
  hasReachedMaxEmailAttempts?: boolean
  emailFailedReason?: MFAFailedReason
}

export type AuthorizationMethods = {
  method: string
  maskedDeliveryLocation: string
}

export type AccountInformation = {
  account: {
    accountName: {
      givenName: string
      familyName: string
      companyName: string
    }
    accountNumber: string
    phoneNumber: {
      phoneNumber: number
      sequenceNumber: number
    }
    accountUuid: string
  }
  authorization: {
    authorizationToken: string
    expirationTimestamp: string
  }
}

export type AccountAddress = {
  streetNumber: string
  streetName: string
  streetSuffix: string
  city: string
  state: string
  zipCode: string
}

export type CompleteRegistation = {
  profile_email: string
  frontier_is_blank_password: boolean
  expired: boolean
}

export type VerifySSNErrorCode =
  | 'API_ERROR'
  | 'ACCOUNT_NOT_FOUND'
  | 'ACCOUNT_REGISTERED'
  | undefined
export type CreatePasswordErrorCode = 'API_ERROR' | undefined
export type PhoneErrorCode =
  | 'API_ERROR'
  | 'ALREADY_REGISTERED'
  | 'INVALID_PHONE'
  | undefined
export type UpdateOrAddNewEmailErrorCode =
  | 'API_ERROR'
  | 'INVALID_EMAIL'
  | 'ALREADY_REGISTERED'
  | undefined
export type PrimarySearchErrorCode =
  | 'API_ERROR'
  | 'ACCOUNT_NOT_FOUND'
  | 'ALREADY_REGISTERED'
  | 'MULTI_ACCOUNT_FOUND'
  | undefined
export type MFAFailedReason = 'INVALID_OTP' | 'MOBILE_ALREADY_REGISTERED'

export type mfaMethod = 'EMAIL' | 'PHONE'
