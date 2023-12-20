/* eslint-disable @typescript-eslint/indent */
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import {
  CARD_NOT_SUPPORTED,
  PAYMENT_BLOCKED,
  PAYMENT_VELOCITY,
  SESSION_TIMED_OUT,
  SOMETHING_WRONG,
  SOMETHING_WRONG_PAYMENT,
} from 'src/constants/paymentErrors'
import { Info } from 'src/libs/account/shared/Info'
import {
  PaymentInfoResult,
  WalletInfoResult,
  PaymentIframeError,
  PaymentType,
} from './types'
import {
  usePaymentsAuthContext,
  usePaymentsFormContext,
} from './PaymentsFormContext'

const toPaymentInfo = (
  response: any,
  isBankAccountSelected: boolean,
): PaymentInfoResult => {
  if (response.fundingAccountValidationResult.fundingAccount) {
    const token =
      response.fundingAccountValidationResult.fundingAccount.fundingAccountToken
    const paymentMethod = `${
      response.fundingAccountValidationResult.fundingAccount[
        isBankAccountSelected ? 'bankAccountType' : 'fundingMethod'
      ]
    } ending in ${
      response.fundingAccountValidationResult.fundingAccount
        .fundingAccountLastFourDigit
    }`
    return {
      paymentType: isBankAccountSelected ? 'ONE_TIME_ACH' : 'ONE_TIME_CARD',
      token,
      paymentMethod,
    }
  }
  throw Error('Something went wrong')
}

const toWalletInfo = (
  response: any,
  isBankAccountSelected: boolean,
): WalletInfoResult => {
  if (response.fundingAccountValidationResult.fundingAccount) {
    const { checkValidationDetail, cardValidationDetail, fundingAccount } =
      response.fundingAccountValidationResult
    const {
      fundingAccountToken,
      fundingMethod,
      fundingAccountLastFourDigit,
      bankAccountType,
      firstName,
      lastName,
    } = fundingAccount
    const subType = isBankAccountSelected ? bankAccountType : fundingMethod
    const fundingClass = isBankAccountSelected
      ? checkValidationDetail?.fundingAccountType
      : cardValidationDetail?.fundingMethodDetail?.fundingCardType
    return {
      token: fundingAccountToken,
      status: 'Active',
      type: isBankAccountSelected ? 'Checking' : 'Card',
      subType,
      accountNumberEndsWith: fundingAccountLastFourDigit,
      description: `${subType} ending in ${fundingAccountLastFourDigit}`,
      class: fundingClass,
      accountHolderName: {
        firstName,
        lastName,
      },
    }
  }
  throw Error('Something went wrong')
}

const errorResponseHandler = (response: any): PaymentIframeError => {
  const { statusMessages = [], statusCode } = response?.result || {}
  const code =
    (Array.isArray(statusMessages) &&
      statusMessages.length > 0 &&
      statusMessages[0].code) ||
    undefined
  let message = ''
  const analytics = { event: 'event88', eVar: 'eVar88' }
  if (statusCode === 'BusinessRuleViolation') {
    switch (code) {
      case 140:
        message = CARD_NOT_SUPPORTED
        break
      case 113:
        //message = 'login' //TODO: Check the message for login key
        message = SESSION_TIMED_OUT
        break
      case 114:
        message = PAYMENT_VELOCITY
        break
      case 137:
        message = PAYMENT_BLOCKED
        break
      default:
        message = SOMETHING_WRONG_PAYMENT
        analytics.event = 'event48'
        analytics.eVar = 'eVar48'
        break
    }
  } else if (statusCode == 'SecurityException' && code === 116) {
    message = SESSION_TIMED_OUT
  } else if (statusCode == 'FailedValidation' && code === 107) {
    message = SOMETHING_WRONG_PAYMENT
    analytics.event = 'event48'
    analytics.eVar = 'eVar48'
  } else {
    message = SOMETHING_WRONG_PAYMENT
    analytics.event = 'event48'
    analytics.eVar = 'eVar48'
  }

  return {
    code,
    message,
    analytics,
  }
}

