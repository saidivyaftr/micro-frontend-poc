import axios from 'axios'
import { axiosWithCache } from './CacheClient'
import { encryptPayload } from 'src/utils/secure'
import { DiscoverAuthenticate, UpdateVacationPayload } from './types'

type uuidType = {
  accountUuid: string
}

type getAccountsType = {
  fetchNewToken: boolean | undefined
}

type btnType = {
  btn: string
}

const accountAPIs = (getBaseURL: () => string) => ({
  getAccountsDigital: (payload?: getAccountsType, forceFetch = false) => {
    try {
      return axiosWithCache(
        `${getBaseURL()}/api/accounts/get`,
        {
          headers: {
            d: encryptPayload(payload),
          },
        },
        forceFetch,
      )
    } catch (error: any) {
      return error
    }
  },
  //Get account summary by accountUuid
  getAccountSummary: (payload?: uuidType) => {
    try {
      return axios.get(`${getBaseURL()}/api/account/get`, {
        headers: {
          d: encryptPayload(payload),
        },
      })
    } catch (error: any) {
      return error
    }
  },
  //Get active services by accountUuid
  getActiveServices: (payload: uuidType) => {
    try {
      return axios.get(`${getBaseURL()}/api/account/services`, {
        headers: {
          d: encryptPayload(payload),
        },
      })
    } catch (error: any) {
      return error
    }
  },
  getDiscoverIdentity: (accountNumber: string) => {
    return axios.post(`${getBaseURL()}/api/accounts/discoverIdentity`, {
      apiNumber: 1,
      accountNumber,
    })
  },
  discoverAuthenticate: (body: DiscoverAuthenticate) => {
    return axios.post(`${getBaseURL()}/api/accounts/discoverAuthenticate`, body)
  },
  generateICaseId: async (payload: btnType) => {
    try {
      const response = await axios.post(`${getBaseURL()}/api/interactions`, {
        d: encryptPayload(payload),
      })
      return response
    } catch (error) {
      return error
    }
  },
  getVacationServices: (uuid: string) => {
    try {
      return axiosWithCache(
        `${getBaseURL()}/api/accounts/${uuid}/vacation-services`,
      )
    } catch (error: any) {
      return error
    }
  },
  updateVacationServices: (uuid: string, payload: UpdateVacationPayload) => {
    try {
      return axios.put(
        `${getBaseURL()}/api/accounts/${uuid}/vacation-services`,
        payload,
      )
    } catch (error: any) {
      return error
    }
  },
  getBillingSummary: (uuid: string, payload: any) => {
    try {
      return axios.post(
        `${getBaseURL()}/api/accounts/${uuid}/billing-summary`,
        payload,
      )
    } catch (error: any) {
      return error
    }
  },
})

export default accountAPIs
