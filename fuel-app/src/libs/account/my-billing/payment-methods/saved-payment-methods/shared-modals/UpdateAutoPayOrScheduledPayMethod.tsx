import { Button, InjectHTML, Typography } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import { PaymentMethod } from 'src/redux/types/payments'
import { useEffect, useState } from 'react'
import APIClient from 'src/api-client'
import {
  useActiveAccount,
  useActiveAccountId,
  useActiveAccountUuid,
  useDSTConfigDetails,
  usePaymentList,
  usePaymentMethods,
  useSessionState,
} from 'src/selector-hooks'
import { AutoPayPayload } from 'src/api-client/types'
import {
  fetchAutopayDetails,
  fetchDSTAuthDetails,
  fetchPaymentHistory,
  fetchPaymentMethods,
} from 'src/redux/slicers/payment'
import { useDispatch } from 'react-redux'
import { capitalizeString } from 'src/utils/addressHelpers'
import { EditPaymentModal } from '../EditPaymentMethodModal'
import { AddPaymentStep } from '../add-new-payment/AddNewPaymentContainer'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import {
  checkForPaymentsWithPrevDefault,
  getDefaultPaymentMethodId,
} from '../helper'
import { useAppData } from '@/shared-ui/hooks/index'
import { SITE_ERROR } from 'src/constants'

