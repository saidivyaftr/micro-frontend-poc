import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

const DOTCOM_URL = process.env.DOTCOM_URL || ''

const emailAddresses = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.headers.cookie?.includes('connect.sid')) {
      const { id } = req.query
      const { data = {} } = await axios.get(
        `${DOTCOM_URL}api/accounts/${id}/email-addresses`,
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

const removeEmailAddress = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    if (req.headers.cookie?.includes('connect.sid')) {
      const { id, emailId } = req.query
      console.log(`${DOTCOM_URL}api/accounts/${id}/email-addresses/${emailId}`)

      const { data = {} } = await axios.delete(
        `${DOTCOM_URL}api/accounts/${id}/email-addresses/${emailId}`,
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

const addEmailAddress = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.headers.cookie?.includes('connect.sid')) {
      const { id } = req.query
      const { data = {} } = await axios.post(
        `${DOTCOM_URL}api/accounts/${id}/email-addresses`,
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

const makeEmailPrimary = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.headers.cookie?.includes('connect.sid')) {
      const { id, emailId } = req.query
      await axios.patch(
        `${DOTCOM_URL}api/accounts/${id}/email-addresses/${emailId}`,
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

export default function emailAddressHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case 'GET':
      return emailAddresses(req, res)
    case 'DELETE':
      return removeEmailAddress(req, res)
    case 'POST':
      return addEmailAddress(req, res)
    case 'PATCH':
      return makeEmailPrimary(req, res)
  }
}
