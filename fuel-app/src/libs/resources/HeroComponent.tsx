import colors from '@/shared-ui/colors'
import { Button, Hero, InjectHTML } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import { CHECK_AVAILABLITY_COMP } from 'src/constants'
import { useChatState, useWindowDimensions } from 'src/hooks'

const HeroStripeBanner = ({ data }: any) => {
  const {
    subTitle,
    title1,
    title2,
    backgroundImg,
    description,
    mobileBackgroundImg,
    subTitleColor,
    titleColor,
    descriptionColor,
    showStripes,
    showSubTitle,
    chatButtonText,
    chatButtonColor,
    primaryButtonText,
    primaryButtonColor,
    backgroundColor,
    rootbackgroundColor,
    stripeColor,
    primaryButtonLink,
  }: any = data
  const classes = customStyles({
    backgroundColor: backgroundColor?.Color?.field?.value,
    rootbackgroundColor: rootbackgroundColor?.Color?.field?.value,
  })()
  const { width } = useWindowDimensions()
  const isMobileOrTablet = width <= 1023
  const { setChatState } = useChatState()
  const onButtonClick = () => {
    //@ts-ignore
    s_objectID = CHECK_AVAILABLITY_COMP.replace(
      '{NAME}',
      primaryButtonText?.value,
    )
  }
  const heroSectionContent: JSX.Element = (
    <div id="hero">
      {showSubTitle?.value && subTitle?.value && (
        <InjectHTML
          tagType="h6"
          styleType="h6"
          color={subTitleColor?.Color?.field?.value.toLowerCase() || 'default'}
          className={classes.subTitle}
          value={subTitle?.value}
          data-testid="subTitle"
        />
      )}
      {title1?.value && (
        <InjectHTML
          tagType="h1"
          styleType="h1"
          color={titleColor?.Color?.field?.value.toLowerCase() || 'default'}
          className={classes.title}
          value={title1?.value}
          data-testid="title1"
        />
      )}
      {title2?.value && (
        <InjectHTML
          tagType="h1"
          styleType="h1"
          color={titleColor?.Color?.field?.value.toLowerCase() || 'default'}
          className={classes.title2}
          value={title2?.value}
          data-testid="title2"
        />
      )}
      {description?.value && (
        <InjectHTML
          tagType="h2"
          styleType="h5"
          fontType="boldFont"
          color={
            descriptionColor?.Color?.field?.value?.toLowerCase() || 'default'
          }
          className={classes.description}
          value={description.value}
          data-testid="description"
        />
      )}

      {chatButtonText?.value && (
        <>
          <Button
            type="link"
            target="_blank"
            variant={
              chatButtonColor?.Color?.field?.value?.toLowerCase() || 'primary'
            }
            text={chatButtonText?.value}
            onClick={() => setChatState(true)}
            className={classes.btn}
            data-testid="chat-button"
          />
        </>
      )}
      {primaryButtonText?.value && (
        <Button
          type="link"
          text={primaryButtonText?.value}
          variant={
            primaryButtonColor?.Color?.field?.value?.toLowerCase() || 'primary'
          }
          href={primaryButtonLink?.url}
          onClick={onButtonClick}
          className={classes.btn}
          data-testid="primary-button"
        />
      )}
    </div>
  )

  if (!title1?.value) return null

  return (
    <div className={classes.root} data-testid="hero-banner-stripe-section">
      <Hero
        backgroundColor="gravity"
        mobileBackgroundImage={mobileBackgroundImg?.src}
        backgroundImage={backgroundImg?.src}
        content={heroSectionContent}
        removeStripes={!showStripes?.value}
        className={classes.heroContainer}
        stripeColor={
          stripeColor?.Color?.field?.value?.toLowerCase() || 'primary'
        }
        stripesTitleWrapperClass={classes.titleWrapper}
        stripeStyles={{
          marginBottom: 26,
        }}
        leftContentClassName={
          showStripes?.value && !isMobileOrTablet ? classes.leftContent : ''
        }
      />
    </div>
  )
}

const customStyles = ({ backgroundColor, rootbackgroundColor }: any) =>
  makeStyles(({ breakpoints, typography }) => ({
    root: {
      margin: 0,
      backgroundColor: rootbackgroundColor || colors.main.dark,
    },
    heroContainer: {
      backgroundColor: backgroundColor || colors.main.white,
      backgroundPosition: 'top !important',
      [breakpoints.down('sm')]: {
        backgroundPosition: 'left !important',
        minHeight: `${typography.pxToRem(544)} !important`,
      },
      [breakpoints.down('xs')]: {
        display: 'flex',
      },
    },
    leftContent: {
      paddingTop: `${typography.pxToRem(20)} !important`,
    },
    title: {
      '& sup': { lineHeight: '0' },
    },
    title2: {
      '& sup': { lineHeight: '0' },
    },
    description: {
      marginTop: `${typography.pxToRem(32)}`,
      [breakpoints.down('sm')]: {
        marginTop: `${typography.pxToRem(8)}`,
      },
      '& sup': { lineHeight: '0' },
    },
    btn: {
      marginTop: `${typography.pxToRem(32)}`,
      [breakpoints.down('sm')]: {
        marginTop: `${typography.pxToRem(16)}`,
      },
    },
    subTitle: {
      marginBottom: `${typography.pxToRem(16)}`,
      '& sup': { lineHeight: '0' },
    },
    titleWrapper: {
      padding: '0 1rem',
    },
  }))

export default HeroStripeBanner
