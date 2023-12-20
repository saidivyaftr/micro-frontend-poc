import { makeStyles } from '@material-ui/core'
import { InjectHTML, Video } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData } from 'src/hooks'
import colors from '@/shared-ui/colors'
import { WHY_FRONTIER_VIDEO } from 'src/constants'
const FastInternetVideo = () => {
  const classes = useStyles()
  const {
    heading,
    videoDetailsaccountId,
    videoDetailsplayerId,
    videoDetailsvideoId,
  }: any = useAppData('FastInternetVideo', true)
  if (
    !videoDetailsaccountId?.value &&
    !videoDetailsplayerId?.value &&
    !videoDetailsvideoId?.value
  ) {
    return null
  }
  return (
    <div id="more" className={classes.root}>
      <div className={classes.wrapper}>
        {heading?.value && (
          <InjectHTML
            tagType="h2"
            styleType="h3"
            fontType="boldFont"
            className={classes.title}
            value={heading?.value}
          />
        )}

        <div className={classes.videoContainer} id="how-to-start-router-video">
          <Video
            accountId={videoDetailsaccountId?.value}
            playerId={videoDetailsplayerId?.value}
            videoId={videoDetailsvideoId?.value}
            videoName={WHY_FRONTIER_VIDEO}
            className={classes.videoPlayer}
            allowPauseVideo={true}
          />
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    background: colors.main.white,
  },
  wrapper: {
    ...COMPONENT_WRAPPER,
    padding: '40px 0',
    [breakpoints.up('md')]: {
      padding: '60px 16px 74px',
    },
  },
  title: {
    padding: '2.5rem 0',
    [breakpoints.down('md')]: {
      padding: '2.5rem 16px',
    },
    '& span>span': { color: colors.main.brightRed },
  },
  videoContainer: {
    maxWidth: '75rem',
    maxHeight: '652px',
    margin: 'auto',
    height: 'calc(100vw * 9 / 16 )',
  },
  videoPlayer: {
    '& video-js': {
      width: '100%',
      height: '100%',
    },
    position: 'relative',
  },
}))

export default FastInternetVideo
