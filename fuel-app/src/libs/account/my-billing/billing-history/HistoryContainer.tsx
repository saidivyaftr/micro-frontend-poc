import { makeStyles } from '@material-ui/core'
import colors from '@/shared-ui/colors'
import {
  AutopayCard,
  PaperLessBillingCard,
  PayYourBillCard,
} from 'src/libs/account/my-billing/shared'
import { StatementCard } from './StatementCard'
const HistoryContainer = () => {
  const classes = useStyles()
  return (
    <section className={classes.wrapper}>
      <main className={classes.container}>
        <div className={`${classes.column} ${classes.columnLeft}`}>
          <StatementCard />
        </div>
        <div className={`${classes.column} ${classes.columnRight}`}>
          <PayYourBillCard />
          <AutopayCard />
          <PaperLessBillingCard />
        </div>
      </main>
    </section>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    width: '100%',
    [breakpoints.down('sm')]: {
      paddingBottom: '5rem',
    },
  },
  background: {
    background: colors.main.newBackgroundGray,
  },
  container: {
    display: 'flex',
    width: '100%',
    gap: '1rem',
    padding: '3rem 0 0',
    [breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  columnLeft: {
    flexGrow: 1,
  },
  columnRight: {
    flexShrink: 0,
    width: '19.75rem',
    [breakpoints.down('xs')]: {
      width: '100%',
    },
  },
}))

export default HistoryContainer
