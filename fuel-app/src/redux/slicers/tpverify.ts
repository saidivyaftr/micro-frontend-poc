import { createSlice } from '@reduxjs/toolkit'
import { VerifyPage } from '../types/tpverifyTypes'

const initialState: VerifyPage = {
  isLoading: false,
  data: null,
  formErrorMessage: '',
  verifyResponse: {},
}

export const verifySlice = createSlice({
  name: 'verify',
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      return {
        ...state,
        isLoading: action.payload,
      }
    },
    setFormErrorMessage: (state, action) => {
      return {
        ...state,
        formErrorMessage: action.payload,
      }
    },
    setVerifyResponse: (state, action) => {
      return {
        ...state,
        verifyResponse: action.payload,
      }
    },
  },
})
