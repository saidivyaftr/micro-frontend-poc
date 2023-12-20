import type { NextApiRequest, NextApiResponse } from 'next'
import fetcher from '../fetcherWithAuthToken'
import { apiErrorLogger } from 'src/utils/adobe/api-error-logger'
import { decryptPayload } from 'src/utils/secure'

export default async function placeOrder(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== 'POST') {
      const notAllowed = { statusCode: 405, message: 'Method Not Allowed' }
      return res.end(JSON.stringify(notAllowed || {}))
    }
    const endpoint = 'ecomm-resi-acquisition/v5/servicecases/placeorder'
    const payload = decryptPayload(req.body.d)
    const response = await fetcher.post(endpoint, [...payload.body], {
      cookie: req.headers.cookie,
      sourceId: req.headers.sourceid,
    })
    return res.status(200).json(response?.data ?? {})
  } catch (error: any) {
    apiErrorLogger(error, 'self-service-placeOrder')
    return res
      .status(error?.statusCode || error?.response?.status || 500)
      .json(error?.response?.data)
  }
}
