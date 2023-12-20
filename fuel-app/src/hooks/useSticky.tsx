import { useEffect, useState } from 'react'

const useSticky = function () {
  const [isSticky, setSticky] = useState(false)
  const [stickyTop, setStickyTop] = useState(0)

  const handleScroll = () => {
    const top = window.pageYOffset || document.documentElement.scrollTop
    setSticky(top >= stickyTop)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [stickyTop])

  return { isSticky, setStickyTop }
}

export default useSticky
