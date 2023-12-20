import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@/shared-ui/components'
import Image from 'src/components/ImageWithPlaceholder'
import colors from '@/shared-ui/colors'
interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any
}

const MAX_CARDS = 4

const StreamingPlatforms = ({ options }: PageProps): JSX.Element => {
  const classes = useStyles()
  if (!options) {
    return <></>
  }
  const trimmedOptions = options.slice(0, MAX_CARDS)
  return (
    <div className={classes.root}>
      {trimmedOptions?.map((item: any, index: number) => (
        <div className={classes.imageWrapper} key={index}>
          <Image
            alt={item?.image?.alt}
            width="45"
            height="45"
            src={item?.image?.src}
            className={classes.image}
          />
        </div>
      ))}
      {options.length > MAX_CARDS && (
        <Typography tagType="div" styleType="p2" className={classes.moreBtn}>
          + more
        </Typography>
      )}
    </div>
  )
}

const useStyles = makeStyles(({ typography }) => ({
  root: {
    display: 'flex',
    padding: `${typography.pxToRem(24)} 0`,
    width: '100%',
    borderTop: `1px solid ${colors.main.borderLightGray}`,
  },
  imageWrapper: {
    marginRight: 10,
  },
  image: {
    borderRadius: '50%',
  },
  moreBtn: {
    fontSize: typography.pxToRem(14),
    textTransform: 'inherit',
    border: 0,
    padding: 2,
    lineHeight: typography.pxToRem(45),
    fontWeight: 600,
    '&:hover': {
      backgroundColor: colors.main.white,
      color: colors.main.midnightExpress,
    },
  },
}))

export default StreamingPlatforms
