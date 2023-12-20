import { makeStyles } from '@material-ui/core'
import {
  COMPONENT_WRAPPER,
  CPNI_FORM,
  CPNI_RESIDENTIAL,
  CPNI_BUSINESS,
  CPNI_SUBMIT,
  SITE_INTERACTION,
  FORM_ERROR,
  SITE_ERROR,
} from 'src/constants'
import ReCAPTCHA from 'react-google-recaptcha'
import colors from '@/shared-ui/colors'
import { Input, Select } from 'src/ui-kit'
import { Button, InjectHTML } from '@/shared-ui/components'
import { useState } from 'react'
import { useCPNIFormValidator } from './useCPNIFormValidator'
import { cpniSlice } from 'src/redux/slicers'
import { useDispatch, useSelector } from 'react-redux'
import APIClient from 'src/api-client'
import { State } from 'src/redux/types'
import { useAppData } from 'src/hooks'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
//adding interface for the form data
export interface ICPNIForm {
  customerType: ICPNIFormField
  businessName: ICPNIFormField
  firstName: ICPNIFormField
  lastName: ICPNIFormField
  phoneNumber: ICPNIFormField
  address: ICPNIFormField
  addressContinued: ICPNIFormField
  city: ICPNIFormField
  state: ICPNIFormField
  zipCode: ICPNIFormField
  email: ICPNIFormField
  confirmEmail: ICPNIFormField
  recaptcha: ICPNIFormField
}

const formFieldInitialState = {
  value: '',
  isTouched: false,
}

const initialStateCPNI: ICPNIForm = {
  customerType: formFieldInitialState,
  businessName: formFieldInitialState,
  firstName: formFieldInitialState,
  lastName: formFieldInitialState,
  phoneNumber: formFieldInitialState,
  address: formFieldInitialState,
  addressContinued: formFieldInitialState,
  city: formFieldInitialState,
  state: formFieldInitialState,
  zipCode: formFieldInitialState,
  email: formFieldInitialState,
  confirmEmail: formFieldInitialState,
  recaptcha: formFieldInitialState,
}

interface ICPNIFormField {
  value: string
  isTouched: boolean
}

export interface SCPNIForm {
  customerType: ICPNIFormField
  city: ICPNIFormField
}

