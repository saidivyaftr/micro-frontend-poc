import { makeStyles } from '@material-ui/core/styles'
import { Hero, InjectHTML } from '@/shared-ui/components'
import { MAX_WIDTH_WITH_PADDING } from 'src/constants'
import { useAppData } from 'src/hooks'

const HeroSection = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { firstTitle, secondTitle, image, mobileImage }: any = useAppData(
    'heroBanner',
    true,
  )
  const classes = useStyles()()

  const content = (
    <div className={classes.wrapper}>
      {firstTitle?.value && (
        <InjectHTML
          value={firstTitle?.value}
          color="secondary"
          tagType="h1"
          styleType="h1"
        />
      )}
      {secondTitle?.value && (
        <InjectHTML
          value={secondTitle?.value}
          color="tertiary"
          tagType="h1"
          styleType="h1"
        />
      )}
    </div>
  )
  return (
    <Hero
      backgroundColor="black"
      content={content}
      backgroundImage={image?.src}
      mobileBackgroundImage={mobileImage?.src}
      className={classes.heroContainer}
    />
  )
}

const useStyles = () =>
  makeStyles(({ breakpoints }) => ({
    heroContainer: {
      [breakpoints.up('lg')]: {
        backgroundSize: 'contain',
      },
      [breakpoints.down('lg')]: {
        backgroundPosition: 'bottom',
      },
      [breakpoints.down('xs')]: {
        backgroundPositionY: '40%',
      },
    },
    wrapper: {
      maxWidth: MAX_WIDTH_WITH_PADDING,
      paddingTop: '5.5rem',
      paddingBottom: '22.375rem',
      [breakpoints.down('sm')]: {
        margin: 'auto',
        paddingTop: '3rem',
        paddingBottom: '29.25rem',
      },
    },
    heading: {
      margin: '1rem 0',
      textTransform: 'none',
      [breakpoints.down('sm')]: {
        margin: '0.5rem 0',
      },
    },
  }))

export default HeroSection
