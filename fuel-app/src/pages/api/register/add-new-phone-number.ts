import type { NextApiRequest, NextApiResponse } from 'next'
import { STATUS_CODES } from 'src/constants'
import fetcher from '../fetcherApi'
import logger from 'src/logger'
const UpdatePhoneNumber = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const shouldMockAPI = req?.headers?.referer?.includes('mock-register')
    if (shouldMockAPI) {
      return res.status(200).json({
        phoneId: '11111',
        tokenForVerification: 'FAKE_NEW_PHONE_TOKEN',
      })
    }
    logger.info(
      `add phonenumber for account id: ${JSON.stringify(req.body.accountUuid)}`,
    )
    logger.info(
      `add phonenumber request body: ${JSON.stringify(req.body.payload)}`,
    )
    const endpoint = `myfrontier/v3/accounts/${req.body.accountUuid}/phonenumber`
    logger.info(
      `add phonenumber css api token: ${JSON.stringify(
        req.body.cssAPIAccountAccessToken,
      )}`,
    )
    const response = await fetcher.post(endpoint, req.body?.payload, {
      Authorization: `Bearer ${req.body.cssAPIAccountAccessToken}`,
    })
    logger.info(
      `add phonenumber css api response: ${JSON.stringify(
        response?.data || {},
      )}`,
    )
    return res.status(200).json(response?.data || {})
  } catch (error: any) {
    logger.error(
      `add phonenumber css api error response: ${JSON.stringify(
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
  return UpdatePhoneNumber(req, res)
}
