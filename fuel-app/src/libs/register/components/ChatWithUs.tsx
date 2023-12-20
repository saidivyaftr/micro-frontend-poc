import { makeStyles } from '@material-ui/core'
import { useChatState } from 'src/hooks'
import { Button, Typography } from '@/shared-ui/components'
import { useAppData } from '@/shared-ui/hooks'
import colors from '@/shared-ui/colors'

const ChatWithUS = ({ handleClose }: any) => {
  const classes = useStyles()
  const { setChatState } = useChatState()
  const { chatWithUs, needHelp } = useAppData('chatHelp', true)

  return (
    <>
      <div className={classes.chatHelpContainer}>
        <Typography fontType="mediumFont">{needHelp?.value}</Typography>
        <Button
          type="button"
          variant="lite"
          onClick={() => {
            if (handleClose) handleClose()
            setChatState(true)
          }}
          hoverVariant="primary"
          buttonSize="medium"
          className={classes.updateLinkBtn}
          text={chatWithUs?.value}
          data-tid="contact-support-link"
          triggerEvent={true}
        />
      </div>
    </>
  )
}

const useStyles = makeStyles(() => ({
  chatHelpContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: 8,
    alignItems: 'center',
  },
  updateLinkBtn: {
    minWidth: 0,
    height: 'auto',
    textDecoration: 'underline',
    cursor: 'pointer',
    '&:hover': {
      color: `${colors.main.brightRed} !important`,
    },
  },
}))

export default ChatWithUS
