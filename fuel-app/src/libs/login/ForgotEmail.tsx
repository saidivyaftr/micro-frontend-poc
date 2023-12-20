import { makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import { Button, Typography, Modal } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import { Input } from 'src/ui-kit'
import { isValidMobileNumber } from 'src/utils/validator'
import ActionModal from '../register/components/ActionModal'
import { loginSlice } from 'src/redux/slicers'
import { useDispatch } from 'react-redux'
import { useAppData } from 'src/hooks'

const ForgotEmail = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const {
    title,
    subTitle,
    info,
    mobileNumberText,
    validationError,
    submitBtnText,
    cantVerify,
    tryAnotherWay,
  } = useAppData('forgotEmail', true)

  const mobileNotFound = useAppData('mobileNotFound', true)
  // Initial data management
  const initialFormState = {
    value: '',
  }
  const [form, setForm] = useState(initialFormState)
  const [errors, setErrors] = useState<any>({})
  const [isMobileValid, setIsMobileValid] = useState<boolean>(false)
  const [isErrorState, setIsErrorState] = useState<boolean>(false)
  const [openDialog, setOpenDialog] = useState<boolean>(false)

  const handleChange = (event: any) => {
    const updatedForm = { ...form }
    updatedForm.value = event.target.value
    setForm(updatedForm)
    if (isValidMobileNumber(event.target.value)) {
      setIsMobileValid(true)
      setIsErrorState(false)
      setErrors({})
    } else {
      setErrors({ text: validationError?.value })
      setIsErrorState(true)
      setIsMobileValid(false)
    }
  }

  const handleSubmit = () => {
    //API call.
    dispatch(
      loginSlice.actions.handleLogin({
        type: 'setStep',
        step: 'CONFIRM_MOBILE_OTP',
      }),
    )
  }

  const btn1Handler = () => {
    setOpenDialog(false)
  }

  const btn2Handler = () => {
    setOpenDialog(false)
    //redirect to recover email screen once its implemented
  }

  return (
    <div>
      <Typography styleType="h4" tagType="h3" className={classes.title}>
        {title?.value}
      </Typography>
      <Typography styleType="p1" tagType="p" className={classes.subTitle}>
        {subTitle?.value}
      </Typography>
      <Typography styleType="p1" tagType="p" className={classes.subTitle}>
        {info?.value}
      </Typography>
      <form>
        <div className={classes.row}>
          <label>
            <Typography fontType="boldFont">
              {mobileNumberText?.value}
            </Typography>
          </label>
          <Input
            value={form.value}
            fullWidth
            onChange={handleChange}
            className={classes.inputContainer}
            isError={isErrorState}
            helperText={errors.text}
          />
        </div>
        <Button
          type="button"
          variant="primary"
          hoverVariant="primary"
          className={classes.submitBtn}
          text={submitBtnText?.value}
          disabled={!isMobileValid}
          onClick={handleSubmit}
        />
        <div className={classes.tryAnotherWayContainer}>
          <Typography>{cantVerify?.value}</Typography>
          <div className={classes.tryAnotherWayText}>
            <Typography
              fontType="boldFont"
              className={classes.tryAnotherWayTypography}
            >
              {tryAnotherWay?.value}
            </Typography>
          </div>
        </div>
      </form>
      <Modal
        modalOpen={openDialog}
        setModalOpen={setOpenDialog}
        stopDefaultExit={true}
        modalContent={
          <ActionModal
            data={mobileNotFound}
            btn1Handler={btn1Handler}
            btn2Handler={btn2Handler}
          />
        }
      />
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    paddingBottom: 8,
    marginBottom: 16,
    marginTop: 16,
  },
  row: {
    marginBottom: 16,
    marginTop: 32,
    [breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  title: {
    textAlign: 'center',
  },
  subTitle: {
    margin: '16px 0px',
  },
  button: {
    maxWidth: 700,
    [breakpoints.down('sm')]: {
      marginTop: 8,
    },
  },
  inputContainer: {
    '& .MuiFormHelperText-root': {
      color: colors.main.error,
      marginLeft: 4,
      marginTop: 8,
    },
    '& .MuiFilledInput-root': {
      borderRadius: 32,
      marginTop: 8,
    },
    '& input': {
      borderRadius: 32,
      padding: '8px 16px',
      height: 40,
    },
    [breakpoints.down('xs')]: {
      margin: '10px 0px',
      width: `100%`,
    },
    fontWeight: 'bolder',
    fontFamily: 'PP Object Sans',
  },
  submitBtn: {
    margin: '32px auto',
    maxWidth: 250,
    display: 'block',
  },
  tryAnotherWayContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: 16,
  },
  tryAnotherWayText: {
    textDecoration: 'underline',
    cursor: 'pointer',
    '&:hover': {
      color: `${colors.main.brightRed} !important`,
    },
  },
  tryAnotherWayTypography: {
    '&:hover': {
      color: `${colors.main.brightRed} !important`,
    },
  },
}))

export default ForgotEmail
