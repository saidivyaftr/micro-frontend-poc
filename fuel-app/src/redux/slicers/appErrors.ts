/* eslint-disable @typescript-eslint/indent */
import { createSlice } from '@reduxjs/toolkit'

export type appErrorsState = {
  isError: boolean
  errorContent: any
}

const initialState: appErrorsState = {
  isError: false,
  errorContent: undefined,
}

export const appErrorsSlice = createSlice({
  name: 'appErrors',
  initialState,
  reducers: {
    setError: (state, action) => {
      return {
        ...state,
        isError: true,
        errorContent: action.payload,
      }
    },
    clearError: () => {
      return {
        ...initialState,
      }
    },
  },
})
