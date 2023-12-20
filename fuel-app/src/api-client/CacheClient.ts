import axios from 'axios'
import { decryptPayload, encryptPayload } from 'src/utils/secure'

export const axiosWithCache = (
  url: string,
  options?: any,
  forceFetch = false,
) => {
  const apiPath = getAPIPath(url)
  if (!forceFetch) {
    const cachedData = getCache(apiPath || '')
    if (cachedData) {
      return { data: cachedData }
    }
  }
  return axios.get(url, options).then((response) => {
    if (apiPath) {
      if (isEmpty(response.data)) {
        removeCache(apiPath)
      } else {
        setCache(apiPath, response.data)
      }
    }
    return response
  })
}

const getCache = (apiPath: string) => {
  try {
    const cachedData = sessionStorage.getItem(apiPath)
    if (cachedData) {
      const decryptedData = decryptPayload(cachedData)
      return JSON.parse(decryptedData)
    }
  } catch (error) {}
  return null
}

const setCache = (apiPath: string, data: any) => {
  try {
    const encryptedData = encryptPayload(JSON.stringify(data))
    sessionStorage.setItem(apiPath, encryptedData)
  } catch (error) {}
}

const removeCache = (apiPath: string) => {
  try {
    sessionStorage.removeItem(apiPath)
  } catch (error) {}
}

const isEmpty = (data: any) => {
  if (Array.isArray(data)) {
    return data.length === 0
  }
  if (typeof data === 'object') {
    return Object.keys(data).length === 0
  }
  return !Boolean(data)
}

const getAPIPath = (url: string) => {
  const match = url.match(/\/api(.*)/)
  return match ? match[1] : null
}
