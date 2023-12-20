import { useMemo, useState } from 'react'
import { Typography, InjectHTML, TooltipPopover } from 'src/blitz'
import { makeStyles } from '@material-ui/core/styles'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper'
import colors from 'src/styles/theme/colors'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { TAB_CLICK, SITE_INTERACTION, COMPONENT_WRAPPER } from 'src/constants'
import { useAppData, useWindowDimensions } from 'src/hooks'
import Image from 'next/future/image'
import SwiperTabs from './SwiperTabs'
import clx from 'classnames'

SwiperCore.use([Navigation])
const SwiperSection = () => {
  const classes = useStyles()
  const { title, subTitle, list, disclaimer } = useAppData(
    'swiperSection',
    true,
  )

  const { width } = useWindowDimensions()
  const items = list?.targetItems || []
  const [selectedTab, setSelectedTab] = useState(0)
  const [swiper, setSwiper] = useState<any>(null)
  const [isToolTipOpen, setToolTipOpen] = useState(false)
  const [tooltipActiveContent, setTooltipActiveContent] = useState('')
  const handleTargetClick = (iconNumber: number, index: number) => {
    const divElement: any = document.getElementById(
      `tool-tip-mobile-${iconNumber}-${index}`,
    )
    if (divElement) {
      const { top } = divElement.getBoundingClientRect()
      const offset = 300
      console.log('top', top, offset, iconNumber, index)
      window.scrollBy({
        top: top - offset,
        behavior: 'smooth',
      })
    }
  }

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

  const handleToolTip = (flag: boolean) => setToolTipOpen(flag)

  return (
    <div className={classes.root} id="more">
      {title?.value && (
        <InjectHTML
          tagType="h1"
          styleType="h4"
          className={classes.title}
          value={title?.value}
        />
      )}
      {subTitle?.value && (
        <Typography
          styleType="p1"
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
          {items?.map(
            (
              { slideToggle, mobileImage, image, title, toolTip }: any,
              index: number,
            ) => {
              return (
                <SwiperSlide key={`swiper-slide-${index}`}>
                  <div
                    className={
                      slideToggle.value
                        ? classes.contentBlockImage
                        : classes.contentBlock
                    }
                  >
                    <div className={classes.imageContainer}>
                      <Image
                        loader={() =>
                          width > 0 && width < 768
                            ? mobileImage?.src
                            : image?.src
                        }
                        src={
                          width > 0 && width < 768
                            ? mobileImage?.src
                            : image?.src
                        }
                        alt={title?.value}
                        className={
                          slideToggle.value
                            ? classes.imageClassShift
                            : classes.imageClass
                        }
                      />
                      {toolTip?.targetItems?.map(
                        ({ text, direction, icon }: any, index: number) => (
                          <div
                            className={clx(
                              classes.tooltipElement,
                              {
                                [classes.tooltipOpened]:
                                  isToolTipOpen &&
                                  tooltipActiveContent === text?.value,
                              },
                              {
                                [classes.page11tool]:
                                  `${title?.value + icon?.value}` === 'Page 11',
                                [classes.page12tool]:
                                  `${title?.value + icon?.value}` === 'Page 12',
                                [classes.page13tool]:
                                  `${title?.value + icon?.value}` === 'Page 13',
                                [classes.page14tool]:
                                  `${title?.value + icon?.value}` === 'Page 14',
                                [classes.page15tool]:
                                  `${title?.value + icon?.value}` === 'Page 15',
                                [classes.page16tool]:
                                  `${title?.value + icon?.value}` === 'Page 16',
                                [classes.page21tool]:
                                  `${title?.value + icon?.value}` === 'Page 21',
                                [classes.page31tool]:
                                  `${title?.value + icon?.value}` === 'Page 31',
                                [classes.page32tool]:
                                  `${title?.value + icon?.value}` === 'Page 32',
                                [classes.page41tool]:
                                  `${title?.value + icon?.value}` === 'Page 41',
                              },
                            )}
                            key={index}
                          >
                            <TooltipPopover
                              tooltipContent={text?.value}
                              tooltipDirection={direction?.value}
                              tooltipClassName={classes.tooltip}
                              OFFSET={-5}
                              tooltipOpen={handleToolTip}
                              tooltipActiveContent={(ele: string) =>
                                setTooltipActiveContent(ele)
                              }
                              tooltipContentClassName={
                                classes.tooltipContentClassName
                              }
                              tooltipIcon={
                                <InjectHTML
                                  tagType="h6"
                                  styleType="p2"
                                  value={icon?.value}
                                  className={classes.iconNumber}
                                />
                              }
                            />
                            <div
                              className={classes.tooltipMobile}
                              onClick={() =>
                                handleTargetClick(icon?.value, index)
                              }
                            >
                              <InjectHTML
                                tagType="h6"
                                styleType="p2"
                                value={icon?.value}
                                className={classes.iconNumber}
                              />
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                    {toolTip?.targetItems?.map(
                      ({ text, icon }: any, index: number) => (
                        <div
                          className={classes.tooltipMobile}
                          key={index}
                          id={`tool-tip-mobile-${icon?.value}-${index}`}
                        >
                          <InjectHTML
                            tagType="h6"
                            styleType="p2"
                            value={icon?.value}
                            className={classes.tooltipMobileIcon}
                          />
                          <div className={classes.tooltipMobileText}>
                            <InjectHTML styleType="p2" value={text?.value} />
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </SwiperSlide>
              )
            },
          )}
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
    marginBottom: 80,
    marginTop: 80,
    [breakpoints.down('sm')]: {
      marginBottom: 48,
      marginTop: 48,
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
    [breakpoints.down('sm')]: {
      fontSize: '1.5rem',
      lineHeight: '2rem',
    },
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
    padding: '0px 1px',
    [breakpoints.down('md')]: {
      flexDirection: 'column',
      paddingLeft: '0',
    },
  },
  imageClass: {
    width: '100%',
    display: 'flex',
    borderRadius: '1rem',
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
  imageContainer: {
    position: 'relative',
    maxWidth: '100%',
    marginBottom: '1rem',
  },
  tooltipElement: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '2rem',
    height: '2rem',
    fontSize: '1rem',
    borderRadius: '50%',
    background: colors.main.dark,
    color: colors.main.white,
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: `0 4px 4px rgba(0, 0, 0, 0.25)`,
    '&:hover': {
      background: colors.main.brightRed,
    },
    [breakpoints.down('sm')]: {
      width: '1rem',
      height: '1rem',
      fontSize: '14px',
    },
    [breakpoints.between('sm', 'md')]: {
      width: '1.5rem',
      height: '1.5rem',
      fontSize: '1rem',
    },
  },
  tooltip: {
    display: 'inline',
    [breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  tooltipMobile: {
    display: 'none',
    [breakpoints.down('sm')]: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      gap: '1rem',
      margin: '1rem 0',
    },
  },
  tooltipMobileIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '2rem',
    height: '2rem',
    borderRadius: '50%',
    background: colors.main.blackBackground,
    color: colors.main.white,
    fontSize: '1rem',
    lineHeight: '1.5rem',
    fontWeight: 700,
    marginTop: '5px',
    [breakpoints.down('md')]: {
      marginTop: 0,
    },
  },
  tooltipMobileText: {
    maxWidth: 'calc(100% - 2rem - 1rem)',
  },
  page11tool: {
    top: '6%',
    left: '38%',
    [breakpoints.down('sm')]: {
      top: '5%',
      left: '35%',
    },
  },
  page12tool: {
    top: '11%',
    left: '76%',
    [breakpoints.down('sm')]: {
      top: '10%',
      left: '75%',
    },
  },
  page13tool: {
    top: '20%',
    left: '3%',
    [breakpoints.down('sm')]: {
      top: '19%',
      left: '1%',
    },
  },
  page14tool: {
    top: '50%',
    left: '3%',
    [breakpoints.down('sm')]: {
      top: '49%',
      left: '1%',
    },
  },
  page15tool: {
    top: '50%',
    left: '64%',
    [breakpoints.down('sm')]: {
      top: '49%',
    },
  },
  page16tool: {
    top: '62%',
    left: '72%',
    [breakpoints.down('sm')]: {
      top: '59%',
      left: '71%',
    },
  },
  page21tool: {
    top: '14%',
    left: '3%',
    [breakpoints.down('sm')]: {
      left: '1%',
    },
  },
  page31tool: {
    top: '23%',
    left: '3%',
    [breakpoints.down('sm')]: {
      left: '1%',
    },
  },
  page32tool: {
    top: '20%',
    left: '71%',
    [breakpoints.down('sm')]: {
      top: '18%',
    },
  },
  page41tool: {
    top: '83%',
    left: '3%',
    [breakpoints.down('sm')]: {
      top: '77%',
      left: '1%',
    },
  },
  iconNumber: {
    color: colors.main.white,
    fontWeight: 700,
  },
  tooltipContentClassName: {
    '& div': {
      fontSize: '12px',
      lineHeight: '14px',
    },
  },
  tooltipOpened: {
    background: colors.main.brightRed,
  },
}))

export default SwiperSection
