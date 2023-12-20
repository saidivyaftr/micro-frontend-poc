import { makeStyles } from '@material-ui/core'
import { Button, Skeleton, Typography } from 'src/blitz'
import { PaymentTermsAndConditions } from 'src/libs/account/shared/modals'
import { PP_OBJECT_SANS_MEDIUM } from 'src/constants/fontFamilyNames'
import { useEffect, useMemo, useState } from 'react'
import { Dropdown, Checkbox } from 'src/ui-kit'
import {
  CheckboxCheck,
  CheckboxUnCheck,
  InfoIcon,
} from 'src/blitz/assets/react-icons'
import {
  useActiveAccount,
  useActiveAccountId,
  useDSTConfigDetails,
  usePaymentMethods,
  useSessionState,
} from 'src/selector-hooks'
import { useDispatch } from 'react-redux'
import {
  fetchAutopayDetails,
  fetchDSTAuthDetails,
  fetchPaymentMethods,
  paymentSlice,
} from 'src/redux/slicers/payment'
import APIClient from 'src/api-client'
import {
  EnrollConfirmation,
  PaymentMethodUpdateConfirmation,
} from './auto-pay-modals'
import AddPaymentMethod from 'src/components/AddPaymentMethod'
import clx from 'classnames'
import { getPaymentMethodLabel } from '../../helper'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { fetchAccountDetails } from 'src/redux/slicers/account'
import useAppData from '@/shared-ui/hooks/useAppData'
import { SITE_ERROR } from 'src/constants'

const ADD_NEW_CARD_OPTION = {
  label: 'Add new payment method',
  value: 'ADD_NEW',
}

