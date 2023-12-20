import { makeStyles } from '@material-ui/core'
import { Button, Typography } from '@/shared-ui/components'
import { registerSlice } from 'src/redux/slicers'
import {
  sendPrimaryMFAByEmailAction,
  sendSecondaryMFAByEmailAction,
} from 'src/redux/actions/register'
import { useDispatch, useSelector } from 'react-redux'
import { useAppData, usePageLoadEvents } from 'src/hooks'
import {
  CONFIRM_EMAIL,
  CUSTOMER,
  SERVICEABLE,
  WIFI,
  WIFI_REGISTRATION,
} from 'src/constants'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { State } from 'src/redux/types'
import { authorizationMethodsType } from 'src/constants/register'
import { maskEmail } from 'src/utils/register'

const ConfirmEmail = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const {
    email = '',
    isAddressVerified,
    isIPAddressVerified,
    isBusySendingMFA,
    isPhoneVerified,
    isEmailVerified,
    flowType,
    accountInformation,
    authorizationMethods,
  } = useSelector((state: State) => state.register)

  const isWIFI = flowType === WIFI
  const pageStr = isWIFI ? WIFI_REGISTRATION.CONFIRM_EMAIL : CONFIRM_EMAIL
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: pageStr,
      eVar22: CUSTOMER,
      eVar49: SERVICEABLE,
      events: 'event68',
      eVar68: pageStr,
    },
  })

  const confirmEmail = useAppData('confirmEmail', true) || {}
  const handleAddEmail = () => {
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: 'Registration: Add/Update Email',
      },
      'tl_o',
    )
    dispatch(registerSlice.actions.setStep('UPDATE_EMAIL_ADDRESS'))
  }

  const isPrimaryVerificationDone = !!accountInformation
  const getDisplayEmail = () => {
    if (isAddressVerified) {
      return email
    }
    const filteredMethod = authorizationMethods?.find(
      ({ method }) => method === authorizationMethodsType.MFA_EMAIL,
    )
    const maskedDeliveryLocation = filteredMethod?.maskedDeliveryLocation
    if (!email && maskedDeliveryLocation) {
      return maskedDeliveryLocation
    }
    if (isPrimaryVerificationDone || !filteredMethod) {
      return maskEmail(email ?? '')
    }
    return maskedDeliveryLocation
  }

  const onConfirm = async () => {
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: 'Registration: Confirm Email',
      },
      'tl_o',
    )
    if (isEmailVerified) {
      dispatch(registerSlice.actions.setStep('CREATE_PASSWORD'))
      return
    }
    if (isAddressVerified || (isIPAddressVerified && isPhoneVerified)) {
      dispatch(sendSecondaryMFAByEmailAction())
    } else {
      dispatch(sendPrimaryMFAByEmailAction())
    }
  }

  return (
    <div className={classes.confirmEmailWrapper}>
      <Typography
        styleType="h3"
        tagType="h1"
        className={classes.title}
        data-tid="confirm-email-title"
      >
        {confirmEmail.title?.value}
      </Typography>
      {flowType === WIFI && (
        <>
          <Typography
            styleType="p1"
            className={classes.info}
            data-tid="confirm-email-info"
          >
            {confirmEmail.description?.value}
          </Typography>

          <Typography
            styleType="p1"
            className={classes.info}
            data-tid="confirm-email-info"
          >
            {confirmEmail.subDescription?.value}
          </Typography>
        </>
      )}
      <Typography
        styleType="h6"
        tagType="p"
        className={classes.phoneNo}
        data-tid="confirm-email"
      >
        {getDisplayEmail()}
      </Typography>
      <Typography
        styleType="p1"
        className={classes.info}
        data-tid="confirm-email-info"
      >
        {confirmEmail.info?.value}
      </Typography>
      <Button
        type="button"
        variant="primary"
        onClick={onConfirm}
        hoverVariant="primary"
        className={classes.continueBtn}
        isBusy={isBusySendingMFA}
        data-tid="confirm-email-btn"
        text={confirmEmail.confirmBtnText?.value}
      />
      <p className={classes.textCenter}>
        <Typography styleType="p3" tagType="span" fontType="mediumFont">
          {confirmEmail.info2?.value}
        </Typography>
        <Button
          type="link"
          variant="lite"
          hoverVariant="primary"
          className={classes.updateLinkBtn}
          onClick={handleAddEmail}
          text={confirmEmail.updateEmailLink?.value}
          buttonSize="small"
          data-tid="update-email-btn"
        />
      </p>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  confirmEmailWrapper: { textAlign: 'center' },
  title: {
    textAlign: 'center',
    marginBottom: 32,
  },
  info: {
    marginBottom: 16,
  },
  phoneNo: {
    margin: '16px 0px',
    fontWeight: 'bold',
  },
  continueBtn: {
    margin: '32px auto',
    maxWidth: 246,
    display: 'block',
    fontSize: '0.875rem',
  },
  textCenter: {
    textAlign: 'center',
  },
  updateLinkBtn: {
    marginLeft: '8px',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
}))

export default ConfirmEmail
