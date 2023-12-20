import type { NextApiRequest, NextApiResponse } from 'next'
import fetcher from 'src/pages/api/fetcherWithJWT'
import { apiErrorLogger } from 'src/utils/adobe/api-error-logger'

const changeContactNumber = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const { id: uuid } = req.query

    const endpoint = `myfrontier/v3/accounts/${uuid}/non-authenticated/update-contact-details`

    const response = await fetcher.put(endpoint, req.body, {
      cookie: req.headers.cookie,
      ctx: res,
    })

    return res.status(200).json(response?.data ?? {})
  } catch (error: any) {
    apiErrorLogger(error, 'change-contact-number')
    return res
      .status(error?.statusCode || error?.response?.status || 500)
      .json(error?.response?.data)
  }
}

export default function ContactHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case 'PUT':
      return changeContactNumber(req, res)
    default:
      const notAllowed = { statusCode: 405, message: 'Method Not Allowed' }
      return res.end(JSON.stringify(notAllowed || {}))
  }
}
