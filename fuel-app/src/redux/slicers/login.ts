/* eslint-disable @typescript-eslint/indent */
import { createSlice } from '@reduxjs/toolkit'
import { Login, LoginBody } from '../types/loginTypes'
import { STATUS_CODES } from 'src/constants'
import { login } from 'src/utils/loginHelper'

const initialState: Login = {
  step: 'SIGN_IN',
  failedReason: undefined,
  failedLoginCount: 0,
  isLoading: false,
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    handleLogin: (state, action) => {
      const { type, step, failedReason, failedLoginCount, isLoading } =
        action.payload
      switch (type) {
        case 'setStep':
          return {
            ...state,
            apiError: false,
            step: step,
          }
        case 'setIsLoading':
          return {
            ...state,
            isLoading: isLoading,
          }
        case 'setApiFailure':
          return {
            ...state,
            failedReason: failedReason,
            failedLoginCount: failedLoginCount,
          }
        case 'setCaptchaFailure':
          return {
            ...state,
            failedReason: failedReason,
          }
      }
    },
  },
})

export const signInAction = (values: LoginBody) => {
  return async (dispatch: any) => {
    try {
      dispatch(
        loginSlice.actions.handleLogin({
          type: 'setIsLoading',
          isLoading: true,
        }),
      )
      await login(values, () => {
        dispatch(
          loginSlice.actions.handleLogin({
            type: 'setIsLoading',
            isLoading: false,
          }),
        )
      })
    } catch (error: any) {
      dispatch(
        loginSlice.actions.handleLogin({
          type: 'setIsLoading',
          isLoading: false,
        }),
      )

      const status = error?.response?.status

      const data = error?.response?.data && JSON.parse(error?.response.data)
      if (data?.accountStatus) {
        if (data?.redirectTo) {
          window.location.href = data?.redirectTo
          return
        }
        dispatch(
          loginSlice.actions.handleLogin({
            type: 'setApiFailure',
            failedReason: data?.accountStatus,
            failedLoginCount: data?.failedLoginCount
              ? data?.failedLoginCount
              : 0,
          }),
        )

        return
      } else if (status === STATUS_CODES.FORBIDDEN) {
        dispatch(
          loginSlice.actions.handleLogin({
            type: 'setCaptchaFailure',
            failedReason: 'CAPTCHA_ERROR',
          }),
        )
      } else {
        dispatch(
          loginSlice.actions.handleLogin({
            type: 'setApiFailure',
            failedReason: 'API_ERROR',
          }),
        )
      }
    }
  }
}
