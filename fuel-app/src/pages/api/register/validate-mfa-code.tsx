import type { NextApiRequest, NextApiResponse } from 'next'
import { STATUS_CODES } from 'src/constants'
import fetcher from '../fetcherApi'
import { v4 as uuidv4 } from 'uuid'
import { primaryValidateMFA } from './mock-data'
import moment from 'moment'

const validateMFACode = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const shouldMockAPI = req?.headers?.referer?.includes('mock-register')
    if (shouldMockAPI) {
      return returnMockData(req, res)
    }
    const endpoint = `cssauthorization/v1/validate/mfacode`
    const response = await fetcher.post(endpoint, req.body, {
      CorrelationId: uuidv4(),
      ApplicationName: 'frontierdotcom',
      UserName: null,
    })
    return res.status(STATUS_CODES.SUCCESS).json(response?.data || {})
  } catch (error: any) {
    res
      .status(error?.statusCode || error?.response?.status || 500)
      .json(error?.response?.data || error)
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return validateMFACode(req, res)
}

const returnMockData = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.body?.mfaCode) {
    case 111111:
      return res
        .status(primaryValidateMFA.incorrect?.status)
        .json(primaryValidateMFA.incorrect?.body)
    case 222222: {
      const lockedBody = primaryValidateMFA.accountLocked?.body
      const futureTime = moment().add(5, 'minutes')
      const utcString = futureTime.utc().format('MM/DD/YYYY HH:mm')
      const newLockedBody = { ...lockedBody }
      newLockedBody.message = newLockedBody.message.replace(
        '{{untilTime}}',
        `${utcString} UTC`,
      )
      return res
        .status(primaryValidateMFA.accountLocked?.status)
        .json(newLockedBody)
    }
    case 333333: {
      const lockedBody = primaryValidateMFA.accountLocked?.body
      const futureTime = moment().add(24, 'hours')
      const utcString = futureTime.utc().format('MM/DD/YYYY HH:mm')
      const newLockedBody = { ...lockedBody }
      newLockedBody.message = newLockedBody.message.replace(
        '{{untilTime}}',
        `${utcString} UTC`,
      )
      return res
        .status(primaryValidateMFA.accountLocked?.status)
        .json(newLockedBody)
    }
    default:
      return res
        .status(primaryValidateMFA.success?.status)
        .json(primaryValidateMFA.success?.body)
  }
}
