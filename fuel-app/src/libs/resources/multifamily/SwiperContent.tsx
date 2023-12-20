import { useMemo, useState, useRef } from 'react'
import { useAppData } from 'src/hooks'
import { InjectHTML, Typography } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core/styles'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper'
import colors from '@/shared-ui/colors'
import SwiperTabs from './SwiperTabs'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { TAB_CLICK, SITE_INTERACTION } from 'src/constants'
import ImageCard from './imageCard'

SwiperCore.use([Navigation])
const SwiperContent = () => {
  const classes = useStyles()
  const { title, subTitle, list } = useAppData('tabsWithImageCard', true)
  const items = list?.targetItems || []
  const [selectedTab, setSelectedTab] = useState(0)
  const [swiper, setSwiper] = useState<any>(null)
  const containerRef = useRef(null)
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

  if (!tabs || tabs?.length === 0) {
    return null
  }

  return (
    <div id="swiper-content" className={classes.root}>
      <Typography tagType="h2" styleType="h3" className={classes.title}>
        {title?.value}
      </Typography>
      {subTitle?.value && (
        <InjectHTML
          tagType="p"
          styleType="p1"
          className={classes.desc}
          value={subTitle.value}
        />
      )}
      <SwiperTabs
        tabs={tabs}
        selectedTabIndex={selectedTab}
        setSelectedTab={onTabChange}
      />
      <div ref={containerRef}>
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
                <div>
                  <ImageCard {...slideContent} />
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    maxWidth: 1232,
    padding: '0px 16px',
    margin: 'auto',
    marginBottom: '4rem',
    position: 'relative',
    [breakpoints.down('sm')]: {
      padding: 10,
    },
    [breakpoints.down('xs')]: {
      marginBottom: '1rem',
    },
  },
  swiper: {
    height: '100%',
    display: 'block',
    margin: 'auto',
    position: 'relative',
    '& swiper-wrapper': {
      display: 'flex',
    },
    '& .swiper-slide': {
      alignSelf: 'stretch',
      alignContent: 'stretch',
    },
  },
  subTitle: {
    marginBottom: 8,
  },
  subTitleText: {
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
  title: {
    marginTop: 80,
    marginBottom: 16,
    textAlign: 'center',
    [breakpoints.down('sm')]: {
      marginTop: 40,
    },
  },
  desc: {
    marginBottom: 16,
    textAlign: 'center',
    [breakpoints.down('sm')]: {
      '& br': {
        display: 'none',
      },
    },
  },
}))

export default SwiperContent
