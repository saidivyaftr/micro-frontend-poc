import { makeStyles } from '@material-ui/core'
import { Hero } from '@/shared-ui/components'
import { useAppData } from 'src/hooks'
import { PP_OBJECT_SANS_BOLD } from 'src/constants/fontFamilyNames'

const HeroSection = () => {
  const classes = useStyles()
  const data = useAppData('hero', true)

  const { title, description, image, mobileImage } = data

  if (!title?.value) {
    return null
  }

  return (
    <div data-testid="hero">
      <Hero
        backgroundColor="black"
        title1={title?.value}
        titleClass={classes.title}
        title1Color="tertiary"
        subHeader={description?.value}
        subHeaderColor="tertiary"
        backgroundImage={image?.src}
        mobileBackgroundImage={mobileImage?.src}
        leftContentClassName={classes.content}
        contentClassName={classes.rootContent}
        subtitleClass={classes.subHeading}
      />
    </div>
  )
}
const useStyles = makeStyles(({ breakpoints }) => ({
  subHeading: {
    maxWidth: 'unset',
    marginTop: '1rem',
    [breakpoints.down('sm')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
  },
  content: {
    justifyContent: 'unset',
  },
  rootContent: {
    margin: ' 3.75rem auto',
    [breakpoints.down('sm')]: {
      margin: ' 1.125rem auto',
      padding: '0 2rem 0 2rem',
    },
  },
  title: {
    fontFamily: PP_OBJECT_SANS_BOLD,
    textTransform: 'unset',
    [breakpoints.down('sm')]: {
      fontSize: '1.875rem',
      lineHeight: '2.375rem',
    },
  },
}))

export default HeroSection
