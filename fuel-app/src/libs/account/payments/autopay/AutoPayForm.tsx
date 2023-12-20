/* eslint-disable @typescript-eslint/indent */
import { FC, useEffect, useState } from 'react'
import { Container } from '@material-ui/core'
import { Formik, FormikHelpers, FormikProps, Form } from 'formik'
import * as yup from 'yup'
import { ALL_FIELDS_REQUIRED, AUTOPAY_SIGNUP_FORM_TITLE } from 'src/constants'
import css from './manage-autopay-form.module.scss'
import { useRouter } from 'next/router'
import {
  IAutoPayFormValues,
  OnIframeMessageCallback,
  ProcessingState,
} from '../shared/types'
import { SelectPaymentMethod } from '../shared/payment-form-fields/SelectPaymentMethod'
import { useDispatch } from 'react-redux'
import {
  getBlockType,
  getDefaultPaymentMethodId,
  paymentErrorHandler,
} from '../util'
import { fetchDSTAuthDetails } from 'src/redux/slicers/payment'
import { Loading } from 'src/blitz'
import { Info } from '../../shared/Info'
import PaymentsFormFooter from '../shared/payment-form-fields/PaymentsFormFooter'
import APIClient from '../../../../api-client'
import { AutoPayPayload } from 'src/api-client/types'
import AutopayModal from './AutopayModal'
import { AppRoutes } from 'src/constants/appRoutes'
import AutopayField from '../shared/AutopayField'
import {
  PaymentsAuthContext,
  PaymentsAuthContextValue,
  PaymentsFormContext,
  PaymentsFormContextValue,
} from '../shared/PaymentsFormContext'
import { fetchPaymentMethods } from 'src/redux/slicers/payment'
import {
  usePaymentMethods,
  useActiveAccount,
  useActiveAccountId,
  useDSTConfigDetails,
  useAutopayDetails,
  useSessionState,
} from 'src/selector-hooks'

// the Formik component supports yup validation out-of-the-box via the `validationSchema` prop
const validationSchema = yup.object().shape({
  emailId: yup.string().required('Required').email('Email is invalid'),
  termsAndCondition: yup
    .bool()
    .oneOf([true], 'You need to accept the terms and conditions'),
})

interface IAutoPayFormProps {
  type?: 'Create' | 'Edit' | 'View'
  showTitle?: boolean
  onCancel?: () => void
  paymentMethod?: string
}

