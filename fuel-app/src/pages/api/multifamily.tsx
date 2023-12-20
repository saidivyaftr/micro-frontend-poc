import type { NextApiRequest, NextApiResponse } from 'next'
import fetcher from './fetcherWithAuthToken'
import { apiErrorLogger } from 'src/utils/adobe/api-error-logger'

const multifamilyForm = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const endpoint = `ecomm-resi-campaign/v1/multi-family-campaign`
    const response = await fetcher.post(endpoint, req.body, {}, false)
    return res.status(200).json(response?.data || {})
  } catch (error: any) {
    apiErrorLogger(error, 'multi-family-form')
    res
      .status(error?.httpStatusCode || error?.response?.status || 500)
      .json(error?.response?.data)
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return multifamilyForm(req, res)
}
