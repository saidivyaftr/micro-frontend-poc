import getConfig from 'next/config'
import Script from 'next/script'
import { useChatState } from 'src/hooks'
import StyleSheet from 'src/utils/link'
import { useEffect } from 'react'

const { publicRuntimeConfig } = getConfig()
const sdkVersion = publicRuntimeConfig.sdkVersion

const chatBotFolder = `${publicRuntimeConfig.S3_URL}/chatbot/`

declare global {
  interface Window {
    KoreChatSDK: any
  }
}

const Chatbot = () => {
  const { isChatOpen, setChatState } = useChatState()

  useEffect(() => {
    if (isChatOpen) {
      localStorage.removeItem('kr-cw-state')
      try {
        window.KoreChatSDK.chatWindowInstance.destroy()
      } catch (e) {
        console.log(e)
      }
      const element = document.querySelector(
        '.kore-chat-window .minimized > img',
      ) as HTMLElement
      if (element) {
        element.click()
        setChatState(false)
      }
    }
  }, [isChatOpen])

  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`${chatBotFolder}${sdkVersion}/kore-chatbot-v2-fuel.min.js`}
      />
      <StyleSheet
        href={`${chatBotFolder}${sdkVersion}/kore-chatbot-v2-fuel.min.css`}
        lazyLoad={true}
      />
    </>
  )
}

export default Chatbot
