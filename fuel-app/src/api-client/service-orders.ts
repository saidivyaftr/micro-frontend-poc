import axios, { AxiosResponse } from 'axios'
import { CancelOrderTicket, ServiceOrders } from './types'

const serviceOrdersAPIs = (getBaseURL: () => string) => ({
  getOrderInfo: (uuid: string) => {
    try {
      return axios(`${getBaseURL()}/api/accounts/${uuid}/service-order`)
    } catch (error: any) {
      return error
    }
  },
  getAppointmentDetails: (uuid: string) => {
    try {
      return axios.get(
        `${getBaseURL()}/api/accounts/${uuid}/service-order/appointments`,
      )
    } catch (error: any) {
      return error
    }
  },
  updateAppointment: (uuid: string, payload: any) => {
    try {
      return axios.post(
        `${getBaseURL()}/api/accounts/${uuid}/service-order/appointments`,
        payload,
      )
    } catch (error: any) {
      return error
    }
  },
  updateContactNumber: (uuid: string, payload: any) => {
    try {
      return axios.put(
        `${getBaseURL()}/api/accounts/${uuid}/service-order/contact-number`,
        payload,
      )
    } catch (error: any) {
      return error
    }
  },
  editAppointmentDetails: (payload: ServiceOrders.UpdateAppointmentPayload) => {
    return axios.put(
      `${getBaseURL()}/api/services/${payload.serviceId}/serviceOrders/${
        payload.id
      }`,
      payload,
    )
  },
  getUsersLinkedToService: (serviceId: string) => {
    return axios.get(`${getBaseURL()}/api/services/${serviceId}/users`)
  },
  deleteUserLinkedToService: (serviceId: string, uid: string) => {
    return axios.delete(
      `${getBaseURL()}/api/services/${serviceId}/users/${uid}`,
    )
  },
  deleteService: (serviceId: string) => {
    return axios.delete(`${getBaseURL()}/api/services/${serviceId}`)
  },
  fetchAccountTickets: (uuid: string) => {
    return axios.get(
      `${getBaseURL()}/api/accounts/${uuid}/ticket-orders/account-orders-tickets`,
    )
  },
  searchOrderTicket: (payload: any) => {
    return axios.post(`${getBaseURL()}/api/search-order-ticket`, payload)
  },
  searchOrderTicketLegacy: (payload: any) => {
    return axios.post(
      `${getBaseURL()}/api/account-orders-tickets-legacy`,
      payload,
    )
  },
  getOrderTicketAppointments: (payload: any, uuid: string) => {
    return axios.post(
      `${getBaseURL()}/api/accounts/${uuid}/ticket-orders/find-available-appointments`,
      payload,
    )
  },
  updateOrderTicketAppointment: (payload: any, uuid: string) => {
    return axios.post(
      `${getBaseURL()}/api/accounts/${uuid}/ticket-orders/appointment`,
      payload,
    )
  },

  cancelOrderTicket: (payload: CancelOrderTicket, uuid: string) => {
    return axios.post(
      `${getBaseURL()}/api/accounts/${uuid}/ticket-orders/appointment`,
      payload,
    )
  },
  updateOrderTicketContact: (payload: any, uuid: string) => {
    return axios.put(
      `${getBaseURL()}/api/accounts/${uuid}/ticket-orders/appointment`,
      payload,
    )
  },
})

export default serviceOrdersAPIs
