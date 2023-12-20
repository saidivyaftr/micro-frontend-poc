import type { NextApiRequest, NextApiResponse } from 'next'
import { generateJWT } from 'src/utils/api/token'
import axios from 'axios'
const getEquipments = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query
    const { username = '', password = '' } = req.body
    if (!username || !password)
      res.status(400).json({
        message: 'username and password is required',
      })
    const baseUrl = process.env.APIGEE_BASE_URL
    const { data: tokenResponse } = await generateJWT(username, password)
    const profileAccessToken = tokenResponse?.access_token

    const response = await axios.get(
      `${baseUrl}myfrontier/v3/accounts/${id}/equipment`,
      {
        headers: {
          Authorization: 'Bearer ' + profileAccessToken,
          apikey: process.env.API___URL || '',
        },
      },
    )
    res.status(200).json(response.data || [])
  } catch (error: any) {
    res
      .status(error?.response?.status || 500)
      .json(error?.response?.data || error)
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return getEquipments(req, res)
}
