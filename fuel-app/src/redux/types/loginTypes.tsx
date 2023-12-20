export type Login = {
  step: LoginStep
  isLoading: boolean
  failedReason?: ApiErrorCode
  failedLoginCount?: number
}

type LoginStep = 'SIGN_IN' | 'FORGOT_EMAIL' | 'CONFIRM_MOBILE_OTP'

type ApiErrorCode = 'ACCOUNT_LOCKED' | 'INVALID_LOGIN' | 'API_ERROR' | undefined

export type LoginBody = {
  loginId: string
  password: string
  rememberMe: boolean
  token: string
}
