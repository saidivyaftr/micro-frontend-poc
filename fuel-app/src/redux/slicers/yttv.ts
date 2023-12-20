/* eslint-disable @typescript-eslint/indent */
import { createSlice } from '@reduxjs/toolkit'
import { Offers } from '../types/yttvTypes'
import { mockOffers } from '../mock-data/yttv'
import { delayUntil } from '../helper-util'
import APIClient from 'src/api-client'
import { TStore } from '../Store'

export type YTTVState = {
  yttvOffers: { isLoading: boolean; data: Offers; error?: boolean }
}

const initialState: YTTVState = {
  yttvOffers: {
    isLoading: false,
    data: {
      message: '',
      offers: [],
      originalOfferEligibile: false,
    },
  },
}

export const yttvSlice = createSlice({
  name: 'yttv',
  initialState,
  reducers: {
    setOffers: (state, action) => {
      const { type, data } = action.payload
      switch (type) {
        case 'Loading': {
          state.yttvOffers = {
            isLoading: true,
            data: { offers: [], originalOfferEligibile: false },
            error: undefined,
          }
          break
        }
        case 'Success': {
          state.yttvOffers = {
            isLoading: false,
            data,
            error: false,
          }
          break
        }
        case 'Failure': {
          state.yttvOffers = {
            isLoading: false,
            data: { offers: [], originalOfferEligibile: false, ...data },
            error: true,
          }
          break
        }
      }
    },
  },
})

export const fetchOffers =
  (accountUuid: string, payload: any) =>
  async (dispatch: any, getState: () => TStore) => {
    // only fetch when no offers in the store
    if (getState()?.yttv?.yttvOffers?.data?.offers?.length === 0) {
      try {
        dispatch(yttvSlice.actions.setOffers({ type: 'Loading' }))
        let offers: Offers = { offers: [], originalOfferEligibile: false }
        if (process.env.NEXT_PUBLIC_USE_MOCK !== 'true') {
          const apiResponse = await APIClient.getOffers(accountUuid, payload)
          if (Array.isArray(apiResponse?.data?.offers)) {
            offers = apiResponse.data
          }
        } else {
          await delayUntil(1000)
          offers = mockOffers as Offers
        }
        dispatch(
          yttvSlice.actions.setOffers({
            type: 'Success',
            data: offers,
          }),
        )
      } catch (error: any) {
        dispatch(
          yttvSlice.actions.setOffers({
            type: 'Failure',
            data: {
              //error: error,
              message: error.message,
            },
          }),
        )
      }
    }
  }
