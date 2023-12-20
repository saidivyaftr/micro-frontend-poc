import type { NextApiRequest, NextApiResponse } from 'next'
import fetcher from 'src/pages/api/fetcherWithJWT'
import { apiErrorLogger } from 'src/utils/adobe/api-error-logger'
import { decryptPayload } from 'src/utils/secure'

export default async function completeVerification(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== 'POST') {
      const notAllowed = { statusCode: 405, message: 'Method Not Allowed' }
      return res.end(JSON.stringify(notAllowed || {}))
    }

    const { uuid, tokenForVerification, verificationPin } = decryptPayload(
      req.body.d,
    )
    const endpoint = `/myfrontier/v3/accounts/${uuid}/contact/complete-verification`
    const payload = { tokenForVerification, verificationPin }

    const serializedData = new URLSearchParams(payload)
    const response = await fetcher.post(endpoint, serializedData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      cookie: req.headers.cookie,
      ctx: res,
    })

    return res.status(200).json(response?.data ?? {})
  } catch (error: any) {
    apiErrorLogger(error, 'contact-verification-complete')

    return res
      .status(error?.statusCode || error?.response?.status || 500)
      .json(error?.response?.data)
  }
}
