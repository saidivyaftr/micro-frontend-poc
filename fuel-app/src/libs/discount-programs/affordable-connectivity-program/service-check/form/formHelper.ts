import { getIn } from 'formik'
import { subYears } from 'date-fns'

export const MAX_DATE = subYears(new Date(), 18)

export const isRenderCheck = (dependents: any, values: any) => {
  for (const dependent in dependents) {
    if (!(getIn(values, dependent) === dependents[dependent])) return false
  }
  return true
}

export const hasError = (touched: any, errors: any, field: string) =>
  getIn(touched, field) && getIn(errors, field)

export const validateRadioValue = (
  inputValue: string,
  passvalue: boolean | string,
) => {
  const value =
    typeof passvalue == 'boolean' ? !!Number(inputValue) : inputValue
  return value === passvalue
}
export const parseDate = (
  value: any,
  originalValue: string | number | Date,
) => {
  return new Date(originalValue)
}
