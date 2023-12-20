export type PhoneNumberList = {
  id?: string
  number: string
  type: string
  isPrimary: boolean
}
export type EmailAddressList = {
  id?: string
  address: string
  isPrimary: boolean
}
export type editState = {
  isEditing: boolean
  isSettingPrimary: boolean
  isAddingNewContactItem: boolean
  verifyContact: boolean
  verifyContactValue: string
  verifyContactId: string
  verifyContactPrimary: boolean
  hasApiFailed: boolean
  primaryContactStatusModal: boolean
  primaryContactSuccessModal: boolean
}
export type ContactDetailInfo = {
  value: string
  isPrimary: string
  isVerified: boolean
  editState: editState
  id: string
  type: string
  updateEditState: (updates: any) => void
  removeContact: (id: string) => void
  setPrimaryContact: (id: string) => void
}
export type editDetailInfo = {
  editState: editState
  changePrimaryLabel: string
  doneButtonLabel: string
  addNewItemLabel: string
  updateEditState: (updates: any) => void
  type: string
  showChangePrimary: boolean
  hasVerifiedContact: boolean
}
export type addContact = {
  editState: editState
  updateEditState: (updates: any) => void
}

export type VerificationToken = {
  token?: string
  authenticationOptions?: AuthenticationOption[] | AuthenticationOptionEmail[]
}

export type AuthenticationOption = {
  id: string
  type: string
  telephoneNumber: string
}
export type AuthenticationOptionEmail = {
  id: string
  type: string
  address: string
}
