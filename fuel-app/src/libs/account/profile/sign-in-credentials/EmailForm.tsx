import { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Typography, Button } from '@/shared-ui/components'
import { WarningOutline, ErrorIcon } from 'src/blitz/assets/react-icons'
import colors from '@/shared-ui/colors'
import { PP_OBJECT_SANS } from 'src/constants/fontFamilyNames'
import { Input } from 'src/ui-kit'
import { useFormik } from 'formik'
import { emailRegExp } from 'src/constants'
import { useAppData } from 'src/hooks'
import APIClient from 'src/api-client'
import { VerificationToken } from 'src/libs/account/profile/contact-information/types'
import {
  useActiveAccountId,
  useProfileEmailAddresses,
} from 'src/selector-hooks'
import { Skeleton } from '@/shared-ui/components'
import { fetchEmailAddresses } from 'src/redux/slicers/profile'
import VerifyEmailOTPModal from 'src/libs/account/shared/modals/VerifyPhoneNumberOTPModal'
import { useDispatch } from 'react-redux'
import { checkSessionAction } from 'src/redux/slicers/session'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { EmailAlreadyRegisteredModal } from './EmailAlreadyRegisteredModal'

const EmailForm = ({
  currentLoginEmail,
  handleClose,
}: {
  accountNumber?: string
  currentLoginEmail?: string
  handleClose: () => void
}) => {
  const classes = useStyles()
  const activeAccountId = useActiveAccountId()
  const contactInformationData = useAppData('contactInformationData', true)
  const signInCredentialsData = useAppData('signInCredentialsData', true)
  const updateEmailFormData = useAppData('updateEmailFormData', true)
  const { isLoading: isEmailDataLoading, data: emailData } =
    useProfileEmailAddresses()
  const [hasApiFailed, setHasApiFailed] = useState(false)
  const [OTPDialogOpen, setOTPDialogOpen] = useState(false)
  const [verifyEmail, setVerifyEmail] = useState('')
  const [tokenOptions, setTokenOptions] = useState<any>(undefined)
  const [validatingOTP, setValidatingOTP] = useState(false)
  const [showAlreadyRegisteredModal, setShowAlreadyRegisteredModal] =
    useState(false)

  const dismissOTPModal = () => {
    setOTPDialogOpen(false)
  }
  const [otpErrorMessage, setOtpErrorMessage] = useState<string>('')
  const dispatch = useDispatch()

  const getOTPToken = async (emailAddress: any) => {
    const { data = {} } = await APIClient.verifyEmailAddresses(
      activeAccountId,
      {
        details: emailAddress,
        type: 'Email',
        skipSearch: true,
      },
    )
    const tokenData: VerificationToken = data

    const { token, authenticationOptions }: any = tokenData
    const id = authenticationOptions?.find(
      (item: any) => item?.type === 'email',
    )?.id
    return {
      token,
      authentication: {
        id,
      },
    }
  }

  const getAuthenticationToken = (tokenData: VerificationToken) => {
    const { token, authenticationOptions }: any = tokenData
    const id = authenticationOptions?.find(
      (item: any) => item?.type === 'email',
    )?.id
    return {
      token,
      authentication: {
        id,
      },
    }
  }

  const validateOTP = async (OTPvalue: number) => {
    setHasApiFailed(false)
    setValidatingOTP(true)
    try {
      const {
        authentication: { id },
        token,
      }: any = tokenOptions
      await generateAndValidateOTP({
        step: 2,
        token,
        skipSearch: true,
        type: 'Email',
        details: verifyEmail,
        authentication: {
          id,
          value: OTPvalue,
        },
      })
      await APIClient.changeProfileEmail(verifyEmail)
      dispatch(checkSessionAction(false))
      dispatch(fetchEmailAddresses(activeAccountId))
      handleClose()
    } catch (e: any) {
      const emailAlreadyRegistered =
        e?.response?.data?.message?.includes('already exists') ||
        e?.response?.status == '409'
      if (emailAlreadyRegistered) {
        setShowAlreadyRegisteredModal(true)
        setOTPDialogOpen(false)
      } else {
        setHasApiFailed(true)
        setOtpErrorMessage(
          contactInformationData?.verifyNumber?.targetItem?.invalidOtp?.value ||
            '',
        )
      }
    }
    setValidatingOTP(false)
  }

  const resendOTP = async () => {
    setHasApiFailed(true)
    try {
      await generateAndValidateOTP({
        step: 1,
        ...tokenOptions,
      })
    } catch (e) {
      setHasApiFailed(true)
    }
  }
  const generateAndValidateOTP = async (values: any) => {
    const { data = {} } = await APIClient.verifyEmailAddresses(
      activeAccountId,
      values,
    )
    const tokenData: VerificationToken = data
    const updatedToken = getAuthenticationToken(tokenData)
    setTokenOptions(updatedToken)
    return tokenData
  }

  const triggerOTPtoEmail = async (email: string) => {
    setHasApiFailed(false)
    setVerifyEmail(email)
    try {
      const tokenOptions = await getOTPToken(email)
      setTokenOptions(tokenOptions)
      await generateAndValidateOTP({
        step: 1,
        ...tokenOptions,
      })
      setOTPDialogOpen(true)

      DTMClient.triggerEvent(
        {
          events: 'event14',
          eVar14: 'my profile:sign in credentials:verify email address',
        },
        'tl_o',
        'my profile:sign in credentials:verify email address',
      )
    } catch (e: any) {
      const emailAlreadyRegistered =
        e?.response?.data?.message?.includes('already exists')
      if (emailAlreadyRegistered) {
        setShowAlreadyRegisteredModal(true)
        setOTPDialogOpen(false)
      } else {
        setHasApiFailed(true)
      }
    }
  }

  const formik = useFormik({
    initialValues: {
      enteredEmail: '',
      reEnteredEmail: '',
      isPrimary: true,
    },
    validate: (values) => {
      const errors: any = {}
      if (!values.enteredEmail.match(emailRegExp)) {
        errors.enteredEmail = updateEmailFormData?.required?.value
      }
      if (values.enteredEmail != values.reEnteredEmail) {
        errors.reEnteredEmail = updateEmailFormData?.match?.value
      }
      return errors
    },
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true)
      setHasApiFailed(false)
      setOtpErrorMessage('')
      const { enteredEmail } = values
      try {
        const response = await APIClient.isEmailRegistered(enteredEmail)
        const emailAlreadyRegistered = response?.data?.isRegistered
        if (emailAlreadyRegistered) {
          setShowAlreadyRegisteredModal(true)
          setOTPDialogOpen(false)
          setSubmitting(false)
          return
        }

        if (
          emailData.find((record) => {
            return record.address.toLowerCase() === enteredEmail.toLowerCase()
          })
        ) {
          await APIClient.changeProfileEmail(enteredEmail)
          dispatch(checkSessionAction(false))
          handleClose()

          DTMClient.triggerEvent(
            {
              events: 'event14',
              eVar14: 'my profile:sign in credentials:update email address',
            },
            'tl_o',
            'my profile:sign in credentials:update email address',
          )
        } else {
          await triggerOTPtoEmail(enteredEmail)
          setOTPDialogOpen(true)
        }
      } catch (error: any) {
        const emailAlreadyRegistered = error?.response?.status == '409'
        if (emailAlreadyRegistered) {
          setShowAlreadyRegisteredModal(true)
          setOTPDialogOpen(false)
        } else {
          setHasApiFailed(true)
        }
      }
      setSubmitting(false)
    },
  })

  const renderLabel = (label: string) => {
    return (
      <Typography styleType="p2" fontType="boldFont">
        {label}
      </Typography>
    )
  }

  if (isEmailDataLoading) {
    return <PrpfileInformationSkeleton />
  }

  return (
    <div className={classes.editSection}>
      <Typography
        styleType="p2"
        fontType="boldFont"
        className={classes.sectionItem}
      >
        {signInCredentialsData?.email?.value}
      </Typography>
      <Typography styleType="p2">{currentLoginEmail}</Typography>
      <div>
        <div className={classes.fieldSection}>
          {renderLabel(updateEmailFormData?.enter?.value)}
          <Input
            placeholder={'example@email.com'}
            className={classes.inputContainer}
            inputClassName={classes.input}
            name="enteredEmail"
            value={formik.values.enteredEmail}
            onChange={formik.handleChange}
            isError={Boolean(formik.errors.enteredEmail)}
            helperText={
              formik.errors?.enteredEmail && (
                <div className={classes.confirmErrorContainer}>
                  <Typography styleType="p3">
                    <>
                      <ErrorIcon className={classes.errorIcon} />
                      {formik.errors?.enteredEmail}
                    </>
                  </Typography>
                </div>
              )
            }
          />
        </div>
        <div className={classes.fieldSection}>
          {renderLabel(updateEmailFormData?.reEnter?.value)}
          <Input
            placeholder={'example@email.com'}
            className={classes.inputContainer}
            inputClassName={classes.input}
            name="reEnteredEmail"
            value={formik.values.reEnteredEmail}
            onChange={formik.handleChange}
            helperText={
              formik.errors?.reEnteredEmail && (
                <div className={classes.confirmErrorContainer}>
                  <Typography styleType="p3">
                    <>
                      <ErrorIcon className={classes.errorIcon} />
                      {formik.errors?.reEnteredEmail}
                    </>
                  </Typography>
                </div>
              )
            }
            isError={Boolean(formik.errors.reEnteredEmail)}
          />
        </div>
        {hasApiFailed && (
          <div className={classes.invalidError}>
            <WarningOutline />
            <Typography
              className={classes.invalidErrorMsg}
              fontType="mediumFont"
            >
              {updateEmailFormData?.errorUpdatingEmail?.value}
            </Typography>
          </div>
        )}
        <div className={classes.actionBtnContainer}>
          <Button
            type="button"
            variant="secondary"
            buttonSize="small"
            disabled={Object.keys(formik.errors).length > 0}
            isBusy={formik.isSubmitting}
            loadingVariant="white"
            text={updateEmailFormData?.saveBtn?.value}
            className={classes.btn}
            onClick={() => formik.handleSubmit()}
          />
          <Button
            type="button"
            variant="lite"
            buttonSize="small"
            className={classes.cancelBtn}
            onClick={() => {
              setHasApiFailed(false)
              handleClose()
            }}
            disabled={formik.isSubmitting}
            text={updateEmailFormData?.cancelBtn?.value}
          />
        </div>
        <VerifyEmailOTPModal
          dismissOTPModal={dismissOTPModal}
          OTPDialogOpen={OTPDialogOpen}
          phoneNumber={verifyEmail}
          validateOTP={validateOTP}
          isSubmitLoading={validatingOTP}
          resendOTP={resendOTP}
          errorMessage={otpErrorMessage}
          isTypeEmail={true}
        />
        <EmailAlreadyRegisteredModal
          isOpen={showAlreadyRegisteredModal}
          handleClose={() => setShowAlreadyRegisteredModal(false)}
          closeFormEdit={handleClose}
        />
      </div>
    </div>
  )
}

