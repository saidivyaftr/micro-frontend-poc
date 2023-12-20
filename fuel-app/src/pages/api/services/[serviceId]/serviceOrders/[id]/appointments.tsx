import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

const DOTCOM_URL = process.env.DOTCOM_URL || ''

export default async function getAppointmentDetails(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { serviceId, id, daysToSearch, startDate } = req.query

    if (req.headers.cookie?.includes('connect.sid')) {
      const details = await axios.get(
        `${DOTCOM_URL}api/services/${serviceId}/serviceOrders/${id}/appointments?daysToSearch=${
          daysToSearch || 14
        }&startDate=${startDate}`,
        {
          headers: { cookie: req.headers.cookie },
        },
      )
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
