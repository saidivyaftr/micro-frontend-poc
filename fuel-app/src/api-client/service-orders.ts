import axios, { AxiosResponse } from 'axios'
import { CancelOrderTicket, ServiceOrders } from './types'

const serviceOrdersAPIs = (getBaseURL: () => string) => ({
  getServiceOrderDetails: (
    serviceId: string,
    env: string,
    type: string,
  ): Promise<AxiosResponse<ServiceOrders.ServiceOrderList>> => {
    return axios.get(
      `${getBaseURL()}/api/services/${serviceId}/serviceOrders?historyDays=90&serviceEnv=${env}&serviceType=${type}`,
    )
  },
  getAppointmentDetails: (
    serviceId: string,
    orderId: string,
    startDate: string,
  ) => {
    return axios.get(
      `${getBaseURL()}/api/services/${serviceId}/serviceOrders/${orderId}/appointments?daysToSearch=14&startDate=${startDate}`,
    )
  },
  editAppointmentDetails: (payload: ServiceOrders.UpdateAppointmentPayload) => {
    return axios.put(
      `${getBaseURL()}/api/services/${payload.serviceId}/serviceOrders/${
        payload.id
      }`,
      payload,
    )
  },
  updateServiceContactNumber: (data: ServiceOrders.ServiceOrderContact) => {
    return axios.put(
      `${getBaseURL()}/api/services/${data.serviceId}/serviceOrders/${data.id}`,
      data,
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
