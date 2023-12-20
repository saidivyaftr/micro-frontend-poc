import { makeStyles } from '@material-ui/core'
import { Swiper, SwiperSlide } from 'swiper/react'
import colors from '@/shared-ui/colors'
import { useWindowDimensions } from 'src/hooks'
import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from '@/shared-ui/react-icons'
import { PP_OBJECT_SANS_MEDIUM } from 'src/constants/fontFamilyNames'
import Tile from './Tile'
import { IFourTileItem } from '@/shared-ui/components/FourTiles/types'

type TileSwperTypes = {
  tiles: IFourTileItem[]
}

const TileSwiper = ({ tiles }: TileSwperTypes) => {
  const { width } = useWindowDimensions()
  const sliderLength = width < 768 ? 1 : width < 1024 ? 2 : width < 1440 ? 3 : 3
  const classes = useStyles()
  const navigationPrevRef = useRef(null)
  const navigationNextRef = useRef(null)

  return (
    <div className={classes.root} id="tiles-swiper">
      <div className={classes.wrapper}>
        {tiles?.length > sliderLength && (
          <>
            <div ref={navigationPrevRef} className={classes.leftArrowSwiper}>
              <ChevronLeft color={colors.main.white} />
            </div>
            <div ref={navigationNextRef} className={classes.rightArrowSwiper}>
              <ChevronRight color={colors.main.white} />
            </div>
          </>
        )}
        <Swiper
          className={`${classes.swiper} ${
            tiles?.length < 3 ? classes.slideWidth50 : ''
          }`}
          autoplay={false}
          pagination={
            tiles?.length > sliderLength ? { clickable: true } : false
          }
          spaceBetween={16}
          allowSlideNext={tiles?.length > sliderLength}
          allowSlidePrev={tiles?.length > sliderLength}
          centeredSlides={false}
          centerInsufficientSlides={false}
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
          {tiles?.map((item: IFourTileItem, i: number) => (
            <SwiperSlide key={`keys-${i}`} data-testid="swiperquote-slide">
              <Tile
                tile={item}
                type="light"
                titleStyleType="h5"
                descriptionStyleType="p1"
                descriptionClassName={classes.tileDescription}
                iconClassName={classes.ymalIcon}
                titleClassName={classes.tileTitle}
                cardClassName={classes.tile}
              />
            </SwiperSlide>
          ))}
        </Swiper>
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
      backgroundColor: colors.main.opaqueWhite,
      marginRight: 16,
      '&:last-child': {
        marginRight: 0,
      },
    },
    '& .swiper-pagination-bullet-active': {
      backgroundColor: colors.main.primaryRed,
    },
    '& .swiper-slide': {
      height: 'auto',
      marginRight: 32,
      backgroundColor: colors.main.white,
      borderRadius: '1rem',
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
  slideWidth50: {
    '& .swiper-slide': {
      width: '49% !important',
      [breakpoints.down('xs')]: {
        width: '100% !important',
      },
    },
  },
  wrapper: {
    margin: 'auto',
    width: '100%',
    position: 'relative',
    '& .swiper-button-disabled': {
      display: 'none',
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
  },
  leftArrowSwiper: {
    position: 'absolute',
    top: '40%',
    zIndex: 1,
    height: 20,
    width: 20,
    cursor: 'pointer',
    transform: 'translate(0, -50%)',
    right: 'calc(100% + 1.5rem)',
    [breakpoints.down('md')]: {
      display: 'none',
    },
  },
  rightArrowSwiper: {
    position: 'absolute',
    top: '40%',
    zIndex: 1,
    height: 20,
    width: 20,
    cursor: 'pointer',
    transform: 'translate(0, -50%)',
    left: 'calc(100% + 1.5rem)',
    [breakpoints.down('md')]: {
      display: 'none',
    },
  },
  swiper: {
    height: '100%',
    margin: 'auto',
    paddingBottom: '4rem',
    justifyContent: 'center',
    maxWidth: '1200px',
    [breakpoints.down('md')]: {
      width: '100%',
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
    // backgroundColor: colors.main.white,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '32px 32px 80px 32px',
    // borderRadius: '1rem',
    [breakpoints.down('sm')]: {
      padding: '32px 16px 80px 16px',
    },
    '& a': {
      position: 'absolute',
      bottom: 32,
      [breakpoints.down('md')]: {
        width: '90%',
        left: 0,
        right: 0,
        margin: 'auto',
      },
    },
  },
  tileTitle: {
    marginTop: 32,
  },
  tileDescription: {
    minHeight: 80,
    margin: '1rem 0 2rem 0',
    [breakpoints.down('xs')]: {
      margin: '1rem 0',
    },
  },
  ymalIcon: {
    '& svg': {
      height: 27,
      width: 27,
      display: 'block',
    },
  },
}))

export default TileSwiper
