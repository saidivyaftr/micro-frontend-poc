import { Formik, FormikProps } from 'formik'
import { Typography, Button } from '@/shared-ui/components'
import useAppData from '@/shared-ui/hooks/useAppData'
import { paymentsTable } from './sitecore-mock'
import { formatDate } from 'src/libs/account/payments/util'
import { makeStyles } from '@material-ui/core'
import { PaymentPageModals, IPaymentFormValues, ICancelPayment } from './types'
import SelectPaymentDate from 'src/libs/account/payments/shared/payment-form-fields/SelectPaymentDate'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'
import { Input, Dropdown } from 'src/ui-kit'
import colors from '@/shared-ui/colors'
import { useActiveAccountId, usePaymentMethods } from 'src/selector-hooks'
import { fetchPaymentHistory } from 'src/redux/slicers/payment'
import APIClient from 'src/api-client'
import moment from 'moment'
import { formatAmount } from 'src/utils/amount'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { SITE_ERROR } from 'src/constants'

const validationSchema = yup.object().shape({
  amount: yup
    .string()
    .required('Required')
    .transform((value, originalValue) => {
      const cleanedString = originalValue.replace(/[^$.\d]/g, '')
      return cleanedString
    })
    .matches(/^(\$)?[0-9]+(\.[0-9]{2})?$/, 'Invalid format'),
  schedulePaymentDate: yup.string().required('Required'),
  paymentMethodId: yup.string().required('Required'),
})

