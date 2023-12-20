import { useEffect } from 'react'
import useWindowDimensions from './useWindowDimensions'

const useUpdateSearchPlaceholder = () => {
  const { width } = useWindowDimensions()
  const IS_MOBILE = width <= 768

  const updatePlaceholder = () => {
    try {
      const element: any = document.getElementById(
        'yxt-SearchBar-input--yext-help-center',
      )
      if (element && element.placeholder) {
        const isHoldingRightPlaceholder = IS_MOBILE
          ? element.placeholder === 'Search for quick answers'
          : element.placeholder === 'Search for quick answers to your questions'
        if (!isHoldingRightPlaceholder) {
          element.placeholder = IS_MOBILE
            ? 'Search for quick answers'
            : 'Search for quick answers to your questions'
        }
        return true
      }
      return false
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    let limiter = 50
    const intervalId = setInterval(() => {
      const isUpdated = updatePlaceholder()
      limiter--
      if (isUpdated || limiter <= 0) {
        clearInterval(intervalId)
      }
    }, 500)
    return () => {
      clearInterval(intervalId)
    }
  }, [IS_MOBILE])
}

export default useUpdateSearchPlaceholder
