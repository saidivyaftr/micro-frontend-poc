export const maskPhoneNumber = (phone: string) => {
  if (!phone) {
    return null
  }
  return '(***) ***-' + (phone.slice?.(-4) ?? '****')
}

export const maskEmail = (email: string) => {
  if (email === '') {
    return ''
  }
  const [firstPart = '', secondPart = ''] = email.split('@')
  const maskedFirstPart =
    firstPart?.substring(0, 3) + generateStars(firstPart.length - 3)
  const maskedSecondPart =
    secondPart?.substring(0, 3) + generateStars(secondPart.length - 3)
  return `${maskedFirstPart}@${maskedSecondPart}`
}

export const generateStars = (length: number) => {
  return length > 0 ? new Array(length).fill('*').join('') : ''
}

export const scrollToTop = () => {
  try {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  } catch (error) {
    console.log(error)
  }
}
