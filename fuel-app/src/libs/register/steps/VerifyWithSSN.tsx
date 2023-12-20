import { makeStyles } from '@material-ui/core'
import { useEffect, useMemo, useState } from 'react'
import { Button, Typography } from '@/shared-ui/components'
import { useAppData, usePageLoadEvents } from '@/shared-ui/hooks'
import colors from '@/shared-ui/colors'
import { WarningOutline } from '@/shared-ui/react-icons'
import { Input, AutoComplete } from 'src/ui-kit'
import { getDOBYears, getDOBMonths, getDOBDates } from 'src/utils/dobHelper'
import { verifySSNAndDOBAction } from 'src/redux/actions/register'
import { State } from 'src/redux/types'
import { useDispatch, useSelector } from 'react-redux'
import { validateSSNForm } from '../validators/ssnFormValidator'
import {
  VERIFY_WITH_SSN,
  REG_SECURITY_TIMEOUT,
  CUSTOMER,
  SERVICEABLE,
  REG_ACCOUNTEXISTSMODAL_LOGIN,
  REG_ACCOUNTEXISTSMODAL_FORGOTPWD,
} from 'src/constants'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import ModalWrapper from '../components/ModalWrapper'
import ActionModal from '../components/ActionModal'
import TimeoutMessage from '../components/TimeoutMessage'
import { registerSlice, initialState } from 'src/redux/slicers/register'
import { maskEmail } from 'src/utils/register'
//import ChatWithUs from '../components/ChatWithUs'

export interface SSNForm {
  ssn: FormField
  date: FormField
  month: FormField
  year: FormField
}

interface FormField {
  value: string
  isTouched: boolean
}

const formFieldInitialState = {
  value: '',
  isTouched: false,
}

const initialFormState = {
  ssn: formFieldInitialState,
  date: formFieldInitialState,
  month: formFieldInitialState,
  year: formFieldInitialState,
}

