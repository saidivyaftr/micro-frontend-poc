import { SELF_SERVICE } from 'src/constants'
import { CartLineItem } from './types'

export const shouldRedirect = (authFromSession?: string) => {
  const str = window.location.search
  if ((!str.includes('?t=') || str.length < 39) && !authFromSession) {
    sessionStorage.clear()
    window.location.href = '../login'
  }
}
export const removeTokenFromParams = () => {
  history.replaceState(null, '', location.pathname)
}

export const priceFormatter = (price?: number, recurring = false) => {
  return recurring ? `$${price?.toFixed(2)}/mo.` : `$${price?.toFixed(2)}`
}

export const priceFormatterWithoutDecimal = (
  price?: number,
  recurring = false,
) => {
  return recurring ? `$${price}/mo.` : `$${price}`
}
export const replacer = (
  wholeString: string,
  stringToReplace: string,
  newValue: any,
) => {
  return wholeString.replace(stringToReplace, newValue)
}

export const formatAddress = (address: {
  AddressLine1: string
  AddressLine2?: string
  City: string
  State: string
  ZipCode: string
}) => {
  return `${address.AddressLine1} ${
    address.AddressLine2 ? address.AddressLine2 : ''
  } ${address.City}, ${address.State} ${address.ZipCode}`
}

export const matchICase = (str: string) => {
  const regex = new RegExp(/I-[0-9]{7}/g)
  return regex.test(str)
}

export const getProductVAS = (
  cartItems: CartLineItem[],
  filteredCartItems: CartLineItem[],
  withDetail = false,
) => {
  const products: string[] = []
  filteredCartItems.map((serviceItem: CartLineItem) => {
    let productVASName = `${getProductVASCode(
      serviceItem.ItemCode,
      serviceItem.Category,
    )}`
    if (withDetail) {
      productVASName += `;1` // Quantity
      // From serviceItem where ever we find one time charges, updating those charges in Analytics String
      if (serviceItem.SummaryLevel === 'One Time Charges') {
        productVASName +=
          serviceItem.Price !== 0 ? `;${serviceItem.Price}` : '0.00' // Price
      } else {
        productVASName += ';0' // Price
      }

      if (serviceItem.Recurring === true) {
        productVASName += `;event182=${serviceItem.Quantity}|event31=${serviceItem.Price}`
      }
      // TODO - Right now no product with discount coming from API so code commented
      if (serviceItem.Discounts) {
        productVASName += `|event32=${serviceItem.Discounts}`
      }
    }
    products.push(productVASName)
  })
  return products
}

export const getProductCode = (itemCode: string, itemCategory: string) => {
  if (itemCode !== '') {
    switch (itemCode) {
      case SELF_SERVICE.PRODUCT_MPTP_PAGE_CODE:
        return SELF_SERVICE.PRODUCT_MPTP
        break
      case SELF_SERVICE.PRODUCT_WHWIFI_PAGE_CODE:
        return SELF_SERVICE.PRODUCT_WHWIFI
        break
      case SELF_SERVICE.PRODUCT_FSWFI_PAGE_CODE:
        return SELF_SERVICE.PRODUCT_EEROSECURE
        break
      case SELF_SERVICE.PRODUCT_YTTVE_PAGE_CODE:
        return SELF_SERVICE.PRODUCT_YTTVE
        break
      case SELF_SERVICE.PRODUCT_FTRTS_PAGE_CODE:
        return SELF_SERVICE.PRODUCT_FTRTS
        break
    }
  }
  if (itemCategory === SELF_SERVICE.EXTENDERS) {
    return SELF_SERVICE.PRODUCT_EXTENDERS
  }
  return ''
}

export const getProductVASCode = (itemCode: string, itemCategory: string) => {
  if (itemCode !== '') {
    return `;${getProductCode(itemCode, itemCategory)}`
  } else {
    return ''
  }
}
