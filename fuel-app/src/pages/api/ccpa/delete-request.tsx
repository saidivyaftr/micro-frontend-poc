import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const DOTCOM_URL = process.env.DOTCOM_URL || ''
const CCPADeletion = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const details = await axios.post(
      `${DOTCOM_URL}api/ccpa/delete-request`,
      req.body,
      {
        headers: { cookie: req.headers.cookie },
      },
    )
    return res.status(200).json(details?.data)
  } catch (error: any) {
    res.status(error?.statusCode || error?.response?.status || 500).json(error)
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return CCPADeletion(req, res)
}
