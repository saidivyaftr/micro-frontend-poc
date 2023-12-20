/* eslint-disable @typescript-eslint/indent */
/* eslint-disable prettier/prettier */
import { makeStyles } from '@material-ui/core'
import colors from '@/shared-ui/colors'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay, Pagination } from 'swiper'
import {
  Hero,
  InjectHTML,
  Button,
  TooltipPopover,
} from '@/shared-ui/components'
import InfoIconWhite from '@/shared-ui/react-icons/info-icon-white'
import { useAppData, useChatState } from 'src/hooks'
import {
  CTA_BUTTON,
  HOME_PAGE_CHAT_EVENT,
  SITE_INTERACTION,
} from 'src/constants'
SwiperCore.use([Pagination, Autoplay])

const BannerCarousal = () => {
  const classes = useStyles()
  const { setChatState, setChatParams } = useChatState()
  const { list } = useAppData('carousel', true)

  const renderContent = (
    title: string,
    subtitle: string,
    toolTipText: string,
    description: string,
    legalText: string,
    btnChatText: string,
    btnChatObjectID: string,
    btnChatToOrdereventID: string,
    btnLearnMoreText: string,
    btnLearnMoreUrl: string,
    btnLearnMoreobjectID: string,
    btnLearnMoreeventID: string,
  ) => {
    return (
      <div className={classes.container}>
        {title && (
          <InjectHTML
            className={classes.titleText}
            tagType="h2"
            styleType="h3"
            fontType="boldFont"
            color="tertiary"
            value={title}
            data-testid="title-value"
          />
        )}
        <div>
          {subtitle && (
            <InjectHTML
              tagType="h3"
              styleType="h5"
              fontType="boldFont"
              color="tertiary"
              className={classes.subtitle}
              value={subtitle}
              data-testid="subtitle-value"
            />
          )}
          {toolTipText && (
            <TooltipPopover
              tooltipClassName={classes.toolTip}
              tooltipContent={toolTipText}
              tooltipDirection="bottom"
              tooltipIcon={<InfoIconWhite />}
            />
          )}
        </div>
        {description && (
          <InjectHTML
            tagType="p"
            styleType="p1"
            color="tertiary"
            fontType="regularFont"
            value={description}
            data-testid="description-value"
          />
        )}
        {legalText && (
          <InjectHTML
            className={classes.legal}
            tagType="p"
            styleType="p1"
            color="tertiary"
            fontType="boldFont"
            value={legalText}
            data-testid="legal-value"
          />
        )}
        <div className={classes.buttonWrapper} data-testid="btn-container">
          <Button
            hoverVariant="secondary"
            text={btnChatText}
            type="link"
            onClick={() => {
              setChatParams({ launchOption: HOME_PAGE_CHAT_EVENT })
              setChatState(true)
            }}
            data-testid="chat-button"
            objectID={btnChatObjectID}
            interactionType={SITE_INTERACTION}
            eventObj={{ events: btnChatToOrdereventID, eVar14: CTA_BUTTON }}
          />
          <Button
            text={btnLearnMoreText}
            href={btnLearnMoreUrl}
            className={classes.btn}
            type="link"
            target="_blank"
            variant="white"
            objectID={btnLearnMoreobjectID}
            interactionType={SITE_INTERACTION}
            eventObj={{ events: btnLearnMoreeventID, eVar14: CTA_BUTTON }}
          />
        </div>
      </div>
    )
  }

  if (!list?.targetItems) {
    return null
  }
  return (
    <div id="swiper">
      <Swiper
        className={classes.swiper}
        pagination={{
          clickable: true,
        }}
        allowSlideNext={true}
        allowSlidePrev={true}
        slidesPerView={1}
        autoplay={{
          delay: 700000,
          disableOnInteraction: false,
        }}
      >
        {list?.targetItems?.map((row: any, key: number) => (
          <SwiperSlide
            className={classes.slide}
            id={`slide-${key}`}
            key={`carousal-${key}`}
          >
            <Hero
              backgroundColor='gravity'
              title1={row?.title?.value}
              title2={row?.title2?.value}
              removeStripes={key === 0 ? false : true}
              titleClass={
                row?.stripesHeight?.value
                  ? row?.halfBackground?.value && row?.primaryButtonText?.value
                    ? classes.targetTitle
                    : classes.title
                  : ''
              }
              title1Image={row?.titleDesktopImage?.src}
              title1MobileImage={row?.titleMobileImage?.src}
              className={
                row?.halfBackground?.value
                  ? classes.heroContainerTargetHalfBackground
                  : classes.heroContainer
              }
              bkgImgClassName='heroBkgImg'
              leftContentClassName={
                row?.halfBackground?.value ? classes.leftContent : 'undefined'
              }
              subHeader={row?.description?.value}
              subtitleClass={
                row?.halfBackground?.value && row?.primaryButtonText?.value
                  ? classes.targetDesc
                  : classes.description
              }
              buttonsContainerClass={classes.buttonsContainer}
              stripeColor={row?.stripeColor?.Color?.field?.value}
              stripeStyles={
                row?.stripesHeight?.value && {
                  height: Number(row?.stripesHeight?.value),
                  marginBottom: Number(row?.stripesMarginBottom?.value),
                }
              }
              wrapperClassName={classes.heroWrapper}
              content={
                row?.content?.targetItem?.title?.value
                  ? renderContent(
                      row?.content?.targetItem?.title?.value,
                      row?.content?.targetItem?.subTitle?.value,
                      row?.content?.targetItem?.toolTipText?.value,
                      row?.content?.targetItem?.description?.value,
                      row?.content?.targetItem?.legalText?.value,
                      row?.content?.targetItem?.btnChatToOrder?.text,
                      row?.content?.targetItem?.btnChatToOrderobjectID?.value,
                      row?.content?.targetItem?.btnChatToOrdereventID?.value,
                      row?.content?.targetItem?.btnLearnMore?.text,
                      row?.content?.targetItem?.btnLearnMore?.url,
                      row?.content?.targetItem?.btnLearnMoreobjectID?.value,
                      row?.content?.targetItem?.btnLearnMoreeventID?.value,
                    )
                  : undefined
              }
              contentClassName={classes.content}
              legalText={row?.legalText?.value}
              primaryButton={{
                type: 'link',
                href: row?.primaryButtonLink?.url,
                text: row?.primaryButtonText?.value,
                objectID: row?.objectID?.value,
                eventObj: { events: row?.eventID?.value, eVar14: CTA_BUTTON },
                className: row?.halfBackground?.value
                  ? classes.targetLearnBtn
                  : classes.learnMoreBtn,
              }}
              backgroundImage={row?.image?.src}
              mobileBackgroundImage={row?.mobileImage?.src}
              titleTagType={row?.titleTagType}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
    heroContainer: {
      margin: 'auto',
    },
  // heroContainer: {
  //   margin: 'auto',
  //   backgroundColor: 'unset',
  //   backgroundPosition: 'right',
  //   [breakpoints.up('md')]: {
  //     backgroundSize: `min( 100vw, 1440px)`,
  //     minHeight: 'min(41.6vw, 600px)',
  //   },
  //   [breakpoints.between(0, 1023.95)]: {
  //     height: '100%',
  //   },
  // },
  // heroContainerHalfBackground: {
  //   margin: 'auto',
  //   backgroundColor: 'unset',
  //   minHeight: 'min(42vw, 600px)',
  //   [breakpoints.between(0, 1023.95)]: {
  //     height: '100%',
  //     minHeight: 'unset',
  //     backgroundSize: '90%',
  //     backgroundPosition: 'center 90%',
  //   },
  //   [breakpoints.between(1024, 1139.95)]: {
  //     backgroundSize: 'calc(50% - 87px)',
  //     backgroundPosition: 'calc(100% - 17px) 70%',
  //     paddingBottom: 'unset',
  //   },
  //   [breakpoints.between(1140, 1549.95)]: {
  //     backgroundSize: 'calc(50% - 124px)',
  //     backgroundPosition: 'calc(100% - 30px) 50%',
  //   },
  //   [breakpoints.up(1550)]: {
  //     '--tv-size': 'calc(min(50vw, 960px) - 280px)',
  //     '--tv-pos-100': 'calc(min(100vw, 50vw + 960px) - var(--tv-size))',
  //     backgroundSize: 'var(--tv-size)',
  //     backgroundPosition: 'calc(var(--tv-pos-100) - 150px) 50%',
  //   },
  // },
  heroContainerTargetHalfBackground: {
    '& .heroBkgImg': {
      backgroundSize: 'auto 55%',
      backgroundPosition: 'center right',
      [breakpoints.between(1024, 1250)]: {
          border: '2px solid red',
          backgroundSize: 'auto 45%',
      },
      [breakpoints.between(0, 1023.95)]: {
          backgroundSize: '90%',
          backgroundPosition: 'bottom center',
      },
    },
  },
  // heroContainerTargetHalfBackground: {
  //   margin: 'auto',
  //   minHeight: 'min(42vw, 600px)',
  //   [breakpoints.between(0, 1023.95)]: {
  //     minHeight: 'unset',
  //     paddingBottom: '145px',
  //     backgroundSize: '90%',
  //     backgroundPosition: 'center 90%',
  //     maxWidth: 'unset',
  //   },
  //   [breakpoints.between(1024, 1139.95)]: {
  //     backgroundSize: 'calc(50% - 87px)',
  //     backgroundPosition: 'calc(100% - 17px) 70%',
  //     paddingBottom: 'unset',
  //   },
  //   [breakpoints.between(1140, 1549.95)]: {
  //     backgroundSize: 'calc(50% - 124px)',
  //     backgroundPosition: 'calc(100% - 30px) 50%',
  //   },
  //   [breakpoints.up(1550)]: {
  //     '--tv-size': 'calc(min(50vw, 960px) - 280px)',
  //     '--tv-pos-100': 'calc(min(100vw, 50vw + 960px) - var(--tv-size))',
  //     backgroundSize: 'var(--tv-size)',
  //     backgroundPosition: 'calc(var(--tv-pos-100) - 150px) 50%',
  //   },
  // },
  heroWrapper: {
    [breakpoints.between(0, 1023.95)]: {
      height: '100%',
    },
  },
  content: {
    margin: '0 auto',
    [breakpoints.up('md')]: {
      marginTop: '5.78125rem',
      paddingBottom: '64px',
    },
    [breakpoints.up('sm')]: {
      paddingBottom: '32px',
    },
  },
  slide: {
    height: 'auto',
  },
  leftContent: { justifyContent: 'flex-start' },
  title: {
    marginTop: '0.425rem',
  },
  targetTitle: {
    marginTop: '0.425rem',
    fontFamily: 'PP Object Sans',
    textTransform: 'none',
    [breakpoints.down('sm')]: {
      fontSize: '30px',
      lineHeight: '38px',
    },
  },
  description: {
    fontSize: '18px',
    maxWidth: 'unset',
    marginTop: '2rem',
    paddingBottom: 0,
    [breakpoints.down('md')]: {
      marginTop: '1rem',
      paddingBottom: '1rem',
    },
  },
  targetDesc: {
    fontSize: '16px',
    lineHeight: '24px',
    fontWeight: 400,
    maxWidth: 'unset',
    marginTop: '0',
    paddingBottom: 0,
    fontFamily: 'PP Object Sans',
  },
  learnMoreBtn: {
    display: 'block',
    maxWidth: 'fit-content',
    marginTop: '2rem',
    [breakpoints.down('md')]: {
      marginTop: '1rem',
      maxWidth: 'unset',
    },
  },
  targetLearnBtn: {
    display: 'block',
    maxWidth: 'fit-content',
    marginTop: '0',
    [breakpoints.down('md')]: {
      marginTop: '0',
      maxWidth: 'unset',
    },
  },
  buttonsContainer: { marginTop: 0 },
  swiper: {
    height: '100%',
    display: 'block',
    margin: 'auto',
    position: 'relative',
    '& .swiper-wrapper': {
      display: 'flex',
    },
    '& .swiper-horizontal': {
      display: 'flex',
    },
    '& .swiper-pagination': {
      position: 'absolute',
      bottom: 20,
      height: 20,
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
    },
    '& .swiper-pagination-horizontal': {
      bottom: 30,
    },
    '& .swiper-pagination-bullet': {
      width: 12,
      height: 12,
      zIndex: 9,
      borderRadius: 5,
      backgroundColor: colors.main.borderGrey,
      marginRight: 16,
    },
    '& .swiper-pagination-bullet-active': {
      backgroundColor: colors.main.activeSliderRed,
    },
  },
  container: {
    maxWidth: '700px',
    paddingTop: '13px',
    [breakpoints.between(1024, 1140)]: {
      maxWidth: '566px',
    },
    [breakpoints.down('sm')]: {
      maxWidth: 'unset',
      paddingBottom: '45vw',
      paddingTop: '30px',
    },
    [breakpoints.down('xs')]: {
      paddingBottom: '40vw',
    },
    '& svg': { top: 'unset' },
  },

  subtitle: {
    display: 'inline-flex',
    marginTop: '1.5rem',
    marginBottom: '1.5rem',
    [breakpoints.down('sm')]: {
      marginTop: '1rem',
      marginBottom: '1rem',
    },
    '& sup': {
      fontSize: '12px',
      lineHeight: 2,
    },
  },
  toolTip: {
    color: 'white',
    display: 'inline',
  },
  buttonWrapper: {
    display: 'flex',
    gap: '1.5rem',
    '& a': {
      minWidth: '220px',
    },
    [breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '1rem',
    },
  },
  legal: {
    marginTop: '1.5rem',
    marginBottom: '1.5rem',
    [breakpoints.down('sm')]: {
      marginTop: '1rem',
      marginBottom: '1rem',
    },
  },
  btn: {
    minWidth: 'auto !important',
  },

  titleText: {
    fontSize: '3.5rem',
    lineHeight: '4rem',
    [breakpoints.down('sm')]: {
      fontSize: '1.875rem',
      lineHeight: '2.735rem',
      '& br': {
        display: 'contents',
      },
    },
  },
}))

export default BannerCarousal
