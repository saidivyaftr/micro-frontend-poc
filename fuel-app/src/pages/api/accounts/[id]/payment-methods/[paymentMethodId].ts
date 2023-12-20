import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

const DOTCOM_URL = process.env.DOTCOM_URL || ''

async function updatePaymentMethod(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.headers.cookie?.includes('connect.sid')) {
      const { id, paymentMethodId } = req.query
      const response = await axios.put(
        `${DOTCOM_URL}api/accounts/${id}/paymentMethods/${paymentMethodId}`,
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

async function deletePaymentMethod(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.headers.cookie?.includes('connect.sid')) {
      const { id, paymentMethodId } = req.query
      const response = await axios.delete(
        `${DOTCOM_URL}api/accounts/${id}/paymentMethods/${paymentMethodId}`,
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

export default function paymentMethodHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case 'PUT':
      return updatePaymentMethod(req, res)
    case 'DELETE':
      return deletePaymentMethod(req, res)
  }
}
