import { useRef, useEffect, useState } from 'react'
import { Button, InjectHTML } from '@/shared-ui/components'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import { CTA_BUTTON, SITE_INTERACTION, STICKY_BANNER_COMP } from 'src/constants'
import { MessageIcon } from '@/shared-ui/react-icons'
import { useChatState } from 'src/hooks'
import { StickyBannerProps } from './types'
import css from './StickyBanner.module.scss'
import clx from 'classnames'

const midDevice = 1024
const StickyBanner = (props: StickyBannerProps): JSX.Element => {
  const {
    rootStylesClassName = '',
    containerClass = '',
    buttonText,
    title,
    mobileTitle,
    buttonhoverVariant,
    chatButtonText,
    chatButtonURL,
    buttonURL,
    buttonWrapperClass,
  } = props

  const [fixedForm, setFixedForm] = useState(false)
  const { width } = useWindowDimensions()
  const { setChatState } = useChatState()
  const node = useRef<HTMLDivElement>(null)
  let isListenerAdded = false
  let offsetTop = 0
  const handleScroll = () => {
    if (document) {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop
      const elementOffsetTop = offsetTop || node?.current?.offsetTop || 0
      if (elementOffsetTop !== offsetTop) {
        offsetTop = elementOffsetTop
      }
      const shouldBeFixed = winScroll > offsetTop - 65
      if (shouldBeFixed !== fixedForm) {
        setFixedForm(shouldBeFixed)
      }
    }
  }

  useEffect(() => {
    if (!isListenerAdded) {
      isListenerAdded = true
      window.addEventListener('scroll', handleScroll)
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [fixedForm])

  const onButtonClick = () => {
    //@ts-ignore
    s_objectID = STICKY_BANNER_COMP.replace('{NAME}', buttonText)
  }

  let wrapperClassName = width < midDevice ? css.mobFixedWrapper : null
  if (!wrapperClassName) {
    wrapperClassName = fixedForm ? css.fixedWrapper : ''
  }

  return (
    <div
      className={clx(css.root, wrapperClassName, rootStylesClassName)}
      ref={node}
      id="sticky-banner"
      data-testid="banner"
    >
      <div className={clx(css.container, containerClass)}>
        <div className={css.contentMainWrapper}>
          {width >= midDevice && (
            <InjectHTML
              data-testid="bannerTitle"
              tagType="p"
              styleType="p1"
              fontType="boldFont"
              className={css.description}
              value={title}
            />
          )}
          {width < midDevice && (
            <InjectHTML
              data-testid="bannerMobileTitle"
              tagType="p"
              styleType="p1"
              fontType="boldFont"
              className={css.description}
              value={mobileTitle}
            />
          )}
          <div className={clx(css.buttonsWrapper, buttonWrapperClass)}>
            <div data-testid="bannerChatButton">
              <Button
                hoverVariant={buttonhoverVariant}
                type="link"
                target="_blank"
                text={
                  <span className={css.messageBtnText}>
                    <MessageIcon /> {chatButtonText}
                  </span>
                }
                href={chatButtonURL}
                className={css.messageBtn}
                onClick={() => setChatState(true)}
                triggerEvent={true}
                eventObj={{
                  events: 'event14',
                  eVar14: `${CTA_BUTTON}:chat-now`,
                }}
                interactionType={SITE_INTERACTION}
              />
            </div>
            {buttonText && (
              <div data-testid="bannerButton">
                <Button
                  variant="lite"
                  className={css.button}
                  text={buttonText}
                  type="link"
                  href={buttonURL}
                  onClick={onButtonClick}
                  triggerEvent={true}
                  eventObj={{
                    events: 'event14',
                    eVar14: `${CTA_BUTTON}:call-now`,
                  }}
                  interactionType={SITE_INTERACTION}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StickyBanner
