export const VacationServiceModals = {
  Init: 'INIT',
  TechnicalError: 'TECHNICAL_ERROR',
  Confirmation: 'TURNED_OFF_CONFIRMATION',
  Success: 'TURNED_OFF_SUCESS',
  CancelConfirmation: 'CANCEL_CONFIRMATION',
  CancelSuccess: 'CANCEL_SUCCESS',
}

export type VacationServiceModals =
  typeof VacationServiceModals[keyof typeof VacationServiceModals]
