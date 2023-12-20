import { makeStyles } from '@material-ui/core'
import {
  Button,
  Hero,
  Typography,
  InjectHTML,
  TooltipPopover,
} from '@/shared-ui/components'
import { CTA_BUTTON, SITE_INTERACTION } from 'src/constants'
import InfoIconWhite from '@/shared-ui/react-icons/info-icon-white'
import colors from '@/shared-ui/colors'
import { ZOOMED_OUT_MAX_WIDTH } from 'src/constants'
import { useAppData } from 'src/hooks'

const FiveGig = () => {
  const data = useAppData('tileWithBackgroundImage', true)

  const {
    title,
    description,
    toolTipText,
    legalText,
    button,
    desktopBackgroundImage,
    mobileBackgroundImage,
  } = data
  const classes = useStyles()

  if (Object.keys(data).length === 0) {
    return null
  }

  return (
    <Hero
      backgroundColor="gravity"
      backgroundImage={desktopBackgroundImage?.src}
      mobileBackgroundImage={mobileBackgroundImage?.src}
      className={classes.heroContainer}
      leftContentClassName={classes.HeroLeftContent}
      contentClassName={classes.HeroContent}
      content={
        <div className={classes.container}>
          {title?.value && (
            <Typography tagType="h3" styleType="h3" fontType="boldFont">
              {title?.value}
            </Typography>
          )}
          <div className={classes.description}>
            <Typography
              tagType="p"
              styleType="p1"
              fontType="regularFont"
              className={classes.descriptionContent}
            >
              {description && description?.value}
            </Typography>
            {toolTipText?.value && (
              <TooltipPopover
                tooltipIcon={<InfoIconWhite />}
                tooltipDirection={'bottom'}
                tooltipContent={toolTipText?.value}
                tooltipClassName={classes.tooltip}
              />
            )}
          </div>
          {legalText?.value && (
            <InjectHTML
              className={classes.legalText}
              tagType="p"
              data-testid="caption"
              styleType="legal"
              value={legalText?.value}
            />
          )}
          {button?.text && (
            <Button
              type="link"
              href={button?.url}
              text={button?.text}
              className={classes.btn}
              variant="primary"
              triggerEvent={true}
              eventObj={{ events: 'event14', eVar14: CTA_BUTTON }}
              interactionType={SITE_INTERACTION}
            />
          )}
        </div>
      }
    />
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  heroContainer: {
    maxWidth: ZOOMED_OUT_MAX_WIDTH,
    margin: 'auto',
    backgroundSize: 'cover',
    minHeight: 'min(42vw, 663px)',
    [breakpoints.down('sm')]: {
      backgroundSize: '100%',
      backgroundPositionY: 'top',
    },
    [breakpoints.down('md')]: {
      minHeight: 'min(50vw, 663px)',
      backgroundSize: 'cover',
    },
  },
  container: {
    [breakpoints.down('md')]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  HeroContent: {
    margin: 'auto',
    padding: '1rem',
    [breakpoints.down('md')]: {
      padding: '2rem 1rem',
    },
  },
  HeroLeftContent: {
    background: colors.main.white,
    padding: '5.375rem 2.9375rem 6.125rem',
    maxWidth: '587px',
    borderRadius: '32px',
    height: 'auto',
    [breakpoints.down('md')]: {
      maxWidth: '450px',
      padding: '2rem 1rem',
    },
    [breakpoints.down('xs')]: {
      maxHeight: '19.625rem',
      minWidth: '100%',
      marginBottom: '21px',
      marginTop: '500px',
    },
    [breakpoints.down(360)]: {
      maxHeight: 'unset',
    },
  },
  description: {
    margin: '2rem 0rem',
    [breakpoints.down('xs')]: {
      marginTop: '1rem',
    },
  },
  descriptionContent: {
    display: 'inline',
  },
  legalText: {
    marginBottom: '2rem',
    [breakpoints.down('md')]: {
      marginBottom: '1rem',
    },
  },
  btn: {
    display: 'flex',
    width: '15.625rem',
    justifyContent: 'center',
    [breakpoints.down('md')]: {
      width: '100%',
    },
  },
  tooltip: {
    display: 'inline',
  },
}))

export default FiveGig
