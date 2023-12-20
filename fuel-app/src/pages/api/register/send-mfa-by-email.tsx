import type { NextApiRequest, NextApiResponse } from 'next'
import { STATUS_CODES } from 'src/constants'
import fetcher from '../fetcherApi'
import { v4 as uuidv4 } from 'uuid'

const SendMFAByEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const shouldMockAPI = req?.headers?.referer?.includes('mock-register')
    if (shouldMockAPI) {
      return res.status(200).json({
        expirationTimestamp: '2022-04-21T19:20:30-05:00',
      })
    }
    const endpoint = `cssauthorization/v1/authorization/mfabyemail`
    const response = await fetcher.post(endpoint, req.body, {
      CorrelationId: uuidv4(),
      ApplicationName: 'frontierdotcom',
      UserName: null,
    })
    return res.status(200).json(response?.data || {})
    // return res.status(200).json({})
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
  return SendMFAByEmail(req, res)
}
