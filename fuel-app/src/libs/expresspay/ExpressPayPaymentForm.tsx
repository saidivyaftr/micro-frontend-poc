/* eslint-disable @typescript-eslint/indent */
import * as React from 'react'
import { Formik, FormikHelpers, FormikProps, Form, Field } from 'formik'
import * as yup from 'yup'
import { useLayoutEffect } from 'react'
import FormHelperText from '@material-ui/core/FormHelperText'
import { makeStyles } from '@material-ui/core/styles'
import {
  ALL_FIELDS_REQUIRED,
  AMOUNT_REQUIRED,
  EMAIL_REQUIRED,
  TERMS_AND_CONDITION,
} from 'src/constants'
import { InputField } from '../account/payments/shared/payment-form-fields/InputField'
import PaymentsFormFooter from '../account/payments/shared/payment-form-fields/PaymentsFormFooter'
import { ExpressPaymentLoginDetails } from './expresspayTypes'
import { BlockType, paymentErrorHandler } from '../account/payments/util'
import {
  PaymentsAuthContext,
  PaymentsFormContext,
  PaymentsFormContextValue,
} from '../account/payments/shared/PaymentsFormContext'
import {
  OnIframeMessageCallback,
  PaymentInfoResult,
  ProcessingState,
} from '../account/payments/shared/types'
import { ExpressPayPayload } from 'src/api-client/types'
import APIClient from '../../api-client'
import AutopayModal from '../account/payments/autopay/AutopayModal'
import { format } from 'date-fns'
import { InputAdornment } from '@material-ui/core'
import { useAppData } from '../../hooks'
import { Typography } from '@/shared-ui/components'
import { PP_OBJECT_SANS } from 'src/constants/fontFamilyNames'
import { usePaymentMethods, useSessionState } from 'src/selector-hooks'
import { fetchPaymentMethods } from 'src/redux/slicers/payment'
import { useDispatch } from 'react-redux'
import { fetchAccounts } from 'src/redux/slicers/account'
import SelectPaymentMethods from './SelectPaymentMethods'
import colors from '@/shared-ui/colors'

type ExpressPayPaymentFormValues = {
  amount: string
  otherAmount: string
  emailId: string
  termsAndCondition: boolean
  newPaymentOption: string
  paymentDate: string
}

