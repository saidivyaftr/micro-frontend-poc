// import { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import { Button, OTPInput, Typography } from '@/shared-ui/components'
import clx from 'classnames'
import { useEffect, useState, Dispatch } from 'react'
import ResendCode from './ResendCode'
import colors from 'src/styles/theme/colors'
import APIClient from 'src/api-client'
import { addBracketstoMobileNumber } from '../account/welcome/helper'
import { handleSiteInteractionAnalytics } from './AnalyticUtilsMTN'
import { siteInteractionConstant } from 'src/constants/contact'
import { useAppData } from '../../hooks'

interface PageProps {
  setShowBackBtn?: Dispatch<any>
  onSubmitState?: () => void
  setShowAppBanner?: Dispatch<any>
  mobileNumber?: string
  setIncorrectAttemptsCount: Dispatch<number>
  accountInfoOnLoad: any
  tokenForVerification: string
  getDirectOTP?: () => void
  incorrectAttemptsCount?: number
}

const EnterSecurityCode = ({
  setShowBackBtn,
  onSubmitState,
  setShowAppBanner,
  mobileNumber,
  setIncorrectAttemptsCount,
  accountInfoOnLoad,
  tokenForVerification,
  getDirectOTP,
  incorrectAttemptsCount,
}: PageProps) => {
  setShowBackBtn && setShowBackBtn(true)
  const classes = useStyles()
  const textData = useAppData('EnterSecurityCode', true) || {}
  //const isFromMobileApp = useIsLoadingFromApp()
  const [isReadyForSubmit, setIsReadyForSubmit] = useState<boolean>(false)
  const [codeValue, setCodeValue] = useState<string>('')
  const [isIncorrectCode, setIsIncorrectCode] = useState<boolean>(false)
  const [isIncorrectMessage, setIsIncorrectMessage] = useState<boolean>(false)

  // const [incorrectAttemptCount, setIncorrectAttemptCount] = useState<string>('')
  setShowAppBanner && setShowAppBanner(false)

  const replacePhoneNumber = (str: string) => {
    // Updating Phone Number in SiteCore String
    const formatedMobileNumber =
      mobileNumber && addBracketstoMobileNumber(mobileNumber)
    return str.replace(
      '$PHONE$',
      formatedMobileNumber ? formatedMobileNumber : '000-000-0000',
    )
  }

  useEffect(() => {
    if (codeValue.length === 6) {
      setIsReadyForSubmit(true)
    } else {
      setIsReadyForSubmit(false)
    }
  }, [codeValue])

  const updateAttempCount = (str: string) => {
    return str.replace(
      '$ATTEMPT_COUNT$',
      incorrectAttemptsCount?.toString()
        ? incorrectAttemptsCount?.toString()
        : '0',
    )
  }

  const verifyCodeHandler = async () => {
    handleSiteInteractionAnalytics(
      siteInteractionConstant.VERIFY_SECURITY_CODE,
      siteInteractionConstant.VERIFY_SECURITY_CODE_TLO,
    )
    try {
      const response: any = await APIClient.completeVerification({
        uuid: accountInfoOnLoad.data.uuid,
        tokenForVerification: tokenForVerification,
        verificationPin: codeValue,
      })
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
        <Typography tagType="h3" styleType="h3" className={classes.headingText}>
          {isIncorrectCode
            ? textData.incorrectCode?.data?.title.value
            : textData.title.value}
        </Typography>
        {isIncorrectCode && (
          <Typography
            tagType="h6"
            styleType="h6"
            className={clx(classes.rightAlign, classes.attemptCount)}
          >
            {updateAttempCount(
              textData.incorrectCode?.data?.attemptMessage.value,
            )}
          </Typography>
        )}
        <Typography
          tagType="h6"
          styleType="h6"
          className={classes.rightAlign}
          fontType={isIncorrectCode ? 'regularFont' : 'boldFont'}
        >
          {replacePhoneNumber(
            isIncorrectCode
              ? textData.incorrectCode?.data?.heading.value
              : textData.message.data.heading.value,
          )}
        </Typography>
        <OTPInput
          value={codeValue}
          onChange={setCodeValue}
          isInvalidOTP={isIncorrectCode || isIncorrectMessage}
          invalidOTPMessage={
            textData?.incorrectCode?.data?.tryAgainMessage.value
          }
        />
        <div className={classes.informationMessage}>
          <Typography
            tagType="p"
            styleType="h6"
            fontType="regularFont"
            className={classes.rightAlign}
          >
            {textData?.message?.data?.text?.value}
          </Typography>
        </div>
        <div className={classes.submitButtonContainer}>
          <Button
            id="submitBtn"
            type="button"
            text={textData.buttonText.value}
            disabled={!isReadyForSubmit}
            onClick={verifyCodeHandler}
          />
        </div>
        <ResendCode resendCodeText={textData} getDirectOTP={getDirectOTP} />
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
  headingText: {
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

export default EnterSecurityCode
