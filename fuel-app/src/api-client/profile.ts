import axios from 'axios'
import {
  UpdatePasscodePayload,
  UpdatePasswordPayload,
  UpdateProfileEmailPayload,
} from './types'

const profileAPIs = (getBaseURL: () => string) => ({
  updatePasscode: (accountId: string, data: UpdatePasscodePayload) => {
    return axios.put(`${getBaseURL()}/api/accounts/${accountId}/pin`, data)
  },
  createPasscode: (accountId: string, data: UpdatePasscodePayload) => {
    return axios.post(`${getBaseURL()}/api/accounts/${accountId}/pin`, data)
  },
  updateBillingAddress: (accountId: string, payload: any) => {
    return axios.patch(
      `${getBaseURL()}/api/accounts/${accountId}/billingAddress`,
      payload,
    )
  },
  getPhoneNumbers: (accountId: string) => {
    return axios.get(
      `${getBaseURL()}/api/accounts/${accountId}/profile/phone-numbers`,
    )
  },
  verifyPhoneNumber: (accountId: string, data: any) => {
    return axios.patch(
      `${getBaseURL()}/api/accounts/${accountId}/profile/verify-contact`,
      data,
    )
  },
  removePhoneNumber: (accountId: string, phoneId: any) => {
    return axios.delete(
      `${getBaseURL()}/api/accounts/${accountId}/profile/phone-numbers/?phoneId=${phoneId}`,
    )
  },
  addPhoneNumber: (accountId: string, data: any) => {
    return axios.post(
      `${getBaseURL()}/api/accounts/${accountId}/profile/phone-numbers`,
      data,
    )
  },
  makePhonePrimary: (accountId: string, data: any, phoneId: number) => {
    return axios.patch(
      `${getBaseURL()}/api/accounts/${accountId}/profile/phone-numbers?phoneId=${phoneId}`,
      data,
    )
  },

  getEmailAddresses: (accountId: string) => {
    return axios.get(
      `${getBaseURL()}/api/accounts/${accountId}/profile/email-addresses`,
    )
  },
  verifyEmailAddresses: (accountId: string, data: any) => {
    return axios.patch(
      `${getBaseURL()}/api/accounts/${accountId}/profile/verify-contact`,
      data,
    )
  },
  removeEmailAddresses: (accountId: string, emailId: string) => {
    return axios.delete(
      `${getBaseURL()}/api/accounts/${accountId}/profile/email-addresses?emailId=${emailId}`,
    )
  },
  makeEmailAddressesPrimary: (
    accountId: string,
    data: any,
    emailId: string,
  ) => {
    return axios.patch(
      `${getBaseURL()}/api/accounts/${accountId}/profile/email-addresses?emailId=${emailId}`,
      data,
    )
  },
  updateProfileEmail: (data: UpdateProfileEmailPayload) => {
    return axios.post(`${getBaseURL()}/api/profile`, data)
  },
  updateProfilePassword: (data: UpdatePasswordPayload) => {
    return axios.post(`${getBaseURL()}/api/profile`, data)
  },
  updateAccountDetails: (accountID: string, data: any) => {
    return axios.post(`${getBaseURL()}/api/accounts/${accountID}`, data)
  },
})

export default profileAPIs