const VerifyWithSSN = () => {
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: VERIFY_WITH_SSN,
      eVar22: CUSTOMER,
      eVar49: SERVICEABLE,
      events: 'event76,event68',
      eVar76: 'Identify:Name and address',
      eVar68: VERIFY_WITH_SSN,
    },
  })

  const classes = useStyles()
  const {
    ssnInputLabel,
    submitBtnText,
    dobLabel,
    monthPlaceholder,
    dayPlaceholder,
    yearPlaceholder,
    invalidSSN,
    invalidDOB,
    registerWithSSNHeader,
    registerWithSSNSubHeader,
    ssnAndDOBNotFound,
    incorrectInfoText,
  } = useAppData('register', true)
  const { supportUrl, supportInfo, supportLink } = useAppData('OTPEmail', true)
  const securityTimeout = useAppData('securityTimeout', true)
  const nameAndAddressAccountExisting = useAppData(
    'nameAndAddressAccountExisting',
    true,
  )
  const nameOrServiceAddressNotFound = useAppData(
    'nameOrServiceAddressNotFound',
    true,
  )
  const { verifySSNAndDOB, email } = useSelector(
    (state: State) => state.register,
  )
  const {
    isBusy,
    failedReason,
    remainingAttempts,
    isAccountLocked,
    accountLockedUntil,
  } = verifySSNAndDOB || {}

  // State management
  const [form, setForm] = useState(initialFormState)
  const [openDialog, setOpenDialog] = useState(false)
  const [showAlreadyRegisteredModal, setShowAlreadyRegisteredModal] =
    useState(false)
  const [isFormComplete, errors] = validateSSNForm(form, {
    invalidSSN,
    invalidDOB,
  })

  const dispatch = useDispatch()

  const yearOptions = getDOBYears()
  const monthsOptions = getDOBMonths()
  const datesOptions = getDOBDates(form.month.value, form.year.value)

  useEffect(() => {
    if (isAccountLocked) {
      setOpenDialog(true)
      return
    }
    if (failedReason === 'ACCOUNT_REGISTERED') {
      setShowAlreadyRegisteredModal(true)
    }
    resetFields()
  }, [isAccountLocked, failedReason])

  // const showContactUs = useMemo(() => {
  //   return isAccountLocked || (remainingAttempts && remainingAttempts <= 2)
  // }, [remainingAttempts, isAccountLocked])

  const resetFields = () => {
    setForm(initialFormState)
  }

  // Handlers
  const handleChange = (event: any, name?: string) => {
    const updatedForm = { ...form }
    const value =
      event?.label && event?.value ? event?.value : event?.target?.value
    updatedForm[(name ?? event.target.name) as keyof SSNForm] = {
      value,
      isTouched: true,
    }
    setForm(updatedForm)
  }

  const dismissModal = () => {
    setOpenDialog(false)
    dispatch(registerSlice.actions.resetRegistrationFlow())
  }

  const handleSignIn = () => {
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: REG_ACCOUNTEXISTSMODAL_LOGIN,
      },
      'tl_o',
    )
    window.location.href = '/login'
  }

  const handleSubmit = async () => {
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: 'Registration: Submit SSN',
      },
      'tl_o',
    )
    const body = {
      last4Ssn: form.ssn.value,
      dateOfBirth: `${form.month.value}-${form.date.value}-${form.year.value}`,
    }
    dispatch(verifySSNAndDOBAction(body))
  }

  const securityTimeoutModalData = {
    title: securityTimeout?.title,
    info: securityTimeout?.info,
    info1: { value: <TimeoutMessage timeout={accountLockedUntil ?? ''} /> },
    supportInfo,
    supportLink,
    supportUrl,
    btn1: {
      text: securityTimeout?.btn1,
    },
    trackingPageName: REG_SECURITY_TIMEOUT,
  }

  const emailInfo = useMemo(() => {
    const info2Text = nameAndAddressAccountExisting?.info2?.value?.replace(
      '{{emailAddress}}',
      maskEmail(email ?? ''),
    )
    return (
      <div>
        <Typography fontType="boldFont">{info2Text}</Typography>
      </div>
    )
  }, [email])

  const ALREADY_REGISTERED_MODAL_DATA = {
    title: nameAndAddressAccountExisting?.title,
    info: nameAndAddressAccountExisting?.info1,
    info1: { value: emailInfo },
    btn1: {
      text: nameAndAddressAccountExisting?.signInBtnText,
    },
    btn2: {
      text: nameAndAddressAccountExisting?.resetPasswordText,
    },
    supportInfo: nameAndAddressAccountExisting?.supportInfoText,
    supportLink: {
      value: nameOrServiceAddressNotFound?.contactSupportText?.value,
    },
    supportUrl: {
      value: nameOrServiceAddressNotFound?.contactSupportLink?.value,
    },
  }

  const resetPasswordHandler = () => {
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: REG_ACCOUNTEXISTSMODAL_FORGOTPWD,
      },
      'tl_o',
    )
    window.location.href =
      nameAndAddressAccountExisting?.resetPasswordLink?.value
  }

  const dismissAlreadyRegisteredModal = () => {
    setShowAlreadyRegisteredModal(false)
    dispatch(
      registerSlice.actions.resetRegistrationFlow({
        ...initialState,
        step: 'REGISTER_WITH_NAME_AND_ADDRESS',
      }),
    )
  }

  const isSSNAndDOBNotFound =
    failedReason === 'ACCOUNT_NOT_FOUND' || failedReason === 'API_ERROR'

  return (
    <>
      <Typography styleType="h4" tagType="h3" className={classes.title}>
        {registerWithSSNHeader?.value}
      </Typography>
      {remainingAttempts != null && (
        <Typography
          styleType="p1"
          tagType="p"
          fontType="boldFont"
          className={classes.info}
        >
          {incorrectInfoText?.value.replace(
            '{{count}}',
            remainingAttempts.toString(),
          )}
        </Typography>
      )}
      <Typography styleType="p1" className={classes.subTitle}>
        {registerWithSSNSubHeader?.value}
      </Typography>
      <div>
        <label>
          <Typography>{ssnInputLabel?.value}</Typography>
        </label>
        <Input
          value={form.ssn.value}
          name="ssn"
          fullWidth
          type="password"
          onChange={handleChange}
          className={classes.inputContainer}
          isError={errors['ssn'] || isSSNAndDOBNotFound}
          helperText={errors['ssn']}
          hiddenLabel
          data-tid="ssn-input-container"
        />
      </div>
      <div className={classes.dobContainer}>
        <label className={classes.dobLabel}>
          <Typography>{dobLabel?.value}</Typography>
        </label>
        <div className={classes.row}>
          <AutoComplete
            placeholder={monthPlaceholder?.value}
            className={classes.autoComplete}
            isSearchable
            onChange={(e) => handleChange(e, 'month')}
            options={monthsOptions}
            isError={errors['dob'] || isSSNAndDOBNotFound}
            data-tid="month-input-container"
            value={{
              label:
                monthsOptions[parseInt(form.month.value) - 1]?.label ??
                monthPlaceholder?.value,
              value: form.month.value,
            }}
          />
          <AutoComplete
            placeholder={dayPlaceholder?.value}
            className={classes.autoComplete}
            isSearchable
            onChange={(e) => handleChange(e, 'date')}
            isError={errors['dob'] || isSSNAndDOBNotFound}
            options={datesOptions}
            data-tid="date-input-container"
            value={{
              label:
                form.date.value === ''
                  ? dayPlaceholder?.value
                  : form.date.value,
              value: form.date.value,
            }}
          />
          <AutoComplete
            placeholder={yearPlaceholder?.value}
            className={classes.autoComplete}
            isSearchable
            onChange={(e: any) => handleChange(e, 'year')}
            isError={errors['dob'] || isSSNAndDOBNotFound}
            options={yearOptions}
            data-tid="year-input-container"
            value={{
              label:
                form.year.value === ''
                  ? yearPlaceholder?.value
                  : form.year.value,
              value: form.year.value,
            }}
          />
        </div>
        <Typography className={classes.dobError}>{errors['dob']}</Typography>
      </div>
      {isSSNAndDOBNotFound && (
        <div className={classes.submissionError}>
          <WarningOutline />
          <Typography
            className={classes.submissionErrorText}
            fontType="boldFont"
            data-tid="not-found-error-message"
          >
            {ssnAndDOBNotFound?.value}
          </Typography>
        </div>
      )}
      <div className={classes.formSubmitContainer}>
        <Button
          type="button"
          variant="primary"
          hoverVariant="primary"
          onClick={handleSubmit}
          disabled={!isFormComplete}
          isBusy={isBusy}
          text={submitBtnText?.value}
          className={classes.submitBtn}
          data-tid="submit-btn"
        />
      </div>
      {/* {!!showContactUs && <ChatWithUs />} */}
      <ModalWrapper
        isOpen={openDialog}
        handleClose={dismissModal}
        modalContent={
          <ActionModal
            data={securityTimeoutModalData}
            btn1Handler={dismissModal}
            handleClose={dismissModal}
          />
        }
      />
      <ModalWrapper
        isOpen={showAlreadyRegisteredModal}
        handleClose={dismissAlreadyRegisteredModal}
        modalContent={
          <ActionModal
            data={ALREADY_REGISTERED_MODAL_DATA}
            btn1Handler={handleSignIn}
            btn2Handler={resetPasswordHandler}
            handleClose={dismissAlreadyRegisteredModal}
          />
        }
      />
    </>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    paddingBottom: 8,
    marginBottom: 16,
    marginTop: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 32,
  },
  info: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 16,
  },
  subTitle: {
    margin: '16px 0px',
    marginBottom: 32,
  },
  button: {
    maxWidth: 700,
    [breakpoints.down('sm')]: {
      marginTop: 8,
    },
  },
  submitBtn: {
    margin: '32px 0',
    maxWidth: 250,
    display: 'block',
  },
  row: {
    display: 'flex',
    gap: 12,
    [breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  inputContainer: {
    width: '100%',
    maxWidth: 250,
    display: 'block',
    paddingTop: 8,
    '& .MuiFormHelperText-root': {
      color: colors.main.error,
      marginLeft: 4,
      marginTop: 8,
    },
    '& input': {
      borderRadius: 32,
      height: '100%',
      fontSize: 26,
      fontFamily: 'PP Object Sans Bold',
      letterSpacing: 2,
    },
    '& .MuiFilledInput-root': {
      borderRadius: 32,
      marginTop: 8,
    },
    [breakpoints.down('xs')]: {
      margin: '10px 0px',
      width: `100%`,
      maxWidth: 'unset',
    },
    fontWeight: 'bolder',
    fontFamily: 'PP Object Sans',
  },
  dobContainer: {
    marginTop: 32,
  },
  dobLabel: {
    marginBottom: 16,
    display: 'block',
  },
  autoComplete: {
    minWidth: 150,
    '& .select__control': {
      paddingLeft: 4,
      borderRadius: 32,
    },
  },
  dobError: {
    marginTop: 8,
    color: colors.main.error,
    fontSize: 12,
  },
  formSubmitContainer: {
    display: 'flex',
    alignItem: 'center',
    gap: 24,
    justifyContent: 'center',
  },
  submissionError: {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  submissionErrorText: {
    color: colors.main.error,
    fontSize: 12,
  },
  textCenter: {
    display: 'flex',
    gap: 8,
    justifyContent: 'center',
  },
  updateLinkBtn: {
    minWidth: 0,
    height: 'auto',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
}))

export default VerifyWithSSN
