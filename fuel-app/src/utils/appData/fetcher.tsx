import dataParser from './data-parser'
export const SITECORE_API_URL = process.env.SITECORE_API_URL
const CDN_URL = process.env.CDN_URL
const API_TOKEN = process.env.SITECORE_API_KEY

const fetchJson = async (url = '', returnDirty: boolean) => {
  try {
    const res = await fetch(url)
    const appDataContent = await res.json()
    if (returnDirty) {
      return {
        items: appDataContent?.sitecore?.route?.placeholders?.json || [],
        parsed: dataParser(appDataContent),
        addBottomSpace:
          appDataContent?.sitecore?.route?.fields?.addBottomSpace || {},
      }
    }
    const parsed = dataParser(appDataContent)
    return parsed
  } catch (err) {
    console.log('line 25 error', err)
    return {}
  }
}
export const fetchAppData = async (
  itemId: string,
  returnDirty = false,
  locale = 'en',
  placeholderName = '',
) => {
  const fetchUrl = `${SITECORE_API_URL}/sitecore/api/layout/render/jss?item=${itemId.replace(
    /\//g,
    '%2F',
  )}&sc_apikey=${API_TOKEN}&sc_lang=${locale}&placeholderName=${placeholderName}`
  return await fetchJson(fetchUrl, returnDirty)
}

export const fetchAppDataFromAzure = async (
  itemId: string,
  returnDirty = false,
) => {
  const fetchUrl = `${CDN_URL}/jss${itemId}.json`
  return await fetchJson(fetchUrl, returnDirty)
}

export const fetchPlaceholderData = async (
  itemId: string,
  locale = 'en',
  placeholderName = '',
) => {
  const fetchUrl = `${SITECORE_API_URL}/sitecore/api/layout/placeholder/jss?item=${itemId}&sc_apikey=${API_TOKEN}&sc_lang=${locale}&placeholderName=${placeholderName}`
  try {
    const res = await fetch(fetchUrl)
    const placeholderContent = await res.json()
    return placeholderContent?.elements?.[0]?.fields?.data
  } catch (err) {
    console.log('line 41 error', err)
    return null
  }
}
