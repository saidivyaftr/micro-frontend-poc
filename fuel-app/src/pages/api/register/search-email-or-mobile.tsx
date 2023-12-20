import type { NextApiRequest, NextApiResponse } from 'next'
import { STATUS_CODES } from 'src/constants'
import fetcher from '../fetcherApi'
import { v4 as uuidv4 } from 'uuid'
import { emailSearchResponse } from './mock-data'

// Remove mocking after all API integrations

const SearchEmailOrMobile = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const shouldMockAPI = req?.headers?.referer?.includes('mock-register')
  try {
    if (shouldMockAPI) {
      return returnMockData(req, res)
    }
    const cssAuthorizeEndpoint = `cssauthorization/v1/authorization/methods`
    const response = await fetcher.post(cssAuthorizeEndpoint, req.body, {
      CorrelationId: uuidv4(),
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
  return SearchEmailOrMobile(req, res)
}

const returnMockData = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.body?.emailAddress?.emailAddress) {
    switch (req.body?.emailAddress?.emailAddress) {
      case 'noaccounts@ftr.com':
        return res
          .status(emailSearchResponse.noAccounts?.status)
          .json(emailSearchResponse.noAccounts?.body)
      case 'multiple@ftr.com':
        return res
          .status(emailSearchResponse.multipleAccounts?.status)
          .json(emailSearchResponse.multipleAccounts?.body)
      case 'registered@ftr.com':
        return res
          .status(emailSearchResponse.alreadyRegistered?.status)
          .json(emailSearchResponse.alreadyRegistered?.body)
      default:
        return res
          .status(emailSearchResponse.success?.status)
          .json(emailSearchResponse.success?.body)
    }
  }
  if (req.body?.contactTelephoneNumber?.contactTelephoneNumber) {
    switch (req.body?.contactTelephoneNumber?.contactTelephoneNumber) {
      case '9999999990':
        return res
          .status(emailSearchResponse.noAccounts?.status)
          .json(emailSearchResponse.noAccounts?.body)
      case '9999999991':
        return res
          .status(emailSearchResponse.multipleAccounts?.status)
          .json(emailSearchResponse.multipleAccounts?.body)
      case '9999999992':
        return res
          .status(emailSearchResponse.alreadyRegistered?.status)
          .json(emailSearchResponse.alreadyRegistered?.body)
      default:
        return res
          .status(emailSearchResponse.success?.status)
          .json(emailSearchResponse.success?.body)
    }
  }
}
