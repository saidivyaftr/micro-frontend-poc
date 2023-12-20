import { Button, Typography } from '@/shared-ui/components'
import { Input, Checkbox } from 'src/ui-kit'
import { makeStyles } from '@material-ui/core'
import colors from '@/shared-ui/colors'
import { useFormik } from 'formik'
import { PaymentMethod } from 'src/redux/types/payments'
import {
  CheckboxCheck,
  CheckboxUnCheck,
  InfoIcon,
} from 'src/blitz/assets/react-icons'
import { useState } from 'react'
import APIClient from 'src/api-client'
import {
  useActiveAccount,
  useActiveAccountId,
  useAutopayDetails,
  usePaymentList,
  usePaymentMethods,
} from 'src/selector-hooks'
import { PaymentMethodPayload } from 'src/api-client/types'
import { fetchPaymentMethods } from 'src/redux/slicers/payment'
import { useDispatch } from 'react-redux'
import { EditPaymentModal } from '../EditPaymentMethodModal'
import { isAutoPayEnabled } from 'src/libs/account/helper'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { checkForPaymentsWithPrevDefault } from '../helper'
import useAppData from '@/shared-ui/hooks/useAppData'
import { SITE_ERROR } from 'src/constants'

type LoadingAndErrorType = 'SAVING' | 'DELETING' | null

