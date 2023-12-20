/* eslint-disable @typescript-eslint/indent */
import React from 'react'
import clx from 'classnames'
import { Typography } from '@/shared-ui/components'
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ChevronLeft, ChevronRight } from '@/shared-ui/react-icons'
import { ITestimonialProps } from './index'
import css from './Testimonial.module.scss'
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import 'swiper/components/pagination/pagination.min.css'
SwiperCore.use([Autoplay, Navigation, Pagination])

const Testimonial: React.FunctionComponent<ITestimonialProps> = (data) => {
  const {
    backgroundColor = 'gravity',
    className = '',
    eyebrowClassName = '',
    eyebrowText = '',
    quoteClassName = '',
    quoteStyleType = 'h5',
    quoteTagType = 'h5',
    creditClassName = '',
    creditStyleType = 'h6',
    creditTagType = 'h5',
    pagination = false,
    navigation = false,
    swipercontainerClass = '',
    paginationPreviousButtonClass = '',
    paginationNextButtonClass = '',
    slides = [],
  } = data
  const navigationPrevRef = React.useRef(null)
  const navigationNextRef = React.useRef(null)
  const paginationOptions = {
    clickable: true,
    bulletClass: clx({
      [css.gravityBulletClass]: backgroundColor === 'gravity',
      [css.electricityBulletClass]: backgroundColor === 'electricity',
    }),
    bulletActiveClass: clx({
      [css.gravityBulletClassActive]: backgroundColor === 'gravity',
      [css.electricityBulletClassActive]: backgroundColor === 'electricity',
    }),
  }
  const navigationOptions = {
    prevEl: navigationPrevRef.current,
    nextEl: navigationNextRef.current,
  }
  return (
    <div
      className={clx(css.testimonials, className, {
        [css.bkgGravity]: backgroundColor === 'gravity',
        [css.bkgElectricity]: backgroundColor === 'electricity',
        [css.hidePadding]: !pagination,
      })}
    >
      {eyebrowText && (
        <Typography
          className={clx(css.eyebrow, eyebrowClassName)}
          tagType="div"
          styleType="p2"
          testId="swiperquote-eyebrowText"
          color={backgroundColor === 'gravity' ? 'tertiary' : 'default'}
        >
          {eyebrowText}
        </Typography>
      )}
      <div className={clx(css.swiperContainer, swipercontainerClass)}>
        {navigation && (
          <>
            <div
              className={clx(
                css.arrow,
                css.previous,
                paginationPreviousButtonClass,
                {
                  [css.arrowGravity]: backgroundColor === 'electricity',
                  [css.arrowWhite]: backgroundColor === 'gravity',
                },
              )}
              ref={navigationPrevRef}
            >
              <ChevronLeft />
            </div>
            <div
              className={clx(css.arrow, css.next, paginationNextButtonClass, {
                [css.arrowGravity]: backgroundColor === 'electricity',
                [css.arrowWhite]: backgroundColor === 'gravity',
              })}
              ref={navigationNextRef}
            >
              <ChevronRight />
            </div>
          </>
        )}
        <Swiper
          autoplay={{ delay: 5000 }}
          autoHeight={true}
          spaceBetween={10}
          pagination={pagination ? paginationOptions : false}
          navigation={navigation ? navigationOptions : false}
          onBeforeInit={(swiper) => {
            if (!navigation) return
            // @ts-ignore
            swiper.params.navigation.prevEl = navigationPrevRef.current
            // @ts-ignore
            swiper.params.navigation.nextEl = navigationNextRef.current
          }}
        >
          {slides?.map((item, i) => (
            <SwiperSlide key={item.credit + i} data-testid="swiperquote-slide">
              <Typography
                className={clx(css.quote, quoteClassName)}
                tagType={quoteTagType}
                styleType={quoteStyleType}
                testId={`swiperquote-quote-${i}`}
                color={backgroundColor === 'gravity' ? 'secondary' : 'default'}
              >
                {item?.quote}
              </Typography>
              <Typography
                className={clx(css.credit, creditClassName)}
                tagType={creditTagType}
                styleType={creditStyleType}
                fontType="boldFont"
                testId={`swiperquote-credit-${i}`}
                color={backgroundColor === 'gravity' ? 'tertiary' : 'default'}
              >
                {item?.credit}
              </Typography>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
export default Testimonial
