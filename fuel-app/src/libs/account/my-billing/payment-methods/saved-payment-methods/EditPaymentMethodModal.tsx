import { ActionModal } from 'src/libs/account/shared/modals'
import { PaymentMethod } from 'src/redux/types/payments'
import {
  CreditCard,
  Bank,
  TechnicalErrorIcon,
  DeleteLogo,
  ConfirmationIcon,
} from '@/shared-ui/react-icons'
import { useEffect, useMemo, useState } from 'react'
import { capitalizeString } from 'src/utils/addressHelpers'
import {
  EditCreditCard,
  EditBankDetails,
  CannotDelete,
  DeleteConfirmation,
  DefaultUpdateConfirmation,
} from './edit-payments-modal-content'
import { UpdateAutoPayOrScheduledPayMethod } from './shared-modals'
import { makeStyles } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { useActiveAccount, useActiveAccountId } from 'src/selector-hooks'
import {
  fetchAutopayDetails,
  fetchPaymentMethods,
} from 'src/redux/slicers/payment'
import useAppData from '@/shared-ui/hooks/useAppData'

export type EditPaymentModal =
  | 'EDIT_CREDIT_CARD'
  | 'EDIT_BANK_DETAILS'
  | 'SET_AUTO_PAY_DEFAULT_PAYMENT_METHOD'
  | 'SET_SCHEDULED_PAYMENT_DEFAULT_PAYMENT_METHOD'
  | 'CANNOT_DELETE_PAYMENT_AUTOPAY'
  | 'CANNOT_DELETE_PAYMENT_SCHEDULED_PAYMENT'
  | 'DELETE_CONFIRMATION'
  | 'DEFAULT_PAYMENT_UPDATE_CONFIRMATION'
  | null

export const EditPaymentMethodModal = ({
  isOpen,
  handleClose,
  editPaymentDetails,
}: {
  isOpen: boolean
  handleClose: any
  editPaymentDetails: PaymentMethod | null
}) => {
  const editPaymentMethodModalsData = useAppData(
    'editPaymentMethodModalsData',
    true,
  )
  const classes = useStyles()
  const dispatch = useDispatch()
  const accountId = useActiveAccountId()
  const { data } = useActiveAccount()

  const [modalType, setModalType] = useState<EditPaymentModal>(null)
  const [defaultPaymentUpdatedInTheFlow, setDefaultPaymentUpdatedInTheFlow] =
    useState(false)
  const [hasAutoPayUpdated, setHasAutoPayUpdated] = useState(false)
  const [hasScheduledPaymentUpdated, setHasScheduledPaymentUpdated] =
    useState(false)

  useEffect(() => {
    const isCard = editPaymentDetails?.type?.toLowerCase() === 'card'
    setModalType(isCard ? 'EDIT_CREDIT_CARD' : 'EDIT_BANK_DETAILS')
  }, [editPaymentDetails])

  const title = useMemo(
    () => getTitle(editPaymentDetails, modalType, editPaymentMethodModalsData),
    [editPaymentDetails, modalType],
  )

  useEffect(() => {
    if (!isOpen) {
      setModalType(null)
    }
  }, [isOpen])

  const getInfoContent = () => {
    if (modalType === 'EDIT_CREDIT_CARD') {
      return (
        <EditCreditCard
          editPaymentDetails={editPaymentDetails}
          handleClose={handleClose}
          setModalType={setModalType}
          setDefaultPaymentUpdatedInTheFlow={setDefaultPaymentUpdatedInTheFlow}
        />
      )
    }

    if (modalType === 'EDIT_BANK_DETAILS') {
      return (
        <EditBankDetails
          editPaymentDetails={editPaymentDetails}
          handleClose={handleClose}
          setModalType={setModalType}
          setDefaultPaymentUpdatedInTheFlow={setDefaultPaymentUpdatedInTheFlow}
        />
      )
    }

    if (
      modalType === 'SET_AUTO_PAY_DEFAULT_PAYMENT_METHOD' ||
      modalType === 'SET_SCHEDULED_PAYMENT_DEFAULT_PAYMENT_METHOD'
    ) {
      return (
        <UpdateAutoPayOrScheduledPayMethod
          isAutoPay={modalType === 'SET_AUTO_PAY_DEFAULT_PAYMENT_METHOD'}
          handleClose={handleClose}
          editPaymentDetails={editPaymentDetails}
          setModalType={(value) => setModalType(value as EditPaymentModal)}
          defaultPaymentUpdatedInTheFlow={defaultPaymentUpdatedInTheFlow}
          setHasAutoPayUpdated={setHasAutoPayUpdated}
          setHasScheduledPaymentUpdated={setHasScheduledPaymentUpdated}
        />
      )
    }

    if (
      modalType === 'CANNOT_DELETE_PAYMENT_AUTOPAY' ||
      modalType === 'CANNOT_DELETE_PAYMENT_SCHEDULED_PAYMENT'
    ) {
      return (
        <CannotDelete
          isAutoPay={modalType === 'CANNOT_DELETE_PAYMENT_AUTOPAY'}
          handleClose={handleClose}
        />
      )
    }

    if (modalType === 'DELETE_CONFIRMATION') {
      return <DeleteConfirmation handleClose={handleClose} />
    }

    if (modalType === 'DEFAULT_PAYMENT_UPDATE_CONFIRMATION') {
      return (
        <DefaultUpdateConfirmation
          hasAutoPayUpdated={hasAutoPayUpdated}
          hasScheduledPaymentUpdated={hasScheduledPaymentUpdated}
          handleClose={handleClose}
        />
      )
    }
  }

  const isFirstSteps =
    modalType === 'EDIT_BANK_DETAILS' || modalType === 'EDIT_CREDIT_CARD'

  const isNonClosableSteps =
    modalType === 'SET_AUTO_PAY_DEFAULT_PAYMENT_METHOD' ||
    modalType === 'SET_SCHEDULED_PAYMENT_DEFAULT_PAYMENT_METHOD'

  const onModalClose = () => {
    if (!isFirstSteps && !isNonClosableSteps) {
      if (accountId) {
        dispatch(fetchPaymentMethods(accountId))
      }
    }
    if (hasAutoPayUpdated) {
      dispatch(fetchAutopayDetails(accountId, data?.accountType as string))
    }
    handleClose()
  }

  return (
    <ActionModal
      isOpen={isOpen}
      showCloseButton={!isNonClosableSteps}
      icon={getModalIcon(modalType)}
      handleClose={onModalClose}
      title={title}
      info={getInfoContent()}
      bodyClassName={classes.bodyClassName}
    />
  )
}

