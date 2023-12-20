import { useState, useEffect, useCallback } from 'react'
import ForgotEmailSuccess from 'src/libs/forgot/id/ForgotEmailSuccess'
import ForgotMultipleEmails from 'src/libs/forgot/id/ForgotMultipleEmails'
import ForgotErrorModal from 'src/libs/forgot/id/ForgotErrorModal'
import APIClient from 'src/api-client'
import SystemError from 'src/libs/forgot/password/systemError'
import colors from 'src/styles/theme/colors'
import ForgotForm from 'src/libs/forgot/id/ForgotForm'
import { makeStyles } from '@material-ui/core'
import { useAppData } from 'src/hooks'
import { Typography } from '@/shared-ui/components'
import { LeftArrowIcon, Logo } from '@/shared-ui/react-icons'
import { usePageLoadEvents } from 'src/hooks'
import { stateConstant, siteInteractionConstant } from 'src/constants/forgotId'
import { FORGOT_ID_PAGES } from 'src/constants'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { formatUrl } from 'src/utils/urlHelpers'
import { useReCaptcha } from 'next-recaptcha-v3'

const ForgotId = () => {
  const classes = useStyles()
  const forgotIdSignin = useAppData('forgotIdSignin', true) || {}
  const [hideShadow, setHideShadow] = useState<boolean>(false)
  const [forgotIdResponse, setForgotIdResponse] = useState<string>(
    stateConstant.EMAIL_FORGOT_FORM,
  )
  const [userSelectedEmail, setUserSelectedEmail] = useState<string>('')
  const [forgotId, setForgotId] = useState<string>('')
  const [disableInput, setDisableInput] = useState<boolean>(false)

  const [showSystemErrorModal, setShowSystemErrorModal] =
    useState<boolean>(false)
  const { executeRecaptcha } = useReCaptcha()

  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: FORGOT_ID_PAGES.FORGOT_EMAIL_PAGE,
      prop10: siteInteractionConstant.FORGOT_ID,
    },
  })

  useEffect(() => {
    if (userSelectedEmail) {
      sendMail()
      setForgotId(userSelectedEmail)
      setForgotIdResponse(stateConstant.SENT_EMAIL_REMINDER)

      DTMClient.triggerEvent(
        {
          events: 'event14',
          eVar14: siteInteractionConstant.EMAIL_SENT,
        },
        'tl_o',
        siteInteractionConstant.EMAIL_SENT,
      )
    }
  }, [userSelectedEmail])

  async function sendMail() {
    await APIClient.forgotID({
      email: userSelectedEmail,
    })
  }

  useEffect(() => {
    if (
      forgotIdResponse === stateConstant.NAME_ADDRESS_NOT_AVAILABLE ||
      forgotIdResponse === stateConstant.EMAIL_NOT_AVAILABLE
    ) {
      getRecaptchaToken()
      setHideShadow(true)
    } else {
      setHideShadow(false)
    }
  }, [forgotIdResponse])

  // Create an event handler so you can call the verification on button click event or form submit
  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      //console.log('Execute recaptcha not yet available')
      return
    }
    const token = await executeRecaptcha('forgot_id_form_submit')
    return token
  }, [executeRecaptcha])

  const getRecaptchaToken = async () => {
    const token = await handleReCaptchaVerify()
    if (token) {
      const captchaResult = await APIClient.validateReCaptchaForForgotId({
        token: token,
      })
      if (!captchaResult) {
        setDisableInput(true)
      }
    }
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.innerWrapper}>
        <Logo fill={colors.main.brightRed} className={classes.redLogo} />
        {forgotIdResponse === stateConstant.EMAIL_FORGOT_FORM && (
          <a
            href={formatUrl(forgotIdSignin.signinUrl?.value || '')}
            className={classes.signIn}
          >
            <LeftArrowIcon />
            <Typography styleType="p2" tagType="span" fontType="boldFont">
              {forgotIdSignin.signin?.value}
            </Typography>
          </a>
        )}

        <div className={hideShadow ? classes.containerHide : classes.container}>
          {forgotIdResponse === stateConstant.EMAIL_FORGOT_FORM && (
            <ForgotForm
              setForgotIdResponse={setForgotIdResponse}
              setForgotId={setForgotId}
              setUserSelectedEmail={setUserSelectedEmail}
              setShowSystemErrorModal={setShowSystemErrorModal}
              disableInput={disableInput}
            />
          )}
          {forgotIdResponse === stateConstant.SENT_EMAIL_REMINDER && (
            <ForgotEmailSuccess userEmail={forgotId} />
          )}
          {(forgotIdResponse === stateConstant.NAME_ADDRESS_NOT_AVAILABLE ||
            forgotIdResponse === stateConstant.EMAIL_NOT_AVAILABLE) && (
            <>
              <ForgotErrorModal
                errorModal={forgotIdResponse}
                setForgotIdResponse={setForgotIdResponse}
              />
            </>
          )}
          {forgotIdResponse === stateConstant.MULTIPLE_EMAILS_PAGE && (
            <ForgotMultipleEmails
              userEmail={forgotId}
              setUserSelectedEmail={setUserSelectedEmail}
            />
          )}
          {showSystemErrorModal && <SystemError showSystemErrorModal />}
        </div>
      </div>
    </div>
  )
}
const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    background: colors.main.backgroundLiteGrey,
    padding: 16,
    [breakpoints.up('sm')]: {
      padding: 0,
    },
  },
  innerWrapper: {
    margin: '0 auto',
    width: '100%',
    padding: '40px 0px 40px 0px',
    position: 'relative',
    [breakpoints.up('sm')]: {
      width: 'min-content',
      padding: '152px 16px 205px 16px',
    },
  },
  containerHide: { display: 'none' },
  container: {
    position: 'relative',
    background: colors.main.white,
    borderRadius: 32,
    padding: '40px 16px',
    marginTop: 16,
    [breakpoints.up('sm')]: {
      padding: 48,
    },
  },
  signIn: {
    display: 'none',
    padding: 0,
    alignItems: 'center',
    '& span': {
      marginLeft: 10,
    },
    [breakpoints.up('sm')]: {
      display: 'inline-flex',
    },
  },
  redLogo: {
    display: 'none',
    [breakpoints.up('sm')]: {
      margin: '40px auto',
      textAlign: 'center',
      top: 0,
      right: 0,
      left: 0,
      width: 64,
      height: 64,
      position: 'absolute',
      display: 'block',
    },
  },
}))

export default ForgotId
