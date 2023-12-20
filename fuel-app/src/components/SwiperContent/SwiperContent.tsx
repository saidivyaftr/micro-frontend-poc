import { useMemo, useState } from 'react'
import { Typography, Button, InjectHTML } from 'src/blitz'
import { makeStyles } from '@material-ui/core/styles'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper'
import colors from 'src/styles/theme/colors'
import SwiperTabs from './SwiperTabs'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { TAB_CLICK, SITE_INTERACTION, COMPONENT_WRAPPER } from 'src/constants'
import { useAppData, useWindowDimensions } from 'src/hooks'
import Image from 'next/future/image'

SwiperCore.use([Navigation])
const SwiperContent = ({ styles }: any) => {
  const classes = useStyles()
  const { title, subTitle, list, disclaimer } = useAppData(
    'tabsWithImageGlobal',
    true,
  )
  const { width } = useWindowDimensions()
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

  if (!tabs || tabs?.length === 0) {
    return null
  }

  return (
    <div className={classes.root} id="more" style={styles}>
      {title?.value && (
        <InjectHTML
          tagType="h2"
          styleType="h3"
          className={classes.title}
          value={title?.value}
        />
      )}
      {subTitle?.value && (
        <Typography
          styleType="h5"
          className={classes.desc}
          fontType="regularFont"
        >
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
          simulateTouch={false}
          autoHeight
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
                    <Image
                      loader={() =>
                        width > 0 && width < 768
                          ? slideContent?.mobileImage?.src
                          : slideContent?.image?.src
                      }
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
                      {slideContent?.heading?.value && (
                        <InjectHTML
                          className={classes.subTitle}
                          tagType="h3"
                          styleType="h3"
                          value={slideContent?.heading?.value}
                        />
                      )}
                      {slideContent?.titleImg?.src && (
                        <Image
                          loader={() => slideContent?.titleImg?.src}
                          className={classes.imageStyles}
                          src={slideContent?.titleImg?.src}
                          alt={slideContent?.title?.value}
                        />
                      )}
                      <InjectHTML
                        tagType="p"
                        styleType="p1"
                        className={classes.subTitleText}
                        value={slideContent?.subTitle?.value}
                        data-testid={`subTitle-${index}`}
                      />
                      {slideContent?.disclaimer?.value && (
                        <InjectHTML
                          styleType="legal"
                          value={slideContent?.disclaimer?.value}
                        />
                      )}
                      <Button
                        type="link"
                        variant={slideContent?.variant?.targetItem?.type?.value}
                        hoverVariant={
                          slideContent?.hoverState?.targetItem?.type?.value
                        }
                        href={slideContent?.primaryButtonLink?.url}
                        text={slideContent?.primaryButtonText?.value}
                        className={classes.primaryBtn}
                      />
                    </div>
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
    margin: '80px auto',
    [breakpoints.down('sm')]: {
      margin: '40px auto',
    },
  },
  swiper: {
    display: 'block',
    margin: 'auto',
    position: 'relative',
    marginTop: 16,
    '& swiper-wrapper': {
      display: 'flex',
    },
  },
  subTitle: {
    marginBottom: 8,
    letterSpacing: '-0.02em',
  },
  subTitleText: {
    marginBottom: 16,
    marginTop: 5,
  },
  imageStyles: {
    maxWidth: 248,
    width: '100%',
  },
  legalStyles: {
    marginTop: '1rem',
    [breakpoints.down('md')]: {
      paddingLeft: 16,
      marginTop: '0.5rem',
    },
  },
  slideTextWrapper: {
    height: '100%',
    display: 'flex',
    maxWidth: '372px',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    [breakpoints.down('md')]: {
      maxWidth: 600,
    },
    [breakpoints.down('sm')]: {
      maxWidth: '100%',
    },
  },
  title: {
    '& sup': {
      fontSize: '16px',
      lineHeight: 0,
      verticalAlign: 'super',
    },
    marginBottom: 16,
    textAlign: 'center',
  },
  desc: {
    marginBottom: 24,
    textAlign: 'center',
    [breakpoints.down('sm')]: {
      marginBottom: 16,
    },
  },
  primaryBtn: {
    marginTop: 32,
    maxWidth: 256,
    paddingLeft: 20,
    paddingRight: 20,
    display: 'block',
    [breakpoints.down('sm')]: {
      maxWidth: '100%',
    },
  },
  contentBlockImage: {
    flexDirection: 'row-reverse',
    display: 'flex',
    [breakpoints.down('md')]: {
      display: 'block',
    },
  },
  imageBlock: {
    width: '58%',
    '& picture': {
      display: 'flex',
    },
    [breakpoints.down('md')]: {
      width: '100%',
    },
    [breakpoints.down('xs')]: {
      borderRadius: '32px 32px 0px 0px',
    },
  },
  contentBlock: {
    display: 'flex',
    padding: '0px',
    [breakpoints.down('md')]: {
      flexDirection: 'column',
      paddingLeft: '0',
    },
  },
  imageClass: {
    backgroundColor: colors.main.midnightExpress,
    width: '100%',
    display: 'flex',
    borderRadius: '32px 0px 0px 32px',
    [breakpoints.down('md')]: {
      borderRadius: '32px 32px 0px 0px',
    },
  },
  imageClassShift: {
    width: '100%',
    display: 'flex',
    borderRadius: '0px 32px 32px 0px',
    [breakpoints.down('md')]: {
      borderRadius: '32px 32px 0px 0px',
    },
  },
  contentWrapper: {
    background: colors.main.grey,
    borderRadius: '0px 32px 32px 0px',
    padding: '30px 64px',
    width: '42%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    [breakpoints.down(1250)]: {
      padding: '24px',
      alignItems: 'center',
    },
    [breakpoints.down('md')]: {
      width: '100%',
      borderRadius: '0px 0px 32px 32px',
      padding: 16,
    },
  },
  contentWrapperImage: {
    background: colors.main.grey,
    borderRadius: '32px 0px 0px 32px',
    padding: '30px 64px',
    width: '42%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    [breakpoints.down(1250)]: {
      padding: '24px',
      alignItems: 'center',
    },
    [breakpoints.down('md')]: {
      width: '100%',
      borderRadius: '0px 0px 32px 32px',
      padding: 16,
    },
  },
}))

export default SwiperContent
