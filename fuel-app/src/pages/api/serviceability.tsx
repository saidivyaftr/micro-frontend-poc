import type { NextApiRequest, NextApiResponse } from 'next'
import fetcher from './fetcherWithAuthToken'
import { apiErrorLogger } from 'src/utils/adobe/api-error-logger'

const checkForServiceability = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const { env, controlNumber } = req.query
    const endpoint = `ecomm-resi-campaign/v1/serviceability?includeQuote=true&env=${env}&controlNumber=${controlNumber}`
    const details = await fetcher.get(endpoint, {
      'campaign-id': 'fiber_expansion',
    })
    return res.status(details.status).json(details?.data || {})
  } catch (error: any) {
    apiErrorLogger(error, 'check-servicability')
    return res.status(500).json(error?.response?.data || {})
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return checkForServiceability(req, res)
}
