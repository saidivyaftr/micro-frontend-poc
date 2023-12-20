export const WelcomePageModals = {
  Init: 'INIT',
  EditAppointment: 'EDIT_APPOINTMENT',
  AppointmentConfirmation: 'APPOINTMENT_CONFIRMATION',
  TechnicalError: 'TECHNICAL_ERROR',
  AppointmentError: 'APPPOINTMENT_ERROR',
} as const

export type WelcomePageModals =
  typeof WelcomePageModals[keyof typeof WelcomePageModals]

export interface IAvailableSelectedForDateTime {
  available: boolean
  selected: boolean
}

export interface IDates {
  date: string
  available: boolean
  selected: boolean
}
export interface billingSummaryItem {
  description: string
  price: string
  addBreakBelow?: boolean
  strikePrice?: string
  addLineBelow?: boolean
}

export interface IBillingSummary {
  accordionTitle: string
  amount: string
  items: billingSummaryItem[]
}

export interface ITimes {
  slot1: IAvailableSelectedForDateTime
  slot2: IAvailableSelectedForDateTime
}

export interface IAppointment {
  rawStartDate: string
  rawEndDate: string
  startDate: string
  endDate: string
  scheduleCode: string
  appointmentCode: string
}

export interface AppointmentDetailsProps {
  isModifiable: boolean
  appointment: Appointment
}

export interface Appointment {
  startDate: string
  endDate: string
}
