import useAppData from '@/shared-ui/hooks/useAppData'
import { makeStyles } from '@material-ui/core'
import { Typography } from 'src/blitz'
import { COMPONENT_WRAPPER } from 'src/constants'
import colors from 'src/styles/theme/colors'

const EmptyCart = () => {
  const classes = useStyles()
  const { emptyCartText } = useAppData('cartData', true)
  return (
    <div className={classes.root}>
      <div className={classes.innerWrapper}>
        <div className={classes.loginCard}>
          <Typography styleType="h4" tagType="h3">
            {emptyCartText?.value}
          </Typography>
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: colors.main.lightGray,
  },
  innerWrapper: {
    ...COMPONENT_WRAPPER,
    maxWidth: 800,
    paddingTop: 42,
    paddingBottom: 42,
  },
  loginCard: {
    textAlign: 'center',
    backgroundColor: colors.main.white,
    borderRadius: 16,
    padding: '3rem 4rem',
    [breakpoints.down('xs')]: {
      padding: 24,
    },
  },
}))

export default EmptyCart
