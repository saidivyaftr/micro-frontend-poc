import { Hero } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import {
  PP_OBJECT_SANS,
  PP_OBJECT_SANS_BOLD,
} from 'src/constants/fontFamilyNames'

const HeroSection = ({ data }: any) => {
  const classes = useStyles()
  if (!data || Object.keys(data)?.length === 0) {
    return null
  }
  const {
    eyebrowText,
    firstTitle,
    subHeading,
    sectionBackgroundImage,
    sectionBackgroundMobileImage,
    heroImage,
    legalText,
  } = data

  return (
    <div data-testid="local-hero-section">
      <Hero
        backgroundColor="gravity"
        eyebrowText={eyebrowText?.value}
        eyebrowTextClassName={classes.eyebrowText}
        title1={firstTitle?.value}
        subHeader={subHeading?.value}
        backgroundImage={sectionBackgroundImage?.src}
        mobileBackgroundImage={sectionBackgroundMobileImage?.src}
        heroImage={heroImage?.src}
        heroImageWrapperClassName={classes.heroImageWrapperClassName}
        heroImageSize={{
          width: 80,
          height: 80,
        }}
        className={classes.newRoot}
        contentClassName={classes.contentClassName}
        titleClass={classes.titleClass}
        subtitleClass={classes.subtitleClass}
        removeStripes={true}
        titleTagType={'h1'}
        eyebrowTagType={'h1'}
        legalText={legalText?.value}
        legalStyleType={'p3'}
        isDarkMode={true}
      />
    </div>
  )
}
const useStyles = makeStyles((theme) => ({
  newRoot: {
    position: 'relative',
  },
  eyebrowText: {
    paddingBottom: '0.5rem',
    textTransform: 'uppercase',
    fontWeight: 700,
    margin: 0,
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.75rem',
      lineHeight: '0.875rem',
    },
  },
  heroImageWrapperClassName: {
    marginTop: '1rem',
    [theme.breakpoints.down('xs')]: {
      marginTop: 0,
      marginBottom: '0.5rem',
    },
    '& img': {
      [theme.breakpoints.down('sm')]: {
        width: '64px !important',
        height: '64px !important',
      },
    },
  },
  contentClassName: {
    padding: '0 2rem',
  },
  titleClass: {
    fontFamily: PP_OBJECT_SANS_BOLD,
    textTransform: 'none',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.875rem',
      lineHeight: '2.375rem',
    },
  },
  subtitleClass: {
    marginTop: '0.25rem',
    fontFamily: PP_OBJECT_SANS,
    [theme.breakpoints.up('md')]: {
      maxWidth: '100%',
    },
  },
}))

export default HeroSection
