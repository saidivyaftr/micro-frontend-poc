import { FreezeForm } from './FreezeForm'
import { isValidEmail } from 'src/utils/validator'

export const useFreezeFormValidator = (
  form: FreezeForm,
  errorCodes: any,
  isAgree: boolean,
  isBusiness: boolean,
  additionalPhone: number,
) => {
  const errors: any = validateErrors(
    form,
    errorCodes,
    isBusiness,
    additionalPhone,
  )
  const formFilled: boolean = isFormComplete(form, errors, isAgree, isBusiness)
  return [formFilled, errors]
}

const validateErrors = (
  form: FreezeForm,
  errorCodes: any,
  isBusiness: boolean,
  additionalPhone: number,
) => {
  const errorMessages = {
    firstNameRequired: {
      value: 'First name is required',
    },
    lastNameRequired: {
      value: 'Last name is required',
    },
    businessNameRequired: {
      value: 'Business name is required',
    },
    phoneNumberRequired: {
      value: 'Telephone number is required',
    },
    phoneNumberDigits: {
      value: 'Telephone number must be 10 digits',
    },
    addressLine1Required: {
      value: 'Address Line 1 is required',
    },
    cityRequired: {
      value: 'City is required',
    },
    stateRequired: {
      value: 'State is required',
    },
    zipCodeRequired: {
      value: 'Zip Code is required',
    },
    zipCodeDigits: {
      value: 'Zip Code must be 5 digits',
    },
    emailRequired: {
      value: 'Email is required',
    },
    invalidEmail: {
      value: 'Enter a valid email address',
    },
    emailDoesntMatch: {
      value: 'Email does not match. Please re-enter your email',
    },
  }
  const {
    firstName,
    lastName,
    businessName,
    phoneNumber,
    addressLine1,
    city,
    zipcode,
    state,
    email,
    confirmEmail,
  } = form

  const errors: any = {}

  // First Name
  if (firstName.isTouched && !firstName.value && !isBusiness) {
    errors['firstName'] =
      errorCodes?.firstNameRequired?.value ||
      errorMessages?.firstNameRequired?.value
  }

  // Last Name
  if (lastName.isTouched && !lastName.value && !isBusiness) {
    errors['lastName'] =
      errorCodes?.lastNameRequired?.value ||
      errorMessages?.lastNameRequired?.value
  }

  // Business Name
  if (businessName.isTouched && !businessName.value && isBusiness) {
    errors['businessName'] =
      errorCodes?.businessNameRequired?.value ||
      errorMessages?.businessNameRequired?.value
  }

  // phoneNumber
  if (phoneNumber.isTouched) {
    if (!phoneNumber.value) {
      errors['phoneNumber'] =
        errorCodes?.phoneNumberRequired?.value ||
        errorMessages?.phoneNumberRequired?.value
    } else if (phoneNumber.value.length !== 10) {
      errors['phoneNumber'] =
        errorCodes?.phoneNumberDigits?.value ||
        errorMessages?.phoneNumberDigits?.value
    }
  }

  //additional phone numbers
  if (additionalPhone > 0) {
    for (let i = 0; i < additionalPhone; i++) {
      const phone =
        form[('phoneNumber' + (i + 2).toFixed(0)) as keyof FreezeForm]
      if (phone.isTouched) {
        if (!phone.value) {
          errors['phoneNumber' + (i + 2).toFixed(0)] =
            errorCodes?.phoneNumberRequired?.value ||
            errorMessages?.phoneNumberRequired?.value
        } else if (phone.value.length !== 10) {
          errors['phoneNumber' + (i + 2).toFixed(0)] =
            errorCodes?.phoneNumberDigits?.value ||
            errorMessages?.phoneNumberDigits?.value
        }
      }
    }
  }

  // addressLine1
  if (addressLine1.isTouched && !addressLine1.value) {
    errors['addressLine1'] =
      errorCodes?.addressLine1Required?.value ||
      errorMessages?.addressLine1Required?.value
  }

  // city
  if (city.isTouched && !city.value) {
    errors['city'] =
      errorCodes?.cityRequired?.value || errorMessages?.cityRequired?.value
  }

  // state
  if (state.isTouched && !state.value) {
    errors['state'] =
      errorCodes?.stateRequired?.value || errorMessages?.stateRequired?.value
  }

  // zipCode
  if (zipcode.isTouched) {
    const result = zipcode.value.match('^[0-9]{5}([- /]?[0-9]{4})?$')
    if (!zipcode.value) {
      errors['zipcode'] =
        errorCodes?.zipCodeRequired?.value ||
        errorMessages?.zipCodeRequired?.value
    } else if (!result) {
      errors['zipcode'] =
        errorCodes?.zipCodeDigits?.value || errorMessages?.zipCodeDigits?.value
    }
  }

  // email
  if (email.isTouched) {
    if (!email.value) {
      errors['email'] =
        errorCodes?.emailRequired?.value || errorMessages?.emailRequired?.value
    } else if (!isValidEmail(email.value)) {
      errors['email'] =
        errorCodes?.invalidEmail?.value || errorMessages?.invalidEmail?.value
    }
  }

  // confirmEmail
  if (confirmEmail.isTouched) {
    if (!confirmEmail.value) {
      errors['confirmEmail'] =
        errorCodes?.emailRequired?.value || errorMessages?.emailRequired?.value
    } else if (!isValidEmail(confirmEmail.value)) {
      errors['confirmEmail'] =
        errorCodes?.invalidEmail?.value || errorMessages?.invalidEmail?.value
    } else if (
      confirmEmail.value.toLowerCase() !== email.value.toLocaleLowerCase()
    ) {
      errors['confirmEmail'] =
        errorCodes?.emailDoesntMatch?.value ||
        errorMessages?.emailDoesntMatch?.value
    }
  }
  return errors
}

const isFormComplete = (
  form: FreezeForm,
  errors: any = {},
  isAgree: boolean,
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
    addressLine1,
    city,
    zipcode,
    email,
    confirmEmail,
  } = form

  const nameInputs = isBusiness
    ? businessName.value
    : firstName.value && lastName.value

  return Boolean(
    nameInputs &&
      phoneNumber.value &&
      addressLine1.value &&
      city.value &&
      zipcode.value &&
      email.value &&
      confirmEmail.value &&
      isAgree,
  )
}
