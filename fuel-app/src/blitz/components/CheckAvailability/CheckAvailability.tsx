import { useRef, useEffect, useState } from 'react'
import { Button, InjectHTML } from '@/shared-ui/components'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import css from './CheckAvailability.module.scss'
import clx from 'classnames'

import {
  CHECK_AVAILABLITY_COMP,
  CTA_BUTTON,
  MID_SCREEN_WIDTH,
  SITE_INTERACTION,
} from 'src/constants'
import { MapCurve } from '@/shared-ui/react-icons'
import { CheckAvailabilityProps } from '.'
import colors from '@/shared-ui/colors'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'

const CheckAvailability = (props: CheckAvailabilityProps): JSX.Element => {
  const {
    rootStylesClassName = '',
    iconStylesClassName = '',
    icon = <MapCurve />,
    titleText,
    titleColorCode = 'default',
    buttonVariant = 'primary',
    buttonText,
    buttonURL,
    buttonhoverVariant = 'primary',
    linkURL,
    linkColorCode = 'default',
    linkText,
    linkClassName,
    contentWrapperClass,
    containerBgColor = colors?.main?.white,
    containerClass,
    buttonClassName,
    buttonWrapperClass,
    shadowColorCode = '0px 4px 14px rgb(0 0 0 / 25%)',
    btnEventName = CTA_BUTTON,
    linkEventName = '',
    titleTextClassName,
  } = props

  const [fixedForm, setFixedForm] = useState(false)
  const { width } = useWindowDimensions()
  const node = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (document) {
        const scrollPosition = window.scrollY
        const element = node.current
        const rect = element?.getBoundingClientRect()
        if (rect) setFixedForm(scrollPosition > rect.top)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const onButtonClick = () => {
    //@ts-ignore
    s_objectID = CHECK_AVAILABLITY_COMP.replace('{NAME}', buttonText)
  }

  const onLinkClick = () => {
    if (linkEventName)
      DTMClient.triggerEvent(
        { events: 'event14', eVar14: linkEventName },
        'tl_o',
        SITE_INTERACTION,
      )
  }

  let wrapperClassName = width < MID_SCREEN_WIDTH ? css.mobFixedWrapper : null
  if (!wrapperClassName) {
    wrapperClassName = fixedForm ? css.fixedWrapper : ''
  }
  return (
    <div
      className={clx(css.root, wrapperClassName, rootStylesClassName)}
      ref={node}
      id="check-availability"
    >
      <div
        className={clx(css.container, containerClass)}
        style={{
          backgroundColor: containerBgColor,
          boxShadow: shadowColorCode,
        }}
      >
        <div className={clx(css.contentMainWrapper, contentWrapperClass)}>
          {width >= MID_SCREEN_WIDTH && (
            <div className={css.contentStyles}>
              <div className={clx(css.icon, iconStylesClassName)}>{icon}</div>

              <InjectHTML
                tagType="p"
                styleType="h5"
                fontType="boldFont"
                color={titleColorCode}
                className={clx(css.description, titleTextClassName)}
                value={titleText}
              />
            </div>
          )}
          <div className={clx(css.buttonsList, buttonClassName)}>
            <div className={clx(css.buttonWrapper, buttonWrapperClass)}>
              <Button
                variant={buttonVariant}
                className={css.button}
                text={buttonText}
                type="link"
                href={buttonURL}
                onClick={onButtonClick}
                triggerEvent={true}
                eventObj={{ events: 'event14', eVar14: btnEventName }}
                interactionType={SITE_INTERACTION}
                hoverVariant={buttonhoverVariant}
              />
            </div>
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckAvailability
