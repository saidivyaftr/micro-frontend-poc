import type { NextApiRequest, NextApiResponse } from 'next'
import getFrontierBaseUrl from 'src/utils/api/baseUrl'
import { STATUS_CODES } from 'src/constants'
import fetcher from './fetcherWithAuthToken'
import verifyRecaptcha from 'src/utils/api/validateCaptcha'
import logger from 'src/logger'
import { generateStars } from 'src/utils/register'
import nookies from 'nookies'
import { generateJWT } from 'src/utils/api/token'

const loginForm = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const loggerBody = { ...req.body }
    loggerBody.password = generateStars(loggerBody.password)
    logger.info(`Login request body: ${JSON.stringify(loggerBody)}`)

    const isCaptchaValid = await validateCaptcha(req)
    if (!isCaptchaValid) {
      logger.error(`Login captcha validation failed  for ${req.body.loginId}`)
      return res.status(STATUS_CODES.FORBIDDEN).json(
        JSON.stringify({
          message: 'Invalid Captcha',
        }),
      )
    }
    logger.info(`Login captcha is successful for ${req.body.loginId}`)

    const FRONTIER_API_URL = getFrontierBaseUrl(req?.headers?.host)
    console.log(FRONTIER_API_URL)
    const response: any = await fetcher.post(
      'api/login',
      req.body,
      {
        common: {
          ['User-Agent']: req?.headers?.['user-agent'],
        },
      },
      true,
      FRONTIER_API_URL,
    )
    logger.info(
      `Login is successful for ${req.body.loginId} - ${JSON.stringify(
        response.data,
      )}`,
    )

    // Setting cookies
    const { data: tokens } = await generateJWT(
      req.body.loginId,
      req.body.password,
    )
    const setCookies = response?.headers?.['set-cookie']
    nookies.set({ res }, 'refresh_token', tokens?.refresh_token, {
      httpOnly: true,
      path: '/',
      maxAge: 1440 * 60 * 1000,
    })
    nookies.set({ res }, 'access_token', tokens?.access_token, {
      httpOnly: true,
      path: '/',
      maxAge: 1440 * 60 * 1000,
    })
    const newAccesstokenCoookies = res.getHeader('set-cookie')
    let newCookie: any[] = []
    if (Array.isArray(newAccesstokenCoookies))
      newCookie = [...setCookies, ...newAccesstokenCoookies]

    // Returning response
    logger.info(`Login cookie is set for ${req.body.loginId}`)
    await res.writeHead(200, { 'Set-Cookie': newCookie })
    return res.end(JSON.stringify(response?.data || {}))
  } catch (error: any) {
    logger.error(
      `Login is failed for ${req.body.loginId} - ${JSON.stringify(error)}`,
    )
    res
      .status(error?.response?.status || STATUS_CODES.SERVER_ERROR)
      .json(JSON.stringify(error?.response?.data || {}))
  }
}

const validateCaptcha = async (req: NextApiRequest) => {
  const skipCaptchaValidation = process.env.SKIP_VALIDATE_CAPTCHA

  const skipCaptcha =
    skipCaptchaValidation === 'true' &&
    req.body.skipCaptcha &&
    req.body.skipCaptcha === 'true'

  if (skipCaptcha) {
    logger.info(
      `Login captcha validation will be skipped for ${req.body.loginId}`,
    )
    return true
  }
  return await verifyRecaptcha(req.body.token)
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return loginForm(req, res)
}
