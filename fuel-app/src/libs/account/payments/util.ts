/* eslint-disable @typescript-eslint/indent */
import { AxiosError } from 'axios'
import {
  ACCOUNT_BLOCKED,
  ACCOUNT_VELOCITY,
  BAD_EMAIL,
  CARD_NOT_SUPPORTED,
  DUPLICATE_PAYMENT,
  PAYMENT_BLOCKED,
  PAYMENT_METHOD_TIED_TO_AUTOPAY,
  PAYMENT_METHOD_TIED_TO_PAYMENT,
  PAYMENT_VELOCITY,
  SOMETHING_WRONG,
  SOMETHING_WRONG_PAYMENT,
  UNKNOWN,
} from 'src/constants/paymentErrors'
import { format, parseISO } from 'date-fns'
import { AccountDetails } from 'src/redux/types/accountTypes'
import {
  Autopay,
  PaymentMethod,
  PaymentMethodList,
} from 'src/redux/types/payments'

export const BlockType = {
  Checking: 'Checking',
  Card: 'Card',
  None: 'None',
} as const
export type BlockType = typeof BlockType[keyof typeof BlockType]

export const getBlockType = (
  accountDetails: AccountDetails | Record<string, never>,
): BlockType => {
  if (accountDetails.constraints && accountDetails.constraints.blocking) {
    return accountDetails.constraints.blocking.isBlockedForACH
      ? BlockType.Checking
      : accountDetails.constraints.blocking.isBlockedForCard
      ? BlockType.Card
      : BlockType.None
  }
  return BlockType.None
}

export const getDefaultPaymentMethodId = (
  paymentMethodList: PaymentMethodList,
  blockType: BlockType,
) => {
  if (!paymentMethodList || !paymentMethodList.length) return 'new'
  const predicate =
    blockType === BlockType.None
      ? (paymentMethod: PaymentMethod) => paymentMethod.default
      : (paymentMethod: PaymentMethod) => paymentMethod.type !== blockType
  const defaultOption = paymentMethodList.find(predicate)
  return defaultOption ? defaultOption.id : paymentMethodList[0].id
}

export const paymentErrorHandler = (err: AxiosError) => {
  let status = 500
  let error = 'unknown'
  if (err.response) {
    status = err.response.status
    error = err.response.data.error
  }
  let errorMessage = SOMETHING_WRONG
  if (status === 400) {
    if (error === 'Bad Request' || error == 'Declined') {
      errorMessage = SOMETHING_WRONG_PAYMENT
    } else if (error === 'ACCOUNT_VELOCITY') {
      errorMessage = ACCOUNT_VELOCITY
    } else if (error === 'PAYMENT_VELOCITY') {
      errorMessage = PAYMENT_VELOCITY
    } else if (error === 'BAD_EMAIL') {
      errorMessage = BAD_EMAIL
    }
  } else if (status === 403) {
    if (error === 'ACCOUNT_BLOCKED') {
      errorMessage = ACCOUNT_BLOCKED
    } else if (error === 'PAYMENT_BLOCKED') {
      errorMessage = PAYMENT_BLOCKED
    }
  } else if (status === 422 && error === 'CARD_NOT_SUPPORTED') {
    errorMessage = CARD_NOT_SUPPORTED
  } else if (status === 408) {
    errorMessage = UNKNOWN
  } else if (status === 409) {
    if (error === 'DUPLICATE') {
      errorMessage = DUPLICATE_PAYMENT
    } else if (error === 'AUTO_PAYMENT') {
      errorMessage = PAYMENT_METHOD_TIED_TO_AUTOPAY
    } else if (error === 'SCHEDULED_PAYMENT') {
      errorMessage = PAYMENT_METHOD_TIED_TO_PAYMENT
    }
  }
  return errorMessage
}

export const filterAutopayDetails = (type: string, autopayDetails: Autopay) => {
  if (autopayDetails.length) {
    const filteredDetails = autopayDetails.filter(
      (details) => details.systemOfOrigin === type,
    )
    if (filteredDetails.length) return filteredDetails[0]
    else null
  } else {
    return null
  }
}

export const partitionAutopayTypes = (autopayDetails: Autopay) => {
  if (autopayDetails && autopayDetails.length) {
    const DSTTypes: Autopay = []
    const DPITypes: Autopay = []
    autopayDetails.forEach((details) => {
      if (details.systemOfOrigin === 'DST') {
        DSTTypes.push(details)
      } else {
        DPITypes.push(details)
      }
    })
    return [DSTTypes[0], DPITypes[0]]
  } else {
    return []
  }
}

export const formatDecimal = (value: number): string => {
  return value.toFixed(2)
}

export const formatDate = (datelikeThing: any, shortLong = 'short') => {
  let date = datelikeThing
  const formatting = shortLong === 'short' ? 'M/dd/yyyy' : 'MMM dd, yyyy'
  if (typeof datelikeThing === 'string') {
    const noZulu = datelikeThing.substring(0, 19)
    date = parseISO(noZulu)
  }
  return format(date, formatting)
}

export const formatCurrency = (amount: any) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })
  return formatter.format(amount)
}
