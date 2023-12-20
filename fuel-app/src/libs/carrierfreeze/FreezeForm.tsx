import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  CARRIER_FREEZE,
  CARRIER_FREEZE_ADDITIONAL,
  CARRIER_FREEZE_BUSINESS,
  COMPONENT_WRAPPER,
  FORM_ERROR,
  SITE_ERROR,
  SITE_INTERACTION,
} from 'src/constants'
import { Input, Select } from 'src/ui-kit'
import APIClient from 'src/api-client'
import { Add } from '@/shared-ui/react-icons'
import colors from '@/shared-ui/colors'
import { makeStyles } from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox'
import { FormControlLabel } from '@material-ui/core'
import { Button, InjectHTML, Loading } from '@/shared-ui/components'
import { useFreezeFormValidator } from './useFreezeFormValidator'
import { freezeSlice } from 'src/redux/slicers'
import { useAppData } from 'src/hooks'
import { State } from 'src/redux/types'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'

interface FreezeFormField {
  value: string
  isTouched: boolean
}

interface PhoneProps {
  name: keyof FreezeForm
  label: string
  placeholder: string
  required: boolean
}

export interface FreezeForm {
  firstName: FreezeFormField
  lastName: FreezeFormField
  businessName: FreezeFormField
  phoneNumber: FreezeFormField
  phoneNumber2: FreezeFormField
  phoneNumber3: FreezeFormField
  phoneNumber4: FreezeFormField
  phoneNumber5: FreezeFormField
  addressLine1: FreezeFormField
  addressLine2: FreezeFormField
  city: FreezeFormField
  state: FreezeFormField
  zipcode: FreezeFormField
  email: FreezeFormField
  confirmEmail: FreezeFormField
}

const formFieldInitialState = {
  value: '',
  isTouched: false,
}

const initialFormState: FreezeForm = {
  firstName: formFieldInitialState,
  lastName: formFieldInitialState,
  businessName: formFieldInitialState,
  phoneNumber: formFieldInitialState,
  phoneNumber2: formFieldInitialState,
  phoneNumber3: formFieldInitialState,
  phoneNumber4: formFieldInitialState,
  phoneNumber5: formFieldInitialState,
  addressLine1: formFieldInitialState,
  addressLine2: formFieldInitialState,
  city: formFieldInitialState,
  state: formFieldInitialState,
  zipcode: formFieldInitialState,
  email: formFieldInitialState,
  confirmEmail: formFieldInitialState,
}

