import { makeStyles } from '@material-ui/core'
import colors from '@/shared-ui/colors'
const CardWrapper = ({ children }: any) => {
  const classes = useStyles()
  return (
    <div className={classes.card}>
      <div className={classes.wrapper}>{children}</div>
    </div>
  )
}
const useStyles = makeStyles(({ breakpoints }) => ({
  card: {
    width: '100%',
    padding: '2.5rem 7.5rem 2rem 7.5rem',
    background: colors.main.grey,
    [breakpoints.down('sm')]: {
      padding: '4rem 1rem 2rem 1rem',
    },
  },
  wrapper: {
    position: 'relative',
    maxWidth: 1200,
    margin: '0 auto',
  },
}))

export default CardWrapper
