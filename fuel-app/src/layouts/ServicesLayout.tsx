import { makeStyles } from '@material-ui/core'
import colors from 'src/styles/theme/colors'
interface PageProps {
  children?: any
}

const ServicesLayout = ({ children }: PageProps): JSX.Element => {
  const classes = useStyles()
  return (
    <div className={classes.wrapper}>
      <div className={`${classes.main}`}>{children}</div>
    </div>
  )
}

export default ServicesLayout

const useStyles = makeStyles(() => ({
  wrapper: {
    width: '100vw',
    background: colors.main.lightBorderGrey,
  },
  loader: {
    width: '100vw',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    margin: 0,
    width: 'auto',
    height: 'auto',
    display: 'block',
  },
  main: {
    flex: '2 2',
  },
}))