const PrpfileInformationSkeleton = () => {
  return (
    <div>
      <Skeleton width={'70%'} height={30} />
      <Skeleton width={'80%'} height={90} />
      <Skeleton width={'60%'} height={30} />
    </div>
  )
}

export default EmailForm

const useStyles = makeStyles(() => ({
  sectionItem: {
    marginBottom: 8,
  },
  editSection: {
    background: colors.main.secondaryLight,
    padding: 16,
    borderRadius: 16,
    margin: '0px -8px',
    marginBottom: 32,
  },
  btn: {
    maxWidth: 120,
    minWidth: 120,
    marginRight: 16,
    padding: '0px 10px',
  },
  cancelBtn: {
    fontFamily: PP_OBJECT_SANS,
    textDecoration: 'underline',
    '&:disabled': {
      cursor: 'not-allowed',
    },
  },
  actionBtnContainer: {
    marginTop: 32,
    display: 'flex',
  },
  invalidError: {
    display: 'flex',
    gap: 4,
    '& svg': {
      '& path': {
        fill: colors.main.errorRed,
      },
    },
  },
  invalidErrorMsg: {
    color: colors.main.errorRed,
  },
  fieldSection: {
    marginTop: 16,
  },
  inputContainer: {
    borderRadius: 32,
    width: '100%',
    marginBottom: '12px',
  },
  input: {
    borderRadius: '32px !important',
    border: `1px solid ${colors.main.dark}`,
    '& input': {
      padding: '8px 16px',
      height: 50,
    },
    '& .MuiInputBase-root': {
      // border: 0,
      background: 'transparent',
    },
  },
  errorIcon: {
    marginRight: '4px',
    verticalAlign: 'top',
  },
  confirmErrorContainer: {
    minHeight: '16px',
  },
}))
