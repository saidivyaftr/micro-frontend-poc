import clx from 'classnames'
import { useMemo } from 'react'

export type HeroWrapperProps = {
  rootBackgroundColorLeft?: string
  rootBackgroundColorRight?: string
  children: JSX.Element
  className?: string
}

const HeroWrapper = ({
  rootBackgroundColorLeft,
  rootBackgroundColorRight,
  children,
  className,
}: HeroWrapperProps) => {
  const handleRootBackgroundColor = useMemo(() => {
    if (rootBackgroundColorLeft && rootBackgroundColorRight) {
      return `linear-gradient(to right, ${rootBackgroundColorLeft} 50%, ${rootBackgroundColorRight} 50%)`
    }
    return 'none'
  }, [rootBackgroundColorLeft, rootBackgroundColorRight])

  return (
    <div
      className={clx(className)}
      style={{ backgroundImage: handleRootBackgroundColor }}
    >
      {children}
    </div>
  )
}

export default HeroWrapper