const successResponseHandler = (
  response: any,
  actionType: string,
  isBankAccountSelected: boolean,
) => {
  if (actionType === 'Payment') {
    return toPaymentInfo(response, isBankAccountSelected)
  } else {
    return toWalletInfo(response, isBankAccountSelected)
  }
}

const PaymentIframe = ({ type }: { type: PaymentType }) => {
  const iframeRef = React.useRef<HTMLIFrameElement>(null)
  const { locale } = useRouter()
  const formContext = usePaymentsFormContext()
  const authContext = usePaymentsAuthContext()
  const languageIndicator = locale === 'es' ? 'es-mx' : 'en-us'
  const query = `?languageIndicator=${languageIndicator}&billerShortName=${process.env.NEXT_PUBLIC_BILLER_SHORT_NAME}`
  const iframeSrc = authContext
    ? process.env.NODE_ENV === 'production'
      ? `${
          type === 'BankAccount' ? authContext.bankUrl : authContext.creditUrl
        }${query}`
      : `${
          type === 'BankAccount' ? authContext.bankUrl : authContext.creditUrl
        }${query}`
    : ''

  const removeIframeListener = () => {
    window.removeEventListener('message', iframeMessageHandler)
  }

  const responseHandler = (message: string) => {
    // Remove the listener, by this time we have already received the message from iframe that we expected
    removeIframeListener()
    try {
      const response = JSON.parse(message)
      if (
        response.fundingAccountValidationResult?.summaryValidationState !==
        'Valid'
      ) {
        const error = errorResponseHandler(response)
        formContext?.onIframeMessageCallback(error, null)
      } else {
        const result = successResponseHandler(
          response,
          formContext?.action || '',
          type === 'BankAccount',
        )
        formContext?.onIframeMessageCallback(null, result)
      }
    } catch (e) {
      formContext?.onIframeMessageCallback({ message: SOMETHING_WRONG }, null)
    }
  }

  const iframeMessageHandler = (event: MessageEvent<any>) => {
    if (event.origin === new URL(iframeSrc).origin) {
      switch (event.data.Type) {
        case 'resize':
          /**
           * resize event gets triggered on iframe doc ready and validation failure.
           * As we add the listener only on form submission, we can assume that resize
           * event that got triggered is for validation failure. Hence, set the iframe
           * height to accommodate the error messages and invoke the callback to indicate
           * the iframe form validation failure
           */
          if (iframeRef.current) {
            iframeRef.current.height = event.data.Height
          }
          //Adding this timeout to ensure the modal is open for sometime
          formContext &&
            setTimeout(
              () =>
                formContext.onIframeMessageCallback(
                  { message: 'FormValidationFailed' },
                  null,
                ),
              500,
            )
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

  useEffect(() => {
    /**
     * Add the listener and post message only when formContext is available. FormContext is available
     * when the form is submitted. This implies that when the form is submitted we post the message
     * (auth details required to submit the fiserv form) to fiserv iframe. Fiserve iframe submits the
     * form if form is valid and posts the response to the parent window(frontier). If the form is invalid,
     * it triggers the iframe resize.
     */
    if (formContext && authContext && iframeRef.current) {
      window.addEventListener('message', iframeMessageHandler)
      iframeRef.current.contentWindow?.postMessage(
        {
          Authorization: authContext.auth,
          APIKey: authContext.APIKey,
          SessionToken: authContext.sessionToken,
          RequestTimeStamp: new Date().toISOString(),
          MessageId: authContext.messageId,
        },
        '*',
      )
      return removeIframeListener
    }
  }, [formContext, authContext, iframeRef.current])

  return iframeSrc ? (
    <iframe
      ref={iframeRef}
      id="billerUIiFrame"
      name="bank-card-iframe"
      frameBorder="0"
      scrolling="no"
      width="320"
      height={type === 'BankAccount' ? '520' : '420'}
      src={iframeSrc}
    ></iframe>
  ) : (
    <Info type="error" message={SOMETHING_WRONG} />
  )
}

export default PaymentIframe
