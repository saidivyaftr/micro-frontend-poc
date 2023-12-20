export const isValidEmail = (email: string) => {
  if (!email) {
    return false
  }
  return email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    )
}

export const isValidOrderNumber = (orderNumber: string) => {
  if (!orderNumber) {
    return false
  }
  return orderNumber.match(/(^[0-9]{8,9})$/)
}

export const isValidFirsttName = (firstName: string) => {
  if (!firstName) {
    return false
  }
  return firstName.match(
    /(^[A-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð]{2,20})$/i,
  )
}

export const isValidLastName = (lastName: string) => {
  if (!lastName) {
    return false
  }
  return lastName.match(
    /(^[A-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð\'-]{2,20})$/i,
  )
}

export const isValidCommunityName = (communityName: string) => {
  if (!communityName) {
    return false
  }
  return communityName.match(
    /^[a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
  )
}

export const isValidZipCode = (zipCode: string) => {
  if (!zipCode) {
    return false
  }
  return zipCode.match(/(^[0-9]{5})$/)
}

export const containsNumber = (str: string) => /\d/.test(str)

export const containsUppercaseLetter = (str: string) => /[A-Z]/.test(str)

export const isValidPassword = (str: string) => {
  return str.length >= 8 && containsNumber(str) && containsUppercaseLetter(str)
}

export const isValidMobileNumber = (mobileNumber: string) => {
  if (!mobileNumber) {
    return false
  }
  return mobileNumber?.match?.(
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/im,
  )
}

export const isMobileNumber = (mobileNumber: string) => {
  const stringWithNoDotsAndHyphens = mobileNumber.replace(/[().-]/g, '')

  return stringWithNoDotsAndHyphens && /^\d+$/.test(stringWithNoDotsAndHyphens)
}
