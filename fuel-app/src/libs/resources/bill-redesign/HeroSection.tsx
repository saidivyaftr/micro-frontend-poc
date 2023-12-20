import { makeStyles } from '@material-ui/core'
import { Typography, Hero, InjectHTML } from '@/shared-ui/components'
import useAppData from '@/shared-ui/hooks/useAppData'
import colors from '@/shared-ui/colors'

export const HeroSection = () => {
  const classes = useStyles()

  const { title, description, image, mobileImage } = useAppData('hero', true)

  const heroSectionContent = () => {
    return (
      <div>
        <Typography styleType="h1" color="tertiary" className={classes.title}>
          {title?.value}
        </Typography>
        <InjectHTML
          fontType="boldFont"
          addAnchorStyles
          styleType="h5"
          value={description?.value}
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
      bkgImgClassName="bkgContainer"
      removeStripes={false}
      className={classes.heroStripes}
      contentClassName={classes.contentClassName}
      stripesClass={classes.stripesClass}
      leftContentClassName={classes.leftContentClassName}
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
    '& .bkgContainer': {
      overflowX: 'unset',
      maxHeight: '25rem',
      minHeight: '25rem',
      backgroundPosition: 'center',
      [breakpoints.down('xs')]: {
        maxHeight: 'unset',
        paddingTop: 60,
        paddingBottom: 60,
        minHeight: 'auto',
      },
    },
  },
  leftContentClassName: {
    maxWidth: '790px',
  },
  title: {
    fontWeight: 400,
    paddingTop: '5px',
    [breakpoints.down('xs')]: {
      fontSize: '2.25rem',
      lineHeight: '2.75rem',
      paddingTop: 0,
    },
  },
  description: {
    paddingTop: '1rem',
    color: colors.main.white,
    [breakpoints.down('xs')]: {
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
    left: '-200%',
    '& div': {
      height: '13px',
      marginBottom: '7px',
      [breakpoints.down('xs')]: {
        height: '18px',
        marginBottom: '9px',
      },
    },
    [breakpoints.down('xs')]: {
      display: 'block',
      left: '-195.5%',
      top: '.25rem !important',
    },
  },
}))

export default HeroSection
