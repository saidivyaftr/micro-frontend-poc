import { MutableRefObject } from 'react'
import { ITypographyStyleType } from '../Typography/types'

export interface ITooltip {
  tooltipText: string
  tooltipIcon?: JSX.Element
  includeBorder?: boolean
  tooltipDirection?: ITooltipDirection
  hideBorder?: boolean
  dropShadow?: boolean
  tooltipClassName?: string
  variant?: 'new-design'
  tooltipContentClass?: string
  tooltipArrowClass?: string
  containerRef?: MutableRefObject<any>
  isDarkMode?: boolean
  recordAnalytics?: () => undefined | void
  TooltipStyleType?: ITypographyStyleType
}
export type ITooltipDirection = 'top' | 'bottom'
