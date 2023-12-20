import { IOrderLoginForm } from './OrderLoginForm'
import { useAppData } from 'src/hooks'
import {
  isValidOrderNumber,
  isValidLastName,
  isValidZipCode,
} from 'src/utils/validator'

export const OrderLoginValidator = (form: IOrderLoginForm) => {
  const orderLoginData = useAppData('verify', true)
  const errors: any = validateErrors(form, orderLoginData)
  const formFilled: boolean = isFormComplete(form, errors)
  return [formFilled, errors]
}

const validateErrors = (form: IOrderLoginForm, orderLoginData: any = {}) => {
  const {
    lastnameInvalid,
    orderNumberFormatInvalid,
    zipcodeInvalid,
    lastnameRequired,
    orderNumberRequired,
    zipcodeRequired,
  } = orderLoginData
  const { orderNumber, lastName, zipCode } = form
  const errors: any = {}
  if (orderNumber.isTouched) {
    if (!orderNumber.value) {
      errors['orderNumber'] = orderNumberRequired?.value
    }
    if (!isValidOrderNumber(orderNumber.value)) {
      errors['orderNumber'] = orderNumberFormatInvalid?.value
    }
  }
  if (lastName.isTouched) {
    if (!lastName.value) {
      errors['lastName'] = lastnameRequired?.value
    }
    if (!isValidLastName(lastName.value)) {
      errors['lastName'] = lastnameInvalid?.value
    }
  }
  if (zipCode.isTouched) {
    if (!zipCode.value) {
      errors['zipCode'] = zipcodeRequired?.value
    }
    if (!isValidZipCode(zipCode.value)) {
      errors['zipCode'] = zipcodeInvalid?.value
    }
  }
  return errors
}

const isFormComplete = (form: IOrderLoginForm, errors: any = {}) => {
  if (Object.keys(errors).length !== 0) {
    return false
  }
  const { orderNumber, lastName, zipCode } = form
  return Boolean(orderNumber.value && lastName.value && zipCode.value)
}
