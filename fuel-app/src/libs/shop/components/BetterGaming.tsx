import { useMemo, useRef, useState } from 'react'
import { useAppData, useWindowDimensions } from 'src/hooks'
import { Typography, InjectHTML, TooltipPopover } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core/styles'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper'
import colors from '@/shared-ui/colors'
import BetterGamingTabs from './BetterGamingTabs'
import { InfoIconWhite } from '@/shared-ui/react-icons'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { TAB_CLICK, SITE_INTERACTION, COMPONENT_WRAPPER } from 'src/constants'
import useIntersectionObserver from '@/shared-ui/hooks/useIntersectionObserver'
import Image from 'next/future/image'
import { IShopComponents } from './types'
SwiperCore.use([Navigation])
const BetterGaming = ({ styles }: IShopComponents) => {
  const classes = useStyles()
  const { list } = useAppData('SwiperContent', true)
  const items = list?.targetItems || []
  const [selectedTab, setSelectedTab] = useState(0)
  const [swiper, setSwiper] = useState<any>(null)
  const tabs = useMemo(() => {
    return items?.map(({ tabTitle }: any) => tabTitle?.value) || []
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
    <div
      className={classes.rootDarkTheme}
      data-testId="swiper-content"
      style={styles}
    >
      <div className={classes.root}>
        <BetterGamingTabs
          tabs={tabs}
          selectedTabIndex={selectedTab}
          setSelectedTab={onTabChange}
          data-testId="swiper-tabs"
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
              const component =
                slideContent?.componentType?.targetItem?.type?.value
              return (
                <SwiperSlide key={`swiper-slide-${index}`}>
                  {component == 'bar' ? (
                    <Bars selectedTab={selectedTab} {...slideContent}></Bars>
                  ) : null}
                  {component == 'pie' ? <Pie {...slideContent}></Pie> : null}
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export const Bars = (props: any) => {
  const {
    barList,
    title,
    description,
    tooltipText,
    imageBadge,
    barDescriptionList,
    chartDescription,
    chartDescriptionTooltipText,
    selectedTab,
  } = props

  const styles = barStyles()
  const { width } = useWindowDimensions()
  const bars = barList?.items
  const rootRef = useRef(null)

  const entry = useIntersectionObserver(rootRef, {
    freezeOnceVisible: true,
    threshold: 0.55,
  })
  const visible = !!entry?.isIntersecting
  const ratios = useMemo(() => {
    const vals = bars.map((x: any) => x.measure.value)
    const max = Math.max(...vals)
    return vals.map((x: any) => x / max)
  }, [bars])

  const widths = useMemo(() => {
    if (!visible) return bars.map(() => 0)
    const available = Math.min(width, COMPONENT_WRAPPER.maxWidth)
    const availableCalc = available > 1024 ? available - 600 : available - 140
    return ratios.map((x: number) => x * availableCalc)
  }, [ratios, width, visible])
  return (
    <div id="better-gaming" className={styles.root} ref={rootRef}>
      <div className={styles.topSection}>
        <InjectHTML
          styleType="h3"
          tagType="h2"
          color="tertiary"
          value={title?.value}
          className={(styles.sectionItem, styles.sectionTitle)}
        />
        <div className={styles.sectionItem}>
          <div>
            <InjectHTML
              styleType="p2"
              tagType="p"
              color="tertiary"
              value={description?.value}
              className={styles.sectionDescription}
            />

            <TooltipPopover
              tooltipIcon={<InfoIconWhite />}
              hideBorder
              tooltipContent={tooltipText?.value}
            />
          </div>
          {imageBadge?.src && (
            <div className={styles.badegSection}>
              <Image
                loader={() => imageBadge?.src}
                src={imageBadge?.src}
                alt={imageBadge?.alt}
              />
            </div>
          )}
        </div>
      </div>
      <div className={styles.barsContainer} data-testId="bar">
        {bars.map((bar: any, index: number) => {
          const { isFrontier, name, measureTitle } = bar
          return (
            <div key={`bar-${index}`} className={styles.barContainer}>
              <div className={styles.barTitle}>
                <Typography color="tertiary" styleType="h5">
                  {name.value}
                </Typography>
              </div>
              <div className={styles.barAndMeasure}>
                <div
                  style={{
                    width: `${widths[index]}px`,
                    transition:
                      selectedTab == 0
                        ? `width ${ratios[index] * 3}s ease-out`
                        : '',
                  }}
                  className={`${styles.bar} ${
                    isFrontier?.value ? styles.frontierBar : 'none'
                  }`}
                ></div>
                <div>
                  {' '}
                  <Typography tagType="p" color="tertiary" styleType="h5">
                    {measureTitle?.value}
                  </Typography>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div>
        <div className={styles.chartColorCodeContainer}>
          {barDescriptionList?.items.map(
            (barDesciption: any, index: number) => {
              const { isFrontier, name } = barDesciption
              return (
                <div
                  key={`bar-description-${index}`}
                  className={styles.chartColorCodeItem}
                >
                  <Typography styleType="p2" color="tertiary">
                    {name?.value}
                  </Typography>
                  <div
                    style={{
                      width: '1rem',
                      height: '1rem',
                      marginLeft: '0.5rem',
                      backgroundColor:
                        isFrontier?.value === true
                          ? colors?.main.greenishBlue
                          : colors.main.grayOpacity50,
                    }}
                  ></div>
                </div>
              )
            },
          )}
        </div>
        <div className={styles.chartDescriptionContainer}>
          <InjectHTML
            styleType="p2"
            tagType="p"
            color="tertiary"
            value={chartDescription?.value}
            className={styles.chartDescription}
          />
          {chartDescriptionTooltipText?.value && (
            <TooltipPopover
              tooltipIcon={<InfoIconWhite />}
              tooltipContent={chartDescriptionTooltipText?.value}
            />
          )}
        </div>
      </div>
    </div>
  )
}
const barStyles = makeStyles(({ breakpoints }) => ({
  root: {
    padding: '3rem 4rem 0 4rem',
    [breakpoints.down('sm')]: {
      padding: '1.5rem 0',
    },
  },
  topSection: {
    marginBottom: '4rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginBottom: '2rem',
    },
  },
  barAndMeasure: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',

    [breakpoints.down('sm')]: {
      gap: '0.5rem',
    },
  },
  badegSection: {
    marginLeft: '16px',
    '& img': {
      width: 80,
    },
    [breakpoints.down('xs')]: {
      marginLeft: '14px',
      marginTop: '3px',
    },
  },
  chartColorCodeContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: '1.5rem 0',
    gap: '2rem',
    [breakpoints.down('xs')]: {
      flexWrap: 'wrap',
      gap: '0.5rem',
    },
  },
  chartColorCodeItem: {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
  },
  sectionItem: {
    maxWidth: '60.6%',
    display: 'flex',
    alignItems: 'center',
    color: colors.main.white,
    [breakpoints.down('sm')]: {
      maxWidth: 'unset',
      alignItems: 'start',
    },
  },
  chartDescriptionContainer: { color: colors.main.white },
  sectionDescription: {
    maxWidth: 543,
    display: 'inline',
    marginBottom: '1rem',
    [breakpoints.down('xs')]: {
      fontSize: '1rem',
    },
  },
  sectionTitle: {
    [breakpoints.down('sm')]: {
      marginBottom: '1rem',
      '& br': { display: 'none' },
    },
  },
  chartDescription: {
    display: 'inline',
    fontSize: '.875rem',
    lineHeight: '1.125rem',
  },
  tooltip: { display: 'inline' },
  barsContainer: {
    borderBottom: `1px solid ${colors.main.white}`,
  },
  barContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '2rem',
    alignItems: 'center',
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  barTitle: {
    minWidth: '12rem',
    [breakpoints.down('sm')]: {
      minWidth: 'unset',
    },
  },
  bar: {
    height: '60px',
    width: 0,
    backgroundColor: colors.main.grayOpacity50,
    [breakpoints.down('sm')]: {
      height: '32px',
    },
  },
  frontierBar: {
    backgroundColor: colors.main.greenishBlue,
  },
}))

export const Pie = (props: any) => {
  const {
    title,
    description,
    tooltipText,
    pieComparisionText,
    pieList,
    pieTitle,
  } = props
  const styles = pieStyles()
  const rootRef = useRef(null)

  return (
    <div id="pie-chart" ref={rootRef}>
      <Typography
        styleType="h3"
        color="tertiary"
        tagType="h2"
        className={styles.pieTitle}
      >
        {title?.value}
      </Typography>
      <div className={styles.pieContainer} data-testId="pie">
        <div className={styles.pieSection}>
          {pieList?.items.map((pie: any, index: number) => {
            return (
              <>
                <div key={`pie-item-${index}`} className={styles.compareItem}>
                  <Typography
                    styleType="h6"
                    tagType="h3"
                    color="tertiary"
                    className={styles.pieName}
                  >
                    {pie?.name?.value}
                  </Typography>
                  <Image
                    loader={() => pie?.speedometer?.src}
                    src={pie?.speedometer?.src}
                    alt={pie?.speedometer?.alt}
                    className={styles.speedometer}
                  />
                  <Typography styleType="p1" color="tertiary">
                    {pieTitle?.value}
                  </Typography>
                </div>

                {index === 0 && (
                  <Typography styleType="h6" color="tertiary">
                    {pieComparisionText?.value}
                  </Typography>
                )}
              </>
            )
          })}
        </div>
        <div className={styles.pieDescriptionSection}>
          <InjectHTML
            styleType="p1"
            tagType="p"
            color="tertiary"
            value={description?.value}
            className={styles.pieDescription}
          />
          <TooltipPopover
            tooltipIcon={<InfoIconWhite />}
            tooltipContent={tooltipText?.value}
          />
        </div>
      </div>
    </div>
  )
}
const pieStyles = makeStyles(({ breakpoints }) => ({
  pieTitle: {
    textAlign: 'center',
    margin: '3rem auto 1rem',
    [breakpoints.down('sm')]: {
      margin: '1.5rem auto 2rem',
    },
  },
  pieContainer: {
    display: 'flex',
    maxWidth: '100%',
    width: '100%',
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  pieDescriptionSection: {
    flexBasis: '60%',
    color: colors.main.white,
    margin: 'auto',
    '& b': { color: colors.main.greenishBlue },
  },

  compareItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: '1rem',
    margin: '1rem 0',
  },
  speedometer: {
    [breakpoints.down('xs')]: {
      maxWidth: 'calc(50vw - 62px)',
    },
  },
  pieName: {
    minHeight: '3.75rem',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  },
  pieSection: {
    flexBasis: '60%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1.5rem',
  },
  pieDescription: {
    display: 'inline',
    marginBottom: '1rem',
  },
}))
const useStyles = makeStyles(({ breakpoints }) => ({
  rootDarkTheme: {
    backgroundColor: colors.main.dark,
    // marginTop: '-95px',
    paddingTop: '80px',
    [breakpoints.down('sm')]: {
      marginTop: '0px',
      paddingTop: '0px',
    },
    [breakpoints.down('xs')]: {
      paddingTop: '1.5rem',
      marginTop: '-1px',
    },
  },

  root: {
    ...COMPONENT_WRAPPER,
    paddingBottom: 48,
    [breakpoints.down('sm')]: {
      padding: '0px 16px',
      paddingBottom: 0,
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
}))

export default BetterGaming
