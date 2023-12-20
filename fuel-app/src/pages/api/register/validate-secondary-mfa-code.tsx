import type { NextApiRequest, NextApiResponse } from 'next'
import { STATUS_CODES } from 'src/constants'
import fetcher from '../fetcherApi'
import { secondaryValidateMFA } from './mock-data'
import moment from 'moment'

const ValidateSecondaryMFACode = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const shouldMockAPI = req?.headers?.referer?.includes('mock-register')
    if (shouldMockAPI) {
      return returnMockData(req, res)
    }
    let endpoint = ''
    if (req.body.phoneId) {
      endpoint = `myfrontier/v3/accounts/${req.body.accountUuid}/complete-verification?phoneId=${req.body.phoneId}`
    } else {
      endpoint = `myfrontier/v3/accounts/${req.body.accountUuid}/complete-verification?emailId=${req.body.emailAddressId}`
    }
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
  return ValidateSecondaryMFACode(req, res)
}

const returnMockData = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.body?.payload?.verificationPin) {
    case '111111':
      return res
        .status(secondaryValidateMFA.incorrect?.status)
        .json(secondaryValidateMFA.incorrect?.body)
    case '222222': {
      const lockedBody = secondaryValidateMFA.accountLocked?.body
      const futureTime = moment().add(5, 'minutes')
      const utcString = futureTime.utc().format('MM/DD/YYYY HH:mm')
      lockedBody.message = lockedBody.message.replace(
        '{{untilTime}}',
        `${utcString} UTC`,
      )
      return res
        .status(secondaryValidateMFA.accountLocked?.status)
        .json(lockedBody)
    }
    case '333333': {
      const lockedBody = secondaryValidateMFA.accountLocked?.body
      const futureTime = moment().add(24, 'hours')
      const utcString = futureTime.utc().format('MM/DD/YYYY HH:mm')
      lockedBody.message = lockedBody.message.replace(
        '{{untilTime}}',
        `${utcString} UTC`,
      )
      return res
        .status(secondaryValidateMFA.accountLocked?.status)
        .json(lockedBody)
    }
    default:
      return res
        .status(secondaryValidateMFA.success?.status)
        .json(secondaryValidateMFA.success?.body)
  }
}
