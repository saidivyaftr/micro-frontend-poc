import css from './Button.module.scss'
import clx from 'classnames'
import React from 'react';

import {
  IButton,
  IButtonVariant,
  IButtonHoverVariant,
  IDefaultLink,
  IDefaultButton,
  ButtonSize,
} from './types'
import  InjectHTML  from '../InjectHTML'
// import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import Loading from '../Loading'
// import { CallIcon } from '@/shared-ui/react-icons'
import { IDotSize } from '../Loading/types'

const DefaultButton = (props: IDefaultButton) => {
  const {
    variant = 'primary',
    loadingVariant,
    hoverVariant = 'primary',
    buttonSize = 'large',
    text,
    disabled,
    isBusy,
    className,
    interactionType,
    eventObj,
    triggerEvent = false,
    onClick,
    ...args
  } = props
  const handleClick = (e: any) => {
    if (triggerEvent) DTMClient.triggerEvent(eventObj, 'tl_o', interactionType)
    onClick && onClick(e)
  }
  return (
    <button
      {...args}
      disabled={disabled || isBusy}
      data-testid="test-text"
      className={clx(
        getElementTag(variant, buttonSize),
        getElementHover(hoverVariant),
        getButtonSizeClass(buttonSize),
        className,
      )}
      onClick={handleClick}
    >
      {isBusy ? (
        <Loading
          dotColor={loadingVariant}
          size={buttonSize as IDotSize}
          className={css.busyLoader}
        />
      ) : (
        text
      )}
    </button>
  )
}

const LinkButton = (props: IDefaultLink) => {
  const {
    variant = 'primary',
    hoverVariant = 'primary',
    buttonSize = 'large',
    text,
    className,
    objectID,
    href,
    interactionType,
    eventObj,
    triggerEvent = false,
    wrapperClass,
    onClick,
    callLink = false,
    ...args
  } = props
  const handleClick = (e: any) => {
    if (triggerEvent) DTMClient.triggerEvent(eventObj, 'tl_o', interactionType)
    onClick && onClick(e)
  }
  return objectID ? (
    /* eslint-disable @typescript-eslint/indent */
    <InjectHTML
      enableClick
      onClick={handleClick}
      className={clx(css.btnWrapper, wrapperClass)}
      value={`<a href="${href}" 
      class="${clx(
        getElementTag(variant, buttonSize),
        getElementHover(hoverVariant),
        getButtonSizeClass(buttonSize),
        className,
      )}"
      onclick="s_objectID='${objectID}'"
     >${text}</a>`}
    />
  ) : (
    /* eslint-disable @typescript-eslint/indent */
    <a
      {...args}
      href={href}
      className={clx(
        getElementTag(variant, buttonSize),
        getElementHover(hoverVariant),
        getButtonSizeClass(buttonSize),
        className,
      )}
      onClick={handleClick}
    >
      {callLink && (
        <span className={css.callIcon}>
          CallIcon 
        </span>
      )}
      {text}
    </a>
  )
}

const Button = (props: IButton) => {
  console.log(props)
  const { type = 'button' } = props
  if (['button', 'submit'].includes(type)) {
    return <DefaultButton {...(props as IDefaultButton)} />
  }
  return <LinkButton {...(props as IDefaultLink)} />
}

function getElementHover(hoverType: IButtonHoverVariant) {
  switch (hoverType) {
    case 'secondary':
      return css.secondaryHover
    default:
      return css.primaryHover
  }
}

function getElementTag(styleType: IButtonVariant, size: ButtonSize) {
  switch (styleType) {
    case 'tertiary':
      return css.tertiary
    case 'white':
      return css.white
    case 'secondary':
      return css.secondary
    case 'lite':
      return css.lite
    default:
      return size === 'small' ? css.primarySmall : css.primary
  }
}

function getButtonSizeClass(size: ButtonSize) {
  switch (size) {
    case 'small':
      return css.smallBtn
    case 'medium':
      return css.mediumBtn
    case 'large':
    default:
      return css.largeBtn
  }
}

export default Button
