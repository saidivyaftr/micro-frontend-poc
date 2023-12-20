import { makeStyles } from '@material-ui/core'
import { Typography, InjectHTML, VideoModal } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData } from 'src/hooks'

const CreateAccount = () => {
  const classes = useStyles()
  const {
    title,
    videoId,
    mobilethumbnailImage,
    thumbnailImage,
    list,
    videoTitle,
  }: any = useAppData('CreateAccount', true) || {}
  if (!title?.value) {
    return null
  }
  return (
    <div
      id="createAccount-play-video"
      className={classes.root}
      data-testid="createAccount-play-video"
    >
      <div className={classes.wrapper}>
        <div className={classes.contentBlock}>
          {title?.value && (
            <InjectHTML
              tagType="h2"
              styleType="h3"
              color="tertiary"
              className={classes.title}
              value={title?.value}
              data-testid="create-account-video-title"
            />
          )}

          {list?.targetItems?.length > 0 && (
            <>
              <ul className={classes.listStyles} data-testid="video-listItem">
                {list?.targetItems?.map((item: any, index: any) => {
                  return (
                    <li key={index + item?.step?.value}>
                      <Typography
                        tagType="p"
                        className={classes.numberStyles}
                        fontType="boldFont"
                      >
                        {index + 1}
                      </Typography>
                      <InjectHTML
                        tagType="p"
                        styleType="p1"
                        className={classes.listItem}
                        value={item?.step?.value}
                      />
                    </li>
                  )
                })}
              </ul>
            </>
          )}
        </div>
        <div data-testid="video-model" className={classes.videoBlock}>
          <VideoModal
            imageSrc={thumbnailImage?.src}
            videoId={videoId?.value}
            videoCardClassName={classes.videoCardStyles}
            mobileSrc={mobilethumbnailImage?.src}
            imageContainerClassName={classes.imageContainer}
            imageAltText={thumbnailImage?.alt}
            videoTitle={videoTitle?.value}
            videoName={videoTitle?.value}
          />
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  videoBlock: {
    width: '58.3%',
    [breakpoints.down('md')]: {
      width: '100%',
    },
  },
  videoCardStyles: {
    margin: 0,
    borderRadius: 0,
    height: '100%',
    overflow: 'hidden',
    '& img': {
      borderRadius: '0px 32px 32px 0px',
      [breakpoints.down('md')]: {
        borderRadius: '16px 16px 0px 0px',
        width: '100%',
        height: 'auto',
      },
    },
  },
  numberStyles: {
    width: 24,
    height: 24,
    backgroundColor: colors.main.newBackgroundGray,
    borderRadius: 50,
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    fontWeight: 700,
    lineHeight: '26px',
  },
  listItem: {
    color: colors.main.newBackgroundGray,
    width: 'calc(100% - 32px)',
    '& p': {
      margin: '0px 0px 16px 0px',
    },
    [breakpoints.down('xs')]: {
      fontSize: 18,
      lineHeight: '26px',
    },
  },
  imageContainer: {
    height: '100%',

    [breakpoints.down('md')]: {
      height: 'auto',
      position: 'relative',
      bottom: '-8px',
      width: '100%',
    },
    '& img': {
      overflow: 'hidden',
      height: '100%',
      width: '100%',
      [breakpoints.down('md')]: {
        height: 'auto',
        width: '100%',
      },
    },
  },
  listStyles: {
    marginBottom: 10,
    paddingLeft: 0,
    '& li': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
    },
    '& a': {
      textDecoration: 'underline',
      '&:hover': {
        color: colors.main.brightRed,
      },
    },
    [breakpoints.down('md')]: {
      maxWidth: 500,
    },
  },
  root: {
    paddingBottom: 80,
    paddingTop: 80,
    [breakpoints.down('xs')]: {
      paddingBottom: '40px',
      paddingTop: '40px',
    },
  },
  wrapper: {
    ...COMPONENT_WRAPPER,
    display: 'flex',
    [breakpoints.down('md')]: {
      flexDirection: 'column-reverse',
    },
  },
  title: {
    '& span': {
      color: colors.main.brightRed,
    },
    [breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },

  contentBlock: {
    backgroundColor: colors.main.midnightExpress,
    padding: '40px 64px',
    width: '100%',
    maxWidth: 500,
    borderRadius: '32px 0px 0px 32px',
    [breakpoints.down('md')]: {
      padding: 32,
      maxWidth: '100%',
      borderRadius: '0px 0px 16px 16px',
      marginTop: -2,
    },
    [breakpoints.down('xs')]: {
      padding: '48px 32px 22px 32px',
      marginTop: 0,
    },
  },
}))

export default CreateAccount
