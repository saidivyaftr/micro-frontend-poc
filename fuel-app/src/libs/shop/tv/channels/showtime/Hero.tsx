import colors from '@/shared-ui/colors'
import { Button, Hero, InjectHTML, Picture } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import { useRouter } from 'next/router'
import { CTA_BUTTON, SITE_INTERACTION } from 'src/constants'
import { useAppData } from 'src/hooks'

const HeroSection = () => {
  const data = useAppData('heroBanner', true)
  const { firstTitle, description, primaryButtonText, image }: any = data
  const classes = useStyles()
  const router = useRouter()

  const handleClick = () => {
    const targetElement = document.getElementById('how-to-order')
    if (targetElement) {
      targetElement.focus()
      window.scrollTo({
        top: targetElement?.offsetTop + 20,
        behavior: 'smooth',
      })
    } else {
      router.push(`${window?.location?.href}#how-to-order`)
    }
  }

  if (!firstTitle?.value) {
    return null
  }

  const heroSectionContent: JSX.Element = (
    <>
      <div className={classes.heroContainer}>
        <div className={classes.titleContainer}>
          <>
            {firstTitle && (
              <InjectHTML
                tagType="h1"
                styleType="h3"
                fontType="boldFont"
                color="tertiary"
                className={classes.heading}
                value={firstTitle?.value}
                data-testid="title-value"
              />
            )}

            <InjectHTML
              tagType="p"
              styleType="h6"
              color="tertiary"
              className={classes.subTitle}
              value={description?.value}
              data-testid="description-value"
            />
            <Button
              text={primaryButtonText?.value}
              type="button"
              onClick={handleClick}
              className={classes.button}
              hoverVariant="secondary"
              triggerEvent={true}
              eventObj={{ events: 'event14', eVar14: CTA_BUTTON }}
              interactionType={SITE_INTERACTION}
            />
          </>
        </div>
        <div className={classes.imgContainer}>
          <Picture
            altText={image?.alt}
            desktop={{
              image: `${image?.src}`,
            }}
            className={classes.w100}
          />
        </div>
      </div>
    </>
  )
  return (
    <div data-testid="hero-section">
      <Hero
        backgroundColor="gravity"
        mobileBackgroundImage={''}
        backgroundImage={''}
        content={heroSectionContent}
        className={classes.newRoot}
        stripeColor="secondary"
        stripeStyles={{
          height: 31.6,
          marginBottom: 16,
        }}
        removeStripes={false}
        leftContentClassName={classes.leftContent}
        contentClassName={classes.heroRoot}
        stripesClass={classes.stripesStyles}
        stripesTitleWrapperClass={classes.stripesTitleWrapperStyles}
      />
    </div>
  )
}
const useStyles = makeStyles(({ breakpoints, typography }) => ({
  heroContainer: {
    display: 'flex',
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  leftContent: {
    paddingTop: 0,
  },
  heroRoot: {
    paddingLeft: 0,
  },
  titleContainer: {
    paddingTop: '15px',
    [breakpoints.down('sm')]: {
      width: '100%',
      marginLeft: 0,
      paddingTop: 0,
    },
  },
  subTitle: {
    marginBottom: `${typography.pxToRem(32)}`,
    [breakpoints.down('sm')]: {
      '& br': { display: 'none' },
    },
    '& sup': { lineHeight: 0 },
  },
  description: {
    marginTop: '1.625rem',
    textTransform: 'none',
  },
  newRoot: {
    paddingBottom: '8rem',
    backgroundColor: colors.main.dark,
    paddingLeft: '1rem',
    minHeight: `${typography.pxToRem(600)}`,
    [breakpoints.down('sm')]: {
      minHeight: `${typography.pxToRem(650)}`,
      padding: '3rem 1rem 3rem 1rem',
    },
  },
  heading: {
    textTransform: 'none',
    marginBottom: '1rem',
    [breakpoints.down('sm')]: {
      '& br': { display: 'none' },
    },
    '& sup': {
      fontSize: 'large',
      verticalAlign: '10px',
      [breakpoints.down('sm')]: {
        fontSize: 'small',
        verticalAlign: '5px',
      },
    },
  },
  contentInnerWrapper: {
    paddingTop: `${typography.pxToRem(130)}`,
    [breakpoints.down('sm')]: {
      paddingTop: '3rem',
      paddingBottom: '3rem',
    },
  },
  button: {
    width: `${typography.pxToRem(270)}`,
    [breakpoints.down('sm')]: {
      width: '100%',
      fontSize: `${typography.pxToRem(18)}`,
    },
  },
  bannerImg: {
    width: '100%',
    marginTop: `${typography.pxToRem(-19)}`,
    [breakpoints.down('sm')]: {
      marginTop: `${typography.pxToRem(56)}`,
      marginRight: 0,
    },
  },
  w100: {
    width: '100%',
    height: '100%',
  },
  stripesTitleWrapperStyles: {
    [breakpoints.down('xs')]: {
      paddingLeft: `${typography.pxToRem(16)}`,
    },
  },
  stripesStyles: {
    paddingRight: '20px',
    top: '8px',
  },
  imgContainer: {
    flex: 1,
    position: 'absolute',
    right: '-5.3%',
    top: '16%',
    [breakpoints.down(1400)]: {
      width: '50%',
      right: '10px',
    },
    [breakpoints.down(1150)]: {
      width: '45%',
      right: '3px',
    },
    [breakpoints.down('sm')]: {
      position: 'relative',
      marginTop: `${typography.pxToRem(52)}`,
      top: 0,
      right: 0,
      width: '100%',
    },
  },
}))

export default HeroSection
