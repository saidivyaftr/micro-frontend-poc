/* eslint-disable @typescript-eslint/indent */
import * as React from 'react'
import { Container } from '@material-ui/core'
import { Formik, FormikHelpers, FormikProps, Form } from 'formik'
import * as yup from 'yup'
import {
  PAYMENT_AMOUNT_REQUIRED,
  PAYMENT_VALID_AMOUNT,
  PAYMENT_MIN_WARN,
  PAYMENT_CARD_MAX_WARN,
  PAYMENT_ACCOUNT_MAX_WARN,
  PAYMENT_CONFIRMATION,
  RESIDENTIAL_CUSTOMER,
  INTERNET_OR_PHONE,
  PAYMENT_FAILURE,
} from 'src/constants'
import css from './payments.module.scss'
import ErrorMessage from 'src/libs/account/shared/ErrorMessage'
import { IPaymentFormValues } from './shared/types'
import { SelectPaymentMethod } from './shared/payment-form-fields/SelectPaymentMethod'
import moment from 'moment'
import { InjectHTML, Skeleton } from 'src/blitz'
import { useDispatch } from 'react-redux'
import { PostPaymentPayload } from 'src/api-client/types'
import PaymentsFormFooter from './shared/payment-form-fields/PaymentsFormFooter'
import SelectPaymentAmount from './shared/payment-form-fields/SelectPaymentAmount'
import SelectPaymentDate from './shared/payment-form-fields/SelectPaymentDate'
import { getBlockType, getDefaultPaymentMethodId } from './util'
import APIClient from '../../../api-client'
import {
  PaymentsAuthContext,
  PaymentsAuthContextValue,
} from './shared/PaymentsFormContext'
import { paymentSlice } from 'src/redux/slicers'
import {
  usePaymentMethods,
  useActiveAccountId,
  useActiveAccount,
  useDSTConfigDetails,
  useAccountList,
  useSessionState,
  usePaymentList,
} from 'src/selector-hooks'
import PayBillBanner from './shared/payment-form-fields/PayBillBanner'
import ConfirmationModal from './Confirmation'
import { PaymentMethod } from 'src/redux/types/payments'
import { isAutoPayEnabled } from 'src/libs/account/helper'
import AddPaymentMethod from 'src/components/AddPaymentMethod'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import {
  fetchDSTAuthDetails,
  fetchPaymentHistory,
  fetchPaymentMethods,
} from 'src/redux/slicers/payment'
import useAppData from '@/shared-ui/hooks/useAppData'

type AmountTypes = {
  pastDueBalance: { amount: number; date: string }
  currentBalance: { amount: number; dueDate: string }
}

export type ConfirmationModalType =
  | 'BUSINESS'
  | 'SCHEDULE'
  | 'ORDINARY'
  | 'INSUFFICIENT'
  | 'HIGHER_PAYMENT'
  | 'LESSER_PAYMENT'
  | 'FAILURE'
  | ''

