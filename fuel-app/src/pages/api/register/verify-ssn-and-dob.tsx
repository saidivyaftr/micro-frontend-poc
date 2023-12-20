import type { NextApiRequest, NextApiResponse } from 'next'
import { STATUS_CODES } from 'src/constants'
import fetcher from '../fetcherApi'
import { v4 as uuidv4 } from 'uuid'

const VerifySSNAndDOB = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const shouldMockAPI = req?.headers?.referer?.includes('mock-register')
    if (shouldMockAPI) {
      return res.status(200).json({
        account: {
          accountName: {
            givenName: 'Joe',
            familyName: 'Luka',
            companyName: 'Acme Systems',
          },
          accountNumber: '31955512122004215',
          emailInformation: {
            emailId: '121212',
            isEmailVerified: false,
          },
          phoneInformation: {
            phoneId: 12345,
            isPhoneVerified: false,
          },
          phoneNumber: {
            phoneNumber: 3103745019,
            sequenceNumber: 0,
          },
          accountUuid: 'ddf0c9cc-a72e-4abd-9420-336bebea2920',
        },
        authorization: {
          authorizationToken: 'ddf0c9cc-a72e-4abd-9420-336bebea2920',
          expirationTimestamp: '2022-04-21T19:20:30-05:00',
        },
      })
    }
    const endpoint =
      'cssauthorization/v1/authorization/bylast4ssnanddateofbirth'
    const response = await fetcher.post(endpoint, req.body, {
      CorrelationId: uuidv4(),
      ApplicationName: 'frontierdotcom',
      UserName: null,
    })
    return res.status(200).json(response?.data || {})
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
  return VerifySSNAndDOB(req, res)
}
