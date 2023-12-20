import { useMemo, useState } from 'react'
import { InjectHTML, Picture, Typography } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core/styles'
import { Swiper, SwiperSlide } from 'swiper/react'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { TAB_CLICK, SITE_INTERACTION } from 'src/constants'
import SwiperTabs from './SwiperTabs'
import colors from '@/shared-ui/colors'

const SwiperContent = (data: any) => {
  const classes = useStyles()
  const { list, title, gridColums } = data
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
      if (snapIndex === 0 || snapIndex - 1 > items.length - 1) {
        newSnapIndex = 0
      } else {
        newSnapIndex = snapIndex - 1
      }
      setSelectedTab(newSnapIndex)
    }
  }

  return (
    <div className={classes.root} id="more">
      {title?.value && (
        <Typography tagType="h3" styleType="h3" className={classes.mainTitle}>
          {title?.value}
        </Typography>
      )}
      <SwiperTabs
        tabs={tabs}
        selectedTabIndex={selectedTab}
        setSelectedTab={onTabChange}
        gridBlocksCount={gridColums?.value}
        tabsClassName={classes.tabsClass}
      />

      <Swiper
        onSwiper={setSwiper}
        className={classes.swiper}
        slidesPerView={1}
        centeredSlides={true}
        onSlideChange={onSlideChange}
        loop={true}
        autoHeight
        simulateTouch={false}
      >
        {items?.map((slideContent: any, index: number) => {
          return (
            <SwiperSlide key={`swiper-slide-${index}`}>
              <div className={classes.sliderBlock}>
                <div className={classes.contentBox}>
                  <InjectHTML
                    tagType="p"
                    data-testid={`Title-${index}`}
                    styleType="p1"
                    value={slideContent?.heading?.value}
                    className={classes.heading}
                  />
                  <div>
                    <InjectHTML
                      tagType="span"
                      data-testid={`subTitle-${index}`}
                      styleType="h2"
                      value={slideContent?.price?.value}
                    />
                    <InjectHTML
                      tagType="span"
                      data-testid={`subTitle-${index}`}
                      styleType="p1"
                      value={slideContent?.pricePeriod?.value}
                      className={classes.pricePeriod}
                    />
                  </div>
                </div>
                <Picture
                  data-testid="cardImage"
                  desktop={{
                    image: slideContent?.image?.src,
                    webp: slideContent?.imagewebp?.src,
                  }}
                  tablet={{
                    image: slideContent?.image?.src,
                    webp: slideContent?.imagewebp?.src,
                  }}
                  mobile={{
                    image: slideContent?.mobileImage?.src,
                    webp: slideContent?.mobileImagewebp?.src,
                  }}
                  altText={slideContent?.image?.altText}
                  className={classes.slideImage}
                />
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
    maxWidth: 1232,
    padding: '80px 16px',
    margin: 'auto',
    position: 'relative',
    '& .swiper-button-disabled': {
      opacity: 0.3,
    },
    [breakpoints.down('sm')]: {
      padding: '48px 16px',
      overflow: 'hidden',
    },
    [breakpoints.down('xs')]: {
      padding: '48px 16px 35px 16px',
    },
    '& .swiper-slide': {
      width: '100% !important',
    },
    '& .MuiGrid-item': {
      [breakpoints.down(1000)]: {
        borderBottom: `3px solid ${colors.main.lightGray}`,
        position: 'relative',
      },
      '&:after': {
        [breakpoints.down(1000)]: {
          bottom: -3,
        },
      },
    },
  },
  pricePeriod: {
    [breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  },
  tabsClass: {
    justifyContent: 'space-between',
    [breakpoints.down(1000)]: {
      borderBottom: 'none',
      justifyContent: 'flex-start',
      flexWrap: 'initial',
      overflowX: 'scroll',
      overflowY: 'hidden',
    },
  },
  swiper: {
    height: '100%',
    display: 'block',
    margin: 'auto',
    position: 'relative',
    marginTop: 32,
    [breakpoints.down('sm')]: {
      marginTop: 10,
    },
    '& .swiper-wrapper': {
      height: '100% !important',
      display: 'flex',
    },
    '& .swiper-horizontal': {
      display: 'flex',
    },
  },
  mainTitle: {
    marginBottom: 20,
    [breakpoints.down('sm')]: {
      marginBottom: 16,
    },
  },
  description: {
    marginTop: '1rem',
    [breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  },
  heading: {
    [breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  },

  contentBox: {
    width: '50%',
    padding: '0%  4%',
    marginTop: 16,
    '& strong': {
      fontFamily: 'PP Object Sans Bold',
    },
    [breakpoints.down('sm')]: {
      width: '100%',
      padding: 0,
      marginTop: 0,
    },
  },
  slideImage: {
    width: '100%',
  },
  sliderBlock: {
    display: 'flex',
    [breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
      padding: '0 16px',
    },
  },
}))

export default SwiperContent
