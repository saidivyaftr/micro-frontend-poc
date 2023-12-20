import React, { useEffect, useState } from 'react'
import clx from 'classnames'
import { ChevronUp } from '@/shared-ui/react-icons'
import { getBackgroundColor } from '@/shared-ui/theme/colors.helper'
import { IScrollTop } from './types'
import css from './ScrollTop.module.scss'

const ScrollTop: React.FunctionComponent<IScrollTop> = ({
  backgroundColor = 'secondary',
  className,
}: IScrollTop) => {
  const [isVisible, setIsVisible] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  useEffect(() => {
    // Button is displayed after scrolling for 500 pixels
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])
  if (!isVisible) return null
  return (
    <div
      className={clx(css.root, className, getBackgroundColor(backgroundColor))}
      onClick={scrollToTop}
    >
      <div className={css.icon}>
        <ChevronUp width="17" height="17" />
      </div>
    </div>
  )
}

export default ScrollTop
