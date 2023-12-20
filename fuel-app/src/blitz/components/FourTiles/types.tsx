import { MouseEventHandler } from 'react'
import { IButtonVariant } from '../Button'
import { IButtonHoverVariant } from '../Button/types'
import { ITypographyElement, ITypographyStyleType } from '../Typography/types'

export type IFourTilesType = 'light' | 'dark' | 'red'

export type IFourTilesAlign = 'left' | 'center' | 'right'

export type IFourTilesHoverStyle = '' | 'primary' | 'red'

export interface IFourTiles {
  tiles: IFourTileItem[]
  type: IFourTilesType
  textAlign: IFourTilesAlign
  mobileOneCol?: boolean
  tabletTwoCol?: boolean
  tabletOneCol?: boolean
  titleClassName?: string
  titleStyleType?: ITypographyStyleType
  titleTagType?: ITypographyElement
  cardClassName?: string
  descriptionStyleType?: any
  descriptionClassName?: string
  isClickable?: boolean
  disableHover?: boolean
  roundedBorders?: boolean
  buttonClassName?: string
  hoverStyle?: IFourTilesHoverStyle
  tilesWrapperClassName?: string
  iconClassName?: string
  buttonWrapperClass?: string
  subTitleClassName?: string
  // eslint-disable-next-line no-unused-vars
  renderData?: (index: number) => JSX.Element
}

export interface IFourTileItem {
  title: string
  description?: string
  icon?: JSX.Element
  button?: IFourTileButton
  href?: string
  objectID?: string
  subTitle?: string
}

export interface IFourTileButton {
  buttonHoverVariant?: IButtonHoverVariant | undefined
  type?: string
  text?: string
  href?: string
  variant?: IButtonVariant
  onClick?: MouseEventHandler<HTMLAnchorElement> | undefined
  objectID?: string
}
