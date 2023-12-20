import React, { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import clx from 'classnames'
import InfoIconWhite from '@/shared-ui/react-icons/info-icon-white'
import { InjectHTML } from '@/shared-ui/components'
import { useWindowDimensions } from 'src/hooks'
import css from './TooltipPopover.module.scss'
import { ITooltipPopover } from './types'

const TooltipPopover: React.FunctionComponent<ITooltipPopover> = ({
  contentWidth = 300,
  tooltipIcon = <InfoIconWhite />,
  variant = 'primary',
  dropShadow = true,
  roundedCorner = true,
  hideBorder = false,
  tooltipClassName = '',
  tooltipDirection = 'top',
  tooltipContent,
  tooltipContentClassName,
  hideTooltip,
  OFFSET = 1,
  tooltipOpen,
  tooltipActiveContent,
}) => {
  const tooltip: any = useRef()
  const tooltipRef: any = useRef()
  const tooltipContainerRef: any = useRef()

  const windowDimensions = useWindowDimensions()

  const [isOpen, setIsOpen] = useState(false)
  const [tooltipCarrotStyle, setTooltipCarrotStyle] = useState({
    top: OFFSET,
    left: OFFSET,
  })
  const [tooltipContainerStyle, setTooltipContainerStyle] = useState<any>({
    top: OFFSET,
    left: OFFSET,
    width: contentWidth,
  })
  const [hideOnMouseLeave, setHideOnMouseLeave] = useState<boolean>(true)

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (tooltipRef.current && tooltipRef.current.contains(event.target)) {
        if ((isOpen && hideOnMouseLeave) || (!isOpen && hideOnMouseLeave)) {
          setIsOpen(true)
        } else {
          setIsOpen(false)
        }
      }

      if (
        tooltipContainerRef.current &&
        !tooltipContainerRef.current.contains(event.target)
      ) {
        if (!hideOnMouseLeave) {
          setIsOpen(false)
          setHideOnMouseLeave(true)
        }
      }
    }

    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [isOpen, hideOnMouseLeave])

  useEffect(() => {
    tooltipOpen && tooltipOpen(isOpen)
    tooltipActiveContent && tooltipActiveContent(tooltipContent)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const { left, top, height, width } =
      tooltipRef?.current?.getBoundingClientRect?.() || {}
    const tooltipContainerBoundingRect =
      tooltipContainerRef?.current?.getBoundingClientRect?.() || {}
    if (!width) {
      return
    }
    const tooltipContentWidth =
      contentWidth > windowDimensions.width
        ? windowDimensions.width - (width + OFFSET * 2)
        : contentWidth
    const midOfContentWidth = tooltipContentWidth / 2
    const right = windowDimensions.width - left - OFFSET * 2

    let TOOLTIP_LEFT = OFFSET
    if (left > midOfContentWidth) {
      TOOLTIP_LEFT = left - midOfContentWidth
    }
    if (right < midOfContentWidth) {
      TOOLTIP_LEFT = left - tooltipContentWidth + right - (width + OFFSET)
    }

    const TOOLTIP_TOP =
      top + window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0

    setTooltipContainerStyle({
      ...tooltipContainerStyle,
      left: TOOLTIP_LEFT,
      top:
        tooltipDirection == 'top'
          ? TOOLTIP_TOP - tooltipContainerBoundingRect.height - OFFSET * 4
          : TOOLTIP_TOP + height + OFFSET * 4,
      maxWidth: tooltipContentWidth,
    })
    setTooltipCarrotStyle({
      ...tooltipCarrotStyle,
      left: left - TOOLTIP_LEFT + 2,
      top:
        tooltipDirection == 'top'
          ? tooltipContainerBoundingRect.height - 8
          : -8,
    })
  }, [isOpen])

  useEffect(() => {
    if (hideTooltip) {
      setIsOpen(false)
    }
  }, [hideTooltip])

  const handleMouseLeave = () => {
    if (hideOnMouseLeave) {
      setIsOpen(false)
    }
  }

  return (
    <>
      <span
        className={clx(
          css.tooltipIcon,
          {
            [css.primary]: variant === 'primary',
            [css.opened]: isOpen,
          },
          tooltipClassName,
        )}
        ref={tooltipRef}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={handleMouseLeave}
        onClick={() => setHideOnMouseLeave(!hideOnMouseLeave)}
      >
        {tooltipIcon}
      </span>
      {isOpen &&
        ReactDOM.createPortal(
          <div
            ref={tooltipContainerRef}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={handleMouseLeave}
            className={css.tooltipContainer}
            style={tooltipContainerStyle}
          >
            <div
              ref={tooltip}
              className={clx(css.tooltipContent, tooltipContentClassName, {
                [css.dropShadow]: dropShadow,
                [css.hideBorder]: hideBorder,
                [css.roundedCorner]: roundedCorner,
              })}
            >
              <InjectHTML
                className={css.tooltipText}
                styleType="p3"
                value={tooltipContent}
              />
            </div>
            <div
              style={tooltipCarrotStyle}
              className={clx(css.tooltipCarrot, {
                [css.carrotDropShadow]: dropShadow,
                [css.hideBorder]: hideBorder,
                [css.bottomTooltipCarrot]: tooltipDirection === 'bottom',
              })}
            />
          </div>,
          document.body,
        )}
    </>
  )
}

export default TooltipPopover
