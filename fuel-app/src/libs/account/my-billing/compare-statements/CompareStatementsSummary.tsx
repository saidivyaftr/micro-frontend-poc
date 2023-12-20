/* eslint-disable @typescript-eslint/indent */
import { makeStyles } from '@material-ui/core'
import { createStyles } from '@material-ui/styles'
import { Typography } from 'src/blitz'
import { BillDetails } from 'src/redux/types/billTypes'
import colors from 'src/styles/theme/colors'
import { Statements } from './sitecore-mock'

type CompareStatementsSummaryProps = {
  selectedStatementPrimary: BillDetails | null
  selectedStatementSecondry: BillDetails | null
}

const CompareStatementsSummary = ({
  selectedStatementPrimary,
  selectedStatementSecondry,
}: CompareStatementsSummaryProps) => {
  const classes = useStyles()
  const { totalBillAmount, balanceForward, newCharges } = Statements

  return (
    <div className={classes.summaryRoot}>
      <div className={classes.summaryRow}>
        <Typography
          styleType="h6"
          tagType="div"
          fontType="regularFont"
          className={classes.summaryColumn}
        >
          {balanceForward?.value}
        </Typography>
        <Typography
          styleType="h6"
          tagType="div"
          fontType="regularFont"
          className={classes.summaryColumn}
        >
          <>${selectedStatementPrimary?.totals?.prior}</>
        </Typography>
        <Typography
          styleType="h6"
          tagType="div"
          fontType="regularFont"
          className={classes.summaryColumn}
        >
          <>${selectedStatementSecondry?.totals?.prior}</>
        </Typography>
      </div>
      <div className={classes.summaryRow}>
        <Typography
          styleType="h6"
          tagType="div"
          fontType="regularFont"
          className={classes.summaryColumn}
        >
          {newCharges?.value}
        </Typography>

        <Typography
          className={classes.summaryColumn}
          styleType="h6"
          tagType="div"
          fontType="regularFont"
        >
          <>${selectedStatementPrimary?.totals?.current}</>
        </Typography>
        <Typography
          styleType="h6"
          tagType="div"
          className={classes.summaryColumn}
          fontType="regularFont"
        >
          <>${selectedStatementSecondry?.totals?.current}</>
        </Typography>
      </div>
      <div className={classes.summaryRow}>
        <Typography
          styleType="h6"
          className={classes.summaryColumn}
          tagType="div"
        >
          {totalBillAmount?.value}
        </Typography>
        <Typography
          styleType="h6"
          tagType="div"
          className={classes.summaryColumn}
        >
          <>${selectedStatementPrimary?.due?.amount}</>
        </Typography>
        <Typography
          styleType="h6"
          tagType="div"
          className={classes.summaryColumn}
        >
          <>${selectedStatementSecondry?.due?.amount}</>
        </Typography>
      </div>
    </div>
  )
}

export default CompareStatementsSummary

const useStyles = makeStyles(({ breakpoints }) =>
  createStyles({
    summaryRoot: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      padding: '1rem 2rem 1rem 0rem',
      backgroundColor: `${colors.main.secondaryLight}`,
      [breakpoints.down('xs')]: {
        padding: '1rem 1rem 1rem 0rem',
      },
    },
    summaryRow: {
      display: 'flex',
      flexDirection: 'row',
      textAlign: 'right',
      [breakpoints.down('xs')]: {
        padding: 0,
      },
    },
    summaryColumn: {
      flex: 1,
      [breakpoints.down('xs')]: {
        paddingRight: 0,
      },
      '&:first-child': {
        textAlign: 'center',
        flex: 3,
        [breakpoints.down('xs')]: {
          flex: 2,
          paddingRight: 0,
          textAlign: 'right',
        },
      },
    },
  }),
)