const CPNIForm = () => {
  const classes = useStyles()

  const {
    customerTypeLabel,
    customerTypeContent,
    firstNameLabel,
    firstNamePlaceholder,
    lastNameLabel,
    lastNamePlaceholder,
    businessNameLabel,
    businessNamePlaceholder,
    phoneNumberLabel,
    phoneNumberPlaceholder,
    address1Label,
    address1Placeholder,
    address2Label,
    address2Placeholder,
    cityLabel,
    cityPlaceholder,
    stateLabel,
    stateContent,
    zipcodeLabel,
    zipcodePlaceholder,
    emailLabel,
    emailPlaceholder,
    confirmEmailLabel,
    confirmEmailPlaceholder,
    submit,
    firstNameRequired,
    lastNameRequired,
    businessNameRequired,
    phoneNumberRequired,
    phoneNumberDigits,
    addressLine1Required,
    cityRequired,
    stateRequired,
    zipCodeRequired,
    zipCodeDigits,
    emailRequired,
    invalidEmail,
    emailDoesntMatch,
  } = useAppData('formCPNI', true)
  const { formErrorMessage } = useSelector((state: State) => state?.cpni)
  const [form, setForm] = useState(initialStateCPNI)
  const [isBusiness, setIsBusiness] = useState(false)
  const dispatch = useDispatch()

  const [isFormValid, errors] = useCPNIFormValidator(
    form,
    firstNameRequired,
    lastNameRequired,
    businessNameRequired,
    phoneNumberRequired,
    phoneNumberDigits,
    addressLine1Required,
    cityRequired,
    stateRequired,
    zipCodeRequired,
    zipCodeDigits,
    emailRequired,
    invalidEmail,
    emailDoesntMatch,
    isBusiness,
  )

  const handleCaptchaChange = (value: any) => {
    setForm({ ...form, recaptcha: { value, isTouched: true } })
  }

  const handleChange = (event: any) => {
    const updatedForm = { ...form }

    if (typeof event === 'string') {
      DTMClient.triggerEvent(
        {
          events: 'event14',
          eVar14: event === 'Residential' ? CPNI_RESIDENTIAL : CPNI_BUSINESS,
        },
        'tl_o',
        SITE_INTERACTION,
      )
      if (event === 'Residential') {
        setIsBusiness(false)
      } else {
        setIsBusiness(true)
      }
      updatedForm['customerType'] = {
        value: event,
        isTouched: true,
      }
    }

    if (!isBusiness) {
      updatedForm['businessName'] = {
        value: '',
        isTouched: false,
      }
    } else {
      updatedForm['firstName'] = {
        value: '',
        isTouched: false,
      }
      updatedForm['lastName'] = {
        value: '',
        isTouched: false,
      }
    }
    if (typeof event !== 'string') {
      updatedForm[event.target.name as keyof ICPNIForm] = {
        value: event.target.value,
        isTouched: true,
      }
    }
    setForm(updatedForm)
  }

  const handleStateChange = (event: any) => {
    const updatedForm = { ...form }
    if (typeof event === 'string') {
      updatedForm['state'] = {
        value: event,
        isTouched: true,
      }
    }
    setForm(updatedForm)
  }

  const renderInput = (
    name: keyof ICPNIForm,
    label: any,
    placeholder: any,
    required: boolean,
    key?: number,
  ) => {
    return (
      <Input
        label={label}
        name={name}
        value={form[name].value}
        fullWidth
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        className={classes.inputContainer}
        isError={errors?.[name]}
        helperText={errors?.[name]}
        key={key}
      />
    )
  }

  const handleSubmit = async () => {
    dispatch(cpniSlice.actions.setIsLoading(true))
    dispatch(cpniSlice.actions.setFormErrorMessage(''))
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: CPNI_SUBMIT,
      },
      'tl_o',
      SITE_INTERACTION,
    )
    try {
      const payload: any = {
        mode: form.customerType.value,
        phoneNumber: form.phoneNumber.value,
        address: [form.address.value, form?.addressContinued?.value],
        city: form.city.value,
        state: form.state.value,
        zipcode: form.zipCode.value,
        email: form.email.value,
        emailConfirm: form.confirmEmail.value,
      }

      if (!isBusiness) {
        payload['firstName'] = form.firstName.value
        payload['lastName'] = form.lastName.value
      } else {
        payload['businessName'] = form.businessName.value
      }

      const response = await APIClient.cpniPost({
        optOut: payload,
        recaptcha: form.recaptcha.value,
      })
      dispatch(cpniSlice.actions.onSuccess(response.data))
      DTMClient.triggerEvent(
        {
          events: 'event2',
          eVar2: CPNI_FORM,
        },
        'tl_o',
      )
      // what happen after submit
    } catch (error: any) {
      const errorStatus: any = error?.response?.status
      const errorMessage =
        'Something went wrong. Please try again. Error status: ' + errorStatus
      dispatch(cpniSlice.actions.onFailure(errorMessage))
      if (!!error?.response?.data?.message) {
        DTMClient.triggerEvent(
          {
            events: 'event48',
            eVar2: CPNI_FORM,
            eVar48:
              'We could not find an order or there was an error with the information you provided. Please try again.',
          },
          'tl_o',
          FORM_ERROR,
        )
      } else {
        DTMClient.triggerEvent(
          {
            events: 'event88',
            eVar2: CPNI_FORM,
            eVar88: 'Failed to fetch',
          },
          'tl_o',
          SITE_ERROR,
        )
      }
    }
    dispatch(cpniSlice.actions.setIsLoading(false))
  }

  return (
    <div className={classes.wrapper}>
      <>
        <Select
          label={customerTypeLabel?.value}
          value={form['customerType']?.value}
          name={'customerType'}
          options={customerTypeContent?.list?.map((customerType: any) => {
            return {
              label: customerType?.type?.value,
              value: customerType?.type?.value,
            }
          })}
          setValue={handleChange}
          required={false}
          isError={errors?.['customerType']}
          helperText={errors?.['customerType']}
          className={classes.inputSelect}
        />
        {isBusiness ? (
          <>
            {renderInput(
              'businessName',
              businessNameLabel?.value,
              businessNamePlaceholder?.value,
              true,
            )}
          </>
        ) : (
          <>
            {renderInput(
              'firstName',
              firstNameLabel?.value,
              firstNamePlaceholder?.value,
              true,
            )}
            {renderInput(
              'lastName',
              lastNameLabel?.value,
              lastNamePlaceholder?.value,
              true,
            )}
          </>
        )}

        {renderInput(
          'phoneNumber',
          phoneNumberLabel?.value,
          phoneNumberPlaceholder?.value,
          true,
        )}
        {renderInput(
          'address',
          address1Label?.value,
          address1Placeholder?.value,
          true,
        )}

        {renderInput(
          'addressContinued',
          address2Label?.value,
          address2Placeholder?.value,
          false,
        )}

        {renderInput('city', cityLabel?.value, cityPlaceholder?.value, true)}
        <Select
          label={stateLabel.value}
          value={form['state'].value}
          name={'state'}
          options={stateContent?.list.map((state: any) => {
            return {
              label: state.code.value,
              value: state.code.value,
            }
          })}
          setValue={handleStateChange}
          required={true}
          isError={errors?.['state']}
          helperText={errors?.['state']}
          className={classes.inputSelect}
        />
        {renderInput(
          'zipCode',
          zipcodeLabel?.value,
          zipcodePlaceholder?.value,
          true,
        )}

        {renderInput('email', emailLabel?.value, emailPlaceholder?.value, true)}

        {renderInput(
          'confirmEmail',
          confirmEmailLabel?.value,
          confirmEmailPlaceholder?.value,
          true,
        )}
        {process.env.GOOGLE_CAPTCHA_KEY && (
          <ReCAPTCHA
            sitekey={process.env.GOOGLE_CAPTCHA_KEY}
            onChange={handleCaptchaChange}
            className={classes.captcha}
          />
        )}
        {formErrorMessage && (
          <InjectHTML
            styleType="p3"
            className={classes.formError}
            value={formErrorMessage}
          />
        )}
        <div className={classes.alignCenter}>
          <Button
            type="submit"
            variant="primary"
            onClick={handleSubmit}
            className={classes.btn}
            text={submit?.value}
            disabled={!isFormValid}
          />
        </div>
      </>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    ...COMPONENT_WRAPPER,
    maxWidth: 1232,
    textAlign: 'left',
    paddingTop: 30,
  },
  inputContainer: {
    margin: '10px 0px',
    width: `calc(55% - 48px)`,
    '& .MuiFormHelperText-root': {
      color: colors.main.brightRed,
      marginLeft: 4,
      marginTop: 8,
    },
    '& div:hover': {
      borderColor: '#161617',
      outline: 'none',
    },
    '& div.Mui-focused': {
      borderColor: '#96fff5 !important',
    },
    [breakpoints.down('xs')]: {
      margin: '10px 0px',
      width: `100%`,
    },
  },
  inputSelect: {
    width: `calc(55% - 48px)`,
    '&:hover': {
      borderColor: '#161617',
      outline: 'none',
    },
    [breakpoints.down('xs')]: {
      margin: '10px 0px',
      width: `100%`,
    },
  },
  btn: {
    marginTop: 16,
    marginBottom: 24,
    width: 'max-content',
  },
  alignCenter: {
    textAlign: 'start',
  },
  loader: {
    marginTop: 16,
    marginBottom: 24,
    height: 50,
  },
  captcha: {
    display: 'flex',
    justifyContent: 'start',
  },
  formError: {
    color: colors.main.brightRed,
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

export default CPNIForm
