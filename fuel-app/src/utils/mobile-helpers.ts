export const addDashes = (phoneNumber: string) => {
  if (typeof phoneNumber === 'string') {
    const ph_no = phoneNumber.replace(/\D[^\.]/g, '')
    const value =
      ph_no.slice(0, 3) + '-' + ph_no.slice(3, 6) + '-' + ph_no.slice(6)
    return value
  }
  return phoneNumber
}

export const addBracketAndHypen = (phoneNumber: string) => {
  if (typeof phoneNumber === 'string') {
    const ph_no = phoneNumber.replace(/\D[^\.]/g, '')
    const value =
      '(' + ph_no.slice(0, 3) + ') ' + ph_no.slice(3, 6) + '-' + ph_no.slice(6)
    return value
  }
  return phoneNumber
}

export const removeDashes = (phoneNumber: string) => {
  if (typeof phoneNumber === 'string')
    return phoneNumber.replace(/[^\d\+]/g, '')
  return phoneNumber
}
