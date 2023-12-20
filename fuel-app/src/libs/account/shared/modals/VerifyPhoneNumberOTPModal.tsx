import colors from '@/shared-ui/colors'
import {
  Modal,
  OTPInput,
  Typography,
  Button,
  InjectHTML,
} from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useAppData } from 'src/hooks'
import { VerifiedBadgeIconBlack } from 'src/blitz/assets/react-icons'
import { addBracketAndHypen } from 'src/utils/mobile-helpers'
const OTPModal = ({
  dismissOTPModal,
  phoneNumber = '',
  validateOTP,
  resendOTP,
  OTPDialogOpen,
  errorMessage = '',
  isTypeEmail = false,
  isSubmitLoading,
  isResendOptLoading,
  isVerifySuccess,
}: any) => {
  const classes = useStyles()
  const contactInformationData = useAppData('contactInformationData', true)

  const {
    title,
    description,
    submitBtn,
    resendBtn,
    subTitle,
    emailDescription,
    emailSuccessTitle,
    phoneSuccessTitle,
    okButton,
    invalidOtpMultipleTries,
  } = contactInformationData.verifyNumber.targetItem
  const [OTPvalue, setOTPValue] = useState('')
  const isOTPValid = OTPvalue.length === 6
  const [otpTries, setOtpTries] = useState(0)

  errorMessage =
    otpTries >= 3 && errorMessage.length > 0
      ? invalidOtpMultipleTries?.value
      : errorMessage

  useEffect(() => {
    setOTPValue('')
    return () => {
      setOtpTries(0)
    }
  }, [OTPDialogOpen])

  useEffect(() => {
    if (errorMessage) {
      setOTPValue('')
    }
  }, [errorMessage])

  const getSuccessMessage = (contactValue: string) => {
    return (
      <div className={classes.successMessage}>
        <div>{contactValue}</div>{' '}
        <VerifiedBadgeIconBlack color="green" height="2rem" width="2rem" />
      </div>
    )
  }

  const contactValue = isTypeEmail
    ? phoneNumber
    : addBracketAndHypen(phoneNumber)

  return (
    <Modal
      modalOpen={OTPDialogOpen}
      setModalOpen={dismissOTPModal}
      stopDefaultExit={true}
      borderRadius="32px"
      padding="0"
      width="800px"
      modalCloseIconClassName={classes.modalCloseBtn}
      modalContainerClassName={classes.modalWrapper}
      modalContent={
        isVerifySuccess ? (
          <div className={classes.rootSucsess}>
            <Typography className={classes.title} tagType="h5" styleType="h5">
              {isTypeEmail
                ? emailSuccessTitle?.value
                : phoneSuccessTitle?.value}
            </Typography>
            <Typography
              tagType="h5"
              styleType="h5"
              className={classes.subTitle}
            >
              {getSuccessMessage(contactValue)}
            </Typography>
            <Button
              text={okButton?.value}
              type="button"
              onClick={dismissOTPModal}
              className={classes.submitBtn}
            />
          </div>
        ) : (
          <div className={classes.root}>
            <Typography className={classes.title} tagType="h5" styleType="h5">
              {title?.value}
            </Typography>
            <Typography
              tagType="h5"
              styleType="h5"
              className={classes.subTitle}
            >
              {subTitle?.value?.replace('{value}', contactValue)}
            </Typography>
            <OTPInput
              value={OTPvalue}
              onChange={setOTPValue}
              invalidOTPMessage={errorMessage}
              isInvalidOTP={!!errorMessage}
            />
            <InjectHTML
              tagType="p"
              styleType="p1"
              value={description?.value}
              className={classes.description}
            />
            {isTypeEmail && (
              <InjectHTML
                tagType="p"
                styleType="p1"
                value={emailDescription?.value}
                className={classes.description}
              />
            )}
            <Button
              text={submitBtn?.value}
              type="button"
              onClick={() => {
                validateOTP(OTPvalue)
                setOtpTries(otpTries + 1)
              }}
              className={classes.submitBtn}
              disabled={!isOTPValid || isSubmitLoading}
              isBusy={isSubmitLoading}
            />
            <Button
              type="button"
              text={resendBtn?.value}
              onClick={resendOTP}
              variant="tertiary"
              className={classes.resendBtn}
              disabled={isSubmitLoading}
              isBusy={isResendOptLoading}
            />
          </div>
        )
      }
    />
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    padding: '6rem 6rem',
    gap: '1rem',
    [breakpoints.down('xs')]: {
      padding: '3rem 1rem',
    },
  },
  rootSucsess: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '6rem 6rem',
    gap: '2rem',
    [breakpoints.down('xs')]: {
      padding: '3rem 1rem',
    },
  },
  title: {
    fontSize: '1.875rem',
    lineHeight: '2.375rem',
    alignSelf: 'center',
    [breakpoints.down('xs')]: {
      fontSize: '1.25rem',
      lineHeight: '1.75rem',
    },
  },
  subTitle: {
    fontSize: '1.125rem',
    lineHeight: '1.625rem',
    [breakpoints.down('xs')]: {
      fontSize: '1.rem',
      lineHeight: '1.5rem',
    },
  },
  description: {
    fontSize: '1.125rem',
    lineHeight: '1.625rem',
  },
  modalWrapper: {
    [breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  modalCloseBtn: {
    top: '12% !important',

    cursor: 'pointer',
    right: '7% !important',
    [breakpoints.down('xs')]: {
      height: '24px',
      width: '24px',
      top: '7% !important',
      right: '1% !important',
    },
  },
  submitBtn: {
    alignSelf: 'center',
    maxWidth: 'fit-content',
    minWidth: 'fit-content',
    [breakpoints.down('xs')]: {
      maxWidth: '100%',
      minWidth: '100%',
    },
  },
  actionWrapper: {
    '& button': {
      display: 'flex',
      maxWidth: 'fit-content',
    },
  },
  successMessage: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '0.188rem',
  },
  resendBtn: {
    padding: 0,
    minHeight: 'unset',
    textTransform: 'none',
    border: 'none',
    textDecoration: 'underline',
    color: colors.main.midnightExpress,
    margin: '0 auto',
    '&:hover': {
      backgroundColor: `${colors.main.white} !important`,
      color: `${colors.main.primaryRed} !important`,
    },
  },
}))

export default OTPModal
