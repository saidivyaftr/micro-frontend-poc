import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { apiErrorLogger } from 'src/utils/adobe/api-error-logger'

const DOTCOM_URL = process.env.DOTCOM_URL || ''

const handleVoicemail = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await axios.get(`${DOTCOM_URL}api/accessnumbers/voicemail`)
    res.status(200).json(response.data)
  } catch (error: any) {
    apiErrorLogger(error, 'predictive-service')
    res.status(error?.statusCode || error?.response?.status || 500).json(error)
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return handleVoicemail(req, res)
}
