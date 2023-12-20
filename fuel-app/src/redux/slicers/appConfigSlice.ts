import { createSlice } from '@reduxjs/toolkit'
import { AppConfig } from '../types/appConfigTypes'
import APIClient from 'src/api-client'

const initialState: AppConfig = {
  configs: {
    DTM: false,
    INVOCA: false,
    isChatOpen: false,
    showTerms: false,
    chatJWT: null,
    GTAG: {},
  },
}

export const appConfigSlice = createSlice({
  name: 'appConfig',
  initialState,
  reducers: {
    setConfig: (state: AppConfig, action) => {
      state.configs = { ...state.configs, ...action.payload }
    },
    setGTAGConfig: (state: AppConfig, action) => {
      state.configs.GTAG = { ...state.configs.GTAG, ...action.payload }
    },
  },
})

export const chatAPI = () => async (dispatch: any) => {
  try {
    console.log('step2::::')
    const response = await APIClient.chatAPI()
    dispatch(
      appConfigSlice.actions.setConfig({ chatJWT: response?.data?.jwt || '' }),
    )
  } catch (error) {
    console.log('step2::::')
    dispatch(appConfigSlice.actions.setConfig({ isChatOpen: true }))
  }
  // dispatch(loginSlice.actions.setIsLoading(false))
}
