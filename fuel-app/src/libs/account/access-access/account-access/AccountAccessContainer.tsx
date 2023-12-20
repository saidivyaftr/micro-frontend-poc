import { makeStyles } from '@material-ui/core'
import { COMPONENT_WRAPPER } from 'src/constants'
import { People } from './people'
import { LinkedAccounts } from './linked-accounts'

export const AccountAccessContainer = () => {
  const classes = useStyles()

  return (
    <section className={classes.wrapper}>
      <div className={classes.root}>
        <People />
        <LinkedAccounts />
      </div>
    </section>
  )
}

const useStyles = makeStyles(() => ({
  wrapper: {
    paddingBottom: '4rem',
  },
  root: {
    ...COMPONENT_WRAPPER,
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    padding: 0,
  },
}))
