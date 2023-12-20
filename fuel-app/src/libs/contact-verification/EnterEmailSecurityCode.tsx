import { makeStyles } from '@material-ui/core'
import { Button, OTPInput, Typography } from '@/shared-ui/components'
import clx from 'classnames'
//import css from './SecurityCode.module.scss'
import { useMemo, useState, Dispatch } from 'react'
import ResendCode from './ResendCode'
import colors from 'src/styles/theme/colors'
import APIClient from 'src/api-client'
import { handleSiteInteractionAnalytics } from './AnalyticUtilsMTN'
import { siteInteractionConstant } from 'src/constants/contact'
import { useAppData } from '../../hooks'

interface PageProps {
  setShowBackBtn?: Dispatch<any>
  setShowAppBanner?: Dispatch<any>
  onSubmitState?: () => void
  verifyEmailAddress?: string
  accountInfoOnLoad?: any
  tokenForVerification?: string
  incorrectAttemptsCount?: number
  setIncorrectAttemptsCount: Dispatch<number>
  resendOtp: any
}

const EnterEmailSecurityCode = ({
  setShowBackBtn,
  setShowAppBanner,
  onSubmitState,
  verifyEmailAddress,
  accountInfoOnLoad,
  tokenForVerification,
  incorrectAttemptsCount,
  setIncorrectAttemptsCount,
  resendOtp,
}: PageProps) => {
  setShowBackBtn && setShowBackBtn(true)
  const classes = useStyles()
  const [codeValue, setCodeValue] = useState<string>('')
  const [isIncorrectCode, setIsIncorrectCode] = useState<boolean>(false)
  const [isIncorrectMessage, setIsIncorrectMessage] = useState<boolean>(false)
  const textData = useAppData('enterEmailSecurityCode', true) || {}
  setShowAppBanner && setShowAppBanner(true)

  const replaceEmailAddress = (str: string, mask: boolean) => {
    // Updating Email in SiteCore String
    const maskedEmail =
      verifyEmailAddress && mask
        ? maskEmail(verifyEmailAddress)
        : verifyEmailAddress
    return str?.replace('$EMAIL$', maskedEmail ? maskedEmail : '')
  }

  const maskEmail = (email: string) => {
    const strEmail = email.split('')
    const finalArr: string[] = []
    const len = strEmail.indexOf('@')

    strEmail.forEach((item, pos) => {
      ;(pos >= 1 && pos <= len - 1) || (pos >= len + 4 && strEmail[pos] !== '.')
        ? finalArr.push('*')
        : finalArr.push(strEmail[pos])
    })

    return finalArr.join('')
  }

  const isReadyForSubmit = useMemo(() => codeValue.length === 6, [codeValue])

  const updateAttempCount = (str: string) => {
    return str?.replace(
      '$ATTEMPT_COUNT$',
      incorrectAttemptsCount?.toString()
        ? incorrectAttemptsCount?.toString()
        : '0',
    )
  }

  const verifyCodeHandler = async () => {
    handleSiteInteractionAnalytics(
      siteInteractionConstant.VERIFY_SECURITY_CODE_EMAIL,
      siteInteractionConstant.VERIFY_SECURITY_CODE_EMAIL_TLO,
    )
    try {
      const response: any = await APIClient.completeVerification({
        uuid: accountInfoOnLoad.data.uuid,
        tokenForVerification: tokenForVerification,
        verificationPin: codeValue,
      })

      // TODO - As per response we have to show Error or next screen
      setCodeValue('')
      if (response?.status === 409 && response?.data?.remainingAttempts) {
        setCodeValue('')
        setIsIncorrectCode(true)
        setIsIncorrectMessage(true)
        setIncorrectAttemptsCount(parseInt(response?.data?.remainingAttempts))
      } else if (
        response?.status === 404 ||
        response?.status === 403 ||
        response?.status === 400 ||
        response?.status === 401
      ) {
        setCodeValue('')
        setIsIncorrectMessage(true)
      } else {
        onSubmitState && onSubmitState()
        setIsIncorrectCode(false)
        setIsIncorrectMessage(false)
      }
    } catch (error: any) {
      setCodeValue('')
      setIsIncorrectCode(true)
      setIsIncorrectMessage(true)
    }
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <Typography tagType="h3" styleType="h3" className={classes.heading}>
          {isIncorrectCode
            ? textData?.incorrectCode?.data?.title?.value
            : textData?.title?.value}
        </Typography>
        {isIncorrectCode && (
          <Typography
            tagType="h6"
            styleType="h6"
            className={clx(classes.rightAlign, classes.attemptCount)}
          >
            {updateAttempCount(
              textData?.incorrectCode?.data?.attemptMessage?.value,
            )}
          </Typography>
        )}
        <Typography
          tagType="h6"
          styleType="h6"
          className={classes.contactEmail}
          fontType={isIncorrectCode ? 'regularFont' : 'boldFont'}
        >
          {replaceEmailAddress(
            textData.incorrectCode?.data?.heading?.value,
            isIncorrectCode,
          )}
        </Typography>

        <OTPInput
          value={codeValue}
          onChange={setCodeValue}
          isInvalidOTP={isIncorrectCode || isIncorrectMessage}
          invalidOTPMessage={
            textData?.incorrectCode?.data?.tryAgainMessage?.value
          }
        />

        <div className={classes.informationMessage}>
          <Typography
            tagType="p"
            styleType="h6"
            fontType="regularFont"
            className={classes.rightAlign}
          >
            {textData?.message?.data?.text1?.value}
          </Typography>
        </div>
        {!isIncorrectCode && (
          <div className={classes.informationMessage}>
            <Typography
              tagType="p"
              styleType="h6"
              fontType="regularFont"
              className={classes.rightAlign}
            >
              {textData?.message?.data?.text2?.value}
            </Typography>
          </div>
        )}
        <div className={classes.submitButtonContainer}>
          <Button
            id="submitBtn"
            type="button"
            text={textData?.buttonText?.value}
            disabled={!isReadyForSubmit}
            onClick={verifyCodeHandler}
          />
        </div>
        <ResendCode
          resendCodeText={textData}
          getDirectOTP={resendOtp}
          email={verifyEmailAddress}
        />
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
    width: '100%',
    [breakpoints.up('sm')]: {
      position: 'relative',
      width: 500,
    },
  },
  codeWrapper: {
    paddingTop: '16px',
  },
  heading: {
    paddingTop: 16,
    paddingBottom: 16,
    [breakpoints.up('sm')]: {
      paddingTop: 16,
      paddingBottom: 32,
    },
  },
  rightAlign: {
    textAlign: 'left',
  },
  contactEmail: {
    textAlign: 'left',
  },
  submitButtonContainer: {
    paddingTop: 32,
    paddingBottom: 16,
    [breakpoints.up('sm')]: {
      paddingTop: 32,
      paddingBottom: 32,
    },
  },
  attemptCount: {
    paddingBottom: 16,
    [breakpoints.up('sm')]: {
      paddingBottom: 32,
    },
  },
  iconClass: {
    paddingRight: 6,
  },
  tryAgainContainer: {
    alignItems: 'center',
  },
  informationMessage: {
    paddingTop: 16,
    [breakpoints.up('sm')]: {
      paddingTop: 32,
    },
  },
}))

export default EnterEmailSecurityCode
