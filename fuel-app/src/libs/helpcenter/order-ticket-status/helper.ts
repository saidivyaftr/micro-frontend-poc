import moment from 'moment'
export const TICKET_NUMBER = 'Trouble Ticket'
export const SERVICE_ORDER = 'Service Order'
export const sortFunction = (a: any, b: any) => {
  const dateA = new Date(a.AppointmentStartDate).getTime()
  const dateB = new Date(b.AppointmentStartDate).getTime()
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

export const formatSchedule = function (appointment: any) {
  if (!appointment) return {}
  const startDateTime = moment(appointment?.START_LOCAL)
  const startTime = appointment?.START_LOCAL?.split('T')?.[1],
    endDateTime = appointment?.END_LOCAL?.split('T')?.[1]
  return {
    month: startDateTime.format('MMM'),
    day: startDateTime.format('DD'),
    fullDay: startDateTime?.format('dddd'),
    date: startDateTime?.format('MMM DD, YYYY'),
    startTime: moment(startTime, ['HH:mm:ss']).format('h:mma'),
    endTime: moment(endDateTime, ['HH:mm:ss']).format('h:mma'),
  }
}

export const hasAppointmentDetails = (order: any = {}) => {
  return Boolean(
    order?.arrivalWindow &&
      order?.arrivalWindow?.START_LOCAL &&
      order?.arrivalWindow?.END_LOCAL,
  )
}

export const formatOrder = (order: any) => {
  const {
    troubleTicket = null,
    serviceOrder = null,
    StatusTracker,
    customer = {},
    DropShip = {},
  } = order
  const { serviceAddress, appointment = null, accountId = {} } = customer
  const { UPSTrackingNo = null } = DropShip
  const appointmentInfo = appointment?.arrivalWindow || {}
  const isMissedAppointment = customer?.appointment?.IsMissed === 'true'
  const ticketType = troubleTicket ? TICKET_NUMBER : SERVICE_ORDER
  const { CreatedDate = '' } = troubleTicket || serviceOrder
  const uuid = accountId?.uuid
  let badge
  if (ticketType === TICKET_NUMBER) {
    badge = ticketStatusBadgeMapping(
      StatusTracker?.Stages?.at(-1)?.StageLabel,
      troubleTicket.VXEventCode,
    )
  } else {
    badge = orderStatusBadgeMapping(
      StatusTracker?.Stages?.at(-1)?.StageLabel,
      serviceOrder.VXEventCode,
    )
  }
  const hasAppointment =
    badge.badgeCopy === 'Canceled' ? false : hasAppointmentDetails(appointment)

  return {
    troubleTicket,
    serviceOrder,
    hasAppointment,
    isMissedAppointment,
    ticketType,
    createdDate: CreatedDate,
    serviceAddress: formatServiceAddress(serviceAddress),
    badge,
    allowCancel: Boolean(appointment?.isCancelable === 'true'),
    isReschedulable: Boolean(appointment?.isReschedulable === 'true'),
    trackingNumber: UPSTrackingNo,
    contactNumber: customer?.contactNumber || '',
    appointmentFormatted: formatSchedule(appointment?.arrivalWindow),
    appointment: appointmentInfo,
    ticketNumber:
      ticketType === TICKET_NUMBER
        ? troubleTicket?.id.TroubleTicketNumber
        : serviceOrder?.id?.OrderNumber,
    uuid,
  }
}

export const formatNonDispatchableOrder = (order: any) => {
  const ticketType =
    order.ticketType === 'troubleTicket' ? TICKET_NUMBER : SERVICE_ORDER

  return {
    troubleTicket: null,
    serviceOrder: null,
    hasAppointment: false,
    isMissedAppointment: false,
    ticketType,
    createdDate: order.createDate,
    completionDate: order.completionDate || null,
    status: order.status || null,
    serviceAddress: order.serviceAddress
      ? formatServiceAddress(order.serviceAddress)
      : null,
    badge: {
      ticketStatus: 'Unavailable',
      badgeCopy: order.status || 'Unavailable',
    },
    allowCancel: false,
    isReschedulable: false,
    trackingNumber: null,
    contactNumber: order?.appointment?.canBeReachedTelephoneNumber || '',
    appointmentFormatted: null,
    appointment: null,
    ticketNumber: order.id,
    uuid: order.uuid,
  }
}

export const ticketStatusBadgeMapping = (
  stageLabel: string,
  vxEventCode?: string,
) => {
  let badgeInfo
  switch (stageLabel) {
    case `We've created your ticket`:
      badgeInfo = ticketEventCodeToBadgeMapping(vxEventCode ?? '')
      return badgeInfo
    case `We're working on it`:
      badgeInfo = {
        ticketStatus: `Great news! We’re working on your ticket.`,
        badgeCopy: 'In progress',
      }
      return badgeInfo
    case `We're on the way`:
      badgeInfo = {
        ticketStatus: `Our tech is on the way to your home. <a href="/resources/myfrontier-mobile-app">Download the MyFrontier app</a> for arrival updates.`,
        badgeCopy: 'Tech on the way',
      }
      return badgeInfo
    case `You're all set`:
      badgeInfo = {
        ticketStatus: `Your trouble ticket is complete.`,
        badgeCopy: 'Complete',
      }
      return badgeInfo
    case `Ticket canceled`:
      badgeInfo = {
        ticketStatus: `Your ticket was canceled. <a href="/resources/myfrontier-mobile-app">Download the MyFrontier app</a> for more details.`,
        badgeCopy: 'Canceled',
      }
      return badgeInfo
    case `Your service is restored`:
      badgeInfo = {
        ticketStatus: `Great news! Your service is restored`,
        badgeCopy: 'Complete',
      }
      return badgeInfo
    default:
      badgeInfo = {
        ticketStatus: 'Unavailable',
        badgeCopy: 'Unavailable',
      }
      return badgeInfo
  }
}

const ticketEventCodeToBadgeMapping = (vxEventCode: string) => {
  const badgeInfo = {
    ticketStatus: '',
    badgeCopy: '',
  }

  switch (vxEventCode) {
    case 'APTMSD':
      badgeInfo.ticketStatus =
        'We’re sorry we missed you. We’ll get you rescheduled as quickly as possible.'
      badgeInfo.badgeCopy = 'Pending'
      return badgeInfo
    case 'JPAUTO':
      badgeInfo.ticketStatus =
        "Sorry, it looks like our tech missed you. We've rescheduled you for the next available appointment on {{appointment}}"
      badgeInfo.badgeCopy = 'Updated'
      return badgeInfo
    case 'SUSP':
      badgeInfo.ticketStatus =
        'Sorry, it looks like we’re delayed. We’ll update your appointment details shortly.'
      badgeInfo.badgeCopy = 'Pending'
      return badgeInfo
    case 'TTNOAC':
      badgeInfo.ticketStatus = 'We’re sorry we missed you.'
      badgeInfo.badgeCopy = 'Pending'
      return badgeInfo
    case 'JPLIVE':
    case 'BOBUPD':
      badgeInfo.ticketStatus =
        'Your appointment was successfully rescheduled for {{appointment}}'
      badgeInfo.badgeCopy = 'Updated'
      return badgeInfo
    default:
      badgeInfo.ticketStatus =
        'Great news! We’ve got your ticket and it’s in progress.'
      badgeInfo.badgeCopy = 'Ticket created'
      return badgeInfo
  }
}

export const orderStatusBadgeMapping = (
  stageLabel: string,
  vxEventCode?: string,
) => {
  let badgeInfo
  switch (stageLabel) {
    case `We've created your order`:
      badgeInfo = orderEventCodeToBadgeMapping(vxEventCode ?? '')
      return badgeInfo
    case `We're working on it`:
      badgeInfo = {
        ticketStatus: `Great news! We’re working on your order.`,
        badgeCopy: 'In progress',
      }
      return badgeInfo
    case `We're on the way`:
      badgeInfo = {
        ticketStatus: `Our tech is on the way to your home. <a href="/resources/myfrontier-mobile-app">Download the MyFrontier app</a> for arrival updates.`,
        badgeCopy: 'Tech on the way',
      }
      return badgeInfo
    case `You're all set`:
      badgeInfo = {
        ticketStatus: `Your order is complete.`,
        badgeCopy: 'Complete',
      }
      return badgeInfo
    case `Order canceled`:
      badgeInfo = {
        ticketStatus: `Your order was canceled. <a href="/resources/myfrontier-mobile-app">Download the MyFrontier app</a> for cancelation details.`,
        badgeCopy: 'Canceled',
      }
      return badgeInfo
    default:
      badgeInfo = {
        ticketStatus: 'Unavailable',
        badgeCopy: 'Unavailable',
      }
      return badgeInfo
  }
}

const orderEventCodeToBadgeMapping = (vxEventCode: string) => {
  const badgeInfo = {
    ticketStatus: '',
    badgeCopy: '',
  }

  switch (vxEventCode) {
    case 'APTMSD':
      badgeInfo.ticketStatus =
        'We’re sorry we missed you. We’ll get you rescheduled as quickly as possible.'
      badgeInfo.badgeCopy = 'Pending'
      return badgeInfo
    case 'JPAUTO':
      badgeInfo.ticketStatus =
        "Sorry, it looks like our tech missed you. We've rescheduled you for the next available appointment on {{appointment}}"
      badgeInfo.badgeCopy = 'Updated'
      return badgeInfo
    case 'SUSP':
      badgeInfo.ticketStatus =
        'Sorry, it looks like we’re delayed. We’ll update your appointment details shortly.'
      badgeInfo.badgeCopy = 'Pending'
      return badgeInfo

    case 'RNOA':
      badgeInfo.ticketStatus = 'We’re sorry we missed you.'
      badgeInfo.badgeCopy = 'Pending'
      return badgeInfo
    case 'JPLIVE':
    case 'BOBUPD':
      badgeInfo.ticketStatus = `Your appointment was successfully rescheduled for {{appointment}}`
      badgeInfo.badgeCopy = 'Updated'
      return badgeInfo
    default:
      badgeInfo.ticketStatus =
        'Thanks for your order. We’ll update your order details shortly.'
      badgeInfo.badgeCopy = 'Order created'
      return badgeInfo
  }
}

export const formatServiceAddress = (address: any) => {
  if (!address) {
    return []
  }
  const {
    streetNumber = '',
    streetName = '',
    streetSuffix = '',
    zipCode = '',
  } = address
  let { city = '', state = '' } = address
  if (address.cityName) {
    city = address.cityName
  }
  if (address.stateAbbreviation) {
    state = address.stateAbbreviation
  }
  const streetRow = [streetNumber, streetName, streetSuffix]
    .filter(Boolean)
    .join(', ')
  const cityStateRow = [city, state, zipCode.slice(0, 5)]
    .filter(Boolean)
    .join(', ')
  return [streetRow, cityStateRow]
}
