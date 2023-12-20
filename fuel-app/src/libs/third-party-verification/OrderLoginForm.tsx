import { makeStyles } from '@material-ui/core'
import React, { Fragment, useState } from 'react'
import { InjectHTML, Button, Loading, Typography } from '@/shared-ui/components'
import { Input } from 'src/ui-kit'
import { OrderLoginValidator } from './OrderLoginValidator'
import { verifySlice } from 'src/redux/slicers'
import { useDispatch, useSelector } from 'react-redux'
import { State } from 'src/redux/types'
import APIClient from 'src/api-client'
import colors from '@/shared-ui/colors'
import ReCAPTCHA from 'react-google-recaptcha'
import { useAppData } from 'src/hooks'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import clx from 'classnames'

export interface IOrderLoginForm {
  orderNumber: IOrderLoginFormField
  lastName: IOrderLoginFormField
  zipCode: IOrderLoginFormField
}

interface IOrderLoginFormField {
  value: string
  isTouched: boolean
}

const formFieldInitialState = {
  value: '',
  isTouched: false,
}

const initialFormState: IOrderLoginForm = {
  orderNumber: formFieldInitialState,
  lastName: formFieldInitialState,
  zipCode: formFieldInitialState,
}

const OrderLoginForm = () => {
  const orderLoginData = useAppData('verify', true)
  const {
    orderNumber,
    zipCode,
    lastName,
    orderPlaceholder,
    lastnamePlaceholder,
    zipPlaceholder,
    allFieldsAreRequired,
    continueButton,
    orderNumberInvalid,
    somethingWrong,
  } = orderLoginData
  const recaptchaRef = React.useRef<ReCAPTCHA>(null)
  const { isLoading, formErrorMessage } = useSelector(
    (state: State) => state.verify,
  )
  const dispatch = useDispatch()
  const [form, setForm] = useState(initialFormState)
  const [isFormValid, errors] = OrderLoginValidator(form)

  const handleChange = (event: any) => {
    const updatedForm = { ...form }
    updatedForm[event.target.name as keyof IOrderLoginForm] = {
      value: event.target.value,
      isTouched: true,
    }
    setForm(updatedForm)
  }

  const handleSubmit = async () => {
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: 'order verification: continue',
      },
      'tl_o',
      'site interaction',
    )
    dispatch(verifySlice.actions.setIsLoading(true))
    dispatch(verifySlice.actions.setFormErrorMessage(''))
    let token
    try {
      token = await recaptchaRef?.current?.executeAsync()
      recaptchaRef?.current?.reset()
      const payload = {
        orderId:
          form.orderNumber.value.length === 8
            ? '0' + form.orderNumber.value
            : form.orderNumber.value,
        familyName: form.lastName.value,
        zipCode: form.zipCode.value,
        recaptchaV2: token,
      }
      const response = await APIClient.tpVerify(payload)
      const result = response.data
      if (result.serviceId) {
        dispatch(
          verifySlice.actions.setVerifyResponse({
            serviceId: result.serviceId,
            order: result.order,
          }),
        )
      } else {
        dispatch(verifySlice.actions.setFormErrorMessage('order-error'))
      }
    } catch (error: any) {
      if (error.response) {
        dispatch(
          verifySlice.actions.setFormErrorMessage(orderNumberInvalid?.value),
        )
      } else {
        dispatch(verifySlice.actions.setFormErrorMessage(somethingWrong?.value))
      }
    }
    dispatch(verifySlice.actions.setIsLoading(false))
  }

  const classes = useStyles()
  const renderInput = (
    name: keyof IOrderLoginForm,
    label: any,
    placeholder: any,
  ) => {
    return (
      <>
        <label className={classes.inputContainer}>
          <span className={classes.red}>*</span>
          {label}
        </label>
        <Input
          name={name}
          value={form[name].value}
          fullWidth
          onChange={handleChange}
          placeholder={placeholder}
          className={clx(classes.inputContainer, {
            [classes.borderPrimary]: errors?.[name],
          })}
          isError={errors?.[name]}
          helperText={errors?.[name]}
        />
      </>
    )
  }

  return (
    <div className={classes.LoginBox}>
      <Fragment>
        {formErrorMessage && (
          <InjectHTML
            styleType="p3"
            fontType="regularFont"
            className={classes.formError}
            value={formErrorMessage}
          />
        )}
        <form>
          <div className={classes.row}>
            <div className="col-md-12">
              {renderInput(
                'orderNumber',
                orderNumber?.value,
                orderPlaceholder?.value,
              )}
            </div>
          </div>
          <div className={classes.row2}>
            <div className={classes.halfCol}>
              {renderInput(
                'lastName',
                lastName?.value,
                lastnamePlaceholder?.value,
              )}
            </div>
            <div className={classes.halfCol}>
              {renderInput('zipCode', zipCode?.value, zipPlaceholder?.value)}
            </div>
          </div>
          <div className={classes.formCTA}>
            <Typography styleType="p2" tagType="p">
              <div className={classes.requiredFields}>
                <span className={classes.red}>*</span>
                {allFieldsAreRequired?.value}
              </div>
            </Typography>
            {isLoading ? (
              <Loading className={classes.loader} />
            ) : (
              <div className={classes.buttonWrapper}>
                <Button
                  type="button"
                  variant="primary"
                  onClick={handleSubmit}
                  className={classes.btn}
                  text={continueButton?.value}
                  disabled={!isFormValid}
                />
              </div>
            )}
          </div>
          <ReCAPTCHA
            sitekey={process?.env?.CAPTCHA_INVIS_KEY || ''}
            size="invisible"
            ref={recaptchaRef}
          />
        </form>
      </Fragment>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  inputContainer: {
    margin: '10px 24px',
    width: `calc(100% - 48px)`,
    '& .MuiFormHelperText-root': {
      color: colors.main.inputError,
      marginLeft: 4,
      marginTop: 8,
      width: 'fit-content',
    },
    [breakpoints.down('xs')]: {
      margin: '10px 0px',
      width: `100%`,
    },
    fontWeight: 'bolder',
    fontFamily: 'PP Object Sans',
    '& input': {
      padding: '1rem 1rem',
    },
    '& div': {
      height: '48px',
    },
  },
  borderPrimary: {
    '& div': {
      border: `1px solid ${colors.main.inputError}`,
    },
  },
  LoginBox: {
    width: '100%',
    maxWidth: '630px',
    padding: '1rem',
    background: colors.main.white,
    border: '1px solid',
    borderColor: colors.main.grayBox,
  },
  row: {
    marginRight: '-15px',
    marginLeft: '-15px',
    width: '100%',
    paddingBottom: '1rem',
    [breakpoints.down('sm')]: {
      marginLeft: 0,
      marginRight: 0,
    },
  },
  row2: {
    marginRight: '-15px',
    marginLeft: '-15px',
    width: '100%',
    display: 'flex',
    paddingBottom: '1rem',
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      marginLeft: 0,
      marginRight: 0,
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
  formCTA: {
    fontFamily: 'PP Object Sans Regular',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  requiredFields: {
    flex: 1,
    color: colors.main.midnightExpress,
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
  loader: {
    marginTop: 16,
    marginBottom: 24,
    height: 50,
  },
  buttonWrapper: {
    fontSize: '1rem',
    fontFamily: 'PP Object Sans',
    fontWeight: 400,
    lineHeight: '1.25',
    padding: '0rem 2.5rem',
    [breakpoints.down('sm')]: {
      padding: 0,
    },
  },
  btn: {
    borderRadius: '0.4rem',
    border: '1px',
  },
  red: {
    color: colors.main.brightRed,
    fontWeight: 'bolder',
  },
}))

export default OrderLoginForm
