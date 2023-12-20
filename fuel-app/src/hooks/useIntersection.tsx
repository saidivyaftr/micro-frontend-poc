import { useState, useEffect } from 'react'

const useIntersection = (element: any, rootMargin: string) => {
  const [isVisible, setState] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState(entry.isIntersecting)
          observer.unobserve(element.current)
        }
      },
      { rootMargin },
    )

    element.current && observer.observe(element.current)

    return () => element.current && observer.unobserve(element.current)
  }, [])

  return isVisible
}

export default useIntersection
