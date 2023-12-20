export const OrderPageModals = {
  Init: 'INIT',
  EditAppointment: 'EDIT_APPOINTMENT',
  AppointmentConfirmation: 'APPOINTMENT_CONFIRMATION',
  TechnicalError: 'TECHNICAL_ERROR',
  AppointmentError: 'APPPOINTMENT_ERROR',
  CancelOrder: 'CANCEL_ORDER',
  FindAccountNumber: 'FIND_ACCOUNT_NUMBER',
  EditAppointmentConfirmation: 'EDIT_APPOINTMENT_CONFIRMATION',
} as const

export type OrderPageModals =
  typeof OrderPageModals[keyof typeof OrderPageModals]

export interface IAvailableSelectedForDateTime {
  available: boolean
  selected: boolean
}

export interface IDates {
  date: string
  available: boolean
  selected: boolean
}

export interface ITimes {
  slot1: IAvailableSelectedForDateTime
  slot2: IAvailableSelectedForDateTime
}

export interface IAppointment {
  rawStartDate?: string
  rawEndDate?: string
  AppointmentStartDate: string
  AppointmentEndDate: string
  startDate?: string
  endDate?: string
  scheduleCode?: string
  appointmentCode?: string
  contactNumber?: string
}

export type IPayload = {
  lastName?: string
  orderOrTTNumber?: string
  zipCode?: string
  accountNumber?: string
}

export type ResultType = 'loading' | 'found' | 'not-found'

export type ContactError = 'required' | 'invalid-contact' | ''
