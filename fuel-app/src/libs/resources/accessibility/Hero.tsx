import { Hero } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import { useAppData } from 'src/hooks'
import {
  PP_OBJECT_SANS,
  PP_OBJECT_SANS_BOLD,
} from 'src/constants/fontFamilyNames'

const HeroSection = () => {
  const classes = useStyles()
  const { title, description, image, mobileImage } = useAppData('hero', true)

  return (
    <div>
      <Hero
        backgroundColor="black"
        backgroundImage={image?.src}
        eyebrowTagType="h1"
        eyebrowTextColor="tertiary"
        isDarkMode
        contentClassName={classes.contentWrapper}
        legalText=""
        mobileBackgroundImage={mobileImage?.src}
        removeStripes
        subHeaderColor="tertiary"
        title1={title?.value}
        title2={description?.value}
        title2Color="tertiary"
        titleClass={classes.heroTitle}
        leftContentClassName={classes.leftPanel}
      />
    </div>
  )
}
const useStyles = makeStyles(({ breakpoints }) => ({
  leftPanel: {
    width: '38.75rem',
  },
  contentWrapper: {
    top: '-4rem',
    [breakpoints.down('xs')]: {
      top: '0rem',
    },
  },
  heroTitle: {
    gap: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    textTransform: 'none',
    [breakpoints.down('xs')]: {
      padding: '3.75rem 1rem 1rem 1rem',
      gap: '1rem',
    },
    '& h1': {
      padding: '0rem 0rem 0rem 0rem',
      fontFamily: PP_OBJECT_SANS,
      fontSize: '4rem',
      lineHeight: '4.5rem',
      letterSpacing: '-0.03rem',
      [breakpoints.down('xs')]: {
        fontFamily: PP_OBJECT_SANS_BOLD,
        fontSize: '2.25rem',
        lineHeight: '2.75rem',
      },
    },

    '& h2': {
      fontFamily: PP_OBJECT_SANS,
      fontSize: '1.5rem',
      lineHeight: '2rem',
      textTransform: 'none',
      letterSpacing: '-0.03rem',
      [breakpoints.down('xs')]: {
        fontFamily: PP_OBJECT_SANS_BOLD,
        fontSize: '1.125rem',
        lineHeight: '1.625rem',
        letterSpacing: '-0.01rem',
      },
    },
  },
}))
export default HeroSection
