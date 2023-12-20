import axios from 'axios'
import moment, { Moment } from 'moment'
import type { NextApiResponse } from 'next'
import { parseCookies, setCookie } from 'nookies'

export const generateToken = async () => {
  const BASE_URL = process.env.APIGEE_BASE_URL
  const APIGEE_API_KEY = process.env.APIGEE_API_KEY
  const APIGEE_API_SECRET = process.env.APIGEE_API_SECRET
  console.log(
    process.env.APIGEE_BASE_URL,
    process.env.APIGEE_API_KEY,
    process.env.APIGEE_API_SECRET,
  )
  return axios.get(
    `${BASE_URL}oauth/v1/accesstoken?grant_type=client_credentials`,
    {
      auth: {
        username: APIGEE_API_KEY || '',
        password: APIGEE_API_SECRET || '',
      },
    },
  )
}

export const generateJWT = async (username: string, password: string) => {
  const BASE_URL = process.env.APIGEE_BASE_URL
  const APIGEE_API_KEY = process.env.APIGEE_API_KEY
  const APIGEE_API_SECRET = process.env.APIGEE_API_SECRET
  const body = {
    client_id: APIGEE_API_KEY || '',
    client_secret: APIGEE_API_SECRET || '',
    grant_type: 'password',
    username: username,
    password: password,
  }
  const serializedData = new URLSearchParams(body)
  return axios.post(`${BASE_URL}frontieridentity/v1/token`, serializedData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
}

const setCookies = async (ctx: any, cookiesData: any) => {
  setCookie({ res: ctx }, 'refresh_token', cookiesData.refresh_token, {
    httpOnly: true,
    path: '/',
    maxAge: 1440 * 60 * 1000,
  })
  setCookie({ res: ctx }, 'access_token', cookiesData.access_token, {
    httpOnly: true,
    path: '/',
    maxAge: 1440 * 60 * 1000,
  })
}

export const refreshJWT = async (ctx: NextApiResponse) => {
  try {
    const { refresh_token } = parseCookies(ctx)
    const BASE_URL = process.env.APIGEE_BASE_URL
    const APIGEE_API_KEY = process.env.APIGEE_API_KEY
    const APIGEE_API_SECRET = process.env.APIGEE_API_SECRET
    const body = {
      client_id: APIGEE_API_KEY || '',
      client_secret: APIGEE_API_SECRET || '',
      grant_type: 'refresh_token',
      refresh_token: refresh_token,
    }
    const serializedData = new URLSearchParams(body)
    const response = await axios.post(
      `${BASE_URL}frontieridentity/v1/token`,
      serializedData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )

    await setCookies(ctx, response?.data)
    return { status: response?.status, data: response?.data }
  } catch (error: any) {
    return { status: error?.response.status, data: error?.response.data }
  }
}

export const ValidateAuthToken = async (authToken: string) => {
  try {
    const APIGEE_BASE_URL = process.env.APIGEE_BASE_URL
    const endpoint = 'cssvalidateauthorization/v1/validate/authorizationtoken'
    const body = {
      authorizationToken: authToken,
    }
    const headers = {
      'content-type': 'application/json',
      Accept: 'application/json',
      ApplicationName: 'frontierdotcom',
      Username: 'dotcom',
    }
    const tokenDetails = await generateToken()
    const accessToken = tokenDetails?.data?.oauth?.accessToken
    const apgcorrelationid = tokenDetails?.headers?.apgcorrelationid

    const response = await axios.post(`${APIGEE_BASE_URL}${endpoint}`, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        CorrelationId: apgcorrelationid,
        ...(headers || {}),
      },
    })
    return response
  } catch (error: any) {
    console.log('ValidateTokenERROR', error)
  }
}

export const checkTokenExpired = (start: Moment, end: Moment) => {
  try {
    const MAX_TIME = 600 // ten minutes
    const diff = end.diff(start)
    return moment.duration(diff).asSeconds() > MAX_TIME
  } catch {
    //if breaks return true
    return true
  }
}

export const getCurrentTime = () => moment()
