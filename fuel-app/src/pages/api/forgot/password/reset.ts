import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { apiErrorLogger } from 'src/utils/adobe/api-error-logger'
import { decryptPayload } from 'src/utils/secure'

export default async function forgotPWReset(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const DOTCOM_URL = process.env.DOTCOM_URL || ''
    const { encryptedAccountInfo, password } = decryptPayload(req.body.d)
    const payload = { encryptedAccountInfo, password }

    //if (!req.headers.cookie?.includes('connect.sid')) {
    const details = await axios.post(
      `${DOTCOM_URL}api/changepassword`,
      payload,
      {
        headers: { cookie: req.headers.cookie },
      },
    )

    if (details.status === 200 || details.status === 204) {
      return res.status(200).json(details?.statusText)
    } else {
      throw new Error()
    }
    // } else {
    //   return res.status(401).json({
    //     error: 'Unauthorized',
    //   })
    // }
  } catch (error: any) {
    apiErrorLogger(error, 'forgot-password-reset')
    res
      .status(error?.statusCode || error?.response?.status || 500)
      .json(error?.response?.data)
  }
}
