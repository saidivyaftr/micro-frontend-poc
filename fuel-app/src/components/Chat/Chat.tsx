import { useState, useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core'
import colors from 'src/styles/theme/colors'
import ChatIcon from './ChatIcon'
import { Typography } from '@/shared-ui/components'
import { useWindowDimensions, useChatState } from 'src/hooks'
import { SESSION_STORAGE } from 'src/constants'
// import { chatAPI } from 'src/redux/slicers/appConfigSlice'
// import { useDispatch } from 'react-redux'

const Chat = () => {
  const iframeRef = useRef(null)
  const { isChatOpen, setChatState } = useChatState()
  const { height } = useWindowDimensions()
  const previousChatMountedSession =
    sessionStorage.getItem(SESSION_STORAGE.CHAT_MOUNTED) === 'true'
  const previousShowChatSession =
    sessionStorage.getItem(SESSION_STORAGE.SHOW_CHAT) === 'true'
  const [isChatMounted, setIsChatMounted] = useState(previousChatMountedSession)
  const classes = useStyles(height)

  useEffect(() => {
    if (isChatOpen) {
      setIsChatMounted(true)
      sessionStorage.setItem(SESSION_STORAGE.CHAT_MOUNTED, 'false')
      console.log('step1::::')
      // dispatch(chatAPI())
    }
  }, [isChatOpen])

  useEffect(() => {
    setIsChatMounted(previousChatMountedSession)
    setChatState(previousShowChatSession)
  }, [])

  useEffect(() => {
    if (isChatMounted && window) {
      const eventMethod: any = !!window.addEventListener
        ? 'addEventListener'
        : 'attachEvent'
      const eventer: any = window[eventMethod]
      const messageEvent =
        eventMethod == 'attachEvent' ? 'onmessage' : 'message'
      const displayMessage = (e: any) => {
        switch (e?.data) {
          case 'CHAT-MINIMIZE':
            return handleChatMinimize()
          case 'CHAT-CLOSE':
            return handleChatClose()
          default:
            return null
        }
      }
      eventer(messageEvent, displayMessage, false)
      return () => {
        if (eventMethod === 'addEventListener') {
          window.removeEventListener('onMessage', displayMessage, false)
        }
      }
    }
  }, [isChatMounted])

  const toggleChat = () => {
    if (!isChatMounted) {
      setIsChatMounted(true)
      sessionStorage.setItem(SESSION_STORAGE.CHAT_MOUNTED, 'true')
    }
    setChatState(true)
    sessionStorage.setItem(SESSION_STORAGE.SHOW_CHAT, 'true')
  }

  const handleChatMinimize = () => {
    setChatState(false)
    sessionStorage.setItem(SESSION_STORAGE.SHOW_CHAT, 'false')
  }

  const handleChatClose = () => {
    setChatState(false)
    setIsChatMounted(false)
    sessionStorage.setItem(SESSION_STORAGE.SHOW_CHAT, 'false')
    sessionStorage.setItem(SESSION_STORAGE.CHAT_MOUNTED, 'false')
  }

  return (
    <div>
      {!isChatOpen && (
        <button
          className={`chat-button ${classes.chatButton}`}
          onClick={toggleChat}
        >
          <ChatIcon />
          <Typography
            className={classes.desktopChatText}
            styleType="h5"
            fontType="regularFont"
          >
            Chat Live
          </Typography>
          <Typography
            className={classes.mobileChatText}
            styleType="h5"
            fontType="regularFont"
          >
            Chat
          </Typography>
        </button>
      )}
      {isChatMounted && (
        <iframe
          ref={iframeRef}
          src={getIFrameURL()}
          className={`${classes.iframe} ${
            isChatOpen ? '' : classes.hideIframe
          }`}
        />
      )}
    </div>
  )
}

const getIFrameURL = () => {
  const parentOrigin = window?.location?.origin || 'https://frontier.com'
  if (parentOrigin === 'http://localhost:3000') {
    return 'https://pprd.frontier.com/standalone-chat'
  }
  return `${parentOrigin}/standalone-chat`
}

const useStyles = makeStyles(({ breakpoints }) => ({
  chatButton: {
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    bottom: 30,
    right: 5,
    zIndex: 99999,
    padding: 16,
    height: 60,
    width: 200,
    borderRadius: 30,
    backgroundColor: colors.main.greenishBlue,
    color: colors.main.blackRock,
    border: 0,
    cursor: 'pointer',
    [breakpoints.down('xs')]: {
      height: 80,
      width: 80,
      flexDirection: 'column',
      borderRadius: 40,
    },
  },
  iframe: ({ height }: any) => ({
    position: 'fixed',
    bottom: 20,
    right: 30,
    width: 490,
    height: 'auto',
    maxHeight: 'calc(100vh - 100px)',
    minHeight: height > 780 ? 700 : 'calc(100vh - 85px)',
    zIndex: 99999,
    border: 0,
    [breakpoints.down('xs')]: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: '100vw',
      height: '100vh',
      minHeight: '100vh',
    },
  }),
  hideIframe: {
    display: 'none',
  },
  desktopChatText: {
    display: 'block',
    marginLeft: 10,
    [breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  mobileChatText: {
    display: 'none',
    [breakpoints.down('xs')]: {
      display: 'block',
    },
  },
}))

export default Chat
