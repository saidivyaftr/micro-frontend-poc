import type { NextApiRequest, NextApiResponse } from 'next'
import fetcher from 'src/pages/api/fetcherWithJWT'
import { apiErrorLogger } from 'src/utils/adobe/api-error-logger'
import { decryptPayload } from 'src/utils/secure'

export default async function getAccounts(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== 'GET') {
      const notAllowed = { statusCode: 405, message: 'Method Not Allowed' }
      return res.end(JSON.stringify(notAllowed || {}))
    }

    const { fetchNewToken } = decryptPayload(req.headers.d)
    const endpoint = `myfrontier/v2/accounts`
    const response = await fetcher.get(
      endpoint,
      {
        cookie: req.headers.cookie,
        ctx: res,
      },
      fetchNewToken,
    )
    return res.status(200).json(response?.data ?? {})
  } catch (error: any) {
    apiErrorLogger(error, 'digital-api-accountList')
    return res
      .status(error?.statusCode || error?.response?.status || 500)
      .json(error?.response?.data)
  }
}
