import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper'
import { makeStyles } from '@material-ui/core'
import { InjectHTML, Typography } from 'src/blitz'
import { Close } from 'src/blitz/assets/react-icons'
import {
  useActiveAccount,
  useAccountList,
  useVacationServicesInfo,
} from 'src/selector-hooks'
import useWindowDimensions from '@/shared-ui/hooks/useWindowDimensions'
import clx from 'classnames'
import { useAppData } from 'src/hooks'
import { getFormattedDate } from 'src/libs/account/welcome/helper'
SwiperCore.use([Autoplay, Navigation, Pagination])

const AlertBanner = () => {
  const alertBanner = useAppData('alertBanner', true)

  const classes = useStyles()
  const { width } = useWindowDimensions()
  const isMobileOrTablet = width <= 768
  const [showCarousel, setShowCarousel] = useState(true)
  const [refreshCarousel, setrefreshCarousel] = useState(true)
  const [slides, setslides] = useState(alertBanner?.slides?.targetItems || [])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [maxSlideHeight, setMaxSlideHeight] = useState(0)
  const [mobileView, setMobileView] = useState(false)
  const { isLoading: isAccountsLoading, data: accountList } = useAccountList()
  const { data: activeAccountDetails, isLoading: isAccountLoading } =
    useActiveAccount()
  const { data: vacationServicesInfo } = useVacationServicesInfo()
  const isVacationServicesPaused = vacationServicesInfo?.vacationStatus === 'On'
  const isVacationServicesScheduled =
    vacationServicesInfo?.vacationStatus === 'Pending'
  const account: any = accountList?.find(
    (acc) => acc.id === activeAccountDetails.id,
  )
  const isSuspended = account?.accountStatusNew === 'disconnected'
  const isLoading = isAccountsLoading || isAccountLoading

  const accountSuspended = alertBanner?.accountSuspended?.targetItem
  const vacationServicesPaused = alertBanner?.accountServicePaused?.targetItem
  const vacationServicesScheduled =
    alertBanner?.accountServicePauseScheduled?.targetItem
  const handleSlideChange = (swiper: any) => {
    setCurrentIndex(swiper.activeIndex)
  }

  useEffect(() => {
    if (alertBanner?.slides?.targetItem) {
      setslides(alertBanner?.slides?.targetItem)
    }
  }, [alertBanner])

  const handleClose = () => {
    setShowCarousel(false)
  }
  const currentBalanceAmount = activeAccountDetails.bill?.currentBalance.amount
  const displayedCurrentBalance =
    currentBalanceAmount === 0
      ? '00.00'
      : Number(currentBalanceAmount).toFixed(2)

  const handleRemoveSlide = (indexToRemove: any) => {
    const updatedSlides = slides.filter(
      (_: any, index: any) => index !== indexToRemove,
    )
    setslides(updatedSlides)
    if (currentIndex >= updatedSlides.length) {
      setCurrentIndex(updatedSlides.length - 1)
    }

    if (updatedSlides.length === 0) {
      handleClose()
    } else {
      setShowCarousel(true)
      setrefreshCarousel(!refreshCarousel)
    }
  }

  const calculateMaxSlideHeight = () => {
    const slideElements = document.querySelectorAll(`.${classes.slideContent}`)
    let maxHeight = 64

    slideElements.forEach((slideElement) => {
      const elementWithStyle = slideElement as HTMLElement
      elementWithStyle.style.height = ''
      const slideHeight = elementWithStyle.clientHeight
      if (slideHeight > maxHeight) {
        maxHeight = slideHeight
      }
    })

    setMaxSlideHeight(maxHeight)
  }
  useEffect(() => {
    calculateMaxSlideHeight()
    window.addEventListener('resize', calculateMaxSlideHeight)
    return () => {
      window.removeEventListener('resize', calculateMaxSlideHeight)
    }
  }, [])

  useEffect(() => {
    setMobileView(isMobileOrTablet)
  }, [isMobileOrTablet])

  useEffect(() => {
    if (slides) {
      if (isSuspended) {
        const content = {
          value: accountSuspended?.targetItem?.content?.value.replace(
            '{dueAmount}',
            `$${displayedCurrentBalance}`,
          ),
        }
        const slide = { ...accountSuspended, content }
        setslides([slide, ...slides])
      }
      if (isVacationServicesPaused) {
        const mapObj: any = {
          '{startDate}': getFormattedDate(
            vacationServicesInfo?.vacationPauseStartDate,
          ),
          '{endDate}': getFormattedDate(
            vacationServicesInfo?.vacationPauseEndDate,
          ),
        }
        const content = {
          value: vacationServicesPaused?.content?.value.replace(
            /(?:{startDate}|{endDate}|{chat})/gi,
            (matched: string) => mapObj[matched],
          ),
        }
        const slide = { ...vacationServicesPaused, content }
        setslides([slide, ...slides])
      }
      if (isVacationServicesScheduled) {
        const mapObj: any = {
          '{startDate}': getFormattedDate(
            vacationServicesInfo?.scheduledVacationPauseStartDate,
          ),
          '{endDate}': getFormattedDate(
            vacationServicesInfo?.scheduledVacationPauseEndDate,
          ),
        }
        const content = {
          value: vacationServicesScheduled?.content?.value.replace(
            /(?:{startDate}|{endDate}|{chat})/gi,
            (matched: string) => mapObj[matched],
          ),
        }
        const slide = { ...vacationServicesScheduled, content }
        setslides([slide, ...slides])
      }
    }
  }, [
    alertBanner.slides,
    isSuspended,
    isVacationServicesPaused,
    isVacationServicesScheduled,
  ])

  if (!showCarousel || isLoading || !slides || slides?.length == 0) {
    return <></>
  }
  const getMobileView = (slide: any, index: any) => {
    const fontColor = slide.fontColor?.color?.field?.value
    return (
      <div className={classes.mobilewrapper}>
        <div className={classes.mobileTopRow}>
          {slides.length > 1 && (
            <Typography
              style={{ color: `${fontColor}` }}
              className={clx(classes.slideCount, classes.slideCountMobile)}
              color="secondary"
              styleType="p3"
            >
              {`${currentIndex + 1} of ${slides.length}`}
            </Typography>
          )}
          {slides.length > 1 && !slide?.disableClose?.value && (
            <div
              className={classes.CloseSlide}
              onClick={() => handleRemoveSlide(index)}
            >
              <Close color={fontColor} width="24" height="24" />
            </div>
          )}
        </div>

        <div
          className={clx(classes.contentWrapper, classes.contentWrapperMobile)}
        >
          <InjectHTML
            className={classes.AlertContent}
            style={{ color: `${fontColor}` }}
            color="secondary"
            value={slide?.icon?.value}
          />
          <InjectHTML
            className={classes.AlertContent}
            style={{ color: `${fontColor}` }}
            color="secondary"
            value={slide?.content?.value}
          />
          {slides.length == 1 && !slide?.disableClose?.value && (
            <div
              className={classes.CloseSlide}
              onClick={() => handleRemoveSlide(index)}
            >
              <Close color={fontColor} width="24" height="24" />
            </div>
          )}
        </div>
      </div>
    )
  }

  const getDesktopView = (slide: any, index: any) => {
    const fontColor = slide.fontColor?.color?.field?.value
    return (
      <div className={classes.desktopSlideContainer}>
        {slides.length > 1 && (
          <Typography
            style={{ color: `${fontColor}` }}
            className={classes.slideCount}
            color="secondary"
            styleType="p3"
          >
            {`${currentIndex + 1} of ${slides.length}`}
          </Typography>
        )}
        <InjectHTML
          className={classes.AlertContent}
          style={{ color: `${fontColor}` }}
          color="secondary"
          value={slide?.icon?.value}
        />
        <div className={classes.contentWrapper}>
          <InjectHTML
            className={classes.AlertContent}
            style={{ color: `${fontColor}` }}
            color="secondary"
            value={slide?.content?.value}
          />
          {!slide?.disableClose?.value && (
            <div
              className={classes.CloseSlide}
              onClick={() => handleRemoveSlide(index)}
            >
              <Close color={fontColor} width="24" height="24" />
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={classes.carousel} style={{ height: `${maxSlideHeight}px` }}>
      <Swiper
        direction="vertical"
        spaceBetween={20}
        slidesPerView={1}
        onSlideChange={(swiper) => handleSlideChange(swiper)}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        height={maxSlideHeight}
      >
        {slides?.map((slide: any, index: any) => (
          <SwiperSlide
            key={index}
            style={{
              backgroundColor: `${slide.backgrondColor?.color?.field?.value}`,
            }}
            className={classes.slideContent}
          >
            {mobileView
              ? getMobileView(slide, index)
              : getDesktopView(slide, index)}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  carouselContainer: {
    position: 'relative',
    overflow: 'hidden',
  },
  AlertContent: {
    display: 'flex',
    textAlign: 'start',
    color: 'white',
  },
  carousel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#2D3548',
    '& .swiper-container': {
      width: '100%',
    },
  },
  slideContent: {
    textAlign: 'center',
    flexDirection: 'row',
    padding: '1rem 120px',
    gap: '1rem',
    height: 'auto',
    alignItems: 'center',
    display: 'block',
    [breakpoints.down('xs')]: {
      display: 'flex',
      padding: '1rem',
    },
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer',
    fontSize: '24px',
  },
  removeButton: {
    cursor: 'pointer',
    fontSize: '20px',
    color: 'red',
  },
  slideCount: {
    color: 'white',
    minWidth: 'fit-content',
    border: '1px solid',
    borderRadius: '1rem',
    height: 'max-content',
    padding: '.25rem',
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
    width: '100%',
  },
  CloseSlide: {
    cursor: 'pointer',
  },
  mobilewrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  slideCountMobile: {
    maxWidth: 'fit-content',
  },
  mobileTopRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '1rem',
    justifyContent: 'space-between',
  },
  contentWrapperMobile: { alignItems: 'flex-start' },
  desktopSlideContainer: {
    display: 'flex',
    maxWidth: 1200,
    margin: 'auto',
    gap: 8,
  },
}))

export default AlertBanner
