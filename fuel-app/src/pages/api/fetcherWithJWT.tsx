import axios from 'axios'
import { refreshJWT } from 'src/utils/api/token'
import logger from 'src/logger'
import { v4 as uuidv4 } from 'uuid'
import { parseCookies } from 'nookies'
import jwt_decode from 'jwt-decode'

class FetcherWithJWT {
  token = ''
  constructor() {
    this.updateToken(false, {})
  }

  updateToken = async (forceToken = false, ctx: any) => {
    logger.info(`refresh JWT method is called`)
    if (forceToken) {
      try {
        logger.info(`refresh JWT because forced or expired`)
        const refreshed = await refreshJWT(ctx)
        if (refreshed?.status === 200) {
          this.token = refreshed?.data.access_token
          //return refreshed
        }
      } catch (error: any) {
        logger.error(
          `generate JWT error response ${JSON.stringify(
            error?.response || {},
          )}`,
        )
      }
    }
  }

  get = async (
    url: string,
    headers: any = {},
    forceNewToken = false,
    fetchNewToken = true,
    baseUrl = process.env.APIGEE_BASE_URL,
  ): Promise<any> => {
    const { ctx } = headers

    if (forceNewToken) {
      await this.updateToken(true, ctx)
      logger.info(`fetcher with jwt: GET, token is updated from refresh`)
    } else {
      const { access_token } = parseCookies(ctx)
      const decodedJWT: any = jwt_decode(access_token)
      if (Date.now() >= decodedJWT.exp * 1000) {
        await this.updateToken(true, ctx)
      } else {
        this.token = access_token
        logger.info(`fetcher with jwt: GET, token is updated from cookie`)
      }
    }

    try {
      const APIGEE_BASE_URL = `${baseUrl}${url}`
      logger.info(`fetcher with jwt: GET called ${APIGEE_BASE_URL}`)
      logger.info(`fetcher with jwt: GET called`)
      const response = await axios.get(APIGEE_BASE_URL, {
        headers: {
          Authorization: 'Bearer ' + this.token,
          apikey: process.env.APIGEE_API_KEY || '',
          CorrelationId: uuidv4(),
          ...(headers || {}),
        },
      })
      logger.info(
        `fetcher with jwt: GET, response ${JSON.stringify(
          response?.data || {},
        )}`,
      )
      return response
    } catch (error: any) {
      logger.error(
        `fetcher with jwt: GET, error ${JSON.stringify(
          error?.response?.data || {},
        )}`,
      )
      if (error?.response?.status === 401) {
        if (fetchNewToken) {
          await this.updateToken(true, ctx)
          return this.get(url, headers, false, false, baseUrl)
        }
      }
      throw error
    }
  }

  post = async (
    url: string,
    body = {},
    headers: any = {},
    forceNewToken = false,
    fetchNewToken = false,
    baseUrl = process.env.APIGEE_BASE_URL,
  ): Promise<any> => {
    const { ctx } = headers

    if (forceNewToken) {
      await this.updateToken(true, ctx)
      logger.info(`fetcher with jwt: get, token is updated from refresh`)
    } else {
      const { access_token } = parseCookies(ctx)
      const decodedJWT: any = jwt_decode(access_token)
      if (Date.now() >= decodedJWT.exp * 1000) {
        await this.updateToken(true, ctx)
      } else {
        this.token = access_token
        logger.info(`fetcher with jwt: get, token is updated from cookie`)
      }
    }

    try {
      const APIGEE_BASE_URL = `${baseUrl}${url}`
      logger.info(`fetcher with jwt: post, called ${APIGEE_BASE_URL}`)
      const response = await axios.post(APIGEE_BASE_URL, body, {
        headers: {
          Authorization: 'Bearer ' + this.token,
          apiKey: process.env.APIGEE_API_KEY || '',
          CorrelationId: uuidv4(),
          ...(headers || {}),
        },
      })
      logger.info(
        `fetcher with jwt: post, response ${JSON.stringify(
          response?.data || {},
        )}`,
      )
      return response
    } catch (error: any) {
      logger.error(
        `fetcher with jwt: post, error ${JSON.stringify(
          error?.response?.data || {},
        )}`,
      )
      if (error?.response?.status === 401) {
        if (fetchNewToken) {
          await this.updateToken(true, ctx)
          return this.post(url, body, headers, false, false, baseUrl)
        }
      }
      throw error
    }
  }

