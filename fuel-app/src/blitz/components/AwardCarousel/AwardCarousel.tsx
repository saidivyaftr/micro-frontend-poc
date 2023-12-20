import React, { useEffect } from 'react'
import clx from 'classnames'
import { InjectHTML } from 'src/blitz'
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ChevronLeft, ChevronRight } from '@/shared-ui/react-icons'
import { ITypographyElement, ITypographyStyleType } from '../Typography'
import { IAwardCarousel, ICard } from './types'
import styles from './AwardCarousel.module.scss'
import Image from 'next/future/image'
import 'swiper/swiper.min.css'

SwiperCore.use([Autoplay, Navigation, Pagination])

const AwardCarousel = ({
  cards,
  backgroundColor,
  paginationColor,
  cardTitleColor,
  cardSubTitleColor,
  cardLegalTextColor,
  cardTitleTagName,
  cardTitleStyleName,
  cardSubTitleTagName,
  cardSubTitleStyleName,
  cardContentClassName,
  contentStyles,
}: IAwardCarousel) => {
  const rootRef: any = React.useRef(null)
  const navigationPrevRef: any = React.useRef(null)
  const navigationNextRef: any = React.useRef(null)
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

  const renderContent = ({ title, subTitle, imageSrc, legal }: ICard) => {
    return (
      <div
        className={clx(styles.card, {
          [styles.swiperCardsContainer]: cards?.length > 1,
        })}
        key={`card-desktop-${title}`}
        style={contentStyles}
      >
        <Image
          loader={() => imageSrc}
          className={styles.cardImage}
          src={imageSrc}
          alt={title}
        />
        <div className={clx(styles.cardContent, cardContentClassName)}>
          <InjectHTML
            tagType={(cardTitleTagName as ITypographyElement) ?? 'h2'}
            styleType={(cardTitleStyleName as ITypographyStyleType) ?? 'h3'}
            className={styles.cardContentText}
            style={{ color: cardTitleColor }}
            value={title}
          />
          {subTitle && (
            <InjectHTML
              tagType={(cardSubTitleTagName as ITypographyElement) ?? 'p'}
              styleType={
                cardSubTitleStyleName?.trim?.()
                  ? (cardSubTitleStyleName as ITypographyStyleType)
                  : 'p1'
              }
              className={styles.cardContentText}
              style={{ color: cardSubTitleColor }}
              value={subTitle}
            />
          )}
          {legal && (
            <InjectHTML
              styleType="legal"
              value={legal}
              style={{ color: cardLegalTextColor }}
            />
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={styles.root} style={{ backgroundColor }} ref={rootRef}>
      <div className={clx(styles.cardsContainer, styles.swiperContainer)}>
        {cards?.length > 1 && (
          <div className={styles.navigationContainer}>
            <div className={clx(styles.arrow)} ref={navigationPrevRef}>
              <ChevronLeft />
            </div>
            <div className={clx(styles.arrow)} ref={navigationNextRef}>
              <ChevronRight />
            </div>
          </div>
        )}
        {cards?.length === 1 ? (
          renderContent(cards[0])
        ) : (
          <Swiper
            className={styles.swiper}
            pagination={
              cards?.length > 1 && {
                clickable: true,
              }
            }
            spaceBetween={16}
            centeredSlides
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={cards?.length > 1}
            onBeforeInit={(swiper) => {
              // @ts-ignore
              swiper.params.navigation.prevEl = navigationPrevRef.current
              // @ts-ignore
              swiper.params.navigation.nextEl = navigationNextRef.current
            }}
            autoHeight
          >
            {cards?.map((card: ICard, i: number) => (
              <SwiperSlide key={`card-mobile-${i}`}>
                {renderContent(card)}
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  )
}

export default AwardCarousel
