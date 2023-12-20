import { IButtonHoverVariant, IButtonVariant } from '../Button/types'
import { ITypography } from '../Typography/types'

export interface CheckAvailabilityProps {
  rootStylesClassName?: string
  iconStylesClassName?: string
  icon?: any
  titleText?: any
  titleColorCode?: ITypography['color']
  buttonVariant?: IButtonVariant
  buttonText?: string
  buttonURL?: string
  buttonhoverVariant?: IButtonHoverVariant
  linkURL?: string
  linkColorCode?: ITypography['color']
  linkText?: any
  containerBgColor?: string
  shadowColorCode?: string
  linkHoverVariant?: string
  linkClassName?: string
  contentWrapperClass?: string
  containerClass?: string
  buttonClassName?: string
  buttonWrapperClass?: string
  btnEventName?: string
  linkEventName?: string
  titleTextClassName?: string
}
