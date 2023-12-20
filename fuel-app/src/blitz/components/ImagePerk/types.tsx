import { IColorsName } from '@/shared-ui/theme/colors.types'
import { IColorName } from '@/shared-ui/components/Stripes/types'

export interface IImagePerk {
  content?: JSX.Element
  contentAlign?: string
  tabletBackgroundImage: BackgroundImage
  mobileBackgroundImage?: BackgroundImage
  backgroundColor?: IColorsName
  backgroundColorContent?: IColorsName
  stripeColor?: IColorName
  rootclassName?: string
  className?: string
  contentClassName?: string
  contentBoxBorderRadius?: boolean
  linesBgColorsClass?: string
  imageStyleClassName?: string
  imageClassName?: string
}

export type BackgroundImage = Partial<HTMLImageElement>
