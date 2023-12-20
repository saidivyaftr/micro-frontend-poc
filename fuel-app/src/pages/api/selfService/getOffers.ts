import type { NextApiRequest, NextApiResponse } from 'next'
import fetcher from '../fetcherWithAuthToken'
import { apiErrorLogger } from 'src/utils/adobe/api-error-logger'
import { decryptPayload } from 'src/utils/secure'

export default async function getOffers(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== 'GET') {
      const notAllowed = { statusCode: 405, message: 'Method Not Allowed' }
      return res.end(JSON.stringify(notAllowed || {}))
    }
    const payloadStr = req.headers.d || ''
    const { accountBtn, icaseId, sourceId } = decryptPayload(payloadStr)
    const endpoint = `ecomm-resi-acquisition/v5/offers/${accountBtn}?icaseId=${icaseId}`

    const response = await fetcher.get(endpoint, {
      cookie: req.headers.cookie,
      sourceId: sourceId,
    })
    return res.status(200).json(response?.data ?? {})
  } catch (error: any) {
    apiErrorLogger(error, 'self-service-getOffers')
    return res
      .status(error?.statusCode || error?.response?.status || 500)
      .json(error?.response?.data)
  }
}
