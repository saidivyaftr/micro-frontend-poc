/* eslint-disable @typescript-eslint/indent */
import {
  ACCOUNT_NUMBER_REQUIRED,
  EXPRESS_PAY_ACCOUNT_ERROR,
  EXPRESS_PAY_ACCOUNT_INFO,
  EXPRESS_PAY_EMAIL_INFO,
  EXPRESS_PAY_ZIPCODE_INFO,
  VALID_ACCOUNT_NUMBER,
  VALID_ZIP_CODE,
} from 'src/constants'
import { Formik, FormikHelpers, FormikProps, Form, Field } from 'formik'
import { makeStyles } from '@material-ui/core/styles'
import colors from '@/shared-ui/colors'
import { InputField } from '../account/payments/shared/payment-form-fields/InputField'
import { Button, TooltipPopover, Typography } from '@/shared-ui/components'
import FormHelperText from '@material-ui/core/FormHelperText'
import * as yup from 'yup'
import { ExpressPayLoginPayload } from 'src/api-client/types'
import { Info } from '../account/shared/Info'
import InfoIconWhite from '@/shared-ui/react-icons/info-icon-white'
import { useAppData } from '../../hooks'
import { PP_OBJECT_SANS } from 'src/constants/fontFamilyNames'

type ExpressPaymentFormValue = {
  accountNumber: string
  email: string
  zipCode: string
}

type ExpressPayLoginFormTypes = {
  submitAccountDetails: (params: ExpressPayLoginPayload) => void
  loginError: boolean
}

const ExpressPayLoginForm = ({
  submitAccountDetails,
  loginError,
}: ExpressPayLoginFormTypes) => {
  const classes = useStyles()
  const {
    title,
    subTitle,
    description,
    accountNumber,
    emailAddress,
    zipCode,
    continueBtn,
  } = useAppData('expresspayLogin', true)

  const expressPayFields = [
    {
      type: 'text',
      name: 'accountNumber',
      label: accountNumber?.value,
      info: EXPRESS_PAY_ACCOUNT_INFO,
    },
    {
      type: 'email',
      name: 'email',
      label: emailAddress?.value,
      info: EXPRESS_PAY_EMAIL_INFO,
    },
    {
      type: 'text',
      name: 'zipCode',
      label: zipCode?.value,
      info: EXPRESS_PAY_ZIPCODE_INFO,
    },
  ]

  const handleLoginSubmit = (values: ExpressPaymentFormValue) => {
    submitAccountDetails({
      zipCode: String(values.zipCode).replace(/\s/g, ''),
      email: String(values.email),
      accountNumber: String(values.accountNumber).replace(/\s/g, ''),
    })
  }
  const validationSchema = yup.object().shape({
    accountNumber: yup
      .string()
      .matches(/^\d+$/, VALID_ACCOUNT_NUMBER)
      .min(17, VALID_ACCOUNT_NUMBER)
      .max(17, VALID_ACCOUNT_NUMBER)
      .required(ACCOUNT_NUMBER_REQUIRED),
    email: yup.string().email(),
    zipCode: yup
      .string()
      .matches(/^\d+$/, VALID_ZIP_CODE)
      .min(5, VALID_ZIP_CODE)
      .max(5, VALID_ZIP_CODE),
  })

  const getMaxLength = (field: string) => {
    switch (field) {
      case 'accountNumber':
        return 17
      case 'zipCode':
        return 5
      default:
        return null
    }
  }

  return (
    <>
      {loginError && (
        <div className={classes.loginError}>
          <Info type="error" message={EXPRESS_PAY_ACCOUNT_ERROR} />
        </div>
      )}
      <Typography tagType="h1" styleType="h3" className={classes.pageTitle}>
        {title?.value}
      </Typography>
      <Typography tagType="h2" styleType="h5">
        {subTitle?.value}
      </Typography>
      <Typography tagType="p" styleType="p2">
        {description?.value}
      </Typography>
      <div className={classes.formContainer}>
        <div>
          <Formik
            initialValues={{
              accountNumber: '',
              email: '',
              zipCode: '',
            }}
            noValidate
            validationSchema={validationSchema}
            onSubmit={(
              values: ExpressPaymentFormValue,
              formikHelpers: FormikHelpers<ExpressPaymentFormValue>,
            ) => {
              formikHelpers.setSubmitting(false)
              handleLoginSubmit(values)
            }}
          >
            {(formikProps: FormikProps<ExpressPaymentFormValue>) => (
              <Form noValidate autoComplete="off">
                {expressPayFields.map(({ type, name, label, info }) => (
                  <div key={name} className={classes.fieldContainer}>
                    <FormHelperText
                      style={{
                        fontSize: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {label}{' '}
                      <TooltipPopover
                        tooltipContent={info}
                        tooltipIcon={<InfoIconWhite />}
                      />
                    </FormHelperText>
                    <Field
                      type={type}
                      name={name}
                      component={InputField}
                      className={classes.inputField}
                      size="small"
                      restrictToNumber={
                        name === 'accountNumber' || name === 'zipCode'
                      }
                      placeholder={label}
                      fullWidth={name !== 'zipCode'}
                      disabled={
                        name === 'email'
                          ? Boolean(formikProps.values.zipCode)
                          : name === 'zipCode'
                          ? Boolean(formikProps.values.email)
                          : false
                      }
                      inputProps={{ maxLength: getMaxLength(name) }}
                    />
                  </div>
                ))}
                <div className={classes.formFooter}>
                  <Button
                    type="submit"
                    variant="primary"
                    text={continueBtn?.value}
                    buttonSize="large"
                    disabled={
                      !formikProps.isValid ||
                      formikProps.isSubmitting ||
                      !(formikProps.values.email || formikProps.values.zipCode)
                    }
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  formContainer: {
    marginTop: '1rem',
    padding: '3.5rem',
    border: `1px solid ${colors.main.grayBox}`,
    maxWidth: '63rem',
    width: '60%',
    '&.Mui-disabled': {
      cursor: 'not-allowed !important',
    },

    [breakpoints.down('xs')]: {
      width: '100%',
      padding: '1rem',
    },
  },
  loginError: {
    width: '60%',
    maxWidth: '63rem',
    [breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  pageTitle: {
    marginBottom: '1rem',
  },
  fieldContainer: {
    marginTop: '1rem',
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: colors.main.brightRed,
      borderWidth: '1px',
    },
    '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
      borderColor: colors.main.brightRed,
      borderWidth: '1px',
    },
    '& p': {
      color: colors.main.dark,
      fontFamily: PP_OBJECT_SANS,
    },
  },
  formFooter: {
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'flex-end',
    flexFlow: 'row nowrap',
    [breakpoints.down('xs')]: {},
  },
  inputField: {
    paddingBottom: '0.5rem',
    '&:focus': {
      borderColor: colors.main.brightRed,
    },
    '& p': {
      color: `${colors.main.brightRed} !important`,
    },
  },
}))

export default ExpressPayLoginForm
