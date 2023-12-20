import type { NextApiRequest, NextApiResponse } from 'next'
import fetcher from 'src/pages/api/fetcherWithJWT'
import { apiErrorLogger } from 'src/utils/adobe/api-error-logger'

export default async function getAccountOrdersTickets(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== 'GET') {
      const notAllowed = { statusCode: 405, message: 'Method Not Allowed' }
      return res.end(JSON.stringify(notAllowed || {}))
    }
    const { id: uuid } = req.query

    const endpoint = `myfrontier/v2/accounts/${uuid}/status?wimt`
    const response = await fetcher.get(endpoint, {
      cookie: req.headers.cookie,
      ctx: res,
    })
    return res.status(200).json(response?.data?.Events ?? [])
  } catch (error: any) {
    apiErrorLogger(error, 'accountdashboard-orders-tickets')
    return res
      .status(error?.statusCode || error?.response?.status || 500)
      .json(error?.response?.data)
  }
}
