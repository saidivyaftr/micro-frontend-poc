import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

import getFrontierBaseUrl from 'src/utils/api/baseUrl'

const getCompleteRegistration = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const FRONTIER_API_URL = getFrontierBaseUrl(req?.headers?.host)
    const { id } = req.query
    const response = await axios.get(
      `${FRONTIER_API_URL}api/legacy/completeRegistration/${id}`,
      {
        headers: { cookie: req.headers.cookie },
      },
    )
    res.status(200).json(response.data || [])
  } catch (error: any) {
    res
      .status(error?.response?.status || 500)
      .json(error?.response?.data || error)
  }
}

const postCompleteRegistration = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const FRONTIER_API_URL = getFrontierBaseUrl(req?.headers?.host)
    const { id } = req.query
    const response = await axios.post(
      `${FRONTIER_API_URL}api/legacy/completeRegistration/${id}`,
      req.body,
      {
        headers: { cookie: req.headers.cookie },
      },
    )
    res.status(200).json(response.data || [])
  } catch (error: any) {
    res
      .status(error?.response?.status || 500)
      .json(error?.response?.data || error)
  }
}
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return postCompleteRegistration(req, res)
    default:
      return getCompleteRegistration(req, res)
  }
}
