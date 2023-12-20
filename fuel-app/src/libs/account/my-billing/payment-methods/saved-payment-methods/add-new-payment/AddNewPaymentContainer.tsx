import {
  useActiveAccount,
  useActiveAccountId,
  useAutopayDetails,
  useDSTConfigDetails,
  usePaymentList,
  usePaymentMethods,
} from 'src/selector-hooks'
import {
  fetchAutopayDetails,
  fetchPaymentMethods,
} from 'src/redux/slicers/payment'
import AddPaymentMethod from 'src/components/AddPaymentMethod'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { isAutoPayEnabled } from 'src/libs/account/helper'
import { PaymentMethod } from 'src/redux/types/payments'
import { UpdateAutoPayOrScheduledPayMethod } from '../shared-modals'
import {
  ConfirmationIcon,
  TechnicalErrorIcon,
} from '@/shared-ui/react-icons/index'
import { ActionModal } from 'src/libs/account/shared/modals'
import { CommercialCardAdded } from './CommercialCardAddedModal'
import {
  checkForPaymentsWithPrevDefault,
  getDefaultPaymentMethodId,
  scrollToSavedPayments,
} from '../helper'
import { DefaultUpdateConfirmation } from '../edit-payments-modal-content'
import { capitalizeString } from 'src/utils/addressHelpers'
import useAppData from '@/shared-ui/hooks/useAppData'

export type AddPaymentStep =
  | 'ADD_NEW_PAYMENT'
  | 'COMMERCIAL_CARD_MODAL'
  | 'SET_AUTO_PAY_DEFAULT_PAYMENT_METHOD'
  | 'SET_SCHEDULED_PAYMENT_DEFAULT_PAYMENT_METHOD'
  | 'DEFAULT_PAYMENT_UPDATE_CONFIRMATION'
  | null

