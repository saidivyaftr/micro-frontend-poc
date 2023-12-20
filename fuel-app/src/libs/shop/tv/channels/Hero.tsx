import {
  HeroStripes,
  InjectHTML,
  TooltipPopover,
  Typography,
} from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'
import { MAX_WIDTH_WITH_PADDING } from 'src/constants'
import { InfoIconWhite } from '@/shared-ui/react-icons/index'

const HeroSection = () => {
  const {
    heading,
    description,
    image,
    mobileBackgroundImage,
    toolTipContent,
    legalContent,
  }: any = useAppData('heroData', true)
  const classes = useStyles()

  const heroSectionContent: JSX.Element = (
    <div className={classes.heroContainer}>
      <div className={classes.titleContainer}>
        <>
          {heading?.value && (
            <Typography
              tagType="h1"
              styleType="h1"
              fontType="boldFont"
              color="tertiary"
              className={classes.heading}
            >
              {heading?.value}
            </Typography>
          )}
          <div>
            {description?.value && (
              <InjectHTML
                tagType="p"
                styleType="h5"
                color="tertiary"
                fontType="boldFont"
                className={classes.subheadingStyles}
                value={description?.value}
              />
            )}
            {toolTipContent?.value && (
              <TooltipPopover
                tooltipIcon={<InfoIconWhite />}
                tooltipContent={toolTipContent?.value}
                tooltipClassName={classes.toolTipIconStyles}
                dropShadow={false}
              />
            )}
          </div>
          {legalContent?.value && (
            <Typography tagType="span" styleType="legal" color="tertiary">
              {legalContent?.value}
            </Typography>
          )}
        </>
      </div>
    </div>
  )
  return (
    <div data-testid="hero-section">
      <HeroStripes
        mobileBackgroundImage={mobileBackgroundImage?.src}
        backgroundImage={image?.src}
        content={heroSectionContent}
        className={classes.newRoot}
        stripeColor="secondary"
        stripesTitleWrapperClass={classes.bannerStyles}
        innerWrapperClassName={classes.contentInnerWrapper}
        stripesClass={classes.stripesStyles}
      />
    </div>
  )
}
const useStyles = makeStyles(({ breakpoints }) => ({
  heroContainer: {
    maxWidth: '570px',
    marginLeft: '23px',
    [breakpoints.down('xs')]: {
      marginLeft: 0,
    },
  },
  titleContainer: {
    display: 'flex',
    gap: '.25rem',
    flexWrap: 'wrap',
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  description: {
    marginTop: '1.625rem',
    textTransform: 'none',
  },
  newRoot: {
    minHeight: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
    [breakpoints.down('sm')]: {
      minHeight: '650',
    },
  },
  heading: {
    textTransform: 'none',
    marginBottom: '0.75rem',
  },
  bannerStyles: {
    [breakpoints.down('sm')]: {
      paddingLeft: '32px',
      paddingRight: '32px',
    },
  },
  contentInnerWrapper: {
    paddingTop: '190px',
    maxWidth: MAX_WIDTH_WITH_PADDING,
    marginLeft: 'auto',
    marginRight: 'auto',
    [breakpoints.down('sm')]: {
      paddingTop: '3rem',
      paddingRight: '5px',
    },
  },
  subheadingStyles: {
    margin: 0,
    display: 'initial',
    '& sup': {
      lineHeight: 1,
      fontSize: '1rem',
    },
  },
  toolTipIconStyles: {
    color: colors.main.white,
    display: 'initial',
  },
  stripesStyles: {
    left: '-198.3%',
    top: '0.5rem',
  },
}))

export default HeroSection
