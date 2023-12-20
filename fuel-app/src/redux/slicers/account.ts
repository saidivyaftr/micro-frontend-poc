import { createSlice } from '@reduxjs/toolkit'
import {
  //AccountDetails,
  //AccountInfoOnLoad,
  AccountList,
  AccountState,
} from '../types/accountTypes'
import APIClient from 'src/api-client'
import { TStore } from '../Store'
import { setApiErrorCode } from './apiErrors'

const initialState: AccountState = {
  list: { isLoading: false, data: [] },
  activeAccount: {
    id: '',
    uuid: '',
    details: { isLoading: false, data: {} },
  },
  accountInfoOnLoad: {
    isLoading: false,
    data: {},
  },
  vacationServices: {
    isLoading: false,
    data: {},
  },
}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccounts: (state, action) => {
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
    setBillingAddress: (state, action) => {
      if (state.activeAccount.details.data.billingAddress) {
        state.activeAccount.details.data.billingAddress = action.payload
      }
    },
    setActiveAccountDetails: (state, action) => {
      const { type, data } = action.payload
      switch (type) {
        case 'Loading': {
          state.activeAccount.details = {
            isLoading: true,
            data: {},
            error: undefined,
          }
          break
        }
        case 'Success': {
          state.activeAccount.details = {
            isLoading: false,
            data,
            error: undefined,
          }
          break
        }
        case 'Failure': {
          state.activeAccount.details = {
            isLoading: false,
            data: {},
            error: true,
          }
          break
        }
      }
    },
    setAccountInfoOnLoad: (state, action) => {
      const { type, data } = action.payload
      switch (type) {
        case 'Loading': {
          state.accountInfoOnLoad = {
            isLoading: true,
            data: {},
            error: undefined,
          }
          break
        }
        case 'Success': {
          state.accountInfoOnLoad = {
            isLoading: false,
            data,
            error: undefined,
          }
          break
        }
        case 'Failure': {
          state.accountInfoOnLoad = {
            isLoading: false,
            data: {},
            error: true,
          }
          break
        }
      }
    },
    setVacationServicesInfo: (state, action) => {
      const { type, data } = action.payload
      switch (type) {
        case 'Loading': {
          state.vacationServices = {
            isLoading: true,
            data: {},
            error: undefined,
          }
          break
        }
        case 'Success': {
          state.vacationServices = {
            isLoading: false,
            data,
            error: undefined,
          }
          break
        }
        case 'Failure': {
          state.vacationServices = {
            isLoading: false,
            data: {},
            error: true,
          }
          break
        }
      }
    },
    setActiveAccountId: (state, action) => {
      const { accountId } = action.payload
      state.activeAccount.id = accountId
      if (state.activeAccount.details?.data?.id !== accountId) {
        state.activeAccount.details.data = {}
      }
    },
    setActiveAccountUuid: (state, action) => {
      const { accountUuid } = action.payload
      state.activeAccount.uuid = accountUuid
      if (state.accountInfoOnLoad.data?.uuid !== accountUuid) {
        state.accountInfoOnLoad.data = {}
      }
    },
    setLanguagePreference: (state, action) => {
      state.activeAccount.details.data.preferredLanguageCode = action.payload
    },
    turnAutoPayOff: (state) => {
      state.activeAccount.details.data.autopayType = false
    },
  },
})

