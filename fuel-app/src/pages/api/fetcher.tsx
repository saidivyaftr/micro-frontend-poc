import axios from 'axios'
import logger from 'src/logger'
import { v4 as uuidv4 } from 'uuid'

class FetcherWithoutAuthToken {
  CorrelationId = ''
  constructor() {
    this.CorrelationId = uuidv4()
  }

  get = async (
    url: string,
    headers = {},
    baseUrl = process.env.APIGEE_BASE_URL,
  ): Promise<any> => {
    try {
      const APIGEE_BASE_URL = `${baseUrl}${url}`
      logger.info(`fetcher: get called ${APIGEE_BASE_URL}`)
      const response = await axios.get(APIGEE_BASE_URL, {
        headers: {
          apikey: process.env.APIGEE_API_KEY || '',
          CorrelationId: this.CorrelationId,
          ...(headers || {}),
        },
      })
      logger.info(
        `fetcher: get response ${JSON.stringify(response?.data || {})}`,
      )
      return response
    } catch (error: any) {
      logger.error(
        `fetcher: get error ${JSON.stringify(error?.response?.data || {})}`,
      )
      throw error
    }
  }

  post = async (
    url: string,
    body = {},
    headers = {},
    baseUrl = process.env.APIGEE_BASE_URL,
  ): Promise<any> => {
    try {
      const APIGEE_BASE_URL = `${baseUrl}${url}`
      logger.info(`fetcher: post called ${APIGEE_BASE_URL}`)
      const response = await axios.post(APIGEE_BASE_URL, body, {
        headers: {
          apikey: process.env.APIGEE_API_KEY || '',
          CorrelationId: this.CorrelationId,
          ...(headers || {}),
        },
      })
      logger.info(
        `fetcher: post response ${JSON.stringify(response?.data || {})}`,
      )
      return response
    } catch (error: any) {
      logger.error(
        `fetcher: post error ${JSON.stringify(error?.response?.data || {})}`,
      )
      throw error
    }
  }

  patch = async (
    url: string,
    body = {},
    headers = {},
    baseUrl = process.env.APIGEE_BASE_URL,
  ): Promise<any> => {
    try {
      const APIGEE_BASE_URL = `${baseUrl}${url}`
      logger.info(`fetcher: patch called ${APIGEE_BASE_URL}`)
      const response = await axios.patch(APIGEE_BASE_URL, body, {
        headers: {
          apikey: process.env.APIGEE_API_KEY || '',
          CorrelationId: this.CorrelationId,
          ...(headers || {}),
        },
      })
      logger.info(
        `fetcher: patch response ${JSON.stringify(response?.data || {})}`,
      )
      return response
    } catch (error: any) {
      logger.error(
        `fetcher: patch error ${JSON.stringify(error?.response?.data || {})}`,
      )
      throw error
    }
  }

  put = async (
    url: string,
    body = {},
    headers = {},
    baseUrl = process.env.APIGEE_BASE_URL,
  ): Promise<any> => {
    try {
      const APIGEE_BASE_URL = `${baseUrl}${url}`
      logger.info(`fetcher: put called ${APIGEE_BASE_URL}`)
      const response = await axios.put(APIGEE_BASE_URL, body, {
        headers: {
          apikey: process.env.APIGEE_API_KEY || '',
          CorrelationId: this.CorrelationId,
          ...(headers || {}),
        },
      })
      logger.info(
        `fetcher: put response ${JSON.stringify(response?.data || {})}`,
      )
      return response
    } catch (error: any) {
      logger.error(
        `fetcher: put error ${JSON.stringify(error?.reponse?.data || {})}`,
      )
      throw error
    }
  }

  delete = async (
    url: string,
    headers = {},
    baseUrl = process.env.APIGEE_BASE_URL,
  ): Promise<any> => {
    try {
      const APIGEE_BASE_URL = `${baseUrl}${url}`
      logger.info(`fetcher: put called ${APIGEE_BASE_URL}`)
      const response = await axios.delete(APIGEE_BASE_URL, {
        headers: {
          apikey: process.env.APIGEE_API_KEY || '',
          CorrelationId: this.CorrelationId,
          ...(headers || {}),
        },
      })
      logger.info(
        `fetcher: delete response ${JSON.stringify(response?.data || {})}`,
      )
      return response
    } catch (error: any) {
      logger.error(
        `fetcher: delete error ${JSON.stringify(error?.response?.data || {})}`,
      )
      throw error
    }
  }
}

const fetcher = new FetcherWithoutAuthToken()

export default fetcher
