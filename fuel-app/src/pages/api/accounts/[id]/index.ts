import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

import getFrontierBaseUrl from 'src/utils/api/baseUrl'

async function getAccountDetails(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.headers.cookie?.includes('connect.sid')) {
      const FRONTIER_API_URL = getFrontierBaseUrl(req?.headers?.host)
      const { id } = req.query
      const response = await axios.get(
        `${FRONTIER_API_URL}api/accounts/${id}`,
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

async function postAccountDetails(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.headers.cookie?.includes('connect.sid')) {
      const FRONTIER_API_URL = getFrontierBaseUrl(req?.headers?.host)
      const { id } = req.query
      const response = await axios.post(
        `${FRONTIER_API_URL}api/accounts/${id}`,
        req.body,
        {
          headers: { cookie: req.headers.cookie },
        },
      )
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    return postAccountDetails(req, res)
  }
  return getAccountDetails(req, res)
}
