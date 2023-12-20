import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

const DOTCOM_URL = process.env.DOTCOM_URL || ''

export default async function getConstantsByLang(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.headers.cookie?.includes('connect.sid')) {
      const { language, type } = req.query
      const response = await axios.get(
        `${DOTCOM_URL}api/constants/${language}/${type}.lang.json`,
        {
          headers: { cookie: req.headers.cookie },
        },
      )
      res.status(200).json(response?.data)
    } else {
      res.status(401).json({ error: 'Unauthorized' })
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}
