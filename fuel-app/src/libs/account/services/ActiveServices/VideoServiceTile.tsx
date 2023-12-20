import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@/shared-ui/components'
import clx from 'classnames'
import colors from '@/shared-ui/colors'

const VideoServiceTile = (props: {
  data: { productName?: string }
  shouldDisableTile: boolean
}) => {
  const classes = useStyles()
  const { data, shouldDisableTile } = props

  return (
    <div className={classes.tileClass}>
      <Typography
        tagType="h4"
        styleType="h4"
        className={clx({
          [classes.disableTile]: shouldDisableTile,
        })}
      >
        {data?.productName}
      </Typography>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  tileClass: {
    paddingTop: 8,
    paddingBottom: 16,
  },
  disableTile: {
    color: `${colors.main.gray} !important`,
  },
}))

export default VideoServiceTile
