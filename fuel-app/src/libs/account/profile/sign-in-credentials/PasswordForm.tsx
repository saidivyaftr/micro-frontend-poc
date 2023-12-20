import { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Typography, Button } from '@/shared-ui/components'
import {
  WarningOutline,
  EyeClosed,
  EyeOpen,
  CheckMarkBlackRound,
  ErrorIcon,
} from 'src/blitz/assets/react-icons'
import colors from '@/shared-ui/colors'
import { PP_OBJECT_SANS } from 'src/constants/fontFamilyNames'
import { Input } from 'src/ui-kit'
import { useFormik } from 'formik'
import {
  atLeastOneCapitalLetterRegExp,
  atLeastOneNumberRegExp,
} from 'src/constants'
import { useAppData } from 'src/hooks'
import APIClient from 'src/api-client'
import clx from 'classnames'
import PasswordChangeSuccessModal from './PasswordChangeSuccessModal'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'

const PasswordForm = ({ handleClose }: { handleClose: () => void }) => {
  const classes = useStyles()
  const updatePasswordFormData = useAppData('updatePasswordFormData', true)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [hasApiFailed, setHasApiFailed] = useState(false)
  const [passwordChangeSuccessModalOpen, setPasswordChangeSuccessModalOpen] =
    useState(false)
  const dismissPasswordChangeSuccessModal = () => {
    setPasswordChangeSuccessModalOpen(false)
    handleClose()
  }

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      ruleEightChar: true,
      ruleCapital: true,
      ruleNumber: true,
      ruleMatch: true,
      inputFieldMatchError: false,
    },
    validate: (values) => {
      const errors: any = {}
      if (values.newPassword.length < 8) {
        errors.ruleEightChar = true
      }
      if (!values.newPassword.match(atLeastOneCapitalLetterRegExp)) {
        errors.ruleCapital = true
      }
      if (!values.newPassword.match(atLeastOneNumberRegExp)) {
        errors.ruleNumber = true
      }
      if (
        values.newPassword.length === 0 ||
        values.newPassword != values.confirmPassword
      ) {
        errors.ruleMatch = true
        if (values.confirmPassword.length > 0)
          errors.inputFieldMatchError =
            updatePasswordFormData.inputFieldMatchError.value
      }
      return errors
    },
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true)
      setHasApiFailed(false)
      try {
        await APIClient.changePassword(
          values?.currentPassword,
          values?.newPassword,
        )
        setPasswordChangeSuccessModalOpen(true)

        DTMClient.triggerEvent(
          {
            events: 'event14',
            eVar14: 'my profile:sign in credentials:update password',
          },
          'tl_o',
          'my profile:sign in credentials:update password',
        )
      } catch (error) {
        setHasApiFailed(true)
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

  useEffect(() => {
    if (formik) {
      formik.validateForm()
    }
  }, [])

  return (
    <div className={classes.editSection}>
      <PasswordChangeSuccessModal
        dismissPasswordChangeSuccessModal={dismissPasswordChangeSuccessModal}
        PasswordChangeSuccessModalOpen={passwordChangeSuccessModalOpen}
        setModalOpen={dismissPasswordChangeSuccessModal}
      />
      <Typography
        styleType="p2"
        fontType="boldFont"
        className={classes.sectionItem}
      >
        {updatePasswordFormData?.title?.value}
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <div className={classes.fieldSection}>
          {renderLabel(updatePasswordFormData?.currentPasswordLabel?.value)}
          <Input
            className={[classes.inputContainer, classes.fieldSection]}
            inputClassName={classes.input}
            name="currentPassword"
            id="currentPassword"
            value={formik.values.currentPassword}
            onChange={formik.handleChange}
            type={showCurrentPassword ? 'text' : 'password'}
          />
          <button
            type="button"
            aria-label="current-password"
            className={classes.showHideBtn}
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
          >
            {showCurrentPassword ? <EyeOpen /> : <EyeClosed />}
          </button>
        </div>

        <div className={classes.fieldSection}>
          {renderLabel(updatePasswordFormData?.newPasswordLabel?.value)}

          <Input
            className={[classes.inputContainer, classes.fieldSection]}
            inputClassName={classes.input}
            name="newPassword"
            id="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            type={showNewPassword ? 'text' : 'password'}
          />
          <button
            type="button"
            aria-label="new-password"
            className={classes.showHideBtn}
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? <EyeOpen /> : <EyeClosed />}
          </button>
        </div>

        <div
          className={clx(classes.fieldSection, classes.passwordRulesSection)}
        >
          <Typography styleType="p3">
            {updatePasswordFormData?.passwordRules?.value}
          </Typography>
          <div className={classes.validationItem}>
            {!formik.errors?.ruleEightChar && <CheckMarkBlackRound />}
            {formik.errors?.ruleEightChar && (
              <CheckMarkBlackRound className={classes.disabledCheckmark} />
            )}
            <span>{updatePasswordFormData?.ruleEightChar?.value}</span>
          </div>
          <div className={classes.validationItem}>
            {!formik.errors?.ruleCapital && <CheckMarkBlackRound />}
            {formik.errors?.ruleCapital && (
              <CheckMarkBlackRound className={classes.disabledCheckmark} />
            )}
            <span>{updatePasswordFormData?.ruleCapital?.value}</span>
          </div>
          <div className={classes.validationItem}>
            {!formik.errors?.ruleNumber && <CheckMarkBlackRound />}
            {formik.errors?.ruleNumber && (
              <CheckMarkBlackRound className={classes.disabledCheckmark} />
            )}
            <span>{updatePasswordFormData?.ruleNumber?.value}</span>
          </div>
          <div className={classes.validationItem}>
            {!formik.errors?.ruleMatch && <CheckMarkBlackRound />}
            {formik.errors?.ruleMatch && (
              <CheckMarkBlackRound className={classes.disabledCheckmark} />
            )}
            <span>{updatePasswordFormData?.ruleMatch?.value}</span>
          </div>
        </div>

        <div className={classes.fieldSection}>
          {renderLabel(updatePasswordFormData?.confirmPasswordLabel?.value)}
          <Input
            className={[classes.inputContainer, classes.fieldSection]}
            inputClassName={classes.input}
            name="confirmPassword"
            id="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            type={showConfirmPassword ? 'text' : 'password'}
            isError={
              Boolean(formik.errors?.ruleMatch) &&
              formik.values.confirmPassword.length > 0
            }
            helperText={
              formik.errors?.inputFieldMatchError && (
                <div className={classes.confirmErrorContainer}>
                  <Typography styleType="p4">
                    <>
                      <ErrorIcon className={classes.errorIcon} />
                      {formik.errors?.inputFieldMatchError}
                    </>
                  </Typography>
                </div>
              )
            }
          />
          <button
            type="button"
            aria-label="new-password"
            className={classes.showHideBtn}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOpen /> : <EyeClosed />}
          </button>
        </div>

        {hasApiFailed && (
          <div className={classes.invalidError}>
            <WarningOutline />
            <Typography
              className={classes.invalidErrorMsg}
              fontType="mediumFont"
            >
              {updatePasswordFormData?.errorUpdatingPassword?.value}
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
            text={updatePasswordFormData?.saveBtn?.value}
            className={classes.btn}
            onClick={formik.handleSubmit as any}
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
            text={updatePasswordFormData?.cancelBtn?.value}
          />
        </div>
      </form>
    </div>
  )
}

