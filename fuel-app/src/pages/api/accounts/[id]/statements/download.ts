import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
export default async function downloadBill(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== 'POST') {
      const notAllowed = { statusCode: 405, message: 'Method Not Allowed' }
      return res.end(JSON.stringify(notAllowed || {}))
    }
    if (req.headers.cookie?.includes('connect.sid')) {
      const { pdfLink } = req.body
      if (!pdfLink) {
        const pdfLink = { statusCode: 400, message: 'Link is empty' }
        return res.end(JSON.stringify(pdfLink || {}))
      }
      const url = pdfLink
      const response = await axios.get(url, {
        responseType: 'arraybuffer',
      })
      return res.status(200).send(response.data)
    } else {
      res.status(401).json({ error: 'Unauthorized' })
    }
  } catch (error: any) {
    res
      .status(error?.response?.status || 500)
      .json(error?.response?.data || error)
  }
}
