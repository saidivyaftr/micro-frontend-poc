import { useMemo, useState } from 'react'
import { useAppData } from 'src/hooks'
import { InjectHTML, Picture, Typography } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core/styles'
import { Swiper, SwiperSlide } from 'swiper/react'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { TAB_CLICK, SITE_INTERACTION } from 'src/constants'
import SwiperTabs from 'src/libs/shop/components/SwiperTabs'

const SwiperContent = () => {
  const classes = useStyles()
  const { list, title } = useAppData('channelsTabs', true)
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
        <Typography tagType="h2" styleType="h3" className={classes.mainTitle}>
          {title?.value}
        </Typography>
      )}
      <SwiperTabs
        tabs={tabs}
        selectedTabIndex={selectedTab}
        setSelectedTab={onTabChange}
      />

      <Swiper
        onSwiper={setSwiper}
        className={classes.swiper}
        slidesPerView={1}
        centeredSlides={true}
        onSlideChange={onSlideChange}
        loop={true}
        simulateTouch={false}
      >
        {items?.map((slideContent: any, index: number) => {
          return (
            <SwiperSlide key={`swiper-slide-${index}`}>
              <div className={classes.sliderBlock}>
                <Picture
                  data-testid="cardImage"
                  desktop={{
                    image: slideContent?.image?.src,
                    webp: slideContent?.imagewebp?.src,
                  }}
                  altText={slideContent?.image?.altText}
                  className={classes.slideImage}
                />
                <div className={classes.contentBox}>
                  <InjectHTML
                    tagType="h5"
                    data-testid={`Title-${index}`}
                    styleType="h5"
                    value={slideContent?.heading?.value}
                    className={classes.heading}
                  />
                  <InjectHTML
                    tagType="p"
                    data-testid={`subTitle-${index}`}
                    styleType="p1"
                    value={slideContent?.description?.value}
                    className={classes.description}
                  />
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
    maxWidth: 1200,
    padding: '80px 60px',
    margin: 'auto',
    position: 'relative',
    '& .swiper-button-disabled': {
      opacity: 0.3,
    },
    [breakpoints.down('sm')]: {
      padding: '48px 32px',
    },
  },
  swiper: {
    height: '100%',
    display: 'block',
    margin: 'auto',
    position: 'relative',
    marginTop: 50,
    '& .swiper-wrapper': {
      display: 'flex',
    },
    '& .swiper-horizontal': {
      display: 'flex',
    },
  },
  mainTitle: {
    marginBottom: 50,
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
      fontSize: '1.125rem',
    },
    '& sup': { lineHeight: 0 },
  },

  contentBox: {
    marginLeft: '10%',
    maxWidth: 640,
    marginTop: 0,
    '& strong': {
      fontFamily: 'PP Object Sans Bold',
    },
    [breakpoints.down('sm')]: {
      marginTop: 30,
      marginLeft: 0,
    },
  },
  slideImage: {
    width: 345,
    [breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  sliderBlock: {
    display: 'flex',
    alignItems: 'center',
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
}))

export default SwiperContent
