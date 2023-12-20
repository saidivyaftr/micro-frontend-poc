import { validateAge } from 'src/utils/dobHelper'
import { SSNForm } from '../steps/VerifyWithSSN'

export const validateSSNForm = (form: SSNForm, formConstantsData: any) => {
  const errors: any = validateErrors(form, formConstantsData)
  const formFilled: boolean = isFormComplete(form, errors)
  return [formFilled, errors]
}

const validateErrors = (form: SSNForm, formConstantsData: any = {}) => {
  const { ssn, date, month, year } = form
  const errors: any = {}
  if (ssn.isTouched && ssn.value.length !== 4) {
    errors['ssn'] = formConstantsData?.invalidSSN?.value
  }
  if (date.isTouched && month.isTouched && year.isTouched) {
    if (!validateAge(`${month.value}/${date.value}/${year.value}`)) {
      errors['dob'] = formConstantsData?.invalidDOB?.value
    }
  }
  return errors
}

const isFormComplete = (form: SSNForm, errors: any = {}) => {
  const { ssn, date, month, year } = form
  const isComplete = Boolean(
    ssn.value && date.value && year.value && month.value,
  )
  if (!isComplete) {
    return false
  }
  if (Object.keys(errors).length !== 0) {
    return false
  }
  return true
}
