export interface IHeroStripes {
  backgroundImage?: string
  mobileBackgroundImage?: string
  className?: string
  content: JSX.Element
  removeRightStripes?: boolean
  stripeColor?: 'primary' | 'secondary' | 'tertiary'
  keepMobileStripes?: boolean
  stripeStyles?: stripeStyles
  innerWrapperClassName?: string
  stripesClass?: string
  stripesTitleWrapperClass?: string
  rootBackgroundColorLeft?: string
  rootBackgroundColorRight?: string
}

export interface stripeStyles {
  height?: number | string
  marginBottom?: number | string
}
export interface IHeroStripe {
  stripeColor?: string
  stripeStyles?: stripeStyles
}
