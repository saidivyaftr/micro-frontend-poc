import React from 'react'
import { IDotColor } from '../Loading/types'

export type IButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'white'
  | 'lite'
export type IButtonHoverVariant = 'primary' | 'secondary'
export type ButtonSize = 'small' | 'medium' | 'large'

export interface IDefaultButton extends React.HTMLProps<HTMLButtonElement> {
  type: 'button' | 'submit'
  variant?: IButtonVariant
  loadingVariant?: IDotColor
  hoverVariant?: IButtonHoverVariant
  className?: string
  text?: string | JSX.Element
  triggerEvent?: boolean
  eventObj?: { events: string; eVar14: string }
  interactionType?: string
  buttonSize?: ButtonSize
  isBusy?: boolean
}

export interface IDefaultLink extends React.HTMLProps<HTMLAnchorElement> {
  type: 'link'
  variant?: IButtonVariant
  hoverVariant?: IButtonHoverVariant
  className?: string
  text?: string | JSX.Element
  objectID?: string
  triggerEvent?: boolean
  eventObj?: { events: string; eVar14: string }
  interactionType?: string
  buttonSize?: ButtonSize
  wrapperClass?: string
  callLink?: boolean
}

export type IButton = IDefaultButton | IDefaultLink
