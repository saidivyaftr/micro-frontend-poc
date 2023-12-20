import colors from '@/shared-ui/colors'
import { Button, Typography } from '@/shared-ui/components'
import { WarningOutline } from '@/shared-ui/react-icons/index'
import { makeStyles } from '@material-ui/core'
import {
  SITE_INTERACTION,
  WELCOME_ORDER_NOT_FOUND_CHAT_WITH_US,
  WELCOME_PAGE_LAUNCH_OPTION,
} from 'src/constants'
import { useAppData, useChatState } from 'src/hooks'

const OrderNotFoundCard = () => {
  const classes = useStyles()
  const { setChatState, setChatParams } = useChatState()
  const { title, description, chatWithUs } =
    useAppData('OrderNotFound', true) || {}

  const handleChatClick = () => {
    setChatParams({
      launchOption: WELCOME_PAGE_LAUNCH_OPTION,
    })
    setChatState(true)
  }

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.cardWrapper}>
          <WarningOutline className={classes.warningIcon} />
          <Typography
            className={classes.title}
            styleType="h3"
            testId="test-title"
          >
            {title?.value}
          </Typography>
          <Typography
            className={classes.description}
            styleType="p1"
            testId="test-description"
          >
            <>
              {`${description?.value} `}
              <Button
                className={classes.button}
                type="button"
                variant="lite"
                text={chatWithUs?.value}
                buttonSize="small"
                onClick={handleChatClick}
                triggerEvent={true}
                eventObj={{
                  events: 'event5,event14',
                  eVar14: WELCOME_ORDER_NOT_FOUND_CHAT_WITH_US,
                }}
                interactionType={SITE_INTERACTION}
              />
            </>
          </Typography>
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: colors.main.newBackgroundGray,
    minHeight: 'calc(100vh - 180px)',
  },
  container: {
    padding: '5.25rem 1rem',
    [breakpoints.down('sm')]: {
      padding: '3rem 1rem',
    },
  },
  cardWrapper: {
    maxWidth: '62.5rem',
    margin: '0 auto',
    border: `1px solid ${colors.main.borderGrey}`,
    backgroundColor: colors.main.white,
    borderRadius: '2rem',
    padding: '5rem 7.5rem',
    textAlign: 'center',
    [breakpoints.down('sm')]: {
      width: '100%',
      height: '100%',
      padding: '3rem 1rem',
    },
  },
  warningIcon: {
    width: '48px',
    height: '48px',
    '& path': {
      fill: colors.main.brightRed,
    },
    [breakpoints.down('xs')]: {
      width: '40px',
      height: '40px',
    },
  },
  title: {
    margin: '2rem 0',
  },
  description: {
    width: '25rem',
    margin: 'auto',
    '& span': {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
    [breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  button: {
    textDecoration: 'underline',
    minWidth: 'auto',
    height: 'auto',
    fontSize: '1.125rem',
    lineHeight: '1.625rem',
    fontFamily: 'PP Object Sans',
    [breakpoints.down('xs')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
  },
}))
export default OrderNotFoundCard
