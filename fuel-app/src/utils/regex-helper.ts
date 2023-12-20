import { accountIDFormat } from 'src/constants'

export const accountIdRegex = (accountId: string): string => {
  let i = 0
  return accountIDFormat.replace(/#/g, () => accountId[i++] || '')
}

export const hideAccountNumber = (accountNumber: string): string =>
  accountNumber.replace(/.(?=.{4})/g, 'x')

export const showLastFourDigits = (value?: string): string =>
  value ? value.replace(/.(?=.{4})/g, 'x') : ''
