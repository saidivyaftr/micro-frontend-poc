import { useEffect, useState, useRef } from 'react'
import { makeStyles } from '@material-ui/core'
import clx from 'classnames'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Typography, Loading, Hero } from '@/shared-ui/components'
import YextSnippet from 'src/utils/yext'
import { Magnify, ChevronLeft, ChevronRight } from '@/shared-ui/react-icons'
import colors from '@/shared-ui/colors'
import { useSelector } from 'react-redux'
import { useAppData, useUpdateSearchPlaceholder } from 'src/hooks'

const HeroSection: React.FC<{ page: string }> = ({ page }) => {
  const heroBannerData = useAppData('heroBanner', true)
  const {
    firstTitle,
    secondTitle,
    loggedInSecondTitle,
    navLinks,
    secondTitleForContentPage,
    loggedInSecondTitleForContentPage,
  } = heroBannerData
  const classes = useStyles()
  useUpdateSearchPlaceholder()
  const navigationPrevRef = useRef(null)
  const navigationNextRef = useRef(null)
  const [swiper, setSwiper] = useState<any>(null)
  const slideTo = (index: number) => swiper?.slideTo?.(index)
  const { isLoading, loggedInState } =
    useSelector((state: any) => state?.session) || {}

  useEffect(() => {
    const selectedIndex =
      navLinks?.list?.findIndex(
        ({ href }: any, index: number) =>
          `/helpcenter/${page}` === href?.url || (page === '' && index === 0),
      ) || 0
    slideTo(selectedIndex)
  }, [swiper, setSwiper, navLinks])

  const renderWelcomeMessage = () => {
    if (isLoading) {
      return (
        <div className={classes.loadingWrapper}>
          <Loading />
        </div>
      )
    }
    let welcomeMessage = ''
    const currentPage = navLinks?.list?.find(
      ({ href }: any) => `/helpcenter/${page}` === href?.url,
    )
    const pageName = currentPage?.title?.value || page?.replaceAll('-', ' ')
    if (loggedInState?.firstName) {
      if (page) {
        const loggedInTitle = loggedInSecondTitleForContentPage?.value
        welcomeMessage = loggedInTitle?.replace(
          '{{name}}',
          loggedInState?.firstName,
        )
        welcomeMessage = welcomeMessage?.replace('{{category}}', pageName)
      } else {
        const loggedInTitle = loggedInSecondTitle?.value
        welcomeMessage = loggedInTitle?.replace(
          '{{name}}',
          loggedInState?.firstName,
        )
      }
    } else {
      if (page) {
        const loggedInTitle = secondTitleForContentPage?.value
        welcomeMessage = loggedInTitle?.replace('{{category}}', pageName)
      } else {
        welcomeMessage = secondTitle?.value
      }
    }
    return (
      <Typography
        tagType="h1"
        styleType="h2"
        color="tertiary"
        className={clx({
          [classes.welcomeMessage]: welcomeMessage === secondTitle?.value,
          [classes.secondTitle]: secondTitleForContentPage?.value,
        })}
      >
        {welcomeMessage}
      </Typography>
    )
  }

  if (Object.keys(heroBannerData)?.length === 0) {
    return null
  }

  return (
    <Hero
      backgroundColor="gravity"
      bkgImgClassName={classes.bkgContain}
      removeStripes={false}
      backgroundImage={''}
      mobileBackgroundImage={''}
      contentClassName={classes.root}
      titleClass={classes.title}
      stripesClass={classes.stripes}
      leftContentClassName={classes.leftContent}
      className={classes.heroStripes}
      stripeStyles={{
        height: 18,
        marginBottom: 12,
      }}
      content={
        <div>
          <Typography
            color="secondary"
            fontType="boldFont"
            className={classes.headingTitle}
          >
            {firstTitle?.value}
          </Typography>
          {renderWelcomeMessage()}
          <div className={classes.searchContainer}>
            <Magnify />
            <div className={classes.yextSearchWrapper}>
              <div className="yext-search-container-help-center"></div>
              <YextSnippet />
            </div>
          </div>
          <ul className={classes.linksDesktopContainer}>
            {navLinks?.list?.map(({ title, href }: any, index: number) => {
              const linkPath =
                process.env.NODE_ENV === 'development'
                  ? `/pages/${href?.url}`
                  : href?.url
              return (
                <li
                  key={`nav-${title}-${index}`}
                  className={clx(classes.linkItem, {
                    [classes.selectedRoute]:
                      `/helpcenter/${page}` === href?.url ||
                      (page === '' && index === 0),
                  })}
                >
                  <a href={linkPath}>{title?.value}</a>
                </li>
              )
            })}
          </ul>
          <div className={classes.swiperContainer}>
            <div ref={navigationPrevRef} className={classes.leftArrowSwiper}>
              <ChevronLeft />
            </div>
            <div ref={navigationNextRef} className={classes.rightArrowSwiper}>
              <ChevronRight />
            </div>
            <Swiper
              className={classes.swiper}
              allowSlideNext={true}
              allowSlidePrev={true}
              slidesPerView={3}
              onSwiper={setSwiper}
              centeredSlides={!!page}
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
              {navLinks?.list?.map(({ title, href }: any, key: number) => (
                <SwiperSlide
                  id={`slide-${key}`}
                  key={`carousal-${key}`}
                  className={clx(classes.linkItem, {
                    [classes.selectedRoute]:
                      `/helpcenter/${page}` === href?.url ||
                      (page === '' && key === 0),
                  })}
                >
                  <div className={classes.link}>
                    <a href={href?.url}>{title?.value}</a>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      }
    />
  )
}
const useStyles = makeStyles(({ breakpoints }: { breakpoints: any }) => ({
  root: {
    marginBottom: '0px',
    maxWidth: '77rem',
    [breakpoints.down('xs')]: {
      padding: '0 1rem',
    },
  },
  bkgContain: {
    minHeight: 'auto !important',
  },
  secondTitle: {
    whiteSpace: 'nowrap',
    [breakpoints.down('xs')]: {
      whiteSpace: 'pre-line',
    },
  },
  link: {
    whiteSpace: 'nowrap',
  },
  leftContent: {
    height: 'unset !important',
    maxWidth: '1232px',
  },
  title: {
    maxWidth: '1232px !important',
  },
  welcomeMessage: {
    [breakpoints.down('xs')]: {
      whiteSpace: 'nowrap',
    },
  },
  stripes: {
    top: '0px !important',
  },
  yextSearchWrapper: {
    width: 'calc(98% - 30px)',
    position: 'relative',
    '& .yext-search-container-help-center': {
      height: 60,
    },
    '& .yext-search-container-help-center input': {
      width: '100%',
      borderRadius: 30,
      flex: 1,
      height: 60,
      border: 0,
      outline: 'none',
      fontSize: '18px',
      fontFamily: 'PP Object Sans Bold',
      [breakpoints.down('xs')]: {
        fontSize: '16px',
      },
    },
    '& .yxt-SearchBar-container': {
      border: '0 !important',
      background: 'transparent',
      zIndex: 99,
      boxShadow: 'none !important',
      '&:hover': {
        boxShadow: 'none !important',
      },
    },
    '& .yxt-SearchBar-input': {
      paddingLeft: 10,
      padding: 0,
    },
    '& .yxt-SearchBar-form': {
      '& button': {
        display: 'none',
      },
    },
    '& .yxt-AutoComplete-option': {
      fontFamily: 'PP Object Sans',
      padding: '6px 16px',
    },
    '& .yxt-AutoComplete-wrapper': {
      backgroundColor: 'transparent',
    },
    '& .yxt-AutoComplete': {
      backgroundColor: colors.main.white,
      border: `1px solid ${colors.main.borderGrey}`,
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 16,
      borderRadius: 16,
      borderTop: 0,
      marginTop: 6,
      paddingTop: 10,
      '&::before': { display: 'none' },
    },
  },
  headingTitle: {
    lineHeight: 1.1,
    marginBottom: '.625rem',
    [breakpoints.down('xs')]: {
      fontSize: 14,
    },
  },
  loadingWrapper: {
    marginTop: 50,
    width: 100,
  },
  heroStripes: {
    overflow: 'unset !important',
    minHeight: 'unset !important',
    paddingTop: '8rem',
    [breakpoints.down('xs')]: {
      paddingTop: '4rem',
    },
  },
  innerWrapper: {
    paddingBottom: 0,
  },
  searchContainer: {
    width: 700,
    marginTop: 36,
    marginRight: 16,
    borderRadius: 30,
    display: 'flex',
    padding: '0px 16px',
    paddingLeft: 24,
    alignItems: 'center',
    gap: 16,
    backgroundColor: colors.main.white,
    '& svg': {
      height: 18,
      width: 18,
      '& path': {
        fill: colors.main.grayOpacity50,
      },
    },
    [breakpoints.down('xs')]: {
      marginTop: 8,
      width: '100%',
    },
  },
  linksDesktopContainer: {
    display: 'flex',
    listStyleType: 'none',
    padding: 0,
    marginTop: 116,
    marginBottom: 0,
    [breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  linkItem: {
    cursor: 'pointer',
    color: colors.main.white,
    fontFamily: 'PP Object Sans Bold',
    borderBottom: `4px solid transparent`,
    '& a': {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      height: 48,
      alignItems: 'center',
      fontSize: 16,
    },
    [breakpoints.up('sm')]: {
      flex: 1,
      '& a': {
        fontSize: 18,
      },
    },
    '&:hover': {
      color: colors.main.brightRed,
      borderBottom: `1px solid ${colors.main.brightRed}`,
    },
  },
  selectedRoute: {
    borderBottom: `4px solid ${colors.main.brightRed}`,
    color: colors.main.brightRed,
  },
  swiperContainer: {
    position: 'relative',
    '& .swiper-button-disabled': {
      display: 'none',
    },
    [breakpoints.up('sm')]: {
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
  swiper: {
    color: colors.main.white,
    marginTop: 70,
    marginLeft: 30,
    marginRight: 30,
  },
  leftArrowSwiper: {
    position: 'absolute',
    left: -10,
    top: 14,
    zIndex: 1,
    height: 20,
    width: 20,
  },
  rightArrowSwiper: {
    position: 'absolute',
    right: 10,
    top: 14,
    zIndex: 1,
    height: 20,
    width: 20,
  },
}))

export default HeroSection
