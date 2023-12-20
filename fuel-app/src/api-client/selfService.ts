import axios from 'axios'
import { encryptPayload } from 'src/utils/secure'

const selfServiceAPIs = (getBaseURL: () => string) => ({
  validateToken: (authToken: string) => {
    try {
      return axios.get(`${getBaseURL()}/api/selfService/validateToken`, {
        headers: {
          authtoken: authToken,
        },
      })
    } catch (error) {
      return error
    }
  },
  getOffersSelfService: (
    accountBtn: string,
    icaseId: string,
    sourceId: string,
  ) => {
    try {
      const payload = encryptPayload({
        icaseId: icaseId,
        accountBtn: accountBtn,
        sourceId: parseInt(sourceId),
      })

      return axios.get(`${getBaseURL()}/api/selfService/getOffers`, {
        headers: {
          d: payload,
        },
      })
    } catch (error) {
      return error
    }
  },
  updateCartSelfService: (payload: any) => {
    try {
      return axios.put(
        `${getBaseURL()}/api/selfService/cartActions`,
        { d: encryptPayload(payload) },
        { headers: { sourceId: parseInt(payload.sourceId) } },
      )
    } catch (error) {
      return error
    }
  },
  placeOrderSelfService: (payload: any) => {
    try {
      return axios.post(
        `${getBaseURL()}/api/selfService/placeOrder`,
        { d: encryptPayload(payload) },
        {
          headers: { sourceId: parseInt(payload.sourceId) },
        },
      )
    } catch (error) {
      return error
    }
  },
})

export default selfServiceAPIs
