import type { NextApiRequest, NextApiResponse } from 'next'
import { apiErrorLogger } from 'src/utils/adobe/api-error-logger'
import axios from 'axios'

const APIGEE_BASE_URL = process.env.APIGEE_BASE_URL || ''
const FTR_AUTH = process.env.FTR_AUTH || ''

const esbAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const endpoint = `${APIGEE_BASE_URL}oauth/v1/accesstoken?grant_type=client_credentials`
    const details = await axios.get(endpoint, {
      headers: {
        Authorization: `Basic ${FTR_AUTH}`,
      },
    })
    return res.status(details.status).json(details.data || {})
  } catch (error: any) {
    apiErrorLogger(error, 'esbauth')
    return res.status(500).json(error?.response?.data || {})
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return esbAuth(req, res)
}
