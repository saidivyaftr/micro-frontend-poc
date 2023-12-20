import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  InjectHTML,
  TwoColumnLayout,
  Typography,
} from '@/shared-ui/components'
import { RightArrowIcon } from '@/shared-ui/react-icons'
import { useAppData } from 'src/hooks'
import { CTA_BUTTON, SITE_INTERACTION } from 'src/constants'
import colors from '@/shared-ui/colors'

const AffordableConnectivityProgram: React.FC = () => {
  const {
    mainHeader,
    mainDescription,
    initialTitle,
    priceDescription,
    heading,
    image,
    linkUrl,
  }: any = useAppData('AffordableConnectivityProgram', true)
  const classes = useStyles()

  const NonImageContent = () => (
    <div id="two-gig" className={classes.NonImageContainer}>
      <Typography
        tagType="h6"
        color="tertiary"
        className={classes.initialTitle}
      >
        {initialTitle?.value}
      </Typography>
      <InjectHTML
        tagType="h2"
        className={classes.title}
        styleType="h3"
        color="tertiary"
        value={heading?.value}
      />
      <Typography
        tagType="p"
        className={classes.description}
        styleType="p1"
        color="tertiary"
      >
        {priceDescription?.value}
      </Typography>
      <Button
        type="link"
        variant="lite"
        href={linkUrl?.url}
        className={classes.rightArrowButton}
        text={<RightArrowIcon />}
        triggerEvent={true}
        eventObj={{ events: 'event14', eVar14: CTA_BUTTON }}
        interactionType={SITE_INTERACTION}
        title={heading?.value}
      />
    </div>
  )

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.headerContainer}>
          {mainHeader?.value && (
            <InjectHTML
              tagType="h2"
              styleType="h2"
              className={classes.heading}
              value={mainHeader?.value}
              fontType="boldFont"
            />
          )}
          <Typography
            tagType="p"
            styleType="h5"
            className={classes.description}
          >
            {mainDescription?.value}
          </Typography>
        </div>
      </div>
      <TwoColumnLayout
        image={image?.src}
        title={heading?.value}
        content={<NonImageContent />}
        reverse={true}
        gridClassName={classes.grid}
        roundedBorders={true}
        imageWrapperClassName={classes.image}
        gridItemImageClassName={classes.gridItemImageClassName}
      />
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints, typography }) => ({
  container: {
    backgroundColor: colors.main.white,
    borderRadius: `${typography.pxToRem(32)}`,
    padding: `3rem 0 1.5rem 0`,
    [breakpoints.down('sm')]: {
      borderRadius: 0,
      backgroundColor: colors.main.white,
    },
  },
  headerContainer: {
    textAlign: 'center',
    padding: `0 ${typography.pxToRem(80)}`,
    [breakpoints.down('sm')]: {
      '& br': { display: 'none' },
      padding: `0 ${typography.pxToRem(16)}`,
    },
  },
  description: {
    margin: `${typography.pxToRem(16)} 0`,
    '& sub': {
      fontSize: `${typography.pxToRem(18)}`,
      position: 'relative',
      bottom: `${typography.pxToRem(16)}`,
      right: `${typography.pxToRem(20)}`,
      textTransform: 'none',
      [breakpoints.down('md')]: {
        bottom: `${typography.pxToRem(8)}`,
        right: `${typography.pxToRem(8)}`,
      },
    },
    [breakpoints.down('xs')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
  },
  heading: {
    margin: '1rem 0',
    textTransform: 'none',
    [breakpoints.down('sm')]: {
      margin: 0,
    },
  },
  content: {
    marginLeft: 32,
    paddingRight: 80,
    [breakpoints.down('md')]: {
      marginLeft: 32,
      paddingRight: 32,
      marginBottom: 32,
    },
    [breakpoints.down('xs')]: {
      maxWidth: '100%',
      marginLeft: 0,
      padding: '0 16px',
    },
  },
  rightArrowIcon: {
    '& path': {
      fill: colors.main.white,
    },
  },
  root: {
    maxWidth: '1200px',
    margin: '2rem auto',
    [breakpoints.down('sm')]: {
      padding: '1rem',
    },
  },
  image: {
    background: colors.main.midnightExpress,
    '& img': { maxHeight: 'unset' },
  },
  NonImageContainer: {
    marginRight: 'auto',
    padding: '5.625rem 4.5rem 5.625rem 2rem',
    display: 'flex',
    background: colors.main.midnightExpress,
    flexDirection: 'column',
    justifyContent: 'center',
    [breakpoints.down('sm')]: {
      padding: 16,
    },
  },
  title: {
    [breakpoints.down('xs')]: {
      fontSize: '1.5rem',
      lineHeight: '2rem',
    },
  },
  rightArrowButton: {
    display: 'contents',
    color: colors.main.white,
    height: 'unset',
    '& svg': {
      marginLeft: 0,
    },
  },
  grid: {
    [breakpoints.up('md')]: {
      '& > div:nth-of-type(2)': {
        maxWidth: '47%',
      },
      '& > div:first-of-type': {
        minWidth: '53%',
      },
    },
  },
  initialTitle: {
    fontSize: '.875rem',
    lineHeight: '.875rem',
    textTransform: 'uppercase',
    marginBottom: '1rem',
    [breakpoints.down('xs')]: {
      margin: `2rem 0 0.5rem 0`,
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
  },
  gridItemImageClassName: {
    [breakpoints.down('sm')]: {
      maxHeight: 450,
    },
    [breakpoints.down('xs')]: {
      maxHeight: 350,
    },
  },
}))

export default AffordableConnectivityProgram
