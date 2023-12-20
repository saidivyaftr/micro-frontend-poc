/* eslint-disable @typescript-eslint/indent */
import { createSlice } from '@reduxjs/toolkit'
import { CCPAPage } from '../types/ccpaTypes'

const initialState: CCPAPage = {
  isLoading: false,
  data: null,
  formErrorMessage: '',
}

export const ccpaSlice = createSlice({
  name: 'ccpa',
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
        formErrorMessage: '',
      }
    },
    onFailure: (state, action) => {
      return {
        ...state,
        data: null,
        formErrorMessage: action.payload,
      }
    },
    setFormErrorMessage: (state, action) => {
      return {
        ...state,
        formErrorMessage: action.payload,
      }
    },
  },
})
