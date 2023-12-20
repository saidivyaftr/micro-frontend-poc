import { PaymentIframeProps } from './types'
import { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import { Skeleton, Button, Typography } from '@/shared-ui/components'
import { Checkbox } from 'src/ui-kit'
import { paymentForm } from './sitecore-mock'
import { CheckboxCheck, CheckboxUnCheck } from '@/shared-ui/react-icons/index'
import { CVVLookupModal, RouterAndAccountNumberLookupModal } from './modals'

export const PaymentIframe = ({
  selectedPaymentType,
  iframeURL,
  iframeRef,
  defaultPayment,
  savePayment,
  setDefaultPayment,
  setSavePayment,
  showSavePayment = false,
}: PaymentIframeProps) => {
  const classes = useStyles()
  const [hasIframeLoaded, setHasIframeLoaded] = useState(false)
  const [showLookupModal, setShowLookupModal] = useState(false)
  if (!iframeURL) {
    return null
  }

  return (
    <div className={classes.container}>
      {/* Loading iframe Skeleton */}

      {hasIframeLoaded && selectedPaymentType === 'CARD' && (
        <div className={classes.creditCardsNote}>
          <Typography styleType="p2">
            {paymentForm?.acceptedCards?.value}
          </Typography>
          <img
            src={'/pages/images/credit-cards.png'}
            alt="Credit cards"
            className={classes.cardsImage}
          />
          <Typography styleType="p4">
            {paymentForm?.creditCardSurcharge?.value}
          </Typography>
        </div>
      )}

      {!hasIframeLoaded && (
        <div className={classes.loadingContainer}>
          <Skeleton height={40} width={'50%'} />
          <Skeleton height={100} width={'80%'} />
          <Skeleton height={40} width={'80%'} />
          <Skeleton height={40} width={'80%'} />
        </div>
      )}

      {/* Card or bank fields */}
      <iframe
        ref={iframeRef}
        id="billerUIiFrame"
        name="bank-card-iframe"
        frameBorder="0"
        scrolling="no"
        width={'100%'}
        height={420}
        src={iframeURL}
        onLoad={() => setHasIframeLoaded(true)}
      />

      {/* Where to find your CVV/CVC number button or routing and account number */}
      {hasIframeLoaded && (
        <Button
          variant="lite"
          text={
            <Typography className={classes.link}>
              {selectedPaymentType === 'CARD'
                ? paymentForm?.cvvNumberLookup?.value
                : paymentForm?.accountAndRoutingLookup?.value}
            </Typography>
          }
          type="button"
          onClick={() => setShowLookupModal(true)}
        />
      )}

      {selectedPaymentType === 'CARD' ? (
        <CVVLookupModal
          isOpen={showLookupModal}
          handleClose={() => setShowLookupModal(false)}
        />
      ) : (
        <RouterAndAccountNumberLookupModal
          isOpen={showLookupModal}
          handleClose={() => setShowLookupModal(false)}
        />
      )}

      {/* Set as default payment checkbox */}
      {hasIframeLoaded && (
        <div className={classes.checkboxContainer}>
          <Checkbox
            checked={defaultPayment}
            setValue={() => {
              setDefaultPayment(!defaultPayment)
              return ''
            }}
            label={paymentForm?.setDefaultPayment?.value}
            checkedIcon={<CheckboxCheck />}
            uncheckedIcon={<CheckboxUnCheck />}
            name={paymentForm?.setDefaultPayment?.value}
          />
          {showSavePayment && (
            <Checkbox
              checked={savePayment}
              setValue={() => {
                setSavePayment(!savePayment)
                return ''
              }}
              label={paymentForm?.savePayment?.value}
              checkedIcon={<CheckboxCheck />}
              uncheckedIcon={<CheckboxUnCheck />}
              name={paymentForm?.savePayment?.value}
            />
          )}
        </div>
      )}
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  container: {
    position: 'relative',
    paddingTop: 32,
    paddingBottom: 16,
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    position: 'absolute',
    top: 20,
    width: '100%',
  },
  link: {
    textDecoration: 'underline',
    color: 'inherit',
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  creditCardsNote: {
    marginBottom: 32,
    maxWidth: '50%',
    [breakpoints.down('xs')]: {
      maxWidth: '100%',
    },
  },
  cardsImage: {
    height: 28,
    margin: '8px 0',
    [breakpoints.down('xs')]: {
      width: '100%',
      height: 'auto',
      maxHeight: 30,
      objectFit: 'contain',
      objectPosition: 'left',
    },
  },
}))
