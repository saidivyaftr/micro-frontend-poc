import { useMemo, useState, useRef } from 'react'
import { Typography, InjectHTML, Button } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper'
import colors from '@/shared-ui/colors'
import SwiperTabs from './SwiperTabs'
import { COMPONENT_WRAPPER, TAB_CLICK, SITE_INTERACTION } from 'src/constants'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
SwiperCore.use([Navigation])
import { useAppData } from 'src/hooks'

const SwiperContent = () => {
  const classes = useStyles()
  const { title, subTitle, list, button } = useAppData(
    'carouselWithPerks',
    true,
  )
  const items = list?.targetItems || []
  const [selectedTab, setSelectedTab] = useState(0)
  const [swiper, setSwiper] = useState<any>(null)
  const containerRef = useRef(null)
  const [analyticsDone, setAnalyticsDone] = useState<Array<number>>([])

  const tabs = useMemo(() => {
    return items?.map(({ title }: any) => title?.value) || []
  }, [items])

  const onTabChange = (newTabIndex: number) => {
    if (analyticsDone.find((e) => e === newTabIndex) === undefined) {
      setAnalyticsDone([...analyticsDone, newTabIndex])
      DTMClient.triggerEvent(
        {
          events: 'event14',
          eVar14: TAB_CLICK.replace('{NAME}', tabs[newTabIndex].toLowerCase()),
        },
        'tl_o',
        SITE_INTERACTION,
      )
    }
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
    <div className={classes.root} id="more">
      <div className={classes.innerWrapper}>
        {title?.value && (
          <Typography tagType="h2" styleType="h3" className={classes.title}>
            {title?.value}
          </Typography>
        )}
        {subTitle?.value && (
          <Typography styleType="p1" className={classes.desc}>
            {subTitle?.value}
          </Typography>
        )}
        <div className={classes.tabsContainer}>
          <SwiperTabs
            tabs={tabs}
            selectedTabIndex={selectedTab}
            setSelectedTab={onTabChange}
          />
        </div>
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
                  <Grid
                    container
                    // style={{ minHeight: containerHeight }}
                    className={classes.gridContainer}
                  >
                    <Grid
                      item
                      md={7}
                      sm={12}
                      className={classes.leftContainer}
                      // style={{ minHeight: containerHeight }}
                    >
                      <img
                        src={slideContent?.image?.src}
                        alt={slideContent?.title?.value}
                        className={classes.slideImage}
                        loading="lazy"
                      />
                    </Grid>
                    <Grid item md={5} sm={12}>
                      <div className={classes.slideTextWrapper}>
                        <div className={classes.contentWrapper}>
                          <InjectHTML
                            className={classes.subTitle}
                            tagType="h3"
                            styleType="h4"
                            color="tertiary"
                            value={slideContent?.heading?.value}
                          />
                          <InjectHTML
                            tagType="p"
                            styleType="p1"
                            color="tertiary"
                            className={classes.subTitleText}
                            value={slideContent?.subTitle?.value}
                          />
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
        <div className={classes.buttonWrapper}>
          {button?.text && (
            <Button
              type="link"
              className={classes.btn}
              text={button?.text}
              href={button?.url}
              variant="secondary"
            />
          )}
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    margin: 'auto',
    border: '1px',
    backgroundColor: colors.main.lightBorderGrey,
    textAlign: 'center',
  },
  innerWrapper: {
    ...COMPONENT_WRAPPER,
    padding: '80px 16px',
    position: 'relative',
    [breakpoints.down('sm')]: {
      padding: '64px 16px',
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
      borderRadius: '32px',
      overflow: 'hidden',
    },
    borderRadius: '32px',
  },
  subTitle: {
    marginBottom: 16,
    textAlign: 'left',
    fontSize: '24px',
    [breakpoints.down('sm')]: {
      fontSize: '18px',
    },
  },
  subTitleText: {
    margin: 0,
    lineHeight: '26px',
    textAlign: 'left',
    fontSize: '18px',
    [breakpoints.down('sm')]: {
      fontSize: '16px',
    },
  },
  slideTextWrapper: {
    background: colors.main.dark,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '32px',
    textAlign: 'left',
  },
  slideImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    [breakpoints.down('sm')]: {
      maxHeight: 450,
    },
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  desc: {
    marginBottom: 64,
    textAlign: 'center',
  },
  tabsContainer: {
    marginBottom: 16,
  },
  contentWrapper: {
    margin: 64,
    [breakpoints.down('sm')]: {
      margin: 16,
    },
  },
  leftContainer: {
    width: '100%',
  },
  gridContainer: {
    background: colors.main.dark,
    borderRadius: '32px',
    [breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  buttonWrapper: {
    marginTop: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: 'max-content',
    [breakpoints.down('xs')]: {
      width: '100%',
    },
  },
}))

export default SwiperContent
