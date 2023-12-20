import { makeStyles } from '@material-ui/core/styles'
import { InjectHTML } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useChatState } from 'src/hooks'
import colors from '@/shared-ui/colors'
const PageEndChatbotBanner = ({ data }: any) => {
  const { title, titleColor, backgroundColor } = data
  const classes = customStyles({
    backgroundColor: backgroundColor?.Color?.field?.value,
  })()

  const { setChatState } = useChatState()
  return (
    <div data-testid="PageEndChatbotBanner" className={classes.root}>
      <div className={classes.wrapper}>
        {title?.value && (
          <InjectHTML
            tagType="h6"
            value={title?.value}
            color={titleColor?.Color?.field?.value || 'default'}
            className={classes.title}
          />
        )}
        <img
          src="https://vsgprdstopaasrg-151210-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Icons/chat-min-smile"
          className={classes.buttonSize}
          alt="CHAT NOW"
          onClick={() => {
            setChatState(true)
            try {
              const chat = document.getElementsByClassName(
                'minimized',
              ) as HTMLCollectionOf<HTMLElement>
              chat[0]?.click()
            } catch (e) {}
          }}
        ></img>
      </div>
    </div>
  )
}

const customStyles = ({ backgroundColor }: any) =>
  makeStyles(({ breakpoints }) => ({
    root: {
      backgroundColor: backgroundColor || colors.main.midnightExpress,
      textAlign: 'center',
    },
    wrapper: {
      ...COMPONENT_WRAPPER,
      padding: '2rem',
      display: 'flex',
      'justify-content': 'center',
      [breakpoints.down('sm')]: {
        display: 'block',
      },
    },
    buttonSize: {
      display: 'inline',
      width: '175px',
      [breakpoints.down('sm')]: {
        display: 'flex',
        width: '100% !important',
        height: '48px',
      },
    },
    title: {
      display: 'inline',
      marginRight: '2rem',
      [breakpoints.down('sm')]: {
        display: 'block',
        margin: '1rem 0',
        textAlign: 'center',
      },
    },
  }))

export default PageEndChatbotBanner
