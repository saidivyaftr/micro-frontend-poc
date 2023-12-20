import { makeStyles } from '@material-ui/core'
import { Button, InjectHTML, Typography } from '@/shared-ui/components'
import { Swiper, SwiperSlide } from 'swiper/react'
import { RightArrowIcon } from '@/shared-ui/react-icons'
import colors from '@/shared-ui/colors'
import { useWindowDimensions } from 'src/hooks'
import { useMemo, useRef } from 'react'
import { ChevronLeft, ChevronRight } from '@/shared-ui/react-icons'
import { PP_OBJECT_SANS_MEDIUM } from 'src/constants/fontFamilyNames'

const TileSwiper = ({ data }: any) => {
  const { width } = useWindowDimensions()
  const sliderLength = width < 768 ? 1 : width < 1024 ? 2 : width < 1440 ? 3 : 4
  const classes = useStyles()
  const navigationPrevRef = useRef(null)
  const navigationNextRef = useRef(null)
  const { title, tiles, subTitle }: any = data
  const slides = useMemo(() => {
    if (!tiles?.list) {
      return []
    }
    const tilesList = []
    for (const item of tiles?.list) {
      const payload: any = {
        title: item?.title?.value,
        description: item?.description?.value,
        icon: <InjectHTML value={item?.icon?.value} />,
        linkIcon: item?.linkIcon?.value,
        linkURL: item?.linkURL?.url,
        linkText: item?.linkText?.value,
      }
      tilesList.push(payload)
    }
    return tilesList
  }, [tiles])

  const renderData = (index: number) => {
    const slideData = { ...slides[index] }
    if (slideData?.linkText && slideData?.linkURL) {
      return (
        <a href={slideData?.linkURL} className={classes.linkContainer}>
          <InjectHTML
            pureInjection
            className={classes.linkIcon}
            value={slideData.linkIcon}
          />
          <Typography
            styleType="h6"
            fontType="regularFont"
            className={classes.linkText}
          >
            {slideData?.linkText}
          </Typography>
          <RightArrowIcon />
        </a>
      )
    }
    return <></>
  }

  return (
    <div className={classes.root} id="tiles-swiper">
      <div className={classes.wrapper}>
        {title?.value && (
          <Typography
            tagType="h2"
            styleType="h3"
            className={classes.title}
            color="secondary"
          >
            {title?.value}
          </Typography>
        )}
        {subTitle?.value && (
          <Typography
            tagType="h3"
            styleType="h6"
            color="tertiary"
            className={classes.subTitle}
          >
            {subTitle?.value}
          </Typography>
        )}
        <Swiper
          className={classes.swiper}
          autoplay={false}
          pagination={
            slides?.length > sliderLength ? { clickable: true } : false
          }
          spaceBetween={16}
          allowSlideNext={slides?.length > sliderLength}
          allowSlidePrev={slides?.length > sliderLength}
          centeredSlides={false}
          centerInsufficientSlides={true}
          centeredSlidesBounds={true}
          slidesPerView={sliderLength}
          slidesPerGroup={sliderLength}
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
          {slides?.map((item: any, i: number) => (
            <SwiperSlide key={`keys-${i}`} data-testid="swiperquote-slide">
              <div className={classes.tile}>
                {item?.icon}
                {item.title && (
                  <Typography
                    tagType="h3"
                    styleType="h5"
                    className={classes.tileTitle}
                  >
                    {item.title}
                  </Typography>
                )}
                {item.description && (
                  <Typography
                    tagType="h6"
                    styleType="p2"
                    className={classes.tileDescription}
                  >
                    {item.description}
                  </Typography>
                )}
                {renderData && renderData(i)}
                {item?.button?.text && (
                  <Button
                    type="link"
                    // onClick={item?.button?.onClick}
                    variant={item?.button?.variant}
                    text={item?.button?.text}
                    disabled={Boolean(item?.button?.onClick)}
                    href={item?.button?.href}
                    // className={buttonClassName)}
                    objectID={item?.button?.objectID}
                    hoverVariant={item?.button?.buttonHoverVariant}
                  />
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {slides?.length > sliderLength && (
          <>
            <div ref={navigationPrevRef} className={classes.leftArrowSwiper}>
              <ChevronLeft color={colors.main.white} />
            </div>
            <div ref={navigationNextRef} className={classes.rightArrowSwiper}>
              <ChevronRight color={colors.main.white} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    '& .swiper-pagination': {
      position: 'absolute',
      bottom: 20,
      height: 20,
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
    },
    '& .swiper-pagination-horizontal': {
      bottom: 30,
    },
    '& .swiper-pagination-bullet': {
      width: 12,
      height: 12,
      zIndex: 9,
      borderRadius: 6,
      marginRight: 16,
      border: `1px solid ${colors.main.white}`,
      '&:hover': {
        color: colors.main.brightRed,
      },
      '&:last-child': {
        marginRight: 0,
      },
    },
    '& .swiper-pagination-bullet-active': {
      backgroundColor: colors.main.white,
    },
    '& .swiper-slide': {
      height: 'auto',
    },
    background: colors.main.dark,
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    '& svg': {
      height: 20,
      width: 20,
      position: 'relative',
      bottom: '2px',
      '& path': {
        stroke: colors.main.white,
      },
    },
  },
  wrapper: {
    maxWidth: 1332,
    margin: 'auto',
    padding: '80px 0px',
    [breakpoints.down('sm')]: {
      padding: '48px 16px',
      maxWidth: '90%',
    },
    [breakpoints.down('xs')]: {
      padding: '40px 16px',
      maxWidth: '90%',
    },
    position: 'relative',
    width: '90%',
    '& .swiper-button-disabled': {
      display: 'none',
    },
    '& svg': {
      height: 20,
      width: 20,
      '& path': {
        stroke: colors.main.white,
      },
    },
  },
  description: {
    fontSize: '1.125rem',
    lineHeight: '1.625rem',
    [breakpoints.down('xs')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
  },
  title: {
    textAlign: 'center',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  subTitle: {
    textAlign: 'center',
    marginTop: '0',
    marginBottom: '3rem',
    [breakpoints.down('xs')]: {
      marginBottom: '2rem',
    },
  },
  leftArrowSwiper: {
    position: 'absolute',
    zIndex: 1,
    height: 20,
    width: 20,
    cursor: 'pointer',
    transform: 'translate(0, -50%)',
    top: 'calc(50% + 5rem)',
    '&:hover': {
      color: colors.main.brightRed,
      '& svg': {
        '& path': {
          stroke: colors.main.brightRed,
        },
      },
    },
    [breakpoints.down('md')]: {
      right: 'calc(100% - 1.5rem)',
    },
    [breakpoints.down('xs')]: {
      right: 'calc(100% - 5rem)',
      top: 'calc(100% - 65px)',
    },
  },
  rightArrowSwiper: {
    position: 'absolute',
    top: 'calc(50% + 5rem)',
    zIndex: 1,
    height: 20,
    width: 20,
    cursor: 'pointer',
    transform: 'translate(0, -50%)',
    left: 'calc(100% + 1.5rem)',
    '&:hover': {
      color: colors.main.brightRed,
      '& svg': {
        '& path': {
          stroke: colors.main.brightRed,
        },
      },
    },
    [breakpoints.down('md')]: {
      left: 'calc(100% - 1.5rem)',
    },
    [breakpoints.down('xs')]: {
      left: 'calc(100% - 5rem)',
      top: 'calc(100% - 65px)',
    },
  },
  swiper: {
    height: '100%',
    margin: 'auto',
    paddingBottom: '4rem',
    justifyContent: 'center',
    maxWidth: '1200px',
    [breakpoints.down('md')]: {
      width: '91%',
    },
  },
  linkContainer: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    fontFamily: PP_OBJECT_SANS_MEDIUM,
    '&:hover': {
      color: colors.main.brightRed,
    },
  },
  linkText: {
    color: 'inherit',
    fontFamily: 'inherit',
    textDecoration: 'underline',
    lineHeight: 1,
    position: 'relative',
    bottom: '2px',
    [breakpoints.down('md')]: {
      fontSize: '1.125rem',
      lineHeight: '1.625rem',
    },
  },
  linkIcon: {
    lineHeight: 0,
    color: 'inherit',
    '& path': { fill: 'currentColor' },
  },
  heading_s: {
    color: 'white',
  },
  tile: {
    backgroundColor: colors.main.white,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '32px',
    borderRadius: '1rem',
    [breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  tileTitle: {
    marginTop: '1rem',
    height: '40%',
  },
  tileDescription: {
    margin: '1rem 0 2rem 0',
    height: '100%',
    [breakpoints.down('xs')]: {
      margin: '1rem 0',
      fontSize: '1rem',
    },
  },
}))

export default TileSwiper
