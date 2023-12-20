import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { generateApigeeToken } from 'src/utils/apigee'
import { apiErrorLogger } from 'src/utils/adobe/api-error-logger'

export default async function deleteSubscription(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { id } = req.query
    const APIGEE_BASE_URL = process.env.APIGEE_BASE_URL
    const endpoint = `cssbillingonbehalfof/v1/subscription/${id}?cancelWithVendor=true`
    const tokenDetails = await generateApigeeToken()
    const accessToken = tokenDetails?.data?.oauth?.accessToken
    const apgcorrelationid = tokenDetails?.headers?.apgcorrelationid

    const response = await axios.delete(`${APIGEE_BASE_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        CorrelationId: apgcorrelationid,
      },
    })

    return res.status(200).json(response?.data || [])
  } catch (error: any) {
    apiErrorLogger(error, 'bobo-service-delete')
    res
      .status(error?.statusCode || error?.response?.status || 500)
      .json(error?.response?.data)
  }
}
