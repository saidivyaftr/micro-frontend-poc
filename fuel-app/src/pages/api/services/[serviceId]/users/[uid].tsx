import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

const DOTCOM_URL = process.env.DOTCOM_URL || ''

export default async function deleteUser(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.headers.cookie?.includes('connect.sid')) {
      const url = `${DOTCOM_URL}api/services/${req.query.serviceId}/users/${req.query.uid}`
      const details = await axios.delete(url, {
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
