import { makeStyles } from '@material-ui/core'
import React, { useState, useEffect, useMemo } from 'react'
import { Button, Typography } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import ReCAPTCHA from 'react-google-recaptcha'
import { Input } from 'src/ui-kit'
import { registerSlice } from 'src/redux/slicers'
import { searchLastNameAndAddressAction } from 'src/redux/actions/register'
import { useDispatch, useSelector } from 'react-redux'
import { useAddressPredictor, useAppData, useDebounce } from '@/shared-ui/hooks'
import clx from 'classnames'
import {
  formSingleLineAddress,
  SingleLineAddress,
} from 'src/utils/addressHelpers'
import { useRouter } from 'next/router'
import { State } from 'src/redux/types'
import ActionModal from '../components/ActionModal'
import ModalWrapper from '../components/ModalWrapper'
import { usePageLoadEvents } from 'src/hooks'
import {
  REGISTER_WITH_NAME_AND_ADDRESS,
  ACCOUNT_NOTFOUND_NAME_ADDRESS,
  CUSTOMER,
  SERVICEABLE,
} from 'src/constants'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { validateCaptcha } from 'src/utils/captcha'
import { useChatState } from 'src/hooks'

const RegisterWithNameAndAddress = () => {
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: REGISTER_WITH_NAME_AND_ADDRESS,
      eVar22: CUSTOMER,
      eVar49: SERVICEABLE,
      events: 'event68',
      eVar68: REGISTER_WITH_NAME_AND_ADDRESS,
    },
  })

  const classes = useStyles()
  const {
    title,
    subTitle,
    lastNameLabel,
    serviceAddressLabel,
    submitBtnText,
    smallBusiness,
    chatWithUs,
  } = useAppData('registerWithNameAndAddress', true)
  const nameOrServiceAddressNotFound = useAppData(
    'nameOrServiceAddressNotFound',
    true,
  )
  const recaptchaRef = React.useRef<ReCAPTCHA>(null)
  const inputRef: any = React.useRef(null)
  const dispatch = useDispatch()
  const { setChatState } = useChatState()
  const [lastName, setLastName] = useState('')
  const router = useRouter()
  const skipCaptcha = useMemo(
    () => router?.query?.skipCaptcha === '1',
    [router],
  )
  const [addressInput, setAddressInput] = useState('')
  const [selectedServiceAddress, setSelectedServiceAddress] =
    useState<any>(null)
  const [showNotFoundModal, setShowNotFoundModal] = useState(false)

  const { searchLastNameAndAddress } = useSelector(
    (state: State) => state.register,
  )
  const { isBusy, failedReason } = searchLastNameAndAddress || {}

  const predictions = useAddressPredictor(useDebounce(addressInput, 300), true)
  const showPredictions =
    predictions?.length > 0 && selectedServiceAddress == null

  const registerWithEmailAndMobile = () => {
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: 'Registration: name or address not found:use email or number',
      },
      'tl_o',
    )
    setShowNotFoundModal(false)
    dispatch(registerSlice.actions.setStep('REGISTER_WITH_EMAIL_OR_MOBILE'))
  }

  const handleTryAgain = () => {
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: 'Registration: name or address not found:try again',
      },
      'tl_o',
    )
    setShowNotFoundModal(false)
  }

  const handleSubmit = async () => {
    const isValidCaptcha = await validateCaptcha(recaptchaRef, skipCaptcha)
    if (isValidCaptcha) {
      DTMClient.triggerEvent(
        {
          events: 'event14',
          eVar14: 'Registration: Submit name and address',
        },
        'tl_o',
      )
      dispatch(
        searchLastNameAndAddressAction({
          customerLastNameAddress: {
            lastName,
            environment:
              selectedServiceAddress?.samRecords?.[0]?.environment ?? '',
            controlNumber:
              parseInt(
                selectedServiceAddress?.samRecords?.[0]?.controlNumber,
              ) ?? null,
          },
        }),
      )
    }
  }

  useEffect(() => {
    if (failedReason === 'ACCOUNT_NOT_FOUND' || failedReason === 'API_ERROR') {
      setShowNotFoundModal(true)
    }
  }, [failedReason])

  const NOT_FOUND_MODAL_DATA = {
    title: nameOrServiceAddressNotFound?.title,
    info: nameOrServiceAddressNotFound?.subTitle,
    btn1: {
      text: nameOrServiceAddressNotFound?.tryAgainText,
    },
    btn2: {
      text: nameOrServiceAddressNotFound?.useEmailOrMobileText,
    },
    supportInfo: nameOrServiceAddressNotFound?.supportInfoText,
    supportLink: {
      value: nameOrServiceAddressNotFound?.contactSupportText?.value,
    },
    supportUrl: {
      value: nameOrServiceAddressNotFound?.contactSupportLink?.value,
    },
    trackingPageName: ACCOUNT_NOTFOUND_NAME_ADDRESS,
  }

  return (
    <div>
      <Typography styleType="h4" tagType="h1" className={classes.title}>
        {title?.value}
      </Typography>
      <div className={classes.chatHelpContainer}>
        <Typography>{smallBusiness?.value}</Typography>

        <Button
          type="button"
          variant="lite"
          onClick={() => {
            setChatState(true)
          }}
          hoverVariant="primary"
          buttonSize="medium"
          className={classes.chatBtn}
          text={chatWithUs?.value}
          data-tid="contact-support-link"
          triggerEvent={true}
          eventObj={{
            events: 'event14',
            eVar14: 'Registration: Chat with us',
          }}
        />
      </div>
      <Typography styleType="p1" className={classes.subTitle}>
        {subTitle?.value}
      </Typography>
      <div className={classes.row}>
        <label>
          <Typography>{lastNameLabel?.value}</Typography>
        </label>
        <Input
          name={lastNameLabel?.value}
          data-tid="last-name-input-container"
          value={lastName}
          fullWidth
          onChange={(event: any) => setLastName(event.target.value)}
          className={classes.inputContainer}
          isError={false}
          helperText={''}
        />
      </div>

      <div className={classes.row}>
        <label>
          <Typography>{serviceAddressLabel?.value}</Typography>
        </label>
        <div className={classes.inputWrapper}>
          <div className={classes.inputBoxWrapper}>
            <input
              data-tid="address-search-input"
              aria-label="address search"
              value={addressInput}
              className={clx({
                [classes.inputWithPredictions]: showPredictions,
              })}
              ref={inputRef}
              onChange={(e) => {
                setAddressInput(e.target.value)
                setSelectedServiceAddress(null)
              }}
            />
            <div
              data-tid="address-prediction-selector"
              className={clx({
                [classes.predictiveLayover]: showPredictions,
              })}
            >
              {showPredictions &&
                predictions?.map((address: any) => {
                  return (
                    <div
                      key={`address-${address?.addressKey}`}
                      className={classes.addressRecord}
                      onClick={async () => {
                        setSelectedServiceAddress(address)
                        await setAddressInput(
                          formSingleLineAddress(address?.address, true),
                        )
                        if (inputRef?.current) {
                          inputRef?.current?.focus()
                        }
                      }}
                    >
                      {formSingleLineAddress(
                        address?.address as SingleLineAddress,
                        true,
                      )}
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      </div>
      <Button
        type="button"
        variant="primary"
        data-tid="submit-btn"
        hoverVariant="primary"
        onClick={handleSubmit}
        className={classes.submitBtn}
        text={submitBtnText?.value}
        isBusy={isBusy}
        disabled={!lastName || selectedServiceAddress == null}
      />
      <ReCAPTCHA
        sitekey={process?.env?.GOOGLE_CAPTCHA_V3_PUBLIC_KEY || ''}
        size="invisible"
        ref={recaptchaRef}
      />
      <ModalWrapper
        isOpen={showNotFoundModal}
        handleClose={() => setShowNotFoundModal(false)}
        modalContent={
          <ActionModal
            data={NOT_FOUND_MODAL_DATA}
            btn1Handler={handleTryAgain}
            btn2Handler={registerWithEmailAndMobile}
            handleClose={() => setShowNotFoundModal(false)}
          />
        }
      />
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    paddingBottom: 8,
    marginBottom: 16,
    marginTop: 16,
  },
  row: {
    marginBottom: 16,
    marginTop: 32,
    [breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  subTitle: {
    margin: '16px 0px',
  },
  button: {
    maxWidth: 700,
    [breakpoints.down('sm')]: {
      marginTop: 8,
    },
  },
  inputContainer: {
    width: '50%',
    '& .MuiFormHelperText-root': {
      color: colors.main.error,
      marginLeft: 4,
      marginTop: 8,
    },
    '& .MuiFilledInput-root': {
      borderRadius: 32,
      marginTop: 8,
    },
    '& input': {
      borderRadius: 32,
      padding: '8px 16px',
      height: 40,
    },
    [breakpoints.down('xs')]: {
      margin: '10px 0px',
      width: `100%`,
    },
    fontWeight: 'bolder',
    fontFamily: 'PP Object Sans',
  },
  submitBtn: {
    margin: '32px auto',
    maxWidth: 250,
    display: 'block',
  },
  chatHelpContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 36,
    flexWrap: 'wrap',
  },
  chatBtn: {
    textDecoration: 'underline',
    cursor: 'pointer',
    minWidth: 0,
    height: 'auto',
    '&:hover': {
      color: `${colors.main.brightRed} !important`,
    },
  },
  tryAnotherWayTypography: {
    '&:hover': {
      color: `${colors.main.brightRed} !important`,
    },
  },
  inputBoxWrapper: {
    flex: 1,
    position: 'relative',
  },
  inputWrapper: {
    marginTop: 8,
    display: 'flex',
    position: 'relative',
    '& input': {
      width: '100%',
      height: 50,
      borderRadius: 32,
      padding: '0 24px',
      paddingRight: 50,
      outline: 'none',
      fontFamily: 'PP Object Sans',
      fontSize: 16,
      border: `1px solid ${colors.main.borderGrey}`,
    },
  },
  predictiveLayover: {
    position: 'absolute',
    top: 50,
    zIndex: 1,
    background: colors.main.white,
    left: 0,
    width: '100%',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    border: '1px solid',
    borderColor: colors.main.gray,
    borderTop: 'none',
  },
  inputWithPredictions: {
    borderBottomLeftRadius: '0!important',
    borderBottomRightRadius: '0!important',
  },
  addressRecord: {
    padding: '8px 16px',
    margin: '4px 8px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: colors.main.newBackgroundGray,
      fontWeight: 700,
      borderRadius: 40,
    },
  },
}))

export default RegisterWithNameAndAddress
