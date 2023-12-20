import type { NextApiRequest, NextApiResponse } from 'next'
import fetcher from '../fetcherApi'

const EmailExists = async (req: NextApiRequest, res: NextApiResponse) => {
  const shouldMockAPI = req?.headers?.referer?.includes('mock-register')
  if (shouldMockAPI) {
    return res.status(200).json({ isRegistered: false })
  }
  const isRegistered = await checkIsEmailAlreadyRegistered(req.body.email ?? '')
  return res.status(200).json({ isRegistered })
}

const checkIsEmailAlreadyRegistered = async (email: string) => {
  try {
    const verifyDigitalIdentityEndpoint = `frontieridentity/v1/profile/${email}`
    await fetcher.get(verifyDigitalIdentityEndpoint)
    return false
  } catch (error) {
    return true
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return EmailExists(req, res)
}
