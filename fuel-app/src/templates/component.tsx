import { makeStyles } from '@material-ui/core'
import { COMPONENT_WRAPPER } from 'src/constants'

const Component = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>COMPONENT code goes inside this</div>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  wrapper: {
    ...COMPONENT_WRAPPER,
  },
}))

export default Component
