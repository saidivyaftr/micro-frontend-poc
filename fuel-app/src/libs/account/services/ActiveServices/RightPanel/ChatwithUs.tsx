import { Button, InjectHTML, Typography } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core/styles'
import { useChatState, useAppData } from 'src/hooks'
import { WELCOME_PAGE_LAUNCH_OPTION } from 'src/constants'
const ChatwithUs = () => {
  const classes = useStyles()
  const { setChatState, setChatParams } = useChatState()
  const handleChatClick = () => {
    setChatParams({
      launchOption: WELCOME_PAGE_LAUNCH_OPTION,
    })
    setChatState(true)
  }
  const ChatwithUs = useAppData('ChatwithUs', true)
  return (
    <div className={classes.tileClass}>
      <InjectHTML styleType={'p1'} value={ChatwithUs.iconLocation.value} />

      <Typography tagType="div" styleType="h5" className={classes.description}>
        {ChatwithUs.description.value}
      </Typography>
      <div className={classes.buttonDiv}>
        <Button
          type="link"
          onClick={handleChatClick}
          variant={'tertiary'}
          text={ChatwithUs?.buttonText?.value}
          className={classes.buttonClassName}
          hoverVariant="primary"
        />
      </div>
    </div>
  )
}

export default ChatwithUs

const useStyles = makeStyles(({ breakpoints }) => ({
  tileClass: {
    width: '100%',
  },

  addonsHeader: {
    display: 'flex',
    padding: '8px 16px',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    width: 130,
    borderRadius: 43,
  },
  addonsTitle: {
    fontSize: 12,
    fontWeight: 700,
    lineHeight: 14,
    marginBottom: 4,
  },
  description: { margin: '32px 0px 32px 0px' },
  buttonClassName: {
    marginTop: 16,
  },
  buttonDiv: {
    display: 'inline-block',
    [breakpoints.up('lg')]: {
      display: 'inline-block',
    },
  },
}))
