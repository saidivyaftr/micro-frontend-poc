import { makeStyles } from '@material-ui/core'
import colors from '@/shared-ui/colors'
import { Typography, ImagePerk, InjectHTML } from '@/shared-ui/components'
import { useAppData } from 'src/hooks'

const WhiteGloveInstallation = () => {
  const classes = useStyles()
  const data = useAppData('getWhiteGloveInstallation', true)
  const renderContent = () => {
    return (
      <div id="white-glove-installation" className={classes.details}>
        <Typography
          tagType="h3"
          styleType="h3"
          className={classes.whiteGloveTitle}
        >
          {data?.title?.value}
        </Typography>
        <Typography
          tagType="p"
          styleType="p2"
          className={classes.whiteGloveDescription}
        >
          {data?.description?.value}
        </Typography>
        {data?.legalDisclaimer?.value && (
          <InjectHTML
            styleType="p4"
            className={classes.legalDisclaimer}
            value={data?.legalDisclaimer?.value}
          />
        )}
      </div>
    )
  }
  return (
    <ImagePerk
      backgroundColor="light-gray"
      stripeColor="primary"
      contentBoxBorderRadius={false}
      contentClassName={classes.contentBoxStyles}
      imageStyleClassName={classes.imageStyles}
      className={classes.imagePerk}
      content={renderContent()}
      tabletBackgroundImage={data?.image || {}}
      mobileBackgroundImage={data?.mobileImage || {}}
      linesBgColorsClass={classes.stripesClassName}
    />
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  container: {
    backgroundColor: colors.main.lightGray,
  },
  details: {
    alignItems: 'center',
    backgroundColor: colors.main.white,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 'auto',
    width: '100%',
    borderRadius: 16,
    lineHeight: 38,
    [breakpoints.down('sm')]: {
      padding: '32px',
    },
  },
  root: {
    color: colors.main.white,
  },
  stripesClassName: {
    [breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  bannerImage: {
    width: '135px',
    height: '40px',
    objectFit: 'cover',
    [breakpoints.down('sm')]: {
      width: 'auto',
    },
  },
  whiteGloveTitle: {
    margin: '8px 0px !important',
    maxWidth: 450,
    fontSize: 30,
    lineHeight: '38px !important',
    [breakpoints.down('sm')]: {
      fontSize: 30,
      lineHeight: '28px !important',
    },
    [breakpoints.down('xs')]: {
      fontSize: 20,
      lineHeight: '28px !importan',
    },
  },
  whiteGloveDescription: {
    fontWeight: 400,
    fontSize: 18,
    lineHeight: '26px',
    letterSpacing: '0.01em',
    marginBottom: '32px',
    maxWidth: 450,
    margin: '0 !important',
    [breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
    '& sup': {
      fontSize: '10px',
      lineHeight: 0,
      verticalAlign: 'super',
    },
    [breakpoints.down('xs')]: {
      fontSize: 16,
      lineHeight: '24px',
    },
  },
  contentBoxStyles: {
    margin: '4rem 0 !important',
    padding: '48px 64px',
    borderRadius: 16,
    minWidth: 'auto !important',
    minHeight: 'auto !important',
    [breakpoints.down('sm')]: {
      padding: 0,
      margin: '2rem 1rem !important',
    },
    [breakpoints.down('xs')]: {
      padding: 0,
    },
  },
  imageStyles: {
    marginTop: 60,
    marginBottom: '0px !important',
    [breakpoints.down('sm')]: {
      marginTop: 0,
      marginBottom: 24,
    },
    '& img': {
      maxWidth: '70% !important',
      width: '100% !important',
      [breakpoints.down('md')]: {
        maxWidth: '100% !important',
      },
    },
  },
  imagePerk: {
    maxWidth: 1200,
    margin: 'auto',
    paddingLeft: '1rem',
    [breakpoints.down('sm')]: {
      paddingLeft: 0,
    },
  },
  legalDisclaimer: {
    [breakpoints.down('sm')]: {
      fontSize: '.75rem',
      lineHeight: '1rem',
    },
    '& sup': { lineHeight: '0' },
  },
}))

export default WhiteGloveInstallation
