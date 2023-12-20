import axios from 'axios'
import { encryptPayload } from 'src/utils/secure'

type PayloadType = {
  uuid: string | undefined
  emailId?: string | undefined //updateEmail
  emailAddress?: string | undefined //addEmail + updateEmail
  phoneId?: string | undefined //updatePhone
  phoneNumber?: string | undefined //addPhone +updatePhone
  givenName?: string | undefined
  familyName?: string | undefined
  isPrimary?: true | undefined
}

type CompleteType = {
  uuid: string | undefined
  tokenForVerification: string | undefined
  verificationPin: string | undefined
}

type SkipType = {
  uuid: string | undefined
  phoneId?: string | undefined
  emailId?: string | undefined
}

const contactVerificationAPIs = (getBaseURL: () => string) => ({
  //Get verification status
  getVerificationStatus: (payload: any) => {
    try {
      return axios.get(`${getBaseURL()}/api/contact/verification/status`, {
        headers: {
          d: encryptPayload(payload),
        },
      })
    } catch (error: any) {
      return error
    }
  },
  //Get all phoneNumbers on account
  getAccountPhones: (payload: any) => {
    try {
      return axios.get(`${getBaseURL()}/api/contact/phone/get`, {
        headers: {
          d: encryptPayload(payload),
        },
      })
    } catch (error: any) {
      return error
    }
  },
  //Get all Email on account
  getEmailAccountEmails: (payload: any) => {
    try {
      return axios.get(`${getBaseURL()}/api/contact/email/get`, {
        headers: {
          d: encryptPayload(payload),
        },
      })
    } catch (error: any) {
      return error
    }
  },

  //Add new phoneNumber
  addPhoneNumberAuthorized: (payload: PayloadType) => {
    try {
      return axios.post(
        `${getBaseURL()}/api/contact/phone/add`,
        { d: encryptPayload(payload) },
        { headers: {} },
      )
    } catch (error: any) {
      return error
    }
  },

  //Update and replace phoneNumber with new number
  updatePhoneNumberAuthorized: (payload: PayloadType) => {
    try {
      return axios.put(
        `${getBaseURL()}/api/contact/phone/update`,
        { d: encryptPayload(payload) },
        { headers: {} },
      )
    } catch (error: any) {
      return error
    }
  },

  //Delete phoneNumber
  deletePhoneNumberAuthorized: (payload: PayloadType) => {
    try {
      return axios.delete(`${getBaseURL()}/api/contact/phone/delete`, {
        headers: { d: encryptPayload(payload) },
      })
    } catch (error: any) {
      return error
    }
  },

  //Send OTP to phoneNumber via phoneId
  verifyPhoneNumberAuthorized: (payload: PayloadType) => {
    try {
      return axios.post(
        `${getBaseURL()}/api/contact/phone/verify`,
        { d: encryptPayload(payload) },
        { headers: {} },
      )
    } catch (error: any) {
      return error
    }
  },

  //Add new email
  addEmailAuthorized: (payload: PayloadType) => {
    try {
      return axios.post(
        `${getBaseURL()}/api/contact/email/add`,
        { d: encryptPayload(payload) },
        { headers: {} },
      )
    } catch (error: any) {
      return error
    }
  },

  //Update and replace email with new email
  updateEmailAuthorized: (payload: PayloadType) => {
    try {
      return axios.put(
        `${getBaseURL()}/api/contact/email/update`,
        { d: encryptPayload(payload) },
        { headers: {} },
      )
    } catch (error: any) {
      return error
    }
  },

  //Send OTP to email via emailId
  verifyEmail: (payload: PayloadType) => {
    try {
      return axios.post(
        `${getBaseURL()}/api/contact/email/verify`,
        { d: encryptPayload(payload) },
        { headers: {} },
      )
    } catch (error: any) {
      return error
    }
  },

  //Complete verification with OTP and tokenForVerification
  completeVerification: async (payload: CompleteType) => {
    try {
      const response = await axios.post(
        `${getBaseURL()}/api/contact/verification/complete`,
        { d: encryptPayload(payload) },
        { headers: {} },
      )
      return response
    } catch (error: any) {
      return {
        status: error.response.status,
        data: error.response.data,
      }
    }
  },

  skipPhone: (payload: SkipType) => {
    try {
      return axios.post(
        `${getBaseURL()}/api/contact/phone/skip`,
        { d: encryptPayload(payload) },
        { headers: {} },
      )
    } catch (error: any) {
      return error
    }
  },

  skipEmail: (payload: SkipType) => {
    try {
      return axios.post(
        `${getBaseURL()}/api/contact/email/skip`,
        { d: encryptPayload(payload) },
        { headers: {} },
      )
    } catch (error: any) {
      return error
    }
  },
})

export default contactVerificationAPIs
