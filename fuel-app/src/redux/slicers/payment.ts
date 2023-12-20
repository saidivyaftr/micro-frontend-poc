/* eslint-disable @typescript-eslint/indent */
import { createSlice } from '@reduxjs/toolkit'
import mockHistory from '../mock-data/payment-history'
import mockAutopay from '../mock-data/autopay'
import {
  Autopay,
  DstAuthDetails,
  PaymentMethodsData,
  PaymentState,
} from '../types/payments'
import APIClient from 'src/api-client'
import { delayUntil, partitionPayments } from '../helper-util'
import { PostPaymentPayload } from 'src/api-client/types'
import { mockDSTConfigData } from '../mock-data/accounts'
import { TStore } from '../Store'
const initialState: PaymentState = {
  paymentList: {
    isLoading: false,
    data: {
      scheduled: [],
      failedPayments: [],
      history: [],
    },
    error: false,
  },
  paymentConfirmation: { kind: 'Init' },
  autopayDetails: { isLoading: false, data: [] },
  showAutoPayEditForm: false,
  paymentMethods: {
    isLoading: false,
    data: {},
  },
  postPaymentDetails: {
    isLoading: false,
    data: {},
  },
  dstConfigDetails: {
    isLoading: false,
    data: {},
  },
}

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPayment: (state, action) => {
      const { data, type } = action.payload
      switch (type) {
        case 'Loading': {
          state.paymentList = {
            isLoading: true,
            data: {
              scheduled: [],
              failedPayments: [],
              history: [],
            },
            error: undefined,
          }
          break
        }
        case 'Success': {
          state.paymentList = {
            isLoading: false,
            data,
            error: undefined,
          }
          break
        }
        case 'Failure': {
          state.paymentList = {
            isLoading: false,
            data: {
              scheduled: [],
              failedPayments: [],
              history: [],
            },
            error: true,
          }
          break
        }
      }
    },
    setPaymentConfirmationData: (state, action) => {
      return {
        ...state,
        paymentConfirmation: action.payload,
      }
    },
    setAutopayDetails: (state, action) => {
      const { type, data } = action.payload
      switch (type) {
        case 'Loading': {
          state.autopayDetails = {
            isLoading: true,
            data: [],
            error: undefined,
          }
          break
        }
        case 'Success': {
          state.autopayDetails = {
            isLoading: false,
            data,
            error: undefined,
          }
          break
        }
        case 'Failure': {
          state.autopayDetails = {
            isLoading: false,
            data: [],
            error: true,
          }
          break
        }
      }
    },
    setShowAutoPayEditForm: (state, action) => {
      return {
        ...state,
        showAutoPayEditForm: action.payload,
      }
    },
    setPaymentMethods: (state, action) => {
      const { type, data } = action.payload
      switch (type) {
        case 'Loading': {
          state.paymentMethods = {
            isLoading: true,
            data: {},
            error: undefined,
          }
          break
        }
        case 'Success': {
          state.paymentMethods = {
            isLoading: false,
            data: data,
            error: undefined,
          }
          break
        }
        case 'Failure': {
          state.paymentMethods = {
            isLoading: false,
            data: {},
            error: true,
          }
          break
        }
      }
    },
    setDSTConfigDetails: (state, action) => {
      const { type, data } = action.payload
      switch (type) {
        case 'Loading': {
          state.dstConfigDetails = {
            isLoading: true,
            data: {},
            error: undefined,
          }
          break
        }
        case 'Success': {
          state.dstConfigDetails = {
            isLoading: false,
            data: data,
            error: undefined,
          }
          break
        }
        case 'Failure': {
          state.dstConfigDetails = {
            isLoading: false,
            data: {},
            error: true,
          }
          break
        }
      }
    },
    setPostPaymentDetails: (state, action) => {
      const { type, data } = action.payload
      switch (type) {
        case 'Loading': {
          state.postPaymentDetails = {
            isLoading: true,
            data: {},
            error: undefined,
          }
          break
        }
        case 'Success': {
          state.postPaymentDetails = {
            isLoading: false,
            data: data,
            error: undefined,
          }
          break
        }
        case 'Failure': {
          state.postPaymentDetails = {
            isLoading: false,
            data: {},
            error: data,
          }
          break
        }
      }
    },
  },
})

