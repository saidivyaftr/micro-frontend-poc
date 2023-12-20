import { ICampaignForm } from './CampaignForm'
import { isValidEmail } from 'src/utils/validator'
import { useAppData } from 'src/hooks'

const ONLY_CHARACTERS = /^[A-Za-z]+$/

export const useCampaignFormValidator = (form: ICampaignForm) => {
  const campaignFormData = useAppData('campaignFormData', true)
  const errors: any = validateErrors(form, campaignFormData)
  const formFilled: boolean = isFormComplete(form, errors)
  return [formFilled, errors]
}

const onlyCharacters = (text: string) => !!text.match(ONLY_CHARACTERS)

const validateErrors = (form: ICampaignForm, campaignFormData: any) => {
  const {
    invalidFirstName,
    invalidLastName,
    invalidEmail,
    invalidMobileNumber,
    selectPreferedContact,
  } = campaignFormData
  const { firstName, lastName, email, mobileNumber, preferredContact } = form
  const errors: any = {}
  // First Name
  if (
    firstName.isTouched &&
    (!firstName.value || !onlyCharacters(firstName.value))
  ) {
    errors['firstName'] = invalidFirstName?.value || 'Invalid first name format'
  }
  // Last Name
  if (
    lastName.isTouched &&
    (!lastName.value || !onlyCharacters(lastName.value))
  ) {
    errors['lastName'] = invalidLastName?.value || 'Invalid last name format'
  }
  // email
  if (email.isTouched) {
    if (email?.value.trim().length && !isValidEmail(email?.value)) {
      errors['email'] = invalidEmail?.value || 'Invalid email format'
    }
  }
  // mobileNumber
  if (mobileNumber.isTouched) {
    if (
      mobileNumber?.value.trim()?.length &&
      mobileNumber?.value.match(/\d/g)?.length !== 10
    ) {
      errors['mobileNumber'] =
        invalidMobileNumber?.value || 'Invalid phone number format'
    }
  }
  // prefered method of contact
  if (preferredContact.isTouched) {
    if (preferredContact?.value.length === 0) {
      errors['preferredContact'] =
        selectPreferedContact?.value ||
        'Pending preffered contact method selection'
    }
  }
  return errors
}

const isFormComplete = (form: any, errors: any = {}) => {
  if (Object.keys(errors).length) {
    return false
  }
  return !Object.keys(form).some((formField: string) => {
    const { isRequired, value } = form[formField]
    return isRequired && !value
  })
}
