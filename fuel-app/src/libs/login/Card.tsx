import { makeStyles } from '@material-ui/core'
import colors from '@/shared-ui/colors'

const LoginCard = ({ children }: { children: any }) => {
  const classes = useStyles()
  return <div className={classes.root}>{children}</div>
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: colors.main.white,
    borderRadius: 32,
    padding: '4rem 3rem',
    [breakpoints.down('xs')]: {
      padding: 24,
    },
  },
}))

export default LoginCard
