import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const DOTCOM_URL = process.env.DOTCOM_URL || ''
const QuickLinksMetaData = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    if (req.headers.cookie?.includes('connect.sid')) {
      const info: any = await axios.get(`${DOTCOM_URL}api/accounts`, {
        headers: { cookie: req.headers.cookie },
      })

      const accountsDetails = info?.data
      if (accountsDetails?.length) {
        const selectedAccountId: any =
          accountsDetails?.find((a: any) => a.preferred)?.id ||
          accountsDetails[0]?.id
        if (selectedAccountId) {
          const accountDetails: any = await axios.get(
            `${DOTCOM_URL}api/accounts/${selectedAccountId}`,
            {
              headers: { cookie: req.headers.cookie },
            },
          )
          return res.status(200).json(accountDetails?.data)
        }
      } else {
        return res.status(200).json({})
      }
    } else {
      return res.status(401).json({
        error: 'Unauthorized',
      })
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return QuickLinksMetaData(req, res)
}
