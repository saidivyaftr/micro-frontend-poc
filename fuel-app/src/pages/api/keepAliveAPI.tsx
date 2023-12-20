import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import getFrontierBaseUrl from 'src/utils/api/baseUrl'
import { apiErrorLogger } from 'src/utils/adobe/api-error-logger'
// import profile from './helperProfileData'

const refreshSession = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const FRONTIER_API_URL = getFrontierBaseUrl(req?.headers?.host)
    await axios.head(`${FRONTIER_API_URL}api/chat/keepAlive`, {
      headers: { cookie: req.headers.cookie },
    })
    res.send('OK')
  } catch (error: any) {
    apiErrorLogger(error, 'get-address-details')
    res.status(error?.statusCode || error?.response?.status || 500).json({
      ...(error?.response?.data || error?.response || error),
    })
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return refreshSession(req, res)
}
