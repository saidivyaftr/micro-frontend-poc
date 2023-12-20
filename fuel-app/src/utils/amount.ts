export const formatAmount = (input: number | undefined) => {
  if (!input) {
    return '0.00'
  }
  return parseFloat(`${input}`).toFixed(2)
}

export const formatAmountInDollar = (input: number | undefined | string) => {
  if (!input) {
    return '$0.00'
  }
  const parsedInput = Number(input)
  return parsedInput < 0
    ? `-$${parseFloat(Math.abs(parsedInput).toString()).toFixed(2)}`
    : `$${parseFloat(Math.abs(parsedInput).toString()).toFixed(2)}`
}
