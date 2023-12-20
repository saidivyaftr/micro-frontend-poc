import { InjectHTML, Typography } from '@/shared-ui/components'
import Hero from 'src/blitz/components/Hero'
import { makeStyles } from '@material-ui/core'
import { useAppData } from 'src/hooks'

const HeroSection = () => {
  const { title, description, image, mobileImage }: any = useAppData(
    'hero',
    true,
  )
  const classes = useStyles()

  const heroSectionContent: JSX.Element = (
    <div className={classes.Styles}>
      <div className={classes.titleContainer}>
        <>
          {title?.value && (
            <Typography
              tagType="h1"
              styleType="h1"
              fontType="boldFont"
              color="tertiary"
              className={classes.heading}
            >
              {title?.value}
            </Typography>
          )}
          {description?.value && (
            <InjectHTML
              tagType="p"
              styleType="h5"
              color="tertiary"
              fontType="boldFont"
              className={classes.description}
              value={description?.value}
            />
          )}
        </>
      </div>
    </div>
  )
  return (
    <div data-testid="hero-section">
      <Hero
        backgroundColor="gravity"
        mobileBackgroundImage={mobileImage?.src}
        backgroundImage={image?.src}
        content={heroSectionContent}
        className={classes.newRoot}
        removeStripes={false}
        contentClassName={classes.heroContainerStyles}
        leftContentClassName={classes.heroLeftContentStyles}
        stripeStyles={{ marginBottom: 26, height: 52.6 }}
        stripesClass={classes.stripesClassStyles}
      />
    </div>
  )
}
const useStyles = makeStyles(({ breakpoints }) => ({
  Styles: {
    maxWidth: '530px',
    marginLeft: '5px',
    [breakpoints.down('md')]: {
      marginLeft: '30px',
    },
    [breakpoints.down('xs')]: {
      marginLeft: 0,
    },
  },
  stripesClassStyles: {
    left: '-200.3%',
    [breakpoints.down('md')]: {
      left: '-198.3%',
    },
  },
  heroContainerStyles: {
    margin: '60px auto 0px auto',
    [breakpoints.down('xs')]: {
      marginTop: 0,
      paddingLeft: 25,
    },
  },
  titleContainer: {
    display: 'flex',
    gap: '.25rem',
    flexWrap: 'wrap',
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
    [breakpoints.down('xs')]: {
      marginTop: '40px',
    },
  },
  heroLeftContentStyles: {
    justifyContent: 'flex-start',
    paddingTop: 15,
  },
  description: {
    [breakpoints.down('sm')]: {
      fontSize: '1.125rem',
      paddingRight: '12px',
    },
  },
  newRoot: {
    marginLeft: 'auto',
    marginRight: 'auto',
    minHeight: '600px',
    backgroundPosition: 'initial',
    [breakpoints.down('sm')]: {
      minHeight: '650px',
      backgroundPosition: '50%',
    },
  },
  heading: {
    textTransform: 'none',
    marginBottom: '0.75rem',
    [breakpoints.down('sm')]: {
      marginBottom: 0,
    },
  },
}))

export default HeroSection
