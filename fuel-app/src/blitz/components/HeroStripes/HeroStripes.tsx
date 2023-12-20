import React, { useRef, useEffect } from 'react'
import clx from 'classnames'
import css from './HeroStripes.module.scss'
import { IHeroStripe, IHeroStripes } from './types'

const HeroStripes = ({
  content,
  backgroundImage = '',
  mobileBackgroundImage = '',
  className,
  stripeColor = 'secondary',
  stripeStyles,
  innerWrapperClassName,
  stripesClass,
  stripesTitleWrapperClass,
  rootBackgroundColorLeft,
  rootBackgroundColorRight,
}: IHeroStripes) => {
  const containerRef = useRef(null)
  useEffect(() => {
    setTimeout(() => {
      const targetElement: any = containerRef?.current
      if (targetElement?.style?.setProperty) {
        targetElement.style.setProperty(
          '--bg-desktop',
          `url(${backgroundImage})`,
        )
        targetElement.style.setProperty(
          '--bg-mobile',
          `url(${mobileBackgroundImage || backgroundImage})`,
        )
      }
    }, 200)
  }, [containerRef])

  return (
    <Wrapper
      rootBackgroundColorLeft={rootBackgroundColorLeft}
      rootBackgroundColorRight={rootBackgroundColorRight}
    >
      <div
        className={clx(css.root, className, {
          [css.removeRootMinHeight]: !mobileBackgroundImage || !backgroundImage,
        })}
        ref={containerRef}
      >
        <div className={clx(css.innerWrapper, innerWrapperClassName)}>
          <div className={css.container}>
            <div className={clx(css.stripes, stripesClass)}>
              <Stripe stripeColor={stripeColor} stripeStyles={stripeStyles} />
              <Stripe stripeColor={stripeColor} stripeStyles={stripeStyles} />
              <Stripe stripeColor={stripeColor} stripeStyles={stripeStyles} />
            </div>
            <div className={clx(css.titleWrapper, stripesTitleWrapperClass)}>
              {content}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}
const Stripe = ({ stripeColor, stripeStyles }: IHeroStripe) => {
  return (
    <div
      className={clx(css.stripe, {
        [css.primaryStripe]: stripeColor === 'primary',
        [css.tertiaryStripe]: stripeColor === 'tertiary',
      })}
      style={{
        height: stripeStyles?.height,
        marginBottom: stripeStyles?.marginBottom,
      }}
    >
      &nbsp;
    </div>
  )
}

const Wrapper = ({
  rootBackgroundColorLeft,
  rootBackgroundColorRight,
  children,
}: any) => {
  return rootBackgroundColorLeft && rootBackgroundColorRight ? (
    <div
      style={{
        backgroundImage: `linear-gradient(to right, ${rootBackgroundColorLeft} 50%, ${rootBackgroundColorRight} 50%)`,
      }}
    >
      {children}
    </div>
  ) : (
    <>{children}</>
  )
}

export default HeroStripes
