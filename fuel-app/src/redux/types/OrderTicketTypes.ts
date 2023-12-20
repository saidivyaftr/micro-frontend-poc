import { OrderPageModals } from 'src/libs/helpcenter/order-ticket-status/types'
export type Order = {
  allowCancel: boolean
  isMissedAppointment: boolean
  isReschedulable: boolean
  trackingNumber?: TrackingNumber
  contactNumber: string
  hasAppointment: boolean
  appointment?: {
    END_LOCAL: string
    START_LOCAL: string
    end: string
    start: string
  }
  ticketType: 'Ticket Number' | 'Order Number' | 'Trouble Ticket'
  ticketNumber: string
  troubleTicket: any
  serviceOrder: any
  uuid: string
  badge: {
    ticketStatus: string
    badgeCopy: string
  }
}
export type TrackingNumber = {
  id: string
  url: string
}
export type IOrderTicket = {
  orders: {
    isLoading: boolean
    error?: boolean
    data: Order[]
    found: 'loading' | 'not-found' | 'found'
  }
  modal: OrderPageModals
  orderData: any
}
