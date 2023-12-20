/* eslint-disable @typescript-eslint/indent */
import { createContext, useContext } from 'react'
import { DstAuthDetails } from 'src/redux/types/payments'
import { PaymentAction, OnIframeMessageCallback } from './types'

export type PaymentIframeAuthData = Pick<
  DstAuthDetails,
  'auth' | 'APIKey' | 'bankUrl' | 'creditUrl' | 'messageId' | 'sessionToken'
>
export type PaymentsFormContextValue = {
  action: PaymentAction
  onIframeMessageCallback: OnIframeMessageCallback
}

export type PaymentsAuthContextValue = PaymentIframeAuthData

const PaymentsFormContext = createContext<PaymentsFormContextValue | null>(null)
const usePaymentsFormContext = () => useContext(PaymentsFormContext)

const PaymentsAuthContext = createContext<PaymentsAuthContextValue | null>(null)
const usePaymentsAuthContext = () => useContext(PaymentsAuthContext)

export {
  PaymentsFormContext,
  usePaymentsFormContext,
  PaymentsAuthContext,
  usePaymentsAuthContext,
}
