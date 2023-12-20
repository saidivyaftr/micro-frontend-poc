import { makeStyles } from '@material-ui/core'
import { Button, Typography } from '@/shared-ui/components'
import { useState } from 'react'
import { siteInteractionConstant } from 'src/constants/contact'
import { handleSiteInteractionAnalytics } from './AnalyticUtilsMTN'

interface PageProps {
  resendCodeText: any // This will be update once we have sitecore data updated
  getDirectOTP?: () => void
  email?: string
}

const ResendCode = ({ resendCodeText, getDirectOTP, email }: PageProps) => {
  const classes = useStyles()
  const resendCodeTimeout = 5000

  const [resendCode, setResendCode] = useState<boolean>(false)

  const resendCodeHandler = () => {
    // handleSiteInteractionAnalytics(
    //   siteInteractionConstant.RESEND_CODE,
    //   siteInteractionConstant.RESEND_CODE_TLO,
    // )

    handleSiteInteractionAnalytics(
      email
        ? siteInteractionConstant.RESEND_CODE_EMAIL
        : siteInteractionConstant.RESEND_CODE,
      email
        ? siteInteractionConstant.RESEND_CODE_EMAIL_TLO
        : siteInteractionConstant.RESEND_CODE_TLO,
    )

    getDirectOTP && getDirectOTP()
    setResendCode(true)
    setTimeout(() => {
      setResendCode(false)
    }, resendCodeTimeout)
  }

  return (
    <>
      {resendCode ? (
        <div className={classes.resendCodeContainer}>
          <Typography tagType="div" styleType="p3" color="primary">
            {resendCodeText?.codeSent?.value}
          </Typography>
        </div>
      ) : (
        <div className={classes.resendCodeContainer}>
          <Typography tagType="div" styleType="p3">
            {resendCodeText?.codeNotRecieved?.value}
          </Typography>
          <Button
            type="link"
            variant="lite"
            buttonSize="small"
            text={resendCodeText?.resendCode?.value}
            className={classes.resendCodeBtn}
            onClick={resendCodeHandler}
          />
        </div>
      )}
    </>
  )
}
const useStyles = makeStyles(() => ({
  resendCodeContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  resendCodeBtn: {
    marginLeft: '6px',
    textDecoration: 'underline',
    minWidth: '100px',
  },
}))

export default ResendCode
