import { createSlice } from '@reduxjs/toolkit'
import { AccountAccess } from '../types/accountAccessTypes'
import APIClient from 'src/api-client'
import { TStore } from '../Store'

const initialState: AccountAccess = {
  users: {
    serviceId: null,
    isLoading: false,
    data: [],
    errorFetching: false,
  },
  discoverIdentity: {
    isLoading: false,
    data: undefined,
    errorFetching: false,
  },
}

export const accountAccessSlice = createSlice({
  name: 'accountAccess',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      const { type, data, serviceId } = action.payload
      switch (type) {
        case 'Loading': {
          state.users = {
            serviceId: serviceId,
            isLoading: true,
            data: [],
            errorFetching: false,
          }
          break
        }
        case 'Success': {
          state.users = {
            serviceId: serviceId,
            isLoading: false,
            data: data,
            errorFetching: false,
          }
          break
        }
        case 'Failure': {
          state.users = {
            serviceId: serviceId,
            isLoading: false,
            data: [],
            errorFetching: true,
          }
          break
        }
      }
    },
    setDiscoverIdentity: (state, action) => {
      const { type, data } = action.payload
      switch (type) {
        case 'Loading': {
          state.discoverIdentity = {
            ...initialState.discoverIdentity,
            isLoading: true,
          }
          break
        }
        case 'Success': {
          state.discoverIdentity = {
            ...initialState.discoverIdentity,
            data: data,
          }
          break
        }
        case 'Failure': {
          state.discoverIdentity = {
            ...initialState.discoverIdentity,
            errorFetching: true,
          }
          break
        }
      }
    },
  },
})

export const fetchUsersLinkedToAccount = (serviceId: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(
        accountAccessSlice.actions.setUsers({ type: 'Loading', serviceId }),
      )
      const apiResponse = await APIClient.getUsersLinkedToService(serviceId)
      dispatch(
        accountAccessSlice.actions.setUsers({
          type: 'Success',
          serviceId,
          data: apiResponse?.data,
        }),
      )
    } catch (error: any) {
      dispatch(
        accountAccessSlice.actions.setUsers({ type: 'Failure', serviceId }),
      )
    }
  }
}

export const fetchDiscoverIdentity = (accountNumber: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(
        accountAccessSlice.actions.setDiscoverIdentity({
          type: 'Loading',
        }),
      )
      const apiResponse = await APIClient.getDiscoverIdentity(accountNumber)
      dispatch(
        accountAccessSlice.actions.setDiscoverIdentity({
          type: 'Success',
          data: apiResponse?.data,
        }),
      )
    } catch (error: any) {
      dispatch(
        accountAccessSlice.actions.setDiscoverIdentity({
          type: 'Failure',
        }),
      )
      return false
    }
    return true
  }
}

export const selectAccountUsers = (state: TStore) => state.accountAccess.users
export const selectDiscoverIdentity = (state: TStore) =>
  state.accountAccess.discoverIdentity
