import { stripeStyles } from '../HeroStripes/types'
import { IButton } from '@/shared-ui/components/Button'
import {
  ITypographyElement,
  ITypographyStyleType,
} from '@/shared-ui/components/Typography'

export type IFontColor = 'primary' | 'secondary' | 'tertiary' | 'default'

export type IHeroBackground = 'gravity' | 'black' | 'clarity' | 'gravity5'

export interface IHeroProps {
  backgroundColor: IHeroBackground
  eyebrowText?: string | JSX.Element
  eyebrowTextColor?: IFontColor
  eyebrowTextClassName?: string
  heroImage?: string
  heroImageWrapperClassName?: string
  heroImageSize?: IImageSizeProps
  title1?: string | JSX.Element
  preHeaderTitle?: string | JSX.Element
  title1Image?: string
  title1MobileImage?: string
  title1Color?: IFontColor
  title2?: string | JSX.Element
  title2Color?: IFontColor
  subHeader?: string | JSX.Element
  subHeaderColor?: IFontColor
  backgroundImage?: string
  content?: JSX.Element
  mobileBackgroundImage?: string
  primaryButton?: IButton
  secondaryButton?: IButton
  titleTagType?: string | JSX.Element
  eyebrowTagType?: ITypographyElement
  className?: string
  contentClassName?: string
  subtitleClass?: string
  toolTipText?: string
  legalText?: string
  legalTextColor?: IFontColor
  legalTextClassName?: string
  legalStyleType?: ITypographyStyleType
  leftContentClassName?: string
  stripesClass?: string
  stripeStyles?: stripeStyles
  stripesTitleWrapperClass?: string
  buttonsContainerClass?: string
  stripeColor?: 'primary' | 'secondary' | 'tertiary'
  removeStripes?: boolean
  isDarkMode?: boolean
  titleClass?: string
  isZoomedOutMaxWidth?: boolean
  wrapperClassName?: string
  styleType?: string
  styles?: any
  bkgImgClassName?: string
}

export interface ITitleProps {
  eyebrowText?: string | JSX.Element
  eyebrowTagType?: ITypographyElement
  eyebrowTextColor?: IFontColor
  eyebrowTextClassName?: string
  title1?: string | JSX.Element
  title1Color?: IFontColor
  title2?: string | JSX.Element
  title2Color?: IFontColor
  title1Image?: string
  title1MobileImage?: string
  titleTagType?: string
  titleClass?: string
}

export interface IImageSizeProps {
  width: number
  height: number
}
