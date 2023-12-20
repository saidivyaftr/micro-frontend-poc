import type { NextApiRequest, NextApiResponse } from 'next'
import { STATUS_CODES } from 'src/constants'
import fetcher from '../fetcherWithAuthToken'

const searchAuthorizationMethods = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const cssAuthorizeEndpoint = `cssauthorization/v1/authorization/methods`
    const response = await fetcher.post(cssAuthorizeEndpoint, req.body, {
      ApplicationName: 'frontierdotcom',
      UserName: null,
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
  return searchAuthorizationMethods(req, res)
}
