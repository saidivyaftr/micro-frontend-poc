import { useMemo, useState } from 'react'
import Image from 'next/future/image'
import { useAppData, useWindowDimensions } from 'src/hooks'
import { InjectHTML, TooltipPopover, Typography } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core/styles'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper'
import colors from '@/shared-ui/colors'
import SwiperTabs from './SwiperTabs'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { TAB_CLICK, SITE_INTERACTION } from 'src/constants'
import { InfoIconWhite } from '@/shared-ui/react-icons/index'
import { IShopComponents } from './types'
SwiperCore.use([Navigation])

const SwiperContentWithArrow = ({ styles }: IShopComponents) => {
  const classes = useStyles()
  const { list } = useAppData('carousel', true)
  const items = list?.targetItems || []
  const [selectedTab, setSelectedTab] = useState(0)
  const [swiper, setSwiper] = useState<any>(null)

  const tabs = useMemo(() => {
    return items?.map(({ title }: any) => title?.value) || []
  }, [items])
  const { width } = useWindowDimensions()
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

  const onNavigateLeft = () => {
    const newTabIndex = selectedTab === 0 ? items.length - 1 : selectedTab - 1
    onTabChange(newTabIndex)
  }

  const onNavigateRight = () => {
    const newTabIndex = selectedTab === items.length - 1 ? 0 : selectedTab + 1
    onTabChange(newTabIndex)
  }

  const onSlideChange = ({ snapIndex }: any) => {
    if (selectedTab - 1 !== selectedTab) {
      let newSnapIndex = 0
      if (snapIndex === 0 || snapIndex - 1 > items.length - 1) {
        newSnapIndex = 0
      } else {
        newSnapIndex = snapIndex - 1
      }
      setSelectedTab(newSnapIndex)
    }
  }
  return (
    <div className={classes.root} id="more" style={styles}>
      <SwiperTabs
        tabs={tabs}
        selectedTabIndex={selectedTab}
        setSelectedTab={onTabChange}
      />

      <div className={classes.leftArrow} onClick={onNavigateLeft}>
        <KeyboardArrowLeftIcon />
      </div>
      <div className={classes.rightArrow} onClick={onNavigateRight}>
        <KeyboardArrowRightIcon />
      </div>

      <Swiper
        onSwiper={setSwiper}
        className={classes.swiper}
        slidesPerView={1}
        centeredSlides={true}
        onSlideChange={onSlideChange}
        loop={true}
        simulateTouch={false}
        autoHeight
      >
        {items?.map((slideContent: any, index: number) => {
          return (
            <SwiperSlide key={`swiper-slide-${index}`}>
              <div>
                <Image
                  loader={() =>
                    width > 0 && width < 768
                      ? slideContent?.mobileImage?.src
                      : slideContent?.image?.src
                  }
                  className={classes.slideImage}
                  src={
                    width > 0 && width < 768
                      ? slideContent?.mobileImage?.src
                      : slideContent?.image?.src
                  }
                  alt={slideContent?.image?.alt}
                />
                <div className={classes.slideTextWrapper}>
                  <InjectHTML
                    className={classes.subTitle}
                    tagType="p"
                    testId={`subTitle-${index}`}
                    styleType="p1"
                    fontType="boldFont"
                    value={slideContent?.subTitle?.value}
                  />
                  <div className={classes.descriptionBlock}>
                    <InjectHTML
                      className={classes.description}
                      tagType="p"
                      data-testid={`subTitle-${index}`}
                      styleType="p1"
                      value={slideContent?.description?.value}
                    />
                    {slideContent?.logoBlock?.targetItem?.logo?.src && (
                      <>
                        <hr />
                        <div className={classes.logoBlockStyles}>
                          <div className={classes.logoStyles}>
                            <Image
                              loader={() =>
                                slideContent?.logoBlock?.targetItem?.logo?.src
                              }
                              src={
                                slideContent?.logoBlock?.targetItem?.logo?.src
                              }
                              alt={
                                slideContent?.logoBlock?.targetItem?.logo?.alt
                              }
                            />
                          </div>
                          <div>
                            <InjectHTML
                              tagType="span"
                              styleType="p1"
                              className={classes.logoBlockContentStyles}
                              value={
                                slideContent?.logoBlock?.targetItem?.description
                                  ?.value
                              }
                            />
                            {slideContent?.logoBlock?.targetItem?.toolTipContent
                              ?.value && (
                              <TooltipPopover
                                tooltipContent={
                                  slideContent?.logoBlock?.targetItem
                                    ?.toolTipContent?.value
                                }
                                tooltipIcon={<InfoIconWhite />}
                              />
                            )}
                            <div>
                              {slideContent?.logoBlock?.targetItem?.legalContent
                                ?.value && (
                                <Typography
                                  tagType="span"
                                  styleType="legal"
                                  className={classes.toolTipDescription}
                                >
                                  {
                                    slideContent?.logoBlock?.targetItem
                                      ?.legalContent?.value
                                  }
                                </Typography>
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    maxWidth: 1050,
    padding: '0px 60px',
    margin: 'auto',
    position: 'relative',
    '& .swiper-button-disabled': {
      opacity: 0.3,
    },
    [breakpoints.down('xs')]: {
      padding: 10,
    },
  },
  descriptionBlock: {
    maxWidth: 532,
    [breakpoints.down('md')]: {
      maxWidth: 'unset',
    },
  },
  toolTipDescription: {
    margin: 0,
  },
  logoBlockContentStyles: {
    fontSize: '12px',
    lineHeight: '14px',
    margin: 0,
    display: 'initial',
  },
  logoBlockStyles: {
    display: 'flex',
    marginTop: 10,
    alignItems: 'center',
    lineHeight: '14px',
    [breakpoints.down('xs')]: {
      marginRight: '41px',
    },
  },
  swiper: {
    height: '100%',
    display: 'block',
    margin: 'auto',
    position: 'relative',
    marginTop: 30,
    '& .swiper-wrapper': {
      display: 'flex',
    },
    '& .swiper-horizontal': {
      display: 'flex',
    },
  },
  logoStyles: {
    marginRight: '42px',
    '& img': {
      width: '56px',
    },
  },
  leftArrow: {
    position: 'absolute',
    top: 300,
    height: 50,
    width: 50,
    left: 0,
    cursor: 'pointer',
    display: 'block',
    '& svg': {
      height: 50,
      width: 50,
      '&:hover': {
        fill: colors.main.brightRed,
      },
    },
    [breakpoints.down('md')]: {
      height: 50,
      width: 50,
      top: 250,
      '& svg': {
        height: 50,
        width: 50,
      },
    },
    [breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  rightArrow: {
    position: 'absolute',
    top: 300,
    height: 50,
    width: 50,
    right: 0,
    cursor: 'pointer',
    display: 'block',
    '& svg': {
      height: 50,
      width: 50,
      '&:hover': {
        fill: colors.main.brightRed,
      },
    },
    [breakpoints.down('md')]: {
      height: 50,
      width: 50,
      top: 250,
      '& svg': {
        height: 50,
        width: 50,
      },
    },
    [breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  subTitle: {
    fontSize: '24px',
    lineHeight: '32px',
    color: colors.main.brightRed,
    margin: 0,
    marginTop: 20,
    maxWidth: 290,
    [breakpoints.down('sm')]: {
      maxWidth: '100%',
      fontSize: '18px',
      lineHeight: '26px',
    },
  },
  description: {
    marginTop: 20,
    '& p': {
      margin: 0,
    },
    [breakpoints.down('md')]: {
      marginLeft: 0,
      marginTop: 10,
    },
    [breakpoints.down('xs')]: {
      paddingRight: '5px',
    },
  },
  slideTextWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    [breakpoints.down('md')]: {
      display: 'block',
    },
  },
  slideImage: {
    width: '100%',
    borderRadius: '16px',
  },
}))

export default SwiperContentWithArrow
