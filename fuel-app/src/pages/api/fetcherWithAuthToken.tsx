import axios from 'axios'
import { generateToken } from 'src/utils/api/token'
import logger from 'src/logger'
class FetcherWithAuthToken {
  token = ''
  CorrelationId = ''

  constructor() {
    this.updateToken()
  }

  updateToken = async (forceToken = false) => {
    logger.info(`generate token method is called`)
    if (!this.token || forceToken) {
      try {
        logger.info(`generate token because token is empty or expired`)
        const tokenDetails = await generateToken()
        logger.info(
          `generate token response ${JSON.stringify(tokenDetails?.data || {})}`,
        )
        const accessToken = tokenDetails?.data?.oauth?.accessToken
        const apgcorrelationid = tokenDetails?.headers?.apgcorrelationid
        this.token = accessToken
        this.CorrelationId = apgcorrelationid
      } catch (error: any) {
        logger.error(
          `generate token error response ${JSON.stringify(
            error?.response || {},
          )}`,
        )
      }
    }
  }

  get = async (
    url: string,
    headers = {},
    fetchNewToken = true,
    // baseUrl = 'https://qat04.frontier.com/',
    baseUrl = process.env.APIGEE_BASE_URL,
  ): Promise<any> => {
    await this.updateToken(true)
    logger.info(`fetcher with get token is updated`)
    try {
      const APIGEE_BASE_URL = `${baseUrl}${url}`
      logger.info(`fetcher with get called ${APIGEE_BASE_URL}`)
      const response = await axios.get(APIGEE_BASE_URL, {
        headers: {
          Authorization: 'Bearer ' + this.token,
          apikey: process.env.APIGEE_API_KEY || '',
          ...(headers || {}),
        },
      })
      logger.info(
        `fetcher with get response ${JSON.stringify(response?.data || {})}`,
      )
      return response
    } catch (error: any) {
      logger.error(
        `fetcher with get error ${JSON.stringify(error?.response?.data || {})}`,
      )
      if (error?.response?.status === 401) {
        if (fetchNewToken) {
          await this.updateToken(true)
          return this.get(url, headers, false, baseUrl)
        }
      }
      throw error
    }
  }

  post = async (
    url: string,
    body = {},
    headers = {},
    fetchNewToken = true,
    baseUrl = process.env.APIGEE_BASE_URL,
  ): Promise<any> => {
    await this.updateToken(true)
    logger.info(`fetcher with post token is updated`)
    try {
      const APIGEE_BASE_URL = `${baseUrl}${url}`
      logger.info(`fetcher with post called ${APIGEE_BASE_URL}`)
      const response = await axios.post(APIGEE_BASE_URL, body, {
        headers: {
          Authorization: 'Bearer ' + this.token,
          apikey: process.env.APIGEE_API_KEY || '',
          CorrelationId: this.CorrelationId || '',
          ...(headers || {}),
        },
      })
      logger.info(
        `fetcher with post response ${JSON.stringify(response?.data || {})}`,
      )
      return response
    } catch (error: any) {
      logger.error(
        `fetcher with post error ${JSON.stringify(
          error?.response?.data || {},
        )}`,
      )
      if (error?.response?.status === 401) {
        if (fetchNewToken) {
          await this.updateToken(true)
          return this.post(url, body, headers, false, baseUrl)
        }
      }
      throw error
    }
  }

  patch = async (
    url: string,
    body = {},
    headers = {},
    fetchNewToken = true,
    baseUrl = process.env.APIGEE_BASE_URL,
  ): Promise<any> => {
    await this.updateToken()
    logger.info(`fetcher with put token is updated`)
    try {
      const APIGEE_BASE_URL = `${baseUrl}${url}`
      logger.info(`fetcher with patch called ${APIGEE_BASE_URL}`)
      const response = await axios.patch(APIGEE_BASE_URL, body, {
        headers: {
          Authorization: 'Bearer ' + this.token,
          apikey: process.env.APIGEE_API_KEY || '',
          CorrelationId: this.CorrelationId,
          ...(headers || {}),
        },
      })
      logger.info(
        `fetcher with patch response ${JSON.stringify(response?.data || {})}`,
      )
      return response
    } catch (error: any) {
      logger.error(
        `fetcher with patch error ${JSON.stringify(
          error?.response?.data || {},
        )}`,
      )
      if (error?.response?.status === 401) {
        if (fetchNewToken) {
          await this.updateToken(true)
          return this.put(url, body, headers, false, baseUrl)
        }
      }
      throw error
    }
  }

  put = async (
    url: string,
    body = {},
    headers = {},
    fetchNewToken = true,
    baseUrl = process.env.APIGEE_BASE_URL,
  ): Promise<any> => {
    await this.updateToken()
    logger.info(`fetcher with put token is updated`)
    try {
      const APIGEE_BASE_URL = `${baseUrl}${url}`
      logger.info(`fetcher with put called ${APIGEE_BASE_URL}`)
      const response = await axios.put(APIGEE_BASE_URL, body, {
        headers: {
          Authorization: 'Bearer ' + this.token,
          apikey: process.env.APIGEE_API_KEY || '',
          CorrelationId: this.CorrelationId,
          ...(headers || {}),
        },
      })
      logger.info(
        `fetcher with put response ${JSON.stringify(response?.data || {})}`,
      )
      return response
    } catch (error: any) {
      logger.error(
        `fetcher with put error ${JSON.stringify(error?.reponse?.data || {})}`,
      )
      if (error?.response?.status === 401) {
        if (fetchNewToken) {
          await this.updateToken(true)
          return this.put(url, body, headers, false, baseUrl)
        }
      }
      throw error
    }
  }

  delete = async (
    url: string,
    headers = {},
    fetchNewToken = true,
    baseUrl = process.env.APIGEE_BASE_URL,
  ): Promise<any> => {
    await this.updateToken()
    logger.info(`fetcher with delete token is updated`)
    try {
      const APIGEE_BASE_URL = `${baseUrl}${url}`
      logger.info(`fetcher with put called ${APIGEE_BASE_URL}`)
      const response = await axios.delete(APIGEE_BASE_URL, {
        headers: {
          Authorization: 'Bearer ' + this.token,
          apikey: process.env.APIGEE_API_KEY || '',
          CorrelationId: this.CorrelationId,
          ...(headers || {}),
        },
      })
      logger.info(
        `fetcher with delete response ${JSON.stringify(response?.data || {})}`,
      )
      return response
    } catch (error: any) {
      logger.error(
        `fetcher with delete error ${JSON.stringify(
          error?.response?.data || {},
        )}`,
      )
      if (error?.response?.status === 401) {
        if (fetchNewToken) {
          await this.updateToken(true)
          return this.get(url, headers, false, baseUrl)
        }
      }
      throw error
    }
  }
}

const fetcher = new FetcherWithAuthToken()

export default fetcher
