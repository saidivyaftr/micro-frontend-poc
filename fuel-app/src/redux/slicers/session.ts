import { createSlice } from '@reduxjs/toolkit'
import APIClient from 'src/api-client'
import { TStore } from '../Store'
import { Session } from '../types/sessionTypes'
const initialState: Session = {
  isLoading: true,
  data: undefined,
  loggedInState: undefined,
  services: undefined,
  error: false,
  sessionValid: false,
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSession: (state, action) => {
      const {
        type,
        session,
        sessionValid = false,
        loggedInState = undefined,
        services = undefined,
      } = action.payload
      switch (type) {
        case 'Loading':
          return initialState
        case 'Success':
          return {
            isLoading: false,
            data: session,
            sessionValid: sessionValid,
            loggedInState: loggedInState,
            services: services,
            error: false,
          }
        case 'Failure':
          return {
            ...initialState,
            isLoading: false,
            error: true,
          }
      }
    },
  },
})

export const checkSessionAction = (cache = false) => {
  return async (dispatch: any) => {
    dispatch(sessionSlice.actions.setSession({ type: 'Loading' }))
    try {
      const cachedAccounts = localStorage.getItem(`session`)
      if (cachedAccounts && cache) {
        const cachedSession = JSON.parse(cachedAccounts)
        return dispatch(
          sessionSlice.actions.setSession({
            type: 'Sucess',
            session: cachedSession,
            sessionValid: Boolean(cachedSession?.loggedIn),
            loggedInState: cachedSession?.frontierId,
            services: cachedSession?.services,
          }),
        )
      }
      const { data } = await APIClient.session()
      const session = {
        ...data,
        winToken: Math.floor(Math.random() * 10000000),
      }
      if (cache) localStorage.setItem(`session`, JSON.stringify(data))
      return dispatch(
        sessionSlice.actions.setSession({
          type: 'Success',
          session: session,
          sessionValid: Boolean(session?.loggedIn),
          loggedInState: session?.frontierId,
          services: session?.services,
        }),
      )
    } catch (err) {
      return dispatch(
        sessionSlice.actions.setSession({
          type: 'Failure',
        }),
      )
    }
  }
}

export const selectSessionState = (state: TStore) => state.session
export const selectProfileData = (state: TStore) => state.session.loggedInState
export const selectIsSessionLoading = (state: TStore) => state.session.isLoading
export const selectIsValidSession = (state: TStore) =>
  state.session.sessionValid
export const selectProfileServices = (state: TStore) =>
  state.session.data?.services
