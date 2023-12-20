import { makeStyles } from '@material-ui/core'
import colors from '@/shared-ui/colors'
import { Typography } from 'src/blitz'
import { CardWithTitle } from '@/shared-ui/components/Card/Card'
import ChatIcon from '@/shared-ui/react-icons/ChatIcon'
import useChatState from '@/shared-ui/hooks/useChatState'
import useAppData from '@/shared-ui/hooks/useAppData'
import {
  SITE_INTERACTION,
  WELCOME_CHATBOT_OPEN,
  WELCOME_PAGE_LAUNCH_OPTION,
} from 'src/constants'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'

const QuestionsAboutOrderCard = () => {
  const classes = useStyles()
  const { setChatState, setChatParams } = useChatState()
  const { title, description, chatNow } =
    useAppData('QuestionsAboutOrder', true) || {}

  const onChatClickHandler = () => {
    setChatParams({
      launchOption: WELCOME_PAGE_LAUNCH_OPTION,
    })
    DTMClient.triggerEvent(
      {
        events: 'event14,event5',
        eVar14: WELCOME_CHATBOT_OPEN,
      },
      'tl_o',
      SITE_INTERACTION,
    )
    setChatState(true)
  }

  return (
    <CardWithTitle className={classes.cardContainer}>
      <div className={classes.container}>
        <div className={classes.textContainer}>
          <Typography styleType="h5" testId="test-title">
            {title?.value}
          </Typography>
          <Typography styleType="p1" testId="test-description">
            {description?.value}
          </Typography>
        </div>
        <button className={classes.chatNowButton} onClick={onChatClickHandler}>
          <ChatIcon />
          <Typography
            testId="test-chatNow"
            className={classes.chatNowtext}
            styleType="h6"
            fontType="boldFont"
          >
            {chatNow?.value}
          </Typography>
        </button>
      </div>
    </CardWithTitle>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '3rem 1rem',
    gap: '1rem',
    [breakpoints.up('xs')]: {
      padding: '2rem 1rem',
      gap: '2rem',
    },
    [breakpoints.up('md')]: {
      padding: '3rem',
    },
    [breakpoints.up('lg')]: {
      padding: '3rem 1rem',
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    [breakpoints.down('md')]: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
    },
    [breakpoints.down('sm')]: {
      justifyContent: 'space-between',
    },
    [breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'unset',
    },
  },
  textContainer: {
    gap: '1rem',
    display: 'flex',
    flexDirection: 'column',
    [breakpoints.down('md')]: {
      maxWidth: '60%',
    },
    [breakpoints.down('sm')]: {
      maxWidth: '100%',
    },
  },
  chatNowtext: {
    color: 'white',
    lineHeight: '1.5rem',
    [breakpoints.down('xs')]: {
      fontSize: '1.125rem',
    },
  },
  chatNowButton: {
    color: colors.main.white,
    textTransform: 'uppercase',
    cursor: 'pointer',
    borderRadius: '2rem',
    border: 0,
    height: '3rem',
    display: 'flex',
    background: colors.main.black,
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    maxWidth: '16.125rem',
    padding: '0 2rem',
    '&:hover': {
      backgroundColor: colors.main.primaryRed,
    },
    [breakpoints.up('sm')]: {
      width: 'fit-content',
      minWidth: '13.5rem',
    },
    [breakpoints.down('xs')]: {
      maxWidth: '100%',
    },
  },
}))

export default QuestionsAboutOrderCard
