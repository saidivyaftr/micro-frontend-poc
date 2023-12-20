import { makeStyles } from '@material-ui/core'
import {
  Button,
  Typography,
  InjectHTML,
  TooltipPopover,
} from '@/shared-ui/components'
import InfoIconWhite from '@/shared-ui/react-icons/info-icon-white'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData, useWindowDimensions } from 'src/hooks'
import colors from '@/shared-ui/colors'
import HeroWrapper from '@/shared-ui/components/HeroWrapper'
import { PP_OBJECT_SANS_MEDIUM } from 'src/constants/fontFamilyNames'

const Hero = () => {
  const classes = useStyles()
  const {
    image,
    mobileimage,
    firstTitle,
    secondTitle,
    description,
    btnText,
    btnUrl,
    legalText,
    toolTipText,
    rootBackgroundColorLeft,
    rootBackgroundColorRight,
  } = useAppData('hero', true)

  const { width } = useWindowDimensions()
  return (
    <HeroWrapper
      className={classes.root}
      rootBackgroundColorLeft={rootBackgroundColorLeft?.Color?.field?.value}
      rootBackgroundColorRight={rootBackgroundColorRight?.Color?.field?.value}
    >
      <div className={classes.container}>
        <div className={classes.content}>
          {firstTitle?.value && (
            <Typography tagType="h1" styleType="h1" color="tertiary">
              {firstTitle?.value}
            </Typography>
          )}
          {secondTitle?.value && (
            <Typography
              tagType="h1"
              styleType="h1"
              color="secondary"
              className={classes.secondTitle}
            >
              {secondTitle?.value}
            </Typography>
          )}
          {description?.value && (
            <Typography
              tagType="p"
              className={classes.description}
              styleType="h5"
              color="tertiary"
            >
              {description?.value}
            </Typography>
          )}
          {toolTipText?.value && (
            <TooltipPopover
              tooltipClassName={classes.toolTip}
              tooltipContent={toolTipText?.value}
              dropShadow={false}
              tooltipDirection="bottom"
              tooltipIcon={<InfoIconWhite />}
            />
          )}
          {legalText?.value && (
            <InjectHTML
              className={classes.legalText}
              tagType="p"
              data-testid="caption"
              styleType="legal"
              color="tertiary"
              value={legalText?.value as string}
            />
          )}
          <div className={classes.cta}>
            <Button
              type="link"
              hoverVariant="secondary"
              text={btnText?.value}
              href={btnUrl?.url}
              className={classes.button}
            />
          </div>
        </div>
        <img
          className={classes.device}
          alt={image?.alt}
          src={width > 0 && width < 768 ? mobileimage?.src : image?.src}
        />
      </div>
    </HeroWrapper>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  content: {
    height: '600px',
    maxWidth: '700px',
    backgroundColor: 'transparent',
    textAlign: 'left',
    padding: '8.75rem 0',
    [breakpoints.down('xs')]: {
      padding: '2rem 0',
      height: '520px',
    },
  },
  description: {
    display: 'inline',
    [breakpoints.down('sm')]: {
      marginTop: '1rem',
    },
  },
  root: {
    backgroundColor: colors.main.dark,
    marginBottom: '48px',
    [breakpoints.down('sm')]: {
      marginBottom: '72px',
    },
  },
  container: {
    ...COMPONENT_WRAPPER,
    textAlign: 'center',
    position: 'relative',
  },
  device: {
    position: 'absolute',
    right: '-28%',
    top: 62,
    transform: 'scale(0.48)',
    [breakpoints.down('sm')]: {
      transform: 'scale(0.3) translateX(261px)',
      top: 'unset',
      bottom: -422,
    },
    [breakpoints.down(850)]: {
      right: '-40%',
    },
    [breakpoints.down('xs')]: {
      transform: 'scale(0.59) translateX(261px)',
      right: 0,
      bottom: -210,
    },
    [breakpoints.down(445)]: {
      transform: 'scale(0.40) translateX(563px)',
      bottom: -225,
    },
  },
  button: {
    display: 'block',
    maxWidth: 300,
    marginTop: '2rem',
    textTransform: 'uppercase',
    [breakpoints.down('xs')]: {
      maxWidth: '100%',
      marginTop: '1rem',
    },
  },
  cta: {
    display: 'block',
    textAlign: 'left',
    marginTop: '40px',
  },
  legalText: {
    color: colors.main.white,
    marginTop: '1rem',
    '& a': {
      textDecoration: 'underline',
      fontFamily: PP_OBJECT_SANS_MEDIUM,
      '&:hover': {
        color: colors.main.primaryRed,
      },
    },
  },
  toolTip: {
    display: 'inline',
    '& path': {
      fill: colors.main.white,
    },
  },
  secondTitle: {
    marginBottom: '2rem',
  },
}))

export default Hero
