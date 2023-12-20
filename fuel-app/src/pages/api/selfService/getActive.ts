import type { NextApiRequest, NextApiResponse } from 'next'
import fetcher from '../fetcherWithAuthToken'
import { apiErrorLogger } from 'src/utils/adobe/api-error-logger'
import { ValidateAuthToken } from 'src/utils/api/token'

export default async function getActive(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const validation = await ValidateAuthToken(req.headers.authtoken as string)
    const telephoneNumber = validation?.data?.account?.phoneNumber?.phoneNumber //|| 2197593970

    if (telephoneNumber) {
      const endpoint = `ecomm-resi-acquisition/v5/active-services/${telephoneNumber}`
      const response = await fetcher.get(endpoint, {
        cookie: req.headers.cookie,
        sourceId: req.headers.sourceid,
      })
      return res.status(200).json(response?.data ?? {})
    } else {
      // Redirect to login - not contain phonenumber
      return res.status(200).json({
        redirectToLogin: true,
      })
    }
  } catch (error: any) {
    apiErrorLogger(error, 'self-service-getActive')
    return res
      .status(error?.statusCode || error?.response?.status || 500)
      .json(error?.response?.data)
  }
}
