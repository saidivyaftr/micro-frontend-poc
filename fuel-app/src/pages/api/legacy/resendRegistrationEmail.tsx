import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

const DOTCOM_URL = process.env.DOTCOM_URL || ''

export default async function resendRegistrationEmail(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const response = await axios.post(
      `${DOTCOM_URL}api/legacy/resendRegistrationEmail`,
      req.body,
      { headers: { cookie: req.headers.cookie } },
    )
    res.status(200).json(response.data || [])
  } catch (error: any) {
    res
      .status(error?.response?.status || 500)
      .json(error?.response?.data || error)
  }
}
