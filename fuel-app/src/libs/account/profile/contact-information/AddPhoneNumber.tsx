import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Button } from '@/shared-ui/components'
import { CheckboxCheck, CheckboxUnCheck } from 'src/blitz/assets/react-icons'
import colors from '@/shared-ui/colors'
import { PP_OBJECT_SANS } from 'src/constants/fontFamilyNames'
import { removeDashes } from 'src/utils/mobile-helpers'
import { Input, Checkbox } from 'src/ui-kit'
import { useFormik } from 'formik'
import { addContact } from './types'
import { useAppData } from 'src/hooks'
import { useActiveAccountId } from 'src/selector-hooks'
import APIClient from 'src/api-client'
import { useDispatch } from 'react-redux'
import { fetchPhoneNumbers } from 'src/redux/slicers/profile'
import { ErrorIcon } from 'src/blitz/assets/react-icons'
import { RegExpValidPhoneNumber } from 'src/constants/regex'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'

const AddPhoneNumber = (props: addContact) => {
  const classes = useStyles()
  const activeAccountId = useActiveAccountId()
  const contactInformationData = useAppData('contactInformationData', true)
  const { updateEditState } = props
  const dispatch = useDispatch()
  const [submitButtonLabel, setsubmitButtonLabel] = useState('verify')
  const [isSubmitInProgress, setSubmitInProgress] = useState(false)
  useEffect(() => {
    return () => {
      setSubmitInProgress(false)
    }
  }, [])

  const {
    addPhoneNumberErrorMessage,
    addNewNumberLabel,
    saveBtn,
    cancelBtn,
    setAsPrimaryNumber,
    isMobileNumberLabel,
    verifyLabel,
  } = contactInformationData

  const setHasApiFailed = (status: boolean) => {
    updateEditState({ hasApiFailed: status })
  }

  const formik = useFormik({
    initialValues: {
      number: '',
      isMobile: true,
      isPrimary: false,
    },
    validate: (values) => {
      const errors: any = {}
      const phoneNumber = removeDashes(values.number)
      if (
        !values.number ||
        phoneNumber.length != 10 ||
        !RegExpValidPhoneNumber.test(phoneNumber)
      ) {
        errors.number = addPhoneNumberErrorMessage?.value
      }
      return errors
    },
    onSubmit: async (values) => {
      setSubmitInProgress(true)
      setHasApiFailed(false)
      const { number, isMobile, isPrimary } = values
      try {
        if (!isMobile) {
          const formattedNumber = removeDashes(number)
          const addNewNumber = {
            number: formattedNumber,
            isPrimary,
            type: 'Alternate',
          }
          await APIClient.addPhoneNumber(activeAccountId, addNewNumber)

          DTMClient.triggerEvent(
            {
              events: 'event14',
              eVar14: 'my profile:contact information:add phone number',
            },
            'tl_o',
            'my profile:contact information:add phone number',
          )
          updateEditState({
            isAddingNewContactItem: false,
          })
          dispatch(fetchPhoneNumbers(activeAccountId))
        } else {
          updateEditState({
            verifyContact: true,
            verifyContactValue: number,
            verifyContactPrimary: isPrimary,
            hasApiFailed: false,
          })
        }
      } catch (error) {
        setHasApiFailed(true)
      }
    },
  })

  const renderLabel = (label: string) => {
    return (
      <Typography className={classes.label} styleType="p2" fontType="boldFont">
        {label}
      </Typography>
    )
  }

  const closeAddEmailForm = () => {
    updateEditState({
      isAddingNewContactItem: false,
      hasApiFailed: false,
    })
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
          {renderLabel(addNewNumberLabel?.value)}
          <Input
            mask="999-999-9999"
            placeholder="123-456-7890"
            className={classes.inputContainer}
            inputClassName={classes.input}
            name="number"
            value={formik.values.number}
            onChange={formik.handleChange}
            helperText={getInfoText(formik.errors.number)}
            isError={Boolean(formik.errors.number)}
          />
        </div>
        <div className={classes.fieldSection}>
          <Checkbox
            label={isMobileNumberLabel?.value}
            name="isMobile"
            checked={formik.values.isMobile}
            setValue={(e) => {
              formik.handleChange(e)
              formik.values.isMobile
                ? setsubmitButtonLabel(saveBtn?.value)
                : setsubmitButtonLabel(verifyLabel?.value)
              return ''
            }}
            checkedIcon={<CheckboxCheck />}
            uncheckedIcon={<CheckboxUnCheck />}
          />
        </div>
        <div className={classes.fieldSection}>
          <Checkbox
            label={setAsPrimaryNumber?.value}
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
            text={submitButtonLabel}
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

export default AddPhoneNumber

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
    marginTop: 8,
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
