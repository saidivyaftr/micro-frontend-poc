import { CardWithTitle } from '@/shared-ui/components/Card/Card'
import { makeStyles } from '@material-ui/core'
import PaymentsForm from './PaymentsForm'
import { AutopayCard, PaperLessBillingCard } from '../my-billing/shared'

export const PaymentContainer = () => {
  const styles = useStyles()

  return (
    <>
      <div className={styles.desktop}>
        <div className={styles.desktopRow1}>
          <CardWithTitle
            title={''}
            className={styles.card}
            classNameTitle={styles.classNameTitle}
          >
            <PaymentsForm />
          </CardWithTitle>
        </div>
        <div className={styles.desktopRow2}>
          <AutopayCard />
          <PaperLessBillingCard />
        </div>
      </div>
    </>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  desktop: {
    display: 'flex',
    gap: 16,
    paddingBottom: 80,
    [breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  card: {
    width: '100%',
    '& .MuiContainer-root': {
      padding: 0,
    },
  },
  desktopRow1: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  desktopRow2: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '316px',
    [breakpoints.down('md')]: {
      width: '100%',
    },
  },
  classNameTitle: {
    marginBottom: 32,
  },
}))
