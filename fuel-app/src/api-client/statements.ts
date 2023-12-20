import axios from 'axios'

const statementAPIs = (getBaseURL: () => string) => ({
  getStatementHistory: (accountId: string) => {
    return axios.get(`${getBaseURL()}/api/accounts/${accountId}/statements`)
  },
  getPastBillsAlerts: (accountId: string) => {
    return axios.get(
      `${getBaseURL()}/api/accounts/${accountId}/alerts/bills-past`,
    )
  },
  getPastBillsBanners: (accountId: string) => {
    return axios.get(
      `${getBaseURL()}/api/accounts/${accountId}/banners/bills-past`,
    )
  },
  getStatementsCompareSelectAlerts: (accountId: string) => {
    return axios.get(
      `${getBaseURL()}/api/accounts/${accountId}/alerts/statements-compare-select`,
    )
  },
  getStatementsCompareSelectBanners: (accountId: string) => {
    return axios.get(
      `${getBaseURL()}/api/accounts/${accountId}/banners/statements-compare-select`,
    )
  },
  /**
   *
   * @param accountId - the id of the account for which the statements to be fetched
   * @param date - the billing date in YYYY-MM-DD format
   * @returns
   */
  getStatementByDate: (accountId: string, date: string) => {
    return axios.get(
      `${getBaseURL()}/api/accounts/${accountId}/statements/${date}`,
    )
  },
  getCurrentStatement: (accountId: string) => {
    return axios.get(
      `${getBaseURL()}/api/accounts/${accountId}/statements/current`,
    )
  },
  getBillsAlerts: (accountId: string) => {
    return axios.get(`${getBaseURL()}/api/accounts/${accountId}/alerts/bills`)
  },
  getBillsBanners: (accountId: string) => {
    return axios.get(`${getBaseURL()}/api/accounts/${accountId}/banners/bills`)
  },
  downloadStatments: (accountId: string, data: any) => {
    return axios.post(
      `${getBaseURL()}/api/accounts/${accountId}/statements/download`,
      data,
      {
        responseType: 'blob',
      },
    )
  },
})

export default statementAPIs
