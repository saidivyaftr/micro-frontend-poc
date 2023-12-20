import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import getFrontierBaseUrl from 'src/utils/api/baseUrl'
// import profile from './helperProfileData'

const koreConfig = {
  KORE_APP_CLIENT_ID: process.env.KORE_APP_CLIENT_ID,
  KORE_APP_CLIENT_SECRET: process.env.KORE_APP_CLIENT_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRE || 15 * 60 * 1000,
  BOT_ID: process.env.BOT_ID,
}

const koreGenerateUUID = () => {
  let d = new Date().getTime()
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function (c) {
      const r = (d + Math.random() * 16) % 16 | 0
      d = Math.floor(d / 16)
      return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
    },
  )
  return uuid
}
const validateUUID = (str: string) => {
  const UUIDRegex =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/
  return !!UUIDRegex.test(str)
}

const getUUID = (identity: string) => {
  return validateUUID(identity) ? identity : koreGenerateUUID()
}
const getIdentity = async (req: NextApiRequest) => {
  try {
    const FRONTIER_API_URL = getFrontierBaseUrl(req?.headers?.host)
    const response = await axios.get(`${FRONTIER_API_URL}api/session`, {
      headers: { cookie: req?.headers?.cookie },
    })
    const profileEmail = response?.data?.frontierId?.email
    if (profileEmail && profileEmail != 'virtual_fid@ftr.com') {
      return profileEmail
    } else {
      return getUUID(req?.body?.identity)
    }
  } catch (error: any) {
    return getUUID(req?.body?.identity)
  }
}

const getChat = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const identity = await getIdentity(req)
    if (identity) {
      const isAnonymous = req.body.isAnonymous || false
      const aud = req.body.aud || 'https://idproxy.koreConfig.com/authorize'
      const options = {
        iat: new Date().getTime(),
        exp: new Date(
          new Date().getTime() + parseInt(koreConfig.JWT_EXPIRE.toString()),
        ).getTime(),
        aud: aud,
        iss: koreConfig.KORE_APP_CLIENT_ID,
        sub: identity,
        isAnonymous: isAnonymous,
      }
      const secret: any = koreConfig.KORE_APP_CLIENT_SECRET
      const token = jwt.sign(options, secret)
      res.send({
        jwt: token,
        identity: identity,
        botID: koreConfig.BOT_ID,
      })
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return getChat(req, res)
}
