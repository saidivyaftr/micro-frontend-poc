/* eslint-disable @typescript-eslint/indent */
import { createSlice } from '@reduxjs/toolkit'
import APIClient from 'src/api-client'
import { TStore } from '../Store'
import { Profile } from '../types/profile'

const initialState: Profile = {
  notificationSettings: {
    isLoading: false,
    emailPreferences: {
      billReadyNotification: false,
      serviceUpdates: false,
      marketingPromotions: false,
      accountInformation: false,
    },
    mobilePreferences: {
      serviceUpdates: false,
      marketingPromotions: false,
      accountInformation: false,
    },
    enrolled: false,
    errorFetching: false,
  },
  ccpaReview: {
    isLoading: false,
    data: undefined,
  },
  phoneNumbers: {
    isLoading: true,
    data: [],
    errorFetching: false,
  },
  emailAddresses: {
    isLoading: true,
    data: [],
    errorFetching: false,
  },
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setNotificationSettings: (state, action) => {
      state.notificationSettings = action.payload
    },
    toggleNotificationSetting: (
      state,
      action: { payload: { key: keyof Profile; value: any } },
    ) => {
      const { key, value } = action.payload
      const [nestedKey, nestedProp] = key.split('.')
      // @ts-ignore
      state.notificationSettings[nestedKey][nestedProp] = value
    },
    toggleNotificationEnrolled: (state, action) => {
      state.notificationSettings.enrolled = action.payload
    },
    setCCPAReview: (state, action) => {
      state.ccpaReview = action.payload
    },
    setPhoneNumbers: (state, action) => {
      state.phoneNumbers = action.payload
    },
    setEmailAddresses: (state, action) => {
      state.emailAddresses = action.payload
    },
  },
})

export const fetchNotificationPreferences = (accountUUID: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(
        profileSlice.actions.setNotificationSettings({
          ...initialState.notificationSettings,
          isLoading: true,
        }),
      )
      const response = await APIClient.getNotifications(accountUUID)
      dispatch(
        profileSlice.actions.setNotificationSettings({
          isLoading: false,
          emailPreferences: response?.data?.emailPreferences,
          mobilePreferences: response?.data?.mobilePreferences,
          enrolled: response?.data?.enrolled,
          errorFetching: false,
        }),
      )
      return
    } catch (error: any) {
      dispatch(
        profileSlice.actions.setNotificationSettings({
          ...initialState.notificationSettings,
          isLoading: false,
          errorFetching: true,
        }),
      )
    }
  }
}

export const fetchCCPAReviews = (accountUUID: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(
        profileSlice.actions.setCCPAReview({
          ...initialState.ccpaReview,
          isLoading: true,
        }),
      )
      const response = await APIClient.getCCPAReviews(accountUUID)
      dispatch(
        profileSlice.actions.setCCPAReview({
          isLoading: false,
          data: response?.data || undefined,
        }),
      )
      return
    } catch (error: any) {
      dispatch(
        profileSlice.actions.setCCPAReview({
          ...initialState.ccpaReview,
          isLoading: false,
        }),
      )
    }
  }
}

export const fetchPhoneNumbers = (accountUUID: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(
        profileSlice.actions.setPhoneNumbers({
          ...initialState.phoneNumbers,
          isLoading: true,
          errorFetching: false,
        }),
      )
      const response = await APIClient.getPhoneNumbers(accountUUID)
      dispatch(
        profileSlice.actions.setPhoneNumbers({
          isLoading: false,
          data: response?.data || undefined,
        }),
      )
      return
    } catch (error: any) {
      dispatch(
        profileSlice.actions.setPhoneNumbers({
          ...initialState.phoneNumbers,
          isLoading: false,
          data: [],
          errorFetching: true,
        }),
      )
    }
  }
}

export const fetchEmailAddresses = (accountUUID: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(
        profileSlice.actions.setEmailAddresses({
          ...initialState.emailAddresses,
          isLoading: true,
          errorFetching: false,
        }),
      )
      const response = await APIClient.getEmailAddresses(accountUUID)
      dispatch(
        profileSlice.actions.setEmailAddresses({
          isLoading: false,
          data: response?.data || undefined,
        }),
      )
      return
    } catch (error: any) {
      dispatch(
        profileSlice.actions.setEmailAddresses({
          ...initialState.emailAddresses,
          isLoading: false,
          errorFetching: true,
        }),
      )
    }
  }
}

export const selectNotificationSettings = (state: TStore) =>
  state.profile.notificationSettings

export const selectCCPAReviews = (state: TStore) => state.profile.ccpaReview

export const selectPhoneNumbers = (state: TStore) => state.profile.phoneNumbers

export const selectEmailAddresses = (state: TStore) =>
  state.profile.emailAddresses
