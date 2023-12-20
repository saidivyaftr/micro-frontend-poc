import { Fragment, useEffect, useState } from 'react'
import { makeStyles, Grid, Radio } from '@material-ui/core'
import { InjectHTML, Button, Loading } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'
import { Input, RadioGroup } from 'src/ui-kit'
import { useCampaignFormValidator } from './useCampaignFormValidator'
import colors from '@/shared-ui/colors'
import { useSelector } from 'react-redux'
import { State } from 'src/redux/types'
import Consent from './Consent'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { useAppData } from 'src/hooks'
import { RadioIcon } from '@/shared-ui/react-icons'
export type ICampaignFormInput = {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: any) => void
}
export interface ICampaignForm {
  firstName: ICampaignFormField
  lastName: ICampaignFormField
  email: ICampaignFormField
  mobileNumber: ICampaignFormField
  preferredContact: ICampaignFormField
  haveFiberNet: ICampaignFormField
  consent: ICampaignFormField
}

interface ICampaignFormField {
  value: string
  isTouched: boolean
  isRequired: boolean
}

const formFieldInitialState = {
  value: '',
  isTouched: false,
  isRequired: false,
}

const initialFormState: ICampaignForm = {
  firstName: { ...formFieldInitialState, isRequired: true },
  lastName: { ...formFieldInitialState, isRequired: true },
  email: { ...formFieldInitialState, isRequired: true },
  mobileNumber: formFieldInitialState,
  preferredContact: { ...formFieldInitialState, value: 'email' },
  haveFiberNet: formFieldInitialState,
  consent: { ...formFieldInitialState, isRequired: true },
}

