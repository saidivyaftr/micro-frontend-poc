import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment'
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
  UnprovisionedList,
  ServiceDetails,
  IBillingSummary,
} from '../types/welcomeTypes'
import { WelcomePageModals } from 'src/libs/account/welcome/types'
import { ServiceOrders } from 'src/api-client/types'

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

export const fetchServicesForWelcomePage = () => {
  return async (dispatch: any) => {
    try {
      dispatch(welcomeSlice.actions.setServices({ type: 'Loading' }))
      const apiResponse = await APIClient.getServices(true)
      const services = apiResponse?.data
      let unprovisionedServices = filterAndSortUnprovisionedServices(services)

      // If it has multiple records, fetch service address to show it in account dropdown
      if (unprovisionedServices?.length > 1) {
        unprovisionedServices = unprovisionedServices.sort((s1, s2) =>
          moment(s1.createdDate).isAfter(moment(s2.createdDate)) ? -1 : 1,
        )

        const serviceDetailsAPIPromise = []
        for (const service of services) {
          const hasServiceAddress = Boolean(service?.details?.serviceAddress)
          if (!hasServiceAddress) {
            const envType = isBSSCusotmer(service.type) ? service.ref : ''
            serviceDetailsAPIPromise.push(
              APIClient.getServiceOrderDetails(
                service.id,
                envType,
                service.type,
              )
                .then((response) => {
                  const orderDetails = sortRecentOrder(
                    response?.data || [],
                  )?.[0]
                  if (orderDetails && orderDetails.serviceAddress) {
                    const referenceItem = unprovisionedServices.find(
                      (x) => x.id === service.id,
                    )
                    if (referenceItem) {
                      if (referenceItem.details) {
                        referenceItem.details = {
                          ...referenceItem.details,
                          serviceAddress: orderDetails.serviceAddress as any,
                        }
                      }
                    }
                  }
                })
                .catch(() => undefined),
            )
          }
        }

        await Promise.all(serviceDetailsAPIPromise)
      }

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

export const fetchServiceOrderData = (service: ServiceDetails) => {
  return async (dispatch: any) => {
    try {
      dispatch(
        welcomeSlice.actions.setServiceOrder({
          type: 'Loading',
        }),
      )
      const { type, ref, id } = service
      const envType = isBSSCusotmer(type) ? ref : ''
      const apiResponse = await APIClient.getServiceOrderDetails(
        id,
        envType,
        type,
      )
      const orderDetails: any = sortRecentOrder(apiResponse?.data)

      let orderSelected = null
      if (orderDetails?.length > 0) {
        orderSelected = orderDetails?.[0]
        orderSelected.productsAdded = orderSelected?.productsAdded?.filter(
          (product: any) => product.filteredDescription,
        )
      }
      dispatch(computeOrder(orderSelected))
      dispatch(
        welcomeSlice.actions.setServiceOrder({
          type: 'Success',
          data: orderSelected,
        }),
      )
      if (orderSelected.status !== 'Cancelled')
        dispatch(
          fetchBillingSummary({
            environmentCode: envType,
            orderNumber: orderSelected.id,
            status: service.type,
            uuid: orderSelected.uuid,
          }),
        )
    } catch (e) {
      dispatch(
        welcomeSlice.actions.setServiceOrder({
          type: 'Failure',
        }),
      )
    }
  }
}

const fetchBillingSummary = (billing: IBillingSummary) => {
  return async (dispatch: any) => {
    try {
      const { uuid, environmentCode, orderNumber } = billing
      const apiResponse = await APIClient.getBillingSummary(uuid, {
        environmentCode,
        orderNumber,
        status: 'unprovisioned',
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

const computeOrder = (order: ServiceOrders.ServiceOrderDetails) => {
  return (dispatch: any) => {
    const isCancelledOrder = isOrderCancelled(order)
    const isSelfInstallationOrder = isSelfInstallOrder(order)
    const isNoInstallationOrder = isNoInstallOrder(order)
    const isTechInstallationOrder = isTechInstallOrder(order)
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
const filterUnprovisionedServices = (list: UnprovisionedList) => {
  return list?.filter(
    (service) =>
      service.type === 'UNPROVISIONED' || service.type === 'BSS_RESULT',
  )
}

const filterAndSortUnprovisionedServices = (list: UnprovisionedList) => {
  return filterUnprovisionedServices(list).sort((s1, s2) =>
    moment(s1.createdDate).isAfter(moment(s2.createdDate)) ? -1 : 1,
  )
}

const sortRecentOrder = (orders: any) => {
  return orders.sort((a: any, b: any) =>
    moment(b.createDate, 'DD-MM-YYYY').diff(moment(a.createDate, 'DD-MM-YYYY')),
  )
}
