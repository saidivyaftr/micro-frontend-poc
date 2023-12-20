import React, { useState, useRef } from 'react'
import { InjectHTML } from '@/shared-ui/components'
import { ITooltip } from './types'
import clx from 'classnames'
import css from './Tooltip.module.scss'
import { useWindowDimensions } from 'src/hooks'

const Tooltip: React.FunctionComponent<ITooltip> = ({
  tooltipText,
  tooltipIcon,
  includeBorder = true,
  tooltipDirection = 'top',
  hideBorder = false,
  dropShadow = false,
  tooltipClassName = '',
  tooltipContentClass = '',
  tooltipArrowClass = '',
  containerRef: container = null,
  isDarkMode = false,
  recordAnalytics = () => undefined,
  TooltipStyleType = 'p3',
}) => {
  let hasAnalyticsRecorded = false
  const LEFT = -140
  const RIGHT = 140
  const [showPopover, setShowPopover] = useState(false)
  const tooltipRef: any = useRef(null)
  const { width } = useWindowDimensions()

  let { left } = tooltipRef?.current?.getBoundingClientRect?.() || {}

  let containerWidth = width < window?.outerWidth ? width : window?.outerWidth
  if (container?.current) {
    const { left: containerLeft, right: containerRight } =
      container?.current?.getBoundingClientRect?.() || {}
    if (containerLeft || containerRight) {
      containerWidth = containerRight - containerLeft
      left = left - containerLeft
    }
  }
  const offsetLeft = left ?? 0
  let TOOLTIP_LEFT =
    offsetLeft > Math.abs(LEFT) ? LEFT : width < 400 ? -offsetLeft : -20
  let TOOLTIP_RIGHT =
    containerWidth - 25 - offsetLeft > RIGHT
      ? RIGHT
      : containerWidth - 25 - offsetLeft

  if (TOOLTIP_RIGHT < RIGHT) {
    const difference = RIGHT - TOOLTIP_RIGHT
    TOOLTIP_LEFT = TOOLTIP_LEFT - difference
  }

  if (TOOLTIP_LEFT > LEFT) {
    const difference = Math.abs(TOOLTIP_LEFT) - Math.abs(LEFT)
    TOOLTIP_RIGHT = TOOLTIP_RIGHT + difference
  }

  const handleMouseEnter = () => {
    setShowPopover(true)
    if (recordAnalytics && !hasAnalyticsRecorded) {
      recordAnalytics()
      hasAnalyticsRecorded = true
    }
  }

  return (
    <div
      ref={tooltipRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setShowPopover(false)}
      className={clx(
        css.tooltipContainer,
        { [css.darkModeHover]: isDarkMode },
        tooltipClassName,
      )}
    >
      {tooltipIcon}

      {showPopover && (
        <>
          <div
            className={clx(css.tooltipCloud, tooltipContentClass, {
              [css.cloudBorder]: includeBorder,
              [css.bottomCloud]: tooltipDirection === 'bottom',
              [css.hideBorder]: hideBorder,
              [css.dropShadow]: dropShadow,
            })}
            style={{ left: TOOLTIP_LEFT, right: TOOLTIP_RIGHT }}
          >
            <InjectHTML
              className={css.tooltipText}
              styleType={TooltipStyleType}
              value={tooltipText}
            />
          </div>
          <div
            className={clx(css.tooltipCarrot, tooltipArrowClass, {
              [css.bottomTooltipCarrot]: tooltipDirection === 'bottom',
              [css.carrotDropShadow]: dropShadow,
              [css.hideBorder]: hideBorder,
            })}
          >
            &nbsp;
          </div>
        </>
      )}
    </div>
  )
}

export default Tooltip
