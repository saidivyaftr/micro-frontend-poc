import { useEffect } from 'react'
import useShowTerms from './useShowTerms'

const useAlterChatRedirects = (isLoaded: boolean) => {
  const { setShowTerms } = useShowTerms()

  const addAnchorEventListener = () => {
    if (isLoaded) {
      document.addEventListener(`click`, (e: any) => {
        if (e?.target?.id === 'terms' || e?.target?.closest('#terms')) {
          setShowTerms(true)
          e.preventDefault()
          return false
        }
      })
    }
  }
  useEffect(addAnchorEventListener, [isLoaded])
}

export default useAlterChatRedirects
