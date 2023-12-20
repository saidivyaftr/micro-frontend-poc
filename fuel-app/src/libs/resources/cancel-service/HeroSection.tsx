import { Button, Hero, InjectHTML } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import { useAppData } from 'src/hooks'

const HeroSection = () => {
  const classes = useStyles()
  const data = useAppData('hero', true)
  const { title, description, buttonText, buttonUrl, image, mobileImage } = data

  return (
    <div data-testid="hero-section">
      <Hero
        backgroundColor="black"
        backgroundImage={image?.src}
        mobileBackgroundImage={mobileImage?.src}
        contentClassName={classes.heroContent}
        content={
          <div className={classes.contentContainer}>
            {title?.value && (
              <InjectHTML
                tagType="h1"
                styleType="h1"
                fontType="regularBandwidthFont"
                className={classes.title}
                value={title?.value}
                color="tertiary"
              />
            )}

            {description?.value && (
              <InjectHTML
                tagType="p"
                styleType="h4"
                className={classes.description}
                value={description?.value}
                color="secondary"
              />
            )}
            {buttonText?.value && (
              <Button
                text={buttonText?.value}
                type="link"
                hoverVariant="secondary"
                className={classes.callNow}
                variant="primary"
                href={buttonUrl?.value}
              />
            )}
          </div>
        }
      />
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  contentContainer: {
    [breakpoints.down('xs')]: { marginTop: '3rem' },
  },
  heroContent: {
    marginTop: '5.5rem',
    [breakpoints.down('sm')]: { marginTop: 'auto' },
    [breakpoints.down('xs')]: { padding: '0px 1rem' },
  },
  title: {
    order: 1,
    flexGrow: 0,
    flex: 'none',
  },

  description: {
    marginTop: '1.5rem',
    [breakpoints.down('xs')]: {
      marginTop: '0.5rem',
    },
  },
  callNow: {
    marginTop: '2rem',
    [breakpoints.down('xs')]: {
      width: '100%',
      marginTop: '1rem',
      padding: '.75rem',
    },
  },
}))

export default HeroSection
