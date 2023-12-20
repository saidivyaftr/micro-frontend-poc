import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

const DOTCOM_URL = process.env.DOTCOM_URL || ''

export default async function getServices(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.headers.cookie?.includes('connect.sid')) {
      const { includeDetails, ignoreAuthErrors } = req.query
      const ignoreAuthErrorsParams = ignoreAuthErrors
        ? { ignoreAuthErrors }
        : undefined
      const includeDetailsParams = includeDetails
        ? { includeDetails }
        : undefined

      const response = await axios.get(`${DOTCOM_URL}api/services`, {
        headers: { cookie: req.headers.cookie },
        params: { ...ignoreAuthErrorsParams, ...includeDetailsParams },
      })
      res.status(200).json(response.data || [])
    } else {
      res.status(401).json({ error: 'Unauthorized' })
    }
  } catch (error: any) {
    res
      .status(error?.response?.status || 500)
      .json(error?.response?.data || error)
  }
}
