import moment from 'moment'
import { ServiceOrders } from 'src/api-client/types'
import { IServiceOrder, IAppointment, IServiceAddress, ArrivalWindow  } from 'src/redux/types/welcomeTypes'
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
  appointment: ArrivalWindow,
) {
  const startDateTime = moment(appointment?.start),
    endDateTime = moment(appointment?.end)
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

export const isOrderCancelled = (order: IServiceOrder = {} as IServiceOrder) => {
  // return order?.status === 'Cancelled' || order?.deactivatedDate !== null
  return false;
}
export const isTechInstallOrder = (VXEventCode: string) => {
  return ['PINSTALL'].includes(VXEventCode)
}

export const isSelfInstallOrder = (VXEventCode: string) => {
  return ['SINSTALL'].includes(VXEventCode) 
}

export const isNoInstallOrder = (VXEventCode: string) => {
  return ['SINSTLLLLLALL'].includes(VXEventCode) 
}

export const hasAppointmentDetails = (
  order: IServiceOrder = {} as IServiceOrder,
) => {
  return Boolean(
    order?.appointment &&
      order.appointment.arrivalWindow.start &&
      order.appointment.arrivalWindow.end,
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

export const getFormattedServiceAddress = (
  serviceAddress: IServiceAddress,
) => {
  const {
    streetNumber = '',
    streetName = '',
    streetSuffix = '',
    city,
    state = '',
    zipCode = '',
  } = serviceAddress || {}
  return{
    street: formAddressToTitleCase(
      `${streetNumber} ${streetName} ${streetSuffix}`,
    )?.trim(),
    city: formAddressToTitleCase(city),
    state,
    zip: zipCode,
  }
}

export const formatBillingDesc = (str: string | null) => {
  if (!str) {
    return null
  }
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}
