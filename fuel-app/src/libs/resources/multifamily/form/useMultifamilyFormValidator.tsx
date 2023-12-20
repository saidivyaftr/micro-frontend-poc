import { IMultifamilyForm } from './types'
import {
  isValidEmail,
  isValidMobileNumber,
  isValidFirsttName,
  isValidLastName,
  isValidCommunityName,
} from 'src/utils/validator'

export const useMultifamilyFormValidator = (
  form: IMultifamilyForm,
  errorCodes: any,
) => {
  const errors: any = validateErrors(form, errorCodes)
  const formFilled: boolean = isFormComplete(form, errors)
  return [formFilled, errors]
}

const validateErrors = (form: IMultifamilyForm, errorCodes: any) => {
  const errorMessages = {
    firstNameRequired: {
      value: 'First name is required',
    },
    lastNameRequired: {
      value: 'Last name is required',
    },
    communityNameRequired: {
      value: 'Community name is required',
    },
    communityAddressRequired: {
      value: 'Community address is required',
    },
    numberOfUnitsRequired: {
      value: 'Number of units is required',
    },
    emailAddressRequired: {
      value: 'Email address is required',
    },
    invalidEmailAddress: {
      value: 'Enter a valid email address',
    },
    phoneNumberRequired: {
      value: 'Phone number is required',
    },
    phoneNumberDigits: {
      value: 'Phone number must be 10 digits',
    },
    optForSigning: {
      value: 'Please select one option',
    },
  }
  const {
    firstName,
    lastName,
    communityName,
    communityAddress,
    numberOfUnits,
    emailAddress,
    phoneNumber,
    optForSigning,
  } = form

  const errors: any = {}

  // First Name
  if (
    firstName.isTouched &&
    (!firstName.value || !isValidFirsttName(firstName.value))
  ) {
    errors['firstName'] =
      errorCodes?.firstNameRequired?.value ||
      errorMessages?.firstNameRequired?.value
  }

  // Last Name
  if (
    lastName.isTouched &&
    (!lastName.value || !isValidLastName(lastName.value))
  ) {
    errors['lastName'] =
      errorCodes?.lastNameRequired?.value ||
      errorMessages?.lastNameRequired?.value
  }

  // Community Name
  if (
    communityName.isTouched &&
    (!communityName.value || !isValidCommunityName(communityName.value))
  ) {
    errors['communityName'] =
      errorCodes?.communityNameRequired?.value ||
      errorMessages?.communityNameRequired?.value
  }

  // Community Address
  if (communityAddress.isTouched && !communityAddress.value) {
    errors['communityAddress'] =
      errorCodes?.communityAddressRequired?.value ||
      errorMessages?.communityAddressRequired?.value
  }

  // Number of units
  if (numberOfUnits.isTouched && !numberOfUnits.value) {
    errors['numberOfUnits'] =
      errorCodes?.numberOfUnitsRequired?.value ||
      errorMessages?.numberOfUnitsRequired?.value
  }

  // Email address
  if (emailAddress.isTouched) {
    if (!emailAddress.value) {
      errors['emailAddress'] =
        errorCodes?.emailAddressRequired?.value ||
        errorMessages?.emailAddressRequired?.value
    } else if (!isValidEmail(emailAddress.value)) {
      errors['emailAddress'] =
        errorCodes?.invalidEmailAddress?.value ||
        errorMessages?.invalidEmailAddress?.value
    }
  }

  // Phone Number
  if (phoneNumber.isTouched) {
    if (!phoneNumber.value) {
      errors['phoneNumber'] =
        errorCodes?.phoneNumberRequired?.value ||
        errorMessages?.phoneNumberRequired?.value
    } else if (!isValidMobileNumber(phoneNumber.value)) {
      errors['phoneNumber'] =
        errorCodes?.phoneNumberDigits?.value ||
        errorMessages?.phoneNumberDigits?.value
    }
  }

  //optForSigning
  if (optForSigning.isTouched && !optForSigning.value) {
    errors['optForSigning'] =
      errorCodes?.optForSigningRequired?.value ||
      errorMessages?.optForSigning?.value
  }

  return errors
}

const isFormComplete = (form: IMultifamilyForm, errors: any = {}) => {
  if (Object.keys(errors).length !== 0) {
    return false
  }
  const {
    firstName,
    lastName,
    communityName,
    communityAddress,
    numberOfUnits,
    emailAddress,
    phoneNumber,
    optForSigning,
  } = form

  const nameInputs = firstName.value && lastName.value

  return Boolean(
    nameInputs &&
      communityName.value &&
      communityAddress.value &&
      numberOfUnits.value &&
      emailAddress.value &&
      phoneNumber.value &&
      optForSigning.value,
  )
}
