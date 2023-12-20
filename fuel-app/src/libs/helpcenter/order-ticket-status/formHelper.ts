import * as yup from 'yup'
const schema = yup.object().shape({
  orderOrTTNumber: yup.string(),
  zipCode: yup.string(),
  lastName: yup.string(),
  accountNumber: yup.string(),
  recaptcha: yup.string(),
})

export const initialValues = {
  orderOrTTNumber: '',
  zipCode: '',
  lastName: '',
  accountNumber: '',
  recaptcha: '',
}
export default schema
