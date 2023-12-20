import { makeStyles } from '@material-ui/core'
import { Typography, Hero, InjectHTML } from '@/shared-ui/components'

export const HeroSection = ({ data }: any) => {
  const classes = useStyles()
  if (Object.keys(data)?.length === 0) {
    return null
  }

  const { firstTitle, secondTitle, description, image, mobileImage } = data

  const heroSectionContent = () => {
    return (
      <div>
        {firstTitle?.value && (
          <Typography
            tagType="h1"
            styleType="h2"
            color="tertiary"
            className={classes.title}
          >
            {firstTitle?.value}
          </Typography>
        )}
        {secondTitle?.value && (
          <Typography
            tagType="h1"
            styleType="h2"
            color="tertiary"
            className={classes.title}
          >
            {secondTitle?.value}
          </Typography>
        )}
        <InjectHTML
          addAnchorStyles
          tagType="h5"
          styleType="h5"
          value={description?.value}
          style={{ color: '#ffffff' }}
          className={classes.description}
        />
      </div>
    )
  }

  return (
    <Hero
      backgroundColor="gravity"
      backgroundImage={image?.src}
      mobileBackgroundImage={mobileImage?.src}
      removeStripes={false}
      className={classes.heroStripes}
      contentClassName={classes.contentClassName}
      stripesClass={classes.stripesClass}
      stripeStyles={{
        height: 12,
        marginBottom: 8,
      }}
      content={heroSectionContent()}
    />
  )
}
const useStyles = makeStyles(({ breakpoints }: { breakpoints: any }) => ({
  headingTitle: {
    lineHeight: 1.1,
    marginBottom: '.625rem',
    maxWidth: '700px',
    [breakpoints.down('xs')]: {
      fontSize: 14,
    },
  },
  heroStripes: {
    overflowX: 'unset',
    maxHeight: '25rem',
    minHeight: '25rem',
    backgroundPosition: 'center',
    [breakpoints.down('xs')]: {
      maxHeight: 'unset',
      minHeight: '100vw',
      paddingTop: 60,
    },
  },
  title: {
    fontSize: '4rem',
    lineHeight: '4.5rem',
    [breakpoints.down('xs')]: {
      fontSize: '2.25rem',
      lineHeight: '2.275rem',
    },
  },
  description: {
    paddingTop: '2rem',
    paddingBottom: '50px',
    [breakpoints.down('xs')]: {
      paddingTop: '1.5rem',
      '& br': {
        display: 'contents',
      },
    },
  },
  contentClassName: {
    [breakpoints.down('xs')]: {
      paddingLeft: '2rem',
    },
  },
  stripesClass: {
    top: '0.55rem !important',
    [breakpoints.down('xs')]: {
      display: 'block',
      left: '-195.5%',
      top: '.25rem !important',
      '& > div': {
        height: '7px !important',
        marginBottom: '3px !important',
      },
    },
  },
}))

export default HeroSection
