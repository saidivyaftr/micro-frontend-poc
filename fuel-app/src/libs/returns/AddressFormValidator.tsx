import { IAddressForm } from './ReturnsAddress'

export const addressFormValidator = (
  form: IAddressForm,
  errorMessages: any,
) => {
  const errors: any = validateErrors(form, errorMessages)
  const formFilled: boolean = isFormComplete(form, errors)
  return [formFilled, errors]
}
const validateErrors = (form: IAddressForm, errorMessages: any) => {
  const { addressLineOne, city, zipCode, state } = form

  const errors: any = {}

  if (addressLineOne.isTouched && !addressLineOne.value) {
    errors['addressLine1'] = errorMessages.list?.addressLine1Required?.value
  }
  if (city.isTouched && !city.value) {
    errors['city'] = errorMessages?.list?.cityRequired?.value
  }
  if (state.isTouched && !state.value) {
    return (errors['state'] = errorMessages?.list?.stateRequired?.value)
  }

  // zipCode
  if (zipCode.isTouched) {
    const result = zipCode.value.match('^[0-9]{5}([- /]?[0-9]{4})?$')
    if (!zipCode.value) {
      errors['zipcode'] = errorMessages?.list?.zipCodeRequired?.value
    } else if (!result) {
      errors['zipCode'] = errorMessages?.list?.zipCodeDigits?.value
    }
  }
  return errors
}

const isFormComplete = (form: IAddressForm, errors: any = {}) => {
  if (Object.keys(errors).length !== 0) {
    return false
  }
  const { addressLineOne, city, state, zipCode } = form
  return Boolean(
    addressLineOne.value && city.value && state.value && zipCode.value,
  )
}
