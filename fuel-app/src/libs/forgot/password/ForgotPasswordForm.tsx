import { makeStyles, TextField } from '@material-ui/core'
import { Button, InjectHTML, Tooltip, Typography } from '@/shared-ui/components'
import { useState } from 'react'
import colors from 'src/styles/theme/colors'
import { stateConstant } from 'src/constants/forgotPassword'
import { isValidEmail } from 'src/utils/validator'
import APIClient from 'src/api-client'
import { useAppData } from 'src/hooks'
import { SITE_INTERACTION } from 'src/constants'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'

interface PageProps {
  setShowBackBtn?: React.Dispatch<React.SetStateAction<any>>
  onSubmitState?: React.Dispatch<React.SetStateAction<any>>
  setBackState?: React.Dispatch<React.SetStateAction<any>>
  setShowAppBanner?: React.Dispatch<React.SetStateAction<any>>
  setShowEmailNotFoundModal?: React.Dispatch<React.SetStateAction<any>>
  setShowSystemErrorModal?: React.Dispatch<React.SetStateAction<any>>
}

const ResetPasswordEmailForm = ({
  setShowBackBtn,
  setBackState,
  onSubmitState,
  setShowAppBanner,
  setShowEmailNotFoundModal,
  setShowSystemErrorModal,
}: PageProps) => {
  setShowBackBtn && setShowBackBtn(true)
  setBackState && setBackState(stateConstant.RESET_PASSWORD_FORM) // TODO Change to Mobile Number Component
  const classes = useStyles()
  const [emailId, setEmailId] = useState<string>('')
  const [isReadyForSubmit, setIsReadyForSubmit] = useState<boolean>(false)

  setShowAppBanner && setShowAppBanner(true)
  const ForgotPasswordFormContent = useAppData('ForgotPasswordForm', true) || {}

  const emailChangeHandler = (event: any) => {
    const isValid = Boolean(isValidEmail(event.target.value))
    setIsReadyForSubmit(isValid)
    setEmailId(event.target.value)
  }

  const submitHandler = async () => {
    try {
      DTMClient.triggerEvent(
        {
          events: 'event14',
          eVar14: 'submit email',
        },
        'tl_o',
        SITE_INTERACTION,
      )
      setShowEmailNotFoundModal && setShowEmailNotFoundModal(false)
      const response = await APIClient.forgotPassword({ email: emailId })
      if (response.status === 200) {
        // if Verified Send to Sucess
        onSubmitState && onSubmitState(stateConstant.RESET_PASSWORD_SUCCESS)
      } else if (response?.status === 404 || response?.status === 409) {
        // if Invalid Email
        setShowEmailNotFoundModal && setShowEmailNotFoundModal(true)
      }
    } catch (error: any) {
      if (error?.response?.status === 404) {
        setShowEmailNotFoundModal && setShowEmailNotFoundModal(true)
      } else {
        setShowSystemErrorModal && setShowSystemErrorModal(true)
      }
    }
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <Typography tagType="h3" styleType="h3" className={classes.headingText}>
          {ForgotPasswordFormContent.title.value}
        </Typography>
        <Typography
          tagType="h6"
          styleType="h6"
          className={classes.rightAlign}
          fontType="regularFont"
        >
          {ForgotPasswordFormContent.message.value}
        </Typography>

        <div className={classes.codeWrapper}>
          <Typography
            tagType="h6"
            styleType="h6"
            className={classes.rightAlign}
            fontType="boldFont"
          >
            {ForgotPasswordFormContent.inputHeading.value}
          </Typography>
          <Tooltip
            tooltipText={ForgotPasswordFormContent?.inputHelp.value}
            tooltipIcon={
              <InjectHTML
                value={ForgotPasswordFormContent.inputHelpIcon.render}
              />
            }
            tooltipClassName={classes.toolTipIcon}
            tooltipContentClass={classes.toolTipContent}
            tooltipArrowClass={classes.tooltipArrow}
          />
        </div>
        <TextField
          aria-label={`email_address`}
          InputProps={{ disableUnderline: true }}
          className={classes.textField}
          data-tid="email_address"
          value={emailId}
          onChange={emailChangeHandler}
        />
        {!isReadyForSubmit && emailId !== '' && (
          <div className={classes.rightAlign}>
            <InjectHTML
              value={ForgotPasswordFormContent.errorIcon.render}
              pureInjection={true}
              enableClick={false}
              testId="test-html"
              className={classes.iconClass}
            />
            <Typography
              tagType="label"
              styleType="p4"
              fontType="boldFont"
              className={classes.rightAlign}
              color="primary"
            >
              {ForgotPasswordFormContent?.errorText.value}
            </Typography>
          </div>
        )}
        <div className={classes.submitButtonContainer}>
          <Button
            id="submitBtn"
            type="button"
            text={ForgotPasswordFormContent.buttonText.value}
            disabled={!isReadyForSubmit}
            onClick={submitHandler}
          />
        </div>
      </div>
    </div>
  )
}
const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },
  container: {
    background: colors.main.white,
    width: 'unset',
    [breakpoints.up('xs')]: {
      position: 'relative',
      width: '75%',
    },
    [breakpoints.up('sm')]: {
      position: 'relative',
      width: '600px',
    },
    [breakpoints.up('lg')]: {
      position: 'relative',
      width: '683px',
    },
  },
  codeWrapper: {
    paddingTop: '32px',
    display: 'flex',
    paddingBottom: '6px',
  },
  headingText: {
    paddingTop: '16px',
    paddingBottom: '32px',
    fontSize: '2rem',
  },
  rightAlign: {
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
  },
  submitButtonContainer: {
    paddingTop: '32px',
  },
  iconClass: {
    paddingRight: '6px',
  },
  textField: {
    height: '50px',
    width: '100%',
    borderRadius: '32px',
    padding: '8px 6px 2px 16px',
    background: colors.main.white,
    border: '1px solid rgba(196, 197, 201, 1)',
    [breakpoints.up('sm')]: {
      borderRadius: '25px',
    },
  },
  toolTipIcon: {
    display: 'inline-flex',
    left: 6,
    top: 3,
    '& svg': {
      width: 16,
      height: 16,
    },
  },
  tooltipArrow: {
    transform: 'rotate(138deg)',
    top: 5,
    left: 18,
    width: 8,
    height: 8,
  },
  toolTipContent: {
    top: -20,
    left: '22px !important',
    borderRadius: 8,
    right: '140px !important',
    boxShadow: `0px 2px 15px ${colors.main.shadowBlack}`,
    minWidth: 150,
    [breakpoints.up('sm')]: {
      minWidth: 250,
    },
    bottom: 'auto',
    '& > div': {
      margin: 8,
    },
  },
}))

export default ResetPasswordEmailForm
