import type { NextApiRequest, NextApiResponse } from 'next'
//import fetcher from '../fetcherWithAuthToken'
import { apiErrorLogger } from 'src/utils/adobe/api-error-logger'
import { ValidateAuthToken } from 'src/utils/api/token'

export default async function getOffers(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const validation = await ValidateAuthToken(req.headers.authtoken as string)
    const telephoneNumber = validation?.data?.account?.phoneNumber?.phoneNumber //|| 3048822483
    //if response success and contain phonenumber then proceed with get offers using fetcher
    if (telephoneNumber) {
      return res.status(200).json(telephoneNumber ?? {})
    } else {
      // Redirect to login - not contain phonenumber
      return res.status(200).json({
        redirectToLogin: true,
      })
    }
  } catch (error: any) {
    apiErrorLogger(error, 'self-service-validateToken')
    return res
      .status(error?.statusCode || error?.response?.status || 500)
      .json(error?.response?.data)
  }
}
