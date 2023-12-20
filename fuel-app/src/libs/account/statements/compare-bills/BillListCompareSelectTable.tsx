import { Checkbox, makeStyles, TableBody } from '@material-ui/core'
import { Button, Loading } from 'src/blitz'
import { useDispatch } from 'react-redux'
import { billsSlice } from 'src/redux/slicers'
import { useRouter } from 'next/router'
import { Bill } from 'src/redux/types/billTypes'
import moment from 'moment'
import { descendingDateComparator } from 'src/utils/date-helper'
import { useEffect } from 'react'
import colors from 'src/styles/theme/colors'
import { fetchAvailableBills } from 'src/redux/slicers/bills'
import { AppRoutes } from 'src/constants/appRoutes'
import useTable from 'src/hooks/useTable'
import { Info } from '../../shared/Info'
import {
  useActiveAccountId,
  useBillList,
  useSelectedBillDatesCompare,
} from 'src/selector-hooks'
import { formatAmountInDollar } from 'src/utils/amount'

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
  cursorPointer: {
    cursor: 'pointer',
  },
}))

export const BillListCompareSelectTable = (): JSX.Element => {
  const router = useRouter()
  const classes = useStyles()
  const activeAccountId = useActiveAccountId()
  const bills = useBillList()
  const selectedBills = useSelectedBillDatesCompare()
  const dispatch = useDispatch()

  const comparator = descendingDateComparator()

  const headCells = [
    { id: 'Select', label: 'Select' },
    { id: 'Bills', label: 'Bills' },
    { id: 'Amount', label: 'Amount' },
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

  const onBillSelect = (billDate: string) => {
    dispatch(billsSlice.actions.toggleBillDatesForCompare({ billDate }))
  }

  const onCompareBills = () => {
    router.push(
      { pathname: AppRoutes.CompareBillPage, query: router.query },
      undefined,
      { shallow: false },
    )
  }

  const renderBillRow = (bill: Bill, index: number) => {
    const isSelected = selectedBills.includes(bill.date)
    const displayDate = moment(bill.date).format('ll')
    return (
      <FrontierTableRow
        key={bill.date}
        className={classes.cursorPointer}
        onClick={() => {
          if (selectedBills.length === 2) {
            isSelected && onBillSelect(bill.date)
          } else {
            onBillSelect(bill.date)
          }
        }}
        role="checkbox"
        selected={isSelected}
        hover
      >
        <FrontierTableCell padding="checkbox" scope="row">
          <Checkbox
            checked={isSelected}
            disabled={selectedBills.length === 2 && !isSelected}
          />
        </FrontierTableCell>
        <FrontierTableCell>
          {displayDate}
          {index === 0 && (
            <i className={classes.currentBillIndicator}>{`  Current Bill`}</i>
          )}
        </FrontierTableCell>
        <FrontierTableCell>
          {formatAmountInDollar(bill.amount)}
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
      <p>
        <Button
          type="button"
          text="Compare Bills"
          onClick={onCompareBills}
          disabled={selectedBills.length !== 2}
        />
      </p>
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
      ) : bills.data.length > 1 ? (
        renderBillsTable()
      ) : (
        <Info
          message={
            bills.data.length === 0
              ? 'You do not have any bills at this time.'
              : 'You only have one bill to view at this time.'
          }
        />
      )}
    </div>
  )
}
