import { ICPNIForm } from './CPNIForm'
import { isValidEmail } from 'src/utils/validator'

export const useCPNIFormValidator = (
  form: ICPNIForm,
  firstNameRequired: any,
  lastNameRequired: any,
  businessNameRequired: any,
  phoneNumberRequired: any,
  phoneNumberDigits: any,
  addressLine1Required: any,
  cityRequired: any,
  stateRequired: any,
  zipCodeRequired: any,
  zipCodeDigits: any,
  emailRequired: any,
  invalidEmail: any,
  emailDoesntMatch: any,
  isBusiness: boolean,
) => {
  const errors: any = validateErrors(
    form,
    firstNameRequired,
    lastNameRequired,
    businessNameRequired,
    phoneNumberRequired,
    phoneNumberDigits,
    addressLine1Required,
    cityRequired,
    stateRequired,
    zipCodeRequired,
    zipCodeDigits,
    emailRequired,
    invalidEmail,
    emailDoesntMatch,
    isBusiness,
  )
  const formFilled: boolean = isFormComplete(form, errors, isBusiness)
  return [formFilled, errors]
}

const validateErrors = (
  form: ICPNIForm,
  firstNameRequired: any,
  lastNameRequired: any,
  businessNameRequired: any,
  phoneNumberRequired: any,
  phoneNumberDigits: any,
  addressLine1Required: any,
  cityRequired: any,
  stateRequired: any,
  zipCodeRequired: any,
  zipCodeDigits: any,
  emailRequired: any,
  invalidEmail: any,
  emailDoesntMatch: any,
  isBusiness: boolean,
) => {
  const {
    firstName,
    lastName,
    businessName,
    phoneNumber,
    address,
    city,
    zipCode,
    state,
    email,
    confirmEmail,
  } = form

  const errorMessages = {
    firstNameRequired: 'First name is required',
    lastNameRequired: 'Last name is required',
    businessNameRequired: 'Business name is required',
    phoneNumberRequired: 'Telephone number is required',
    phoneNumberDigits: 'Telephone number must be 10 digits',
    addressLine1Required: 'Address Line 1 is required',
    cityRequired: 'City is required',
    stateRequired: 'State is required',
    zipCodeRequired: 'Zip Code is required',
    zipCodeDigits: 'Zip Code must be 5 digits',
    emailRequired: 'Email is required',
    invalidEmail: 'Enter a valid email address',
    emailDoesntMatch: 'Email does not match. Please re-enter your email',
  }
  const errors: any = {}
  // First Name

  if (firstName.isTouched && !firstName.value && !isBusiness) {
    errors['firstName'] =
      firstNameRequired?.value || errorMessages.firstNameRequired
  }

  // Last Name
  if (lastName.isTouched && !lastName.value && !isBusiness) {
    errors['lastName'] =
      lastNameRequired?.value || errorMessages.lastNameRequired
  }

  // Business Name
  if (businessName.isTouched && !businessName.value && isBusiness) {
    errors['businessName'] =
      businessNameRequired?.value || errorMessages.businessNameRequired
  }

  // phoneNumber
  if (phoneNumber.isTouched) {
    if (!phoneNumber.value) {
      errors['phoneNumber'] =
        phoneNumberRequired?.value || errorMessages.phoneNumberRequired
    } else if (phoneNumber.value.length !== 10) {
      errors['phoneNumber'] =
        phoneNumberDigits?.value || errorMessages.phoneNumberDigits
    }
  }

  // addressLine1
  if (address?.isTouched && !address.value) {
    errors['address'] =
      addressLine1Required?.value || errorMessages.addressLine1Required
  }

  // city
  if (city.isTouched && !city.value) {
    errors['city'] = cityRequired?.value || errorMessages.cityRequired
  }

  // state
  if (state.isTouched && !state.value) {
    errors['state'] = stateRequired?.value || errorMessages.stateRequired
  }

  // zipCode
  if (zipCode.isTouched) {
    const result = zipCode.value.match('^[0-9]{5}([- /]?[0-9]{4})?$')
    if (!zipCode.value) {
      errors['zipCode'] = zipCodeRequired.value || errorMessages.zipCodeRequired
    } else if (!result) {
      errors['zipCode'] = zipCodeDigits?.value || errorMessages.zipCodeDigits
    }
  }

  // email
  if (email.isTouched) {
    if (!email.value) {
      errors['email'] = emailRequired?.value || errorMessages.emailRequired
    } else if (!isValidEmail(email.value)) {
      errors['email'] = invalidEmail?.value || errorMessages.invalidEmail
    }
  }

  // confirmEmail
  if (confirmEmail.isTouched) {
    if (!confirmEmail.value) {
      errors['confirmEmail'] =
        emailRequired?.value || errorMessages.emailRequired
    } else if (!isValidEmail(confirmEmail.value)) {
      errors['confirmEmail'] = invalidEmail?.value || errorMessages.invalidEmail
    } else if (
      confirmEmail.value.toLowerCase() !== email.value.toLocaleLowerCase()
    ) {
      errors['confirmEmail'] =
        emailDoesntMatch?.value || errorMessages.emailDoesntMatch
    }
  }
  return errors
}

const isFormComplete = (
  form: ICPNIForm,
  errors: any = {},
  isBusiness: boolean,
) => {
  if (Object.keys(errors).length !== 0) {
    return false
  }
  const {
    firstName,
    lastName,
    businessName,
    phoneNumber,
    address,
    city,
    zipCode,
    email,
    confirmEmail,
    recaptcha,
  } = form

  const nameInputs = isBusiness
    ? businessName.value
    : firstName.value && lastName.value

  return Boolean(
    nameInputs &&
      phoneNumber.value &&
      address.value &&
      city.value &&
      zipCode.value &&
      email.value &&
      confirmEmail.value &&
      recaptcha?.value,
  )
}
