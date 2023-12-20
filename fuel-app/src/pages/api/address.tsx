import type { NextApiRequest, NextApiResponse } from 'next'
import fetcher from './fetcherWithAuthToken'
import { apiErrorLogger } from 'src/utils/adobe/api-error-logger'

export default async function getAddressDetails(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const details = await fetcher.get(
      `address-management/v1/Address?environment=${req.query.environment}&controlNumber=${req.query.controlNumber}`,
    )
    return res.status(200).json(details?.data?.address || {})
  } catch (error: any) {
    apiErrorLogger(error, 'get-address-details')
    res.status(error?.statusCode || error?.response?.status || 500).json({
      ...(error?.response?.data || error?.response || error),
    })
  }
}
