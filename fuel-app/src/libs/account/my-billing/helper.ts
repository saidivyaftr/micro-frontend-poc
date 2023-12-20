import { PaymentMethod } from 'src/redux/types/payments'
import { capitalizeString } from 'src/utils/addressHelpers'

export const getPaymentMethodLabel = (method: PaymentMethod) => {
  if (method?.nickName) {
    return method?.nickName
  }
  return `${capitalizeString(method?.subtype || '')} ****${
    method?.accountNumberEndsWith
  }`
}
