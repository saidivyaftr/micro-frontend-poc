import axios from 'axios'

const boboAPIs = (getBaseURL: () => string) => ({
  /**
   *
   * @param accountUuid - the id of the account for which the statements to be fetched
   * @param payload - any
   * @returns
   */
  getOffers: (accountUuid: string, payload: any) => {
    return axios.post(`${getBaseURL()}/api/bobo/offers/${accountUuid}`, {
      headers: {
        customerBearerToken: payload.customerBearerToken,
      },
      body: {
        order: payload.order,
        vendor: payload.vendor,
      },
    })
  },
  activateSubscription: (subscriptionid: string, payload: any) => {
    return axios.post(
      `${getBaseURL()}/api/bobo/subscription/${subscriptionid}/activate`,
      {
        headers: {
          customerBearerToken: payload.customerBearerToken,
        },
      },
    )
  },
  cancelSubscription: (subscriptionid: string) => {
    return axios.delete(
      `${getBaseURL()}/api/bobo/subscription/${subscriptionid}/delete`,
      {
        headers: {},
      },
    )
  },
})

export default boboAPIs