export const UpdateAutoPayOrScheduledPayMethod = ({
  isAddFlow,
  isAutoPay,
  setModalType,
  editPaymentDetails,
  handleClose,
  defaultPaymentUpdatedInTheFlow,
  setHasAutoPayUpdated,
  setHasScheduledPaymentUpdated,
  prevDefaultMethodId,
}: {
  isAddFlow?: boolean
  isAutoPay: boolean
  setModalType: (value: EditPaymentModal | AddPaymentStep) => void
  editPaymentDetails: PaymentMethod | null
  handleClose: any
  defaultPaymentUpdatedInTheFlow: boolean
  setHasAutoPayUpdated: (value: boolean) => void
  setHasScheduledPaymentUpdated: (value: boolean) => void
  prevDefaultMethodId?: string | null
}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const editPaymentMethodModalsData = useAppData(
    'editPaymentMethodModalsData',
    true,
  )

  const activeAccountId = useActiveAccountId()
  const activeAccountUUID = useActiveAccountUuid()
  const activeAccount = useActiveAccount()
  const { data: paymentMethodsData } = usePaymentMethods()
  const { data: paymentList } = usePaymentList()
  const sessionState = useSessionState()
  const loginEmail = sessionState?.loggedInState?.email

  const dstAuthConfig = useDSTConfigDetails()

  const defaultPaymentId =
    prevDefaultMethodId || getDefaultPaymentMethodId(paymentMethodsData)
  const scheduledPaymentEnabled = checkForPaymentsWithPrevDefault(
    paymentList?.scheduled || [],
    paymentMethodsData,
    prevDefaultMethodId,
  )

  const [isUpdating, setIsUpdating] = useState(false)
  const [hasAPIError, setHasAPIError] = useState(false)

  const shouldShowScheduledDefaultPaymentModal =
    isAutoPay && scheduledPaymentEnabled

  const handleUpdateAutoPayMethod = async () => {
    setIsUpdating(true)
    setHasAPIError(false)
    try {
      const body: AutoPayPayload = {
        customerType: dstAuthConfig?.data?.customerType,
        email:
          paymentMethodsData?.profile?.email ||
          activeAccount.data.primaryContact ||
          loginEmail,
        paymentMethodId: editPaymentDetails?.id || '',
      }
      await APIClient.updateAutoPay(activeAccountId, body)

      DTMClient.triggerEvent(
        { events: 'event53' },
        'tl_o',
        'my account:edit autopay',
      )

      setHasAutoPayUpdated(true)
      setIsUpdating(false)
      if (shouldShowScheduledDefaultPaymentModal) {
        setModalType('SET_SCHEDULED_PAYMENT_DEFAULT_PAYMENT_METHOD')
        return
      } else if (defaultPaymentUpdatedInTheFlow) {
        setModalType('DEFAULT_PAYMENT_UPDATE_CONFIRMATION')
      } else if (editPaymentDetails?.class === 'BUSINESS') {
        setModalType('COMMERCIAL_CARD_MODAL')
      } else {
        if (activeAccountId) {
          dispatch(fetchAutopayDetails(activeAccountId, ''))
          dispatch(fetchPaymentMethods(activeAccountId))
        }
        handleClose()
      }
      setHasAPIError(false)
    } catch (error) {
      setHasAPIError(true)
    }
    setIsUpdating(false)
  }

  const handleUpdateScheduledPayMethod = async () => {
    setIsUpdating(true)
    try {
      await APIClient.updateDefaultScheduledPaymentsMethod(
        activeAccountUUID,
        defaultPaymentId || '',
        editPaymentDetails?.id || '',
      )

      dispatch(fetchPaymentHistory(activeAccountId, true))
      setHasScheduledPaymentUpdated(true)
      if (defaultPaymentUpdatedInTheFlow) {
        setIsUpdating(false)
        setModalType('DEFAULT_PAYMENT_UPDATE_CONFIRMATION')
      } else if (editPaymentDetails?.class === 'BUSINESS') {
        setModalType('COMMERCIAL_CARD_MODAL')
      } else {
        handleClose()
        if (!isAddFlow && activeAccountId) {
          dispatch(fetchPaymentMethods(activeAccountId))
        }
      }
      setHasAPIError(false)
    } catch (error) {
      setHasAPIError(true)
      DTMClient.triggerEvent(
        {
          events: 'event88',
          eVar2: 'update : default schedule payments',
          eVar88: 'Failed to update default schedule payments',
        },
        'tl_o',
        SITE_ERROR,
      )
    }
    setIsUpdating(false)
  }

  const handleNo = async () => {
    setHasAPIError(false)
    if (shouldShowScheduledDefaultPaymentModal) {
      setModalType('SET_SCHEDULED_PAYMENT_DEFAULT_PAYMENT_METHOD')
    } else if (defaultPaymentUpdatedInTheFlow) {
      setModalType('DEFAULT_PAYMENT_UPDATE_CONFIRMATION')
    } else if (editPaymentDetails?.class === 'BUSINESS') {
      setModalType('COMMERCIAL_CARD_MODAL')
    } else {
      handleClose()
      if (!isAddFlow && activeAccountId) {
        dispatch(fetchPaymentMethods(activeAccountId))
      }
    }
  }

  useEffect(() => {
    if (activeAccountId) {
      dispatch(fetchDSTAuthDetails(activeAccountId))
    }
  }, [activeAccountId])

  const descriptionTemplate = isAutoPay
    ? editPaymentMethodModalsData?.updateYourPaymentMethodDescription?.value
    : editPaymentMethodModalsData?.updateScheduledPaymentDescription?.value

  const descriptionText = descriptionTemplate?.replace(
    '{{CARD}}',
    `<strong>${capitalizeString(editPaymentDetails?.subtype ?? '')} ****${
      editPaymentDetails?.accountNumberEndsWith
    }</strong>`,
  )

  return (
    <div className={classes.root}>
      <InjectHTML className={classes.description} value={descriptionText} />
      <div className={classes.actionBtnContainer}>
        <Button
          type="button"
          isBusy={isUpdating}
          onClick={
            isAutoPay
              ? handleUpdateAutoPayMethod
              : handleUpdateScheduledPayMethod
          }
          text={editPaymentMethodModalsData?.yes?.value}
        />
        <Button
          type="button"
          onClick={handleNo}
          text={editPaymentMethodModalsData?.no?.value}
          variant="tertiary"
          disabled={isUpdating}
        />
      </div>
      {hasAPIError && (
        <Typography color="primary" className={classes.tryMessage}>
          {editPaymentMethodModalsData?.retryMessage?.value}
        </Typography>
      )}
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    textAlign: 'left',
  },
  description: {
    textAlign: 'center',
  },
  actionBtnContainer: {
    display: 'flex',
    gap: 16,
    justifyContent: 'center',
    maxWidth: 480,
    margin: 'auto',
    marginTop: 32,
    '& button': {
      width: '100%',
    },
    [breakpoints.down('xs')]: {
      marginTop: 48,
      flexDirection: 'column',
    },
  },
  tryMessage: {
    textAlign: 'center',
    marginTop: 16,
  },
}))
