import type { NextApiRequest, NextApiResponse } from 'next'
import { STATUS_CODES } from 'src/constants'
import fetcher from './fetcherWithJWT'

// This is the code generated to pass it to chatbot for logged in experience in chatbot
const GetAuthorizationCode = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const response = await fetcher.get(
      `frontieridentity/v2/authorizationcode/?response_type=code&redirect_uri=NA`,
      {
        cookie: req.headers.cookie,
        ctx: res,
        apiKey: process.env.CHATBOT_API_KEY,
      },
    )
    return res.status(200).json(response?.data ?? {})
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
  return GetAuthorizationCode(req, res)
}
