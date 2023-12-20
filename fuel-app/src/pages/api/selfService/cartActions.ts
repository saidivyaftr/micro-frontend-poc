import type { NextApiRequest, NextApiResponse } from 'next'
import fetcher from '../fetcherWithAuthToken'
import { apiErrorLogger } from 'src/utils/adobe/api-error-logger'
import { decryptPayload } from 'src/utils/secure'

export default async function cartActions(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== 'PUT') {
      const notAllowed = { statusCode: 405, message: 'Method Not Allowed' }
      return res.end(JSON.stringify(notAllowed || {}))
    }
    const endpoint = `ecomm-resi-acquisition/v5/servicecases/cart`
    const payload = decryptPayload(req.body.d)

    const response = await fetcher.put(endpoint, payload.body, {
      cookie: req.headers.cookie,
      sourceId: req.headers.sourceid,
    })
    return res.status(200).json(response?.data ?? {})
  } catch (error: any) {
    apiErrorLogger(error, 'self-service-cartActions')
    return res
      .status(error?.statusCode || error?.response?.status || 500)
      .json(error?.response?.data)
  }
}
