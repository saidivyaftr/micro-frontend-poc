/* eslint-disable @typescript-eslint/indent */
import { createSlice } from '@reduxjs/toolkit'
import APIClient from 'src/api-client'
import { addMessagesToBills, delayUntil } from '../helper-util'
import { TStore } from '../Store'
import { BillDetails, BillList, BillsState } from '../types/billTypes'
import mockBills from '../mock-data/bills'
import { mockCurrentBillData } from '../mock-data/currentBillMock'
import {
  comparingDateMockData,
  primaryDateMockData,
} from '../mock-data/comparebillMock'

const initialState: BillsState = {
  billList: {
    isLoading: false,
    data: [],
  },
  billDetailsByDate: {
    isLoading: false,
    data: {},
  },
  currentBill: {
    isLoading: false,
    data: {},
  },
  selectedBillDatesForCompare: [],
}

export const billsSlice = createSlice({
  name: 'bills',
  initialState,
  reducers: {
    setAvailableBills: (state, action) => {
      const { type, data } = action.payload
      switch (type) {
        case 'Loading': {
          state.billList = {
            isLoading: true,
            error: undefined,
            data: [],
          }
          break
        }
        case 'Success': {
          state.billList = {
            isLoading: false,
            data: data,
            error: undefined,
          }
          break
        }
        case 'Failure': {
          state.billList = {
            data: [],
            isLoading: false,
            error: true,
          }
          break
        }
      }
    },
    setStatements: (state, action) => {
      const { type, data } = action.payload
      switch (type) {
        case 'Loading': {
          state.billDetailsByDate = {
            isLoading: true,
            error: undefined,
            data: state.billDetailsByDate.data,
          }
          break
        }
        case 'Success': {
          state.billDetailsByDate = {
            isLoading: false,
            data: data,
            error: undefined,
          }
          break
        }
        case 'Failure': {
          state.billDetailsByDate = {
            data: state.billDetailsByDate.data,
            isLoading: false,
            error: true,
          }
          break
        }
      }
    },
    toggleBillDatesForCompare: (state, action) => {
      const { billDate, dateType } = action.payload
      const billDatesForCompare = state.selectedBillDatesForCompare
      const index = billDatesForCompare.findIndex((d) => d === billDate)
      if (index > -1 && !dateType) {
        billDatesForCompare.splice(index, 1)
      } else if (billDatesForCompare.length < 2) {
        billDatesForCompare.push(billDate)
      } else if (dateType === 'primaryDate') {
        billDatesForCompare[0] = billDate
      } else if (dateType === 'comparingDate') {
        billDatesForCompare[1] = billDate
      }
    },
    setCurrentBill: (state, action) => {
      const { type, data } = action.payload
      switch (type) {
        case 'Loading': {
          state.currentBill = {
            isLoading: true,
            data: {},
            error: undefined,
          }
          break
        }
        case 'Success': {
          state.currentBill = {
            isLoading: false,
            data: data,
            error: undefined,
          }
          break
        }
        case 'Failure': {
          state.currentBill = {
            isLoading: false,
            data: {},
            error: true,
          }
          break
        }
      }
    },
  },
})

export const fetchStatementsByDate =
  (accountId: string, date: string) =>
  async (dispatch: any, getState: () => TStore) => {
    dispatch(billsSlice.actions.setStatements({ type: 'Loading' }))
    try {
      let billDetailsByDate: Record<string, BillDetails> =
        getState().bills.billDetailsByDate.data
      if (!billDetailsByDate[date]) {
        const { data } = await APIClient.getStatementByDate(accountId, date)
        if (data) billDetailsByDate = { ...billDetailsByDate, [date]: data }
      }
      dispatch(
        billsSlice.actions.setStatements({
          type: 'Success',
          data: billDetailsByDate,
        }),
      )
    } catch (err) {
      dispatch(billsSlice.actions.setStatements({ type: 'Failure' }))
    }
  }

export const fetchAvailableBills =
  (accountId: string) => async (dispatch: any) => {
    try {
      dispatch(billsSlice.actions.setAvailableBills({ type: 'Loading' }))
      let bills: BillList = []
      if (process.env.NEXT_PUBLIC_USE_MOCK !== 'true') {
        const apiResponse = await APIClient.getStatementHistory(accountId)
        if (Array.isArray(apiResponse.data)) {
          bills = apiResponse.data
        }
      } else {
        await delayUntil(1000)
        bills = mockBills as BillList
      }
      dispatch(
        billsSlice.actions.setAvailableBills({
          type: 'Success',
          data: addMessagesToBills(bills),
        }),
      )
    } catch (error: any) {
      dispatch(billsSlice.actions.setAvailableBills({ type: 'Failure' }))
    }
  }

export const fetchCompareBills =
  (accountId: string, primaryDate: string, comparingDate: string) =>
  async (dispatch: any, getState: () => TStore) => {
    const currentBillsByDates: Record<string, BillDetails> =
      getState().bills.billDetailsByDate.data

    const isPrimaryDateDataExist = !!currentBillsByDates[primaryDate]

    const isComparingDateDataExists = !!currentBillsByDates[comparingDate]

    try {
      dispatch(billsSlice.actions.setStatements({ type: 'Loading' }))
      const updatedData = { ...currentBillsByDates }
      const billsToFetch = []
      if (process.env.NEXT_PUBLIC_USE_MOCK !== 'true') {
        !isPrimaryDateDataExist && billsToFetch.push(primaryDate)
        !isComparingDateDataExists && billsToFetch.push(comparingDate)
        const billsResponse = await Promise.all(
          billsToFetch.map((date) =>
            APIClient.getStatementByDate(accountId, date),
          ),
        )
        billsResponse.map((response) => {
          if (response.data?.statementDate) {
            updatedData[response.data.statementDate] = response.data
          }
        })
        dispatch(
          billsSlice.actions.setStatements({
            type: 'Success',
            data: updatedData,
          }),
        )
      } else {
        await delayUntil(1000)
        updatedData[primaryDate] = {
          ...primaryDateMockData,
          statementDate: primaryDate,
        }
        updatedData[comparingDate] = {
          ...comparingDateMockData,
          statementDate: comparingDate,
        }
      }
      dispatch(
        billsSlice.actions.setStatements({
          type: 'Success',
          data: updatedData,
        }),
      )
    } catch (error: any) {
      dispatch(billsSlice.actions.setStatements({ type: 'Failure' }))
    }
  }

export const fetchCurrentBill =
  (accountId: string) => async (dispatch: any, getState: () => TStore) => {
    if (Object.keys(getState().bills.currentBill.data).length === 0) {
      try {
        dispatch(billsSlice.actions.setCurrentBill({ type: 'Loading' }))
        let currentBill: BillDetails = {}
        if (process.env.NEXT_PUBLIC_USE_MOCK !== 'true') {
          const apiResponse = await APIClient.getCurrentStatement(accountId)
          currentBill = apiResponse.data
        } else {
          await delayUntil(1000)
          currentBill = mockCurrentBillData as BillDetails
        }
        dispatch(
          billsSlice.actions.setCurrentBill({
            type: 'Success',
            data: currentBill,
          }),
        )
      } catch (error: any) {
        dispatch(billsSlice.actions.setCurrentBill({ type: 'Failure' }))
      }
    }
  }

export const selectBillList = (state: TStore) => state.bills.billList
export const selectBillDetailsByDate = (state: TStore) =>
  state.bills.billDetailsByDate
export const selectCurrentBill = (state: TStore) => state.bills.currentBill
export const selectSelectedBillDatesForCompare = (state: TStore) =>
  state.bills.selectedBillDatesForCompare
