import moment from 'moment'
import { ServiceOrders } from 'src/api-client/types'
import { AppointmentDetailsProps } from './types'
import { BSS_RESULT } from './constant'
import { formAddressToTitleCase } from 'src/utils/addressHelpers'
moment.updateLocale('en', {
  meridiem: (hour) => {
    if (hour < 12) {
      return ' a.m.'
    } else {
      return ' p.m.'
    }
  },
})
export const sortFunction = (a: any, b: any) => {
  const dateA = new Date(a.startDate).getTime()
  const dateB = new Date(b.startDate).getTime()
  return dateA > dateB ? 1 : -1
}

export const getDates = (
  startDate: moment.MomentInput,
  stopDate: moment.MomentInput,
) => {
  const dateArray = []
  let start = moment(startDate)
  const end = moment(stopDate)
  while (start <= end) {
    dateArray.push(moment(start).toISOString())
    start = moment(start).add(1, 'days')
  }
  return dateArray
}

export const formatSchedule = function (
  appointment: AppointmentDetailsProps['appointment'],
) {
  const startDateTime = moment(appointment?.startDate),
    endDateTime = moment(appointment?.endDate)
  return {
    month: startDateTime.format('MMM'),
    day: startDateTime.format('DD'),
    startTime: startDateTime.format('h:mma'),
    endTime: endDateTime.format('h:mma'),
    startDateTime: startDateTime.format('yyyy-M-DD hh:mm:ss'),
    endDateTime: endDateTime.format('yyyy-M-DD hh:mm:ss'),
  }
}

export const getFormattedDate = function (date: string) {
  const dateTime = moment(date)
  return dateTime?.format('MMM DD, YYYY') || date
}

export const getDayFromDate = (date: string) => {
  const dateTime = moment(date)
  return dateTime?.format('dddd') || ''
}

export const isOrderCancelled = (
  order: ServiceOrders.ServiceOrderDetails = {} as ServiceOrders.ServiceOrderDetails,
) => {
  return order?.status === 'Cancelled' || order?.deactivatedDate !== null
}

export const isOrderCanceled = (
  order: ServiceOrders.ServiceOrderDetails = {} as ServiceOrders.ServiceOrderDetails,
) => {
  return order?.status === 'Canceled' || order?.deactivatedDate !== null
}

export const isTechInstallOrder = (
  order: ServiceOrders.ServiceOrderDetails = {} as ServiceOrders.ServiceOrderDetails,
) => {
  return order?.installationType === 'FULL_INSTALL'
}

export const isSelfInstallOrder = (
  order: ServiceOrders.ServiceOrderDetails = {} as ServiceOrders.ServiceOrderDetails,
) => {
  return order?.installationType === 'SELF_INSTALL'
}

export const isNoInstallOrder = (
  order: ServiceOrders.ServiceOrderDetails = {} as ServiceOrders.ServiceOrderDetails,
) => {
  return order?.installationType === 'NO_INSTALL'
}

export const hasAppointmentDetails = (
  order: ServiceOrders.ServiceOrderDetails = {} as ServiceOrders.ServiceOrderDetails,
) => {
  return Boolean(
    order?.appointment &&
      order.appointment.startDate &&
      order.appointment.endDate,
  )
}

export const addDashes = (phoneNumber: string) => {
  if (typeof phoneNumber === 'string' && phoneNumber?.length === 10) {
    const ph_no = phoneNumber.replace(/\D[^\.]/g, '')
    const value =
      ph_no.slice(0, 3) + '-' + ph_no.slice(3, 6) + '-' + ph_no.slice(6)
    return value
  }
  return phoneNumber
}

export const addBracketstoMobileNumber = (phoneNumber: string) => {
  if (typeof phoneNumber === 'string') {
    const ph_no = phoneNumber.replace(/\D[^\.]/g, '')
    const value =
      '(' + ph_no.slice(0, 3) + ') ' + ph_no.slice(3, 6) + '-' + ph_no.slice(6)
    return value
  }
  return phoneNumber
}
export const isBSSCusotmer = (type: string) => type === BSS_RESULT

export const hasUPSTrackingNumber = (upsNumber: any) => {
  return upsNumber != '0' && upsNumber?.length
}

export const pageSubTitle: any = (
  selfInstallSubTitle: string,
  techInstallSubTitle: string,
  orderDetailsData: ServiceOrders.ServiceOrderDetails = {} as ServiceOrders.ServiceOrderDetails,
) => {
  return isOrderCancelled(orderDetailsData)
    ? null
    : (isSelfInstallOrder(orderDetailsData) && selfInstallSubTitle) ||
        (isTechInstallOrder(orderDetailsData) && techInstallSubTitle) ||
        null
}

export const getFormattedServiceAddress = (
  serviceAddress: ServiceOrders.ServiceAddress,
) => {
  const {
    streetNumber = '',
    streetName = '',
    streetSuffix = '',
    secondaryNumber = '',
    cityName,
    stateAbbreviation = '',
    zipCode = '',
  } = serviceAddress || {}
  return {
    street: formAddressToTitleCase(
      `${streetNumber} ${streetName} ${streetSuffix}, ${secondaryNumber}`,
    )?.trim(),
    city: formAddressToTitleCase(cityName),
    state: stateAbbreviation,
    zip: zipCode,
  }
}

export const formatBillingDesc = (str: string | null) => {
  if (!str) {
    return null
  }
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}
