import { LoginBody } from 'src/redux/types/loginTypes'
import { setCookie, destroyCookie } from 'nookies'
import APIClient from 'src/api-client'
import { THIRTY_DAYS, AppRoutes } from 'src/constants'
import { formatUrl } from 'src/utils/urlHelpers'
import { encryptPayload } from 'src/utils/secure'

export const login = async (
  values: LoginBody,
  successCallback?: () => void,
  loginType?: string,
) => {
  const isChatOpen = localStorage.getItem('isChatOpen')
  const localStorageRedirect = localStorage.getItem('redirectTo')
  sessionStorage.clear()
  localStorage.clear()
  // Erase all storage, but persist these items
  // so that chat will open after login and redirect correctly when required.
  if (isChatOpen) localStorage.setItem('isChatOpen', isChatOpen)
  if (localStorageRedirect)
    localStorage.setItem('redirectTo', localStorageRedirect)
  const { data: result } = await APIClient.login(values)
  const accountUuid = result?.accountUuid
  sessionStorage.setItem('uuid', encryptPayload(accountUuid))
  let verificationStatus, isAllVerified
  if (accountUuid) {
    try {
      const { data: verifyData } = await APIClient.getVerificationStatus({
        uuid: accountUuid,
      })
      verificationStatus = verifyData
      isAllVerified = [
        'NO_VERIFICATION_REQUIRED',
        'PRIMARY_LOGIN_EMAIL_VERIFIED',
      ].includes(verificationStatus.status)
    } catch (error: any) {
      isAllVerified = true
    }
  } else {
    isAllVerified = true
  }

  document.cookie =
    'frontierLogin=' +
    (loginType || 'login page') +
    '|' +
    encodeURIComponent(window.location.href) +
    '|' +
    new Date().getTime() +
    '; path=/; domain=.frontier.com'
  if (successCallback) {
    successCallback()
  }
  //adding 30 day persistent login cookie
  const expiration_date: any = new Date()
  expiration_date.setDate(expiration_date.getDate() + 30)
  document.cookie =
    'frontierLogin30Day=true; path=/; expires=' +
    expiration_date.toGMTString() +
    '; path=/; domain=.frontier.com'
  if (values?.rememberMe) {
    setCookie(null, 'loginId', encodeURI(values.loginId), {
      maxAge: THIRTY_DAYS,
    })
  } else {
    destroyCookie(null, 'loginId')
  }

  if (!isAllVerified) {
    sessionStorage.setItem('loginId', encryptPayload(values.loginId))
    window.location.href = formatUrl('/contact-verification')
    return
  } else {
    const redirectTo =
      localStorageRedirect || result?.redirectTo || AppRoutes.AccountPage
    localStorage.removeItem('redirectTo')
    window.location.href = formatUrl(redirectTo ?? '/')
    return
  }
}
