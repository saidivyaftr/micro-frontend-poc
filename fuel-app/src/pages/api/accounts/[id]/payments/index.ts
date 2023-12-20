import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

const DOTCOM_URL = process.env.DOTCOM_URL || ''

const postPayment = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.headers.cookie?.includes('connect.sid')) {
      const { id } = req.query
      const response = await axios.post(
        `${DOTCOM_URL}api/accounts/${id}/payments`,
        req.body,
        {
          headers: { cookie: req.headers.cookie },
        },
      )
      res.status(200).json(response.data || {})
    } else {
      res.status(401).json({ error: 'Unauthorized' })
    }
  } catch (error: any) {
    res
      .status(error?.response?.status || 500)
      .json(error?.response?.data || error)
  }
}

const getPaymentsHistory = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    if (req.headers.cookie?.includes('connect.sid')) {
      const { id } = req.query
      const response = await axios.get(
        `${DOTCOM_URL}api/accounts/${id}/payments`,
        {
          headers: { cookie: req.headers.cookie },
        },
      )
      res.status(200).json(
        response.data || {
          failedPayments: [],
          payments: [],
        },
      )
    } else {
      res.status(401).json({ error: 'Unauthorized' })
    }
  } catch (error: any) {
    res
      .status(error?.response?.status || 500)
      .json(error?.response?.data || error)
  }
}

export default function paymentsHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case 'GET':
      return getPaymentsHistory(req, res)
    case 'POST':
      return postPayment(req, res)
  }
}
