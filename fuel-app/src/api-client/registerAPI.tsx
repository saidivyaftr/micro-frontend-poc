import axios from 'axios'
import { getBaseURL } from './index'

export const registerAPI = {
  searchEmailOrMobile: (data: SearchEmailOrMobilePayload) => {
    return axios.post(
      `${getBaseURL()}/api/register/search-email-or-mobile`,
      data,
    )
  },
  searchWithLastNameAndAddress: (data: SearchWithLastNameAndServiceAddress) => {
    return axios.post(
      `${getBaseURL()}/api/register/search-last-name-and-address`,
      data,
    )
  },
  verifySSNAndDOB: (data: any) => {
    return axios.post(`${getBaseURL()}/api/register/verify-ssn-and-dob`, data)
  },
  sendPrimaryMFAByEmail: (data: RequestPrimaryMFAPayload) => {
    return axios.post(`${getBaseURL()}/api/register/send-mfa-by-email`, data)
  },
  sendPrimaryMFAByPhone: (data: RequestPrimaryMFAPayload) => {
    return axios.post(`${getBaseURL()}/api/register/send-mfa-by-phone`, data)
  },
  sendSecondaryMFAByEmail: (data: RequestSecondaryMFAEmailPayload) => {
    return axios.post(
      `${getBaseURL()}/api/register/send-secondary-mfa-by-email`,
      data,
    )
  },
  sendSecondaryMFAByPhone: (data: RequestSecondaryMFAPhonePayload) => {
    return axios.post(
      `${getBaseURL()}/api/register/send-secondary-mfa-by-phone`,
      data,
    )
  },
  validatePrimaryMFACode: (data: ValidatePrimaryMFAPayload) => {
    return axios.post(`${getBaseURL()}/api/register/validate-mfa-code`, data)
  },
  fetchUserDetails: (uuid: string) => {
    return axios.get(
      `${getBaseURL()}/api/register/fetch-user-details-by-uuid?uuid=${uuid}`,
    )
  },
  addNewEmail: (data: RequestAddNewEmailPayload) => {
    return axios.post(
      `${getBaseURL()}/api/register/add-new-email-address`,
      data,
    )
  },
  updateEmail: (data: RequestUpdateEmailPayload) => {
    return axios.post(`${getBaseURL()}/api/register/update-email-address`, data)
  },
  markEmailVerified: (data: MarkEmailVerifiedPayload) => {
    return axios.post(`${getBaseURL()}/api/register/mark-email-verified`, data)
  },
  addNewPhoneNumber: (data: RequestAddNewPhoneNumber) => {
    return axios.post(`${getBaseURL()}/api/register/add-new-phone-number`, data)
  },
  updatePhoneNumber: (data: RequestUpdatePhoneNumber) => {
    return axios.patch(`${getBaseURL()}/api/register/update-phone-number`, data)
  },
  markPhoneVerified: (data: MarkPhoneVerifiedPayload) => {
    return axios.post(`${getBaseURL()}/api/register/mark-phone-verified`, data)
  },
  validateSecondaryMFACode: (data: ValidateSecondaryMFAPayload) => {
    return axios.post(
      `${getBaseURL()}/api/register/validate-secondary-mfa-code`,
      data,
    )
  },
  createPassword: (data: CreatePasswordPayload) => {
    return axios.post(`${getBaseURL()}/api/register/create-password`, data)
  },
  updatePassword: (data: UpdatePasswordPayload) => {
    return axios.post(`${getBaseURL()}/api/register/update-password`, data)
  },
  linkAccount: (data: LinkAccountPayload) => {
    return axios.post(`${getBaseURL()}/api/register/link-accounts`, data)
  },
  searchEmailStatus: (email: string) => {
    return axios.post(`${getBaseURL()}/api/register/search-email`, {
      email,
    })
  },
  isEmailRegistered: (email: string) => {
    return axios.post(`${getBaseURL()}/api/register/email-exists`, {
      email,
    })
  },
  authorizeByEmail: (data: SearchEmailOrMobilePayload) => {
    return axios.post(`${getBaseURL()}/api/register/authorize-by-email`, data)
  },
}

export interface CreatePasswordPayload {
  username: string
  password: string
}

export interface UpdatePasswordPayload {
  accountAccessToken: string
  uid: string
  emailId: string
  password: string
}

export interface RequestAddNewPhoneNumber {
  accountUuid: string
  cssAPIAccountAccessToken: string
  payload: {
    givenName?: string
    familyName?: string
    companyName?: string
    number: string
  }
}

export interface RequestUpdatePhoneNumber {
  accountUuid: string
  cssAPIAccountAccessToken: string
  phoneId: string
  payload: {
    givenName?: string
    familyName?: string
    companyName?: string
    number: string
  }
}

export interface SearchWithLastNameAndServiceAddress {
  customerLastNameAddress: {
    lastName: string
    environment: string
    controlNumber: number
  }
}

export interface MarkEmailVerifiedPayload {
  accountUuid: string
  emailId: string
  cssAPIAccountAccessToken: string
  payload: {
    verified: boolean
  }
}

export interface MarkPhoneVerifiedPayload {
  accountUuid: string
  phoneId: string
  cssAPIAccountAccessToken: string
  payload: {
    verified: boolean
  }
}

export interface LinkAccountPayload {
  username: string
  password: string
  accountAccessToken: string
  partialLogin: boolean
}

export interface RequestPrimaryMFAPayload {
  grantToken: string
}

export interface RequestSecondaryMFAEmailPayload {
  accountUuid: string
  emailAddressId: string
  cssAPIAccountAccessToken: string
  payload: {
    givenName?: string
    familyName?: string
    companyName?: string
  }
}

export interface RequestSecondaryMFAPhonePayload {
  accountUuid: string
  phoneId: string
  cssAPIAccountAccessToken: string
  payload: {
    givenName?: string
    familyName?: string
    companyName?: string
  }
}

export interface RequestAddNewEmailPayload {
  accountUuid: string
  cssAPIAccountAccessToken: string
  payload: {
    givenName?: string
    familyName?: string
    companyName?: string
    emailAddress: string
  }
}

export interface RequestUpdateEmailPayload {
  accountUuid: string
  cssAPIAccountAccessToken: string
  emailAddressId: string
  payload: {
    givenName?: string
    familyName?: string
    companyName?: string
    emailAddress: string
  }
}

export interface ValidatePrimaryMFAPayload {
  grantToken: string
  mfaCode: number
}

type ValidateSecondaryMFAPayloadEmail = {
  accountUuid: string
  cssAPIAccountAccessToken: string
  emailAddressId: string
  payload: {
    tokenForVerification: string
    verificationPin: string
  }
}
type ValidateSecondaryMFAPayloadPhone = {
  accountUuid: string
  cssAPIAccountAccessToken: string
  phoneId: string
  payload: {
    tokenForVerification: string
    verificationPin: string
  }
}

export type ValidateSecondaryMFAPayload =
  | ValidateSecondaryMFAPayloadEmail
  | ValidateSecondaryMFAPayloadPhone
export type SearchEmailOrMobilePayload = SearchEmailPayload | SearchPhonePayload

export type SearchEmailPayload = {
  emailId: string
}

export type SearchPhonePayload = {
  contactTelephoneNumber: {
    contactTelephoneNumber: string
    primaryContactTelephoneOnly: boolean
  }
}
