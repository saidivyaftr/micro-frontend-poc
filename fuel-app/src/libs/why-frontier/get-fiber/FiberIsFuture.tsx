import {
  Button,
  ImagePerk,
  InjectHTML,
  TooltipPopover,
  Typography,
} from '@/shared-ui/components'
import InfoIconWhite from '@/shared-ui/react-icons/info-icon-white'
import { makeStyles } from '@material-ui/core'
import { useAppData } from 'src/hooks'

const FiberIsFuture = () => {
  const {
    title,
    subTitle,
    primaryButtonText,
    primaryButtonLink,
    image,
    mobileImage,
    legalText,
    toolTipText,
    tooltipDirection,
  } = useAppData('fiberIsFuture', true)
  const classes = useStyles()

  if (!title) {
    return null
  }

  return (
    <div id="fiber-2-gig">
      <ImagePerk
        backgroundColor="secondary"
        stripeColor="primary"
        contentAlign="right"
        contentClassName={classes.contentClassName}
        className={classes.root}
        contentBoxBorderRadius={true}
        linesBgColorsClass={classes.linesPostion}
        imageStyleClassName={classes.imageBox}
        mobileBackgroundImage={mobileImage}
        imageClassName={classes.image}
        content={
          <div className={classes.contentWrapper}>
            <Typography className={classes.heading} tagType="h2" styleType="h3">
              {title?.value}
            </Typography>
            <Typography
              className={classes.subHeading}
              tagType="p"
              styleType="h6"
              fontType="regularFont"
            >
              {subTitle?.value}
            </Typography>
            {toolTipText?.value && (
              <TooltipPopover
                tooltipIcon={<InfoIconWhite />}
                tooltipContent={toolTipText?.value}
                dropShadow={false}
                tooltipDirection={tooltipDirection?.value}
                tooltipClassName={classes.tooltipStyles}
              />
            )}
            <Button
              type="link"
              className={classes.link}
              text={primaryButtonText?.value}
              href={primaryButtonLink?.url}
            />
            {legalText?.value && (
              <InjectHTML
                className={classes.legalText}
                tagType="p"
                data-testid="caption"
                styleType="legal"
                value={legalText?.value}
              />
            )}
          </div>
        }
        tabletBackgroundImage={{
          src: image?.src,
          alt: image?.alt,
        }}
      />
    </div>
  )
}

export default FiberIsFuture

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    maxWidth: 1200,
    flexDirection: 'row-reverse',
  },
  imageBox: {
    alignSelf: 'flex-end',
  },
  heading: {
    marginTop: '0 !important',
    marginBottom: 24,
    [breakpoints.up('sm')]: {
      fontSize: '36px',
      lineHeight: '44px',
    },
  },
  subHeading: {
    display: 'inline',
    [breakpoints.down('sm')]: {
      fontSize: '18px',
      lineHeight: '26px',
    },
  },
  contentWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    borderRadius: '2rem',
    [breakpoints.up('md')]: {
      maxWidth: '23.125rem',
    },
    maxWidth: 'unset',
  },
  link: {
    fontSize: '1rem',
    marginTop: '2rem',
    [breakpoints.down('xs')]: {
      paddingRight: '0.5rem',
      paddingLeft: '0.5rem',
    },
  },
  contentClassName: {
    display: 'flex',
    minHeight: 'auto',
    width: 'auto',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '4rem 5rem',
    padding: '2rem',
    [breakpoints.up('sm')]: {
      padding: '3.25rem 3.75rem',
    },
    [breakpoints.down(340)]: {
      padding: '1rem',
    },
    [breakpoints.down('sm')]: {
      margin: '2rem 1.5rem',
    },
  },
  linesPostion: {
    '& div': {
      right: '0 !important',
    },
  },
  image: {
    [breakpoints.up('md')]: { transform: 'scale(1.2)', bottom: '2rem' },
    [breakpoints.only('md')]: { transform: 'scale(1.3)', bottom: '3rem' },
  },
  legalText: {
    '& sup': { lineHeight: '0' },
  },
  tooltipStyles: {
    display: 'inline',
  },
}))
