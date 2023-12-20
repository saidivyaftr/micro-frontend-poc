import { useEffect, useRef, useState } from 'react'
import { makeStyles } from '@material-ui/core'
import ReCAPTCHA from 'react-google-recaptcha'
import { Button, Typography } from '@/shared-ui/components'
import { ConfirmationIcon } from '@/shared-ui/react-icons'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useDispatch, useSelector } from 'react-redux'
import { State } from 'src/redux/types'
import { useAppData, usePageLoadEvents } from 'src/hooks'
import { REGISTER_SUCCESS, CUSTOMER, SERVICEABLE } from 'src/constants'
import { useRouter } from 'next/router'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { loginUserPostRegistration } from 'src/redux/actions/register'

const RegistrationConfirmation = () => {
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: REGISTER_SUCCESS,
      eVar22: CUSTOMER,
      eVar49: SERVICEABLE,
      events: 'event22, event2',
      eVar2: 'ftr:register',
    },
  })

  const { query } = useRouter()
  const redirectQuery = query?.redirect

  const classes = useStyles()
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const { title, info, signinBtnText, continueText } = useAppData(
    'registrationConfirmationData',
    true,
  )
  const {
    email: loginId,
    password,
    hasApiFailed,
  } = useSelector((state: State) => state?.register)

  const handleNext = async () => {
    // Return to a next path if registration used as middle layer / step
    if (redirectQuery) {
      DTMClient.triggerEvent(
        {
          events: 'event14',
          eVar14: 'Registration: Complete-Continue',
        },
        'tl_o',
      )
      window.location.href = Array.isArray(redirectQuery)
        ? redirectQuery[0]
        : redirectQuery
      return
    }
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: 'Registration: Complete-Sign In',
      },
      'tl_o',
    )
    setIsLoading(true)
    const token = await recaptchaRef?.current?.executeAsync?.()
    if (token) {
      // Handle login
      dispatch(
        loginUserPostRegistration(
          loginId || '',
          password || '',
          token,
          'registration',
        ),
      )
    }
    recaptchaRef?.current?.reset()
  }

  useEffect(() => {
    if (hasApiFailed) {
      setIsLoading(false)
    }
  }, [hasApiFailed])

  return (
    <div className={classes.root}>
      <div className={classes.warningIcon}>
        <ConfirmationIcon />
      </div>
      <Typography
        styleType="h5"
        tagType="h5"
        className={classes.title}
        data-tid="confirmation-title"
      >
        {title?.value}
      </Typography>
      <Typography
        styleType="p2"
        className={classes.info}
        data-tid="confirmation-info"
      >
        {info?.value}
      </Typography>
      <Button
        type="button"
        variant="primary"
        hoverVariant="primary"
        className={classes.submitBtn}
        text={redirectQuery ? continueText?.value : signinBtnText?.value}
        onClick={handleNext}
        data-tid="submit-btn"
        isBusy={isLoading}
      />
      <ReCAPTCHA
        sitekey={process?.env?.GOOGLE_CAPTCHA_V3_PUBLIC_KEY || ''}
        size="invisible"
        ref={recaptchaRef}
      />
    </div>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    ...COMPONENT_WRAPPER,
  },
  warningIcon: {
    width: 100,
    margin: '0 auto',
    marginBottom: 32,
  },
  title: {
    textAlign: 'center',
    marginBottom: 32,
  },
  info: {
    marginBottom: 32,
    textAlign: 'center',
  },
  submitBtn: {
    margin: '0 auto',
    maxWidth: 250,
    display: 'block',
  },
}))

export default RegistrationConfirmation
