export interface ICalendar {
  dates?: any
  selectDateTitle?: string
  TabScrollButton: any
  appointment?: any
  datesArray?: any
  getSelectedDates?: any
}

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
  rawStartDate: string
  rawEndDate: string
  startDate: string
  endDate: string
  scheduleCode: string
  appointmentCode: string
}