export const fetchAccounts = (
  queryAccountId?: string,
  forceFetch?: boolean,
  refreshJWT?: boolean,
) => {
  return async (dispatch: any, getState: () => TStore) => {
    if (getState().account.list.data.length === 0 || forceFetch) {
      try {
        dispatch(accountSlice.actions.setAccounts({ type: 'Loading' }))
        let accounts: AccountList = []
        if (process.env.NEXT_PUBLIC_USE_MOCK !== 'true') {
          const apiResponse = await Promise.all([
            APIClient.getAccounts(forceFetch),
            APIClient.getServicesCached(true, false, forceFetch),
            APIClient.getAccountsDigital(
              { fetchNewToken: refreshJWT },
              forceFetch,
            ),
          ])
          accounts = apiResponse[0].data
          const services = apiResponse[1].data
          const digitalList = apiResponse[2].data
          if (
            Array.isArray(accounts) &&
            Array.isArray(services) &&
            Array.isArray(digitalList)
          ) {
            accounts.forEach((account) => {
              const service = services.find(
                (srv) => srv.ref === account.id && srv.type === 'BILLING',
              )
              account.serviceDetails = service
              const accountDigital = digitalList.find(
                (ad) => ad.uuid && ad.accountNumber === account.id,
              )
              if (accountDigital) {
                account.accountUuid = accountDigital.uuid
              }
            })
          }
        }
        dispatch(
          accountSlice.actions.setAccounts({
            type: 'Success',
            data: accounts,
          }),
        )
        const activeId =
          queryAccountId ||
          accounts.find((acc) => acc.preferred)?.id ||
          accounts[0].id

        dispatch(
          accountSlice.actions.setActiveAccountId({
            accountId: activeId,
          }),
        )
        const activeAccount = accounts.find((acc) => acc.id === activeId)

        dispatch(
          accountSlice.actions.setActiveAccountUuid({
            accountUuid: activeAccount?.accountUuid,
          }),
        )
      } catch (error: any) {
        dispatch(
          setApiErrorCode({
            module: 'myServices',
            errorCode: error?.response?.status,
          }),
        )
        dispatch(accountSlice.actions.setAccounts({ type: 'Failure' }))
      }
    } else {
      // When we already have data we set the activeAccountUuid from the data that we already have
      const accounts = getState().account.list.data
      const activeId =
        queryAccountId ||
        accounts.find((acc) => acc.preferred)?.id ||
        accounts[0].id

      const activeAccount = accounts.find((acc) => acc.id === activeId)

      dispatch(
        accountSlice.actions.setActiveAccountUuid({
          accountUuid: activeAccount?.accountUuid,
        }),
      )
    }
  }
}

export const fetchAccountDetails = (accountId: string, forceFetch = false) => {
  return async (dispatch: any, getState: () => TStore) => {
    const hasAccountDetails =
      Object.keys(getState()?.account?.activeAccount?.details?.data || {})
        .length > 0
    if (!hasAccountDetails || forceFetch) {
      try {
        dispatch(
          accountSlice.actions.setActiveAccountDetails({ type: 'Loading' }),
        )
        const apiResponse = await APIClient.getAccountDetails(accountId)
        dispatch(
          accountSlice.actions.setActiveAccountDetails({
            type: 'Success',
            data: apiResponse.data,
          }),
        )
      } catch (error: any) {
        // When the account ID is not found in our records (Mostly when the user tries to modify the query in URL)
        if (error?.response?.status === 403) {
          window.location.href = window.location.pathname
          return
        }
        dispatch(
          accountSlice.actions.setActiveAccountDetails({ type: 'Failure' }),
        )
      }
    }
  }
}

export const fetchAccountDetailsbyUUID =
  (uuid: string) => async (dispatch: any, getState: () => TStore) => {
    if (
      uuid !== getState().account.accountInfoOnLoad.data.uuid &&
      !getState().account.accountInfoOnLoad.isLoading
    ) {
      try {
        dispatch(accountSlice.actions.setAccountInfoOnLoad({ type: 'Loading' }))
        const apiResponse = await APIClient.getAccountSummary({
          accountUuid: uuid,
        })
        dispatch(
          accountSlice.actions.setAccountInfoOnLoad({
            type: 'Success',
            data: apiResponse.data,
          }),
        )
      } catch (error: any) {
        dispatch(accountSlice.actions.setAccountInfoOnLoad({ type: 'Failure' }))
      }
    }
  }

export const fetchAccountVacationServicesbyUUID =
  (uuid: string) => async (dispatch: any, getState: () => TStore) => {
    if (uuid === getState().account.activeAccount.uuid) {
      try {
        dispatch(
          accountSlice.actions.setVacationServicesInfo({ type: 'Loading' }),
        )
        const apiResponse = await APIClient.getVacationServices(uuid)
        dispatch(
          accountSlice.actions.setVacationServicesInfo({
            type: 'Success',
            data: apiResponse.data,
          }),
        )
      } catch (error: any) {
        dispatch(
          accountSlice.actions.setVacationServicesInfo({ type: 'Failure' }),
        )
      }
    }
  }
export const { setVacationServicesInfo } = accountSlice.actions
export const selectAccountList = (state: TStore) => state.account.list
export const selectActiveAccountId = (state: TStore) =>
  state.account.activeAccount.id
export const selectActiveAccountUuid = (state: TStore) =>
  state.account.activeAccount.uuid
export const selectActiveAccount = (state: TStore) =>
  state.account.activeAccount.details
export const selectAccountInfoOnLoad = (state: TStore) =>
  state.account.accountInfoOnLoad.data
export const selectVacationServicesInfo = (state: TStore) =>
  state.account.vacationServices
