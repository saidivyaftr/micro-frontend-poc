/* eslint-disable @typescript-eslint/no-unused-vars */
import { makeStyles } from '@material-ui/core'
import { completeRegistrationPageData } from '../mockData'
import { Button, InjectHTML } from '@/shared-ui/components'
import { useFormik } from 'formik'
import colors from '@/shared-ui/colors'
import APIClient from '../../../api-client'
import { ACTIVATE_FTR_ID, SITE_ERROR, SITE_INTERACTION } from 'src/constants'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { useMemo, useState } from 'react'
import { State } from 'src/redux/types'
import { useDispatch, useSelector } from 'react-redux'
import { useReCaptcha } from 'next-recaptcha-v3'
import { loginSlice, signInAction } from 'src/redux/slicers/login'
import { login } from 'src/utils/loginHelper'

const CompleteRegistrationForm = () => {
  const {
    choosePasswordTitle,
    TermAndConditions,
    TermAndConditionsMessage,
    submitButtonTitle,
    passwordDescription,
    passwordMismatch,
    confirmPasswordTitle,
  } = completeRegistrationPageData
  const [loading, setLoading] = useState<boolean>(false)
  const { completeRegistration } = useSelector(
    (state: State) => state?.register,
  )

  const { executeRecaptcha } = useReCaptcha()
  const dispatch = useDispatch()

  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      password: '',
      confirmPassword: '',
      termsAndCondition: false,
    },

    validate: (values) => {
      const errors = {
        password: '',
        confirmPassword: '',
        termsAndCondition: '',
      }

      if (!values.password) {
        errors.password = passwordDescription?.value
      }

      if (values.confirmPassword != values.password) {
        errors.confirmPassword = passwordMismatch?.value
      }
      if (!values.termsAndCondition) {
        errors.termsAndCondition = TermAndConditionsMessage?.value
      }
      return errors
    },

    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2))
        setSubmitting(false)
      }, 400)
    },
  })

  const disableFormSubmit = useMemo(() => {
    return (
      formik.errors.password !== '' ||
      formik.errors.confirmPassword !== '' ||
      formik.values.termsAndCondition === false
    )
  }, [formik.values, formik.errors])

  const classes = useStyles()

  const handleSubmit = async () => {
    const params = window.location.href
    const params1 = params.split('/')
    const token = params1[params1.length - 1]

    try {
      setLoading(true)
      const payload: any = {
        password: formik?.values?.password,
        agreeToTerms: true,
      }
      const response = await APIClient.postCompleteRegistration(token, payload)
      if (response) {
        DTMClient.triggerEvent(
          {
            events: 'event14,event21',
            eVar14: ACTIVATE_FTR_ID,
            eVar26: 'Frontier Login',
          },
          'tl_o',
          SITE_INTERACTION,
        )
        const token = await executeRecaptcha('form_submit')
        const values: any = {
          loginId: completeRegistration?.profile_email.trim(),
          password: formik?.values?.password,
          rememberMe: false,
          skipCaptcha: true,
        }
        const formBody = { token, ...values }
        await login(
          formBody,
          () => {
            dispatch(
              loginSlice.actions.handleLogin({
                type: 'setIsLoading',
                isLoading: false,
              }),
            )
          },
          'email invite',
        )
      }
    } catch (e: any) {
      setLoading(false)
      DTMClient.triggerEvent(
        {
          events: 'event88',
          eVar2: 'ftr:Activate Ftr Id',
          eVar88: 'Failed to save password',
        },
        'tl_o',
        SITE_ERROR,
      )
    }
  }

  const handleCancel = async () => {
    window.location.href = '/'
  }
  return (
    <div className={classes.container}>
      <form onSubmit={formik.handleSubmit}>
        <div className={classes.inputContainer}>
          <input
            type="password"
            name="password"
            id="password"
            placeholder={choosePasswordTitle?.value}
            value={formik?.values?.password}
            onFocus={(ev: any) => {
              formik.setFieldTouched(ev.target.password, false)
            }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik?.errors?.password ? (
            <InjectHTML
              tagType="div"
              styleType="p4"
              className={classes.errorText}
              value={formik?.errors?.password}
            />
          ) : null}
        </div>
        <div className={classes.inputContainer}>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={formik?.values?.confirmPassword}
            placeholder={confirmPasswordTitle?.value}
            onFocus={(ev: any) => {
              formik.setFieldTouched(ev.target.confirmPassword, false)
            }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.confirmPassword && formik?.errors?.confirmPassword ? (
            <InjectHTML
              tagType="div"
              styleType="p4"
              className={classes.errorText}
              value={formik?.errors?.confirmPassword}
            />
          ) : null}
        </div>
        <div>
          <input
            type="checkbox"
            name="termsAndCondition"
            checked={formik.values.termsAndCondition}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {TermAndConditions?.value}
        </div>

        {formik.touched.termsAndCondition && formik.errors.termsAndCondition ? (
          <InjectHTML
            tagType="div"
            styleType="p4"
            className={classes.errorText}
            value={formik.errors.termsAndCondition}
          />
        ) : null}
        <Button
          type="submit"
          variant="primary"
          hoverVariant="primary"
          onClick={handleSubmit}
          disabled={disableFormSubmit}
          isBusy={loading}
          className={classes.submitBtn1}
          text={submitButtonTitle?.value}
          buttonSize="large"
        />
        <Button
          type="submit"
          variant="tertiary"
          hoverVariant="primary"
          onClick={handleCancel}
          className={classes.submitBtn2}
          text="Cancel"
          buttonSize="large"
        />
      </form>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  container: {},
  submitBtn1: {
    margin: '1.438rem auto 0 auto',
    fontWeight: 700,
    outline: 'none',
    textTransform: 'none',
  },
  submitBtn2: {
    textTransform: 'none',
    marginLeft: '12px',
    [breakpoints.down('sm')]: {
      marginLeft: 0,
      marginTop: '20px',
    },
  },
  errorText: {
    color: colors.main.error,
    marginLeft: '1rem',
    marginTop: '0.5rem',
  },
  inputContainer: {
    width: '100%',
    marginTop: '0.5rem',
    marginBottom: '1rem',
    position: 'relative',
    '& input , & select': {
      border: `1px solid ${colors.main.borderGrey}`,
      height: 50,
      borderRadius: '2rem',
      width: '100%',
      padding: '0.75rem 1rem',
      outline: 'none',
      fontSize: 18,
      backgroundColor: colors.main.grayWhite,
      fontFamily: 'PP Object Sans',
      '&:hover': {
        borderColor: colors.main.greenishBlue,
      },
    },
  },
}))

export default CompleteRegistrationForm
