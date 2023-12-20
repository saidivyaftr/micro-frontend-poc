import type { NextApiRequest, NextApiResponse } from 'next'
import fetcher from './fetcherWithAuthToken'
import { apiErrorLogger } from 'src/utils/adobe/api-error-logger'

const ACPForm = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const endpoint = `ecomm-resi-campaign/v1/ebb-enrollment`
    const headers = {
      'requesting-application': req.headers['requesting-application'],
    }
    const response = await fetcher.post(endpoint, req.body, headers, false)
    return res.status(200).json(response?.data ?? {})
  } catch (error: any) {
    apiErrorLogger(error, 'acp-form')
    res
      .status(error?.statusCode || error?.response?.status || 500)
      .json(error?.response?.data)
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return ACPForm(req, res)
}
