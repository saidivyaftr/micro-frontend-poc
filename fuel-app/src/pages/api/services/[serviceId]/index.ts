import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

const DOTCOM_URL = process.env.DOTCOM_URL || ''

async function deleteService(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.headers.cookie?.includes('connect.sid')) {
      const URL = `${DOTCOM_URL}api/services/${req.query.serviceId}`
      const response = await axios.delete(URL, {
        headers: { cookie: req.headers.cookie },
      })
      res.status(200).json(response.data || {})
    } else {
      res.status(401).json({ error: 'Unauthorized' })
    }
  } catch (error: any) {
    res
      .status(error?.response?.status || 500)
      .json(error?.response?.data || error)
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return deleteService(req, res)
}
