import { makeStyles } from '@material-ui/core'
import { Button, Typography } from '@/shared-ui/components'
import { useDispatch, useSelector } from 'react-redux'
import { registerSlice } from 'src/redux/slicers'
import { State } from 'src/redux/types'
import { AccountAddress, RegisterStep } from 'src/redux/types/registerTypes'
import { useAppData, usePageLoadEvents } from 'src/hooks'
import {
  CONFIRM_ADDRESS,
  ADDRESS_VERIFIED,
  CUSTOMER,
  SERVICEABLE,
} from 'src/constants'
import { useMemo } from 'react'
import { formSingleLineAddressForESBAddress } from 'src/utils/addressHelpers'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
//import ChatWithUsLine from '../components/./ChatWithUs'

//const ConfirmAddress = (props: any) => {
const ConfirmAddress = () => {
  const { flowType, phone, email, accountVerifiedAddress } = useSelector(
    (state: State) => state.register,
  )
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName:
        flowType === 'LAST_NAME_AND_ADDRESS'
          ? ADDRESS_VERIFIED
          : CONFIRM_ADDRESS,
      eVar22: CUSTOMER,
      eVar49: SERVICEABLE,
      events: 'event68',
      eVar68:
        flowType === 'LAST_NAME_AND_ADDRESS'
          ? ADDRESS_VERIFIED
          : CONFIRM_ADDRESS,
    },
  })

  const classes = useStyles()
  const {
    title,
    // lastNameLabel,
    addressLabel,
    verifiedTitle,
    info,
    confirmBtnText,
  } = useAppData('ConfirmAddressInfo', true)

  const dispatch = useDispatch()

  const onConfirm = async () => {
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: 'Registration: Submit Confirm address',
      },
      'tl_o',
    )
    dispatch(registerSlice.actions.setAddressVerified(true))
    dispatch(registerSlice.actions.setStep(getStepPostConfirmingAddress()))
  }

  const getStepPostConfirmingAddress = (): RegisterStep => {
    if (flowType === 'EMAIL' || flowType === 'LAST_NAME_AND_ADDRESS') {
      return phone ? 'CONFIRM_MOBILE' : 'ADD_NEW_MOBILE_NUMBER'
    }
    return email ? 'CONFIRM_EMAIL' : 'ADD_NEW_EMAIL_ADDRESS'
  }

  const serviceAddress = useMemo(
    () =>
      formSingleLineAddressForESBAddress(
        accountVerifiedAddress as AccountAddress,
      ),
    [flowType, accountVerifiedAddress],
  )

  return (
    <div>
      <Typography
        className={classes.title}
        styleType="h4"
        tagType="h3"
        data-tid="confirm-address-title"
      >
        {flowType === 'LAST_NAME_AND_ADDRESS'
          ? verifiedTitle?.value
          : title?.value}
      </Typography>
      <Typography styleType="p1" tagType="p" className={classes.info}>
        {info?.value}
      </Typography>
      <form>
        <div className={classes.containerIcon}>
          {/* <Typography styleType="p1">{lastNameLabel?.value}</Typography>
          <Typography
            styleType="p1"
            fontType="boldFont"
            className={classes.address}
            data-tid="last-name"
          >
            {lastName ?? ''}
          </Typography> */}
        </div>
        <div className={classes.containerIcon}>
          <Typography styleType="p1">{addressLabel?.value}</Typography>
          <Typography
            styleType="p1"
            fontType="boldFont"
            data-tid="service-address"
            className={classes.address}
          >
            {serviceAddress ?? ''}
          </Typography>
        </div>
        <Button
          type="button"
          variant="primary"
          onClick={onConfirm}
          hoverVariant="primary"
          data-tid="confirm-address-btn"
          className={classes.continueBtn}
          text={confirmBtnText?.value}
        />
        {/* {flowType !== 'LAST_NAME_AND_ADDRESS' && (
          <p className={classes.textCenter}>
            <ChatWithUsLine handleClose={props?.handleClose} />
          </p>
        )} */}
      </form>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  title: {
    textAlign: 'center',
  },
  info: {
    margin: '32px 0px',
  },
  icons: {
    marginRight: '16px',
  },
  containerIcon: {
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 16,
  },
  icon: {
    width: '22px',
    height: '22px',
    position: 'relative',
    top: '6px',
    margin: '12px 16px 0px 0px',
  },
  location: {
    width: '22px',
    height: '22px',
  },
  address: {
    position: 'relative',
  },
  continueBtn: {
    margin: '32px auto',
    marginBottom: 0,
    maxWidth: 246,
    display: 'block',
    fontWeight: 700,
    fontSize: '0.875rem',
  },
  textCenter: {
    textAlign: 'center',
    marginTop: 32,
  },
  textWrongNo: {
    fontWeight: 500,
  },
  updateLinkBtn: {
    marginLeft: '8px',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: 14,
  },
}))

export default ConfirmAddress