const EditPayment = ({ payment, setPayment, setModal }: ICancelPayment) => {
  const classes = useStyles()
  const data: any = paymentsTable
  const dispatch = useDispatch()
  const { editPayment, saveChanges, cancel, amountlabel, paymentMethod } =
    useAppData('paymentsTable', true, data)
  const accountId = useActiveAccountId()
  const {
    isLoading,
    data: { paymentMethods = [] },
  } = usePaymentMethods()

  const handleSubmit = async (formikProps: FormikProps<IPaymentFormValues>) => {
    const UPDATE_PAYMENT_CLICK = 'payments:update payment'
    try {
      formikProps.setSubmitting(true)
      const {
        schedulePaymentDate,
        paymentMethodId: token,
        paymentMethodId,
      } = formikProps.values
      const amountInput = Number(formikProps.values['amount'].replace('$', ''))
      const amount = formatAmount(amountInput)
      const { apportioning, emailAddress: email } = payment
      const selectedPayment: any = payments?.find(
        (paymentMethod: any) => paymentMethod?.value === paymentMethodId,
      )
      const updatedApportioning = {
        ...(apportioning?.[0] || {}),
        amount: Number(amountInput),
      }
      const date = moment(schedulePaymentDate).format('YYYY-MM-DD')
      const modifiedPayment: any = {
        amount: amount,
        date,
        token,
        apportioning: [updatedApportioning],
        email,
        fundingType:
          selectedPayment.type == 'Card' ? 'ONE_TIME_CARD' : 'ONE_TIME_ACH',
      }
      const response = await APIClient.updatePayment(
        accountId,
        payment?.paymentId,
        modifiedPayment,
      )
      setPayment({
        ...payment,
        ...modifiedPayment,
        amount: amountInput,
        paymentMethodId: token,
        method: selectedPayment?.label || payment?.method,
        paymentId: response?.data?.referenceCode,
      })
      setModal(PaymentPageModals.PaymentSuccess)

      DTMClient.triggerEvent(
        {
          events: 'event14',
          eVar14: UPDATE_PAYMENT_CLICK,
        },
        'tl_o',
        UPDATE_PAYMENT_CLICK,
      )

      if (accountId) dispatch(fetchPaymentHistory(accountId))
    } catch (error) {
      setModal(PaymentPageModals.EditPaymentFailure)
      DTMClient.triggerEvent(
        {
          events: 'event88',
          eVar2: UPDATE_PAYMENT_CLICK,
          eVar88: 'Failed to update payment',
        },
        'tl_o',
        SITE_ERROR,
      )
    }
    formikProps.setSubmitting(false)
  }
  const renderLabel = (label: string) => {
    return (
      <Typography styleType="p2" fontType="boldFont" className={classes.label}>
        {label}
      </Typography>
    )
  }
  const payments = paymentMethods?.map((state: any) => {
    return {
      label: state?.nickName,
      value: state?.id,
      type: state?.type,
    }
  })
  const findPaymenthodId = (payments: any[], paymentMethodId: string) => {
    const defaultPaymentMethod = {
      label: '',
      value: '',
      type: '',
    }
    const selectedPayment = payments?.find(
      (paymentMethod: any) => paymentMethod?.value === paymentMethodId,
    )
    return selectedPayment ? selectedPayment : defaultPaymentMethod
  }
  const initValues = useMemo(() => {
    const { amount = 0, date = '', paymentMethodId = '' } = payment
    const formattedAmount = `$${amount.toFixed(2)}`
    return {
      amount: formattedAmount,
      schedulePaymentDate: formatDate(date),
      paymentMethodId,
    }
  }, [payment, payments])

  return (
    <div className={classes.root}>
      <Typography tagType="h3" styleType="h5">
        {editPayment?.value}
      </Typography>
      <Formik
        initialValues={initValues}
        validateOnMount
        validationSchema={validationSchema}
        // eslint-disable-next-line
        onSubmit={() => {}}
      >
        {(formikProps: FormikProps<IPaymentFormValues>) => {
          return (
            <form
              onSubmit={formikProps.handleSubmit}
              noValidate
              autoComplete="off"
            >
              <div className={classes.fieldSection}>
                {renderLabel(amountlabel?.value)}
                <Input
                  className={classes.inputContainer}
                  inputClassName={classes.input}
                  name="amount"
                  value={formikProps.values.amount.replace(/[^$.\d]/g, '')}
                  onChange={formikProps.handleChange}
                  helperText={formikProps.errors.amount}
                  isError={Boolean(formikProps.errors.amount)}
                />
              </div>
              <div className={classes.fieldSection}>
                {renderLabel(paymentMethod?.value)}
                <Dropdown
                  isSearchable={false}
                  options={payments}
                  className={classes.inputContainer}
                  isLoading={isLoading}
                  isDisabled={isLoading}
                  value={findPaymenthodId(
                    payments,
                    formikProps.values?.paymentMethodId,
                  )}
                  onChange={(state: any) =>
                    formikProps.setFieldValue('paymentMethodId', state.value)
                  }
                />
              </div>
              <div className={classes.fieldSection}>
                <SelectPaymentDate hideToday />
              </div>
              <div className={classes.btnWrapper}>
                <Button
                  text={saveChanges?.value}
                  type="button"
                  variant="primary"
                  isBusy={formikProps.isSubmitting}
                  disabled={!formikProps.isValid || formikProps.isSubmitting}
                  onClick={() => handleSubmit(formikProps)}
                />
                <Button
                  text={cancel?.value}
                  type="button"
                  variant="tertiary"
                  disabled={formikProps.isSubmitting}
                  onClick={() => setModal(PaymentPageModals.Init)}
                />
              </div>
            </form>
          )
        }}
      </Formik>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    padding: '5rem 4rem',
    [breakpoints.down('sm')]: {
      padding: '1rem 0',
    },
  },
  input: {
    borderRadius: '2rem !important',
    border: `1px solid ${colors.main.dark}`,
    '& input': {
      padding: '0.5rem 1rem',
      height: 50,
    },
    '& .MuiInputBase-root': {
      background: 'transparent',
    },
  },
  fieldSection: {
    marginTop: '1rem',
    textAlign: 'left',
  },
  label: {
    margin: '0.25rem',
  },
  inputContainer: {
    borderRadius: 32,
    width: '100%',
  },
  btnWrapper: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    marginTop: '2rem',
    justifyContent: 'center',
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
}))

export default EditPayment
