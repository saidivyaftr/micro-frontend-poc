/* eslint-disable no-unused-vars */
export interface ITooltipPopover {
  tooltipContent: string
  variant?: ITooltipVariant
  tooltipDirection?: ITooltipDirection
  tooltipIcon?: JSX.Element
  contentWidth?: number
  tooltipClassName?: string
  dropShadow?: boolean
  hideBorder?: boolean
  roundedCorner?: boolean
  tooltipContentClassName?: string
  hideTooltip?: boolean
  hideOnMouseLeave?: boolean
  OFFSET?: number
  tooltipOpen?: (isOpen: boolean) => void | undefined
  tooltipActiveContent?: (ele: string) => void | undefined
}

export type ITooltipVariant = 'default' | 'primary'

export type ITooltipDirection = 'top' | 'bottom'
