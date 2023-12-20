import React, { useEffect } from 'react'
import clx from 'classnames'
import { InjectHTML, TooltipPopover } from 'src/blitz'
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ChevronLeft, ChevronRight } from '@/shared-ui/react-icons'
import { ITypographyElement, ITypographyStyleType } from '../Typography'
import { ITrophyCase, ICard } from './types'
import styles from './TrophyCase.module.scss'
import 'swiper/swiper.min.css'
import { ITypographyFontType } from '../Typography/types'

SwiperCore.use([Autoplay, Navigation, Pagination])

const TrophyCase = ({
  title,
  titleTagName,
  titleStyleName,
  cards,
  legal,
  backgroundColor,
  paginationColor,
  titleColor,
  legalTextColor,
  cardTitleColor,
  cardBackgroundColor,
  cardTitleTagName,
  cardTitleClassName,
  cardTitleStyleName,
  cardTitleFontName,
}: ITrophyCase) => {
  const rootRef: any = React.useRef(null)
  const navigationPrevRef: any = React.useRef(null)
  const navigationNextRef: any = React.useRef(null)
  const [activeIndex, setActiveIndex] = React.useState(1)

  const updatePaginationColors = () => {
    if (rootRef) {
      rootRef?.current?.style.setProperty(
        '--pagination-color',
        paginationColor ?? '#141928',
      )
    }
  }

  useEffect(() => {
    updatePaginationColors()
  }, [paginationColor])

  return (
    <div
      className={styles.trophyCaseRoot}
      style={{ backgroundColor }}
      ref={rootRef}
    >
      <div className={styles.trophyCaseInnerRoot}>
        {title && (
          <InjectHTML
            className={styles.title}
            tagType={(titleTagName as ITypographyElement) ?? 'h2'}
            styleType={(titleStyleName as ITypographyStyleType) ?? 'h3'}
            value={title}
            style={{ color: titleColor }}
          />
        )}
        <div className={styles.cardsDesktopContainer}>
          {cards?.map(({ title, imageSrc, toolTipText }: ICard) => {
            return (
              <div
                className={styles.card}
                style={{ backgroundColor: cardBackgroundColor }}
                key={`card-desktop-${title}`}
              >
                <div>
                  <InjectHTML
                    fontType={
                      (cardTitleFontName as ITypographyFontType) ?? 'boldFont'
                    }
                    styleType={
                      (cardTitleStyleName as ITypographyStyleType) ?? 'p1'
                    }
                    tagType={(cardTitleTagName as ITypographyElement) ?? 'h3'}
                    value={title}
                    style={{ color: cardTitleColor }}
                    className={clx(styles.cardTitle, cardTitleClassName)}
                  />
                  {toolTipText && (
                    <TooltipPopover
                      tooltipContent={toolTipText}
                      tooltipClassName={styles.tooltipClassName}
                      tooltipDirection="bottom"
                    />
                  )}
                </div>
                <img className={styles.cardImage} src={imageSrc} alt={title} />
              </div>
            )
          })}
        </div>
        <div
          className={clx(styles.cardsMobileContainer, styles.swiperContainer)}
        >
          <div className={styles.navigationContainer}>
            <div className={clx(styles.arrow)} ref={navigationPrevRef}>
              <ChevronLeft />
            </div>
            <div className={clx(styles.arrow)} ref={navigationNextRef}>
              <ChevronRight />
            </div>
          </div>
          <Swiper
            onActiveIndexChange={(e: any) => {
              setActiveIndex(e?.activeIndex || 1)
            }}
            className={styles.swiper}
            pagination={{
              clickable: true,
            }}
            spaceBetween={16}
            centeredSlides
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            onBeforeInit={(swiper) => {
              // @ts-ignore
              swiper.params.navigation.prevEl = navigationPrevRef.current
              // @ts-ignore
              swiper.params.navigation.nextEl = navigationNextRef.current
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop
            autoHeight
          >
            {cards?.map(
              ({ title, imageSrc, toolTipText }: ICard, i: number) => {
                const shouldShowInfo =
                  i + 1 === activeIndex || i + 1 === activeIndex % cards?.length
                return (
                  <SwiperSlide key={`card-mobile-${i}`}>
                    <div
                      className={styles.mobileCard}
                      style={{ backgroundColor: cardBackgroundColor }}
                      key={`card-desktop-${title}`}
                    >
                      <div>
                        <InjectHTML
                          fontType={
                            (cardTitleFontName as ITypographyFontType) ??
                            'boldFont'
                          }
                          styleType={
                            (cardTitleStyleName as ITypographyStyleType) ?? 'p1'
                          }
                          value={title}
                          tagType={
                            (cardTitleTagName as ITypographyElement) ?? 'h5'
                          }
                          style={{ color: cardTitleColor }}
                          className={clx(styles.cardTitle, cardTitleClassName)}
                        />
                        {toolTipText && (
                          <TooltipPopover
                            tooltipContent={toolTipText}
                            tooltipClassName={styles.tooltipClassName}
                            tooltipDirection="bottom"
                            hideTooltip={!shouldShowInfo}
                          />
                        )}
                      </div>
                      <img
                        className={styles.cardImage}
                        src={imageSrc}
                        alt={title}
                      />
                    </div>
                  </SwiperSlide>
                )
              },
            )}
          </Swiper>
        </div>
        {legal && (
          <InjectHTML
            styleType="legal"
            value={legal}
            className={styles.legalText}
            style={{ color: legalTextColor }}
          />
        )}
      </div>
    </div>
  )
}

export default TrophyCase
