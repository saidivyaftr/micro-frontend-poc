import { PaymentMethodsData } from 'src/redux/types/payments'

export const scrollToSavedPayments = () => {
  const elementToScrollTo = document.getElementById('savedPaymentMethods')

  if (elementToScrollTo) {
    window.scrollTo({
      top: elementToScrollTo.offsetTop - 200,
      behavior: 'smooth',
    })
  }
}

export const getDefaultPaymentMethodId = (
  paymentMethodsData: PaymentMethodsData,
) => paymentMethodsData?.paymentMethods?.find((x) => x.default)?.id

export const checkForPaymentsWithPrevDefault = (
  scheduledPayments = [],
  paymentMethodsData: PaymentMethodsData,
  prevDefaultMethodId?: string | null,
) => {
  const defaultPaymentId =
    prevDefaultMethodId || getDefaultPaymentMethodId(paymentMethodsData)
  return (
    scheduledPayments?.filter(
      (x: any) =>
        x.status === 'Scheduled' && defaultPaymentId === x.paymentMethodId,
    )?.length > 0
  )
}