export const EditBankDetails = ({
  editPaymentDetails,
  setModalType,
  handleClose,
  setDefaultPaymentUpdatedInTheFlow,
}: {
  editPaymentDetails: PaymentMethod | null
  setModalType: (value: EditPaymentModal) => void
  handleClose: any
  setDefaultPaymentUpdatedInTheFlow: (value: boolean) => void
}) => {
  const editPaymentMethodModalsData = useAppData(
    'editPaymentMethodModalsData',
    true,
  )
  const classes = useStyles()
  const dispatch = useDispatch()
  const [isDefault, setIsDefault] = useState(
    Boolean(editPaymentDetails?.default),
  )
  const accountId = useActiveAccountId()
  const { data } = useActiveAccount()

  const autoPayEnabled = isAutoPayEnabled(data?.autopayType)
  const { data: autoPayData } = useAutopayDetails()
  const { data: paymentList } = usePaymentList()
  const { data: paymentMethodsData } = usePaymentMethods()

  const autoPayPaymentId = autoPayData?.[0]?.paymentMethodId
  const scheduledPaymentEnabled = checkForPaymentsWithPrevDefault(
    paymentList?.scheduled || [],
    paymentMethodsData,
  )

  const hasDefaultPaymentUpdated = isDefault && !editPaymentDetails?.default
  const shouldSetAutoPayDefaultUpdateModal =
    hasDefaultPaymentUpdated &&
    autoPayEnabled &&
    autoPayPaymentId !== editPaymentDetails?.id
  const shouldSetScheduledPayDefaultUpdateModal =
    hasDefaultPaymentUpdated && scheduledPaymentEnabled

  const [loadingState, setLoadingState] = useState<LoadingAndErrorType | null>(
    null,
  )
  const [hasAPIError, setHasAPIError] = useState<LoadingAndErrorType | null>(
    null,
  )

  const formik = useFormik({
    initialValues: {
      nickName: editPaymentDetails?.nickName ?? '',
    },
    validate: (values) => {
      const errors: any = {}
      if (!values?.nickName) {
        errors.nickName = editPaymentMethodModalsData?.required?.value
      } else {
        if (!/^[a-zA-Z0-9_\-.,\s]+$/.test(values?.nickName)) {
          errors.nickName = editPaymentMethodModalsData?.nicknameRules?.value
        }
      }
      return errors
    },
    onSubmit: async () => undefined,
  })

  const handleSave = async () => {
    setLoadingState('SAVING')
    setHasAPIError(null)
    try {
      const body: PaymentMethodPayload = {
        type: 'Checking',
        nickName: formik.values.nickName,
        setAsDefault: isDefault,
      }
      await APIClient.updatePaymentMethod(
        accountId,
        editPaymentDetails?.id ?? '',
        body,
      )
      DTMClient.triggerEvent(
        {
          events: isDefault ? 'event14,event179' : 'event14',
          eVar14: 'saved payments:update',
        },
        'tl_o',
        'saved payments:update',
      )
      setDefaultPaymentUpdatedInTheFlow(hasDefaultPaymentUpdated)

      if (shouldSetAutoPayDefaultUpdateModal) {
        setModalType('SET_AUTO_PAY_DEFAULT_PAYMENT_METHOD')
      } else if (shouldSetScheduledPayDefaultUpdateModal) {
        setModalType('SET_SCHEDULED_PAYMENT_DEFAULT_PAYMENT_METHOD')
      } else if (hasDefaultPaymentUpdated) {
        setModalType('DEFAULT_PAYMENT_UPDATE_CONFIRMATION')
      } else {
        if (accountId) {
          dispatch(fetchPaymentMethods(accountId))
        }
        handleClose()
      }
    } catch (error) {
      setHasAPIError('SAVING')
    }
    setLoadingState(null)
  }

  const handleDelete = async () => {
    if (!editPaymentDetails?.id) {
      return
    }
    if (autoPayPaymentId === editPaymentDetails.id) {
      setModalType('CANNOT_DELETE_PAYMENT_AUTOPAY')
      return
    }
    setLoadingState('DELETING')
    try {
      setHasAPIError(null)
      await APIClient.deletePaymentMethod(accountId, editPaymentDetails?.id)
      setModalType('DELETE_CONFIRMATION')

      DTMClient.triggerEvent(
        { events: 'event14' },
        'tl_o',
        'saved payments:remove',
      )
    } catch (error: any) {
      const errorType = error?.response?.data?.error
      if (errorType === 'SCHEDULED_PAYMENT') {
        setModalType('CANNOT_DELETE_PAYMENT_SCHEDULED_PAYMENT')
        return
      }
      setHasAPIError('DELETING')
      DTMClient.triggerEvent(
        {
          events: 'event88',
          eVar2: 'saved payments:remove',
          eVar88: 'Failed to remove payments',
        },
        'tl_o',
        SITE_ERROR,
      )
    }
    setLoadingState(null)
  }

  const renderLabel = (label: string) => {
    return (
      <Typography styleType="p1" fontType="boldFont" className={classes.label}>
        {label}
      </Typography>
    )
  }

  const shouldEnableButton =
    formik.isValid &&
    (formik.values.nickName !== editPaymentDetails?.nickName ||
      isDefault !== editPaymentDetails?.default)

  return (
    <div className={classes.root}>
      <div>
        <div className={classes.fieldSection}>
          {renderLabel(editPaymentMethodModalsData?.bankAccNickName?.value)}
          <Input
            className={classes.inputContainer}
            inputClassName={classes.input}
            name="nickName"
            value={formik.values.nickName}
            onChange={(event: any) => {
              if (event?.target?.value?.length <= 30) {
                formik.handleChange(event)
              }
            }}
            helperText={
              formik.errors.nickName ? (
                <Typography styleType="p4">
                  <span className={classes.helperText}>
                    <InfoIcon height={13} width={13} />
                    <span>{formik.errors.nickName}</span>
                  </span>
                </Typography>
              ) : null
            }
            isError={Boolean(formik.errors.nickName)}
          />
        </div>
      </div>
      <div className={classes.checkboxContainer}>
        <Checkbox
          name={editPaymentMethodModalsData?.setAsDefault?.value}
          checked={isDefault}
          setValue={() => {
            setIsDefault(!isDefault)
            return ''
          }}
          label={editPaymentMethodModalsData?.setAsDefault?.value}
          checkedIcon={<CheckboxCheck height={24} width={24} />}
          uncheckedIcon={<CheckboxUnCheck height={24} width={24} />}
        />
      </div>
      <div className={classes.actionBtnContainer}>
        <Button
          type="button"
          disabled={!shouldEnableButton || loadingState === 'DELETING'}
          isBusy={loadingState === 'SAVING'}
          onClick={handleSave}
          text={editPaymentMethodModalsData?.saveChanges?.value}
        />
        <Button
          type="button"
          isBusy={loadingState === 'DELETING'}
          disabled={loadingState === 'SAVING'}
          text={editPaymentMethodModalsData?.deleteAccount?.value}
          onClick={handleDelete}
          variant="tertiary"
          loadingVariant="black"
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
  fieldSection: {
    marginTop: 16,
  },
  inputContainer: {
    borderRadius: 32,
    width: '100%',
  },
  input: {
    borderRadius: '32px !important',
    border: `1px solid ${colors.main.dark}`,
    '& input': {
      padding: '8px 16px',
      height: 50,
    },
    '& .MuiInputBase-root': {
      background: 'transparent',
    },
  },
  label: {
    margin: 4,
  },
  checkboxContainer: {
    margin: '16px 4px',
    padding: 4,
    '& .MuiIconButton-colorPrimary': {
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    '& .MuiCheckbox-colorPrimary.Mui-checked': {
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
  },
  actionBtnContainer: {
    display: 'flex',
    gap: 16,
    justifyContent: 'center',
    maxWidth: 490,
    margin: 'auto',
    '& button': {
      width: '100%',
    },
    [breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  tryMessage: {
    textAlign: 'center',
    marginTop: 16,
  },
  helperText: {
    display: 'flex',
    gap: 4,
    alignItems: 'flex-start',
    '& span': {
      flex: 1,
    },
  },
}))
