import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { generateApigeeToken } from 'src/utils/apigee'
import { apiErrorLogger } from 'src/utils/adobe/api-error-logger'

export default async function activateSubscription(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const APIGEE_BASE_URL = process.env.APIGEE_BASE_URL
    const endpoint = `/cssbillingonbehalfof/v1/subscription/${req?.query?.id}/activate`
    const body = {}
    const headers = {
      customerBearerToken: req?.body?.headers?.customerBearerToken,
      'content-type': 'application/json',
      Accept: 'application/json',
    }
    const tokenDetails = await generateApigeeToken()
    const accessToken = tokenDetails?.data?.oauth?.accessToken
    const apgcorrelationid = tokenDetails?.headers?.apgcorrelationid

    const response = await axios.post(`${APIGEE_BASE_URL}${endpoint}`, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        CorrelationId: apgcorrelationid,
        ...(headers || {}),
      },
    })

    return res.status(200).json(response?.data || [])
  } catch (error: any) {
    apiErrorLogger(error, 'bobo-service-activate')
    res
      .status(error?.statusCode || error?.response?.status || 500)
      .json(error?.response?.data)
  }
}
