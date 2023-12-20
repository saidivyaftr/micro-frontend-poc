import axios from 'axios'
import {
  AutoPayPayload,
  ExpressPayLoginPayload,
  ExpressPayPayload,
  IPayment,
  PaymentMethodPayload,
  PostPaymentMethodPayload,
  PostPaymentPayload,
} from './types'

const paymentAPIs = (getBaseURL: () => string) => ({
  getPaymentAlerts: (accountId: string) => {
    return axios.get(
      `${getBaseURL()}/api/accounts/${accountId}/alerts/payments`,
    )
  },
  getPaymentBanners: (accountId: string) => {
    return axios.get(
      `${getBaseURL()}/api/accounts/${accountId}/banners/payments`,
    )
  },
  getPaymentConfirmationAlerts: (accountId: string) => {
    return axios.get(
      `${getBaseURL()}/api/accounts/${accountId}/alerts/payments-confirmation`,
    )
  },
  getPaymentConfirmationBanners: (accountId: string) => {
    return axios.get(
      `${getBaseURL()}/api/accounts/${accountId}/banners/payments-confirmation`,
    )
  },
  getPaymentsHistoryAlerts: (accountId: string) => {
    return axios.get(
      `${getBaseURL()}/api/accounts/${accountId}/alerts/payments-history`,
    )
  },
  getPaymentsHistoryBanners: (accountId: string) => {
    return axios.get(
      `${getBaseURL()}/api/accounts/${accountId}/banners/payments-history`,
    )
  },
  getPayments: (accountId: string) => {
    return axios.get(`${getBaseURL()}/api/accounts/${accountId}/payments`)
  },
  updatePayment: (accountId: string, paymentId: string, payment: IPayment) => {
    return axios.put(
      `${getBaseURL()}/api/accounts/${accountId}/payments/${paymentId}`,
      payment,
    )
  },
  deletePayment: (accountId: string, paymentId: string) => {
    return axios.delete(
      `${getBaseURL()}/api/accounts/${accountId}/payments/${paymentId}`,
    )
  },
  postPayment: (accountId: string, data: PostPaymentPayload) => {
    return axios.post(
      `${getBaseURL()}/api/accounts/${accountId}/payments`,
      data,
    )
  },
  getDSTConfig: (accountId: string) => {
    return axios.get(`${getBaseURL()}/api/accounts/${accountId}/DSTConfig`)
  },
  getAutoPaySignUpAlerts: (accountId: string) => {
    return axios.get(
      `${getBaseURL()}/api/accounts/${accountId}/alerts/autopay-signup`,
    )
  },
  getAutoPaySignUpBanners: (accountId: string) => {
    return axios.get(
      `${getBaseURL()}/api/accounts/${accountId}/banners/autopay-signup`,
    )
  },
  setupAutoPay: (accountId: string, data: AutoPayPayload) => {
    return axios.post(`${getBaseURL()}/api/accounts/${accountId}/autopay`, data)
  },
  updateAutoPay: (accountId: string, data: AutoPayPayload) => {
    return axios.put(`${getBaseURL()}/api/accounts/${accountId}/autopay`, data)
  },
  getAutoPayDetails: (accountId: string, type: string) => {
    return axios.get(
      `${getBaseURL()}/api/accounts/${accountId}/autopay?type=${type}`,
    )
  },
  deleteAutoPayDetails: (accountId: string, autoPayId: string | boolean) => {
    return axios.delete(
      `${getBaseURL()}/api/accounts/${accountId}/autopay?${autoPayId}`,
    )
  },
  getManageAutoPayAlerts: (accountId: string) => {
    return axios.get(
      `${getBaseURL()}/api/accounts/${accountId}/alerts/autopay-manage`,
    )
  },
  getManageAutoPayBanners: (accountId: string) => {
    return axios.get(
      `${getBaseURL()}/api/accounts/${accountId}/banners/autopay-manage`,
    )
  },
  getPaymentMethods: (accountId: string) => {
    return axios.get(
      `${getBaseURL()}/api/accounts/${accountId}/payment-methods`,
    )
  },
  postPaymentMethod: (accountId: string, payload: PostPaymentMethodPayload) => {
    return axios.post(
      `${getBaseURL()}/api/accounts/${accountId}/payment-methods`,
      payload,
    )
  },
  getPaymentMethodsAlerts: (accountId: string) => {
    return axios.get(
      `${getBaseURL()}/api/accounts/${accountId}/alerts/payments-methods`,
    )
  },
  getPaymentMethodsBanners: (accountId: string) => {
    return axios.get(
      `${getBaseURL()}/api/accounts/${accountId}/banners/payments-methods`,
    )
  },
  getAddNewPaymentMethodAlerts: (accountId: string) => {
    return axios.get(
      `${getBaseURL()}/api/accounts/${accountId}/alerts/payments-new-method`,
    )
  },
  getAddNewPaymentMethodBanners: (accountId: string) => {
    return axios.get(
      `${getBaseURL()}/api/accounts/${accountId}/banners/payments-new-method`,
    )
  },
  updatePaymentMethod: (
    accountId: string,
    paymentMethodId: string,
    data: PaymentMethodPayload,
  ) => {
    return axios.put(
      `${getBaseURL()}/api/accounts/${accountId}/payment-methods/${paymentMethodId}`,
      data,
    )
  },
  deletePaymentMethod: (accountId: string, paymentMethodId: string) => {
    return axios.delete(
      `${getBaseURL()}/api/accounts/${accountId}/payment-methods/${paymentMethodId}`,
    )
  },
  expressPayLogin: (data: ExpressPayLoginPayload) => {
    return axios.post(`${getBaseURL()}/api/expresspay/login`, data)
  },
  expressPayment: (data: ExpressPayPayload) => {
    return axios.post(`${getBaseURL()}/api/expresspay`, data)
  },
  updateDefaultScheduledPaymentsMethod: (
    accountUUID: string,
    paymentMethodId: string,
    newPaymentMethodId: string,
  ) => {
    return axios.patch(
      `${getBaseURL()}/api/accounts/${accountUUID}/update-default-schedule-payments`,
      {
        oldPaymentMethodId: paymentMethodId,
        newPaymentMethodId: newPaymentMethodId,
      },
    )
  },
})

export default paymentAPIs
