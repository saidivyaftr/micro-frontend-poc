import { useState, useRef } from 'react'
import router from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import APIClient from 'src/api-client'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { makeStyles, Radio, Grid } from '@material-ui/core'
import { Button, Loading, Typography } from '@/shared-ui/components'
import { Input, RadioGroup } from 'src/ui-kit'
import {
  COMPONENT_WRAPPER,
  SITE_ERROR,
  FORM_START,
  FORM_SUBMIT,
  MULTIFAMILY_FORM,
} from 'src/constants'
import { useMultifamilyFormValidator } from './useMultifamilyFormValidator'
import { IMultifamilyForm, initialFormState } from './types'
import { State } from 'src/redux/types'
import { multifamilySlice } from 'src/redux/slicers'
import { useAppData, useDebounce, useAddressPredictor } from 'src/hooks'
import colors from '@/shared-ui/colors'
import SuccessMessage from './SuccessMessage'
import ApiErrorModal from './ApiErrorModal'
import clx from 'classnames'
import { RadioIcon } from '@/shared-ui/react-icons'
import {
  formSingleLineAddress,
  SingleLineAddress,
} from 'src/utils/addressHelpers'
import SignPAL from '../SignPAL'

const MultifamilyForm = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [showPal, setShowPAL] = useState(false)
  const [addressInput, setAddressInput] = useState('')
  const [fullName, setfullName] = useState<string>('')
  const [emailAddress, setEmailAddress] = useState<string>('')
  const [propertyName, setpropertyName] = useState<string>('')
  const [premiseAddress, setPremiseAddress] = useState<string>('')
  const [residentialUnits, setResidentialUnits] = useState<string>('')
  const [selectedAddress, setSelectedAddress] = useState<any | undefined>(
    undefined,
  )
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const inputRef: any = useRef(null)
  const { isLoading, isSuccess } = useSelector(
    (state: State) => state?.multifamily,
  )
  // eslint-disable-next-line prefer-const
  const data: Record<string, { value: string }> = useAppData(
    'multifamilyForm',
    true,
  )

  const {
    title,
    description,
    subTitle,
    disclaimer,
    successTitle,
    successSubtitle,
    errorTitle,
    errorSubtitle,
    errorContact,
    closeButton,
    contactUsButton,
    radioBoxLabel,
    option1Label,
    option1Subtext,
    option2Label,
    ...errorCodes
  } = data

  const emailTo = { value: 'MultifamilySales@ftr.com' }
  const emailSubject = { value: 'Digital PAL Technical Difficulty' }

  const [form, setForm] = useState(initialFormState)
  const [formTouched, setFormTouch] = useState<boolean>(false)
  const [isFormValid, errors] = useMultifamilyFormValidator(form, errorCodes)
  const predictions = useAddressPredictor(useDebounce(addressInput, 300))
  const showPredictions = predictions?.length > 0 && selectedAddress == null
  const handleIsTouched = (name: string) => {
    if (!formTouched) {
      setFormTouch(true)
      DTMClient.triggerEvent(
        {
          events: 'event1',
          eVar2: MULTIFAMILY_FORM,
        },
        'tl_o',
        FORM_START,
      )
    }
    const updatedForm = { ...form }
    updatedForm[name as keyof IMultifamilyForm] = {
      value: updatedForm[name as keyof IMultifamilyForm].value,
      isTouched: true,
    }
    setForm(updatedForm)
  }

  const signingOptions = [
    {
      label: option1Label?.value,
      value: 'true',
      subtext: option1Subtext?.value,
    },
    { label: option2Label?.value, value: 'false' },
  ]

  const updateForm = (name: string, value: string) => {
    const updatedForm = { ...form }
    updatedForm[name as keyof IMultifamilyForm] = {
      value: value,
      isTouched: true,
    }
    setForm(updatedForm)
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target
    if (name === 'phoneNumber' || name === 'numberOfUnits') {
      const result = value
        .trim()
        .replaceAll(/[-_]/g, '')
        .match(/^[0-9]{0,10}$/)
      if (!result) return
    }
    updateForm(name, value)
  }

  const handlePreferred = (name: string, value: string) => {
    updateForm(name, value)
    return value
  }

  const CustomRadioButton = (
    <Radio icon={<RadioIcon />} checkedIcon={<RadioIcon checked />} />
  )

  const renderInput = (
    name: string,
    label: string,
    placeholder: string,
    required: boolean,
    key?: number,
  ) => {
    const isSearch = name === 'communityAddress' ? true : false
    const isRadio = name === 'optForSigning' ? true : false
    if (isSearch) {
      return (
        <div className={classes.inputContainer}>
          <Input
            label={label}
            name={name}
            value={addressInput}
            fullWidth
            mask={name === 'phoneNumber' ? '999-999-9999' : ''}
            onChange={(e: any) => {
              setAddressInput(e.target.value)
              setSelectedAddress(undefined)
            }}
            onBlur={() => {
              handleIsTouched(name)
            }}
            placeholder={placeholder}
            required={required}
            className={classes.inputContainer}
            isError={errors?.[name]}
            helperText={errors?.[name]}
            key={key}
            ref={inputRef}
            autoComplete={'off'}
          />
          <div
            className={clx({ [classes.predictiveLayover]: showPredictions })}
          >
            {showPredictions &&
              predictions?.map((address: any) => {
                return (
                  <div
                    key={`address-${address?.addressKey}`}
                    className={classes.addressRecord}
                    onClick={async () => {
                      setSelectedAddress(address)
                      await setAddressInput(
                        formSingleLineAddress(address?.address, true),
                      )
                      if (inputRef?.current) {
                        inputRef?.current?.focus()
                      }
                      updateForm(
                        name,
                        formSingleLineAddress(address?.address, true),
                      )
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
      )
    } else if (isRadio) {
      return (
        <Grid item xs={12} className={classes.formRadio}>
          <RadioGroup
            customIcon={CustomRadioButton}
            label={radioBoxLabel.value}
            name={name}
            value={form[name as keyof IMultifamilyForm].value}
            direction={'column'}
            options={signingOptions}
            setValue={(val: string) => handlePreferred(name, val)}
            required
          />
        </Grid>
      )
    } else
      return (
        <Input
          label={label}
          name={name}
          value={form[name as keyof IMultifamilyForm].value}
          fullWidth
          mask={name === 'phoneNumber' ? '999-999-9999' : ''}
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

  const handleFormFocus = () => {
    const targetElement = document.getElementById('multifamily-form')
    if (targetElement) {
      targetElement.focus()
      window.scrollTo({
        top: targetElement?.offsetTop - 110,
        behavior: 'smooth',
      })
    } else {
      router.push(`${window?.location?.href}#multifamily-form`)
    }
  }

  const handleSubmit = async () => {
    dispatch(multifamilySlice.actions.setIsLoading(true))
    handleFormFocus()
    dispatch(multifamilySlice.actions.setFormErrorMessage(''))
    try {
      const addressKey = selectedAddress?.addressKey || ''
      const samRecord: any =
        selectedAddress?.samRecords.length > 0
          ? selectedAddress?.samRecords[0]
          : ''
      const environment = samRecord ? samRecord.environment : ''
      const controlNumber = samRecord ? samRecord.controlNumber : ''
      const payload: any = {
        firstName: form?.firstName?.value.trim(),
        lastName: form?.lastName?.value.trim(),
        communityName: form?.communityName?.value.trim(),
        communityAddress: form?.communityAddress?.value.trim(),
        numberOfUnits: Number(form?.numberOfUnits?.value.trim()),
        email: form?.emailAddress?.value.trim(),
        phoneNumber: form?.phoneNumber?.value.replaceAll('-', ''),
        addressKey: addressKey,
        environment: environment,
        controlNumber: controlNumber,
        optForSigning: form?.optForSigning?.value.trim(),
      }

      const response = await APIClient.multifamily(payload)
      const prop4Str =
        payload.optForSigning === 'true'
          ? "I'd like Frontier to schedule an appointment"
          : 'I have some questions. Please contact me.'
      DTMClient.triggerEvent(
        {
          events: 'event2',
          eVar2: MULTIFAMILY_FORM,
          prop4: prop4Str,
        },
        'tl_o',
        FORM_SUBMIT,
      )
      dispatch(multifamilySlice.actions.onSuccess(response.statusText))
      setfullName(
        `${form?.firstName?.value.trim()} ${form?.lastName?.value.trim()}`,
      )
      setEmailAddress(form?.emailAddress?.value.trim())
      setpropertyName(form?.communityName?.value.trim())
      setPremiseAddress(form?.communityAddress?.value.trim())
      setResidentialUnits(form?.numberOfUnits?.value.trim())
      setPhoneNumber(form?.phoneNumber?.value.replaceAll('-', ''))
      payload.optForSigning === 'true' && setShowPAL(true)
    } catch (error: any) {
      DTMClient.triggerEvent(
        {
          events: 'event88',
          eVar2: MULTIFAMILY_FORM,
          eVar88: 'Failed to fetch',
        },
        'tl_o',
        SITE_ERROR,
      )
      dispatch(multifamilySlice.actions.onFailure('Api Error'))
      setForm(initialFormState)
    }
    dispatch(multifamilySlice.actions.setIsLoading(false))
  }

  const inputFields = Object.keys(initialFormState)

  const handleDismissModal = () => {
    setForm(initialFormState)
  }

  if (!title?.value || !description?.value || !subTitle?.value) {
    return null
  }

  return showPal ? (
    <SignPAL
      signerName={fullName}
      signerEmail={emailAddress}
      propertyName={propertyName}
      premiseAddress={premiseAddress}
      residentialUnits={residentialUnits}
      phoneNumber={phoneNumber}
    />
  ) : (
    <div id="multifamily-form">
      <div className={classes.wrapper}>
        {isLoading ? (
          <Loading className={classes.loading} />
        ) : (
          <>
            {isSuccess ? (
              <SuccessMessage data={{ successTitle, successSubtitle }} />
            ) : (
              <div className={classes.content}>
                {title?.value && (
                  <Typography
                    styleType="h3"
                    tagType="h1"
                    fontType="boldFont"
                    className={classes.title}
                  >
                    {title?.value}
                  </Typography>
                )}
                {description?.value && (
                  <Typography styleType="p1" tagType="p">
                    {description?.value}
                  </Typography>
                )}
                <div className={classes.formWrapper}>
                  {subTitle?.value && (
                    <Typography styleType="h5" tagType="h2" fontType="boldFont">
                      {subTitle?.value}
                    </Typography>
                  )}
                  <div>
                    <div className={classes.inputWrapper}>
                      {inputFields?.map((name) => {
                        const {
                          [`${name}Label`]: label,
                          [`${name}Placeholder`]: placeholder,
                        } = data
                        return renderInput(
                          name,
                          label?.value,
                          placeholder?.value,
                          true,
                        )
                      })}
                    </div>
                    <div className={classes.formFooter}>
                      <Button
                        type="submit"
                        variant="primary"
                        onClick={handleSubmit}
                        className={classes.button}
                        text={'SUBMIT'}
                        disabled={!isFormValid}
                      />
                      {disclaimer?.value && (
                        <Typography
                          styleType="p4"
                          tagType="p"
                          className={classes.disclaimer}
                        >
                          {disclaimer?.value}
                        </Typography>
                      )}
                    </div>
                  </div>
                </div>
                <ApiErrorModal
                  data={{
                    errorTitle,
                    errorSubtitle,
                    errorContact,
                    contactUsButton,
                    closeButton,
                    handleDismissModal,
                    emailTo,
                    emailSubject,
                  }}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    ...COMPONENT_WRAPPER,
    padding: '0px',
    [breakpoints.down('sm')]: {
      margin: '3rem 1rem 4.0625rem 1rem',
    },
  },
  loading: {
    marginTop: 16,
    marginBottom: 24,
    height: 200,
  },
  content: {
    margin: '6rem 5rem 10.8125rem',
    [breakpoints.down('sm')]: {
      margin: '0',
      padding: '0px 15px 0px 15px',
    },
  },
  title: {
    textAlign: 'center',
    [breakpoints.down('sm')]: {
      fontSize: '1.5rem',
      lineHeight: '2rem',
      marginBottom: '2rem',
    },
  },
  formWrapper: {
    paddingTop: '0.875rem',
    // height: '566px',
    height: '756px',
    [breakpoints.down('sm')]: {
      height: '100%',
      paddingTop: '3.125rem',
    },
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    width: '8.5625rem',
    [breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  disclaimer: {
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '725px',
    textAlign: 'center',
    margin: 0,
  },
  inputWrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    columnGap: '2rem',
    gridRowGap: '2rem',
    paddingTop: '2rem',
    marginBottom: '2rem',
    [breakpoints.down('sm')]: {
      gridTemplateColumns: 'repeat(1, 1fr)',
      gridRowGap: '1rem',
    },
  },
  inputContainer: {
    position: 'relative',
    '& .MuiFormHelperText-root': {
      color: colors.main.brightRed,
      marginLeft: 4,
      marginTop: 8,
    },
    '& div:hover': {
      borderColor: colors.main.black,
      outline: 'none',
    },
  },
  formFooter: {
    marginTop: '2rem',
    gap: '4rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  // inputContainer: {
  //   width: '100%',
  //   flex: 1,
  //   height: 50,
  //   borderRadius: '25px',
  //   display: 'flex',
  //   background: colors.main.highlightWhite,
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   paddingLeft: 16,
  //   position: 'relative',
  // },
  predictiveLayover: {
    position: 'absolute',
    top: 55,
    background: colors.main.white,
    left: 8,
    width: 'calc(100% - 8px)',
    borderRadius: 16,
    border: '1px solid',
    borderColor: colors.main.gray,
    borderTop: 'none',
    maxWidth: 600,
    textAlign: 'left',
    zIndex: 9,
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
  inputWithPredictions: {
    borderBottomLeftRadius: '0!important',
    borderBottomRightRadius: '0!important',
  },
  formRadio: {
    gridColumnStart: 1,
    margin: '0px 0px 32px 0px',
    [breakpoints.down('xs')]: {
      margin: '0px 0px 16px 0px',
    },
    '& .MuiFormControl-root': {
      '& .MuiFormGroup-row': {
        gap: 0,
        width: '200%',
        [breakpoints.down('sm')]: {
          width: '100%',
        },
      },
      [breakpoints.down('xs')]: {
        flexDirection: 'column',
        alignItems: 'start',
      },
    },
    '& .MuiFormLabel-root': {
      color: colors.main.black,
      fontSize: '16px',
      '& span': {
        color: colors.main.red,
        fontSize: '16px',
        marginLeft: '3px',
        top: 0,
        //lineHeight: '1',
      },
      [breakpoints.down('sm')]: {
        margin: '0px',
      },
      [breakpoints.down('xs')]: {
        marginBottom: '8px',
        fontSize: '16px',
        lineHeight: '24px',
      },
    },
    '& .MuiSvgIcon-root': {
      fill: colors.main.greenishBlue,
    },
    '& .MuiFormControlLabel-label': {
      backgroudColor: colors.main.greenishBlue,
      [breakpoints.down('xs')]: {
        fontSize: '16px',
        lineHeight: '24px',
      },
    },
  },
}))

export default MultifamilyForm
