import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

const DOTCOM_URL = process.env.DOTCOM_URL || ''

export default async function getServiceOrders(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.headers.cookie?.includes('connect.sid')) {
      const { historyDays, serviceEnv, serviceType } = req.query
      const historyDaysParams = historyDays ? { historyDays } : undefined
      const url = `${DOTCOM_URL}api/services/${req.query.serviceId}/serviceOrders`
      const details = await axios.get(url, {
        headers: { cookie: req.headers.cookie },
        params: { ...historyDaysParams, serviceEnv, serviceType },
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
