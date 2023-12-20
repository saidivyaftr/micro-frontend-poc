import type { NextApiRequest, NextApiResponse } from 'next'
import fetcher from 'src/pages/api/fetcherWithJWT'
import { apiErrorLogger } from 'src/utils/adobe/api-error-logger'

const getVacationServices = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const { id: uuid } = req.query
    const endpoint = `myfrontier/v3/accounts/${uuid}/vacation-services`
    const response = await fetcher.get(endpoint, {
      cookie: req.headers.cookie,
      ctx: res,
    })
    return res.status(200).json(response?.data ?? {})
  } catch (error: any) {
    apiErrorLogger(error, 'account-get-vacation-services')
    return res
      .status(error?.statusCode || error?.response?.status || 500)
      .json(error?.response?.data)
  }
}

const updateVacationServiceHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const { id: uuid } = req.query
    const endpoint = `myfrontier/v3/accounts/${uuid}/vacation-services`
    const payload = req.body
    const response = await fetcher.put(endpoint, payload, {
      cookie: req.headers.cookie,
      ctx: res,
    })
    return res.status(200).json(response?.data ?? {})
  } catch (error: any) {
    apiErrorLogger(error, 'account-update-vacation-services')
    return res
      .status(error?.statusCode || error?.response?.status || 500)
      .json(error?.response?.data)
  }
}

export default function vacationServiceHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case 'GET':
      return getVacationServices(req, res)
    case 'PUT':
      return updateVacationServiceHandler(req, res)
    default:
      const notAllowed = { statusCode: 405, message: 'Method Not Allowed' }
      return res.end(JSON.stringify(notAllowed || {}))
  }
}
