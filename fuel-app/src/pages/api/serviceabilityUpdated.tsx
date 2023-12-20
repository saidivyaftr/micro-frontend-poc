import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { apiErrorLogger } from 'src/utils/adobe/api-error-logger'

const APIGEE_BASE_URL = process.env.APIGEE_BASE_URL || ''
const FTR_AUTH = process.env.FTR_AUTH || ''
const checkForServiceabilityUpdated = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const esbAuthEndpoint = `${APIGEE_BASE_URL}oauth/v1/accesstoken?grant_type=client_credentials`
    const oAuthDetails = await axios.get(esbAuthEndpoint, {
      headers: {
        Authorization: `Basic ${FTR_AUTH}`,
      },
    })
    const { env, controlNumber } = req.query
    const token = `Bearer ${oAuthDetails.data?.oauth?.accessToken}`
    const endpoint = `${APIGEE_BASE_URL}esbaddress/v1/addresses/serviceability/${env}/${controlNumber}`
    const details = await axios.get(endpoint, {
      headers: {
        Authorization: token,
        requestingApplication: 'ESB',
        'content-type': 'application/json',
        Accept: 'application/json',
      },
    })
    return res.status(details.status).json(details?.data || {})
  } catch (error: any) {
    apiErrorLogger(error, 'check-servicability')
    return res.status(500).json(error || {})
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return checkForServiceabilityUpdated(req, res)
}
