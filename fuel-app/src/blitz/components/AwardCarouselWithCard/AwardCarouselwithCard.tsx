import React, { useEffect } from 'react'
import clx from 'classnames'
import { FourTiles, InjectHTML } from 'src/blitz'
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ChevronLeft, ChevronRight } from '@/shared-ui/react-icons'
import Typography from '../Typography'
import { IAwardCarousel } from './types'
import styles from './AwardCarouselWithCard.module.scss'
import 'swiper/swiper.min.css'

SwiperCore.use([Autoplay, Navigation, Pagination])

const AwardCarouselWithCard = ({
  cards,
  backgroundColor,
  paginationColor,
  title,
  rootClassName,
  titleClassName,
}: IAwardCarousel) => {
  const rootRef: any = React.useRef(null)
  const navigationPrevRef: any = React.useRef(null)
  const navigationNextRef: any = React.useRef(null)

  const newList = cards.map((dataa: any) => {
    return {
      title: dataa?.title?.value,
      description: dataa?.description?.value,
      icon: dataa?.icon?.value ? (
        <InjectHTML value={dataa?.icon?.value} />
      ) : null,
    }
  })

  const newArr = []

  for (let i = 0; i < newList.length; i += 3) {
    newArr.push(newList.slice(i, i + 3))
  }

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
      className={clx(styles.root, rootClassName)}
      style={{ backgroundColor }}
      ref={rootRef}
    >
      {title?.value && (
        <Typography
          tagType="h2"
          styleType="h3"
          color="default"
          className={clx(styles.title, titleClassName)}
        >
          {title?.value}
        </Typography>
      )}
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
          loop
          onBeforeInit={(swiper) => {
            // @ts-ignore
            swiper.params.navigation.prevEl = navigationPrevRef.current
            // @ts-ignore
            swiper.params.navigation.nextEl = navigationNextRef.current
          }}
          autoHeight
        >
          {newArr.map((arr: any, i) => (
            <SwiperSlide key={`card-mobile-${i}`}>
              <div className={styles.tilesWrapper}>
                <FourTiles
                  type="light"
                  textAlign="left"
                  tiles={arr}
                  titleStyleType="h5"
                  titleTagType="h3"
                  roundedBorders={true}
                  isClickable={false}
                  cardClassName={styles.cardClassName}
                  descriptionClassName={styles.description}
                  tilesWrapperClassName={styles.tilesWrapperClassName}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default AwardCarouselWithCard
