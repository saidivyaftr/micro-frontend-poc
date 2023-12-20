import { Button, InjectHTML } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import {
  COMPONENT_WRAPPER,
  CTA_BUTTON,
  EQUIPMENT_RETURN_ADDRESS,
  SITE_INTERACTION,
  VISITOR,
} from 'src/constants'
import { Input, Select } from 'src/ui-kit'
import { useEffect, useMemo, useState } from 'react'
import colors from '@/shared-ui/colors'
import { useDispatch, useSelector } from 'react-redux'
import { equipmentReturnFindSlice } from 'src/redux/slicers'
import { useAppData, usePageLoadEvents } from '../../hooks'
import { State } from 'src/redux/types'
import { PP_OBJECT_SANS_BOLD } from 'src/constants/fontFamilyNames'
import { addressFormValidator } from './AddressFormValidator'

export interface IAddressForm {
  addressLineOne: IAddressField
  addressLineTwo: IAddressField
  city: IAddressField
  state: IAddressField
  zipCode: IAddressField
}

interface IAddressField {
  value: string
  isTouched: boolean
}

const formFieldInitialState = {
  value: '',
  isTouched: false,
}

const initialFormState: IAddressForm = {
  addressLineOne: formFieldInitialState,
  addressLineTwo: formFieldInitialState,
  city: formFieldInitialState,
  state: formFieldInitialState,
  zipCode: formFieldInitialState,
}

const ReturnsAddress = () => {
  const classes = useStyles()

  const {
    title,
    description,
    addressLineOneLabel,
    addressLineTwoLabel,
    cityLabel,
    stateLabel,
    stateContent,
    zipCodeLabel,
    continueButtonLabel,
    errorMessages,
  } = useAppData('returnsAddress', true) || {}

  const { formData } = useSelector((state: State) => state?.equipmentReturnFind)
  const [form, setForm] = useState(initialFormState)
  const [isFormValid, errors] = addressFormValidator(form, errorMessages)

  const dispatch = useDispatch()
  useEffect(() => {
    setForm(formData)
  }, [formData])

  const renderInput = (
    name: keyof IAddressForm,
    label: any,
    isRequired: boolean,
  ) => {
    return (
      <Input
        label={label}
        name={name}
        value={form[name].value}
        fullWidth
        onChange={handleChange}
        required={isRequired}
        className={classes.inputContainer}
        isError={errors?.[name]}
      />
    )
  }
  const handleChange = (event: any) => {
    const updatedForm = { ...form }
    if (typeof event === 'string') {
      updatedForm['state'] = {
        value: event,
        isTouched: true,
      }
    } else {
      updatedForm[event.target.name as keyof IAddressForm] = {
        value: event.target.value,
        isTouched: true,
      }
    }
    setForm(updatedForm)
  }

  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: EQUIPMENT_RETURN_ADDRESS,
      eVar22: VISITOR,
    },
  })

  const handleSubmit = async () => {
    await dispatch(equipmentReturnFindSlice.actions.setFormData(form))
    await dispatch(equipmentReturnFindSlice.actions.setStep('EQUIPMENT_REVIEW'))
  }

  const selectOptions = useMemo(() => {
    return (
      stateContent?.list.map((state: any) => {
        return {
          label: state.code.value,
          value: state.code.value,
        }
      }) || []
    )
  }, [stateContent])

  return (
    <div className={classes.wrapper}>
      <div className={classes.section}>
        <InjectHTML
          value={title?.value}
          styleType="h4"
          tagType="h2"
          className={classes.header}
        />
        <InjectHTML
          addAnchorStyles
          styleType="p2"
          value={description?.value}
          className={classes.description}
        />
        <form>
          <div className={classes.row}>
            {renderInput('addressLineOne', addressLineOneLabel?.value, true)}
          </div>
          <div className={classes.row}>
            {renderInput('addressLineTwo', addressLineTwoLabel?.value, false)}
          </div>
          <div className={classes.row2}>
            {renderInput('city', cityLabel?.value, true)}
            <div className={classes.halfCol}>
              <Select
                label={stateLabel.value}
                value={form['state'].value}
                name={'state'}
                options={selectOptions}
                setValue={handleChange}
                required={true}
                className={classes.inputSelect}
              />
            </div>
            <div className={classes.halfCol}>
              {renderInput('zipCode', zipCodeLabel?.value, true)}
            </div>
          </div>
        </form>
        <div className={classes.btnContainer}>
          <Button
            type="submit"
            variant="primary"
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={classes.btn}
            text={continueButtonLabel.value}
            eventObj={{
              events: 'event14',
              eVar14: `${CTA_BUTTON}:returns-address`,
            }}
            interactionType={SITE_INTERACTION}
          />
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    ...COMPONENT_WRAPPER,
    textAlign: 'left',
  },
  header: {
    marginTop: '1.5rem',
    fontSize: '2.25rem',
    lineHeight: '2.5rem',
  },
  section: {
    padding: '4rem 0 2rem 0',
    textAlign: 'left',
    margin: '0 auto',
    maxWidth: '75%',
    [breakpoints.down('xs')]: {
      padding: '2rem 0',
    },
  },
  description: {
    paddingTop: '1.25rem',
    maxWidth: 'auto',
    margin: 'auto',
    '& span': {
      fontFamily: PP_OBJECT_SANS_BOLD,
    },
  },
  btnContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    margin: '2rem 0',
    width: 'max-content',
  },
  inputSelect: {
    marginTop: '10px',
    '&:hover': {
      borderColor: colors.main.black,
      outline: 'none',
    },
    [breakpoints.down('xs')]: {
      margin: '10px 0px',
      width: `100%`,
    },
  },
  inputContainer: {
    margin: '10px 0px',
    width: `100%`,
    '& .MuiFormHelperText-root': {
      color: colors.main.brightRed,
      marginLeft: 4,
      marginTop: 8,
    },
    '& div:hover': {
      borderColor: colors.main.black,
      outline: 'none',
    },
    '& div.Mui-focused': {
      borderColor: colors.main.greenishBlue,
    },
    [breakpoints.down('xs')]: {
      margin: '10px 0px',
      width: `100%`,
    },
  },
  row: {
    width: '100%',
    paddingBottom: '1rem',
    [breakpoints.down('xs')]: {
      paddingBottom: 0,
    },
  },
  row2: {
    width: '100%',
    display: 'flex',
    gap: '2rem',
    paddingBottom: '1rem',
    [breakpoints.down('xs')]: {
      flexDirection: 'column',
      gap: 0,
    },
  },
  fullCol: {
    width: '100%',
  },
  halfCol: {
    width: '50%',
    [breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  formError: {
    color: colors.main.brightRed,
    fontSize: 18,
    textAlign: 'center',
    margin: '16px 32px',
    [breakpoints.down('xs')]: {
      margin: '10px 0px',
    },
  },
}))

export default ReturnsAddress
