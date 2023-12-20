import { useEffect, useState } from 'react'
import useDelay from './useDelay'
import useIsLoadingFromApp from './useIsLoadingFromApp'
import { checkSessionAction } from 'src/redux/slicers/session'
import { useDispatch } from 'react-redux'
import useChatState from './useChatState'
import { useSessionState } from 'src/selector-hooks'
import useAlterChatRedirects from './useAlterChatRedirects'
import useAlterTermLinks from './useAlterTermLinks'

export const useMainLayoutEffects = ({
  showChat,
  isLoading,
}: {
  showChat?: boolean
  isLoading?: boolean
}) => {
  const dispatch = useDispatch()

  const isChat = useDelay(showChat)
  const isFromMobileApp = useIsLoadingFromApp()
  const { loadLoggedInUserStateToChatbotProps } = useChatState()
  const { isLoading: isAuthenticating, sessionValid } = useSessionState()

  const [chatType, setChatType] = useState('')

  const isAuthenticated = !isAuthenticating && sessionValid

  useAlterChatRedirects(!isLoading)
  useAlterTermLinks(!isLoading)

  // Set chat type
  useEffect(() => {
    if (isChat) {
      const chat = isFromMobileApp ? 'MOBILE' : 'APP'
      setChatType(chat)
    }
  }, [showChat, isFromMobileApp, isChat])

  // Check for session on load
  useEffect(() => {
    dispatch(checkSessionAction())
  }, [])

  // Set Auth code and status to KOREDATA - Chatbot
  useEffect(() => {
    if (isAuthenticated) {
      loadLoggedInUserStateToChatbotProps()
    }
  }, [isAuthenticated])

  return { chatType }
}
