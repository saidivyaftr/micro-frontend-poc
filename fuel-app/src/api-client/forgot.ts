import axios from 'axios'
import { encryptPayload } from 'src/utils/secure'

type EmailType = {
  email: string | undefined
}
interface ServiceAddressType {
  controlNumber?: string
  environment?: string
}

type RecoverIdType = {
  lastName?: string
  serviceAddress?: ServiceAddressType
  email?: string
}

type ResetType = {
  encryptedAccountInfo: string | undefined
  password: string | undefined
}
//TODO
const forgotAPIs = (getBaseURL: () => string) => ({
  //send password reset email
  forgotPassword: (payload: EmailType) => {
    try {
      return axios.post(
        `${getBaseURL()}/api/forgot/password`,
        { d: encryptPayload(payload) },
        { headers: {} },
      )
    } catch (error: any) {
      return error
    }
  },

  //reset password with new password (legacy)
  resetPassword: (payload: ResetType) => {
    try {
      return axios.put(
        `${getBaseURL()}/api/forgot/password/reset`,
        { d: encryptPayload(payload) },
        { headers: {} },
      )
    } catch (error: any) {
      return error
    }
  },
  //recover signin Id
  recoverIdEmail: (payload: RecoverIdType) => {
    try {
      return axios.post(
        `${getBaseURL()}/api/forgot/id`,
        { d: encryptPayload(payload) },
        { headers: {} },
      )
    } catch (error: any) {
      return error
    }
  },

  //send id to email
  forgotID: (payload: EmailType) => {
    try {
      return axios.post(
        `${getBaseURL()}/api/forgot/id/send`,
        { d: encryptPayload(payload) },
        { headers: {} },
      )
    } catch (error: any) {
      return error
    }
  },
  validateReCaptchaForForgotId: (payload: any) => {
    try {
      return axios.post(
        `${getBaseURL()}/api/forgot/id/reCaptchaValidation`,
        { d: encryptPayload(payload) },
        { headers: {} },
      )
    } catch (error: any) {
      return error
    }
  },
})

export default forgotAPIs
