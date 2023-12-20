import { makeStyles } from '@material-ui/core'
import { Button, Typography } from 'src/blitz'
import { useAppData } from 'src/hooks'
import { State } from 'src/redux/types'
import { useSelector } from 'react-redux'
import { Dispatch } from 'react'
import { handleSiteInteractionAnalytics } from './AnalyticUtilsMTN'
import { siteInteractionConstant } from 'src/constants/contact'
import { AppRoutes } from 'src/constants'

interface ContactVerificationWelcomeProps {
  setShowBackBtn?: Dispatch<boolean>
  onSubmitState?: () => void
  setShowAppBanner?: Dispatch<boolean>
  phoneId: string | undefined
  skipVerification: (
    url: string,
    uuid: string,
    phoneId?: string,
    emailId?: string,
  ) => void
}

const ContactVerificationWelcome = ({
  setShowBackBtn,
  onSubmitState,
  setShowAppBanner,
  phoneId,
  skipVerification,
}: ContactVerificationWelcomeProps) => {
  const classes = useStyles()
  const { accountInfoOnLoad } =
    useSelector((state: State) => state?.account) || {}

  setShowBackBtn && setShowBackBtn(false)
  const addMobileNumber = () => {
    handleSiteInteractionAnalytics(
      siteInteractionConstant.WELCOME_ADD_MTN,
      siteInteractionConstant.ADD_MTN_TLO,
    )
    onSubmitState && onSubmitState()
  }
  setShowAppBanner && setShowAppBanner(false)
  const welcomepage = useAppData('welcomepage', true) || {}
  const handleDoLaterClick = () => {
    handleSiteInteractionAnalytics(
      siteInteractionConstant.DO_LATER,
      siteInteractionConstant.DO_LATER_TLO,
    )
    skipVerification(
      AppRoutes.AccountDashboard,
      accountInfoOnLoad?.data?.uuid,
      phoneId,
      undefined,
    )
  }
  return (
    <div className={classes.welcomePageContainer}>
      <>
        <Typography tagType="h5" styleType="h5">
          {welcomepage.heading?.value +
            ` ${accountInfoOnLoad.data.accountHolderFirstName}`}
        </Typography>
        <Typography tagType="p" styleType="p2" className={classes.description}>
          {welcomepage.description?.value}
        </Typography>
        <Button
          type="button"
          variant="primary"
          text={welcomepage.addmobilenumber?.value}
          hoverVariant="primary"
          onClick={addMobileNumber}
        />
        <div className={classes.iwilldoLater}>
          <Button
            type="link"
            variant="lite"
            buttonSize="small"
            text={welcomepage.iwilldothislater?.value}
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
      width: '776px',
    },
  },
  description: {
    margin: '16px 0',
    [breakpoints.up('sm')]: {
      margin: '32px',
    },
  },
  iwilldoLater: {
    textDecoration: 'underline',
    minWidth: '100px',
    lineHeight: '26px',
    fontSize: '18px',
    margin: '16px 0px 0px 6px',
  },
  buttonLite: {
    textDecoration: 'underline',
    [breakpoints.up('sm')]: {
      fontSize: '18px',
      fontWeight: 500,
      lineHeight: '26px',
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
    ['@media screen and (max-width: 900px)']: {
      padding: '100px 0',
    },
  },
}))

export default ContactVerificationWelcome
