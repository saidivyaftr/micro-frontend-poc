/* eslint-disable @typescript-eslint/indent */
import { createSlice } from '@reduxjs/toolkit'
import APIClient from 'src/api-client'
import {
  ACP_ACKNOWLEDGEMENT_PAGE,
  LIFELINE_PROGRAM_ACKNOWLEDGEMENT_PAGE,
  SITE_ERROR,
} from 'src/constants'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { DpAckState, TosStatus } from '../types'
const initialState: DpAckState = {
  step: 'confirm',
  userTosStatuses: [],
}

export const dpAckSlice = createSlice({
  name: 'dpAck',
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
    setStatuses: (
      state,
      action: { payload: typeof initialState.userTosStatuses; type: string },
    ) => {
      return {
        ...state,
        userTosStatuses: action.payload,
      }
    },
  },
})

export const getUserTosStatuses = (accountUuid: string) => {
  return async (dispatch: any) => {
    try {
      const res = await APIClient.getUserTosStatuses(accountUuid)
      const statuses = res.data?.tosStatuses
      if (!statuses) {
        dispatch(dpAckSlice.actions.setStep('error'))
        return
      }
      dispatch(dpAckSlice.actions.setStatuses(statuses))
      return
    } catch (error: any) {
      dispatch(dpAckSlice.actions.setStep('error'))
      return
    }
  }
}

export const updateTosStatus = (
  accountUuid: any,
  tosStatusModels: Array<TosStatus>,
  page: string,
) => {
  return async (dispatch: any) => {
    try {
      await APIClient.updateTosStatus(accountUuid, { tosStatusModels })
      dispatch(dpAckSlice.actions.setStep('success'))
      return
    } catch (error: any) {
      DTMClient.triggerEvent(
        {
          events: 'event88',
          eVar2:
            page === 'lifeline'
              ? LIFELINE_PROGRAM_ACKNOWLEDGEMENT_PAGE
              : ACP_ACKNOWLEDGEMENT_PAGE,
          eVar88: 'Failed to fetch',
        },
        'tl_o',
        SITE_ERROR,
      )
      dispatch(dpAckSlice.actions.setStep('error'))
      return
    }
  }
}

export const setStep = dpAckSlice.actions.setStep
