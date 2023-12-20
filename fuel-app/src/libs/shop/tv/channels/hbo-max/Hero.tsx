import colors from '@/shared-ui/colors'
import {
  Button,
  Hero,
  InjectHTML,
  Picture,
  Typography,
} from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import { useRouter } from 'next/router'
import { CTA_BUTTON, SITE_INTERACTION } from 'src/constants'
import { useAppData } from 'src/hooks'

const HeroSection = () => {
  const data = useAppData('hero', true)
  const { heading, description, image, plansButton }: any = data
  const classes = useStyles()
  const router = useRouter()

  const handleClick = () => {
    const targetElement = document.getElementById('how-to-order')
    if (targetElement) {
      targetElement.focus()
      window.scrollTo({
        top: targetElement?.offsetTop - 20,
        behavior: 'smooth',
      })
    } else {
      router.push(`${window?.location?.href}#how-to-order`)
    }
  }

  if (!heading?.value) {
    return null
  }

  const heroSectionContent: JSX.Element = (
    <>
      <div className={classes.heroContainer}>
        <div className={classes.titleContainer}>
          <>
            {heading?.value && (
              <Typography
                tagType="h1"
                styleType="h1"
                fontType="boldFont"
                color="tertiary"
                className={classes.heading}
              >
                {heading?.value}
              </Typography>
            )}
            {description?.value && (
              <InjectHTML
                tagType="p"
                styleType="h5"
                color="tertiary"
                fontType="boldFont"
                value={description?.value}
                className={classes.description}
              />
            )}
            {plansButton?.text && (
              <Button
                text={plansButton?.text}
                type="button"
                onClick={handleClick}
                className={classes.button}
                hoverVariant="secondary"
                triggerEvent={true}
                eventObj={{ events: 'event14', eVar14: CTA_BUTTON }}
                interactionType={SITE_INTERACTION}
              />
            )}
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
          height: 47,
          marginBottom: 24,
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
    [breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'center',
    },
    [breakpoints.down('xs')]: {
      padding: 0,
    },
  },
  titleContainer: {
    [breakpoints.down('sm')]: {
      width: '100%',
      marginLeft: 0,
      paddingTop: 0,
    },
  },
  description: {
    marginTop: '0.5rem',
    marginBottom: '2rem',
    textTransform: 'none',
    [breakpoints.up('md')]: {
      maxWidth: '85%',
    },
  },
  newRoot: {
    paddingBottom: '8rem',
    backgroundColor: colors.main.dark,
    paddingLeft: '1rem',
    minHeight: `${typography.pxToRem(600)}`,
    [breakpoints.down('sm')]: {
      minHeight: `${typography.pxToRem(650)}`,
      padding: '3rem 1rem',
    },
  },
  heading: {
    textTransform: 'none',
    marginBottom: '1rem',
    [breakpoints.up('md')]: {
      maxWidth: '70%',
    },
  },
  button: {
    width: `${typography.pxToRem(270)}`,
    [breakpoints.down('sm')]: {
      width: '100%',
      fontSize: `${typography.pxToRem(18)}`,
    },
  },
  w100: {
    width: '90%',
    height: '90%',
    [breakpoints.down('xs')]: {
      left: 'calc(-60vw + 50%)',
      width: '121vw',
      height: '100%',
      position: 'relative',
    },
  },
  stripesTitleWrapperStyles: {
    [breakpoints.down('xs')]: {
      paddingLeft: `${typography.pxToRem(16)}`,
    },
  },
  stripesStyles: {
    paddingRight: '20px',
    top: '11px !important',
  },
  imgContainer: {
    flex: 1,
    position: 'absolute',
    right: '-10%',
    top: '10%',
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
