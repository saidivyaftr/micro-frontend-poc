import type { NextApiRequest, NextApiResponse } from 'next'
import fetcher from 'src/pages/api/fetcher'
import { apiErrorLogger } from 'src/utils/adobe/api-error-logger'
import { decryptPayload } from 'src/utils/secure'

export default async function forgotId(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== 'POST') {
      const notAllowed = { statusCode: 405, message: 'Method Not Allowed' }
      return res.end(JSON.stringify(notAllowed || {}))
    }

    const { lastName, serviceAddress } = decryptPayload(req.body.d)
    const endpoint = `/myfrontier/v3/profile/forgot-id`
    const payload = { lastName, serviceAddress }

    const response = await fetcher.post(endpoint, payload, {
      cookie: req.headers.cookie,
    })

    return res.status(200).json(response?.data ?? {})
  } catch (error: any) {
    apiErrorLogger(error, 'forgot-password-send-email')
    return res
      .status(error?.statusCode || error?.response?.status || 500)
      .json(error?.response?.data)
  }
}
