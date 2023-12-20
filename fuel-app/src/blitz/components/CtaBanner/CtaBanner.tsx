import { Button, InjectHTML } from '@/shared-ui/components'
import { ICtaBannerProps } from './index'
import css from './CtaBanner.module.scss'
import clx from 'classnames'
import { SITE_INTERACTION } from 'src/constants'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
// import { IBackgroundColor } from '@/shared-ui/theme/colors.types'
// import colors from '@/shared-ui/colors'
// import { getBackgroundColor } from '@/shared-ui/theme/colors.helper'

const CtaBanner = (props: ICtaBannerProps) => {
  const {
    icon,
    iconStylesClassName,
    rootStylesClassName,
    linkClassName,
    headingClassName,
    headingStyleType = 'h6',
    secondaryButton,
    primaryButton,
    buttonsContainerClass,
    secondaryButtonStyles,
    linkColorCode = 'tertiary',
    heading,
    colorTheme,
    linkText,
    linkURL,
    linkEventName = '',
    primaryButtonStyles,
  } = props

  const onLinkClick = () => {
    if (linkEventName)
      DTMClient.triggerEvent(
        { events: 'event14', eVar14: linkEventName },
        'tl_o',
        SITE_INTERACTION,
      )
  }
  return (
    <div
      className={clx(
        css.root,
        rootStylesClassName,
        getBackgroundColor(colorTheme),
      )}
    >
      <div className={clx(css.innerWrapper, rootStylesClassName)}>
        {icon && <div className={clx(iconStylesClassName)}>{icon}</div>}
        {heading && (
          <InjectHTML
            className={clx(css.heading, headingClassName)}
            tagType="h2"
            styleType={headingStyleType}
            color="tertiary"
            value={heading}
          />
        )}
        {(primaryButton || secondaryButton) && (
          <div className={clx(css.buttonsContainer, buttonsContainerClass)}>
            {primaryButton?.text && (
              <Button
                {...primaryButton}
                hoverVariant="secondary"
                className={clx(css.primaryButton, primaryButtonStyles)}
              />
            )}
            {secondaryButton?.text && (
              <Button
                {...secondaryButton}
                variant="white"
                className={clx(css.secondaryButton, secondaryButtonStyles)}
              />
            )}
          </div>
        )}
        {linkURL && (
          <div className={css.buttonWrapper}>
            <a
              href={linkURL}
              className={clx(css.link, linkClassName)}
              onClick={onLinkClick}
            >
              <InjectHTML
                tagType="p"
                styleType="p2"
                color={linkColorCode}
                className={css.description}
                value={linkText}
                fontType="mediumFont"
              />
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

const getBackgroundColor = (color = 'default') => {
  switch (color) {
    case 'gravity':
      return css.bkgGravity
    case 'electricity':
      return css.bkgElectricity
    case 'gravity5':
      return css.bkgGravity5
    case 'clarity':
      return css.bkgWhite
    default:
      return css.bkgGravity
  }
}

export default CtaBanner