const FreezeForm = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { isLoading, formErrorMessage } = useSelector(
    (state: State) => state?.freeze,
  )
  const heroCarrierFreezeData = useAppData('formCarrierFreeze', true)
  const {
    businessCustomerCheckLabel,
    firstNameLabel,
    firstNamePlaceholder,
    lastNameLabel,
    lastNamePlaceholder,
    businessNameLabel,
    businessNamePlaceholder,
    phoneNumberLabel,
    phoneNumberPlaceholder,
    phoneNumberInsertButton,
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
    iAgree,
    submit,
    cancel,
    cancelUrl,
    ...errorCodes
  } = heroCarrierFreezeData
  const [additionalPhone, setAdditionalPhone] = useState<PhoneProps[]>([])
  const [form, setForm] = useState(initialFormState)
  const [isAgree, setIsAgree] = useState(false)
  const [isBusiness, setIsBusiness] = useState(false)
  const [isFormValid, errors] = useFreezeFormValidator(
    form,
    errorCodes,
    isAgree,
    isBusiness,
    additionalPhone.length,
  )

  const handleIsTouched = (name: string) => {
    const updatedForm = { ...form }
    updatedForm[name as keyof FreezeForm] = {
      value: updatedForm[name as keyof FreezeForm].value,
      isTouched: true,
    }
    setForm(updatedForm)
  }

  const handleChange = (event: any) => {
    const updatedForm = { ...form }
    if (isBusiness) {
      updatedForm['firstName'] = {
        value: '',
        isTouched: false,
      }
      updatedForm['lastName'] = {
        value: '',
        isTouched: false,
      }
    } else {
      updatedForm['businessName'] = {
        value: '',
        isTouched: false,
      }
    }
    if (typeof event === 'string') {
      updatedForm['state'] = {
        value: event,
        isTouched: true,
      }
    } else {
      updatedForm[event.target.name as keyof FreezeForm] = {
        value: event.target.value,
        isTouched: true,
      }
    }
    setForm(updatedForm)
  }

  const renderInput = (
    name: keyof FreezeForm,
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
        onBlur={() => {
          handleIsTouched(name)
        }}
        placeholder={placeholder}
        required={required}
        className={classes.inputContainer}
        isError={errors?.[name]}
        helperText={errors?.[name]}
        key={key}
      />
    )
  }

  const renderAdditionalPhoneNumberInput = () => {
    if (additionalPhone.length < 4) {
      const updatedInput = [...additionalPhone]
      const data = {
        name: ('phoneNumber' +
          (additionalPhone.length + 2).toFixed(0)) as keyof FreezeForm,
        label: 'Phone Number ' + (additionalPhone.length + 2).toFixed(0),
        placeholder: phoneNumberPlaceholder?.value,
        required: false,
      }
      updatedInput.push(data)
      setAdditionalPhone(updatedInput)
    }
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: CARRIER_FREEZE_ADDITIONAL,
      },
      'tl_o',
      SITE_INTERACTION,
    )
  }

  const handleSubmit = async () => {
    if (!isAgree) {
      return
    }
    dispatch(freezeSlice.actions.setIsLoading(true))
    dispatch(freezeSlice.actions.setFormErrorMessage(''))
    try {
      const payload: any = {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        businessName: form.businessName.value,
        address: [form.addressLine1.value, form.addressLine2.value],
        city: form.city.value,
        state: form.state.value,
        zipcode: form.zipcode.value,
        email: form.email.value,
      }
      if (additionalPhone.length > 0 && form.phoneNumber.value) {
        const phoneNumbers = []
        phoneNumbers.push(form.phoneNumber.value)
        additionalPhone.map((phoneNumber) => {
          phoneNumbers.push(form[phoneNumber.name].value)
        })
        payload.phoneNumbers = phoneNumbers
      } else {
        payload.phoneNumber = form.phoneNumber.value
      }
      payload.mode =
        payload.businessName && isBusiness ? 'business' : 'residential'

      const response = await APIClient.carrierFreeze({ optOut: payload })
      DTMClient.triggerEvent(
        {
          events: 'event2',
          eVar2: CARRIER_FREEZE,
        },
        'tl_o',
      )
      dispatch(freezeSlice.actions.onSuccess(response.data))
    } catch (error: any) {
      const errorStatus: any = error?.response?.status
      const errorMessage =
        'Something went wrong. Please try again. Error status: ' + errorStatus
      dispatch(freezeSlice.actions.onFailure(errorMessage))
      if (!!error?.response?.data?.message) {
        DTMClient.triggerEvent(
          {
            events: 'event48',
            eVar2: CARRIER_FREEZE,
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
            eVar2: 'order verification',
            eVar88: 'Failed to fetch',
          },
          'tl_o',
          SITE_ERROR,
        )
      }
    }
    dispatch(freezeSlice.actions.setIsLoading(false))
  }

  const businessChangeHandler = (event: any) => {
    setIsBusiness((prev: boolean) => !prev)
    if (event.target.checked) {
      DTMClient.triggerEvent(
        {
          events: 'event14',
          eVar14: CARRIER_FREEZE_BUSINESS,
        },
        'tl_o',
        SITE_INTERACTION,
      )
    }
  }

  return (
    <div className={classes.wrapper}>
      <>
        {isLoading ? (
          <Loading className={classes.loader} />
        ) : (
          <>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isBusiness}
                  onChange={(e) => businessChangeHandler(e)}
                />
              }
              className={classes.fullWidth}
              label={businessCustomerCheckLabel?.value}
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

            <div className={classes.addBtnContainer}>
              <button
                className={classes.addBtnIcon}
                onClick={renderAdditionalPhoneNumberInput}
              >
                <Add />
              </button>
              <InjectHTML
                styleType="p1"
                value={phoneNumberInsertButton.value}
              />
            </div>

            {additionalPhone.map(function (input, index) {
              return renderInput(
                input?.name,
                input?.label,
                input?.placeholder,
                input?.required,
                index,
              )
            })}

            {renderInput(
              'addressLine1',
              address1Label?.value,
              address1Placeholder?.value,
              true,
            )}

            {renderInput(
              'addressLine2',
              address2Label?.value,
              address2Placeholder?.value,
              false,
            )}

            {renderInput(
              'city',
              cityLabel?.value,
              cityPlaceholder?.value,
              true,
            )}

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
              setValue={handleChange}
              required={true}
              isError={errors?.['state']}
              helperText={errors?.['state']}
              className={classes.inputSelect}
            />

            {renderInput(
              'zipcode',
              zipcodeLabel?.value,
              zipcodePlaceholder?.value,
              true,
            )}

            {renderInput(
              'email',
              emailLabel?.value,
              emailPlaceholder?.value,
              true,
            )}

            {renderInput(
              'confirmEmail',
              confirmEmailLabel?.value,
              confirmEmailPlaceholder?.value,
              true,
            )}

            <FormControlLabel
              control={
                <Checkbox
                  checked={isAgree}
                  onChange={() => setIsAgree(!isAgree)}
                />
              }
              className={classes.fullWidth}
              label={iAgree.value}
            />

            {formErrorMessage && (
              <InjectHTML
                styleType="p3"
                className={classes.formError}
                value={formErrorMessage}
              />
            )}

            <div>
              <Button
                type="submit"
                variant="primary"
                onClick={handleSubmit}
                className={classes.btn}
                text={submit?.value}
                disabled={!isFormValid}
              />
              <Button
                type="link"
                variant="tertiary"
                text={cancel?.value}
                href={cancelUrl?.value}
                className={classes.btnRight}
                color={colors.main.backgroundGray}
              />
            </div>
          </> //loading false
        )}
      </>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    ...COMPONENT_WRAPPER,
    maxWidth: 1232,
    textAlign: 'left',
    paddingTop: 40,
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
  btnRight: {
    marginTop: 16,
    marginBottom: 24,
    width: 'max-content',
    marginLeft: 20,
    [breakpoints.down('xs')]: {
      marginLeft: 0,
    },
  },
  addBtnContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  addBtnIcon: {
    borderRadius: '50%',
    marginRight: 10,
    backgroundColor: colors.main.newBackgroundGray,
    border: `1px outset ${colors.main.gray}`,
    padding: '0.8rem',
    cursor: 'pointer',
    transition: 'background-color .2s ease-in',
    '&:hover': {
      backgroundColor: colors.main.gray90,
    },
  },
  alignCenter: {
    textAlign: 'center',
  },
  loader: {
    marginTop: 16,
    marginBottom: 24,
    height: 50,
  },
  formError: {
    color: colors.main.brightRed,
    fontSize: 20,
    margin: '16px 32px',
    '& a': {
      color: colors.main.dark,
    },
    [breakpoints.down('xs')]: {
      margin: '10px 0px',
    },
  },
  fullWidth: {
    width: '100%',
  },
}))

export default FreezeForm
