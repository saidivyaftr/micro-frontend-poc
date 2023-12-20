import { useEffect, useState } from 'react'

const useDelay = (value: any, delay = 300) => {
  const [debounceValue, setDebounceValue] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value)
    }, delay)
    return () => {
      clearTimeout(timeout)
    }
  }, [value, delay])

  return debounceValue
}

export default useDelay
