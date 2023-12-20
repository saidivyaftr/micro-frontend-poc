import type { NextApiRequest, NextApiResponse } from 'next'
import { STATUS_CODES } from 'src/constants'
import fetcher from '../fetcherApi'
import logger from 'src/logger'
const UpdateEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const shouldMockAPI = req?.headers?.referer?.includes('mock-register')
    if (shouldMockAPI) {
      return res.status(200).json({
        emailId: '11111',
        tokenForVerification: 'FAKE_EMAIL_TOKEN',
      })
    }
    logger.info(
      `update email for account id: ${JSON.stringify(req.body.accountUuid)}`,
    )
    logger.info(
      `update email request body: ${JSON.stringify(req.body.payload)}`,
    )
    const endpoint = `myfrontier/v3/accounts/${req.body.accountUuid}/emailaddress/${req.body.emailAddressId}`
    logger.info(
      `update email css api token: ${JSON.stringify(
        req.body.cssAPIAccountAccessToken,
      )}`,
    )
    const response = await fetcher.put(endpoint, req.body?.payload, {
      Authorization: `Bearer ${req.body.cssAPIAccountAccessToken}`,
    })
    logger.info(
      `update email css api response: ${JSON.stringify(response?.data || {})}`,
    )
    return res.status(200).json(response?.data || {})
  } catch (error: any) {
    logger.error(
      `update email css api error response: ${JSON.stringify(
        error?.response?.data || {},
      )}`,
    )
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
  return UpdateEmail(req, res)
}
