const usePhoneValidation = (phone: string) => {
  const SingleCharacterString = (str: string) => {
    const Fletter = str.substr(0, 1)
    return str.replace(new RegExp(Fletter, 'g'), '').length == 0 //Remove all letters that are the first letters, if they are all the same, no letters will remain
  }

  const CheckSequence = (phoneNumber: string) => {
    const params = [
      '012345',
      '123456',
      '234567',
      '345678',
      '456789',
      '567890',
      '678901',
      '789012',
      '890123',
      '901234',
      '987654',
      '876543',
      '765432',
      '654321',
      '543210',
    ]
    if (params.indexOf(phoneNumber) > -1) {
      return true
    }
    return false
  }

  const validResponse = {
    isValid: false,
    response: '',
  }
  const phoneFormatted = phone.toString().split('-')
  const phone1Formatted = phoneFormatted[0]
  const phone2Formatted = phoneFormatted[1]
  const phone3Formatted = phoneFormatted[2]
  const phone1 = parseInt(phone1Formatted)
  const phone2 = parseInt(phone2Formatted)
  const phone3 = parseInt(phone3Formatted)
  if (!phone1 || !phone2 || !phone3) {
    validResponse.isValid = false
    validResponse.response = 'Contact number must be 10-digit in length'
    return validResponse
  } else {
    if (
      phone1.toString().length +
        phone2.toString().length +
        phone3.toString().length <
      10
    ) {
      validResponse.isValid = false
      validResponse.response = 'Contact number must be 10-digit in length'
      return validResponse
    } else if (
      (phone1 > 878 && phone1 < 888) ||
      (phone1 > 888 && phone1 < 901)
    ) {
      validResponse.isValid = false
      validResponse.response =
        'Area Code must not be between 878 and 901, 888 is acceptable'
      return validResponse
    } else if (
      SingleCharacterString(phone1Formatted + phone2Formatted + phone3Formatted)
    ) {
      validResponse.isValid = false
      validResponse.response =
        'Contact number must not have repeating values 777.777.7777 etc'
      return validResponse
    } else if (
      phone1Formatted.substring(
        phone1Formatted.length - 2,
        phone1Formatted.length,
      ) === '00' ||
      phone1Formatted === '666'
    ) {
      if (phone1 == 800) {
        validResponse.isValid = true
        validResponse.response = ''
        return validResponse
      } else {
        validResponse.isValid = false
        validResponse.response =
          'Area Codes 200, 300, 400, 500, 600, 666, 700 are not allowed'
        return validResponse
      }
    } else if (CheckSequence(phone1Formatted + phone2Formatted)) {
      validResponse.isValid = false
      validResponse.response =
        'Contact number must not be a series of sequential numbers 123.456.7890 etc.'
      return validResponse
    } else if (phone1 < 201) {
      validResponse.isValid = false
      validResponse.response = 'Area Code must be greater than 201'
      return validResponse
    } else if (phone2 < 200) {
      validResponse.isValid = false
      validResponse.response = 'Exchanges less than 200 are not allowed. '
      return validResponse
    } else if (phone1 > 989) {
      validResponse.isValid = false
      validResponse.response = 'Area code may not be greater than 989.'
      return validResponse
    } else {
      validResponse.isValid = true
      validResponse.response = ''
      return validResponse
    }
  }
}

export default usePhoneValidation
