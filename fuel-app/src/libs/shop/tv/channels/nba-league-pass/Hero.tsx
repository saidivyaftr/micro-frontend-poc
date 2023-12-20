import {
  HeroStripes,
  Typography,
  Button,
  Picture,
} from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'

const HeroSection = () => {
  const {
    title,
    subTitle,
    secondaryTitle,
    secondarySubTitle,
    secondarySubTitleRight,
    DesktopHeroImage,
    buttonText,
    ButtonValue,
  }: any = useAppData('hero', true)
  const classes = useStyles()
  const HeroSectionSecondaryHeader = (
    <div>
      <div className={classes.heading2}>
        <Typography
          tagType="h2"
          styleType="h2"
          fontType="boldFont"
          color="tertiary"
        >
          {secondaryTitle?.value}
        </Typography>
      </div>
      <div className={classes.hr} />
      <div className={classes.SecondaryHeroContainer}>
        <div className={classes.secondaryTitleContainer}>
          <>
            <Typography
              tagType="h3"
              styleType="h4"
              fontType="boldFont"
              color="tertiary"
              className={classes.heading}
            >
              {secondarySubTitle?.value}
            </Typography>
          </>
        </div>
        <div>
          <Typography
            tagType="p"
            styleType="p1"
            color="tertiary"
            className={classes.secondaryParagraph}
          >
            {secondarySubTitleRight?.value}
          </Typography>
        </div>
      </div>
    </div>
  )

  const heroSectionContent: JSX.Element = (
    <>
      <div className={classes.heroContainer}>
        <div className={classes.titleContainer}>
          <>
            <Typography
              tagType="h1"
              styleType="h1"
              fontType="boldFont"
              color="tertiary"
              className={classes.heading}
            >
              {title?.value}
            </Typography>
            <Typography
              tagType="p"
              styleType="h5"
              color="tertiary"
              className={classes.subTitle}
            >
              {subTitle?.value}
            </Typography>
            <Button
              text={buttonText?.value}
              type="link"
              hoverVariant="secondary"
              href={ButtonValue?.src}
              className={classes.button}
            />
          </>
        </div>
        <div className={classes.imgContainer}>
          <Picture
            altText={DesktopHeroImage?.alt}
            desktop={{
              image: `${DesktopHeroImage?.src}`,
            }}
            className={classes.w100}
          />
        </div>
      </div>
      {HeroSectionSecondaryHeader}
    </>
  )

  return (
    <div data-testid="hero-section">
      <HeroStripes
        mobileBackgroundImage={''}
        backgroundImage={''}
        content={heroSectionContent}
        className={classes.newRoot}
        stripeColor="secondary"
        innerWrapperClassName={classes.contentInnerWrapper}
        stripesClass={classes.stripesStyles}
        stripesTitleWrapperClass={classes.stripesTitleWrapperStyles}
      />
    </div>
  )
}
const useStyles = makeStyles(({ breakpoints, typography }) => ({
  heroContainer: {
    display: 'flex',
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  imgContainer: {
    flex: 1,
    position: 'absolute',
    right: '-14.8%',
    top: '-8%',
    [breakpoints.down(1280)]: {
      width: '65%',
    },
    [breakpoints.down(1150)]: {
      width: '55%',
    },
    [breakpoints.down('sm')]: {
      position: 'relative',
      marginTop: `${typography.pxToRem(52)}`,
      top: 0,
      right: 0,
      width: '100%',
    },
  },
  secondaryTitleContainer: {
    maxWidth: `${typography.pxToRem(567)}`,
    [breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  titleContainer: {
    maxWidth: `${typography.pxToRem(567)}`,
    [breakpoints.down('sm')]: {
      width: '100%',
      marginLeft: 0,
    },
  },
  description: {
    marginTop: '1.625rem',
    textTransform: 'none',
  },
  newRoot: {
    backgroundColor: colors.main.dark,
    minHeight: `${typography.pxToRem(600)}`,
    [breakpoints.down('sm')]: {
      minHeight: '650',
    },
  },
  heading: {
    textTransform: 'none',
    marginBottom: '0.5rem',
  },
  button: {
    width: `${typography.pxToRem(186)}`,
    [breakpoints.down('sm')]: {
      width: '100%',
      paddingRight: '55%',
      paddingLeft: '55%',
    },
    [breakpoints.down('xs')]: {
      paddingRight: '32%',
      paddingLeft: '32%',
    },
  },
  subTitle: {
    marginBottom: `${typography.pxToRem(32)}`,
  },
  contentInnerWrapper: {
    paddingTop: `${typography.pxToRem(130)}`,
    [breakpoints.down('sm')]: {
      paddingTop: '3rem',
      paddingBottom: '3rem',
    },
  },
  hr: {
    border: `${typography.pxToRem(2)} solid ${colors.main.greenishBlue}`,
    backgroundColor: `${colors.main.greenishBlue}`,
    [breakpoints.down('sm')]: {
      margin: `${typography.pxToRem(32)} 0`,
    },
  },
  heading2: {
    marginTop: `${typography.pxToRem(235)}`,
    marginBottom: `${typography.pxToRem(47)}`,
    maxWidth: `${typography.pxToRem(567)}`,
    [breakpoints.down(1200)]: {
      marginTop: `${typography.pxToRem(60)}`,
    },
    [breakpoints.down('sm')]: {
      marginTop: `${typography.pxToRem(90)}`,
      marginBottom: `${typography.pxToRem(32)}`,
      maxWidth: `${typography.pxToRem(343)}`,
      paddingRight: `${typography.pxToRem(10)}`,
    },
  },
  SecondaryHeroContainer: {
    display: 'flex',
    marginTop: `${typography.pxToRem(67)}`,
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      marginTop: 0,
    },
  },
  secondaryParagraph: {
    paddingLeft: `${typography.pxToRem(112)}`,
    marginTop: 0,
    [breakpoints.down('sm')]: {
      paddingLeft: 0,
    },
  },
  w100: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  stripesTitleWrapperStyles: {
    [breakpoints.down('xs')]: {
      paddingLeft: `${typography.pxToRem(16)}`,
    },
  },
  stripesStyles: {
    top: '0.5rem',
    '& div': {
      height: `${typography.pxToRem(47)}`,
      marginBottom: `${typography.pxToRem(30)}`,
    },
  },
}))

export default HeroSection
