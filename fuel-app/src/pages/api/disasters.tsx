import type { NextApiRequest, NextApiResponse } from 'next'
import fetcher from './fetcherWithAuthToken'

const CALIFORNIA_API_SECRET = process.env.CALIFORNIA_API_SECRET || ''

const CALIFORNIA_API_KEY = process.env.CALIFORNIA_API_KEY || ''

const header = {
  Authorization: `Basic ${CALIFORNIA_API_SECRET}`,
  apikey: CALIFORNIA_API_KEY,
}

const getDisasters = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await fetcher.get('pucalerts/v1/disasters', header)
    return res.status(200).json(response.data)
  } catch (error) {
    res.status(500).json({ error })
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return getDisasters(req, res)
}
