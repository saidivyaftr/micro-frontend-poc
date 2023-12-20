import axios from 'axios'
import { axiosWithCache } from './CacheClient'
import getConfig from 'next/config'
import paymentAPIs from './payments'
import statementAPIs from './statements'
import profileAPIs from './profile'
import { registerAPI } from './registerAPI'
const config = getConfig()
import boboAPIs from './bobo'
import serviceOrdersAPIs from './service-orders'
import selfServiceAPIs from './selfService'
import contactVerificationAPIs from './contact-verification'
import accountAPIs from './account'
import forgotAPIs from './forgot'
import { EQUIPMENT_PAYLOAD } from 'src/libs/returns/ReturnsReview'

const publicRuntimeConfig = config?.publicRuntimeConfig

// Returns BASE URL based upon the env
export const getBaseURL = () => {
  const origin = window.location.origin
  const allowedHosts = ['localhost.frontier.com:3000']
  const nextBasePath =
    publicRuntimeConfig?.basePath?.replace(/\/+/g, '/') || 'pages'
  if (!origin) {
    return 'https://www.frontier.com/' + nextBasePath
  }
  if (process.env.NODE_ENV === 'production') {
    return origin.includes(nextBasePath)
      ? trimOrigin(origin)
      : origin + nextBasePath
  }
  if (allowedHosts.includes(window.location.host)) {
    return `${origin}/${nextBasePath.replace(/\/+/g, '')}`
  }
  return 'http://localhost:3000/' + nextBasePath.replace(/\/+/g, '')
}

const trimOrigin = (url = '') => {
  if (url && url[url.length - 1] === '/') {
    return url.slice(0, -1)
  }
  return url
}

