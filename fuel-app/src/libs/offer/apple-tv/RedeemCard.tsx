import { makeStyles } from '@material-ui/core'
import { Typography, Button } from '@/shared-ui/components'
import { Grid } from '@material-ui/core'
import { APPLE_TV, COMPONENT_WRAPPER } from 'src/constants'
import { useAppData, useChatState } from 'src/hooks'
import colors from '@/shared-ui/colors'

const RedeemCard = () => {
  const classes = useStyles()
  const { setChatState } = useChatState()
  const redeemData = useAppData('redeemData', true)
  const domain = window?.location?.origin || ''

  const trackAnalytics = (itemVale: string) => {
    //@ts-ignore
    s_objectID = APPLE_TV.replace('{NAME}', itemVale)
  }

  const handleChatNowClick = () => {
    setChatState(true)
    trackAnalytics('Chat Now')
  }

  const isChatNow = (btnName: string) => btnName.toLowerCase() === 'chat now'

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Typography
          tagType="h3"
          styleType="h3"
          fontType="boldFont"
          className={classes.title}
        >
          {redeemData?.title?.value}
        </Typography>
        <Grid
          container
          className={classes.redeemCardContainer}
          justifyContent="space-between"
          alignItems="center"
          spacing={4}
        >
          {redeemData?.items?.list?.map((item: any, index: number) => (
            <Grid item sm={12} md={6} key={index}>
              <div className={classes.redeemCard}>
                <div
                  className={classes.leftWrapper}
                  style={{ backgroundImage: `url(${item?.image?.src})` }}
                ></div>
                <div className={classes.rightWrapper}>
                  <Typography
                    tagType="h3"
                    styleType="h4"
                    fontType="boldFont"
                    className={classes.redeemTitle}
                  >
                    {item?.title?.value}
                  </Typography>
                  <Typography
                    tagType="div"
                    styleType="p1"
                    className={classes.redeemText}
                  >
                    {item?.text?.value}
                  </Typography>
                  <div className={classes.btnWrapper}>
                    {isChatNow(item?.buttonText?.value) ? (
                      <Button
                        variant="primary"
                        hoverVariant="secondary"
                        text={item?.buttonText?.value}
                        type="button"
                        onClick={handleChatNowClick}
                      />
                    ) : (
                      <Button
                        variant="primary"
                        hoverVariant="secondary"
                        text={item?.buttonText?.value}
                        type="link"
                        href={`${domain}${item?.buttonURL?.url}`}
                        onClick={() => trackAnalytics(item?.buttonText?.value)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: colors.main.newBackgroundGray,
  },
  container: {
    ...COMPONENT_WRAPPER,
    textAlign: 'center',
    padding: '80px 16px',
    justifyContent: 'space-between',
  },
  wrapper: {
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
  },
  title: {
    maxWidth: 900,
    margin: 'auto',
    marginBottom: 48,
    [theme.breakpoints.down('xs')]: {
      marginBottom: 30,
    },
  },
  heroLogo: {
    width: '100%',
  },
  redeemCardContainer: {
    alignItems: 'stretch',
    '& > div': {
      [theme.breakpoints.down('sm')]: {
        flex: '100%',
        padding: '8px 16px !important',
      },
    },
  },
  redeemCard: {
    backgroundColor: colors.main.midnightExpress,
    color: colors.main.white,
    display: 'flex',
    height: '100%',
    justifyContent: 'space-between',
    margin: '0 auto 10px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginBottom: 0,
    },
  },
  leftWrapper: {
    width: '33%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  redeemTitle: {
    color: colors.main.white,
  },
  redeemText: {
    color: colors.main.white,
    marginBottom: 32,
    marginTop: 8,
    height: 52,
    [theme.breakpoints.down('xs')]: {
      fontSize: '1em',
    },
  },
  rightWrapper: {
    width: '66%',
    padding: 32,
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  btnWrapper: {
    marginTop: 'auto',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    '& a, button': {
      display: 'flex',
      justifyContent: 'center',
      padding: '16px 32px',
      height: 50,
    },
  },
}))

export default RedeemCard