export const fetchPaymentHistory =
  (accountId: string, silentFetch = false) =>
  async (dispatch: any) => {
    try {
      if (!silentFetch) {
        dispatch(
          paymentSlice.actions.setPayment({
            type: 'Loading',
          }),
        )
      }
      let response: any
      if (process.env.NEXT_PUBLIC_USE_MOCK !== 'true') {
        const apiResponse = await APIClient.getPayments(accountId)
        const { payments = [], failedPayments = [] } = apiResponse.data
        const [history, scheduled] = partitionPayments(payments, (e: any) => {
          return e.status === 'Successful' || e.status === 'Chargeback'
        })
        response = {
          failedPayments,
          history,
          scheduled,
        }
      } else {
        await delayUntil(1000)
        response = mockHistory
      }
      setTimeout(() => {
        dispatch(
          paymentSlice.actions.setPayment({
            type: 'Success',
            data: response,
          }),
        )
      }, 500)
    } catch (e) {
      dispatch(
        paymentSlice.actions.setPayment({
          type: 'Failure',
        }),
      )
    }
  }

export const fetchAutopayDetails =
  (accountId: string, autopayType: string) => async (dispatch: any) => {
    try {
      dispatch(paymentSlice.actions.setAutopayDetails({ type: 'Loading' }))
      let autopayDetails: Autopay
      if (process.env.NEXT_PUBLIC_USE_MOCK !== 'true') {
        const apiResponse = await APIClient.getAutoPayDetails(
          accountId,
          autopayType,
        )
        autopayDetails = apiResponse.data
      } else {
        await delayUntil(1000)
        autopayDetails = mockAutopay
      }
      dispatch(
        paymentSlice.actions.setAutopayDetails({
          type: 'Success',
          data: autopayDetails,
        }),
      )
    } catch (error: any) {
      dispatch(paymentSlice.actions.setAutopayDetails({ type: 'Failure' }))
    }
  }

export const fetchPaymentMethods =
  (accountId: string, silentFetch?: boolean) =>
  async (dispatch: any): Promise<PaymentMethodsData | null> => {
    try {
      if (!silentFetch) {
        dispatch(paymentSlice.actions.setPaymentMethods({ type: 'Loading' }))
      }
      let availablePayments: PaymentMethodsData = {}
      const apiResponse = await APIClient.getPaymentMethods(accountId)
      availablePayments = apiResponse.data
      dispatch(
        paymentSlice.actions.setPaymentMethods({
          type: 'Success',
          data: availablePayments,
        }),
      )
      return availablePayments
    } catch (error: any) {
      dispatch(paymentSlice.actions.setPaymentMethods({ type: 'Failure' }))
    }
    return null
  }

export const fetchDSTAuthDetails =
  (accountId: string) => async (dispatch: any, getState: any) => {
    const state: TStore = getState()
    if (state.payment.dstConfigDetails?.data?.accountId === accountId) {
      return
    }
    try {
      dispatch(paymentSlice.actions.setDSTConfigDetails({ type: 'Loading' }))
      let dstConfigDetails: DstAuthDetails = {}
      if (process.env.NEXT_PUBLIC_USE_MOCK !== 'true') {
        const apiResponse = await APIClient.getDSTConfig(accountId)
        dstConfigDetails = apiResponse.data
      } else {
        await delayUntil(1000)
        dstConfigDetails = mockDSTConfigData as DstAuthDetails
      }
      dispatch(
        paymentSlice.actions.setDSTConfigDetails({
          type: 'Success',
          data: dstConfigDetails,
        }),
      )
    } catch (error: any) {
      dispatch(paymentSlice.actions.setDSTConfigDetails({ type: 'Failure' }))
    }
  }

export const postOneTimePayment =
  (accountId: string, paymentPayloadData: PostPaymentPayload) =>
  async (dispatch: any) => {
    try {
      dispatch(paymentSlice.actions.setPostPaymentDetails({ type: 'Loading' }))
      let paymentConfirmationData: DstAuthDetails = {}
      const apiResponse = await APIClient.postPayment(
        accountId,
        paymentPayloadData,
      )
      if (typeof apiResponse.data === 'object') {
        paymentConfirmationData = { ...paymentPayloadData, ...apiResponse.data }
      }
      dispatch(
        paymentSlice.actions.setPostPaymentDetails({
          type: 'Success',
          data: paymentConfirmationData,
        }),
      )
    } catch (error: any) {
      dispatch(
        paymentSlice.actions.setPostPaymentDetails({
          type: 'Failure',
          data: { ...paymentPayloadData, error },
        }),
      )
    }
  }

export const selectPaymentList = (state: TStore) => state.payment.paymentList
export const selectPaymentConfirmation = (state: TStore) =>
  state.payment.paymentConfirmation
export const selectAutopayDetails = (state: TStore) =>
  state.payment.autopayDetails
export const selectPaymentMethods = (state: TStore) =>
  state.payment.paymentMethods
export const selectPostPaymentDetails = (state: TStore) =>
  state.payment.postPaymentDetails
export const selectDSTConfigDetails = (state: TStore) =>
  state.payment.dstConfigDetails
export const selectShowAutoPayEditForm = (state: TStore) =>
  state.payment.showAutoPayEditForm
