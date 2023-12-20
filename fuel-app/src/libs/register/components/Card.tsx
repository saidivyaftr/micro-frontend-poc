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
    padding: '40px 16px',
    minWidth: 'unset',
    marginBottom: 32,
    [breakpoints.up('sm')]: {
      padding: 48,
      minWidth: 648,
    },
  },
}))

export default Card
