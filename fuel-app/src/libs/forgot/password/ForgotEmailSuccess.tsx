import { makeStyles } from '@material-ui/core'
import { Typography } from 'src/blitz'
import Info from '@/shared-ui/react-icons/info'
import { useAppData, usePageLoadEvents } from 'src/hooks'
import { FORGOT_PAGES, CUSTOMER } from 'src/constants'

const ForgotEmailSuccess = () => {
  const forgotEmailSuccessContent = useAppData('ForgotEmailSuccess', true) || {}
  const classes = useStyles()

  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: FORGOT_PAGES.EMAIL_SENT,
      eVar22: CUSTOMER,
    },
  })

  return (
    <div className={classes.pageContainer}>
      <div>
        <Info />
      </div>

      <div className={classes.topSection}>
        <Typography tagType="h5" styleType="h5">
          {forgotEmailSuccessContent?.title?.value}
        </Typography>
      </div>
      <div className={classes.bottomSection}>
        <Typography tagType="p" styleType="p2">
          {forgotEmailSuccessContent?.description1?.value}
        </Typography>
        <Typography tagType="p" styleType="p2">
          {forgotEmailSuccessContent?.description2?.value}
        </Typography>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  pageContainer: {
    width: '100%',
    textAlign: 'center',
    [breakpoints.up('sm')]: {
      width: '388px',
    },
  },

  topSection: {
    padding: '32px 0',
  },
  bottomSection: {
    width: '90%',
    textAlign: 'center',
  },
  email: {
    margin: '0 0 32px 0',
  },
}))

export default ForgotEmailSuccess
