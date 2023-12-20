/* eslint-disable @typescript-eslint/indent */
import { createSlice } from '@reduxjs/toolkit'
import {
  EquipmentReturnStep,
  equipmentReturnFindPage,
} from '../types/equipmentReturnsTypes'

const initialState: equipmentReturnFindPage = {
  isLoading: false,
  getServicesAPIData: '',
  equipmentData: null,
  formErrorMessage: '',
  isSuccess: false,
  step: '',
  formData: {
    addressLineOne: '',
    addressLineTwo: '',
    city: '',
    state: '',
    zipCode: '',
  },
}

export const equipmentReturnFindSlice = createSlice({
  name: 'equipmentReturnFind',
  initialState,
  reducers: {
    setStep: (state, action: { payload: EquipmentReturnStep }) => {
      return {
        ...state,
        step: action.payload,
      }
    },
    setFormData: (state, action) => {
      return {
        ...state,
        formData: action.payload,
      }
    },
    getServicesResponse: (state, action) => {
      return {
        ...state,
        getServicesAPIData: action.payload,
      }
    },
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
    setEquipmentData: (state, action) => {
      return {
        ...state,
        equipmentData: action.payload,
      }
    },
  },
})
