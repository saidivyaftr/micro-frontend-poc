import { makeStyles } from '@material-ui/core'
import { Button, InjectHTML, Typography } from '@/shared-ui/components'
import { useAppData } from 'src/hooks'
import { State } from 'src/redux/types'
import { useSelector } from 'react-redux'
import { Dispatch } from 'react'
import IconButton from '@material-ui/core/IconButton'
import { stateConstant } from 'src/constants/contact'
import { handleSiteInteractionAnalytics } from './AnalyticUtilsMTN'
import { siteInteractionConstant } from 'src/constants/contact'
import { decryptPayload } from 'src/utils/secure'
import { AppRoutes } from 'src/constants'

interface ContactVerificationEmailWelcomeProps {
  setShowBackBtn?: Dispatch<boolean>
  getEmailOTP?: any
  setShowAppBanner?: Dispatch<boolean>
  currentStatus?: string
  setCurrentState?: any
  backState?: any
  setBackState?: any
  currentState?: string
  setVerifyEmailAddress?: any
  primaryEmail?: any
  skipVerification: (
    url: string,
    uuid: string,
    phoneId?: string,
    emailId?: string,
  ) => void
}

const ContactVerificationEmailWelcome = ({
  setShowBackBtn,
  getEmailOTP,
  setShowAppBanner,
  currentStatus,
  setCurrentState,
  backState,
  setBackState,
  currentState,
  setVerifyEmailAddress,
  primaryEmail,
  skipVerification,
}: ContactVerificationEmailWelcomeProps) => {
  const classes = useStyles()
  const { accountInfoOnLoad } =
    useSelector((state: State) => state?.account) || {}
  const loginEmail = decryptPayload(sessionStorage.getItem('loginId'))
  setShowBackBtn && setShowBackBtn(false)
  const primaryEmailAvailable =
    currentStatus === 'VERIFY_PRIMARY_UNIQUE_EMAIL' ? true : false

  const contactEmail = primaryEmail?.email
  setShowAppBanner && setShowAppBanner(false)
  const siteCoreName = primaryEmailAvailable
    ? 'emailWelcomePage'
    : 'emailUpdatePage'
  const siteCoreTextData = useAppData(siteCoreName, true) || {}
  const handleDoLaterClick = () => {
    handleSiteInteractionAnalytics(
      siteInteractionConstant.DO_LATER_EMAIL,
      siteInteractionConstant.DO_LATER_EMAIL_TLO,
    )
    skipVerification(
      AppRoutes.AccountDashboard,
      accountInfoOnLoad?.data?.uuid,
      undefined,
      primaryEmail?.id,
    )
  }

  const handleSignInClick = () => {
    setBackState([...backState, currentState])
    setVerifyEmailAddress(loginEmail)
    getEmailOTP(loginEmail)
    handleSiteInteractionAnalytics(
      siteInteractionConstant.USE_THIS_EMAIL,
      siteInteractionConstant.USE_THIS_EMAIL_TLO,
    )
    setCurrentState(stateConstant.SHOW_EMAIL_SECURITY_CODE)
  }

  const handleEditContactClick = () => {
    setBackState([...backState, currentState])
    setCurrentState(stateConstant.EMAIL_REMAINDER_PAGE)
    handleSiteInteractionAnalytics(
      siteInteractionConstant.EDIT_CONTACT_EMAIL,
      siteInteractionConstant.EDIT_CONTACT_EMAIL_TLO,
    )
  }

  const handleKeepContactClick = () => {
    setBackState([...backState, currentState])
    setVerifyEmailAddress(contactEmail)
    getEmailOTP(contactEmail)
    handleSiteInteractionAnalytics(
      siteInteractionConstant.KEEP_CONTACT_EMAIL,
      siteInteractionConstant.KEEP_CONTACT_EMAIL_TLO,
    )
    setCurrentState(stateConstant.SHOW_EMAIL_SECURITY_CODE)
  }

  const handleEditIconClick = () => {
    setBackState([...backState, currentState])
    setCurrentState(stateConstant.EMAIL_REMAINDER_PAGE)

    handleSiteInteractionAnalytics(
      siteInteractionConstant.EDIT_CONTACT_ICON_EMAIL,
      siteInteractionConstant.EDIT_CONTACT_ICON_EMAIL_TLO,
    )
  }

  return (
    <div className={classes.welcomePageContainer}>
      <>
        <Typography tagType="h3" styleType="h3">
          {siteCoreTextData?.heading?.value +
            ' ' +
            accountInfoOnLoad?.data?.accountHolderFirstName}
        </Typography>
        <Typography tagType="p" styleType="p1" className={classes.description}>
          {siteCoreTextData?.subheading?.value}
        </Typography>
        <Typography tagType="p" styleType="p1" className={classes.description}>
          {siteCoreTextData?.description?.value}
        </Typography>
        <div className={classes.signinemail}>
          <Typography tagType="label" styleType="p1">
            {siteCoreTextData?.signinemail?.value}
          </Typography>
          <Typography
            tagType="label"
            className={classes.signinemailalignment}
            //fontType="boldFont"
            styleType="h6"
          >
            {loginEmail}
          </Typography>
        </div>
        {primaryEmailAvailable && (
          <div className={classes.contactmail}>
            <Typography tagType="label" styleType="p1">
              {siteCoreTextData?.contactemail?.value}
            </Typography>
            <Typography
              tagType="label"
              styleType="h6"
              className={classes.contactemailalignment}
            >
              {contactEmail}
            </Typography>
            <IconButton className={classes.iconClass} size="small">
              <InjectHTML
                value={siteCoreTextData?.editicon?.value}
                onClick={handleEditIconClick}
              />
            </IconButton>
          </div>
        )}

        <div>
          {/* primaryEmailAvailable ? Use Sign In Email Button : Use this Email Button (Sign in) */}
          <Button
            type="button"
            variant="primary"
            text={
              primaryEmailAvailable
                ? siteCoreTextData?.signinemailCta?.value
                : siteCoreTextData?.usethisemailCta?.value
            }
            hoverVariant="primary"
            onClick={handleSignInClick}
          />
          {/* primaryEmailAvailable ? Keep Contact Email Button : Edit Contact Email Button */}
          <Button
            type="button"
            variant="tertiary"
            text={
              primaryEmailAvailable
                ? siteCoreTextData?.contactemailCta?.value
                : siteCoreTextData?.editcontactemailCta?.value
            }
            onClick={
              primaryEmailAvailable
                ? handleKeepContactClick
                : handleEditContactClick
            }
            className={classes.buttonalignment}
          />
        </div>

        <div className={classes.iwilldoLater}>
          <Button
            type="button"
            variant="lite"
            buttonSize="small"
            text={siteCoreTextData?.iwilldothislater?.value}
            onClick={handleDoLaterClick}
          />
        </div>
      </>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  welcomePageContainer: {
    width: '100%',
    textAlign: 'center',
    [breakpoints.up('sm')]: {
      width: 776,
    },
  },
  signinemail: {
    marginBottom: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    [breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  description: {
    margin: 16,
  },
  iwilldoLater: {
    textDecoration: 'underline',
    marginTop: 32,
    textAlign: 'center',
  },
  signinemailalignment: {
    marginTop: 16,
    overflowWrap: 'anywhere',
    [breakpoints.up('sm')]: {
      marginLeft: 16,
    },
  },
  iconClass: {
    marginLeft: 16,
    [breakpoints.down('sm')]: {
      position: 'absolute',
      right: 0,
      margin: '6px 30px 0px 0px',
    },
  },
  buttonalignment: {
    marginTop: 16,
    [breakpoints.up('sm')]: {
      marginLeft: 16,
    },
  },

  contactmail: {
    marginBottom: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    [breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  contactemailalignment: {
    marginTop: 16,
    overflowWrap: 'anywhere',
    [breakpoints.up('sm')]: {
      marginLeft: 16,
    },
  },
}))

export default ContactVerificationEmailWelcome
