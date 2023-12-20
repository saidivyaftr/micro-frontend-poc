import { makeStyles } from '@material-ui/core'
import { Button, Typography } from '@/shared-ui/components'
import { registerSlice } from 'src/redux/slicers'
import {
  sendPrimaryMFAByPhoneAction,
  sendSecondaryMFAByPhoneAction,
} from 'src/redux/actions/register'
import { useDispatch, useSelector } from 'react-redux'
import { addBracketAndHypen } from 'src/utils/mobile-helpers'
import { useAppData, usePageLoadEvents } from 'src/hooks'
import {
  CONFIRM_MOBILE,
  CUSTOMER,
  SERVICEABLE,
  WIFI,
  WIFI_REGISTRATION,
} from 'src/constants'
import { authorizationMethodsType } from 'src/constants/register'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { State } from 'src/redux/types'

const ConfirmMobile = () => {
  const classes = useStyles()
  const ConfirmMobileNumber = useAppData('ConfirmMobileNumber', true) || {}
  const dispatch = useDispatch()
  const {
    authorizationMethods,
    phone = '',
    isAddressVerified,
    isIPAddressVerified,
    isPhoneVerified,
    isEmailVerified,
    isBusySendingMFA,
    flowType,
    email,
  } = useSelector((state: State) => state.register)

  const isWIFI = flowType === WIFI
  const pageStr = isWIFI ? WIFI_REGISTRATION.CONFIRM_MOBILE : CONFIRM_MOBILE
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
  const handleAddNumber = () => {
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: 'Registration: Add/Update Mobile Number',
      },
      'tl_o',
    )
    dispatch(registerSlice.actions.setStep('UPDATE_MOBILE_NUMBER'))
  }

  const onConfirm = async () => {
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: 'Registration: Confirm Mobile Number',
      },
      'tl_o',
    )
    if (isPhoneVerified) {
      dispatch(
        registerSlice.actions.setStep(
          flowType === 'LAST_NAME_AND_ADDRESS'
            ? email
              ? 'CONFIRM_EMAIL'
              : 'ADD_NEW_EMAIL_ADDRESS'
            : 'CREATE_PASSWORD',
        ),
      )
      return
    }
    if (isAddressVerified || (isIPAddressVerified && isEmailVerified)) {
      dispatch(sendSecondaryMFAByPhoneAction())
    } else {
      dispatch(sendPrimaryMFAByPhoneAction())
    }
  }

  const getDisplayPhone = () => {
    if (isAddressVerified) {
      return addBracketAndHypen(`${phone ?? ''}`)
    }
    const filteredMethod = authorizationMethods?.find(
      ({ method }) => method === authorizationMethodsType.MFA_SMS,
    )
    // if (isPrimaryVerificationDone || !filteredMethod) {
    //   return maskPhoneNumber(phone ?? '') ?? ''
    // }
    return filteredMethod?.maskedDeliveryLocation || ''
  }

  const phoneNumberWithDashes: string = getDisplayPhone()
  return (
    <div className={classes.textCenter}>
      <Typography styleType="h4" tagType="h3" data-tid="confirm-mobile-title">
        {ConfirmMobileNumber.title?.value}
      </Typography>
      {flowType === WIFI ? (
        <>
          <Typography styleType="p1" className={classes.info}>
            {ConfirmMobileNumber.description?.value}
          </Typography>
          <Typography styleType="p1" className={classes.info}>
            {ConfirmMobileNumber.subDescription?.value}
          </Typography>
        </>
      ) : (
        <>
          <Typography styleType="p1" className={classes.info}>
            {ConfirmMobileNumber.info?.value}
          </Typography>
        </>
      )}

      <Typography
        fontType="boldFont"
        styleType="p1"
        tagType="p"
        data-tid="confirm-mobile-number"
      >
        {phoneNumberWithDashes}
      </Typography>
      <Button
        type="button"
        variant="primary"
        onClick={onConfirm}
        hoverVariant="primary"
        data-tid="confirm-mobile-btn"
        className={classes.continueBtn}
        text={ConfirmMobileNumber.confirmBtnText?.value}
        isBusy={isBusySendingMFA}
      />
      <div>
        <Typography fontType="mediumFont" styleType="p3" tagType="span">
          {ConfirmMobileNumber.info2?.value}
        </Typography>
        <Button
          type="link"
          variant="lite"
          hoverVariant="primary"
          className={classes.updateLinkBtn}
          onClick={handleAddNumber}
          data-tid="update-mobile-btn"
          buttonSize="small"
          text={ConfirmMobileNumber.UpdateNumberLink?.value}
        />
      </div>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  info: {
    marginTop: 32,
  },
  continueBtn: {
    margin: '32px auto',
  },
  textCenter: {
    textAlign: 'center',
  },
  updateLinkBtn: {
    marginLeft: 8,
    textDecoration: 'underline',
    cursor: 'pointer',
  },
}))

export default ConfirmMobile
