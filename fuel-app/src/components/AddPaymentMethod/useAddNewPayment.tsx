import { useEffect, useRef, useState } from 'react'
import { DstAuthDetails } from 'src/redux/types/payments'
import { ErrorType, FiservData, PaymentType } from './types'
import { useRouter } from 'next/router'
import ApiClient from 'src/api-client'
import { useActiveAccountId } from 'src/selector-hooks'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { SITE_ERROR } from 'src/constants'

export const useAddNewPayment = (
  dstConfig: DstAuthDetails,
  successCallback?: (
    paymentID: string,
    isDefault: boolean,
    cardType: string,
    methodName?: string,
    addedPaymentMethod?: boolean,
  ) => void,
) => {
  const { locale } = useRouter()
  const iframeRef = useRef<any>(null)
  const accountId = useActiveAccountId()

  const [isBusyAddingMethod, setIsBusyAddingMethod] = useState(false)
  const [selectedPaymentType, setSelectedPaymentType] =
    useState<PaymentType | null>(null)
  const [apiError, setAPIError] = useState<ErrorType>(null)
  const [defaultPayment, setDefaultPayment] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [savePayment, setSavePayment] = useState(false)
  const [showSavePayment, setShowSavePayment] = useState(false)

  const url =
    selectedPaymentType === 'BANK' ? dstConfig?.bankUrl : dstConfig?.creditUrl
  const languageIndicator = locale === 'es' ? 'es-mx' : 'en-us'
  const query = `?languageIndicator=${languageIndicator}&billerShortName=Frontier`
  const iframeURL = Boolean(selectedPaymentType) ? `${url}${query}` : null

  let timeout: any = null

  // Adds event listener on load and removes the event listener on unmount
  // This helps us receive events such as "resize", "Success", "Failure"
  useEffect(() => {
    if (iframeURL && iframeRef.current) {
      window.addEventListener('message', iframeMessageHandler)
      return removeIframeListener
    }
  }, [iframeURL, defaultPayment, successCallback])

  // Removing the event listener
  const removeIframeListener = () => {
    window.removeEventListener('message', iframeMessageHandler)
  }

  // Event handler that listeners to iframe communication
  // "resize", "Success", "Failure"
  const iframeMessageHandler = (event: MessageEvent<any>) => {
    if (iframeURL && event.origin === new URL(iframeURL).origin) {
      switch (event.data.Type) {
        case 'resize':
          if (iframeRef.current) {
            iframeRef.current.height = event.data.Height
          }
          break
        case 'message':
        default:
          if (event.data.Message) {
            responseHandler(event.data.Message)
          }
          break
      }
    }
  }

  // Handles the message response from the iframe
  const responseHandler = async (message: string) => {
    // Remove the listener, by this time we have already received the message from iframe that we expected
    removeIframeListener()
    try {
      const response: FiservData = JSON.parse(message)
      if (timeout) {
        clearTimeout(timeout)
      }
      const isValidInformation =
        response.fundingAccountValidationResult?.summaryValidationState ===
        'Valid'
      if (isValidInformation) {
        setAPIError(null)
        const lastFourDigits =
          response?.fundingAccountValidationResult.fundingAccount
            ?.fundingAccountLastFourDigit
        const fundingMethod =
          response?.fundingAccountValidationResult?.fundingAccount
            ?.fundingMethod || 'Card'
        const bankAccountType =
          response?.fundingAccountValidationResult?.fundingAccount
            ?.bankAccountType || 'Bank'
        const shouldAddPaymentMethod =
          !showSavePayment || (showSavePayment && savePayment)
        if (shouldAddPaymentMethod) {
          await ApiClient.postPaymentMethod(accountId, {
            customerName: dstConfig.customerName,
            customerType: dstConfig.customerType,
            isDefault: defaultPayment,
            nickName:
              selectedPaymentType === 'CARD'
                ? `${fundingMethod} ending in ${lastFourDigits}`
                : `${bankAccountType} ending in ${lastFourDigits}`,
            token:
              response.fundingAccountValidationResult?.fundingAccount
                ?.fundingAccountToken,
          })
          const trackingObject = {
            events: defaultPayment ? 'event177,event179' : 'event177',
            eVar54:
              'new|' +
              (selectedPaymentType === 'CARD' ? 'credit or debit card' : 'ach'),
          }
          DTMClient.triggerEvent(
            trackingObject,
            'tl_o',
            'payment methods:add payment',
          )
        }
        if (successCallback) {
          const { fundingAccount } =
            response.fundingAccountValidationResult || {}
          const {
            fundingAccountToken,
            bankAccountType,
            fundingMethod,
            fundingAccountLastFourDigit,
          } = fundingAccount || {}
          const methodName = `${
            fundingMethod || bankAccountType
          } ****${fundingAccountLastFourDigit}`

          await successCallback(
            fundingAccountToken,
            defaultPayment,
            fundingMethod,
            methodName,
            shouldAddPaymentMethod,
          )
        }
        setSelectedPaymentType(null)
      } else {
        const errorCode = errorResponseHandler(response)
        setAPIError(errorCode)
      }
    } catch (e: any) {
      DTMClient.triggerEvent(
        {
          events: 'event88',
          eVar2: 'payment methods',
          eVar88: 'Failed to add payment',
        },
        'tl_o',
        SITE_ERROR,
      )
      const code = extractErrorCode(e?.response?.data?.error)
      const errorCode = mapStatusToError(code)
      setAPIError(errorCode)
    }
    setIsBusyAddingMethod(false)
  }

  const startTimer = () => {
    timeout = setTimeout(() => {
      setIsBusyAddingMethod(false)
    }, 10_000)
  }

  // This post will let us authenticate the entered card details against the tokens
  // Result of this operation is received as an event to iframeMessageHandler() method
  const postMessageToIframe = () => {
    return iframeRef?.current?.contentWindow?.postMessage(
      {
        Authorization: dstConfig.auth,
        APIKey: dstConfig.APIKey,
        SessionToken: dstConfig.sessionToken,
        RequestTimeStamp: new Date().toISOString(),
        MessageId: dstConfig.messageId,
      },
      '*',
    )
  }

  const handleSave = () => {
    setIsBusyAddingMethod(true)
    postMessageToIframe()
    startTimer()
  }

  const updateSelectedPaymentType = (value: PaymentType) => {
    setAPIError(null)
    setSelectedPaymentType(value)
  }

  const handleDefaultPayment = (value: boolean) => {
    setDefaultPayment(value)
    if (!savePayment) setSavePayment(value)
  }

  return {
    iframeURL,
    iframeRef,
    selectedPaymentType,
    updateSelectedPaymentType,
    isBusyAddingMethod,
    defaultPayment,
    handleDefaultPayment,
    termsAccepted,
    setTermsAccepted,
    setIsBusyAddingMethod,
    apiError,
    handleSave,
    savePayment,
    setSavePayment,
    setShowSavePayment,
  }
}

const errorResponseHandler = (response: any): ErrorType => {
  const code = response?.result?.statusMessages?.[0]?.code
  return mapStatusToError(code)
}

const mapStatusToError = (status: number | null): ErrorType => {
  switch (status) {
    case 104:
      return 'DUPLICATE'
    case 140:
      return 'CARD_NOT_SUPPORTED'
    case 113:
    case 116:
      return 'SESSION_TIMED_OUT'
    case 114:
      return 'PAYMENT_VELOCITY'
    case 137:
      return 'PAYMENT_BLOCKED'
    default:
      return 'SOMETHING_WENT_WRONG'
  }
}

const extractErrorCode = (inputString: string) => {
  const regex = /Code\s*:\s*(\d+)/
  const match = inputString.match(regex)
  if (match && match[1]) {
    return parseInt(match[1], 10)
  }
  return null
}
