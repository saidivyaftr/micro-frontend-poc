import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import getFrontierBaseUrl from 'src/utils/api/baseUrl'
import { STATUS_CODES } from 'src/constants/responseCodes'

const handleLogout = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.headers.cookie?.includes('connect.sid')) {
      const FRONTIER_API_URL = getFrontierBaseUrl(req?.headers?.host)
      await axios.post(
        `${FRONTIER_API_URL}api/logout`,
        {},
        {
          headers: { cookie: req.headers.cookie },
        },
      )
      return res.status(200).json({})
    } else {
      return res.status(401).json({
        error: 'Unauthorized',
      })
    }
  } catch (error: any) {
    res
      .status(error?.response?.status || STATUS_CODES.SERVER_ERROR)
      .json(JSON.stringify(error?.response?.data || {}))
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return handleLogout(req, res)
}
