import { Button, RichText } from '@/shared-ui/components'
import { MessageIcon } from '@/shared-ui/react-icons'
import { makeStyles } from '@material-ui/core'
import { useChatState } from 'src/hooks'

const HomeShieldEliteModal = ({
  content = '',
  modalCallBtnUrl,
  modalCallBtnText,
  modalChatBtnText,
  onClose,
}: HomeShieldEliteModalProps) => {
  const classes = useStyles()
  const { setChatState } = useChatState()

  const openChat = () => {
    onClose && onClose()
    setChatState(true)
  }

  return (
    <div>
      <RichText
        data={{
          content: {
            value: content,
          },
        }}
        wrapperClassName={classes.richText}
      />
      <div className={classes.actionContainer}>
        {modalChatBtnText && (
          <Button
            type="button"
            className={classes.messageBtn}
            text={
              <span className={classes.messageBtnText}>
                <MessageIcon /> {modalChatBtnText}
              </span>
            }
            onClick={openChat}
          />
        )}
        {modalCallBtnText && (
          <Button
            type="link"
            variant="tertiary"
            className={classes.messageBtn}
            text={<span>{modalCallBtnText}</span>}
            href={modalCallBtnUrl}
          />
        )}
      </div>
    </div>
  )
}

interface HomeShieldEliteModalProps {
  content?: string
  modalCallBtnUrl?: string
  modalCallBtnText?: string
  modalChatBtnText?: string
  onClose?: () => void
  chatObjectId: string
}

const useStyles = makeStyles(({ breakpoints }) => ({
  modalChatBtnText: {},
  messageBtnText: { display: 'flex', gap: '0.5rem', justifyContent: 'center' },
  actionContainer: {
    display: 'flex',
    gap: '1rem',
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  richText: {
    maxWidth: 'unset',
    padding: 0,
    '& li': { paddingBottom: '0.5rem !important' },
    '& p ': { marginBottom: '1rem' },
  },
  messageBtn: {
    textTransform: 'uppercase',
    width: 'fit-content',
    [breakpoints.down('sm')]: {
      padding: '0.625rem',
      width: '100%',
    },
  },
}))
export default HomeShieldEliteModal
