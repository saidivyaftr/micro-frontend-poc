const useFormatterAccountNumber = (): UseAccountNumberState => {
  const formatterAccountNumber = (accountNumber: string) => {
    if (accountNumber?.length === 17) {
      const accountNumberFormatted = accountNumber?.replace(
        /(\d{3})(\d{3})(\d{4})(\d{6})(\d+)/,
        '$1-$2-$3-$4-$5',
      )
      return accountNumberFormatted
    }
    return ''
  }
  return { formatterAccountNumber }
}

type UseAccountNumberState = {
  // eslint-disable-next-line no-unused-vars
  formatterAccountNumber: (value: string) => string
}

export default useFormatterAccountNumber