export const SetupAutoPay = ({
  isUpdate,
  previousPaymentMethodId,
  setShowSetupForm,
}: {
  isUpdate?: boolean
  previousPaymentMethodId?: string
  setShowSetupForm: any
}) => {
  const paymentTermsAndConditionsData = useAppData(
    'paymentTermsAndConditionsData',
    true,
  )
  const dispatch = useDispatch()
  const autoPayData = useAppData('autoPayData', true)
  const classes = useStyles()

  const { data: paymentMethods } = usePaymentMethods()
  const paymentOptions = paymentMethods.paymentMethods
  const activeAccountId = useActiveAccountId()
  const activeAccount = useActiveAccount().data
  const dstAuthConfig = useDSTConfigDetails()
  const sessionState = useSessionState()
  const loginEmail = sessionState?.loggedInState?.email

  let defaultPaymentMethod = previousPaymentMethodId
    ? paymentOptions?.find((method) => method.id === previousPaymentMethodId)
    : paymentOptions?.find((method) => method.default)
  defaultPaymentMethod = defaultPaymentMethod ?? paymentOptions?.[0]

  let initialValue = ADD_NEW_CARD_OPTION
  if (defaultPaymentMethod) {
    initialValue = {
      label: getPaymentMethodLabel(defaultPaymentMethod),
      value: defaultPaymentMethod?.id,
    }
  }

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState(initialValue)
  const [isTermsAndConditionsChecked, setIsTermsAndConditionsChecked] =
    useState(false)
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false)
  const [showEnrolledModal, setShowEnrolledModal] = useState(false)
  const [isEnrolling, setIsEnrolling] = useState(false)
  const [hasAPIError, setHasAPIError] = useState(false)

  useEffect(() => {
    if (activeAccountId) {
      dispatch(fetchDSTAuthDetails(activeAccountId))
    }
  }, [activeAccountId])

  const handleEnrollOrUpdateAutoPay = async (paymentMethodId?: string) => {
    setIsEnrolling(true)
    setHasAPIError(false)
    try {
      const client = isUpdate ? APIClient.updateAutoPay : APIClient.setupAutoPay
      const clientPromise = client(activeAccountId, {
        customerType: dstAuthConfig?.data?.customerType,
        email:
          paymentMethods.profile?.email ||
          activeAccount.primaryContact ||
          loginEmail,
        paymentMethodId: paymentMethodId ?? selectedPaymentMethod?.value,
      })
      if (paymentMethodId) {
        await Promise.all([
          dispatch(fetchPaymentMethods(activeAccountId, true)),
          clientPromise,
        ])
      } else {
        await clientPromise
      }
      if (!isUpdate) {
        DTMClient.triggerEvent(
          { events: 'event8' },
          'tl_o',
          'my account:complete autopay',
        )
      } else {
        DTMClient.triggerEvent(
          { events: 'event53' },
          'tl_o',
          'my account:edit autopay',
        )
      }
      setShowEnrolledModal(true)
    } catch (error) {
      setHasAPIError(true)
      DTMClient.triggerEvent(
        {
          events: 'event88',
          eVar2: 'my account:edit autopay',
          eVar88: 'Failed to edit autopay',
        },
        'tl_o',
        SITE_ERROR,
      )
    }
    setIsEnrolling(false)
  }

  const handleManageAutoPay = () => {
    if (!isUpdate) {
      dispatch(fetchAccountDetails(activeAccountId, true))
    } else {
      dispatch(fetchAutopayDetails(activeAccountId, ''))
    }
    setShowSetupForm(false)
    setShowEnrolledModal(false)
    dispatch(paymentSlice.actions.setShowAutoPayEditForm(false))
  }

  const paymentMethodOptions = useMemo(() => {
    if (!paymentOptions) {
      return []
    }
    const refinedPaymentMethods =
      paymentOptions?.map((method) => ({
        label: getPaymentMethodLabel(method),
        value: method.id,
      })) || []
    refinedPaymentMethods.push(ADD_NEW_CARD_OPTION)
    return refinedPaymentMethods
  }, [paymentOptions])

  const onAddNewPaymentSuccessCallBack = async (
    paymentID: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isDefault: boolean,
  ) => {
    await handleEnrollOrUpdateAutoPay(paymentID)
  }

  // Loading skeleton
  if (dstAuthConfig.isLoading) {
    return <SetupAutoPayFormSkeleton />
  }

  const renderInfo = () => {
    return (
      <div
        className={clx(classes.innerSectionItemContainer, {
          [classes.innerSectionMargin]: !isUpdate,
        })}
      >
        <div className={classes.innerSectionItem}>
          <Typography
            fontType="boldFont"
            className={classes.innerSectionItemTitle}
          >
            {autoPayData?.paymentDate?.value}
          </Typography>
          <Typography>{autoPayData?.dueDate?.value}</Typography>
        </div>
        <div className={classes.innerSectionItem}>
          <Typography
            fontType="boldFont"
            className={classes.innerSectionItemTitle}
          >
            {autoPayData?.amount?.value}
          </Typography>
          <Typography>{autoPayData?.totalBalance?.value}</Typography>
        </div>
      </div>
    )
  }

  const isCommercialCreditCard =
    paymentOptions?.find(({ id }) => id === selectedPaymentMethod?.value)
      ?.class === 'BUSINESS'

  return (
    <div className={classes.wrapper}>
      <div className={classes.sectionItem}>
        <Typography fontType="boldFont">
          {autoPayData?.selectPaymentMethod?.value}
        </Typography>
        <Dropdown
          className={classes.dropdown}
          value={selectedPaymentMethod}
          options={paymentMethodOptions}
          onChange={(value: any) => setSelectedPaymentMethod(value)}
        />
        {isCommercialCreditCard && (
          <Typography
            styleType="p4"
            className={classes.commercialCreditCardSurcharge}
          >
            <>
              <InfoIcon height={13} width={13} />
              <span className={classes.commercialCreditCardSurchargeText}>
                {autoPayData?.commercialCreditCardSurcharge?.value}
              </span>
            </>
          </Typography>
        )}
      </div>

      {selectedPaymentMethod.value === ADD_NEW_CARD_OPTION.value && (
        <div className={classes.addPaymentMethod}>
          <AddPaymentMethod
            dstConfig={dstAuthConfig.data}
            {...(isUpdate && {
              primaryBtnText: autoPayData?.saveButton?.value,
              primaryBtnSize: 'medium',
              primaryBtnVariant: 'secondary',
              primaryLoadingVariant: 'white',
            })}
            description={!isUpdate ? renderInfo() : null}
            handleCancel={() => setShowSetupForm(false)}
            successCallback={onAddNewPaymentSuccessCallBack}
          />
        </div>
      )}

      {/* Save and cancel buttons for updating auto pay */}
      {isUpdate && selectedPaymentMethod.value !== ADD_NEW_CARD_OPTION.value && (
        <div className={classes.updateActionBtnContainer}>
          <Button
            text={autoPayData?.saveButton?.value}
            buttonSize="medium"
            variant="secondary"
            loadingVariant="white"
            type="button"
            disabled={previousPaymentMethodId === selectedPaymentMethod.value}
            onClick={() => handleEnrollOrUpdateAutoPay()}
            isBusy={isEnrolling}
          />
          <Button
            text={autoPayData?.cancelButton?.value}
            className={classes.termsAndConditionsButton}
            type="button"
            variant="lite"
            onClick={() => setShowSetupForm(false)}
            disabled={isEnrolling}
          />
        </div>
      )}

      {selectedPaymentMethod.value !== ADD_NEW_CARD_OPTION.value &&
        renderInfo()}

      {/* Only show when creating an auto pay but not when updating auto pay */}
      {!isUpdate && selectedPaymentMethod.value !== ADD_NEW_CARD_OPTION.value && (
        <>
          <div>
            <Checkbox
              checked={isTermsAndConditionsChecked}
              setValue={() => {
                setIsTermsAndConditionsChecked(!isTermsAndConditionsChecked)
                return ''
              }}
              label={
                <span>
                  <Typography tagType="span">
                    {autoPayData?.termsPreText?.value}
                  </Typography>
                  <Button
                    type="button"
                    variant="lite"
                    className={classes.termsAndConditionsButton}
                    text={autoPayData?.termsAndConditionsText?.value}
                    onClick={() => setIsTermsModalOpen(true)}
                  />
                </span>
              }
              checkedIcon={<CheckboxCheck />}
              uncheckedIcon={<CheckboxUnCheck />}
              name={autoPayData?.termsAndConditionsText?.value}
            />
          </div>
          <div className={classes.actionBtnContainer}>
            <Button
              text={autoPayData?.enrollButton?.value}
              type="button"
              disabled={!isTermsAndConditionsChecked}
              onClick={() => handleEnrollOrUpdateAutoPay()}
              isBusy={isEnrolling}
            />
            <Button
              text={autoPayData?.cancelButton?.value}
              className={classes.termsAndConditionsButton}
              type="button"
              variant="lite"
              onClick={() => setShowSetupForm(false)}
              disabled={isEnrolling}
            />
          </div>
        </>
      )}

      {/* Payment terms and conditions modal */}
      <PaymentTermsAndConditions
        isOpen={isTermsModalOpen}
        handleClose={() => setIsTermsModalOpen(false)}
        title={paymentTermsAndConditionsData?.title?.value}
        description={paymentTermsAndConditionsData?.description?.value}
        downloadPDFText={paymentTermsAndConditionsData?.downloadPDFText?.value}
        downloadPDFLink={paymentTermsAndConditionsData?.downloadPDFLink?.value}
        primaryBtnText={paymentTermsAndConditionsData?.IAgreeBtnText?.value}
        primaryBtnAction={() => {
          setIsTermsAndConditionsChecked(true)
          setIsTermsModalOpen(false)
        }}
      />

      <EnrollConfirmation
        isOpen={showEnrolledModal && !isUpdate}
        handleClose={handleManageAutoPay}
      />

      <PaymentMethodUpdateConfirmation
        isOpen={Boolean(showEnrolledModal && isUpdate)}
        handleClose={handleManageAutoPay}
      />

      {hasAPIError && (
        <Typography color="primary" className={classes.error}>
          {autoPayData?.somethingWentWrong?.value}
        </Typography>
      )}
    </div>
  )
}