const AutoPayForm: FC<IAutoPayFormProps> = ({
  type = 'Create',
  onCancel,
  paymentMethod,
}) => {
  const [processingState, setProcessingState] = useState<ProcessingState>({
    kind: 'Init',
  })
  const [formContext, setFormContext] =
    useState<PaymentsFormContextValue | null>(null)
  const [authContext, setAuthContext] =
    useState<PaymentsAuthContextValue | null>(null)
  const dispatch = useDispatch()
  const router = useRouter()
  const paymentMethods = usePaymentMethods()
  const accountDetails = useActiveAccount()
  const activeAccount = useActiveAccount()
  const activeAccountId = useActiveAccountId()
  const dstAuthConfig = useDSTConfigDetails()
  const autopayData = useAutopayDetails()
  const blockType = getBlockType(accountDetails.data)
  const defaultPaymentMethodId = getDefaultPaymentMethodId(
    paymentMethods.data.paymentMethods || [],
    blockType,
  )
  const sessionState = useSessionState()
  const loginEmail = sessionState?.loggedInState?.email

  const isCreateFlow = type === 'Create'
  const actionButtonTexts = isCreateFlow
    ? ['Cancel', 'Sign Up']
    : ["Don't Update", 'Update']

  const getInitialValues = () => ({
    emailId:
      paymentMethods.data.profile?.email ||
      activeAccount.data.primaryContact ||
      loginEmail,
    newPaymentOption: 'bankAccountForm',
    paymentMethod: defaultPaymentMethodId,
    termsAndCondition: false,
  })

  useEffect(() => {
    if (activeAccountId && type !== 'View') {
      dispatch(fetchPaymentMethods(activeAccountId))
      dispatch(fetchDSTAuthDetails(activeAccountId))
    }
  }, [activeAccountId, type])

  useEffect(() => {
    if (!authContext && Object.keys(dstAuthConfig.data).length > 0) {
      setAuthContext({
        auth: dstAuthConfig.data.auth,
        APIKey: dstAuthConfig.data.APIKey,
        bankUrl: dstAuthConfig.data.bankUrl,
        creditUrl: dstAuthConfig.data.creditUrl,
        messageId: dstAuthConfig.data.messageId,
        sessionToken: dstAuthConfig.data.sessionToken,
      })
    }
  }, [dstAuthConfig])

  const getIframeContextValue = (
    formValues: IAutoPayFormValues,
    formikHelpers: FormikHelpers<IAutoPayFormValues>,
  ): PaymentsFormContextValue => {
    return {
      action: 'AddWallet',
      onIframeMessageCallback: onIframeMessageWithFormValues(
        formValues,
        formikHelpers,
      ),
    }
  }

  const handleAutoPay = async (payload: AutoPayPayload) => {
    try {
      const api = isCreateFlow
        ? APIClient.setupAutoPay
        : APIClient.updateAutoPay
      await api(activeAccountId, payload)
      router.push({
        pathname: AppRoutes.AutopayConfirmationPage,
        query: { type: isCreateFlow ? 'signup' : 'update' },
      })
    } catch (e: any) {
      setProcessingState({ kind: 'Failure', error: paymentErrorHandler(e) })
    }
  }

  const onIframeMessageWithFormValues = (
    formValues: IAutoPayFormValues,
    formikHelpers: FormikHelpers<IAutoPayFormValues>,
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
        const payload: AutoPayPayload = {
          email: formValues?.emailId || '',
          customerType: dstAuthConfig.data.customerType,
          paymentMethodId: response?.token || '',
        }
        await handleAutoPay(payload)
      }
      formikHelpers.setSubmitting(false)
    }
    return onIframeMessage
  }

  const renderDstForm = () => (
    <Formik
      initialValues={getInitialValues()}
      validateOnMount
      validationSchema={validationSchema}
      onSubmit={async (
        values: IAutoPayFormValues,
        formikHelpers: FormikHelpers<IAutoPayFormValues>,
      ) => {
        formikHelpers.setSubmitting(true)
        setProcessingState({ kind: 'Intermediate' })
        if (values.paymentMethod !== 'new') {
          const payload: AutoPayPayload = {
            email: values?.emailId || '',
            customerType: dstAuthConfig.data.customerType,
            paymentMethodId: values?.paymentMethod || '',
          }
          await handleAutoPay(payload)
          formikHelpers.setSubmitting(false)
        } else {
          setFormContext(getIframeContextValue(values, formikHelpers))
        }
      }}
    >
      {(formikProps: FormikProps<IAutoPayFormValues>) => {
        return (
          <Form noValidate className={css.paymentForm} autoComplete="off">
            <AutopayField
              label="Payment Amount"
              value="Total amount due each month"
            />
            <AutopayField label="Payment Date" value="On due date" />
            {type === 'View' && paymentMethod ? (
              <AutopayField label="Payment Method" value={paymentMethod} />
            ) : (
              <PaymentsAuthContext.Provider value={authContext}>
                <PaymentsFormContext.Provider value={formContext}>
                  <SelectPaymentMethod
                    formikProps={formikProps}
                    blockType={blockType}
                    paymentMethods={paymentMethods.data.paymentMethods || []}
                  />
                </PaymentsFormContext.Provider>
              </PaymentsAuthContext.Provider>
            )}
            {type !== 'View' && (
              <PaymentsFormFooter
                notification={ALL_FIELDS_REQUIRED}
                showEmail={true}
                showTerms={true}
                onCancel={
                  onCancel ? onCancel : () => router.push('/account/summary')
                }
                isSubmitDisable={
                  !formikProps.isValid || formikProps.isSubmitting
                }
                cancelButtonText={actionButtonTexts[0]}
                submitButtonText={actionButtonTexts[1]}
              />
            )}
          </Form>
        )
      }}
    </Formik>
  )

  return (
    <Container
      style={{
        padding: isCreateFlow ? 16 : 1,
      }}
    >
      {isCreateFlow && (
        <h1 className={css.paymentTitle}>{AUTOPAY_SIGNUP_FORM_TITLE}</h1>
      )}
      {paymentMethods.isLoading ||
      dstAuthConfig.isLoading ||
      autopayData.isLoading ? (
        <Loading />
      ) : paymentMethods.error || dstAuthConfig.error ? (
        <Info type="error" message="Failed to fetch the data" />
      ) : (
        renderDstForm()
      )}
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
    </Container>
  )
}

export default AutoPayForm
