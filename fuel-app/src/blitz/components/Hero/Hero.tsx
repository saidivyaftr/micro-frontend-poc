import React, { useRef, useEffect } from 'react'
import clx from 'classnames'
import Image from 'next/future/image'
import {
  Typography,
  InjectHTML,
  Button,
  TooltipPopover,
} from '@/shared-ui/components'
import { IHeroProps, ITitleProps } from './types'
import css from './Hero.module.scss'
import { IHeroStripe } from '../HeroStripes/types'
import InfoIconWhite from '@/shared-ui/react-icons/info-icon-white'

const Hero: React.FunctionComponent<IHeroProps> = ({
  styles,
  backgroundColor = 'gravity',
  bkgImgClassName,
  eyebrowText,
  eyebrowTextColor,
  eyebrowTextClassName,
  heroImage,
  heroImageWrapperClassName,
  heroImageSize,
  subHeader,
  subHeaderColor = 'tertiary',
  preHeaderTitle,
  primaryButton,
  secondaryButton,
  backgroundImage,
  mobileBackgroundImage,
  content,
  title1,
  title1Image,
  title1MobileImage,
  title1Color,
  title2,
  title2Color,
  eyebrowTagType = 'div',
  titleTagType = 'h1',
  className,
  contentClassName,
  removeStripes = true,
  stripesClass,
  stripeColor = 'secondary',
  stripeStyles,
  legalText,
  legalTextColor,
  legalTextClassName,
  legalStyleType = 'legal',
  toolTipText,
  leftContentClassName,
  subtitleClass,
  buttonsContainerClass,
  titleClass,
  wrapperClassName,
}: IHeroProps) => {
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
          `url(${mobileBackgroundImage})`,
        )
      }
    }, 200)
  }, [containerRef, mobileBackgroundImage, backgroundImage])

  const titleRef = useRef(null)

  useEffect(() => {
    setTimeout(() => {
      const parentElement: any = titleRef?.current
      const targetElement = parentElement?.querySelector('h1')
      if (targetElement?.style?.setProperty) {
        targetElement.style.setProperty(
          '--title-bg-desktop',
          `url(${title1Image})`,
        )
        targetElement.style.setProperty(
          '--title-bg-mobile',
          `url(${title1MobileImage})`,
        )
      }
    }, 200)
  }, [titleRef])

  return (
    <Wrapper className={wrapperClassName} style={styles}>
      <div
        id="hero"
        className={clx(css.hero, className, {
          [css.bkgGravity]: backgroundColor === 'gravity',
          [css.bkgBlack]: backgroundColor === 'black',
          [css.bkgWhite]: backgroundColor === 'clarity',
          [css.bkgGravity5]: backgroundColor === 'gravity5',
        })}
        ref={containerRef}
        data-testId="heroSection"
      >
        <div className={clx(css.heroBkgd, bkgImgClassName)}>
          <div className={clx(css.heroContainer, contentClassName)}>
            <div
              className={clx(css.stripes, stripesClass, {
                [css.winStripes]: navigator.userAgent.indexOf('Windows') > -1,
                [css.removeStripes]: removeStripes,
              })}
            >
              <Stripe stripeColor={stripeColor} stripeStyles={stripeStyles} />
              <Stripe stripeColor={stripeColor} stripeStyles={stripeStyles} />
              <Stripe stripeColor={stripeColor} stripeStyles={stripeStyles} />
            </div>
            <div className={clx(css.heroLeft, leftContentClassName)}>
              {preHeaderTitle && (
                <Typography styleType="p3" color="tertiary" fontType="boldFont">
                  {preHeaderTitle}
                </Typography>
              )}
              {content ? (
                content
              ) : titleTagType === 'h2' ? (
                <div className={clx(css.h1Hero, titleClass)} ref={titleRef}>
                  <Title
                    eyebrowText={eyebrowText}
                    eyebrowTagType={eyebrowTagType}
                    eyebrowTextColor={eyebrowTextColor}
                    eyebrowTextClassName={eyebrowTextClassName}
                    title1={title1}
                    title2={title2}
                    title1Color={title1Color}
                    title2Color={title2Color}
                    title1Image={title1Image}
                    title1MobileImage={title1MobileImage}
                    titleTagType={'h2'}
                    titleClass={titleClass}
                  />
                </div>
              ) : (
                <div className={clx(css.h1Hero, titleClass)} ref={titleRef}>
                  <Title
                    eyebrowText={eyebrowText}
                    eyebrowTextColor={eyebrowTextColor}
                    eyebrowTagType={eyebrowTagType}
                    eyebrowTextClassName={eyebrowTextClassName}
                    title1={title1}
                    title2={title2}
                    title1Color={title1Color}
                    title2Color={title2Color}
                    title1Image={title1Image}
                    title1MobileImage={title1MobileImage}
                    titleTagType={'h1'}
                    titleClass={titleClass}
                  />
                </div>
              )}
              {subHeader && !content && (
                <div className={clx({ [css.subHeaderInline]: toolTipText })}>
                  <InjectHTML
                    className={clx(
                      {
                        [css.subHeaderWithOutToolTip]: !toolTipText,
                        [css.subHeaderInline]: toolTipText,
                      },
                      css.subHeader,
                      subtitleClass,
                    )}
                    styleType="h5"
                    tagType="h2"
                    value={subHeader as string}
                    color={subHeaderColor}
                  />
                  {toolTipText && !content && (
                    <TooltipPopover
                      tooltipClassName={css.toolTip}
                      tooltipContent={toolTipText}
                      tooltipDirection="bottom"
                      tooltipIcon={<InfoIconWhite />}
                      dropShadow={false}
                    />
                  )}
                </div>
              )}
              {(primaryButton || secondaryButton) && (
                <div
                  className={clx(css.buttonsContainer, buttonsContainerClass)}
                >
                  {primaryButton?.text && (
                    <Button
                      {...primaryButton}
                      hoverVariant="secondary"
                      className={clx(
                        primaryButton.className,
                        css.primaryButton,
                      )}
                    />
                  )}
                  {secondaryButton?.text && (
                    <Button
                      {...secondaryButton}
                      variant="white"
                      className={clx(
                        secondaryButton.className,
                        css.secondaryButton,
                      )}
                    />
                  )}
                </div>
              )}
              {heroImage && (
                <div className={heroImageWrapperClassName}>
                  <Image
                    loader={() => heroImage}
                    data-testid="heroImage"
                    src={heroImage}
                    width={heroImageSize?.width || 95}
                    height={heroImageSize?.height || 95}
                    alt={title1 as string}
                  />
                </div>
              )}
              {legalText && (
                <InjectHTML
                  color={legalTextColor ? legalTextColor : 'tertiary'}
                  className={clx(css.legalText, legalTextClassName)}
                  tagType="p"
                  data-testid="caption"
                  styleType={legalStyleType}
                  value={legalText as string}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

const Title = (props: ITitleProps) => {
  return (
    <>
      {props?.eyebrowText && (
        <InjectHTML
          color={props?.eyebrowTextColor || 'tertiary'}
          styleType="p3"
          data-testid="hero-banner-eyebrowtext"
          tagType={props?.eyebrowTagType}
          className={props.eyebrowTextClassName}
          value={props?.eyebrowText as string}
        />
      )}
      {props?.title1 && (
        <InjectHTML
          color={props?.title1Color || 'tertiary'}
          styleType={'h1'}
          data-testid="hero-banner-title1"
          tagType={props.titleTagType === 'h1' ? 'h1' : 'h2'}
          className={clx(css.h1MainTitle, props.titleClass, {
            [css.h1LogoTitle]: props?.title1Image,
          })}
          value={props?.title1 as string}
        />
      )}
      {props?.title2 && (
        <Typography
          styleType="h1"
          tagType={'h2'}
          data-testId="title2"
          color={props?.title2Color || 'secondary'}
          className={css.h1MainTitle}
          data-testid="hero-banner-title2"
        >
          {props?.title2}
        </Typography>
      )}
    </>
  )
}

const Wrapper = ({ children, className }: any) => {
  return <div className={className}>{children}</div>
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

export default Hero
