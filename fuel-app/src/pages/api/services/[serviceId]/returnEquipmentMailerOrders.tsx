import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

const DOTCOM_URL = process.env.DOTCOM_URL || ''

const returnEquipmentMailerOrdersGet = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const URL = `${DOTCOM_URL}api/services/${req.query.serviceId}/returnEquipmentMailerOrders`
  try {
    const details = await axios.get(URL, {
      headers: { cookie: req.headers.cookie },
    })
    return res.status(200).json(details?.data || {})
  } catch (error: any) {
    res.status(error?.statusCode || error?.response?.status || 500).json(error)
  }
}

const returnEquipmentMailerOrdersPost = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const URL = `${DOTCOM_URL}api/services/${req.query.serviceId}/returnEquipmentMailerOrders`
    const details = await axios.post(URL, req.body, {
      headers: { cookie: req.headers.cookie },
    })
    return res.status(200).json(details?.data || {})
  } catch (error: any) {
    res.status(error?.statusCode || error?.response?.status || 500).json(error)
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return returnEquipmentMailerOrdersPost(req, res)
    default:
      return returnEquipmentMailerOrdersGet(req, res)
  }
}