const PaymentsForm = () => {
  const dispatch = useDispatch()
  const paymentInformationData = useAppData('paymentInformationData', true)
  const paymentFormFields = useAppData('paymentFormFields', true)

  const [authContext, setAuthContext] =
    React.useState<PaymentsAuthContextValue | null>(null)
  const [selectedCard, setSelectedCard] = React.useState<PaymentMethod | null>(
    null,
  )
  const [openConfirmationModal, setConfirmationModal] = React.useState(false)
  const [confirmationModalType, setConfirmationModalType] =
    React.useState<ConfirmationModalType>('')
  const [isSubmitDisable, setSubmittingDisable] = React.useState(false)
  const [isBusySavingPayment, setIsBusySavingPayment] = React.useState(false)
  const [isTempLoading, setIsTempLoading] = React.useState(false)

  const [formValues, setFormValues] = React.useState<{
    values: IPaymentFormValues | null
    isInvokedAfterConfirmationModal: boolean
    helpers?: FormikHelpers<IPaymentFormValues> | null
  }>({
    values: null,
    helpers: null,
    isInvokedAfterConfirmationModal: false,
  })

  const { isLoading: accountListLoading, error: accountListError } =
    useAccountList()
  const {
    isLoading: paymentMethodsLoading,
    data: availablePaymentMethods,
    error: paymentMethodError,
  } = usePaymentMethods()
  const activeAccount = useActiveAccount()
  const sessionState = useSessionState()
  const loginEmail = sessionState?.loggedInState?.email
  const activeAccountId = useActiveAccountId()
  const { data: paymentListData } = usePaymentList()

  const {
    isLoading: accountLoading,
    data: accountDetails,
    error: accountError,
  } = useActiveAccount()

  const isAutoPayOn = isAutoPayEnabled(accountDetails.autopayType)

  const {
    isLoading: dstLoading,
    data: dstConfigDetails,
    error: dstError,
  } = useDSTConfigDetails()

  const blockType = getBlockType(accountDetails)

  const defaultPaymentMethodId = getDefaultPaymentMethodId(
    availablePaymentMethods.paymentMethods,
    blockType,
  )

  const paymentMethods = availablePaymentMethods.paymentMethods?.filter(
    (paymentMethod: any) => paymentMethod?.status?.toLowerCase() !== 'expired',
  )

  React.useEffect(() => {
    if (!authContext && Object.keys(dstConfigDetails).length > 0) {
      setAuthContext({
        auth: dstConfigDetails.auth,
        APIKey: dstConfigDetails.APIKey,
        bankUrl: dstConfigDetails.bankUrl,
        creditUrl: dstConfigDetails.creditUrl,
        messageId: dstConfigDetails.messageId,
        sessionToken: dstConfigDetails.sessionToken,
      })
    }
  }, [dstConfigDetails])

  const getFundingType = (fundingTypeMethod = '') => {
    let fundingType = 'ONE_TIME_CARD'
    if (
      fundingTypeMethod === 'Checking' ||
      fundingTypeMethod === 'Savings' ||
      fundingTypeMethod === 'ACH'
    ) {
      fundingType = 'ONE_TIME_ACH'
    }
    return fundingType
  }

  const validationSchema = yup.object().shape({
    paymentAmount: yup.string().required('Required'),
    paymentAmountOther: yup.number().when(['paymentAmount'], {
      is: (paymentAmount: string) => paymentAmount === 'Others',
      then: yup
        .number()
        .typeError(PAYMENT_VALID_AMOUNT)
        .required(
          paymentFormFields?.enterPaymentAmount?.value ||
            PAYMENT_AMOUNT_REQUIRED,
        )
        .min(1, PAYMENT_MIN_WARN)
        .max(
          selectedCard?.type === 'Card' ? 100000 : 1000000,
          selectedCard?.type === 'Card'
            ? PAYMENT_CARD_MAX_WARN
            : PAYMENT_ACCOUNT_MAX_WARN,
        ),
    }),
    paymentDate: yup.string().required('Required'),
    schedulePaymentDate: yup.date().when('paymentDate', {
      is: 'scheduleAPayment',
      then: yup.date().required('Required'),
    }),
  })

  const onConfirmModal = () => {
    setConfirmationModal(false)
    setConfirmationModalType('')
    if (formValues.values !== null) {
      handleMakeAPayment(formValues.values, formValues.helpers!, {
        isInvokedAfterConfirmationModal: confirmationModalType !== 'BUSINESS',
        isInvokedAfterBusinessModal: true,
      })
    }
  }

  // New payment method entered for payment
  const handleNewPaymentSuccess =
    (newFormValues: any) =>
    async (
      paymentId: string,
      isDefault: boolean,
      paymentType?: string,
      cardType?: string,
      formData?: IPaymentFormValues,
      methodName?: string,
      addedNewPaymentMethod?: boolean,
    ) => {
      setSubmittingDisable(true)

      // Fetch new payment method added before submitting the payment - If saved
      if (newFormValues.paymentMethod === 'new' && addedNewPaymentMethod) {
        await dispatch(fetchPaymentMethods(activeAccountId, true))
      }

      if (newFormValues && !!Object.values(newFormValues)?.length) {
        const updatedFormData = {
          ...newFormValues,
          addedNewPaymentMethod: newFormValues.paymentMethod === 'new',
          // Replacing 'new' value to the newly added payment method ID
          paymentMethod: paymentId,
          paymentMethodDescription: methodName,
          fundingType: cardType,
        }
        handleMakeAPayment(updatedFormData, null, {
          isInvokedAfterConfirmationModal: false,
          paymentType,
          cardType,
        })
      } else {
        setSubmittingDisable(false)
      }
    }

  const handleMakeAPayment = async (
    values: IPaymentFormValues,
    formikHelpers: FormikHelpers<IPaymentFormValues> | null,
    options: {
      isInvokedAfterBusinessModal?: boolean
      isInvokedAfterConfirmationModal?: boolean
      paymentType?: string
      cardType?: string
    },
  ) => {
    const paymentCardType = options.cardType
      ? options.cardType
      : availablePaymentMethods?.paymentMethods?.find(
          (option) => option.id === values.paymentMethod,
        )?.class

    // Storing the payment values to use if after the modal confirmation
    setFormValues({
      values: JSON.parse(JSON.stringify(values)),
      helpers: formikHelpers,
      isInvokedAfterConfirmationModal:
        !!options.isInvokedAfterConfirmationModal,
    })

    const isCustomAmountPayment = values.paymentAmount === 'Others'
    const shouldShowBusinessConfirmationModal =
      paymentCardType === 'BUSINESS' && !options.isInvokedAfterBusinessModal

    // Show Business confirmation modal and then calculate the else condition after confirming it
    if (shouldShowBusinessConfirmationModal) {
      setConfirmationModal(true)
      setConfirmationModalType('BUSINESS')
      formikHelpers && formikHelpers.setSubmitting(false)
      return
    }

    // Show insufficient, higher payment or less payment models when paying with 'Enter Custom Amount' option
    if (isCustomAmountPayment && !options.isInvokedAfterConfirmationModal) {
      const isAmountInSufficient =
        Number(values.paymentAmountOther) <
        (accountDetails.bill?.pastDueBalance?.amount || 0)

      const isAmountHigherThanThePayment =
        Number(values.paymentAmountOther) >
        (accountDetails.bill?.currentBalance?.amount || 0)

      const isAmountLessThanCurrentBillButMoreThanPastBill =
        Number(values.paymentAmountOther) <
          (accountDetails.bill?.currentBalance?.amount || 0) &&
        Number(values.paymentAmountOther) >
          (accountDetails.bill?.pastDueBalance?.amount || 0)

      let modalType: ConfirmationModalType = ''
      switch (true) {
        case isAmountInSufficient:
          modalType = 'INSUFFICIENT'
          break
        case isAmountHigherThanThePayment:
          modalType = 'HIGHER_PAYMENT'
          break
        case isAmountLessThanCurrentBillButMoreThanPastBill:
          modalType = 'LESSER_PAYMENT'
          break
      }

      if (modalType) {
        setConfirmationModal(true)
        setConfirmationModalType(modalType)
        formikHelpers && formikHelpers.setSubmitting(false)
        return
      }
    }

    const fundingType = options.paymentType || values.fundingType

    handlePaymentSubmit(values, formikHelpers, fundingType)
  }

  // Form the data for payment submission
  const handlePaymentSubmit = async (
    values: IPaymentFormValues,
    formikHelpers?: FormikHelpers<IPaymentFormValues> | null,
    paymentType?: string,
  ) => {
    setIsBusySavingPayment(true)

    const paymentMethodsList = [...(paymentMethods || [])]
    const paymentMethodInUse = paymentMethodsList.find(
      (x) => x.id == values.paymentMethod,
    )
    const paymentMethodId = paymentMethodInUse?.id || values.paymentMethod

    const fundingTypeMethod =
      paymentType || values.fundingType || paymentMethodInUse?.type || ''

    const amountType = values.paymentAmount as keyof AmountTypes

    const amount =
      values.paymentAmount === 'Others'
        ? Number(values.paymentAmountOther).toFixed(2)
        : Number(accountDetails?.bill?.[amountType]?.amount).toFixed(2)

    const paymentEmail =
      availablePaymentMethods.profile?.email ||
      activeAccount.data.primaryContact ||
      loginEmail

    const paymentData = {
      amount,
      customerType: dstConfigDetails.customerType,
      customerName: dstConfigDetails.customerName,
      fundingType: getFundingType(fundingTypeMethod),
      token: paymentMethodId ? `${paymentMethodId}` : '',
      addToWallet: false,
      date: moment(values.schedulePaymentDate).format('YYYY-MM-DD'),
      email: paymentEmail,
    }

    await handleOneTimePay(
      paymentData,
      paymentMethodInUse?.description || values.paymentMethodDescription,
      values.addedNewPaymentMethod,
    )
    formikHelpers && formikHelpers.setSubmitting(false)
    setSubmittingDisable(false)
    setIsBusySavingPayment(false)
  }

  const handleOneTimePay = async (
    payload: PostPaymentPayload,
    description?: string,
    isNewPaymentMethod?: boolean,
  ) => {
    let eVar54 = ''
    let isDefaultPayment = false
    const newPaymentMethodAdded = payload.addToWallet || isNewPaymentMethod

    try {
      setIsBusySavingPayment(true)
      const { data } = await APIClient.postPayment(activeAccountId, payload)
      dispatch(
        paymentSlice.actions.setPaymentConfirmationData({
          kind: 'OneTimePayment',
          data: {
            paymentAmount: payload.amount,
            paymentDate: payload.date,
            paymentMethod: description,
            confirmationNumber: data.referenceCode || data.confirmationCode,
            email: payload.email,
          },
        }),
      )
      const currentDate = moment()
      const payloadDate = moment(payload.date)
      const isNotEqual =
        payloadDate.year() !== currentDate.year() ||
        payloadDate.month() !== currentDate.month() ||
        payloadDate.date() !== currentDate.date()

      const paymentMethod = paymentMethods.find(
        (method) => method.id === payload.token,
      )

      isDefaultPayment = Boolean(paymentMethod?.default)

      eVar54 = `${
        newPaymentMethodAdded
          ? 'new'
          : isDefaultPayment
          ? 'default'
          : 'existing'
      }|${
        payload.fundingType === 'ONE_TIME_CARD' ? 'credit or debit card' : 'ach'
      }`

      DTMClient.triggerEvent({
        pageName: PAYMENT_CONFIRMATION,
        events: `event10,event40=${payload.amount}${
          newPaymentMethodAdded ? ',event177' : ''
        }${newPaymentMethodAdded && isDefaultPayment ? ',event179' : ''}`,
        eVar21: sessionState?.data?.fidUuid,
        eVar22: RESIDENTIAL_CUSTOMER,
        eVar39: data.referenceCode || data.confirmationCode,
        eVar54,
        eVar60: INTERNET_OR_PHONE,
        eVar66: activeAccount?.data?.accountType,
        eVar100: activeAccount?.data?.accountUID,
      })
      dispatch(fetchDSTAuthDetails(activeAccountId))
      dispatch(fetchPaymentHistory(activeAccountId))
      dispatch(fetchPaymentMethods(activeAccountId))
      setConfirmationModalType(isNotEqual ? 'SCHEDULE' : 'ORDINARY')
      setConfirmationModal(true)
      resetForm()
    } catch (e: any) {
      setConfirmationModalType('FAILURE')
      setConfirmationModal(true)
      setIsBusySavingPayment(false)

      DTMClient.triggerEvent({
        pageName: PAYMENT_FAILURE,
        events: `event10,event40=${payload.amount}${
          newPaymentMethodAdded ? ',event177' : ''
        }${newPaymentMethodAdded && isDefaultPayment ? ',event179' : ''}`,
        eVar21: sessionState?.data?.fidUuid,
        eVar22: RESIDENTIAL_CUSTOMER,
        eVar54,
        eVar60: INTERNET_OR_PHONE,
        eVar66: activeAccount?.data?.accountType,
        eVar100: activeAccount?.data?.accountUID,
      })
    }
  }

  const isLoading =
    accountListLoading ||
    paymentMethodsLoading ||
    accountLoading ||
    dstLoading ||
    isTempLoading

  const isError =
    accountListError ||
    accountError ||
    paymentMethodError ||
    dstError ||
    Object.keys(accountDetails).length < 1

  if (isLoading) {
    return <PaymentFormSkeleton />
  }

  const resetForm = () => {
    setSelectedCard(null)
    if (formValues?.helpers?.resetForm) {
      formValues.helpers.resetForm()
      formValues.helpers.setSubmitting(false)
    }
    setSubmittingDisable(false)
    setIsBusySavingPayment(false)
    setIsTempLoading(true)
    setTimeout(() => {
      setIsTempLoading(false)
    }, 500)
  }

  return (
    <Container>
      <InjectHTML
        addAnchorStyles
        tagType="h2"
        styleType="h5"
        value={paymentInformationData?.title?.value}
      />
      {isError ? (
        <ErrorMessage
          styleType="p2"
          message={paymentFormFields?.somethingWentWrong?.value}
        />
      ) : (
        <Formik
          initialValues={{
            paymentAmount:
              accountDetails?.bill?.currentBalance?.amount &&
              accountDetails.bill.currentBalance.amount > 0
                ? 'currentBalance'
                : 'Others',
            paymentDate: 'payToday',
            newPaymentOption: 'bankAccountForm',
            schedulePaymentDate: moment().format('ll'),
            paymentAmountOther: '',
            paymentMethod: defaultPaymentMethodId,
          }}
          validateOnMount
          validationSchema={validationSchema}
          onSubmit={(
            values: IPaymentFormValues,
            formikHelpers: FormikHelpers<IPaymentFormValues>,
          ) => {
            handleMakeAPayment(values, formikHelpers, {
              isInvokedAfterConfirmationModal: false,
            })
          }}
        >
          {(formikProps: FormikProps<IPaymentFormValues>) => (
            <Form noValidate autoComplete="off">
              <div
                role="group"
                aria-labelledby="paymentContainer"
                className={css.formFields}
              >
                <PayBillBanner
                  scheduledPayment={paymentListData?.scheduled || []}
                  autoPayDate={moment(
                    accountDetails?.bill?.currentBalance?.dueDate,
                  ).format('ll')}
                  isAutoPayOn={isAutoPayOn}
                />
                <SelectPaymentAmount
                  formikProps={formikProps}
                  accountDetails={accountDetails}
                />
                <PaymentsAuthContext.Provider value={authContext}>
                  <SelectPaymentMethod
                    blockType={blockType}
                    formikProps={formikProps}
                    paymentMethods={paymentMethods || []}
                    setSelectedCard={setSelectedCard}
                  />
                </PaymentsAuthContext.Provider>
                {formikProps.values.paymentMethod !== 'new' && (
                  <SelectPaymentDate />
                )}
              </div>
              {formikProps.values.paymentMethod === 'new' ? (
                <AddPaymentMethod
                  showTitle
                  dstConfig={dstConfigDetails}
                  primaryBtnText={
                    paymentInformationData?.submitBtn?.value || 'SUBMIT PAYMENT'
                  }
                  description={<SelectPaymentDate />}
                  successCallback={handleNewPaymentSuccess(
                    JSON.parse(JSON.stringify(formikProps.values)),
                  )}
                  hideCancelBtn={true}
                  primaryBtnDisabled={!formikProps.isValid}
                  isBusy={formikProps.isSubmitting || isSubmitDisable}
                  paymentFormData={formikProps.values}
                />
              ) : (
                <PaymentsFormFooter
                  isSubmitDisable={!formikProps.isValid}
                  showSavePayment={false}
                  showTerms={false}
                  submitButtonText={
                    paymentInformationData?.submitBtn?.value || 'SUBMIT PAYMENT'
                  }
                  footerWrapperClassName={css.footerWrapperClass}
                  formActionClassName={css.footerFormActionClass}
                  isBusySavingPayment={
                    isBusySavingPayment || formikProps.isSubmitting
                  }
                />
              )}
            </Form>
          )}
        </Formik>
      )}

      {openConfirmationModal && (
        <ConfirmationModal
          closeModal={() => {
            setConfirmationModal(false)
            resetForm()
          }}
          setConfirmationModal={(value) => {
            setConfirmationModal(value)
            if (!value) {
              setSubmittingDisable(false)
            }
          }}
          openModal={true}
          onConfirm={onConfirmModal}
          modalType={confirmationModalType}
        />
      )}
    </Container>
  )
}

const PaymentFormSkeleton = () => {
  return (
    <div>
      <Skeleton width={'70%'} height={30} />
      <Skeleton width={'80%'} height={90} />
      <Skeleton width={'60%'} height={30} />
    </div>
  )
}

export default PaymentsForm
