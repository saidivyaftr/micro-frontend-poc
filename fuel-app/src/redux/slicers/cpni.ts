import { createSlice } from '@reduxjs/toolkit'
import { CPNIPage } from '../types/cpniTypes'

const initialState: CPNIPage = {
  isLoading: false,
  data: null,
  isSuccess: false,
  formErrorMessage: '',
}

export const cpniSlice = createSlice({
  name: 'cpni',
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      return {
        ...state,
        isLoading: action.payload,
      }
    },
    onSuccess: (state, action) => {
      return {
        ...state,
        data: action.payload,
        isSuccess: true,
        formErrorMessage: '',
      }
    },
    onFailure: (state, action) => {
      return {
        ...state,
        data: null,
        isSuccess: false,
        formErrorMessage: action.payload,
      }
    },
    setFormErrorMessage: (state, action) => {
      return {
        ...state,
        isSuccess: false,
        formErrorMessage: action.payload,
      }
    },
  },
})
