import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { apiErrorLogger } from 'src/utils/adobe/api-error-logger'

const DOTCOM_URL = process.env.DOTCOM_URL || ''

const handleCCPASignin = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const details = await axios.post(`${DOTCOM_URL}api/ccpa/signin`, req.body, {
      headers: { cookie: req.headers.cookie },
    })
    return res.status(200).json(details?.data || {})
  } catch (error: any) {
    apiErrorLogger(error, 'predictive-service')
    res.status(error?.statusCode || error?.response?.status || 500).json(error)
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return handleCCPASignin(req, res)
}
