import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

const DOTCOM_URL = process.env.DOTCOM_URL || ''

const setupAutoPay = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.headers.cookie?.includes('connect.sid')) {
      const { id } = req.query
      const response = await axios.post(
        `${DOTCOM_URL}api/accounts/${id}/autopay`,
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

const updateAutoPay = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.headers.cookie?.includes('connect.sid')) {
      const { id } = req.query
      const response = await axios.put(
        `${DOTCOM_URL}api/accounts/${id}/autopay`,
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

const getAutoPayDetails = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.headers.cookie?.includes('connect.sid')) {
      const { id, type } = req.query
      const response = await axios.get(
        `${DOTCOM_URL}api/accounts/${id}/autopay?type=${type}`,
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

const deleteAutoPay = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.headers.cookie?.includes('connect.sid')) {
      const { id, autoPayId } = req.query
      const response = await axios.delete(
        `${DOTCOM_URL}api/accounts/${id}/autopay/${autoPayId}`,
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

export default function autoPayHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case 'GET':
      return getAutoPayDetails(req, res)
    case 'POST':
      return setupAutoPay(req, res)
    case 'PUT':
      return updateAutoPay(req, res)
    case 'DELETE':
      return deleteAutoPay(req, res)
  }
}
