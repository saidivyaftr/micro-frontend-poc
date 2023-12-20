import type { NextApiRequest, NextApiResponse } from 'next'
import { STATUS_CODES } from 'src/constants'
import getFrontierBaseUrl from 'src/utils/api/baseUrl'
import axios from 'axios'

const handleSessionGet = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!req?.headers?.cookie) {
      return res.status(STATUS_CODES.NO_CONTENT)
    }
    const FRONTIER_API_URL = getFrontierBaseUrl(req?.headers?.host)
    const response = await axios.get(`${FRONTIER_API_URL}api/session`, {
      headers: { cookie: req.headers.cookie },
    })
    return res.end(JSON.stringify(response?.data || {}))
  } catch (error: any) {
    res
      .status(error?.response?.status || STATUS_CODES.SERVER_ERROR)
      .json(JSON.stringify(error?.response?.data || {}))
  }
}

const handleSessionPost = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!req?.headers?.cookie) {
      return res.status(STATUS_CODES.NO_CONTENT)
    }
    const FRONTIER_API_URL = getFrontierBaseUrl(req?.headers?.host)
    const response = await axios.post(
      `${FRONTIER_API_URL}api/session`,
      req.body,
      {
        headers: { cookie: req.headers.cookie },
      },
    )
    const setCookies = response?.headers?.['set-cookie']
    await res.writeHead(200, { 'Set-Cookie': setCookies || '' })
    return res.end(JSON.stringify(response?.data || {}))
  } catch (error: any) {
    res
      .status(error?.response?.status || STATUS_CODES.SERVER_ERROR)
      .json(JSON.stringify(error?.response?.data || {}))
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return handleSessionPost(req, res)
    default:
      return handleSessionGet(req, res)
  }
}
