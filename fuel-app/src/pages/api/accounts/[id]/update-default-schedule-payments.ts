import type { NextApiRequest, NextApiResponse } from 'next'
import fetcher from 'src/pages/api/fetcherWithJWT'
import { apiErrorLogger } from 'src/utils/adobe/api-error-logger'

export default async function updateDefaultScheduledPayments(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { id } = req.query
    const endpoint = `myfrontier/v3/accounts/${id}/payments/scheduled/paymentMethod`
    const response = await fetcher.patch(endpoint, req.body, {
      cookie: req.headers.cookie,
      ctx: res,
    })
    return res.status(200).json(response?.data ?? {})
  } catch (error: any) {
    apiErrorLogger(error, 'updateDefaultScheduledPayments')
    return res
      .status(error?.statusCode || error?.response?.status || 500)
      .json(error?.response?.data)
  }
}
