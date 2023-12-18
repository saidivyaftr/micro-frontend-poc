import { MouseEventHandler } from 'react'

export type ITypographyStyleType =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p1'
  | 'p2'
  | 'p3'
  | 'p4'
  | 'legal'

export type ITypographyElement =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'div'
  | 'label'

export type ITypographyFontType =
  | ''
  | 'regularFont'
  | 'mediumFont'
  | 'boldFont'
  | 'regularBandwidthFont'

export type ITypographyFontColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'default'
export interface ITypography {
  styleType?: ITypographyStyleType
  tagType?: ITypographyElement
  children?: string | JSX.Element
  className?: string
  color?: ITypographyFontColor
  fontType?: ITypographyFontType
  testId?: string
  onClick?: MouseEventHandler | undefined
  dangerouslySetInnerHTML?: any
  htmlFor?: string
  style?: any
}
