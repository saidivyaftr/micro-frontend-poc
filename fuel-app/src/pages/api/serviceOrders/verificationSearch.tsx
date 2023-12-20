import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { apiErrorLogger } from 'src/utils/adobe/api-error-logger'

const DOTCOM_URL = process.env.DOTCOM_URL || ''

const handleOrderVerification = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const details = await axios.post(
      `${DOTCOM_URL}api/serviceOrders/verificationSearch`,
      req.body,
      { headers: { cookie: req.headers.cookie } },
    )
    const setCookies = details?.headers?.['set-cookie']
    await res.writeHead(200, { 'Set-Cookie': setCookies })
    res.end(JSON.stringify(details?.data || {}))
  } catch (error: any) {
    apiErrorLogger(error, 'predictive-service')
    res.status(error?.statusCode || error?.response?.status || 500).json(error)
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return handleOrderVerification(req, res)
}
