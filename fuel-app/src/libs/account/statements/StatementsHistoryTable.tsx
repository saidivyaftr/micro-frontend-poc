import { Link, makeStyles, TableBody } from '@material-ui/core'
import { Loading } from 'src/blitz'
import { useDispatch } from 'react-redux'
import { Bill } from 'src/redux/types/billTypes'
import moment from 'moment'
import { descendingDateComparator } from 'src/utils/date-helper'
import { useEffect } from 'react'
import colors from 'src/styles/theme/colors'
import { fetchAvailableBills } from 'src/redux/slicers/bills'
import useTable from 'src/hooks/useTable'
import { Info } from '../shared/Info'
import { InfoIcon } from 'src/blitz/assets/react-icons'
import { useActiveAccountId, useBillList } from 'src/selector-hooks'

const useStyles = makeStyles(() => ({
  messageCtr: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60px',
  },
  currentBillIndicator: {
    color: colors.main.brightRed,
  },
  link: {
    '&:hover': {
      textDecoration: 'underline',
      color: colors.main.brightRed,
    },
  },
  viewMessageLink: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    cursor: 'pointer',
  },
}))

export const StatementsHistoryTable = (): JSX.Element => {
  const classes = useStyles()
  const activeAccountId = useActiveAccountId()
  const bills = useBillList()
  const dispatch = useDispatch()

  const comparator = descendingDateComparator()

  const headCells = [
    { id: 'Bills', label: 'Bills' },
    { id: 'Amount', label: 'Amount' },
    { id: 'Important Messages', label: 'Important Messages' },
  ]

  const {
    FrontierTable,
    FrontierTableHead,
    FrontierTableCell,
    FrontierTableRow,
    recordsToRender,
  } = useTable<Bill>(bills.data, headCells, true)

  useEffect(() => {
    if (activeAccountId) {
      dispatch(fetchAvailableBills(activeAccountId))
    }
  }, [activeAccountId])

  const renderBillRow = (bill: Bill, index: number) => {
    const displayDate = moment(bill.date).format('ll')
    return (
      <FrontierTableRow key={bill.date} hover>
        <FrontierTableCell>
          <a
            className={classes.link}
            href={bill.pdfLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {displayDate}
          </a>
          {index === 0 && (
            <i className={classes.currentBillIndicator}>{`  Current Bill`}</i>
          )}
        </FrontierTableCell>
        <FrontierTableCell>{`$${bill.amount}`}</FrontierTableCell>
        <FrontierTableCell>
          {!!(bill.messages && bill.messages.length > 0) && (
            <Link className={`${classes.link} ${classes.viewMessageLink}`}>
              <InfoIcon width="16px" height="16px" />
              <span>View Messages</span>
            </Link>
          )}
        </FrontierTableCell>
      </FrontierTableRow>
    )
  }

  const renderBillsTable = () => (
    <div>
      <FrontierTable>
        <FrontierTableHead />
        <TableBody>
          {recordsToRender()
            .slice()
            .sort((billA, billB) => comparator(billA.date, billB.date))
            .slice(0, 13)
            .map(renderBillRow)}
        </TableBody>
      </FrontierTable>
    </div>
  )

  return (
    <div>
      {bills.isLoading ? (
        <Loading />
      ) : bills.error ? (
        <Info
          type="error"
          message="Failed to fetch the data. Please try again later."
        />
      ) : bills.data.length > 0 ? (
        renderBillsTable()
      ) : (
        <Info message="You do not have any bills at this time" />
      )}
    </div>
  )
}
