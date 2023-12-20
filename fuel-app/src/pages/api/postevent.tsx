import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const APIGEE_BASE_URL = process.env.APIGEE_BASE_URL || ''
const CALIFORNIA_API_KEY = process.env.CALIFORNIA_API_KEY || ''
const CALIFORNIA_API_SECRET = process.env.CALIFORNIA_API_SECRET || ''
const postEvent = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const body = req.body
    const header = req.body.header

    const extraHeaders = {
      eventName: header?.name,
      domain: header?.domain,
      subDomain: header?.subdomain,
      source: header?.source,
      dateTime: header?.dateTime,
      messageId: header?.messageId,
    }

    const response = await axios.post(
      `${APIGEE_BASE_URL}event/v1/events`,
      body,
      {
        headers: {
          ...extraHeaders,
          apikey: `${CALIFORNIA_API_KEY}`,
          Authorization: `Basic ${CALIFORNIA_API_SECRET}`,
          'content-type': 'application/json',
        },
      },
    )
    return res.status(200).json(response?.data)
  } catch (error) {
    res.status(500).json({ error })
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return postEvent(req, res)
}
