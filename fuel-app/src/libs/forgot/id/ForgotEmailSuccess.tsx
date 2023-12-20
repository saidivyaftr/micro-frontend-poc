import colors from '@/shared-ui/colors'
import Info from '@/shared-ui/react-icons/info'
import useWindowDimensions from '@/shared-ui/hooks/useWindowDimensions'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@/shared-ui/components'
import { maskEmail } from 'src/utils/register'
import { useAppData, usePageLoadEvents } from 'src/hooks'
import { formatUrl } from 'src/utils/urlHelpers'
import { FORGOT_ID_PAGES } from 'src/constants'

const ForgotEmailSuccess = ({ userEmail }: any) => {
  const classes = useStyles()

  const forgotIdSuccessContent =
    useAppData('forgotIdSuccessContent', true) || {}
  const { width } = useWindowDimensions()
  const isMobile = width <= 767
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: FORGOT_ID_PAGES.EMAIL_SENT,
    },
  })
  return (
    <div className={classes.container}>
      <div>
        <Info />
      </div>
      <div className={classes.topSection}>
        <Typography tagType="h2" styleType="h3">
          {forgotIdSuccessContent.desktopTitle?.value}
        </Typography>
      </div>
      <div className={classes.bottomSection}>
        <Typography
          className={classes.email}
          fontType="boldFont"
          styleType="p2"
          tagType="p"
        >
          {maskEmail(userEmail)}
        </Typography>
        <Typography tagType="p" styleType="p1" className={classes.description}>
          {forgotIdSuccessContent.description?.value}
        </Typography>
        {!isMobile && (
          <div>
            <Typography tagType="span" fontType="mediumFont" styleType="p3">
              {forgotIdSuccessContent.dontNeedaReminder?.value}
            </Typography>
            <Typography
              fontType="boldFont"
              styleType="p3"
              tagType="span"
              className={classes.signIn}
            >
              <a href={`${formatUrl(forgotIdSuccessContent.signUrl?.value)}`}>
                {forgotIdSuccessContent.signInBtn?.value}
              </a>
            </Typography>
          </div>
        )}
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    background: colors.main.grey,
  },
  container: {
    backgroundColor: colors.main.white,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: '100%',
    [breakpoints.up('sm')]: {
      padding: '32px 0',
      width: 687,
    },
  },
  topSection: {
    padding: 16,
    [breakpoints.up('sm')]: {
      padding: '32px 0',
    },
  },
  bottomSection: {
    textAlign: 'center',
  },
  email: {
    margin: '0 0 32px 0',
  },
  description: {
    width: '100%',
    marginTop: 0,
    textAlign: 'center',
    [breakpoints.up('sm')]: {
      width: 388,
    },
  },
  signIn: {
    [breakpoints.up('sm')]: {
      padding: 5,
      textDecoration: 'underline',
    },
  },
}))

export default ForgotEmailSuccess
