export type equipmentReturnFindPage = {
  isLoading: boolean
  equipmentData: any
  formData: any
  getServicesAPIData: any
  step: string
  formErrorMessage: string
  isSuccess: boolean
}

export type EquipmentReturnStep =
  | 'RETURNS_FIND'
  | 'EQUIPMENT_LIST'
  | 'EQUIPMENT_ADDRESS'
  | 'EQUIPMENT_REVIEW'
  | 'EQUIPMENT_SUBMIT_SUCCESS'
