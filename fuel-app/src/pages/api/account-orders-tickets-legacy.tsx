import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { apiErrorLogger } from 'src/utils/adobe/api-error-logger'

const DOTCOM_URL = process.env.DOTCOM_URL || ''

export default async function searchOrdersTicketsLegacy(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== 'POST') {
      const notAllowed = { statusCode: 405, message: 'Method Not Allowed' }
      return res.end(JSON.stringify(notAllowed || {}))
    }
    const response = await axios.get(`${DOTCOM_URL}api/ordersTicketsSearch`, {
      headers: { cookie: req.headers.cookie },
      params: req.body,
    })
    res.status(200).json(response.data || [])
  } catch (error: any) {
    apiErrorLogger(error, 'search-orders-tickets-legacy')
    res
      .status(error?.response?.status || 500)
      .json(error?.response?.data || error)
  }
}
