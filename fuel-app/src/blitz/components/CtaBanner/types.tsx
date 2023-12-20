import React from 'react'
export type ICtaBannerHoverVariant = 'primary' | 'secondary'

export type IBkgColors = 'gravity' | 'electricity' | 'gravity5' | 'clarity'

export type ITypographyStyleType = 'h5' | 'h6'

export interface ICtaBannerProps extends React.HTMLProps<HTMLButtonElement> {
  colorTheme?: IBkgColors
  heading: string
  headingStyleType?: ITypographyStyleType
  icon?: JSX.Element
  iconStylesClassName?: string
  headingClassName?: string
  iconClassName?: string
  buttonVariant?: string
  secondaryButton?: any
  linkEventName?: string
  hoverVariant?: ICtaBannerHoverVariant
  buttonURL?: string
  linkText?: any
  buttonClassName?: string
  rootStylesClassName?: string
  linkURL?: string
  linkClassName?: string
  linkColorCode?: any
  primaryButton?: any
  buttonsContainerClass?: string
  primaryButtonStyles?: string
  secondaryButtonStyles?: string
}