// API client methods
const client = {
  // Importing other methods
  ...registerAPI,
  ...boboAPIs(getBaseURL),
  ...serviceOrdersAPIs(getBaseURL),
  ...selfServiceAPIs(getBaseURL),
  ...contactVerificationAPIs(getBaseURL),
  ...accountAPIs(getBaseURL),
  ...forgotAPIs(getBaseURL),

  // Universal methods
  profile: () => {
    return axios.get(`${getBaseURL()}/api/profile`)
  },
  session: () => {
    return axios.get(`${getBaseURL()}/api/session`)
  },
  postSession: (data: any) => {
    return axios.post(`${getBaseURL()}/api/session`, data)
  },
  getAddressDetails: (environment: string, controlNumber: string) => {
    return axios.get(
      `${getBaseURL()}/api/address?environment=${environment}&controlNumber=${controlNumber}`,
    )
  },
  getPredictiveSuggestions: (address: string, inFootPrint = false) => {
    return axios.get(
      `${getBaseURL()}/api/address-search?address=${address}&inFootPrint=${inFootPrint}`,
    )
  },
  serviceabilityCheck: (env: string, controlNumber: string) => {
    return axios.get(
      `${getBaseURL()}/api/serviceability?env=${env}&controlNumber=${controlNumber}`,
    )
  },
  chatAPI: () => {
    console.log('step3::::')
    // return axios.post(
    //   `${getBaseURL()}/api/chatAPI`,
    // )

    return axios.post(`${getBaseURL()}/api/chatAPI`, {})
  },
  keepAlive: () => {
    return axios.head(`${getBaseURL}/api/keepAlive`)
  },
  submitACPForm: (data: any) => {
    return axios({
      url: `${getBaseURL()}/api/acp-form`,
      method: 'POST',
      data,
      headers: {
        'requesting-application': 'ResiEcomm',
      },
    })
  },
  certifyInternetUsage: (data: any) => {
    return axios({
      url: `${getBaseURL()}/api/certify-internet-usage`,
      method: 'PUT',
      data,
      headers: {
        'requesting-application': 'ResiEcomm',
      },
    })
  },
  getUserTosStatuses: (accountUuid: string) => {
    return axios({
      url: `${getBaseURL()}/api/user-tos-status?uuid=${accountUuid}`,
      method: 'GET',
      headers: {
        'requesting-application': 'ResiEcomm',
      },
    })
  },
  updateTosStatus: (accountUuid: any, data: any) => {
    return axios({
      url: `${getBaseURL()}/api/update-tos-status?uuid=${accountUuid}`,
      method: 'PUT',
      data,
      headers: {
        'requesting-application': 'ResiEcomm',
      },
    })
  },
  login: (data: any) => {
    return axios({
      url: `${getBaseURL()}/api/login`,
      method: 'POST',
      data,
    })
  },
  checkOutages: (phone: string) => {
    return axios.get(`${getBaseURL()}/api/checkoutages?phone=${phone}`)
  },
  ...statementAPIs(getBaseURL),
  ...paymentAPIs(getBaseURL),
  ...profileAPIs(getBaseURL),
  createPegaInteraction: (payload: any) => {
    return axios.post(`${getBaseURL()}/api/pega`, payload)
  },
  ccpaSignIn: (payload: any) => {
    return axios.post(`${getBaseURL()}/api/ccpa/signin`, payload)
  },
  ccpaReview: (token: any) => {
    return axios.post(`${getBaseURL()}/api/ccpa/review-request`, { token })
  },
  ccpaDelete: (token: any) => {
    return axios.post(`${getBaseURL()}/api/ccpa/delete-request`, { token })
  },
  ccpaReviewDelete: (token: any) => {
    return axios.post(`${getBaseURL()}/api/ccpa/review-and-delete-request`, {
      token,
    })
  },
  postPaperlessBillPreference: (accountId: string, payload: any) => {
    return axios.post(
      `${getBaseURL()}/api/accounts/${accountId}/paperlessBilling`,
      payload,
    )
  },
  postEvent: (payload: any) => {
    return axios.post(`${getBaseURL()}/api/postevent`, payload)
  },
  serviceabilityUpdatedCheck: (env: string, controlNumber: string) => {
    return axios.get(
      `${getBaseURL()}/api/serviceabilityUpdated?env=${env}&controlNumber=${controlNumber}`,
    )
  },
  getAccounts: (forceFetch = false) => {
    return axiosWithCache(`${getBaseURL()}/api/accounts`, undefined, forceFetch)
  },
  getConstantsByLang: (language: string, serviceType: string) => {
    return axios.get(`${getBaseURL()}api/constants/${language}/${serviceType}`)
  },
  getProducts: (accountId: string, detailType: string) => {
    return axios.get(
      `${getBaseURL()}/api/accounts/${accountId}/products/${detailType}`,
    )
  },
  carrierFreeze: (payload: any) => {
    return axios.post(`${getBaseURL()}/api/ploc_opt_out`, payload)
  },
  tpVerify: (payload: any) => {
    return axios.post(
      `${getBaseURL()}/api/serviceOrders/verificationSearch`,
      payload,
    )
  },
  cpniPost: (payload: any) => {
    return axios.post(`${getBaseURL()}/api/cpni_opt_out`, payload)
  },
  tpvOrderConfirmation: (payload: any, serviceId: string) => {
    return axios.post(
      `${getBaseURL()}/api/serviceOrders/${serviceId}/confirmationOrder`,
      payload,
    )
  },
  getOutages: () => {
    return axios.get(`${getBaseURL()}/api/outages`)
  },
  getDisaster: () => {
    return axios.get(`${getBaseURL()}/api/disasters`)
  },
  getServiceOutages: () => {
    return axios.get(`${getBaseURL()}/api/serviceOutages`)
  },
  quickLinksMetaData: () => {
    return axios.get(`${getBaseURL()}/api/quickLinks-metadata`)
  },
  getVoicemail: () => {
    return axios.get(`${getBaseURL()}/api/accessnumber/voicemail`)
  },
  getNotifications: (accountId: string) => {
    return axios.get(
      `${getBaseURL()}/api/accounts/${accountId}/notification-preferences`,
    )
  },
  getCCPAReviews: (accountId: string) => {
    return axios.get(`${getBaseURL()}/api/accounts/${accountId}/ccpa/reviews`)
  },
  postNotificationSettings: (accountId: string, payload: any) => {
    return axios.post(
      `${getBaseURL()}/api/accounts/${accountId}/notification-preferences`,
      payload,
    )
  },
  updateNotification: (accountId: string, payload: any) => {
    return axios.patch(
      `${getBaseURL()}/api/accounts/${accountId}/notification-preferences`,
      payload,
    )
  },
  getIspEmails: (serviceId: string) => {
    return axios.get(
      `${getBaseURL()}/api/services/${serviceId}/isp/emailAccounts`,
    )
  },
  multifamily: (payload: any) => {
    return axios.post(`${getBaseURL()}/api/multifamily`, payload)
  },
  logout: () => {
    return axios.post(`${getBaseURL()}/api/logout`, {})
  },
  getServicesCached: (
    includeDetails?: boolean,
    ignoreAuthErrors?: boolean,
    forceFetch?: boolean,
  ) => {
    const ignoreAuthErrorsParams = ignoreAuthErrors
      ? { ignoreAuthErrors }
      : undefined
    const includeDetailsParams = includeDetails ? { includeDetails } : undefined
    return axiosWithCache(
      `${getBaseURL()}/api/services`,
      {
        params: {
          ...ignoreAuthErrorsParams,
          ...includeDetailsParams,
        },
      },
      forceFetch,
    )
  },
  getServices: (includeDetails?: boolean, ignoreAuthErrors?: boolean) => {
    const ignoreAuthErrorsParams = ignoreAuthErrors
      ? { ignoreAuthErrors }
      : undefined
    const includeDetailsParams = includeDetails ? { includeDetails } : undefined
    return axios.get(`${getBaseURL()}/api/services`, {
      params: {
        ...ignoreAuthErrorsParams,
        ...includeDetailsParams,
      },
    })
  },
  getUPSReturns: (token?: string) => {
    const tokenParams = token ? { token } : undefined
    return axios.get(`${getBaseURL()}/api/upsReturns`, {
      params: {
        ...tokenParams,
      },
    })
  },

  getAccountDetails: (accountId: string) => {
    return axios.get(`${getBaseURL()}/api/accounts/${accountId}`)
  },
  getEquipments: (accountId: string, payload: any) => {
    return axios.post(
      `${getBaseURL()}/api/accounts/${accountId}/equipments`,
      payload,
    )
  },
  changePassword: (oldPassword: string, newPassword: string) => {
    return axios.post(`${getBaseURL()}/api/profile`, {
      changePassword: true,
      oldPassword,
      newPassword,
    })
  },
  changeProfileEmail: (email: string) => {
    return axios.post(`${getBaseURL()}/api/profile`, {
      changeProfileEmail: true,
      email,
    })
  },
  equipmentsFindGet: (guestId: string) => {
    return axios.get(
      `${getBaseURL()}/api/services/${guestId}/returnEquipmentMailerOrders`,
    )
  },
  equipmentsFindPost: (guestId: string, payload: EQUIPMENT_PAYLOAD) => {
    return axios.post(
      `${getBaseURL()}/api/services/${guestId}/returnEquipmentMailerOrders`,
      payload,
    )
  },
  getCompleteRegistration: (token: string) => {
    return axios.get(`${getBaseURL()}/api/legacy/completeRegistration/${token}`)
  },
  postCompleteRegistration: (token: string, payload: any) => {
    return axios.post(
      `${getBaseURL()}/api/legacy/completeRegistration/${token}`,
      payload,
    )
  },
  resendRegistrationEmail: (payload: any) => {
    return axios.post(
      `${getBaseURL()}/api/legacy/resendRegistrationEmail`,
      payload,
    )
  },
  getChatAccessCode: () =>
    axiosWithCache(`${getBaseURL()}/api/authorizationcode`),
}
export default client
