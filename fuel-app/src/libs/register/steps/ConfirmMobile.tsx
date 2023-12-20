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
import { CONFIRM_MOBILE, CUSTOMER, SERVICEABLE } from 'src/constants'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { State } from 'src/redux/types'

const ConfirmMobile = () => {
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: CONFIRM_MOBILE,
      eVar22: CUSTOMER,
      eVar49: SERVICEABLE,
      events: 'event68',
      eVar68: CONFIRM_MOBILE,
    },
  })

  const classes = useStyles()
  const { title, info, info2, confirmBtnText, UpdateNumberLink } = useAppData(
    'ConfirmMobileNumber',
    true,
  )

  const dispatch = useDispatch()
  const {
    phone = '',
    isAddressVerified,
    isPhoneVerified,
    isBusySendingMFA,
    flowType,
    email,
  } = useSelector((state: State) => state.register)

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
    if (isAddressVerified) {
      dispatch(sendSecondaryMFAByPhoneAction())
    } else {
      dispatch(sendPrimaryMFAByPhoneAction())
    }
  }

  const phoneNumberWithDashes: string = addBracketAndHypen(`${phone}`)

  return (
    <div>
      <Typography styleType="h4" tagType="h3" data-tid="confirm-mobile-title">
        {title?.value}
      </Typography>
      <Typography styleType="p1" className={classes.info}>
        {info?.value}
      </Typography>
      <Typography
        styleType="h5"
        tagType="p"
        className={classes.phoneNo}
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
        text={confirmBtnText?.value}
        isBusy={isBusySendingMFA}
      />
      <div className={classes.textCenter}>
        <Typography styleType="p3" tagType="span">
          {info2?.value}
        </Typography>
        <Button
          type="link"
          variant="lite"
          hoverVariant="primary"
          className={classes.updateLinkBtn}
          onClick={handleAddNumber}
          data-tid="update-mobile-btn"
          text={UpdateNumberLink?.value}
        />
      </div>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  info: {
    marginTop: 32,
  },
  phoneNo: {
    margin: '16px 0px',
    fontWeight: 'bold',
  },
  continueBtn: {
    margin: '32px auto',
    maxWidth: 246,
    display: 'block',
    fontWeight: 700,
    fontSize: '0.875rem',
  },
  textCenter: {
    textAlign: 'center',
  },
  textWrongNo: {
    fontWeight: 500,
  },
  updateLinkBtn: {
    marginLeft: '8px',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: 14,
  },
}))

export default ConfirmMobile
