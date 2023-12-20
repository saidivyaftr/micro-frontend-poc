import { makeStyles } from '@material-ui/core'
import { Typography, InjectHTML } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'

const AppleOriginals = () => {
  const classes = useStyles()
  const { title, subTitle, icon, image }: any = useAppData(
    'appleOriginals',
    true,
  )

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <InjectHTML value={icon?.rendered} className={classes.icon} />
        <Typography
          tagType="h2"
          styleType="h3"
          color="tertiary"
          className={classes.title}
        >
          {title?.value}
        </Typography>
        <Typography
          tagType="p"
          styleType="h5"
          color="tertiary"
          fontType="boldFont"
          className={classes.title}
        >
          {subTitle?.value}
        </Typography>
      </div>
      <div className={classes.figure}>
        <img
          src={image?.src}
          alt={image?.alt}
          className={classes.originalsImage}
          loading="lazy"
        />
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: colors.main.dark,
    padding: '80px 0 60px',
    overflow: 'hidden',
    [breakpoints.down('sm')]: {
      padding: '50px 0 40px',
    },
  },
  wrapper: {
    maxWidth: 1160,
    margin: 'auto',
    '& p': {
      maxWidth: '680px',
    },
  },
  title: {
    textAlign: 'center',
    maxWidth: 850,
    margin: 'auto',
    marginBottom: 16,
    [breakpoints.down('xs')]: {
      maxWidth: 250,
    },
  },
  description: {
    textAlign: 'center',
    maxWidth: 650,
    margin: 'auto',
    marginBottom: 16,
  },
  tilesWrapper: {
    marginTop: 32,
  },
  icon: {
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 32,
  },
  figure: {
    [breakpoints.down('sm')]: {
      margin: '0 -72% 0 -5%',
    },
  },
  originalsImage: {
    width: '100%',
  },
}))

export default AppleOriginals
