import type { NextApiRequest, NextApiResponse } from 'next'
import { STATUS_CODES } from 'src/constants'
import fetcher from '../fetcherApi'
import axios from 'axios'

const LinkAccounts = async (req: NextApiRequest, res: NextApiResponse) => {
  const APIGEE_API_KEY = process.env.APIGEE_API_KEY
  const APIGEE_API_SECRET = process.env.APIGEE_API_SECRET
  try {
    const shouldMockAPI = req?.headers?.referer?.includes('mock-register')
    if (shouldMockAPI) {
      return res.status(200).json({})
    }
    // Fetching profile Access token
    const profileAccessEndpoint = `${process.env.APIGEE_BASE_URL}frontieridentity/v1/token`
    const body = {
      client_id: APIGEE_API_KEY || '',
      client_secret: APIGEE_API_SECRET || '',
      grant_type: 'password',
      username: req.body.username,
      password: req.body.password,
    }
    const serializedData = new URLSearchParams(body)
    const tokenResponse = await axios.post(
      profileAccessEndpoint,
      serializedData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )
    const profileAccessToken = tokenResponse?.data?.access_token

    // Linking account
    const accountAccessEndpoint = `myfrontier/v3/profile`
    const linkingResponse = await fetcher.post(accountAccessEndpoint, {
      partialLogin: req.body.partialLogin,
      accountAccessToken: req.body.accountAccessToken,
      profileAccessToken,
    })
    return res.status(200).json(linkingResponse?.data || {})
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
  return LinkAccounts(req, res)
}
