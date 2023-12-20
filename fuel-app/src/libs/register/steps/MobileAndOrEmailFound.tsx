/* eslint-disable @typescript-eslint/indent */
import ModalWrapper from '../components/ModalWrapper'
import ActionModal from '../components/ActionModal'
import { registerSlice } from 'src/redux/slicers'
import { makeStyles } from '@material-ui/core'
import { Button, InjectHTML, Typography } from '@/shared-ui/components'
import { useDispatch, useSelector } from 'react-redux'
import { formatUrl } from 'src/utils/urlHelpers'
import {
  sendPrimaryMFAByEmailAction,
  sendPrimaryMFAByPhoneAction,
} from 'src/redux/actions/register'
import { useAppData, usePageLoadEvents, useWindowDimensions } from 'src/hooks'
import { CUSTOMER, SERVICEABLE, WIFI_REGISTRATION } from 'src/constants'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { maskEmail, maskPhoneNumber } from 'src/utils/register'
import { useEffect, useState } from 'react'
import { State } from 'src/redux/types'
import {
  authorizationMethodsType,
  authorizationType,
} from 'src/constants/register'
import { addBracketAndHypen } from 'src/utils/mobile-helpers'

type objValue = {
  value: string
}

type targetItem = {
  targetItem: infoTextType
}

type infoTextType = {
  info: objValue
  info1: objValue
  canNotUseText: objValue
  nextStepText: objValue
  nextStepTextOnlyMobile?: objValue
}

