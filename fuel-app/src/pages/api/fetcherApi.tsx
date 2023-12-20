import axios from 'axios'
import {
  generateToken,
  checkTokenExpired,
  getCurrentTime,
} from 'src/utils/api/token'

type TokenType = {
  value: string
  lastUpdated: any
}

class fetcherApiToken {
  token: TokenType = {
    value: '',
    lastUpdated: '',
  }
  CorrelationId = ''

  constructor() {
    this.updateToken()
  }

  updateToken = async () => {
    const now = getCurrentTime()

    const isExpired = this.token.lastUpdated
      ? checkTokenExpired(this.token.lastUpdated, now)
      : true
    if (!this.token.value || isExpired) {
      try {
        const tokenDetails = await generateToken()
        const accessToken = tokenDetails?.data?.oauth?.accessToken
        const apgcorrelationid = tokenDetails?.headers?.apgcorrelationid
        const lastUpdated = getCurrentTime()
        this.token.value = accessToken
        this.token.lastUpdated = lastUpdated
        this.CorrelationId = apgcorrelationid
      } catch (error) {
        console.log(error)
      }
    }
  }

  get = async (
    url: string,
    headers = {},
    baseUrl = process.env.APIGEE_BASE_URL,
  ): Promise<any> => {
    await this.updateToken()
    try {
      const response = await axios.get(`${baseUrl}${url}`, {
        headers: {
          Authorization: 'Bearer ' + this.token.value,
          apikey: process.env.APIGEE_API_KEY || '',
          ...(headers || {}),
        },
      })
      return response
    } catch (error: any) {
      throw error
    }
  }

  post = async (
    url: string,
    body = {},
    headers = {},
    baseUrl = process.env.APIGEE_BASE_URL,
  ): Promise<any> => {
    await this.updateToken()
    try {
      const response = await axios.post(`${baseUrl}${url}`, body, {
        headers: {
          Authorization: 'Bearer ' + this.token.value,
          apikey: process.env.APIGEE_API_KEY || '',
          CorrelationId: this.CorrelationId,
          ...(headers || {}),
        },
      })
      return response
    } catch (error: any) {
      throw error
    }
  }

  patch = async (
    url: string,
    body = {},
    headers = {},
    baseUrl = process.env.APIGEE_BASE_URL,
  ): Promise<any> => {
    await this.updateToken()
    try {
      const response = await axios.patch(`${baseUrl}${url}`, body, {
        headers: {
          Authorization: 'Bearer ' + this.token.value,
          apikey: process.env.APIGEE_API_KEY || '',
          CorrelationId: this.CorrelationId,
          ...(headers || {}),
        },
      })
      return response
    } catch (error: any) {
      throw error
    }
  }

  put = async (
    url: string,
    body = {},
    headers = {},
    baseUrl = process.env.APIGEE_BASE_URL,
  ): Promise<any> => {
    await this.updateToken()
    try {
      const response = await axios.put(`${baseUrl}${url}`, body, {
        headers: {
          Authorization: 'Bearer ' + this.token.value,
          apikey: process.env.APIGEE_API_KEY || '',
          CorrelationId: this.CorrelationId,
          ...(headers || {}),
        },
      })
      return response
    } catch (error: any) {
      throw error
    }
  }

  delete = async (
    url: string,
    headers = {},
    baseUrl = process.env.APIGEE_BASE_URL,
  ): Promise<any> => {
    await this.updateToken()
    try {
      const response = await axios.delete(`${baseUrl}${url}`, {
        headers: {
          Authorization: 'Bearer ' + this.token.value,
          apikey: process.env.APIGEE_API_KEY || '',
          CorrelationId: this.CorrelationId,
          ...(headers || {}),
        },
      })
      return response
    } catch (error: any) {
      throw error
    }
  }
}

const fetcher = new fetcherApiToken()

export default fetcher
