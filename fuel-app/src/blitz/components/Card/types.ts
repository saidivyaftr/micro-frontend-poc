/* eslint-disable @typescript-eslint/indent */

import { ITypography } from '../Typography'

export type TitleProps = {
  title?: string
  labelLink?: string
  url?: string
  arrowColor?: string
  hoverColor?: 'primary' | 'secondary' | 'tertiary'
  className?: string
  dataTestId?: string
} & Omit<ITypography, 'children'>

export type CardWithTitleProps = {
  children: JSX.Element
  classNameTitle?: string
  dataTestId?: string
} & Omit<CardProps, 'children'> &
  TitleProps

export type CardProps = {
  backgroundColor?: 'primary' | 'secondary' | 'dark' | 'default' | 'light-gray'
  size?: 'rectangle' | 'big-rectangle' | 'big-square' | 'square'
  children: JSX.Element
  className?: string
  dataTestId?: string
}
