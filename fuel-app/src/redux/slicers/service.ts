import { createSlice } from '@reduxjs/toolkit'
import APIClient from 'src/api-client'
import { TStore } from '../Store'
import { ServiceState } from '../types/serviceTypes'

const initialState: ServiceState = {
  list: { isLoading: false, data: [] },
}

export const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    setServices: (state, action) => {
      const { type, data } = action.payload
      switch (type) {
        case 'Loading': {
          state.list = {
            isLoading: true,
            data: [],
            error: undefined,
          }
          break
        }
        case 'Success': {
          state.list = {
            isLoading: false,
            data,
            error: undefined,
          }
          break
        }
        case 'Failure': {
          state.list = {
            isLoading: false,
            data: [],
            error: true,
          }
          break
        }
      }
    },
  },
})

export const fetchServices = (includeDetails = false) => {
  return async (dispatch: any, getState: () => TStore) => {
    // only fetch when no services in the store
    if (getState().service.list.data.length === 0) {
      try {
        dispatch(serviceSlice.actions.setServices({ type: 'Loading' }))
        const apiResponse = await APIClient.getServices(includeDetails)
        if (apiResponse.data) {
          dispatch(
            serviceSlice.actions.setServices({
              type: 'Success',
              data: apiResponse.data,
            }),
          )
        }
      } catch (error: any) {
        dispatch(serviceSlice.actions.setServices({ type: 'Failure' }))
      }
    }
  }
}

export const selectServiceList = (state: TStore) => state.service.list.data
export const selectServiceLoading = (state: TStore) =>
  state.service.list.isLoading