const ExpressPayPaymentForm = ({
  expressLoginDetails,
  paymentConfirmation,
}: {
  expressLoginDetails: ExpressPaymentLoginDetails
  paymentConfirmation: ({}: any) => void
}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const {
    title,
    subTitle,
    paymentAmount,
    paymentMethod,
    submitBtnText,
    cancelBtnText,
    tncLink,
  } = useAppData('expresspayPayment', true)

  const { isLoading: isAuthenticating, sessionValid } = useSessionState()
  const isAuthenticated = !isAuthenticating && sessionValid
  const paymentMethods = usePaymentMethods()

  useLayoutEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchAccounts())
    }
  }, [isAuthenticated])

  const [processingState, setProcessingState] = React.useState<ProcessingState>(
    { kind: 'Init' },
  )
  const { accountAmounts, accountId } = expressLoginDetails
  const paymentAmountOptions = [
    {
      label: `Last bill amount $${
        accountAmounts?.previousBillAmount?.amount || 0
      }`,
      value: 'last',
    },
    {
      label: `Current balance $${
        accountAmounts?.currentDueBalance?.amount || 0
      }`,
      value: 'current',
    },
    {
      label: `Past due balance $${
        accountAmounts?.pastDueAmounts?.totalPastDue?.amount || 0
      }`,
      value: 'past',
    },
    { label: 'Other', value: 'other' },
  ]

  const [formContext, setFormContext] =
    React.useState<PaymentsFormContextValue | null>(null)
  const validationSchema = yup.object().shape({
    emailId: yup.string().email().required(EMAIL_REQUIRED),
    amount: yup.string().required(),
    otherAmount: yup.string().when('amount', {
      is: (accountNumber: string) => accountNumber === 'other',
      then: yup.string().required(AMOUNT_REQUIRED),
      otherwise: yup.string(),
    }),
    paymentDate: yup.string().required(),
    termsAndCondition: yup.bool().oneOf([true], TERMS_AND_CONDITION),
  })

  let blockType: BlockType = BlockType.None
  if (expressLoginDetails.blocking?.isBlockedForACH) {
    blockType = BlockType.Checking
  } else if (expressLoginDetails.blocking?.isBlockedForCard) {
    blockType = BlockType.Card
  }
  const authContext = {
    auth: expressLoginDetails.auth,
    APIKey: expressLoginDetails.APIKey,
    bankUrl: expressLoginDetails.bankUrl,
    creditUrl: expressLoginDetails.creditUrl,
    messageId: expressLoginDetails.messageId,
    sessionToken: expressLoginDetails.sessionToken,
  }

  React.useEffect(() => {
    if (accountId) {
      dispatch(fetchPaymentMethods(accountId))
    }
  }, [accountId])

  const getIframeContextValue = (
    formValues: ExpressPayPaymentFormValues,
    formikHelpers: FormikHelpers<ExpressPayPaymentFormValues>,
  ): PaymentsFormContextValue => {
    return {
      action: 'Payment',
      onIframeMessageCallback: onIframeMessageWithFormValues(
        formValues,
        formikHelpers,
      ),
    }
  }

  const onIframeMessageWithFormValues = (
    formValues: ExpressPayPaymentFormValues,
    formikHelpers: FormikHelpers<ExpressPayPaymentFormValues>,
  ) => {
    const onIframeMessage: OnIframeMessageCallback = async (err, response) => {
      //Clear the form context as soon as you hear it from iframe
      //otherwise you would end up posting and receiving messages
      //to and fro from iframe
      setFormContext(null)
      if (err) {
        if (err.message === 'FormValidationFailed') {
          setProcessingState({ kind: 'Init' })
        } else {
          setProcessingState({ kind: 'Failure', error: err.message })
        }
      } else {
        const result = response as PaymentInfoResult
        const payload: ExpressPayPayload = {
          amount: getPaymentAmount(formValues.amount, formValues.otherAmount),
          email: formValues.emailId,
          token: result.token || '',
          sessionToken: expressLoginDetails.sessionToken,
          accountId: expressLoginDetails.accountId,
          customerType: expressLoginDetails.customerType,
          customerName: expressLoginDetails.customerName,
          paymentType: result.paymentType,
          messageId: expressLoginDetails.messageId,
        }
        await handlePaymentSubmit(payload, result, formValues.paymentDate)
      }
      formikHelpers.setSubmitting(false)
    }
    return onIframeMessage
  }

  const getPaymentAmount = (amount: string, otherAmount: string) => {
    const { accountAmounts } = expressLoginDetails
    switch (amount) {
      case 'last':
        return accountAmounts?.previousBillAmount?.amount || 0
      case 'current':
        return accountAmounts?.currentDueBalance?.amount || 0
      case 'past':
        return accountAmounts?.pastDueAmounts?.totalPastDue?.amount || 0
      case 'other':
        return otherAmount
      default:
        return 0
    }
  }

  const handlePaymentSubmit = async (
    payload: ExpressPayPayload,
    result: PaymentInfoResult,
    paymentDate: string,
  ) => {
    try {
      const { data } = await APIClient.expressPayment(payload)
      const confirmationNumber = data.confirmationCode
      paymentConfirmation({
        accountNumber: payload.accountId,
        paymentAmount: `$${payload.amount}`,
        paymentDate: paymentDate,
        confirmationNumber,
        paymentMethod: result.paymentMethod,
      })
    } catch (e: any) {
      setProcessingState({ kind: 'Failure', error: paymentErrorHandler(e) })
    }
  }

  const handleSubmit = (
    formValues: ExpressPayPaymentFormValues,
    formikHelpers: FormikHelpers<ExpressPayPaymentFormValues>,
  ) => {
    if (
      formValues.newPaymentOption === 'bankAccountForm' ||
      formValues.newPaymentOption === 'creditCardForm'
    ) {
      setFormContext(getIframeContextValue(formValues, formikHelpers))
    } else {
      const methods = paymentMethods.data.paymentMethods.find(
        (item: any) => item.id === formValues.newPaymentOption,
      )
      const payload: ExpressPayPayload = {
        amount: getPaymentAmount(formValues.amount, formValues.otherAmount),
        email: formValues.emailId,
        token: methods?.id || '',
        sessionToken: expressLoginDetails.sessionToken,
        accountId: expressLoginDetails.accountId,
        customerType: expressLoginDetails.customerType,
        customerName: expressLoginDetails.customerName,
        paymentType:
          methods?.type?.toLowerCase() === 'card'
            ? 'ONE_TIME_CARD'
            : 'ONE_TIME_ACH',
        messageId: expressLoginDetails.messageId,
      }

      const result = {
        paymentType: payload?.paymentType,
        token: '',
        paymentMethod: formValues.newPaymentOption,
      } as PaymentInfoResult

      handlePaymentSubmit(payload, result, formValues.paymentDate)
    }
  }

  return (
    <>
      <Typography tagType="h1" styleType="h3" className={classes.pageTitle}>
        {title?.value}
      </Typography>
      <Typography tagType="h2" styleType="h5">
        {subTitle?.value}
      </Typography>
      <div className={classes.paymentFormcontainer}>
        <Formik
          initialValues={{
            emailId: '',
            amount: '',
            otherAmount: '',
            paymentDate: format(new Date(), 'eeee, dd, yyyy'),
            termsAndCondition: false,
            newPaymentOption: 'bankAccountForm',
          }}
          noValidate
          validationSchema={validationSchema}
          onSubmit={(
            values: ExpressPayPaymentFormValues,
            formikHelpers: FormikHelpers<ExpressPayPaymentFormValues>,
          ) => {
            formikHelpers.setSubmitting(true)
            setProcessingState({ kind: 'Intermediate' })
            handleSubmit(values, formikHelpers)
          }}
        >
          {(formikProps: FormikProps<ExpressPayPaymentFormValues>) => (
            <Form>
              <div className={classes.fieldContainer}>
                <FormHelperText className={classes.sectionHeader}>
                  {paymentAmount?.value}{' '}
                </FormHelperText>
                {paymentAmountOptions.map((paymentOption, paymentIndex) => {
                  const { value, label } = paymentOption
                  return (
                    <div
                      key={`payment-index-${paymentIndex}`}
                      className={classes.paymentAmountFormFields}
                    >
                      <Field type="radio" name="amount" value={value} />
                      {label}
                    </div>
                  )
                })}
                {formikProps.values.amount === 'other' ? (
                  <Field
                    type="text"
                    name="otherAmount"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                    component={InputField}
                    size="small"
                    restrictToNumber
                    placeholder="0.00"
                  ></Field>
                ) : null}
              </div>
              <div className={classes.paymentIframeContainer}>
                <FormHelperText className={classes.sectionHeader}>
                  {paymentMethod?.value}{' '}
                </FormHelperText>
                <PaymentsAuthContext.Provider value={authContext}>
                  <PaymentsFormContext.Provider value={formContext}>
                    <SelectPaymentMethods
                      formikProps={formikProps}
                      blockType={blockType}
                      paymentMethods={paymentMethods.data.paymentMethods || []}
                    />
                  </PaymentsFormContext.Provider>
                </PaymentsAuthContext.Provider>
              </div>
              <PaymentsFormFooter
                cancelButtonText={cancelBtnText?.value}
                submitButtonText={submitBtnText?.value}
                notification={ALL_FIELDS_REQUIRED}
                onCancel={() => (window.location.href = '/')}
                showEmail={true}
                showTerms={true}
                isSubmitDisable={
                  !formikProps.isValid || formikProps.isSubmitting
                }
                tncLink={tncLink?.url}
              />
            </Form>
          )}
        </Formik>
      </div>
      <AutopayModal
        open={
          processingState.kind === 'Intermediate' ||
          processingState.kind === 'Failure'
        }
        inProgress={processingState.kind === 'Intermediate'}
        onClose={() => {
          setFormContext(null)
          setProcessingState({ kind: 'Init' })
        }}
        error={processingState.kind === 'Failure' ? processingState.error : ''}
      />
    </>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  paymentFormcontainer: {
    marginTop: '1rem',
    padding: '2rem',
    border: '1px solid #dedede',
    maxWidth: '63rem',
    width: '60%',
    fontFamily: PP_OBJECT_SANS,
    [breakpoints.down('xs')]: {
      width: '100%',
      padding: '1rem',
    },
  },
  sectionHeader: {
    fontSize: '1.2rem',
    marginBottom: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 600,
    color: colors.main.dark,
    fontFamily: PP_OBJECT_SANS,
    '& p ': {
      fontFamily: PP_OBJECT_SANS,
    },
  },
  paymentIframeContainer: {
    marginTop: '1rem',
    fontFamily: PP_OBJECT_SANS,
  },
  paymentAmountFormFields: {
    marginBottom: '0.5rem',
  },
  pageTitle: {
    marginBottom: '1rem',
  },
  fieldContainer: {
    marginTop: '1rem',
  },
}))

export default ExpressPayPaymentForm
