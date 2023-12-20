/* eslint-disable @typescript-eslint/indent */
import { createSlice } from '@reduxjs/toolkit'
import APIClient from 'src/api-client'

const initialState = {
  isLoading: true,
  metaData: undefined,
}

export const quickLinksSlice = createSlice({
  name: 'quickLinks',
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      return {
        ...state,
        isLoading: action.payload,
      }
    },
    setQuickLinks: (state, action) => {
      return {
        ...state,
        metaData: action.payload,
      }
    },
  },
})

export const fetchQuickLinks = () => async (dispatch: any) => {
  dispatch(quickLinksSlice.actions.setIsLoading(true))
  try {
    const response = await APIClient.quickLinksMetaData()
    if (response?.data) {
      dispatch(quickLinksSlice.actions.setQuickLinks(response?.data || {}))
    }
  } catch (error) {
    dispatch(quickLinksSlice.actions.setQuickLinks(undefined))
  }
  dispatch(quickLinksSlice.actions.setIsLoading(false))
}
