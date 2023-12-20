import { useMemo, useState } from 'react'
import { useAppData, useWindowDimensions } from 'src/hooks'
import { Typography, Button, InjectHTML } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core/styles'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper'
import colors from '@/shared-ui/colors'
import SwiperTabs from './SwiperTabs'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { TAB_CLICK, SITE_INTERACTION, COMPONENT_WRAPPER } from 'src/constants'
SwiperCore.use([Navigation])

const SwiperContent = () => {
  const { width } = useWindowDimensions()
  const classes = useStyles()
  const { title, subTitle, list, disclaimer } = useAppData(
    'stayConnectedTabss',
    true,
  )
  const items = list?.targetItems || []
  const [selectedTab, setSelectedTab] = useState(0)
  const [swiper, setSwiper] = useState<any>(null)

  const tabs = useMemo(() => {
    return items?.map(({ title }: any) => title?.value) || []
  }, [items])

  const onTabChange = (newTabIndex: number) => {
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: TAB_CLICK.replace('{NAME}', tabs[newTabIndex].toLowerCase()),
      },
      'tl_o',
      SITE_INTERACTION,
    )
    setSelectedTab(newTabIndex)
    if (swiper) {
      swiper?.slideTo?.(newTabIndex + 1)
    }
  }

  const onSlideChange = ({ snapIndex }: any) => {
    if (selectedTab - 1 !== selectedTab) {
      let newSnapIndex = 0
      if (snapIndex === 0) {
        newSnapIndex = items.length - 1
      } else if (snapIndex - 1 > items.length - 1) {
        newSnapIndex = 0
      } else {
        newSnapIndex = snapIndex - 1
      }
      setSelectedTab(newSnapIndex)
    }
  }

  swiper?.slides.map((slide: any) => {
    if (!slide.className.includes('swiper-slide-visible')) {
      slide.style.visibility = 'visible'
    } else {
      slide.style.visibility = 'visible'
    }
  })

  if (!tabs || tabs?.length === 0) {
    return null
  }

  return (
    <div className={classes.root} id="more">
      {title?.value && (
        <InjectHTML
          tagType="h2"
          styleType="h3"
          className={classes.title}
          value={title?.value}
        />
      )}
      {subTitle?.value && (
        <Typography styleType="p1" className={classes.desc}>
          {subTitle?.value}
        </Typography>
      )}
      <SwiperTabs
        tabs={tabs}
        selectedTabIndex={selectedTab}
        setSelectedTab={onTabChange}
      />
      <div>
        <Swiper
          onSwiper={setSwiper}
          className={classes.swiper}
          slidesPerView={1}
          centeredSlides={true}
          onSlideChange={onSlideChange}
          loop={true}
          autoHeight={true}
          simulateTouch={false}
        >
          {items?.map((slideContent: any, index: number) => {
            return (
              <SwiperSlide key={`swiper-slide-${index}`}>
                <div
                  className={
                    slideContent?.slideToggle.value
                      ? classes.contentBlockImage
                      : classes.contentBlock
                  }
                >
                  <div className={classes.imageBlock}>
                    <img
                      data-testid="cardImage"
                      src={
                        width > 0 && width < 768
                          ? slideContent?.mobileImage?.src
                          : slideContent?.image?.src
                      }
                      alt={slideContent?.title?.value}
                      className={
                        slideContent?.slideToggle.value
                          ? classes.imageClassShift
                          : classes.imageClass
                      }
                    />
                  </div>
                  <div
                    className={
                      slideContent?.slideToggle.value
                        ? classes.contentWrapperImage
                        : classes.contentWrapper
                    }
                  >
                    <div className={classes.slideTextWrapper}>
                      <InjectHTML
                        className={classes.subTitle}
                        tagType="h3"
                        styleType="h4"
                        color="secondary"
                        data-testid={`subTitle-${index}`}
                        value={slideContent?.heading?.value}
                      />
                      <InjectHTML
                        tagType="p"
                        styleType="p1"
                        color="tertiary"
                        testId={`subTitle-${index}`}
                        className={classes.subTitleText}
                        value={slideContent?.subTitle?.value}
                      />
                      <ul className={classes.perksList}>
                        {slideContent?.perks?.targetItems?.map(
                          (perk: any, index: number) => {
                            return (
                              <li
                                key={`perk-${title?.value}-${index}`}
                                className={classes.bullets}
                              >
                                <div className={classes.dotStyles}></div>
                                <InjectHTML
                                  styleType="p1"
                                  color="tertiary"
                                  value={perk?.title?.value}
                                  className={classes.listContent}
                                />
                              </li>
                            )
                          },
                        )}
                      </ul>
                      {slideContent?.primaryButtonText?.value && (
                        <Button
                          type="link"
                          hoverVariant="secondary"
                          href={slideContent?.primaryButtonLink?.url}
                          text={slideContent?.primaryButtonText?.value}
                          className={classes.primaryBtn}
                        />
                      )}

                      {slideContent?.disclaimer?.value && (
                        <InjectHTML
                          styleType="legal"
                          color="tertiary"
                          className={classes.disclaimer}
                          value={slideContent?.disclaimer?.value}
                        />
                      )}
                    </div>
                    {slideContent?.description?.value && (
                      <InjectHTML
                        className={classes.description}
                        value={slideContent?.description?.value}
                      />
                    )}
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
        {disclaimer?.value && (
          <InjectHTML
            value={disclaimer?.value}
            tagType="p"
            styleType="legal"
            className={classes.legalStyles}
          />
        )}
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    ...COMPONENT_WRAPPER,
    margin: 'auto',
    padding: '80px 16px 0px',
    [breakpoints.down('sm')]: {
      padding: '0px 16px',
      margin: '40px auto',
    },
  },
  swiper: {
    display: 'block',
    margin: 'auto',
    position: 'relative',
    marginTop: 16,
    '& .swiper-wrapper': {
      display: 'flex',
    },
  },
  listContent: {
    width: 'calc(100% - 22.5px)',
  },
  subTitle: {
    marginBottom: 8,
  },
  subTitleText: {
    marginBottom: 0,
    marginTop: 5,
  },
  dotStyles: {
    width: 5,
    height: 5,
    borderRadius: 50,
    backgroundColor: colors.main.white,
    marginRight: 17.5,
    marginTop: 10,
    lineHeight: '26px',
  },
  description: {
    background: colors.main.greenishBlue,
    marginBottom: 32,
    padding: '8px 80px',
    paddingRight: 0,
    position: 'relative',
    '&::before': {
      position: 'absolute',
      content: `" "`,
      left: 0,
      right: 0,
      top: '-6px',
      width: '100%',
      height: 2,
      backgroundColor: colors.main.greenishBlue,
    },
    '&::after': {
      position: 'absolute',
      content: `" "`,
      left: 0,
      right: 0,
      bottom: '-6px',
      width: '100%',
      height: 2,
      backgroundColor: colors.main.greenishBlue,
    },
    [breakpoints.down('sm')]: {
      padding: 8,
    },
    '& > span > div > p': {
      lineHeight: 1.5,
      margin: 'auto',
    },
    '& small': {
      fontSize: 10,
      lineHeight: '14px',
      display: 'block',
      marginTop: 6,
    },
    '& strong': {
      fontSize: '16px !important',
      lineHeight: '24px !important',
      [breakpoints.down('sm')]: {
        fontSize: '14px !important',
        lineHeight: '20px !important',
      },
    },
    '& img': {
      height: '120px !important',
      width: '120px !important',
      marginTop: 'auto !important',
      marginBottom: 'auto !important',
    },
  },
  slideTextWrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    '& sup': {
      fontSize: '16px',
      lineHeight: 0,
      verticalAlign: 'super',
    },
    marginBottom: 36,
    textAlign: 'center',
  },
  desc: {
    marginBottom: 16,
    textAlign: 'center',
  },
  perksList: {
    marginTop: 8,
    paddingLeft: 0,
  },
  disclaimer: {
    marginTop: 52,
  },
  primaryBtn: {
    marginTop: 32,
    maxWidth: 256,
    paddingLeft: 20,
    paddingRight: 20,
    display: 'block',
    [breakpoints.down('sm')]: {
      maxWidth: '100%',
      marginTop: 8,
    },
  },
  bullets: {
    display: 'flex',
    minHeight: 24,
    marginBottom: 8,
    '& sup': {
      lineHeight: 0,
      fontSize: 12,
    },
  },
  contentBlockImage: {
    flexDirection: 'row-reverse',
    display: 'flex',
    [breakpoints.down('md')]: {
      display: 'block',
    },
  },
  iconWrapper: {
    width: 16,
    height: 16,
    marginRight: 10,
    marginTop: 2,
    '& path': {
      stroke: colors.main.white,
      fill: colors.main.white,
    },
  },
  imageBlock: {
    width: '58.4%',
    '& picture': {
      display: 'flex',
    },
    [breakpoints.down('md')]: {
      width: '100%',
    },
    [breakpoints.down('xs')]: {
      borderTopRightRadius: 32,
      borderTopLeftRadius: 32,
    },
  },
  contentBlock: {
    display: 'flex',
    [breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  legalStyles: {
    marginTop: '1rem',
    [breakpoints.down('md')]: {
      paddingLeft: 16,
      marginTop: '0.5rem',
    },
  },
  imageClass: {
    width: '100%',
    display: 'flex',
    borderTopLeftRadius: 32,
    borderBottomLeftRadius: 32,
    [breakpoints.down('md')]: {
      height: 'auto',
      borderTopRightRadius: 32,
      borderTopLeftRadius: 32,
      borderBottomLeftRadius: 0,
    },
  },
  imageClassShift: {
    width: '100%',
    display: 'flex',
    borderTopRightRadius: 32,
    borderBottomRightRadius: 32,
    [breakpoints.down('md')]: {
      borderTopLeftRadius: 32,
      borderBottomRightRadius: 0,
      borderTopRightRadius: 32,
    },
  },
  contentWrapper: {
    background: colors.main.midnightExpress,
    borderTopRightRadius: 32,
    borderBottomRightRadius: 32,
    padding: '30px 64px',
    width: '41.6%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    [breakpoints.down('md')]: {
      width: '100%',
      borderTopRightRadius: 0,
      borderBottomLeftRadius: 32,
      borderBottomRightRadius: 32,
      padding: 32,
    },
  },
  contentWrapperImage: {
    background: colors.main.midnightExpress,
    borderTopLeftRadius: 32,
    borderBottomLeftRadius: 32,
    padding: '30px 64px',
    width: '43%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    [breakpoints.down('md')]: {
      width: '100%',
      borderTopLeftRadius: 0,
      borderBottomRightRadius: 32,
      borderBottomLeftRadius: 32,
      padding: 32,
    },
  },
}))

export default SwiperContent