export const AddNewPaymentContainer = ({
  setShowAddNewPayment,
  prevDefaultMethodId,
  setPrevDefaultMethodId,
}: {
  setShowAddNewPayment: (value: boolean) => void
  prevDefaultMethodId: string | null
  setPrevDefaultMethodId: (value: string | null) => void
}) => {
  const editPaymentMethodModalsData = useAppData(
    'editPaymentMethodModalsData',
    true,
  )
  const savedPaymentMethodsData = useAppData('savedPaymentMethodsData', true)

  const [currentStep, setCurrentStep] =
    useState<AddPaymentStep>('ADD_NEW_PAYMENT')
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null)
  const [hasAutoPayUpdated, setHasAutoPayUpdated] = useState(false)
  const [hasScheduledPaymentUpdated, setHasScheduledPayUpdated] =
    useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const { data: dstConfig } = useDSTConfigDetails()
  const accountId = useActiveAccountId()
  const dispatch = useDispatch()
  const { data } = useActiveAccount()
  const { data: autoPayData } = useAutopayDetails()
  const { data: paymentList } = usePaymentList()
  const { data: paymentMethodsData } = usePaymentMethods()

  const autoPayEnabled = isAutoPayEnabled(data?.autopayType)
  const autoPayPaymentId = autoPayData?.[0]?.paymentMethodId

  const scheduledPaymentEnabled = checkForPaymentsWithPrevDefault(
    paymentList?.scheduled || [],
    paymentMethodsData,
    prevDefaultMethodId,
  )

  const shouldSetScheduledPayDefaultUpdateModal = scheduledPaymentEnabled

  const addPaymentMethodSuccessCallback = async (
    paymentID: string,
    isDefault: boolean,
  ) => {
    if (accountId) {
      setIsUpdating(true)
      if (isDefault) {
        const prevDefault = getDefaultPaymentMethodId(paymentMethodsData)
        setPrevDefaultMethodId(prevDefault || null)
      }

      const paymentMethods: any = await dispatch(
        fetchPaymentMethods(accountId, true),
      )

      const addedPaymentMethod =
        paymentMethods?.paymentMethods?.find(
          (method: any) => method.id === paymentID,
        ) || null
      setPaymentMethod(addedPaymentMethod)
      setIsUpdating(false)

      const shouldSetAutoPayDefaultUpdateModal =
        addedPaymentMethod && autoPayEnabled && autoPayPaymentId !== paymentID
      const shouldSetScheduledPaymentDefaultModal =
        addedPaymentMethod && shouldSetScheduledPayDefaultUpdateModal
      const isCommercialCard = addedPaymentMethod?.class === 'BUSINESS'

      const nextStep = getNextStep(
        isDefault,
        shouldSetAutoPayDefaultUpdateModal,
        shouldSetScheduledPaymentDefaultModal,
        isCommercialCard,
      )
      if (nextStep) {
        setCurrentStep(nextStep)
      } else {
        setShowAddNewPayment(false)
      }
    }
  }

  const getNextStep = (
    isDefault: boolean,
    showAutoPayModal: boolean,
    showScheduledPaymentModal: boolean,
    isCommercialCard: boolean,
  ): AddPaymentStep => {
    if (currentStep === 'ADD_NEW_PAYMENT') {
      if (isDefault) {
        if (showAutoPayModal) {
          return 'SET_AUTO_PAY_DEFAULT_PAYMENT_METHOD'
        }
        if (showScheduledPaymentModal) {
          return 'SET_SCHEDULED_PAYMENT_DEFAULT_PAYMENT_METHOD'
        }
      }
      return isCommercialCard ? 'COMMERCIAL_CARD_MODAL' : null
    }

    if (currentStep === 'SET_AUTO_PAY_DEFAULT_PAYMENT_METHOD') {
      if (isDefault) {
        if (showScheduledPaymentModal) {
          return 'SET_SCHEDULED_PAYMENT_DEFAULT_PAYMENT_METHOD'
        }
      }
      return isCommercialCard ? 'COMMERCIAL_CARD_MODAL' : null
    }

    if (currentStep === 'SET_SCHEDULED_PAYMENT_DEFAULT_PAYMENT_METHOD') {
      return isCommercialCard ? 'COMMERCIAL_CARD_MODAL' : null
    }
    return null
  }

  const handleClose = () => {
    if (hasAutoPayUpdated) {
      dispatch(fetchAutopayDetails(accountId, data?.autopayType as string))
    }
    setShowAddNewPayment(false)
    setCurrentStep(null)
    scrollToSavedPayments()
    setPrevDefaultMethodId(null)
  }

  const handleCloseAutoPayOrScheduledPayment = () => {
    setShowAddNewPayment(false)
    scrollToSavedPayments()
  }

  const handleCloseUpdateConfirmation = () => {
    const isCommercialCard = paymentMethod?.class === 'BUSINESS'
    setCurrentStep(isCommercialCard ? 'COMMERCIAL_CARD_MODAL' : null)
    if (!isCommercialCard) {
      handleClose()
    }
  }

  const getCardInfo = () => {
    if (
      currentStep === 'SET_AUTO_PAY_DEFAULT_PAYMENT_METHOD' ||
      currentStep === 'SET_SCHEDULED_PAYMENT_DEFAULT_PAYMENT_METHOD'
    ) {
      return (
        <UpdateAutoPayOrScheduledPayMethod
          isAddFlow
          isAutoPay={currentStep === 'SET_AUTO_PAY_DEFAULT_PAYMENT_METHOD'}
          setModalType={(value) => setCurrentStep(value as AddPaymentStep)}
          editPaymentDetails={paymentMethod}
          handleClose={handleCloseAutoPayOrScheduledPayment}
          defaultPaymentUpdatedInTheFlow={true}
          setHasAutoPayUpdated={setHasAutoPayUpdated}
          setHasScheduledPaymentUpdated={setHasScheduledPayUpdated}
          prevDefaultMethodId={prevDefaultMethodId}
        />
      )
    }
    if (currentStep === 'DEFAULT_PAYMENT_UPDATE_CONFIRMATION') {
      return (
        <DefaultUpdateConfirmation
          isAddFlow
          handleClose={handleCloseUpdateConfirmation}
          hasAutoPayUpdated={hasAutoPayUpdated}
          hasScheduledPaymentUpdated={hasScheduledPaymentUpdated}
        />
      )
    }
    return null
  }

  return (
    <>
      <AddPaymentMethod
        dstConfig={dstConfig}
        successCallback={addPaymentMethodSuccessCallback}
        handleCancel={() => setShowAddNewPayment(false)}
        primaryBtnText={savedPaymentMethodsData?.add?.value}
        isBusy={isUpdating}
      />
      <ActionModal
        isOpen={
          currentStep === 'SET_AUTO_PAY_DEFAULT_PAYMENT_METHOD' ||
          currentStep === 'SET_SCHEDULED_PAYMENT_DEFAULT_PAYMENT_METHOD' ||
          currentStep === 'DEFAULT_PAYMENT_UPDATE_CONFIRMATION'
        }
        showCloseButton={false}
        info={getCardInfo()}
        title={getTitle(
          paymentMethod,
          currentStep,
          editPaymentMethodModalsData,
        )}
        icon={getModalIcon(currentStep)}
      />
      <CommercialCardAdded
        isOpen={currentStep === 'COMMERCIAL_CARD_MODAL'}
        handleClose={handleClose}
      />
    </>
  )
}

const getModalIcon = (modalType: AddPaymentStep) => {
  switch (modalType) {
    case 'SET_AUTO_PAY_DEFAULT_PAYMENT_METHOD':
    case 'SET_SCHEDULED_PAYMENT_DEFAULT_PAYMENT_METHOD':
      return <TechnicalErrorIcon height={80} width={80} />
    case 'DEFAULT_PAYMENT_UPDATE_CONFIRMATION':
      return <ConfirmationIcon height={80} width={80} />
    default:
      return null
  }
}

const getTitle = (
  editPaymentDetails: PaymentMethod | null,
  modalType: AddPaymentStep,
  editPaymentMethodModalsData: any,
) => {
  if (!editPaymentDetails) {
    return ''
  }

  if (modalType === 'SET_AUTO_PAY_DEFAULT_PAYMENT_METHOD') {
    return editPaymentMethodModalsData?.updateYourPaymentMethod?.value
  }

  if (modalType === 'SET_SCHEDULED_PAYMENT_DEFAULT_PAYMENT_METHOD') {
    return editPaymentMethodModalsData?.updateScheduledPayment?.value
  }

  if (modalType === 'DEFAULT_PAYMENT_UPDATE_CONFIRMATION') {
    const { subtype, accountNumberEndsWith } = editPaymentDetails || {}
    return editPaymentMethodModalsData?.defaultMethodUpdated?.value.replace(
      '{{CARD}}',
      `${capitalizeString(subtype || '')} **** ${accountNumberEndsWith || ''}`,
    )
  }
}
