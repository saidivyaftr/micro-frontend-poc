/* eslint-disable @typescript-eslint/indent */
import { createSlice } from '@reduxjs/toolkit'
import { AcpPage, Address } from '../types/acpTypes'
import APIClient from 'src/api-client'
import moment from 'moment'
import {
  getACPErrorByCode,
  TErrorMessage,
} from 'src/libs/discount-programs/affordable-connectivity-program/service-check/form/ebbErrors'

const initialState: AcpPage = {
  isServiceabilityLoading: false,
  step: 'acp-form',
  submitModal: undefined,
  availabilityResponse: undefined,
  apiErrorData: undefined,
}

export const acpSlice = createSlice({
  name: 'acp',
  initialState,
  reducers: {
    setServiceabilityCheckLoading: (state, action) => {
      return {
        ...state,
        isServiceabilityLoading: action.payload,
      }
    },
    setSelectedAddress: (state, action) => {
      return {
        ...state,
        selectedAddress: action.payload,
      }
    },
    setCheckAvailablity: (state, action) => {
      return {
        ...state,
        availabilityResponse: action.payload,
      }
    },
    setStep: (
      state,
      action: { payload: typeof initialState.step; type: string },
    ) => {
      return {
        ...state,
        step: action.payload,
      }
    },
    setApiErrorData: (state, action) => {
      return {
        ...state,
        apiErrorData: action.payload,
      }
    },
    setSubmitModal: (
      state,
      action: {
        payload: typeof initialState.submitModal
        type: string
      },
    ) => {
      return {
        ...state,
        submitModal: action.payload,
      }
    },
  },
})

export const checkForServiceability =
  (selectedAddress?: Address) => async (dispatch: any) => {
    dispatch(acpSlice.actions.setServiceabilityCheckLoading(true))
    try {
      const { environment, controlNumber } =
        selectedAddress?.samRecords?.[0] || {}
      const { data } = await APIClient.serviceabilityCheck(
        environment ?? '',
        controlNumber ?? '',
      )
      const { serviceType, correctedAddress: { zipCode = '' } = {} } = data
      dispatch(
        acpSlice.actions.setCheckAvailablity({
          zipCode,
          serviceType,
        }),
      )
      if (serviceType !== 'UNSERVICEABLE') {
        dispatch(acpSlice.actions.setStep('acp-form'))
      } else {
        dispatch(acpSlice.actions.setStep('not-serviceable'))
      }
      dispatch(acpSlice.actions.setServiceabilityCheckLoading(false))
      return data
    } catch (error) {
      dispatch(acpSlice.actions.setStep('not-serviceable'))
      dispatch(acpSlice.actions.setServiceabilityCheckLoading(false))
      throw error
    }
  }

export const submitForm = (values: any) => {
  return async (dispatch: any) => {
    const subscriber = {
      firstName: values.subscriberFirstName.trim(),
      lastName: values.subscriberLastName.trim(),
      dateOfBirth: moment(values.subscriberDob).format('MM/DD/YYYY'),
      personalId: values.subscriberPersonalId,
      email: values.subscriberEmail.trim(),
      phoneNumber: values.subscriberPhoneNumber.trim()?.replaceAll('-', ''),
      serviceLocation: {
        address: values.subscriberServiceAddressStreet?.trim() ?? '',
        address2: values.subscriberServiceAddressApartment?.trim() ?? '',
        state: values.subscriberServiceAddressState?.trim() ?? '',
        city: values.subscriberServiceAddressCity?.trim() ?? '',
        postalCode: values.subscriberServiceAddressZipCode?.trim() ?? '',
        isBusiness: false,
      },
      ...(values.hasApplicationId === '0' && {
        middleName: values.subscriberMiddleName.trim(),
        last4Social:
          values.subscriberPersonalId === 'last4Social'
            ? values.subscriberLast4Social.trim()
            : '',
        tribalId:
          values.subscriberPersonalId === 'tribalId'
            ? values.subscriberTribalId.trim()
            : '',
      }),
    }
    const benefitQualifiedPerson =
      values.hasApplicationId === '0' && values.isCustomerInfoSame === '0'
        ? {
            firstName: values.benefitQualifiedPersonFirstName.trim(),
            middleName: values.benefitQualifiedPersonMiddleName.trim(),
            lastName: values.benefitQualifiedPersonLastName.trim(),
            dateOfBirth: moment(values.benefitQualifiedPersonDob).format(
              'MM/DD/YYYY',
            ),
            last4Social:
              values.benefitQualifiedPersonalId === 'last4Social'
                ? values.benefitQualifiedPersonLast4Social.trim()
                : '',
            tribalId:
              values.benefitQualifiedPersonalId === 'tribalId'
                ? values.benefitQualifiedPersonTribalId.trim()
                : '',
          }
        : undefined
    const apiData = {
      ack1Received: values.ack1Received,
      trfAReceived: false,
      applicationId: values.applicationId,
      enrollInTribalBenefit: Boolean(Number(values.enrollInTribalBenefit)),
      subscriber,
      ...(benefitQualifiedPerson ? { benefitQualifiedPerson } : undefined),
      ...(values.accountUUID
        ? { accountUUID: values.accountUUID }
        : {
            billingAccountNumber: values.billingAccountNumber
              ?.trim()
              ?.replaceAll('-', ''),
          }),
    }
    try {
      const response = await APIClient.submitACPForm(apiData)
      const errorCode = response?.data?.errorCode
      // Form submitted successfully but needs verification
      if (
        errorCode === 'EB016' ||
        errorCode === 'EB017' ||
        errorCode === 'EB018'
      ) {
        dispatch(
          acpSlice.actions.setApiErrorData({
            status: 200,
            errorCode,
          }),
        )
        dispatch(acpSlice.actions.setStep('error'))
      } else {
        // Form submitted button and everything is done
        dispatch(acpSlice.actions.setStep('success'))
      }
      return
    } catch (error: any) {
      const { data: { errorCode = '' } = {}, status = '' } = error?.response
      const message: TErrorMessage | null = getACPErrorByCode(
        `${status}_${errorCode}`,
      )
      // Show modal for form related errors
      if (errorCode && message?.title && !message?.isErrorLandingPage) {
        dispatch(
          acpSlice.actions.setSubmitModal({
            showModal: true,
            isLoading: false,
            isFooterCloseButton: true,
            modalContentClassName: true,
            buttonName: 'Return to form',
            ...message,
          }),
        )
      } else {
        // Show error page as fall back
        dispatch(
          acpSlice.actions.setApiErrorData({
            status,
            errorCode,
          }),
        )
        dispatch(acpSlice.actions.setStep('error'))
      }
      throw error?.response
    }
  }
}