const CampaignForm = (props: ICampaignFormInput) => {
  const {
    firstNameLabel,
    lastNameLabel,
    emailLabel,
    mobileNumberLabel,
    PreferredMethodofContact,
    haveFiberInternetText,
    buttonText,
    richText,
  } = useAppData('campaignFormData', true)

  const { isLoading, formErrorMessage } = useSelector(
    (state: State) => state?.ccpa,
  )
  const [form, setForm] = useState(initialFormState)
  const [isFormValid, errors] = useCampaignFormValidator(form)
  const preferredMethodOfContactOptions = [
    { label: 'Email', value: 'email' },
    { label: 'Mobile Number', value: 'mobile' },
  ]
  const haveFiberInternetOptions = [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
  ]
  const classes = useStyles()

  useEffect(() => {
    sendAnalytics()
  }, [])

  const handleChange = (name: string, value: any) => {
    setForm((prevForm: any) => ({
      ...prevForm,
      [name]: {
        ...prevForm[name],
        value: value,
        isTouched: true,
      },
    }))
    return value
  }

  const handlePreferred = (name: string, val: string) => {
    let requiredPreferredField = 'mobileNumber'
    let optionalPreferredField = 'email'
    if (val === 'email') {
      requiredPreferredField = 'email'
      optionalPreferredField = 'mobileNumber'
    }
    setForm((prevForm: any) => ({
      ...prevForm,
      [name]: {
        ...prevForm[name],
        value: val,
        isTouched: true,
      },
      [requiredPreferredField]: {
        ...prevForm[requiredPreferredField],
        isRequired: true,
      },
      [optionalPreferredField]: {
        ...prevForm[optionalPreferredField],
        isRequired: false,
      },
    }))
    return val
  }

  const renderInput = (
    name: keyof ICampaignForm,
    label: any,
    required?: boolean,
    mask?: string,
  ) => {
    return (
      <Input
        label={label}
        value={form[name].value}
        fullWidth
        onChange={(event: any) => handleChange(name, event.target.value)}
        className={classes.inputContainer}
        isError={errors?.[name]}
        helperText={errors?.[name]}
        required={required}
        mask={mask}
      />
    )
  }

  if (firstNameLabel?.value.length === 0) {
    return null
  }

  const sendAnalytics = () => {
    DTMClient.triggerEvent(
      {
        events: 'event1',
        eVar2: 'bga nomination',
      },
      'tl_o',
      'form view',
    )
  }

  const CustomRadioButton = (
    <Radio icon={<RadioIcon />} checkedIcon={<RadioIcon checked />} />
  )

  return (
    <div className={classes.wrapper}>
      <Fragment>
        <Grid container>
          <Grid className={classes.gridInputContainer}>
            <Grid item>
              {renderInput('firstName', firstNameLabel?.value, true)}
            </Grid>
            <Grid item>
              {renderInput('lastName', lastNameLabel?.value, true)}
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.formRadio}>
            <RadioGroup
              customIcon={CustomRadioButton}
              label={PreferredMethodofContact.value}
              name={form.preferredContact.value}
              value={form.preferredContact.value}
              options={preferredMethodOfContactOptions}
              setValue={(val: string) =>
                handlePreferred('preferredContact', val)
              }
              required
            ></RadioGroup>
          </Grid>

          <Grid className={classes.gridInputContainer}>
            <Grid item>
              {renderInput(
                'email',
                emailLabel?.value,
                form.preferredContact.value === 'email',
              )}
            </Grid>
            <Grid item>
              {renderInput(
                'mobileNumber',
                mobileNumberLabel?.value,
                form.preferredContact.value === 'mobile',
                '(999) 999-9999',
              )}
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.formRadio}>
            <RadioGroup
              customIcon={CustomRadioButton}
              label={haveFiberInternetText.value}
              name={form.haveFiberNet.value}
              value={form.haveFiberNet.value}
              options={haveFiberInternetOptions}
              setValue={(val: string) => handleChange('haveFiberNet', val)}
            ></RadioGroup>
          </Grid>
        </Grid>
        {formErrorMessage && (
          <InjectHTML
            styleType="p3"
            className={classes.formError}
            value={formErrorMessage}
          />
        )}
        {richText?.value && (
          <Consent
            label={
              <>
                {richText?.value}
                <span className={classes.consentRequired}>*</span>
              </>
            }
            name={'test'}
            required
            setValue={() => handleChange('consent', !form.consent.value)}
            checked={!!form.consent.value}
          />
        )}
        {isLoading ? (
          <Loading className={classes.loader} />
        ) : (
          <Button
            type="button"
            hoverVariant="secondary"
            onClick={() => props.onSubmit(form)}
            className={classes.btn}
            text={buttonText?.value}
            disabled={!isFormValid}
          />
        )}
      </Fragment>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    ...COMPONENT_WRAPPER,
    textAlign: 'center',
    color: colors.main.white,
    padding: 0,
    marginTop: '48px',
    [breakpoints.down('xs')]: {
      lineHeight: '16px',
      marginTop: '32px',
    },
  },
  gridInputContainer: {
    display: 'flex',
    gap: '32px',
    width: '100%',
    marginBottom: '32px',
    [breakpoints.down('xs')]: {
      flexDirection: 'column',
      gap: '16px',
      marginBottom: '16px',
    },
    '& .MuiGrid-item': {
      flex: 1,
    },
  },
  inputContainer: {
    width: '100%',
    backgroundColor: colors.main.darkShadeBlue,
    borderRadius: '8px',
    border: `1px solid ${colors.main.borderGrey}`,
    '& .MuiFormHelperText-root': {
      color: colors.main.primaryRed,
      marginLeft: 4,
      marginTop: 8,
    },
    '& .MuiInputBase-input': {
      backgroundColor: colors.main.darkShadeBlue,
      color: colors.main.white,
    },
    '& .MuiFormLabel-root': {
      backgroundColor: colors.main.darkShadeBlue,
      color: colors.main.white,
    },
    [breakpoints.down('xs')]: {
      width: `100%`,
    },
  },
  btn: {
    marginTop: 48,
    width: 'max-content',
    [breakpoints.down('xs')]: {
      marginTop: 32,
      width: `100%`,
    },
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
  formRadio: {
    margin: '0px 0px 32px 0px',
    [breakpoints.down('xs')]: {
      margin: '0px 0px 16px 0px',
    },
    '& .MuiFormControl-root': {
      alignItems: 'center',
      [breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'start',
      },
    },
    '& .MuiFormLabel-root': {
      color: colors.main.white,
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
  formRadioHaveFiber: {
    [breakpoints.down('sm')]: {
      padding: '0px',
    },
    padding: '0 24px',
    '& .MuiFormControl-root': {
      alignItems: 'start !important',
      flexDirection: 'column',
    },
    '& .MuiFormLabel-root': {
      color: colors.main.white,
      [breakpoints.down('sm')]: {
        marginRight: '0px !important',
        fontSize: '14px',
      },
    },
    '& .MuiSvgIcon-root': {
      fill: colors.main.greenishBlue,
    },
  },
  consentRequired: {
    color: colors.main.brightRed,
    '& span': {
      fontSize: '14px',
    },
  },
  errorMsg: {
    color: colors.main.primaryRed,
    textAlign: 'left',
  },
}))

export default CampaignForm
