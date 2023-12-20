import type { NextApiRequest, NextApiResponse } from 'next'
import { apiErrorLogger } from 'src/utils/adobe/api-error-logger'
import verifyRecaptcha from 'src/utils/api/validateCaptcha'
import { decryptPayload } from 'src/utils/secure'

export default async function reCaptchaValidation(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { token } = decryptPayload(req.body.d)

    const response = await verifyRecaptcha(token)
    return res.status(200).json(response?.data ?? {})
  } catch (error: any) {
    apiErrorLogger(error, 'ReCaptcha Validation Failed')
    return res
      .status(error?.statusCode || error?.response?.status || 500)
      .json(error?.response?.data)
  }
}
