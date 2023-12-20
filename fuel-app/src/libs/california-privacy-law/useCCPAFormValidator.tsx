import { ICCPAForm } from './CCPAForm'
import { isValidEmail } from 'src/utils/validator'

export const useCCPAFormValidator = (form: ICCPAForm, errorCodes: any) => {
  const errors: any = validateErrors(form, errorCodes)
  const formFilled: boolean = isFormComplete(form, errors)
  return [formFilled, errors]
}

const validateErrors = (form: ICCPAForm, errorCodes: any) => {
  const {
    firstName,
    lastName,
    email,
    confirmEmail,
    billingAccountNumber,
    pin,
  } = form
  const errors: any = {}
  // First Name
  if (firstName.isTouched && !firstName.value) {
    errors['firstName'] =
      errorCodes?.firstNameRequired?.value || 'First name is required'
  }
  // Last Name
  if (lastName.isTouched && !lastName.value) {
    errors['lastName'] =
      errorCodes?.lastNameRequired?.value || 'Last name is required'
  }
  // email
  if (email.isTouched) {
    if (!email.value) {
      errors['email'] = errorCodes?.emailRequired?.value || 'Email is required'
    } else if (!isValidEmail(email.value)) {
      errors['email'] =
        errorCodes?.invalidEmail?.value || 'Enter a valid email address'
    }
  }
  // confirmEmail
  if (confirmEmail.isTouched) {
    if (!confirmEmail.value) {
      errors['confirmEmail'] =
        errorCodes?.emailRequired?.value || 'Email is required'
    } else if (!isValidEmail(confirmEmail.value)) {
      errors['confirmEmail'] =
        errorCodes?.invalidEmail?.value || 'Enter a valid email address'
    } else if (
      confirmEmail.value.toLowerCase() !== email.value.toLocaleLowerCase()
    ) {
      errors['confirmEmail'] =
        errorCodes?.emailDoesntMatch?.value ||
        'Email does not match. Please re-enter your email'
    }
  }
  //billingAccountNumber
  if (billingAccountNumber.isTouched) {
    if (!billingAccountNumber.value) {
      errors['billingAccountNumber'] =
        errorCodes?.banRequired?.value || 'Billing Account Number is required'
    } else if (
      billingAccountNumber.value.length < 17 ||
      billingAccountNumber.value.length > 21 ||
      billingAccountNumber.value.replace(/\D/g, '').length !== 17
    ) {
      errors['billingAccountNumber'] =
        errorCodes?.banDigits?.value ||
        'Billing Account Number must be 17 digits'
    }
  }
  // pin
  if (pin.isTouched) {
    if (!pin.value) {
      errors['pin'] = errorCodes?.pinRequired?.value || 'PIN Number is required'
    } else if (pin.value.length !== 4) {
      errors['pin'] =
        errorCodes?.pinDigits?.value || 'PIN Number must be 4 digits'
    }
  }
  return errors
}

const isFormComplete = (form: ICCPAForm, errors: any = {}) => {
  if (Object.keys(errors).length !== 0) {
    return false
  }
  const {
    firstName,
    lastName,
    email,
    confirmEmail,
    billingAccountNumber,
    pin,
    recaptcha,
  } = form
  return Boolean(
    firstName.value &&
      lastName.value &&
      email.value &&
      confirmEmail.value &&
      billingAccountNumber.value &&
      pin.value &&
      recaptcha?.value,
  )
}
