import { Button, Typography } from '@/shared-ui/components'
import { paymentForm } from './sitecore-mock'
import { makeStyles } from '@material-ui/core'
import colors from '@/shared-ui/colors'
import { PaymentIframe } from './PaymentIframe'
import { AddPaymentMethodProps } from './types'
import { useAddNewPayment } from './useAddNewPayment'
import { PaymentError } from './PaymentError'
import { PaymentTermsAndConditions } from './PaymentTermsAndConditions'
import { useEffect } from 'react'

export const AddPaymentMethodContainer = ({
  dstConfig,
  isBusy,
  successCallback,
  handleCancel,
  primaryBtnText,
  primaryBtnVariant,
  primaryBtnSize,
  primaryLoadingVariant,
  description = null,
  hideCancelBtn = false,
  primaryBtnDisabled = false,
  paymentFormData,
  showTitle = false,
}: AddPaymentMethodProps) => {
  const classes = useStyle()

  const paymentSuccessCallback = async (
    paymentID: string,
    isDefault: boolean,
    cardType: string,
    methodName?: string,
    addedNewPaymentMethod?: boolean,
  ) => {
    if (successCallback) {
      if (paymentFormData) {
        const paymentType = selectedPaymentType === 'BANK' ? 'Checking' : 'Card'
        await successCallback(
          paymentID,
          isDefault,
          paymentType,
          cardType,
          paymentFormData,
          methodName,
          !!addedNewPaymentMethod,
        )
      } else {
        await successCallback(paymentID, isDefault)
      }
    }
  }

  const {
    iframeURL,
    iframeRef,
    selectedPaymentType,
    updateSelectedPaymentType,
    defaultPayment,
    handleDefaultPayment,
    termsAccepted,
    setTermsAccepted,
    isBusyAddingMethod,
    apiError,
    handleSave,
    savePayment,
    setSavePayment,
    setShowSavePayment,
  } = useAddNewPayment(dstConfig, paymentSuccessCallback)

  useEffect(() => {
    setShowSavePayment(hideCancelBtn)
  }, [hideCancelBtn])

  if (Object.keys(dstConfig || {}).length === 0) {
    return null
  }

  const renderRadio = (checked: boolean) => {
    return checked ? (
      <div className={classes.radioButton}>
        <div className={classes.selectedItem} />
      </div>
    ) : (
      <div className={classes.radioButton} />
    )
  }

  return (
    <>
      {showTitle && (
        <Typography
          tagType="h5"
          styleType="h6"
          className={classes.addNewPaymentTitle}
        >
          {paymentForm?.addNewPaymentTitle.value}
        </Typography>
      )}
      <Typography fontType="boldFont">
        {paymentForm?.selectPaymentTitle?.value}
      </Typography>

      <div className={classes.methodsContainer}>
        {/* Credit or debit */}
        <div className={classes.method}>
          <div
            className={classes.methodTitle}
            onClick={() => updateSelectedPaymentType('CARD')}
          >
            {renderRadio(selectedPaymentType === 'CARD')}
            <Typography>{paymentForm?.creditCardTitle?.value}</Typography>
          </div>
          {selectedPaymentType === 'CARD' && (
            <PaymentIframe
              selectedPaymentType={selectedPaymentType}
              iframeURL={iframeURL}
              iframeRef={iframeRef}
              defaultPayment={defaultPayment}
              setDefaultPayment={handleDefaultPayment}
              showSavePayment={hideCancelBtn}
              savePayment={savePayment}
              setSavePayment={setSavePayment}
            />
          )}
        </div>

        {/* Bank account */}
        <div className={classes.method}>
          <div
            className={classes.methodTitle}
            onClick={() => updateSelectedPaymentType('BANK')}
          >
            {renderRadio(selectedPaymentType === 'BANK')}
            <Typography>{paymentForm?.bankAccountTitle?.value}</Typography>
          </div>
          {selectedPaymentType === 'BANK' && (
            <PaymentIframe
              selectedPaymentType={selectedPaymentType}
              iframeURL={iframeURL}
              iframeRef={iframeRef}
              defaultPayment={defaultPayment}
              setDefaultPayment={handleDefaultPayment}
              showSavePayment={hideCancelBtn}
              savePayment={savePayment}
              setSavePayment={setSavePayment}
            />
          )}
        </div>
      </div>

      <PaymentTermsAndConditions
        isChecked={termsAccepted}
        setIsChecked={setTermsAccepted}
      />

      <PaymentError error={apiError} />

      <div className={hideCancelBtn ? classes.description : ''}>
        {description}
      </div>

      {/* Submit & Cancel button for payment form */}
      <div className={classes.actionBtnContainer}>
        <Button
          type="button"
          text={primaryBtnText ?? paymentForm?.enroll?.value}
          variant={primaryBtnVariant}
          buttonSize={primaryBtnSize}
          onClick={() => {
            setShowSavePayment(hideCancelBtn)
            handleSave()
          }}
          disabled={
            !termsAccepted || !selectedPaymentType || primaryBtnDisabled
          }
          isBusy={isBusyAddingMethod || isBusy}
          className={classes.positiveActionBtn}
          loadingVariant={primaryLoadingVariant}
        />
        {!hideCancelBtn && (
          <Button
            variant="lite"
            hoverVariant="primary"
            type="button"
            disabled={isBusyAddingMethod || isBusy}
            className={classes.cancelBtn}
            onClick={handleCancel}
            text={
              <Typography
                className={classes.cancelBtnText}
                fontType="mediumFont"
              >
                {paymentForm?.cancel?.value}
              </Typography>
            }
          />
        )}
      </div>
    </>
  )
}

const useStyle = makeStyles(({ breakpoints }) => ({
  methodsContainer: {
    margin: '16px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  method: {
    backgroundColor: colors.main.newBackgroundGray,
    padding: '16px 32px',
    borderRadius: 16,
    [breakpoints.down('xs')]: {
      padding: 16,
    },
  },
  radioButton: {
    height: 24,
    width: 24,
    border: `1px solid ${colors.main.dark}`,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedItem: {
    width: 12,
    height: 12,
    backgroundColor: colors.main.dark,
    borderRadius: '50%',
  },
  methodTitle: {
    display: 'flex',
    gap: 16,
    cursor: 'pointer',
    alignItems: 'center',
  },
  actionBtnContainer: {
    display: 'flex',
    gap: 32,
    alignItems: 'center',
    [breakpoints.down('xs')]: {
      gap: 16,
      flexDirection: 'column',
    },
  },
  positiveActionBtn: {
    maxWidth: 'fit-content',
    [breakpoints.down('xs')]: {
      maxWidth: '100%',
    },
  },
  cancelBtn: {
    [breakpoints.down('xs')]: {
      width: '100%',
      textAlign: 'center',
    },
  },
  cancelBtnText: {
    textDecoration: 'underline',
    color: 'inherit',
    fontSize: 16,
  },
  description: {
    paddingTop: '1rem',
  },
  addNewPaymentTitle: {
    margin: '2rem 0',
  },
}))
