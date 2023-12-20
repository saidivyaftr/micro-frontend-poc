import { makeStyles } from '@material-ui/core'
import colors from '@/shared-ui/colors'

const Card = ({ children }: { children: any }) => {
  const classes = useStyles()
  return <div className={classes.root}>{children}</div>
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: colors.main.white,
    borderRadius: 32,
    padding: 48,
    minWidth: 685,
    marginBottom: 32,
    [breakpoints.down('xs')]: {
      padding: 36,
      minWidth: 'unset',
    },
  },
}))

export default Card
