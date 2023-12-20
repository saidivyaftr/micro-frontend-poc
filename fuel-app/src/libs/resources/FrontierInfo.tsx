import { Grid, makeStyles } from '@material-ui/core'
import { Button, Typography } from '@/shared-ui/components'
import { MapCurve, ChatBox, PhoneIcon, Cart } from '@/shared-ui/react-icons'
import { useChatState } from 'src/hooks'
import colors from '@/shared-ui/colors'
import { MOVERS_EXISTING_CUST_CHAT_EVENT } from 'src/constants'
import { useEffect } from 'react'
import classNames from 'classnames'

const FrontierInfo = ({ data }: any) => {
  const classes = useStyles()
  const { setChatState, setChatParams } = useChatState()
  const origin = ''
  const { title, lists } = data
  const getIcon = (name: string) => {
    return (
      <>
        {name == 'location' && <MapCurve className={classes.outLineRed} />}
        {name == 'chat-outline' && <ChatBox className={classes.outLineRed} />}
        {name == 'phone' && <PhoneIcon className={classes.outLineRed} />}
        {name == 'cart-red' && <Cart className={classes.outLineRed} />}
      </>
    )
  }
  const handleChatNowClick = () => {
    setChatParams({ launchOption: MOVERS_EXISTING_CUST_CHAT_EVENT })
    setChatState(true)
  }

  useEffect(() => {
    setTimeout(() => {
      const isChatOpen = localStorage.getItem(`isChatOpen`)
      if (isChatOpen === 'true') {
        handleChatNowClick()
        localStorage.removeItem(`isChatOpen`)
        localStorage.removeItem(`redirectTo`)
      }
    }, 3000)
  }, [localStorage])
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Typography tagType="h2" styleType="h2" className={classes.title}>
          {title?.value}
        </Typography>
        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="stretch"
        >
          {lists?.list?.map((list: any, index: number) => (
            <Grid item sm={12} md={5} key={index} className={classes.wrapper}>
              <div className={classes.box}>
                <Typography
                  tagType="h3"
                  styleType="h4"
                  className={classes.heading}
                >
                  {list?.title?.value}
                </Typography>
                <Typography tagType="p" styleType="p1">
                  {list?.subTitle?.value}
                </Typography>
                {list?.options?.option?.map((option: any) =>
                  option?.icon?.value === 'location' ? (
                    <div
                      key={option.text?.value}
                      className={classes.iconWrapper}
                    >
                      {getIcon(option?.icon?.value)}
                      <Typography
                        tagType="p"
                        styleType="h6"
                        className={classes.optionTitle}
                      >
                        {option?.text?.value}
                      </Typography>
                    </div>
                  ) : null,
                )}
                {list?.buttonText?.value?.toLowerCase()?.includes('get') ? (
                  <Button
                    type="link"
                    text={list?.buttonText?.value}
                    className={classes.buttonSize}
                    href={`${origin}${list?.buttonUrl?.url}`}
                  />
                ) : (
                  <Button
                    type="button"
                    text={'Chat Now'}
                    className={classNames([
                      classes.buttonSize,
                      classes.buttonAlign,
                    ])}
                    onClick={handleChatNowClick}
                  />
                )}
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  )
}

export default FrontierInfo

const useStyles = makeStyles(({ breakpoints, typography }) => ({
  root: {
    backgroundColor: colors.main.midnightExpress,
  },
  container: {
    padding: '48px 24px',
    maxWidth: '1200px',
    margin: '0 auto',
    [breakpoints.down('md')]: {
      padding: '32px 16px',
    },
  },
  title: {
    color: colors.main.greenishBlue,
    textAlign: 'center',
    marginBottom: 32,
  },
  heading: {
    marginBottom: '12px',
    [breakpoints.down('md')]: {
      fontSize: typography.pxToRem(20),
    },
  },
  buttonSize: {
    display: 'flex',
    justifyContent: 'center',
    width: '80%',
    [breakpoints.down('sm')]: {
      width: '100% !important',
    },
  },
  wrapper: {
    [breakpoints.down('sm')]: {
      width: '100% !important',
    },
  },
  iconWrapper: {
    margin: '32px 0',
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      display: 'block',
      top: 6,
      marginRight: 8,
      height: 32,
      width: 32,
      // '&:hover': {
      //   '& path': {
      //     stroke: colors.main.dark,
      //   },
      // },
    },
  },
  outLineRed: {
    '& path': {
      fill: colors.main.brightRed,
    },
    // '&:hover': {
    //   '& path': {
    //     fill: colors.main.dark,
    //   },
    // },
  },
  box: {
    backgroundColor: colors.main.white,
    padding: '56px 80px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    '& p': {
      margin: 0,
      fontSize: typography.pxToRem(16),
      flex: 1,
    },
    [breakpoints.down('sm')]: {
      padding: '24px 32px 48px',
    },
  },
  optionTitle: {
    marginBottom: '32px',
    [breakpoints.down('sm')]: {
      marginBottom: 0,
    },
  },
  buttonAlign: {
    [breakpoints.down('sm')]: {
      marginTop: 32,
    },
  },
}))
