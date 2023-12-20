import { Dispatch } from 'react'
import { makeStyles } from '@material-ui/core'
import { Button, InjectHTML, Typography } from 'src/blitz'
import { Tooltip } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import InfoIconRed from '@/shared-ui/react-icons/info-icon-red'
import { useAppData } from 'src/hooks'
import { siteInteractionConstant, stateConstant } from 'src/constants/contact'
import { decryptPayload } from 'src/utils/secure'
import { handleSiteInteractionAnalytics } from './AnalyticUtilsMTN'

interface EmailRemainderPageProps {
  setShowBackBtn?: Dispatch<boolean>
  setShowAppBanner?: Dispatch<boolean>
  currentStatus?: string
  setCurrentState?: any
  backState?: any
  setBackState?: any
  currentState?: string
  setVerifyEmailAddress?: any
  getEmailOTP?: any
  primaryEmail?: any
}

const EmailRemainderPage = ({
  setShowBackBtn,
  setShowAppBanner,
  currentStatus,
  setCurrentState,
  backState,
  setBackState,
  currentState,
  setVerifyEmailAddress,
  getEmailOTP,
  primaryEmail,
}: EmailRemainderPageProps) => {
  const classes = useStyles()
  const primaryEmailAvailable =
    currentStatus === 'VERIFY_PRIMARY_UNIQUE_EMAIL' ? true : false
  const contactEmail = primaryEmail?.email ? primaryEmail.email : ''
  setShowBackBtn && setShowBackBtn(true)
  setShowAppBanner && setShowAppBanner(false)
  const loginEmail = decryptPayload(sessionStorage.getItem('loginId'))
  const emailRemainderPage = useAppData('emailRemainderPage', true) || {}

  const handleSignInClick = () => {
    setBackState([...backState, currentState])
    setVerifyEmailAddress(loginEmail)
    getEmailOTP(loginEmail)
    handleSiteInteractionAnalytics(
      siteInteractionConstant.USE_SIGNIN_EMAIL,
      siteInteractionConstant.USE_SIGNIN_EMAIL_TLO,
    )
    setCurrentState(stateConstant?.SHOW_EMAIL_SECURITY_CODE)
  }

  const handleUseThisClick = () => {
    setBackState([...backState, currentState])
    setVerifyEmailAddress(loginEmail)
    getEmailOTP(loginEmail)
    setCurrentState(stateConstant?.SHOW_EMAIL_SECURITY_CODE)
    handleSiteInteractionAnalytics(
      siteInteractionConstant.USE_THIS_EMAIL,
      siteInteractionConstant.USE_THIS_EMAIL_TLO,
    )
  }

  const handleAddNewClick = () => {
    setBackState([...backState, currentState])
    setCurrentState(stateConstant?.ADD_NEW_EMAIL)
    handleSiteInteractionAnalytics(
      primaryEmailAvailable
        ? siteInteractionConstant.USE_SEPARATE_EMAIL
        : siteInteractionConstant.ADD_NEW_CONTACT_EMAIL,
      primaryEmailAvailable
        ? siteInteractionConstant.USE_SEPARATE_EMAIL_TLO
        : siteInteractionConstant.ADD_NEW_CONTACT_EMAIL_TLO,
    )
  }

  return (
    <div className={classes.emailRemainderPageContainer}>
      <>
        <Typography tagType="h4" styleType="h3" className={classes.heading}>
          {emailRemainderPage?.title?.value}
        </Typography>
        <Typography tagType="p" styleType="p1" className={classes.description}>
          {primaryEmailAvailable
            ? emailRemainderPage?.availableDescription?.value
            : emailRemainderPage?.unAvailableDescription?.value}
        </Typography>
        <div className={classes.emailDisplaySection}>
          <div className={classes.signInEmail}>
            <Typography
              tagType="span"
              styleType="p1"
              className={classes.signInEmailLable}
            >
              {emailRemainderPage?.SignInEmailText?.value}
            </Typography>
            <div className={classes.emailDynamicValue}>
              <InjectHTML
                testId="test-name"
                tagType="h5"
                styleType="h6"
                className={classes.emailValue}
                value={loginEmail}
              />
              <Tooltip
                tooltipText={emailRemainderPage?.tooltipContent?.value}
                tooltipIcon={<InfoIconRed />}
                tooltipClassName={classes.toolTipIcon}
                tooltipContentClass={classes.toolTipContent}
                tooltipArrowClass={classes.tooltipArrow}
              />
            </div>
          </div>

          {primaryEmailAvailable && (
            <div className={classes.signInEmail}>
              <Typography
                tagType="span"
                styleType="p1"
                className={classes.signInEmailLable}
              >
                {emailRemainderPage?.contactEmailText?.value}
              </Typography>
              <div className={classes.emailDynamicValue}>
                <InjectHTML
                  testId="test-name"
                  tagType="h5"
                  styleType="h6"
                  className={classes.emailValue}
                  value={contactEmail}
                />
              </div>
            </div>
          )}
        </div>

        <div>
          {/* primaryEmailAvailable ? Use Sign in Email Button : Use this Email Button (Sign in) */}
          <Button
            type="button"
            variant="primary"
            text={
              primaryEmailAvailable
                ? emailRemainderPage?.UseSignInEmailCTA?.value
                : emailRemainderPage?.UseThisEmailCTA?.value
            }
            hoverVariant="primary"
            className={classes.mb32}
            onClick={
              primaryEmailAvailable ? handleSignInClick : handleUseThisClick
            }
          />
        </div>

        {/* primaryEmailAvailable ? Use Separate Contact Email Link : Add New Contact Email Link */}
        <div className={classes.addNewContactEmailStyle}>
          <Button
            type="link"
            variant="lite"
            buttonSize="medium"
            text={
              primaryEmailAvailable
                ? emailRemainderPage?.UseSeparateContactEmailLink?.value
                : emailRemainderPage?.AddNewContactEmailLink?.value
            }
            onClick={handleAddNewClick}
          />
        </div>
      </>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  emailRemainderPageContainer: {
    width: '100%',
    textAlign: 'center',
    [breakpoints.up('sm')]: {
      width: 610,
    },
  },
  mb32: {
    marginBottom: 32,
  },
  heading: {
    [breakpoints.up('sm')]: {
      marginBottom: 32,
    },
  },
  description: {
    margin: '16px 0',
    textAlign: 'left',
    letterSpacing: 0.2,
    [breakpoints.up('sm')]: {
      textAlign: 'center',
      margin: 32,
      with: 500,
    },
  },
  addNewContactEmailStyle: {
    textDecoration: 'underline',
    margin: 0,
  },
  buttonLite: {
    textDecoration: 'underline',
    [breakpoints.up('sm')]: {
      lineHeight: 26,
    },
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    margin: 0,
    width: 'auto',
    height: 'auto',
    display: 'block',
    padding: '150px 0',
    [breakpoints.down('md')]: {
      padding: '100px 0',
    },
  },
  emailDisplaySection: {
    marginBottom: 32,
  },
  signInEmail: {
    display: 'block',
    alignItems: 'left',
    justifyContent: 'left',
    textAlign: 'left',
    marginBottom: 16,
    [breakpoints.up('sm')]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
    },
  },
  signInEmailLable: {
    display: 'block',
    marginBottom: 16,
    [breakpoints.up('sm')]: {
      marginBottom: 0,
    },
  },
  emailDynamicValue: {
    display: 'flex',
    alignItems: 'left',
    [breakpoints.up('sm')]: {
      display: 'flex',
      alignItems: 'center',
    },
  },
  emailValue: {
    fontWeight: 'bolder',
    marginLeft: 0,
    overflowWrap: 'anywhere',
    [breakpoints.up('sm')]: {
      marginLeft: 16,
    },
  },
  toolTipIcon: {
    display: 'inline-flex',
    left: 6,
    top: -2,
    '& svg': {
      width: 16,
      height: 16,
    },
  },
  tooltipArrow: {
    width: 8,
    height: 8,
    top: -10,
    left: 4,
    transform: 'rotate(45deg)',
    [breakpoints.up('sm')]: {
      transform: 'rotate(138deg)',
      top: 5,
      left: 18,
    },
  },
  toolTipContent: {
    top: -100,
    left: '-50px !important',
    right: '0 !important',
    bottom: 30,
    minWidth: 133,
    boxShadow: `0px 2px 15px ${colors.main.shadowBlack}`,
    borderRadius: 8,
    [breakpoints.up('sm')]: {
      top: '-26px',
      left: '22px !important',
      borderRadius: 8,
      right: '130px !important',
      boxShadow: `0px 2px 15px ${colors.main.shadowBlack}`,
      minWidth: 196,
      bottom: 'auto',
      '& > div': {
        margin: 8,
      },
    },
  },
}))

export default EmailRemainderPage
