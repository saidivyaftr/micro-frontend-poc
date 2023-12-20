import { makeStyles } from '@material-ui/core'
import {
  Typography,
  InjectHTML,
  Button,
  VideoModal,
} from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import { COMPONENT_WRAPPER } from 'src/constants'
import { PP_OBJECT_SANS } from 'src/constants/fontFamilyNames'
import { useAppData } from 'src/hooks'
const AutoPlayVideo = () => {
  const classes = useStyles()
  const {
    title,
    subTitle,
    buttonText,
    videoId,
    mobilethumbnailImage,
    thumbnailImage,
    buttonhref,
    buttonHoverVariant,
    buttonVariant,
  }: any = useAppData('autoPlayVideo', true) || {}
  return (
    <div
      id="auto-play-video"
      className={classes.root}
      data-testid="auto-play-video"
    >
      <div className={classes.wrapper}>
        <div className={classes.contentBlock}>
          {title?.value && (
            <InjectHTML
              tagType="h2"
              styleType="h4"
              color="tertiary"
              className={classes.title}
              value={title?.value}
              data-testid="auto-play-video-title"
            />
          )}
          {subTitle?.value && (
            <Typography
              className={classes.subTitle}
              styleType="p1"
              color="tertiary"
              tagType="p"
              data-testid="auto-play-video-subtitle"
            >
              {subTitle?.value}
            </Typography>
          )}
          {buttonText?.value && (
            <div className={classes.buttonWrapper}>
              <Button
                text={buttonText?.value}
                type="link"
                hoverVariant={buttonHoverVariant?.targetItem?.type?.value}
                variant={buttonVariant?.targetItem?.type?.value}
                href={buttonhref?.url}
                className={classes.buttonStyles}
                data-testid="auto-play-video-button"
              />
            </div>
          )}
        </div>
        <div>
          <VideoModal
            imageSrc={thumbnailImage?.src}
            videoId={videoId?.value}
            videoName={title?.value}
            videoCardClassName={classes.videoCardStyles}
            mobileSrc={mobilethumbnailImage?.src}
            imageContainerClassName={classes.imageContainer}
            modelArticleFlag={false}
            imageAltText={thumbnailImage?.alt}
          />
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  videoCardStyles: {
    margin: 0,
    borderRadius: 0,
    '& img': {
      borderRadius: '0px 32px 32px 0px',
      [breakpoints.down('xs')]: {
        borderRadius: '16px 16px 0px 0px',
        width: '100%',
        height: 'auto',
      },
    },
  },
  imageContainer: {
    [breakpoints.down('xs')]: {
      height: 'auto',
      position: 'relative',
      bottom: '-8px',
    },
  },
  root: {
    background: colors.main.grey,
    paddingBottom: 80,
    paddingTop: 80,
    [breakpoints.down('xs')]: {
      paddingBottom: 48,
      paddingTop: 48,
    },
  },
  wrapper: {
    ...COMPONENT_WRAPPER,
    display: 'flex',
    [breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
  subTitle: {
    margin: '12px 0px 30px 0px',
    [breakpoints.down('xs')]: {
      margin: '16px 0px',
    },
  },
  title: {
    '& span': {
      color: colors.main.brightRed,
    },
  },

  contentBlock: {
    backgroundColor: colors.main.midnightExpress,
    padding: 64,
    width: '40%',
    borderRadius: '32px 0px 0px 32px',
    [breakpoints.down('md')]: {
      padding: 32,
      width: '50%',
    },
    [breakpoints.down('xs')]: {
      borderRadius: '0px 0px 16px 16px',
      width: '100%',
    },
  },
  buttonStyles: {
    display: 'block !important',
    alignItems: 'center',
    fontFamily: PP_OBJECT_SANS,
    '& svg': {
      width: 16,
      height: 10,
    },
  },
  buttonWrapper: {
    display: 'inline-block',
    [breakpoints.down('sm')]: {
      display: 'block',
    },
  },
}))

export default AutoPlayVideo
