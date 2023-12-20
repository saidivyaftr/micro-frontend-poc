import { makeStyles } from '@material-ui/core'
import { Button, Hero, InjectHTML } from '@/shared-ui/components'
import { useAppData } from 'src/hooks'
import { PP_OBJECT_SANS } from 'src/constants/fontFamilyNames'

const HeroSection = () => {
  const data = useAppData('hero', true)

  const { image, mobileImage, buttonUrl, buttonText, description, title } = data

  const classes = useStyles()

  if (Object.keys(data).length === 0) return null

  return (
    <Hero
      backgroundColor="clarity"
      data-testid="hero"
      backgroundImage={image?.src}
      mobileBackgroundImage={mobileImage?.src}
      className={classes.heroContainer}
      bkgImgClassName="bkgImgContainer"
      content={
        <div className={classes.container}>
          {title?.value && (
            <InjectHTML
              tagType="h1"
              styleType="h3"
              className={classes.title}
              value={title?.value}
            />
          )}
          {description?.value && (
            <InjectHTML
              styleType="h6"
              tagType="p"
              value={description?.value}
              className={classes.description}
            />
          )}
          {buttonText?.value && buttonUrl?.value && (
            <Button
              type="link"
              text={buttonText?.value}
              href={buttonUrl?.value}
              className={classes.button}
            />
          )}
        </div>
      }
    />
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  container: {
    maxWidth: '448px',
    [breakpoints.down('xs')]: {
      paddingTop: '52px',
      paddingBottom: '69vw',
    },
  },
  bkgImgContainer: {
    minHeight: 'min(42vw, 800px)',
    [breakpoints.down('xs')]: {
      minHeight: 'unset',
      backgroundSize: 'contain !important',
    },
  },
  heroContainer: {
    margin: 'auto',
  },

  title: {
    fontSize: '4rem',
    lineHeight: '4.5rem',
    fontFamily: PP_OBJECT_SANS,
    marginBottom: '2rem',
    [breakpoints.down('sm')]: {
      fontSize: '2.25rem',
      lineHeight: '2.75rem',
    },
  },
  button: {
    marginTop: '2rem',
    display: 'block',
    width: 'fit-content',
    [breakpoints.down('sm')]: {
      width: '100%',
      marginTop: '1rem',
    },
  },
  description: {
    [breakpoints.down('md')]: {
      width: '70%',
      '& br': {
        display: 'none',
      },
    },
    [breakpoints.down('xs')]: {
      width: '100%',
    },
  },
}))

export default HeroSection
