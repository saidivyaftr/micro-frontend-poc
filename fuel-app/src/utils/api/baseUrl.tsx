import { DOMAIN_URLS } from 'src/constants'

const getFrontierBaseUrl = (
  hostname = '',
  defaultUrl = process.env.DOTCOM_URL,
) => {
  if (hostname?.includes(DOMAIN_URLS.qat01)) {
    return DOMAIN_URLS.BASE_URL_QAT01
  }
  if (hostname?.includes(DOMAIN_URLS.qat02)) {
    return DOMAIN_URLS.BASE_URL_QAT02
  }
  if (hostname?.includes(DOMAIN_URLS.qat03)) {
    return DOMAIN_URLS.BASE_URL_QAT03
  }
  if (hostname?.includes(DOMAIN_URLS.qat04)) {
    return DOMAIN_URLS.BASE_URL_QAT04
  }
  return defaultUrl
}

export default getFrontierBaseUrl
