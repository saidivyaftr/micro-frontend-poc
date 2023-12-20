import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Button } from '@/shared-ui/components'
import { CheckboxCheck, CheckboxUnCheck } from 'src/blitz/assets/react-icons'
import colors from '@/shared-ui/colors'
import { PP_OBJECT_SANS } from 'src/constants/fontFamilyNames'
import { Input, Checkbox } from 'src/ui-kit'
import { useFormik } from 'formik'
import { addContact } from './types'
import { useAppData } from 'src/hooks'
import { ErrorIcon } from 'src/blitz/assets/react-icons'
import { emailRegExp } from 'src/constants/regex'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'

const AddEmailAddress = (props: addContact) => {
  const classes = useStyles()
  const { updateEditState } = props
  const contactInformationData = useAppData('contactInformationData', true)
  const {
    addEmailErrorMessage,
    addNewEmailLabel,
    cancelBtn,
    setAsPrimaryEmail,
    verifyLabel,
  } = contactInformationData
  const [isSubmitInProgress, setSubmitInProgress] = useState(false)
  useEffect(() => {
    return () => {
      setSubmitInProgress(false)
    }
  }, [])
  const formik = useFormik({
    initialValues: {
      email: '',
      isPrimary: false,
    },
    validate: (values) => {
      const errors: any = {}
      if (!values.email || !emailRegExp.test(values.email)) {
        errors.email = addEmailErrorMessage?.value
      }
      return errors
    },
    onSubmit: async (values) => {
      setSubmitInProgress(true)
      const { email, isPrimary } = values
      DTMClient.triggerEvent(
        {
          events: 'event14',
          eVar14: 'my profile:contact information:add email address',
        },
        'tl_o',
        'my profile:contact information:verify add address',
      )
      updateEditState({
        verifyContact: true,
        verifyContactValue: email,
        verifyContactPrimary: isPrimary,
        hasApiFailed: false,
      })
    },
  })

  const closeAddEmailForm = () => {
    updateEditState({
      isAddingNewContactItem: false,
      hasApiFailed: false,
    })
  }

  const renderLabel = (label: string) => {
    return (
      <Typography className={classes.label} styleType="p2" fontType="boldFont">
        {label}
      </Typography>
    )
  }

  const getInfoText = (label: string | undefined) => {
    return (
      <>
        {label && (
          <div className={classes.errorMessage}>
            <ErrorIcon /> <div>{label}</div>
          </div>
        )}
      </>
    )
  }
  return (
    <div className={classes.editSection}>
      <form onSubmit={formik.handleSubmit}>
        <div className={classes.fieldSection}>
          {renderLabel(addNewEmailLabel?.value)}
          <Input
            className={classes.inputContainer}
            inputClassName={classes.input}
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            helperText={getInfoText(formik?.errors?.email)}
            isError={Boolean(formik.errors.email)}
          />
        </div>
        <div className={classes.fieldSection}>
          <Checkbox
            label={setAsPrimaryEmail?.value}
            name="isPrimary"
            checked={formik.values.isPrimary}
            setValue={(e) => {
              formik.handleChange(e)
              return ''
            }}
            helperText={formik.errors.isPrimary}
            isError={Boolean(formik.errors.isPrimary)}
            checkedIcon={<CheckboxCheck />}
            uncheckedIcon={<CheckboxUnCheck />}
          />
        </div>
        <div className={classes.actionBtnContainer}>
          <Button
            type="button"
            variant="secondary"
            buttonSize="small"
            disabled={Object.keys(formik.errors).length > 0}
            isBusy={isSubmitInProgress}
            loadingVariant="white"
            text={verifyLabel?.value}
            className={classes.btn}
            onClick={formik.handleSubmit as any}
          />
          <Button
            type="button"
            variant="lite"
            buttonSize="small"
            className={classes.cancelBtn}
            onClick={closeAddEmailForm}
            disabled={formik.isSubmitting}
            text={cancelBtn?.value}
          />
        </div>
      </form>
    </div>
  )
}

export default AddEmailAddress

const useStyles = makeStyles(() => ({
  sectionItem: {
    marginBottom: 8,
  },

  editSection: {
    background: colors.main.secondaryLight,
    padding: 16,
    borderRadius: 16,
    margin: '0 -.5rem',
    marginBottom: 32,
  },
  btn: {
    maxWidth: 120,
    minWidth: 120,
    marginRight: 16,
    padding: '0 0.625rem',
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
  menuItem: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  address: {
    maxWidth: 300,
  },
  fieldSection: {
    marginTop: 7,
  },
  inputContainer: {
    borderRadius: 32,
    width: '100%',
  },
  input: {
    borderRadius: '2rem !important',
    border: `0.063rem solid ${colors.main.dark}`,
    '& input': {
      padding: '.5rem 1rem',
      height: 50,
    },
    '& .MuiInputBase-root': {
      // border: 0,
      background: 'transparent',
    },
  },
  errorMessage: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '0.188rem',
    fontSize: '0.75rem',
    lineHeight: '0.875rem',
  },
  label: {
    paddingBottom: '.5rem',
  },
}))
