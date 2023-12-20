import { makeStyles } from '@material-ui/core'
import { Button, Typography } from '@/shared-ui/components'
import { registerSlice } from 'src/redux/slicers'
import {
  sendPrimaryMFAByEmailAction,
  sendSecondaryMFAByEmailAction,
} from 'src/redux/actions/register'
import { useDispatch, useSelector } from 'react-redux'
import { useAppData, usePageLoadEvents } from 'src/hooks'
import { CONFIRM_EMAIL, CUSTOMER, SERVICEABLE } from 'src/constants'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { State } from 'src/redux/types'

const ConfirmEmail = () => {
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: CONFIRM_EMAIL,
      eVar22: CUSTOMER,
      eVar49: SERVICEABLE,
      events: 'event68',
      eVar68: CONFIRM_EMAIL,
    },
  })

  const classes = useStyles()
  const dispatch = useDispatch()
  const {
    email = '',
    isAddressVerified,
    isBusySendingMFA,
    isEmailVerified,
  } = useSelector((state: State) => state.register)
  const { title, info, info2, confirmBtnText, updateEmailLink } = useAppData(
    'confirmEmail',
    true,
  )

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
    if (isAddressVerified) {
      dispatch(sendSecondaryMFAByEmailAction())
    } else {
      dispatch(sendPrimaryMFAByEmailAction())
    }
  }

  return (
    <div>
      <Typography
        styleType="h4"
        tagType="h1"
        className={classes.title}
        data-tid="confirm-email-title"
      >
        {title?.value}
      </Typography>
      <Typography
        styleType="p1"
        className={classes.info}
        data-tid="confirm-email-info"
      >
        {info?.value}
      </Typography>
      <Typography
        styleType="h5"
        tagType="p"
        className={classes.phoneNo}
        data-tid="confirm-email"
      >
        {email}
      </Typography>
      <Button
        type="button"
        variant="primary"
        onClick={onConfirm}
        hoverVariant="primary"
        className={classes.continueBtn}
        isBusy={isBusySendingMFA}
        data-tid="confirm-email-btn"
        text={confirmBtnText?.value}
      />
      <p className={classes.textCenter}>
        <Typography styleType="p3" tagType="span">
          {info2?.value}
        </Typography>
        <Button
          type="link"
          variant="lite"
          hoverVariant="primary"
          className={classes.updateLinkBtn}
          onClick={handleAddEmail}
          text={updateEmailLink?.value}
          data-tid="update-email-btn"
        />
      </p>
    </div>
  )
}

const useStyles = makeStyles(() => ({
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
    fontSize: 'inherit',
  },
}))

export default ConfirmEmail
