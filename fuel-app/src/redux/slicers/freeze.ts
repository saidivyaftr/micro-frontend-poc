/* eslint-disable @typescript-eslint/indent */
import { createSlice } from '@reduxjs/toolkit'
import { FreezePage } from '../types/freezeTypes'

const initialState: FreezePage = {
  isLoading: false,
  data: null,
  formErrorMessage: '',
  isSuccess: false,
}

export const freezeSlice = createSlice({
  name: 'freeze',
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
