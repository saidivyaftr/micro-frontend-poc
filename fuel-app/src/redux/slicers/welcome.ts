import { createSlice } from '@reduxjs/toolkit'
import APIClient from 'src/api-client'
import { TStore } from '../Store'
import {
  hasAppointmentDetails,
  isBSSCusotmer,
  isNoInstallOrder,
  isOrderCancelled,
  isSelfInstallOrder,
  isTechInstallOrder,
} from 'src/libs/account/welcome/helper'
import {
  WelcomeState,
  IServicesOrdered,
  IBillingSummary,
  IServiceOrder,
} from '../types/welcomeTypes'
import { WelcomePageModals } from 'src/libs/account/welcome/types'
import { AccountList } from '../types/accountTypes'

const initialState: WelcomeState = {

  // services
  isLoading: false,
  unprovisionedServices: [],
  errorFetchingServices: false,
  selectedService: null,

  // orders
  isLoadingServiceOrders: false,
  unprovisionedServiceOrder: null,
  errorFetchingUnprovisionedServiceOrder: false,
  orderBillingSummary: null,

  // UI State
  modal: WelcomePageModals.Init,
  isCancelledOrder: false,
  isSelfInstallationOrder: false,
  isNoInstallationOrder: false,
  isTechInstallationOrder: false,
  hasNoAppointment: false,
}

export const welcomeSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    setServices: (state, action) => {
      const { type, data } = action.payload
      switch (type) {
        case 'Loading': {
          return {
            ...state,
            isLoading: true,
            unprovisionedServices: [],
            errorFetchingServices: false,
          }
        }
        case 'Success': {
          return {
            ...state,
            isLoading: false,
            unprovisionedServices: data,
            errorFetchingServices: false,
          }
        }
        case 'Failure': {
          return {
            ...state,
            isLoading: false,
            unprovisionedServices: [],
            errorFetchingServices: true,
          }
        }
      }
    },
    setServiceOrder: (state, action) => {
      const { type, data } = action.payload
      switch (type) {
        case 'Loading': {
          return {
            ...state,
            isLoadingServiceOrders: true,
            unprovisionedServiceOrder: null,
            errorFetchingUnprovisionedServiceOrder: false,
          }
        }
        case 'Success': {
          return {
            ...state,
            isLoadingServiceOrders: false,
            unprovisionedServiceOrder: data,
            errorFetchingUnprovisionedServiceOrder: false,
          }
        }
        case 'Failure': {
          return {
            ...state,
            isLoadingServiceOrders: false,
            unprovisionedServiceOrder: null,
            errorFetchingUnprovisionedServiceOrder: true,
          }
        }
      }
    },
    updateServiceOrder: (state, action) => {
      return {
        ...state,
        unprovisionedServiceOrder: action.payload,
      }
    },
    setSelectedService: (state, action) => {
      state.selectedService = action.payload
    },
    setOrderBillingSummary: (state, action) => {
      state.orderBillingSummary = action.payload
    },
    setModal: (state, action: { payload: WelcomePageModals }) => {
      state.modal = action.payload
    },
    setOrderStatuses: (state, action) => {
      return {
        ...state,
        isCancelledOrder: action.payload.isCancelledOrder,
        isSelfInstallationOrder: action.payload.isSelfInstallationOrder,
        isNoInstallationOrder: action.payload.isNoInstallationOrder,
        isTechInstallationOrder: action.payload.isTechInstallationOrder,
        hasNoAppointment: action.payload.hasNoAppointment,
      }
    },
  },
})

export const fetchServicesForWelcomePage = (forceFetch?: boolean, refreshJWT?: boolean) => {
  return async (dispatch: any) => {
    try {
      dispatch(welcomeSlice.actions.setServices({ type: 'Loading' }))
      const { data: unprovisionedServices } = await APIClient.getAccountsDigital(
        { fetchNewToken: refreshJWT },
        forceFetch,
      )
      if (unprovisionedServices) {
        const selectedService = unprovisionedServices[0]
        dispatch(
          welcomeSlice.actions.setServices({
            type: 'Success',
            data: unprovisionedServices,
          }),
        )
        if (selectedService) {
          dispatch(
            welcomeSlice.actions.setSelectedService(selectedService || null),
          )
        }
      }
    } catch (error: any) {
      dispatch(welcomeSlice.actions.setServices({ type: 'Failure' }))
    }
  }
}

export const fetchServiceOrderData = (accountUUid: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(
        welcomeSlice.actions.setServiceOrder({
          type: 'Loading',
        }),
      )
      const {
        data: { Events },
      } = await APIClient.getOrderInfo(accountUUid)
      const { serviceOrder, customer } = Events?.[0]
      const {
        ServicesOrdered = [],
        CreatedDate,
        OrderDueDate,
        VXEventCode,
        id,
      } = serviceOrder
      const { contactNumber = '', serviceAddress, appointment } = customer
      const servicesOrdered = ServicesOrdered?.map(
        ({ Name }: IServicesOrdered) => Name,
      )
      dispatch(
        welcomeSlice.actions.setServiceOrder({
          type: 'Success',
          data: {
            ServicesOrdered: servicesOrdered,
            CreatedDate,
            VXEventCode,
            OrderDueDate,
            OrderNumber: id.OrderNumber,
            contactNumber,
            ServiceAddress: serviceAddress,
            appointment,
          },
        }),
      )
      dispatch(computeOrder(Events[0]))
      // if (orderSelected.status !== 'Cancelled')
        // dispatch(fetchBillingSummary(orderSelected, service))
    } catch (e) {
      dispatch(
        welcomeSlice.actions.setServiceOrder({
          type: 'Failure',
        }),
      )
    }
  }
}

export const fetchBillingSummary = (
  order: IBillingSummary,
) => {
  return async (dispatch: any) => {
    try {
      const apiResponse = await APIClient.getBillingSummary(order?.uuid, {
        environmentCode: order.environmentCode,
        orderNumber: order.orderNumber,
        status: order.status
      })
      dispatch(
        welcomeSlice.actions.setOrderBillingSummary(
          apiResponse?.data?.digitalVoice || null,
        ),
      )
    } catch (error) {
      dispatch(welcomeSlice.actions.setOrderBillingSummary(null))
    }
  }
}


const computeOrder = (order: IServiceOrder) => {
  return (dispatch: any) => {
    const isCancelledOrder = isOrderCancelled(order)
    const isSelfInstallationOrder = isSelfInstallOrder(order?.serviceOrder.VXEventCode)
    const isNoInstallationOrder = isNoInstallOrder(order)
    const isTechInstallationOrder = isTechInstallOrder(
      order?.serviceOrder.VXEventCode
    )
    const hasNoAppointment = !hasAppointmentDetails(order)
    dispatch(
      welcomeSlice.actions.setOrderStatuses({
        isCancelledOrder,
        isSelfInstallationOrder,
        isNoInstallationOrder,
        isTechInstallationOrder,
        hasNoAppointment,
      }),
    )
  }
}

// Selectors
export const selectUnprovisionedList = (state: TStore) =>
  state.welcome.unprovisionedServices

export const selectUnprovisionedListLoading = (state: TStore) =>
  state.welcome.isLoading

export const getSelectedUnprovisionedService = (state: TStore) =>
  state.welcome.selectedService || state.welcome.unprovisionedServices?.[0]

export const selectWelcomePageData = (state: TStore) => state.welcome


// Helper functions
const filterUnprovisionedServices = (list: AccountList) => {
  return list?.filter(
    ({accountStatus}) =>
    ['UNPROVISIONED', 'BSS_RESULT'].includes(accountStatus),
  )
}


