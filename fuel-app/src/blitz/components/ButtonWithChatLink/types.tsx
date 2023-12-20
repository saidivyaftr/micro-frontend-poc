import React from 'react'
import {
  ITypographyFontType,
  ITypographyStyleType,
  ITypographyElement,
} from './../Typography/types'
export type IButtonWithChatLinkVariant = 'primary' | 'secondary'

export interface IButtonWithChatLinkProps
  extends React.HTMLProps<HTMLButtonElement> {
  hoverVariant?: IButtonWithChatLinkVariant
  text?: string
  buttonName?: string
  buttonLink?: string
  labelName?: string
  labelLinkText?: string
  bgType?: string
  labelNameColor?: string
  labelLinkTextColor?: string
  labelFontType?: ITypographyFontType
  labelStyleType?: ITypographyStyleType
  labelTagType?: ITypographyElement
  chatClassName?: string
  buttonTarget?: string
  btnClassName?: string
  isReturningUser?: boolean
  chatParams?: any
}
