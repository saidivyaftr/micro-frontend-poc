import type { NextApiRequest, NextApiResponse } from 'next'
import fetcher from './fetcherWithAuthToken'
import { apiErrorLogger } from 'src/utils/adobe/api-error-logger'
import { decryptPayload } from 'src/utils/secure'
import moment from 'moment'

export default async function generateICaseId(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== 'POST') {
      const notAllowed = { statusCode: 405, message: 'Method Not Allowed' }
      return res.end(JSON.stringify(notAllowed || {}))
    }
    const endpoint = 'pegacase/v1/interactions'
    const { btn } = decryptPayload(req.body.d)
    const timestamp = moment().format('YYYYMMDDTHHmmss')
    const body = {
      InteractionType: 'Web',
      ChannelType: 'Mobile',
      ChannelInitiator: 'Frontier.com',
      ChannelID: '779D6001-6196-1A8A-909E-0004AC1EA1AD',
      StartDateTime: `${timestamp}`,
      CustomerID: `${btn}`,
      CustomerIDType: 'B',
      Intent: 'Bill Pay',
      APIVersion: 'V2',
    }
    const response = await fetcher.post(endpoint, body, {
      cookie: req.headers.cookie,
    })
    return res.status(200).json(response?.data ?? {})
  } catch (error: any) {
    apiErrorLogger(error, 'interactions-generate-icaseId')
    return res
      .status(error?.statusCode || error?.response?.status || 500)
      .json(error?.response?.data)
  }
}
