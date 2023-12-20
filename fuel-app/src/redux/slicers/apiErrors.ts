import { createSlice } from '@reduxjs/toolkit'

export type apiErrorsState = {
  isError: boolean
  apiErrorContent: {
    module: string
    errorCode: number
  }
}

const initialState: apiErrorsState = {
  isError: false,
  apiErrorContent: {
    module: '',
    errorCode: 0,
  },
}

export const apiErrorsSlice = createSlice({
  name: 'apiErrors',
  initialState,
  reducers: {
    setApiErrorCode: (state, action) => {
      return {
        ...state,
        isError: true,
        apiErrorContent: action.payload,
      }
    },
    clearApiError: () => {
      return {
        ...initialState,
      }
    },
  },
})

export const { setApiErrorCode, clearApiError } = apiErrorsSlice.actions
