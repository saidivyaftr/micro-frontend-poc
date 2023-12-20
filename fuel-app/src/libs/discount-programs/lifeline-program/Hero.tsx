import { makeStyles } from '@material-ui/core/styles'
import { Hero, InjectHTML, Typography } from '@/shared-ui/components'
import { useAppData } from 'src/hooks'
import { COMPONENT_WRAPPER, PADDING } from 'src/constants'

const HeroComponent: React.FC = () => {
  const {
    initialTitle,
    heading,
    description,
    legalDisclaimer,
    backgroundImage,
    mobileBackgroundImage,
  }: any = useAppData('Hero', true)
  const classes = useStyles()

  return (
    <Hero
      backgroundColor="black"
      removeStripes
      backgroundImage={backgroundImage?.src}
      mobileBackgroundImage={mobileBackgroundImage?.src}
      className={classes.hero}
      content={
        <div className={classes.mainContent}>
          {initialTitle?.value && (
            <Typography tagType="span" styleType="h6" color="tertiary">
              {initialTitle?.value}
            </Typography>
          )}
          {heading?.value && (
            <InjectHTML
              tagType="h1"
              styleType="h1"
              className={classes.heading}
              value={heading?.value}
              color="secondary"
            />
          )}
          {description?.value && (
            <InjectHTML
              tagType="h2"
              styleType="h5"
              value={description?.value}
              className={classes.description}
              color="tertiary"
            />
          )}
          {legalDisclaimer && (
            <InjectHTML
              styleType="p4"
              className={classes.legalDisclaimer}
              value={legalDisclaimer?.value}
            />
          )}
        </div>
      }
    />
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  hero: {
    [breakpoints.down('xs')]: {
      paddingTop: 64,
      minHeight: '40rem',
    },
  },
  priceAndFrequency: {
    '& sub': {
      fontSize: '18px',
      position: 'relative',
      bottom: '16px',
      right: '20px',
      textTransform: 'none',
      [breakpoints.down('md')]: {
        bottom: '8px',
        right: '8px',
      },
    },
  },
  wrapper: {
    ...COMPONENT_WRAPPER,
    margin: 'auto',
    padding: `5rem ${PADDING}px 14.25rem ${PADDING}px`,
    [breakpoints.down('md')]: {
      padding: `4rem 1rem 18.75rem 1rem`,
    },
    [breakpoints.down('xs')]: {
      padding: `4rem 1rem 18.75rem 1rem`,
    },
  },
  innerWrapper: {
    paddingBottom: 0,
  },
  description: {
    '& br': { [breakpoints.down('xs')]: { display: 'none' } },
  },
  heading: {
    margin: '1.5rem 0',
    textTransform: 'none',
    [breakpoints.down('sm')]: {
      margin: '0.5rem 0',
    },
  },
  content: {
    [breakpoints.down('md')]: {
      margin: '1.75rem 0',
    },
  },
  legalDisclaimer: {
    [breakpoints.down('sm')]: {
      fontSize: '.75rem',
      lineHeight: '1rem',
    },
    '& sup': { lineHeight: '0' },
  },
  mainContent: {
    position: 'relative',
    marginBottom: '2rem',
  },
}))

export default HeroComponent
