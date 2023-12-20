import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

const DOTCOM_URL = process.env.DOTCOM_URL || ''

const PhoneNumbers = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.headers.cookie?.includes('connect.sid')) {
      const { id } = req.query
      const { data = {} } = await axios.get(
        `${DOTCOM_URL}api/accounts/${id}/phone-numbers`,
        {
          headers: { cookie: req.headers.cookie },
        },
      )
      res.status(200).json(data)
    } else {
      res.status(401).json({ error: 'Unauthorized' })
    }
  } catch (error: any) {
    res
      .status(error?.response?.status || 500)
      .json(error?.response?.data || error)
  }
}

const removePhoneNumber = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.headers.cookie?.includes('connect.sid')) {
      const { id, phoneId } = req.query
      const { data = {} } = await axios.delete(
        `${DOTCOM_URL}api/accounts/${id}/phone-numbers/${phoneId}`,
        {
          headers: { cookie: req.headers.cookie },
        },
      )
      res.status(200).json(data)
    } else {
      res.status(401).json({ error: 'Unauthorized' })
    }
  } catch (error: any) {
    res
      .status(error?.response?.status || 500)
      .json(error?.response?.data || error)
  }
}

const addPhoneNumber = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.headers.cookie?.includes('connect.sid')) {
      const { id } = req.query
      const { data = {} } = await axios.post(
        `${DOTCOM_URL}api/accounts/${id}/phone-numbers`,
        req.body,
        {
          headers: { cookie: req.headers.cookie },
        },
      )
      res.status(200).json(data)
    } else {
      res.status(401).json({ error: 'Unauthorized' })
    }
  } catch (error: any) {
    res
      .status(error?.response?.status || 500)
      .json(error?.response?.data || error)
  }
}

const makePrimary = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.headers.cookie?.includes('connect.sid')) {
      const { id, phoneId } = req.query

      await axios.patch(
        `${DOTCOM_URL}api/accounts/${id}/phone-numbers/${phoneId}`,
        req.body,
        {
          headers: { cookie: req.headers.cookie },
        },
      )
      res.status(204).json({})
    } else {
      res.status(401).json({ error: 'Unauthorized' })
    }
  } catch (error: any) {
    res
      .status(error?.response?.status || 500)
      .json(error?.response?.data || error)
  }
}

export default function phoneNumberHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case 'GET':
      return PhoneNumbers(req, res)
    case 'DELETE':
      return removePhoneNumber(req, res)
    case 'POST':
      return addPhoneNumber(req, res)
    case 'PATCH':
      return makePrimary(req, res)
  }
}