const SetupAutoPayFormSkeleton = () => {
  return (
    <div>
      <Skeleton width={150} height={40} />
      <Skeleton width={325} height={50} />
      <Skeleton width={100} height={25} />
      <Skeleton width={100} height={25} />
      <Skeleton width={150} height={50} />
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    width: '100%',
  },
  sectionItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  innerSectionItemContainer: {
    marginBottom: 32,
  },
  innerSectionItem: {
    marginTop: 16,
    display: 'flex',
    [breakpoints.down('xs')]: {
      marginTop: 32,
      flexDirection: 'column',
    },
  },
  innerSectionItemTitle: {
    marginRight: 32,
    minWidth: 150,
    [breakpoints.down('xs')]: {
      marginBottom: 8,
    },
  },
  dropdown: {
    width: '100%',
  },
  termsAndConditionsButton: {
    fontFamily: PP_OBJECT_SANS_MEDIUM,
    marginLeft: 4,
    fontSize: 16,
    textDecoration: 'underline',
    [breakpoints.down('xs')]: {
      fontSize: 14,
      width: 'fit-content',
      minWidth: 'fit-content',
    },
  },
  actionBtnContainer: {
    display: 'flex',
    gap: 32,
    alignItems: 'center',
    marginTop: 32,
    [breakpoints.down('xs')]: {
      flexDirection: 'column',
      gap: 16,
    },
    '& button': {
      maxWidth: 140,
      [breakpoints.down('xs')]: {
        maxWidth: 'unset',
      },
    },
  },
  updateActionBtnContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 32,
    marginTop: 16,
    '& button': {
      maxWidth: 140,
    },
  },
  error: {
    marginTop: 16,
  },
  commercialCreditCardSurcharge: {
    display: 'flex',
    alignItems: 'top',
    gap: 4,
    fontSize: 12,
    lineHeight: '14px',
  },
  commercialCreditCardSurchargeText: {
    flex: 1,
  },
  addPaymentMethod: {
    marginTop: 32,
  },
  innerSectionMargin: {
    marginTop: 32,
  },
}))
