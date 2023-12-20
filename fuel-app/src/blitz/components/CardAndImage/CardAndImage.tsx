import { useEffect, useRef } from 'react'
import { InjectHTML, TooltipPopover } from '@/shared-ui/components'
import { ICardAndImageProps } from './index'
import css from './CardAndImage.module.scss'
import { useWindowDimensions } from 'src/hooks'
import clx from 'classnames'
import InfoIconWhite from '@/shared-ui/react-icons/info-icon-white'

const CardAndImage = (props: ICardAndImageProps) => {
  const { width } = useWindowDimensions()
  const {
    heading,
    copy = '',
    imageMobile,
    imageTablet,
    altText,
    legalText,
    tooltipContent,
    className = 'copyClassName',
    titleClassName = '',
  } = props
  const containerRef = useRef(null)
  const isMobile = width <= 768
  useEffect(() => {
    const targetElement: any = containerRef?.current
    if (isMobile) {
      targetElement.style.setProperty('--bg-mobile', `url(${imageMobile})`)
    } else {
      targetElement.style.setProperty('--bg-tablet', `url(${imageTablet})`)
    }
  }, [width, isMobile])

  return (
    <div className={css.cardAndImage}>
      <div className={css.contentLeft}>
        <InjectHTML
          className={clx(css.heading, titleClassName)}
          tagType="h2"
          styleType="h4"
          testId="test-heading"
          value={heading}
        />
        <div>
          {copy && (
            <InjectHTML
              styleType="p1"
              testId="test-copy"
              className={clx(css.copy, className)}
              value={copy}
            />
          )}
          {tooltipContent && (
            <TooltipPopover
              tooltipIcon={<InfoIconWhite />}
              tooltipContent={tooltipContent}
              dropShadow={false}
              tooltipClassName={css.toolTipContent}
            />
          )}
          {legalText && (
            <InjectHTML
              className={css.legalDisclaimer}
              styleType="legal"
              value={legalText}
            />
          )}
        </div>
      </div>
      <div
        className={css.contentRight}
        data-testid="card-and-image-background"
        aria-label={altText}
        ref={containerRef}
      >
        &nbsp;
      </div>
    </div>
  )
}

export default CardAndImage
