// get, update

import type { NextApiRequest, NextApiResponse } from 'next'
import fetcher from 'src/pages/api/fetcherWithJWT'
import { apiErrorLogger } from 'src/utils/adobe/api-error-logger'

const getAppointment = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id: uuid } = req.query
    const endpoint = `myfrontier/v2/accounts/${uuid}/appointmentDetails`
    const response = await fetcher.get(endpoint, {
      cookie: req.headers.cookie,
      ctx: res,
    })

    return res.status(200).json(response?.data ?? {})
  } catch (error: any) {
    apiErrorLogger(error, 'welcome-get-appointment')
    return res
      .status(error?.statusCode || error?.response?.status || 500)
      .json(error?.response?.data)
  }
}

const updateAppointment = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id: uuid } = req.query
    const endpoint = `myfrontier/v2/accounts/${uuid}/appointmentDetails`
    const response = await fetcher.post(endpoint, req.body, {
      cookie: req.headers.cookie,
      ctx: res,
    })

    return res.status(200).json(response?.data ?? {})
  } catch (error: any) {
    apiErrorLogger(error, 'welcome-update-appointment')
    return res
      .status(error?.statusCode || error?.response?.status || 500)
      .json(error?.response?.data)
  }
}

export default function AppointmentHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case 'GET':
      return getAppointment(req, res)
    case 'POST':
      return updateAppointment(req, res)
    default:
      const notAllowed = { statusCode: 405, message: 'Method Not Allowed' }
      return res.end(JSON.stringify(notAllowed || {}))
  }
}
