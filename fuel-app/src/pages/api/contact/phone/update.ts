import type { NextApiRequest, NextApiResponse } from 'next'
import fetcher from 'src/pages/api/fetcherWithJWT'
import { apiErrorLogger } from 'src/utils/adobe/api-error-logger'
import { decryptPayload } from 'src/utils/secure'

export default async function updatePhoneNumber(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== 'PUT') {
      const notAllowed = { statusCode: 405, message: 'Method Not Allowed' }
      return res.end(JSON.stringify(notAllowed || {}))
    }

    const { uuid, phoneId, phoneNumber, givenName, familyName, isPrimary } =
      decryptPayload(req.body.d)
    const endpoint = `myfrontier/v3/accounts/authorized/${uuid}/phonenumber/${phoneId}`
    const payload = { phoneNumber, givenName, familyName, isPrimary }
    const response = await fetcher.put(endpoint, payload, {
      cookie: req.headers.cookie,
      ctx: res,
    })
    return res.status(200).json(response?.data ?? {})
  } catch (error: any) {
    apiErrorLogger(error, 'contact-verification-update-phone')
    return res
      .status(error?.statusCode || error?.response?.status || 500)
      .json(error?.response?.data)
  }
}