export default PasswordForm

const useStyles = makeStyles(() => ({
  sectionItem: {
    marginBottom: 8,
  },
  errorIcon: {
    marginRight: '4px',
    verticalAlign: 'top',
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
    marginTop: 16,
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
    position: 'relative',
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
  showHideBtn: {
    background: 'transparent',
    border: 0,
    position: 'absolute',
    right: '8px',
    top: 'calc(50% - 6px)',
    '&:hover': {
      cursor: 'pointer',
      '& svg': {
        '& path': {
          fill: colors.main.brightRed,
        },
      },
    },
  },
  confirmShowHideButton: {
    background: 'transparent',
    border: 0,
    position: 'absolute',
    right: '8px',
    top: 'calc(50% - 13px)',
    '&:hover': {
      cursor: 'pointer',
      '& svg': {
        '& path': {
          fill: colors.main.brightRed,
        },
      },
    },
  },
  inputContainer: {
    width: '100%',
    marginTop: '0.5rem',
    marginBottom: '1rem',
    position: 'relative',
    '& input': {
      border: `1px solid ${colors.main.borderGrey}`,
      height: 50,
      borderRadius: '2rem',
      width: '100%',
      padding: '0.75rem 1rem',
      outline: 'none',
      fontSize: 18,
      fontFamily: PP_OBJECT_SANS,
      '&:hover': {
        borderColor: colors.main.greenishBlue,
      },
    },
  },
  disabledCheckmark: {
    opacity: '0.3',
  },
  confirmErrorContainer: {
    minHeight: '16px',
  },
  validationItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '8px',
  },
  passwordRulesSection: {
    marginBottom: 32,
  },
}))
