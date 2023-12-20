import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

const DOTCOM_URL = process.env.DOTCOM_URL || ''

const handleOrderConfirmation = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const URL = `${DOTCOM_URL}api/services/${req.query.serviceId}/serviceOrders/verification`
    const details = await axios.post(URL, req.body, {
      headers: { cookie: req.headers.cookie },
    })
    return res.status(200).json(details?.data || {})
  } catch (error: any) {
    res.status(error?.statusCode || error?.response?.status || 500).json(error)
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return handleOrderConfirmation(req, res)
}
