import type { NextApiRequest, NextApiResponse } from 'next'
import fetcher from './fetcherWithAuthToken'
import { apiErrorLogger } from 'src/utils/adobe/api-error-logger'
import { v4 as uuidv4 } from 'uuid'

const UserTosStatus = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const endpoint = `osstermsofservice/v1/Customers/${req.query.uuid}`

    const response = await fetcher.get(
      endpoint,
      {
        cookie: req.headers.cookie,
        OssAuthToken: process.env.OSS_TOS_AUTH_TOKEN,
        Username: 'dotcom',
        'Content-Type': 'application/json',
        accept: '*/*',
        ApiKey: process.env.APIGEE_API_KEY,
        CorrelationId: uuidv4(),
        'Access-Control-Allow-Origin': '*',
      },
      true,
    )
    return res.status(200).json(response?.data ?? {})
  } catch (error: any) {
    apiErrorLogger(error, 'certify-internet-usage')
    res.status(error?.statusCode || error?.response?.status || 500).json({
      ...(error?.response?.data || error?.response || error),
    })
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return UserTosStatus(req, res)
}