const getModalIcon = (modalType: EditPaymentModal) => {
  switch (modalType) {
    case 'EDIT_CREDIT_CARD':
      return <CreditCard height={48} width={48} />
    case 'EDIT_BANK_DETAILS':
      return <Bank height={80} width={80} />
    case 'SET_AUTO_PAY_DEFAULT_PAYMENT_METHOD':
    case 'SET_SCHEDULED_PAYMENT_DEFAULT_PAYMENT_METHOD':
    case 'CANNOT_DELETE_PAYMENT_AUTOPAY':
    case 'CANNOT_DELETE_PAYMENT_SCHEDULED_PAYMENT':
      return <TechnicalErrorIcon height={80} width={80} />
    case 'DELETE_CONFIRMATION':
      return <DeleteLogo height={80} width={80} />
    case 'DEFAULT_PAYMENT_UPDATE_CONFIRMATION':
      return <ConfirmationIcon height={80} width={80} />
  }
}

const getTitle = (
  editPaymentDetails: PaymentMethod | null,
  modalType: EditPaymentModal,
  editPaymentMethodModalsData: any,
) => {
  if (!editPaymentDetails) {
    return ''
  }

  const { subtype, accountNumberEndsWith } = editPaymentDetails

  if (modalType === 'EDIT_CREDIT_CARD' || modalType === 'EDIT_BANK_DETAILS') {
    return (
      editPaymentMethodModalsData?.edit?.value +
      ` ${capitalizeString(subtype)} **** ${accountNumberEndsWith}`
    )
  }

  if (modalType === 'SET_AUTO_PAY_DEFAULT_PAYMENT_METHOD') {
    return editPaymentMethodModalsData?.updateYourPaymentMethod?.value
  }

  if (modalType === 'SET_SCHEDULED_PAYMENT_DEFAULT_PAYMENT_METHOD') {
    return editPaymentMethodModalsData?.updateScheduledPayment?.value
  }

  if (
    modalType === 'CANNOT_DELETE_PAYMENT_AUTOPAY' ||
    modalType === 'CANNOT_DELETE_PAYMENT_SCHEDULED_PAYMENT'
  ) {
    return editPaymentMethodModalsData?.cannotDelete?.value.replace(
      '{{CARD}}',
      `${capitalizeString(subtype)} **** ${accountNumberEndsWith}`,
    )
  }

  if (modalType === 'DELETE_CONFIRMATION') {
    return editPaymentMethodModalsData?.deleted?.value.replace(
      '{{CARD}}',
      `${capitalizeString(subtype)} **** ${accountNumberEndsWith}`,
    )
  }

  if (modalType === 'DEFAULT_PAYMENT_UPDATE_CONFIRMATION') {
    return editPaymentMethodModalsData?.defaultMethodUpdated?.value.replace(
      '{{CARD}}',
      `${capitalizeString(subtype)} **** ${accountNumberEndsWith}`,
    )
  }
}

const useStyles = makeStyles(() => ({
  bodyClassName: {
    padding: '0px 16px',
  },
}))