  put = async (
    url: string,
    body = {},
    headers: any = {},
    forceNewToken = false,
    fetchNewToken = false,
    baseUrl = process.env.APIGEE_BASE_URL,
  ): Promise<any> => {
    const { ctx } = headers

    if (forceNewToken) {
      await this.updateToken(true, ctx)
      logger.info(`fetcher with jwt: get, token is updated from refresh`)
    } else {
      const { access_token } = parseCookies(ctx)
      const decodedJWT: any = jwt_decode(access_token)
      if (Date.now() >= decodedJWT.exp * 1000) {
        await this.updateToken(true, ctx)
      } else {
        this.token = access_token
        logger.info(`fetcher with jwt: get, token is updated from cookie`)
      }
    }

    try {
      const APIGEE_BASE_URL = `${baseUrl}${url}`
      logger.info(`fetcher with jwt: PUT, called ${APIGEE_BASE_URL}`)
      const response = await axios.put(APIGEE_BASE_URL, body, {
        headers: {
          Authorization: 'Bearer ' + this.token,
          apikey: process.env.APIGEE_API_KEY || '',
          CorrelationId: uuidv4(),
          ...(headers || {}),
        },
      })
      logger.info(
        `fetcher with jwt: PUT, response ${JSON.stringify(
          response?.data || {},
        )}`,
      )
      return response
    } catch (error: any) {
      logger.error(
        `fetcher with jwt: PUT, error ${JSON.stringify(
          error?.reponse?.data || {},
        )}`,
      )
      if (error?.response?.status === 401) {
        if (fetchNewToken) {
          await this.updateToken(true, ctx)
          return this.put(url, body, headers, false, false, baseUrl)
        }
      }
      throw error
    }
  }

  delete = async (
    url: string,
    headers: any = {},
    forceNewToken = false,
    fetchNewToken = false,
    baseUrl = process.env.APIGEE_BASE_URL,
  ): Promise<any> => {
    const { ctx } = headers

    if (forceNewToken) {
      await this.updateToken(true, ctx)
      logger.info(`fetcher with jwt: DELETE, token is updated from refresh`)
    } else {
      const { access_token } = parseCookies(ctx)
      const decodedJWT: any = jwt_decode(access_token)
      if (Date.now() >= decodedJWT.exp * 1000) {
        await this.updateToken(true, ctx)
      } else {
        this.token = access_token
        logger.info(`fetcher with jwt: DELETE, token is updated from cookie`)
      }
    }

    try {
      const APIGEE_BASE_URL = `${baseUrl}${url}`
      logger.info(`fetcher with jwt: DELETE, called ${APIGEE_BASE_URL}`)
      const response = await axios.delete(APIGEE_BASE_URL, {
        headers: {
          Authorization: 'Bearer ' + this.token,
          apikey: process.env.APIGEE_API_KEY || '',
          CorrelationId: uuidv4(),
          ...(headers || {}),
        },
      })
      logger.info(
        `fetcher with jwt: DELETE, response ${JSON.stringify(
          response?.data || {},
        )}`,
      )
      return response
    } catch (error: any) {
      logger.error(
        `fetcher with jwt: DELETE, error ${JSON.stringify(
          error?.response?.data || {},
        )}`,
      )
      if (error?.response?.status === 401) {
        if (fetchNewToken) {
          await this.updateToken(true, ctx)
          return this.delete(url, headers, false, false, baseUrl)
        }
      }
      throw error
    }
  }

  patch = async (
    url: string,
    body = {},
    headers: any = {},
    forceNewToken = false,
    fetchNewToken = false,
    baseUrl = process.env.APIGEE_BASE_URL,
  ): Promise<any> => {
    const { ctx } = headers

    if (forceNewToken) {
      await this.updateToken(true, ctx)
      logger.info(`fetcher with jwt: PATCH, token is updated from refresh`)
    } else {
      const { access_token } = parseCookies(ctx)
      const decodedJWT: any = jwt_decode(access_token)
      if (Date.now() >= decodedJWT.exp * 1000) {
        await this.updateToken(true, ctx)
      } else {
        this.token = access_token
        logger.info(`fetcher with jwt: PATCH, token is updated from cookie`)
      }
    }

    try {
      const APIGEE_BASE_URL = `${baseUrl}${url}`
      logger.info(`fetcher with jwt: PATCH, called ${APIGEE_BASE_URL}`)
      const response = await axios.patch(APIGEE_BASE_URL, body, {
        headers: {
          Authorization: 'Bearer ' + this.token,
          apikey: process.env.APIGEE_API_KEY || '',
          CorrelationId: uuidv4(),
          ...(headers || {}),
        },
      })
      logger.info(
        `fetcher with jwt: PATCH, response ${JSON.stringify(
          response?.data || {},
        )}`,
      )
      return response
    } catch (error: any) {
      logger.error(
        `fetcher with jwt: PATCH, error ${JSON.stringify(
          error?.response?.data || {},
        )}`,
      )
      if (error?.response?.status === 401) {
        if (fetchNewToken) {
          await this.updateToken(true, ctx)
          return this.patch(url, body, headers, false, false, baseUrl)
        }
      }
      throw error
    }
  }
}

const fetcher = new FetcherWithJWT()

export default fetcher
