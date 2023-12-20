import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { apiErrorLogger } from 'src/utils/adobe/api-error-logger'
const DOTCOM_URL = process.env.APIGEE_BASE_URL || ''
const updateAppointmentHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const { id: accountUuid } = req.query
    const endpoint = `myfrontier/v3/accounts/${accountUuid}/non-authenticated/appointment-details`
    const config = {
      headers: {
        apiKey: process.env.APIGEE_API_KEY || '',
      },
    }
    const { data } = await axios.post(
      `${DOTCOM_URL}${endpoint}`,
      req.body,
      config,
    )
    return res.status(200).json(data ?? [])
  } catch (error: any) {
    apiErrorLogger(error, 'update-appointment-details')
    return res
      .status(error?.statusCode || error?.response?.status || 500)
      .json(error?.response?.data)
  }
}

const updateContactHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const { id: accountUuid } = req.query

    const endpoint = `myfrontier/v3/accounts/${accountUuid}/non-authenticated/update-contact-details`
    const config = {
      headers: {
        apiKey: process.env.APIGEE_API_KEY || '',
      },
    }
    const { data } = await axios.put(
      `${DOTCOM_URL}${endpoint}`,
      req.body,
      config,
    )
    return res.status(200).json(data ?? {})
  } catch (error: any) {
    apiErrorLogger(error, 'update-appointment-contact-details')
    return res
      .status(error?.statusCode || error?.response?.status || 500)
      .json(error?.response?.data)
  }
}
export default function appointmentHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case 'POST':
      return updateAppointmentHandler(req, res)
    case 'PUT':
      return updateContactHandler(req, res)
    default:
      const notAllowed = { statusCode: 405, message: 'Method Not Allowed' }
      return res.end(JSON.stringify(notAllowed || {}))
  }
}
