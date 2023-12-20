/* eslint-disable @typescript-eslint/indent */
import { createSlice } from '@reduxjs/toolkit'
import { BgaPage } from 'src/redux/types/bgaTypes'
import { Address } from '../types'
import { haveFiberNetType } from '../types/bgaTypes'
import APIClient from 'src/api-client'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'

const initialState: BgaPage = {
  selectedAddress: undefined,
  step: 'check_availability',
  scenario: '',
  status: '',
  fiberComingDate: '',
  isCopperAvailableLessThan2: false,
  addressKey: {
    environment: '',
    controlNumber: '',
  },
}

export const bgaSlice = createSlice({
  name: 'bga',
  initialState,
  reducers: {
    setSelectedAddress: (state, action) => {
      return {
        ...state,
        selectedAddress: action.payload,
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
    setScenario: (
      state,
      action: { payload: typeof initialState.scenario; type: string },
    ) => {
      return {
        ...state,
        scenario: action.payload,
      }
    },
    setStatus: (
      state,
      action: { payload: typeof initialState.status; type: string },
    ) => {
      return {
        ...state,
        status: action.payload,
      }
    },
    setFiberComingDate: (
      state,
      action: { payload: typeof initialState.fiberComingDate; type: string },
    ) => {
      return {
        ...state,
        fiberComingDate: action.payload,
      }
    },
    setIsCopperAvailableLessThan2: (
      state,
      action: {
        payload: typeof initialState.isCopperAvailableLessThan2
        type: string
      },
    ) => {
      return {
        ...state,
        isCopperAvailableLessThan2: action.payload,
      }
    },
    setEnviroment: (
      state,
      action: {
        payload: typeof initialState.addressKey
        type: string
      },
    ) => {
      return {
        ...state,
        addressKey: action.payload,
      }
    },
  },
})

const getDaysDifference = (startDate: Date, endDate: Date) => {
  const days = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
  return days
}

export const generateAndPost = (address: Address) => async (dispatch: any) => {
  try {
    const payload: any = {
      header: {
        name: 'BGANominateAddress',
        domain: 'buildinggigabitamerica',
        subdomain: 'notification',
        source: 'DotCom',
        dateTime: moment(Date.now()).format('YYYY-MM-DDTHH:mm:ss.SSS-mm:ss'),
        messageId: uuidv4(),
      },
      body: {
        serviceAddressMasterId: {
          controlNumber: Number(address?.samRecords?.[0]?.controlNumber) || 0,
          environment: address?.samRecords?.[0]?.environment,
        },
        addressKey: address.addressKey,
        GpsCoordinates: {
          latitude: address?.latitude,
          longitude: address?.longitude,
        },
      },
    }
    const resp: any = await APIClient.serviceabilityUpdatedCheck(
      payload.body.serviceAddressMasterId.environment,
      payload.body.serviceAddressMasterId.controlNumber,
    )
    const serviceabilityResponse = resp?.data
    payload.body.address = serviceabilityResponse?.address
    payload.body.address.zipCode =
      serviceabilityResponse?.address.zipCode.slice(0, 5) || 0
    const allMedium: any[] = []

    let availableDate = ''
    serviceabilityResponse?.technology?.forEach((e: any) => {
      allMedium.push(e.medium)
      if (e.medium === 'FIBER' && e.availableDate != undefined)
        availableDate = e.availableDate
    })

    //1
    if (
      serviceabilityResponse?.proximityToFootprint === 'OUT_OF_FOOTPRINT' ||
      address?.inFootprint === false
    ) {
      payload.body.scenario = 'OUT_OF_FOOTPRINT'
      availableDate = ''
    }
    //MDU 1
    else if (
      serviceabilityResponse?.fiberBuildOutStatus === 'PAL_NEEDED' &&
      serviceabilityResponse?.fiberBuildOutProjectId === 'Fiber Passed OFS'
    ) {
      payload.body.scenario = 'PAL_NEEDED'
      availableDate = ''
    }
    //MDU 2a
    else if (
      serviceabilityResponse?.fiberBuildOutStatus === 'PAL_CONFIRMED' &&
      serviceabilityResponse?.fiberBuildOutProjectId === 'Fiber Passed OFS' &&
      allMedium.includes('COPPER')
    ) {
      payload.body.scenario = 'PAL_CONFIRMED_COPPER_AVAILABLE'
      availableDate = ''
    }

    //MDU 2b
    else if (
      serviceabilityResponse?.fiberBuildOutStatus === 'PAL_CONFIRMED' &&
      serviceabilityResponse?.fiberBuildOutProjectId === 'Fiber Passed OFS' &&
      !allMedium.includes('COPPER')
    ) {
      payload.body.scenario = 'PAL_CONFIRMED_COPPER_UNAVAILABLE'
      availableDate = ''
    }

    // 2
    else if (
      !allMedium.includes('FIBER') &&
      allMedium.includes('COPPER') &&
      (serviceabilityResponse?.fiberBuildOutStatus == undefined ||
        serviceabilityResponse?.fiberBuildOutStatus === 'NO_PLANS')
    ) {
      payload.body.scenario = 'NO_FIBER_PLANS_COPPER_AVAILABLE'
      availableDate = ''
    }

    //3
    else if (
      !allMedium.includes('FIBER') &&
      !allMedium.includes('COPPER') &&
      (serviceabilityResponse?.fiberBuildOutStatus == undefined ||
        serviceabilityResponse?.fiberBuildOutStatus === 'NO_PLANS')
    ) {
      payload.body.scenario = 'NO_FIBER_PLANS_COPPER_UNAVAILABLE'
      availableDate = ''
    }

    //4
    else if (
      (serviceabilityResponse?.fiberBuildOutStatus === 'PENDING' ||
        serviceabilityResponse?.fiberBuildOutStatus === 'FUTURE') &&
      ((allMedium.includes('FIBER') &&
        getDaysDifference(new Date(), new Date(availableDate)) > 60) ||
        !allMedium.includes('FIBER')) &&
      allMedium.includes('COPPER')
    ) {
      payload.body.scenario = 'FUTURE_FIBER_COPPER_AVAILABLE'
    }

    //5
    else if (
      (serviceabilityResponse?.fiberBuildOutStatus === 'PENDING' ||
        serviceabilityResponse?.fiberBuildOutStatus === 'FUTURE') &&
      ((allMedium.includes('FIBER') &&
        getDaysDifference(new Date(), new Date(availableDate)) > 60) ||
        !allMedium.includes('FIBER')) &&
      !allMedium.includes('COPPER')
    ) {
      payload.body.scenario = 'FUTURE_FIBER_COPPER_UNAVAILABLE'
    }

    //6
    else if (
      (serviceabilityResponse?.fiberBuildOutStatus === 'FUTURE' ||
        serviceabilityResponse?.fiberBuildOutStatus === 'PENDING') &&
      allMedium.includes('FIBER') &&
      getDaysDifference(new Date(), new Date(availableDate)) <= 60 &&
      allMedium.includes('COPPER')
    ) {
      payload.body.scenario = 'BUILDING_FIBER_COPPER_AVAILABLE'
      dispatch(bgaSlice.actions.setIsCopperAvailableLessThan2(true))
    }

    //7
    else if (
      (serviceabilityResponse?.fiberBuildOutStatus === 'FUTURE' ||
        serviceabilityResponse?.fiberBuildOutStatus === 'PENDING') &&
      allMedium.includes('FIBER') &&
      getDaysDifference(new Date(), new Date(availableDate)) <= 60 &&
      !allMedium.includes('COPPER')
    ) {
      payload.body.scenario = 'BUILDING_FIBER_COPPER_UNAVAILABLE'
      dispatch(bgaSlice.actions.setIsCopperAvailableLessThan2(false))
    }

    //8
    else if (
      (allMedium.includes('FIBER') &&
        getDaysDifference(new Date(availableDate), new Date()) >= 0) ||
      [false, 'IN_SERVICE'].includes(
        serviceabilityResponse?.fiberBuildOutStatus || false,
      )
    ) {
      payload.body.scenario = 'FIBER_AVAILABLE'
    } else {
      payload.body.scenario = 'UNDETERMINABLE'
      availableDate = ''
    }
    dispatch(bgaSlice.actions.setFiberComingDate(availableDate))
    dispatch(bgaSlice.actions.setScenario(payload.body.scenario))
    const response = await APIClient.postEvent(payload)
    dispatch(bgaSlice.actions.setStatus(response?.data))
    return payload.body.scenario
  } catch (e) {
    DTMClient.triggerEvent(
      {
        events: 'event88',
        eVar88: 'API:Failed to fetch',
      },
      'tl_o',
      'site errors',
    )
  }
}

export const haveFiberNet = (selectedAddress: Address, data: any) => {
  return async () => {
    const payLoad: haveFiberNetType = {
      header: {
        name: 'BGANewProspect',
        domain: 'buildinggigabitamerica',
        subdomain: 'notification',
        source: 'DotCom',
        dateTime: moment(Date.now()).format('YYYY-MM-DDTHH:mm:ss.SSS-mm:ss'),
        messageId: uuidv4(),
      },
      body: {
        firstName: data.firstName.value.trim(),
        lastName: data.lastName.value.trim(),
        emailAddress: data.email.value.trim(),
        mobilePhoneNumber:
          Number(data.mobileNumber.value.trim()?.replace(/[-\(\)\s]/g, '')) ||
          0,
        accountId: {
          uuid: uuidv4(),
        },
        communication: {
          providedConsent:
            data.preferredContact.value.trim().length === 0 ? false : true,
          preferences: {
            sms: data.preferredContact.value.trim() === 'mobile' ? true : false,
            email:
              data.preferredContact.value.trim() === 'email' ? true : false,
          },
        },
        marketing: {
          currentProvider: '',
          currentSpeed: '',
          billAmount: '',
          hasFiber: data.haveFiberNet.value.trim() === 'yes' ? true : false,
          howHeardAboutFtr: '',
        },
        address: {
          streetNumber: selectedAddress?.parsedAddress.streetNumber,
          preDirectional: selectedAddress?.parsedAddress.streetPreDirectional,
          streetName: selectedAddress?.parsedAddress.streetName,
          secondaryDesignator: '',
          secondaryNumber: '',
          streetSuffix: selectedAddress?.parsedAddress.streetSuffix,
          postDirectional: selectedAddress?.parsedAddress.streetPostDirectional,
          city: selectedAddress?.address.city,
          state: selectedAddress?.address.stateProvince,
          zipCode: selectedAddress?.address.zipCode.slice(0, 5),
        },
        serviceAddressMasterId: {
          controlNumber:
            Number(selectedAddress?.samRecords?.[0]?.controlNumber) || 0,
          environment: selectedAddress?.samRecords?.[0]?.environment,
        },
        addressKey: selectedAddress?.addressKey,
        scenario: data.scenario,
        GpsCoordinates: {
          latitude: selectedAddress?.latitude,
          longitude: selectedAddress?.longitude,
        },
      },
    }

    const temp = payLoad.body

    if (data.fiberComingDate) {
      temp.fiberAvailableDate = data.fiberComingDate
    }

    try {
      await APIClient.postEvent(payLoad)
      return
    } catch (error: any) {
      DTMClient.triggerEvent(
        {
          events: 'event88',
          eVar88: 'API:Failed to fetch',
        },
        'tl_o',
        'site errors',
      )
      throw error?.response
    }
  }
}
