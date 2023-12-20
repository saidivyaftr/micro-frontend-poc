import { makeStyles } from '@material-ui/core'
import { Typography } from '@/shared-ui/components'
import { PP_OBJECT_SANS_BOLD } from 'src/constants/fontFamilyNames'
import { VideoModal } from '@/shared-ui/components'
import { useAppData } from 'src/hooks'
import colors from '@/shared-ui/colors'

const Header = () => {
  const { title, subTitle, description, videoTitle, imageSrc, videoId }: any =
    useAppData('HeroVideo', true)

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.blackBox}>
        <Typography
          tagType="h1"
          color="default"
          styleType="h1"
          className={classes.title}
        >
          {title?.value}
        </Typography>
      </div>
      <div className={classes.bottomSection}>
        <Typography color="default" styleType="h3">
          {subTitle?.value}
        </Typography>
        <div className={classes.rightCol}>
          <Typography color="default" styleType="p1">
            {description?.value}
          </Typography>
          <br />
          <Typography color="default" styleType="h6">
            {videoTitle?.value}
          </Typography>
        </div>
      </div>
      <div className={classes.videoContainer} id="how-to-start-router-video">
        <VideoModal
          imageSrc={imageSrc?.value}
          videoId={videoId?.value}
          imageContainerClassName={classes.imgContainer}
          imageAltText={imageSrc?.alt}
          videoName={videoTitle?.value}
        />
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    marginBottom: '4rem',
    [breakpoints.down('xs')]: {
      marginBottom: '1.5rem',
    },
  },
  imgContainer: {
    height: '550px',
    '& img': {
      borderRadius: '32px',
      height: '550px',
      [breakpoints.down('xs')]: {
        maxHeight: '300px',
      },
    },
    [breakpoints.down('xs')]: {
      maxHeight: '300px',
    },
  },
  blackBox: {
    backgroundColor: colors.main.midnightExpress,
    width: '100%',
    height: '25rem',
    [breakpoints.down('xs')]: {
      height: '18.75rem',
    },
  },
  title: {
    paddingLeft: '10%',
    paddingTop: '6.25rem',
    fontFamily: PP_OBJECT_SANS_BOLD,
    color: colors.main.white,
    textTransform: 'none',
    maxWidth: '60rem',
    [breakpoints.down('xs')]: {
      fontSize: '31px',
      lineHeight: '44px',
      padding: '3.75rem 1rem 9.5rem 2rem',
      height: '18.75rem',
    },
  },
  bottomSection: {
    display: 'flex',
    margin: 'auto',
    maxWidth: '75rem',
    marginTop: '5rem',
    marginBottom: '2.5rem',
    justifyContent: 'space-between',
    alignItems: 'center',
    [breakpoints.down('md')]: {
      marginTop: '2rem',
      gap: '1rem',
      flexDirection: 'column',
      marginBottom: '2rem',
      padding: '0 2rem',
    },
  },
  rightCol: {
    maxWidth: '600px',
  },
  videoContainer: {
    maxWidth: '77rem',
    maxHeight: '550px',
    margin: 'auto',
    height: '100%',
    padding: '0 1rem',
    [breakpoints.down('xs')]: {
      maxHeight: '300px',
      height: '100%',
    },
  },
  subTitle: {
    [breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  video: {
    '& video-js': {
      width: '100%',
      height: '100%',
    },
  },
}))

export default Header
