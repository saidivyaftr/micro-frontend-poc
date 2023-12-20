import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid'
import { STATUS_CODES } from 'src/constants'
import fetcher from '../fetcherApi'
import { emailSearchResponse } from './mock-data'

// const DOTCOM_URL = process.env.DOTCOM_URL || ''

const SearchLastNameAndAddress = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const shouldMockAPI = req?.headers?.referer?.includes('mock-register')
    if (shouldMockAPI) {
      return returnMockData(req, res)
    }
    const cssAuthorizeEndpoint = `cssauthorization/v1/authorization/methods`
    const response = await fetcher.post(cssAuthorizeEndpoint, req.body, {
      CorrelationId: uuidv4(),
      ApplicationName: 'frontierdotcom',
      UserName: null,
    })
    return res.status(200).json(response?.data)
  } catch (error: any) {
    res
      .status(
        error?.statusCode ||
          error?.response?.status ||
          STATUS_CODES.SERVER_ERROR,
      )
      .json(error?.response?.data || error)
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return SearchLastNameAndAddress(req, res)
}

const returnMockData = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.body?.customerLastNameAddress?.lastName) {
    case 'noaccounts':
      return res
        .status(emailSearchResponse.noAccounts?.status)
        .json(emailSearchResponse.noAccounts?.body)
    case 'multiple':
      return res
        .status(emailSearchResponse.multipleAccounts?.status)
        .json(emailSearchResponse.multipleAccounts?.body)
    case 'registered':
      return res
        .status(emailSearchResponse.alreadyRegistered?.status)
        .json(emailSearchResponse.alreadyRegistered?.body)
    default:
      return res
        .status(emailSearchResponse.success?.status)
        .json(emailSearchResponse.success?.body)
  }
}
