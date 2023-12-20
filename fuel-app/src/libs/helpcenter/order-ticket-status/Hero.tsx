import { makeStyles } from '@material-ui/core'
import { Typography } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'

const HeroSection: React.FC = () => {
  const { title } = useAppData('hero', true)
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.contentWrapper}>
        <Typography
          color="tertiary"
          fontType="boldFont"
          tagType="h1"
          styleType="h1"
          className={classes.headingTitle}
        >
          {title?.value}
        </Typography>
      </div>
    </div>
  )
}
const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: colors.main.midnightExpress,
    width: '100%',
    height: '25rem',
    padding: '6.25rem 10rem',
    [breakpoints.down('xs')]: {
      padding: '2.25rem 3rem',
      display: 'flex',
      justifyContent: 'center',
    },
  },
  headingTitle: {
    textTransform: 'none',
    [breakpoints.down('xs')]: {
      fontSize: '1.875rem',
      lineHeight: '2.375rem',
    },
  },
  contentWrapper: {
    display: 'flex',
    height: '100%',
    maxWidth: '70%',
    [breakpoints.down('sm')]: {
      maxWidth: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
}))

export default HeroSection
