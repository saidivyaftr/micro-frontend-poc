import React from 'react'
import clx from 'classnames'
import { Typography } from '@/shared-ui/components'
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ChevronLeft, ChevronRight } from '@/shared-ui/react-icons'
import { ISwiperQuotesProps } from './index'
import css from './SwiperQuotes.module.scss'
import 'swiper/swiper.min.css'

SwiperCore.use([Autoplay, Navigation, Pagination])

const SwiperQuotes: React.FunctionComponent<ISwiperQuotesProps> = (data) => {
  const navigationPrevRef = React.useRef(null)
  const navigationNextRef = React.useRef(null)

  return (
    <div className={clx(css.swiperQuotes, data.className)}>
      <Typography
        className={clx(css.heading, data.titleClassName)}
        tagType="h2"
        styleType="p1"
        testId="swiperquote-heading"
      >
        {data?.heading}
      </Typography>
      <div className={clx(css.swiperContainer, data?.swipercontainerClass)}>
        <div
          className={clx(css.previous, data?.paginationPreviousButtonClass)}
          ref={navigationPrevRef}
        >
          <ChevronLeft />
        </div>
        <div
          className={clx(css.next, data?.paginationNextButtonClass)}
          ref={navigationNextRef}
        >
          <ChevronRight />
        </div>
        <Swiper
          autoplay={{ delay: 5000 }}
          pagination={data.pagination ? { clickable: true } : false}
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
        >
          {data?.slides?.map((item, i) => (
            <SwiperSlide key={item.credit + i} data-testid="swiperquote-slide">
              <Typography
                className={clx(css.quote, data.quoteClassName)}
                tagType="p"
                styleType="h5"
                testId={`swiperquote-quote-${i}`}
              >
                {item?.quote}
              </Typography>
              <Typography
                className={clx(css.credit, data.creditClassName)}
                tagType="span"
                styleType="h6"
                fontType="boldFont"
                testId={`swiperquote-credit-${i}`}
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

export default SwiperQuotes
