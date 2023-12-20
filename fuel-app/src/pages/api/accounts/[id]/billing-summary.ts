import type { NextApiRequest, NextApiResponse } from 'next'
import fetcher from 'src/pages/api/fetcherWithJWT'
import { apiErrorLogger } from 'src/utils/adobe/api-error-logger'
const getBillingSummary = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id: accountUuid } = req.query
    const { environmentCode, orderNumber, status } = req.body
    if (req.method !== 'POST') {
      const notAllowed = { statusCode: 405, message: 'Method Not Allowed' }
      return res.end(JSON.stringify(notAllowed || {}))
    }
    const endpoint = `myfrontier/v3/accounts/${accountUuid}/bill/billing-summary?orderNumber=${orderNumber}&environmentCode=${environmentCode}&status=${status}&applicationId=digital-api`
    const response = await fetcher.get(endpoint, {
      cookie: req.headers.cookie,
      ctx: res,
    })
    return res.status(200).json(response.data)
  } catch (error: any) {
    apiErrorLogger(error, 'billing-summary')
    return res
      .status(error?.statusCode || error?.response?.status || 500)
      .json(error?.response?.data)
  }
}

export default getBillingSummary
