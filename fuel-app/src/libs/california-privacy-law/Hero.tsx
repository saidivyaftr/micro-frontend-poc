import { makeStyles } from '@material-ui/styles'
import { Typography } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData } from 'src/hooks'
import colors from '@/shared-ui/colors'

const Hero = () => {
  const classes = useStyles()
  const { title } = useAppData('hero', true)
  if (!title) {
    return null
  }
  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Typography styleType="h2" tagType="h1" color="tertiary">
          {title?.value}
        </Typography>
      </div>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: colors.main.midnightExpress,
  },
  wrapper: {
    ...COMPONENT_WRAPPER,
    padding: '2.5rem 16px',
    textAlign: 'center',
  },
}))

export default Hero
