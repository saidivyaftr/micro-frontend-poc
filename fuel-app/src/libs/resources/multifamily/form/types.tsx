interface IMultifamilyField {
  value: string
  isTouched: boolean
}

export interface IMultifamilyForm {
  firstName: IMultifamilyField
  lastName: IMultifamilyField
  communityName: IMultifamilyField
  communityAddress: IMultifamilyField
  numberOfUnits: IMultifamilyField
  emailAddress: IMultifamilyField
  phoneNumber: IMultifamilyField
  optForSigning: IMultifamilyField
}

const formFieldInitialState = {
  value: '',
  isTouched: false,
}

export const initialFormState: IMultifamilyForm = {
  firstName: formFieldInitialState,
  lastName: formFieldInitialState,
  communityName: formFieldInitialState,
  communityAddress: formFieldInitialState,
  numberOfUnits: formFieldInitialState,
  emailAddress: formFieldInitialState,
  phoneNumber: formFieldInitialState,
  optForSigning: formFieldInitialState,
}
