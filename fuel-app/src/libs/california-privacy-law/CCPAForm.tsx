import { Fragment, useState, useRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { makeStyles } from '@material-ui/core'
import {
  InjectHTML,
  Button,
  Typography,
  Modal,
  Loading,
} from '@/shared-ui/components'
import { COMPONENT_WRAPPER, SITE_INTERACTION } from 'src/constants'
import { Input } from 'src/ui-kit'
import { useCCPAFormValidator } from './useCCPAFormValidator'
import colors from '@/shared-ui/colors'
import CCPAModal from './CCPAModal'
import APIClient from 'src/api-client'
import { useDispatch, useSelector } from 'react-redux'
import { State } from 'src/redux/types'
import { ccpaSlice } from 'src/redux/slicers'
import { useAppData } from 'src/hooks'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'

export interface ICCPAForm {
  firstName: ICCPAFormField
  lastName: ICCPAFormField
  email: ICCPAFormField
  confirmEmail: ICCPAFormField
  billingAccountNumber: ICCPAFormField
  pin: ICCPAFormField
  recaptcha: ICCPAFormField
}

interface ICCPAFormField {
  value: string
  isTouched: boolean
}

const formFieldInitialState = {
  value: '',
  isTouched: false,
}

const initialFormState: ICCPAForm = {
  firstName: formFieldInitialState,
  lastName: formFieldInitialState,
  email: formFieldInitialState,
  confirmEmail: formFieldInitialState,
  billingAccountNumber: formFieldInitialState,
  pin: formFieldInitialState,
  recaptcha: formFieldInitialState,
}

const CCPAForm = () => {
  const captchaRef: any = useRef(null)
  const ccpaFormData = useAppData('ccpaForm', true)
  const {
    description,
    firstNameLabel,
    firstNamePlaceholder,
    lastNameLabel,
    lastNamePlaceholder,
    emailLabel,
    emailPlaceholder,
    confirmEmailLabel,
    confirmEmailPlaceholder,
    billingAccNumLabel,
    billingAccNumPlaceholder,
    pinNumberLabel,
    pinNumberPlaceholder,
    buttonText,
    richText,
    confirmationText,
    accountLocked,
    accountNotFound,
    ...errorCodes
  } = ccpaFormData

  const { isLoading, formErrorMessage } = useSelector(
    (state: State) => state?.ccpa,
  )
  const dispatch = useDispatch()
  const [form, setForm] = useState(initialFormState)
  const [isFormValid, errors] = useCCPAFormValidator(form, errorCodes)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const classes = useStyles()
  if (Object.keys(ccpaFormData).length === 0) {
    return null
  }

  const handleChange = (event: any) => {
    const updatedForm = { ...form }
    updatedForm[event.target.name as keyof ICCPAForm] = {
      value: event.target.value,
      isTouched: true,
    }
    setForm(updatedForm)
  }

  const handleCaptchaChange = (value: any) => {
    setForm({ ...form, recaptcha: { value, isTouched: true } })
  }

  const renderInput = (name: keyof ICCPAForm, label: any, placeholder: any) => {
    return (
      <Input
        label={label}
        name={name}
        value={form[name].value}
        fullWidth
        onChange={handleChange}
        placeholder={placeholder}
        className={classes.inputContainer}
        isError={errors?.[name]}
        helperText={errors?.[name]}
      />
    )
  }

  const handleSubmit = async () => {
    dispatch(ccpaSlice.actions.setIsLoading(true))
    dispatch(ccpaSlice.actions.setFormErrorMessage(''))
    try {
      const payload = {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        email: form.email.value,
        ban: form.billingAccountNumber.value.replace(/\D/g, ''),
        pin: btoa(form.pin.value),
        recaptcha: form.recaptcha.value,
      }
      const response = await APIClient.ccpaSignIn(payload)
      DTMClient.triggerEvent(
        {
          events: 'event14',
          eVar14: 'ccpa:check options click',
        },
        'tl_o',
        SITE_INTERACTION,
      )
      dispatch(ccpaSlice.actions.onSuccess(response.data))
      setOpenDialog(true)
    } catch (error: any) {
      DTMClient.triggerEvent({
        events: 'event88',
        eVar88: 'ccpa:invalid ban/pin',
        pageURL: window.location.href,
      })
      const errorStatus: any = error?.response?.status
      const errorMessage =
        (errorStatus === 403 ? accountLocked?.value : accountNotFound?.value) ??
        'Something went wrong. Please try again.'
      dispatch(ccpaSlice.actions.onFailure(errorMessage))
    }
    dispatch(ccpaSlice.actions.setIsLoading(false))
    captchaRef.current?.reset()
  }

  const dismissModal = () => {
    setOpenDialog(false)
  }

  return (
    <div className={classes.wrapper}>
      {showConfirmation ? (
        <Typography tagType="h3" className={classes.confirmationMsg}>
          {confirmationText?.value}
        </Typography>
      ) : (
        <Fragment>
          <InjectHTML styleType="p1" value={description?.value} />
          {renderInput(
            'firstName',
            firstNameLabel?.value,
            firstNamePlaceholder?.value,
          )}
          {renderInput(
            'lastName',
            lastNameLabel?.value,
            lastNamePlaceholder?.value,
          )}
          {renderInput('email', emailLabel?.value, emailPlaceholder?.value)}
          {renderInput(
            'confirmEmail',
            confirmEmailLabel?.value,
            confirmEmailPlaceholder?.value,
          )}
          {renderInput(
            'billingAccountNumber',
            billingAccNumLabel?.value,
            billingAccNumPlaceholder?.value,
          )}
          {renderInput(
            'pin',
            pinNumberLabel?.value,
            pinNumberPlaceholder?.value,
          )}
          {formErrorMessage && (
            <InjectHTML
              styleType="p3"
              className={classes.formError}
              value={formErrorMessage}
            />
          )}
          {process.env.GOOGLE_CAPTCHA_KEY && (
            <ReCAPTCHA
              sitekey={process.env.GOOGLE_CAPTCHA_KEY}
              onChange={handleCaptchaChange}
              className={classes.captcha}
              ref={captchaRef}
            />
          )}
          {isLoading ? (
            <Loading className={classes.loader} />
          ) : (
            <Button
              type="button"
              onClick={handleSubmit}
              className={classes.btn}
              text={buttonText?.value}
              disabled={!isFormValid}
            />
          )}
          {richText?.value && (
            <InjectHTML
              styleType="p3"
              value={richText?.value}
              addAnchorStyles
            />
          )}
          <Modal
            modalOpen={openDialog}
            setModalOpen={dismissModal}
            stopDefaultExit={true}
            modalContent={
              <CCPAModal
                setModalOpen={dismissModal}
                showConfirmation={setShowConfirmation}
              />
            }
          />
        </Fragment>
      )}
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    ...COMPONENT_WRAPPER,
    maxWidth: 630,
    padding: '2.5rem 16px',
    textAlign: 'center',
  },
  inputContainer: {
    margin: '10px 24px',
    width: `calc(100% - 48px)`,
    '& .MuiFormHelperText-root': {
      color: colors.main.primaryRed,
      marginLeft: 4,
      marginTop: 8,
    },
    [breakpoints.down('xs')]: {
      margin: '10px 0px',
      width: `100%`,
    },
  },
  btn: {
    margin: '16px auto 24px auto',
    width: 'max-content',
  },
  loader: {
    marginTop: 16,
    marginBottom: 24,
    height: 50,
  },
  captcha: {
    display: 'flex',
    justifyContent: 'center',
  },
  confirmationMsg: {
    color: '#13892E',
    fontSize: '1.4rem',
  },
  formError: {
    color: colors.main.primaryRed,
    fontSize: 12,
    margin: '16px 32px',
    '& a': {
      color: colors.main.dark,
    },
    [breakpoints.down('xs')]: {
      margin: '10px 0px',
    },
  },
}))

export default CCPAForm
