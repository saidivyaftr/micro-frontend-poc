import { AccountAddress } from 'src/redux/types/registerTypes'

export interface SingleLineAddress {
  addressLine1: string
  addressLine2: string
  city: string
  stateProvince: string
  zipCode: string
}

export const formSingleLineAddress = (
  singleAddress: SingleLineAddress,
  includeZipCode: boolean,
): string => {
  const { addressLine1, addressLine2, city, stateProvince, zipCode } =
    singleAddress || {}
  const fields = [addressLine1, addressLine2, city, stateProvince]
  const address = fields.filter((x) => x).join(', ')
  return includeZipCode ? `${address} ${zipCode}` : address
}

export const formSingleLineAddressForESBAddress = (
  address: AccountAddress,
): string => {
  const {
    streetNumber,
    streetSuffix,
    streetName,
    city,
    state,
    zipCode = '',
  } = address || {}
  const streetAddress = [streetNumber, streetName, streetSuffix]
    .filter((x: any) => !!x)
    .join(' ')
  const fields = [streetAddress, city, state, zipCode.slice(0, 5)]
  return fields.filter((x) => x).join(', ')
}

const getZipCode = (zip: string) => {
  if (zip?.length === 9) {
    const firstPart = zip.slice(0, 5)
    const secondPart = zip.slice(5)
    return secondPart === '0000' ? firstPart : `${firstPart}-${secondPart}`
  }
  return zip
}

export const capitalizeString = (str: string | null) => {
  if (!str) {
    return null
  }
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

export const formSingleLineAddressForServiceAddress = (address: any) => {
  if (!address) {
    return []
  }
  const {
    streetNumber,
    streetSuffix,
    streetName,
    street,
    city,
    state,
    zipCode,
    zip,
  } = address
  const [street1, street2] = Array.isArray(street) ? street : [street, '']
  const formattedZip = zip ? getZipCode(zip) : zipCode?.slice(0, 5)
  const firstRow = [capitalizeString(street1), capitalizeString(street2)]
    .filter(Boolean)
    .join(', ')
  const addressRow = [
    streetNumber + ' ' + capitalizeString(streetName),
    capitalizeString(streetSuffix),
  ]
    .filter(Boolean)
    .join(' ')
  const secondRow = [capitalizeString(city), state, formattedZip]
    .filter(Boolean)
    .join(', ')
  return [street ? firstRow : addressRow, secondRow]
}

export const checkIfServiceAddressSameAsBillingAddress = (
  serviceAddress: any,
  billingAddress: any,
) => {
  if (!serviceAddress || !billingAddress) {
    return false
  }
  // City check
  if (
    serviceAddress.city?.toLowerCase() !== billingAddress.city?.toLowerCase()
  ) {
    return false
  }
  // state check
  if (
    serviceAddress.state?.toLowerCase() !== billingAddress.state?.toLowerCase()
  ) {
    return false
  }
  // Zip check
  const serviceZip = getZipCode(serviceAddress?.zip)
  const billingZip = getZipCode(billingAddress?.zip)
  if (serviceZip !== billingZip) {
    return false
  }
  // street address
  const [serviceStreet1 = '', serviceStreet2 = ''] = Array.isArray(
    serviceAddress?.street,
  )
    ? serviceAddress?.street
    : [serviceAddress?.street]
  const [billingStreet1 = '', billingStreet2 = ''] = Array.isArray(
    billingAddress?.street,
  )
    ? billingAddress?.street
    : [billingAddress?.street]
  if (serviceStreet1 !== billingStreet1 || serviceStreet2 !== billingStreet2) {
    return false
  }
  return true
}

export const formAddressToTitleCase = (str: string) => {
  return str
    .toLowerCase()
    .split(' ')
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')
}
