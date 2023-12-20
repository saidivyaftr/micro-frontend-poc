import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import profileInfo from './helperProfileData'

const DOTCOM_URL = process.env.DOTCOM_URL || ''
const getProfile = async (req: NextApiRequest, res: NextApiResponse) => {
  let info = {}
  try {
    if (req.headers.cookie?.includes('connect.sid')) {
      const details = await axios.get(`${DOTCOM_URL}api/profile`, {
        headers: { cookie: req.headers.cookie },
      })
      info = details?.data || {}
      profileInfo.setInfo(info)
      return res.status(200).json(details?.data)
    } else {
      profileInfo.setInfo(info)
      return res.status(401).json({
        error: 'Unauthorized',
      })
    }
  } catch (error: any) {
    profileInfo.setInfo(info)
    return res
      .status(error?.statusCode || error?.response?.status || 500)
      .json(error?.response?.data)
  }
}

const postProfile = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.headers.cookie?.includes('connect.sid')) {
      const details = await axios.post(`${DOTCOM_URL}api/profile`, req.body, {
        headers: { cookie: req.headers.cookie },
      })
      return res.status(200).json(details?.data)
    } else {
      return res.status(401).json({
        error: 'Unauthorized',
      })
    }
  } catch (error: any) {
    return res
      .status(error?.statusCode || error?.response?.status || 500)
      .json(error?.response?.data)
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getProfile(req, res)
    case 'POST':
      return postProfile(req, res)
    default:
      return getProfile(req, res)
  }
}
