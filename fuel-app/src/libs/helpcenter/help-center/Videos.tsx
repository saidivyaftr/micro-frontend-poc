import { useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import { VideoCollection } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'
import { HELP_CENTER_VIDEO } from 'src/constants'

const Videos = () => {
  const classes = useStyles()
  const videosData = useAppData('videos', true)
  const { title, description, showMoreText, showLessText, maxCap, list } =
    videosData
  const formattedList = useMemo(() => {
    return list?.list?.map((video: any) => ({
      imageSrc: video?.thumbnail?.src,
      videoId: video?.videoId?.value,
      title: video?.title?.value,
      desc: video?.description?.value,
      videoTitle: video?.videoTitle?.value,
      videoDesc: video?.videoDesc?.value,
      videoName: HELP_CENTER_VIDEO.replace(
        '{video_name}',
        video?.title?.value.toLowerCase(),
      ),
    }))
  }, [list])
  if (Object.keys(videosData)?.length === 0) {
    return null
  }
  return (
    <div className={classes.wrapper}>
      <div className={classes.root} data-testid="BlogArticles">
        <VideoCollection
          title={title?.value}
          subtext={description?.value}
          videos={formattedList}
          showLessText={showLessText?.value}
          showMoreText={showMoreText?.value}
          maxCap={maxCap?.value}
          shouldTruncate
        />
      </div>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  wrapper: {
    backgroundColor: colors.main.newBackgroundGray,
    padding: '60px 0',
  },
  root: {
    ...COMPONENT_WRAPPER,
  },
}))

export default Videos
