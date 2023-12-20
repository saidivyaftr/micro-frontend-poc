import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

const DOTCOM_URL = process.env.DOTCOM_URL || ''

export default async function editAppointmentDetails(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.headers.cookie?.includes('connect.sid')) {
      const url = `${DOTCOM_URL}api/services/${req.query.serviceId}/serviceOrders/${req.query.id}`

      const details = await axios.put(url, req.body, {
        headers: { cookie: req.headers.cookie },
      })
      res.status(200).json(details?.data || {})
    } else {
      res.status(401).json({ error: 'Unauthorized' })
    }
  } catch (error: any) {
    res
      .status(error?.statusCode || error?.response?.status || 500)
      .json(error?.response.data || error)
  }
}
