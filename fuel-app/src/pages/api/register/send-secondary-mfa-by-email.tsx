import type { NextApiRequest, NextApiResponse } from 'next'
import { STATUS_CODES } from 'src/constants'
import fetcher from '../fetcherApi'

const SendSecondaryMFAByEmail = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const shouldMockAPI = req?.headers?.referer?.includes('mock-register')
    if (shouldMockAPI) {
      return res.status(200).json({
        tokenForVerification: 'FAKE_VERIFY_EMAIL_TOKEN',
      })
    }
    const endpoint = `myfrontier/v3/accounts/${req.body.accountUuid}/emailaddresses/${req.body.emailAddressId}/verify`
    const response = await fetcher.post(endpoint, req.body?.payload, {
      Authorization: `Bearer ${req.body.cssAPIAccountAccessToken}`,
    })
    return res.status(200).json(response?.data || {})
  } catch (error: any) {
    return res
      .status(
        error?.statusCode ||
          error?.response?.status ||
          STATUS_CODES.SERVER_ERROR,
      )
      .json(error?.response?.data || error)
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return SendSecondaryMFAByEmail(req, res)
}
