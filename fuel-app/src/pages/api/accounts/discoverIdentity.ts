import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

const DOTCOM_URL = process.env.DOTCOM_URL || ''

export default async function discoverIdentity(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.headers.cookie?.includes('connect.sid')) {
      const response = await axios.post(
        `${DOTCOM_URL}api/accounts/discoverIdentity`,
        req.body,
        {
          headers: { cookie: req.headers.cookie },
        },
      )
      res.status(200).json(response.data || [])
    } else {
      res.status(401).json({ error: 'Unauthorized' })
    }
  } catch (error: any) {
    res
      .status(error?.response?.status || 500)
      .json(error?.response?.data || error)
  }
}
