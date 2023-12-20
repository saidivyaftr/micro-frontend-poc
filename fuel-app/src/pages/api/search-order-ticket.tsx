/* eslint-disable @typescript-eslint/indent */
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { apiErrorLogger } from 'src/utils/adobe/api-error-logger'
const DOTCOM_URL = process.env.APIGEE_BASE_URL || ''
export default async function SearchOrderTicket(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    const notAllowed = { statusCode: 405, message: 'Method Not Allowed' }
    return res.end(JSON.stringify(notAllowed || []))
  }
  try {
    const config = {
      headers: {
        apiKey: process.env.APIGEE_API_KEY || '',
        'Cache-control': 'no-cache',
      },
      params: req.body,
    }
    const { data } = await axios.get(
      `${DOTCOM_URL}myfrontier/v3/accounts/wimt/order-status`,
      config,
    )
    return res.json(data)
  } catch (err: any) {
    apiErrorLogger(err, 'search-form')
    return res
      .status(err?.statusCode || err?.response?.status || 500)
      .json(err?.response?.data)
  }
}
