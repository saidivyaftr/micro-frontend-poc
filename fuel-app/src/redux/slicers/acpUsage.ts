/* eslint-disable @typescript-eslint/indent */
import { createSlice } from '@reduxjs/toolkit'
import APIClient from 'src/api-client'
import { AcpUsageState } from '../types'
const initialState: AcpUsageState = {
  step: 'confirm',
}

export const acpUsageSlice = createSlice({
  name: 'acpUsage',
  initialState,
  reducers: {
    setStep: (
      state,
      action: { payload: typeof initialState.step; type: string },
    ) => {
      return {
        ...state,
        step: action.payload,
      }
    },
  },
})

export const certifyInternetUsage = (values: any) => {
  return async (dispatch: any) => {
    const apiData = {
      accountUuid: values.accountUuid,
      usageDateTime: values.usageDateTime,
      contactMethod: values.contactMethod,
      emailAddress: values.emailAddress,
      mobileNumber: values.mobileNumber,
    }
    try {
      await APIClient.certifyInternetUsage(apiData)
      dispatch(acpUsageSlice.actions.setStep('success'))
      return
    } catch (error: any) {
      dispatch(acpUsageSlice.actions.setStep('error'))
      return
    }
  }
}
