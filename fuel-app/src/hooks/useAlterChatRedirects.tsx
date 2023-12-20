import { useEffect } from 'react'
import useChatState from './useChatState'

const useAlterChatRedirects = (isLoaded: boolean) => {
  const { setChatState } = useChatState()

  const addAnchorEventListener = () => {
    if (isLoaded) {
      document.addEventListener(`click`, (e: any) => {
        if (
          e?.target?.id === 'enableChat' ||
          e?.target?.closest('#enableChat')
        ) {
          setChatState(true)
          e.preventDefault()
          return false
        }
      })
    }
  }
  useEffect(addAnchorEventListener, [isLoaded])
}

export default useAlterChatRedirects