const MobileAndOrEmailFound = () => {
  //Try Another Way Sitecore Data Start
  const tryAnotherWayMobile = useAppData('tryAnotherWayMobile', true) || {}
  const TRY_ANOTHER_WAY_MOBILE = {
    title: tryAnotherWayMobile?.title,
    info: tryAnotherWayMobile?.info,
    btn1: {
      text: tryAnotherWayMobile?.btn1,
    },
    btn2: {
      text: tryAnotherWayMobile?.btn2,
    },
  }
  const tryAnotherWayEmail = useAppData('tryAnotherWayEmail', true) || {}
  const TRY_ANOTHER_WAY_EMAIL = {
    title: tryAnotherWayEmail?.title,
    info: tryAnotherWayEmail?.info,
    btn1: {
      text: tryAnotherWayEmail?.btn1,
    },
  }
  const textData = useAppData('MobileEmailFoundText', true) || {}
  const useMobileNumber = () => {
    dispatch(registerSlice.actions.setStep('CONFIRM_MOBILE'))
  }
  const useDateofBirthandSSN = () => {
    dispatch(registerSlice.actions.setStep('VERIFY_WITH_SSN'))
  }

  const classes = useStyles()
  const dispatch = useDispatch()
  const { width } = useWindowDimensions()
  const isMobile = width <= 768
  const {
    title,
    confirmBtnText,
    bothOrMobile,
    onlyEmail,
  }: {
    title: objValue
    confirmBtnText: objValue
    bothOrMobile: targetItem
    onlyEmail: targetItem
  } = textData //useAppData('AddMobileNumber', true) || {}
  const [status, setStatus] = useState<string>()
  const [openDialog, setOpenDialog] = useState(false)
  const [infoTextData, setInfoTextData] = useState<infoTextType>(
    bothOrMobile?.targetItem,
  )
  const isSMS = status === authorizationType.SMS
  const isEMAIL = status === authorizationType.EMAIL
  const dismissModal = () => {
    setOpenDialog(false)
    window.location.href = formatUrl('/login')
  }
  const {
    authorizationMethods,
    phone,
    email,
    isAddressVerified,
    accountInformation,
  } = useSelector((state: State) => state.register)

  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: WIFI_REGISTRATION.EMAIL_OR_MOBILE_FOUND,
      events: 'event70, event1, event68',
      eVar22: CUSTOMER,
      eVar49: SERVICEABLE,
      eVar2: 'ftr:register via wi-fi',
    },
  })

  const isPrimaryVerificationDone = !!accountInformation
  const getDisplayEmail = () => {
    if (isAddressVerified) {
      return email
    }
    const filteredMethod = authorizationMethods?.find(
      ({ method }) => method === authorizationMethodsType.MFA_EMAIL,
    )
    if (isPrimaryVerificationDone || !filteredMethod) {
      return maskEmail(email ?? '')
    }
    return filteredMethod?.maskedDeliveryLocation
  }
  const getDisplayPhone = () => {
    if (isAddressVerified) {
      return addBracketAndHypen(`${phone ?? ''}`)
    }
    const filteredMethod = authorizationMethods?.find(
      ({ method }) => method === authorizationMethodsType.MFA_SMS,
    )
    if (isPrimaryVerificationDone || !filteredMethod) {
      return maskPhoneNumber(phone ?? '') ?? ''
    }
    return filteredMethod?.maskedDeliveryLocation
  }
  const displayEmail = getDisplayEmail()
  const displayPhone = getDisplayPhone()

  useEffect(() => {
    let hasSMS = false,
      hasEmail = false
    for (const m of authorizationMethods) {
      if (m.method === authorizationMethodsType.MFA_SMS) {
        hasSMS = true
        setStatus(authorizationType.SMS)
        setInfoTextData(bothOrMobile.targetItem)
      }
      if (m.method === authorizationMethodsType.MFA_EMAIL) {
        hasEmail = true
        setStatus(authorizationType.EMAIL)
        setInfoTextData(onlyEmail.targetItem)
      }
    }
    if (hasSMS && hasEmail) {
      setStatus(authorizationType.BOTH)
      setInfoTextData(bothOrMobile.targetItem)
    }
  }, [])

  const handleConfirm = () => {
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: 'Registration: Confirm',
      },
      'tl_o',
    )
    if (isEMAIL) {
      dispatch(sendPrimaryMFAByEmailAction())
    } else {
      dispatch(sendPrimaryMFAByPhoneAction())
    }
  }
  const handleNextStepCTA = () => {
    const buttonText =
      displayPhone && !displayEmail
        ? infoTextData['nextStepTextOnlyMobile']?.value
        : isSMS
        ? infoTextData['nextStepTextOnlyMobile']?.value
        : infoTextData['nextStepText'].value
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: `Registration: ${buttonText}`,
      },
      'tl_o',
    )

    if (status === authorizationType.EMAIL || (displayPhone && !displayEmail)) {
      setOpenDialog(true)
    } else {
      setStatus(authorizationType.EMAIL)
      setInfoTextData(onlyEmail.targetItem)
    }
  }

  const getTryAnotherWay = () => {
    return (
      <ActionModal
        data={
          displayPhone && !displayEmail
            ? TRY_ANOTHER_WAY_EMAIL
            : displayPhone
            ? TRY_ANOTHER_WAY_MOBILE
            : TRY_ANOTHER_WAY_EMAIL
        }
        btn1Handler={useDateofBirthandSSN}
        btn2Handler={useMobileNumber}
        handleClose={dismissModal}
      />
    )
  }
  return (
    <div>
      <Typography
        styleType="h4"
        tagType="h3"
        className={classes.title}
        data-tid="add-mobile-title"
      >
        {title?.value}
      </Typography>
      <div className={classes.row}>
        <label>
          <InjectHTML value={infoTextData['info'].value} />
        </label>
        <label>
          <Typography fontType="boldFont" className={classes.setMargin}>
            {isEMAIL ? displayEmail : displayPhone}
          </Typography>
        </label>
        <label>
          <InjectHTML value={infoTextData['info1'].value} />
        </label>
      </div>
      <div className={classes.row}>
        <Button
          type="button"
          variant="primary"
          hoverVariant="primary"
          text={confirmBtnText?.value}
          data-tid="add-mobile-submit-btn"
          onClick={handleConfirm}
        />
      </div>
      <div className={classes.singleRow}>
        <Typography>{infoTextData['canNotUseText'].value}</Typography>
        <Button
          type="link"
          variant="lite"
          buttonSize={isMobile ? 'small' : 'large'}
          text={
            displayPhone && !displayEmail
              ? infoTextData['nextStepTextOnlyMobile']?.value
              : isSMS
              ? infoTextData['nextStepTextOnlyMobile']?.value
              : infoTextData['nextStepText'].value
          }
          onClick={handleNextStepCTA}
          className={classes.linkBtn}
        />
      </div>
      <ModalWrapper
        isOpen={openDialog}
        handleClose={dismissModal}
        modalContent={getTryAnotherWay()}
      />
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  title: {
    textAlign: 'center',
  },
  row: {
    marginBottom: 16,
    marginTop: 32,
    textAlign: 'center',
    [breakpoints.up('lg')]: {
      width: '100%',
    },
  },
  singleRow: {
    display: 'grid',
    justifyContent: 'center',
    textAlign: 'center',
    [breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  setMargin: {
    marginBottom: 16,
    marginTop: 16,
  },
  linkBtn: {
    marginLeft: 6,
    textDecoration: 'underline',
    minWidth: 50,
    textAlign: 'center',
    marginTop: 12,
    [breakpoints.up('sm')]: {
      marginTop: 0,
    },
  },
}))

export default MobileAndOrEmailFound
