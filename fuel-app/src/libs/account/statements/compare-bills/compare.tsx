import { MenuItem, Select, withStyles } from '@material-ui/core'
import moment from 'moment'
import { useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { Loading } from 'src/blitz'
import { billsSlice, fetchCompareBills } from 'src/redux/slicers/bills'
import css from './compare.module.scss'
import { Info } from '../../shared/Info'
import BillDetailsTable from '../shared/BillDetailsTable'
import { BillDetails } from 'src/redux/types/billTypes'
import {
  useActiveAccountId,
  useBillList,
  useBillDetailsByDate,
  useSelectedBillDatesCompare,
} from 'src/selector-hooks'

const StyledSelect = withStyles(() => ({
  select: {
    marginLeft: '20px',
    backgroundColor: '#fff',
    color: '#555',
    padding: '5px 20px',
    borderRadius: '3px',
    '&:focus': {
      backgroundColor: '#fff',
    },
    '&::after': {
      borderBottom: 'none',
    },
    '& .MuiInput-underline': {
      borderBottom: 'none',
      '&::after': {
        borderBottom: 'none',
      },
    },
  },
}))(Select)

const CompareBillComponent = () => {
  const dispatch = useDispatch()

  const activeAccountId = useActiveAccountId()

  const availableBillMonths = useBillList().data

  const compareBillList = useBillDetailsByDate()

  const selectedMonths = useSelectedBillDatesCompare()

  const arrangedCompareTableData = useMemo(() => {
    const primaryDateBill: BillDetails | undefined =
      compareBillList.data[selectedMonths[0]]
    const comparingDateBill: BillDetails | undefined =
      compareBillList.data[selectedMonths[1]]

    if (!primaryDateBill) return null
    if (!comparingDateBill) return primaryDateBill
    const tableData: any = {
      sections: [],
      totals: {
        prior: 0,
      },
      due: {},
    }
    primaryDateBill?.sections.map((primarySection) => {
      const comparingSection = comparingDateBill.sections.find(
        (comparingSection) =>
          comparingSection.heading === primarySection.heading,
      )
      const arrangedSection: any = {
        heading: primarySection.heading,
        heading_value: primarySection.heading_value,
        heading_value2: comparingSection?.heading_value,
        rows: [],
      }
      primarySection.rows.map((primaryRow) => {
        const matchedRow = comparingSection?.rows.find(
          (comparingRow) => comparingRow.description === primaryRow.description,
        )
        arrangedSection.rows.push({ ...primaryRow, value2: matchedRow?.value })
      })
      tableData.sections.push(arrangedSection)
    })
    tableData.totals = {
      ...primaryDateBill.totals,
      current2: comparingDateBill.totals.current,
      prior2: comparingDateBill.totals.prior,
    }
    tableData.due = {
      ...primaryDateBill.due,
      amount2: comparingDateBill.due.amount,
      date2: comparingDateBill.due.date,
    }

    return tableData
  }, [selectedMonths, compareBillList.data])

  useEffect(() => {
    if (selectedMonths.length !== 0) {
      dispatch(
        fetchCompareBills(
          activeAccountId,
          selectedMonths[0],
          selectedMonths[1],
        ),
      )
    }
  }, [activeAccountId, availableBillMonths, selectedMonths])

  const onMonthSelect = (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>,
  ) => {
    dispatch(
      billsSlice.actions.toggleBillDatesForCompare({
        billDate: event?.target?.value,
        dateType: event?.target?.name,
      }),
    )
  }

  const renderMonthSelection = () => {
    return (
      <>
        <div>Select</div>
        <StyledSelect
          name="primaryDate"
          value={selectedMonths[0]}
          onChange={onMonthSelect}
        >
          {availableBillMonths.length > 0 &&
            availableBillMonths?.map((bill) => (
              <MenuItem
                disabled={selectedMonths.includes(bill.date)}
                value={bill.date}
                key={bill.date}
              >
                {moment(bill.date).format('ll')}
              </MenuItem>
            ))}
        </StyledSelect>
        <StyledSelect
          name="comparingDate"
          value={selectedMonths[1]}
          onChange={onMonthSelect}
        >
          {availableBillMonths.length > 0 &&
            availableBillMonths?.map((bill) => (
              <MenuItem
                disabled={selectedMonths.includes(bill.date)}
                value={bill.date}
                key={bill.date}
              >
                {moment(bill.date).format('ll')}
              </MenuItem>
            ))}
        </StyledSelect>
      </>
    )
  }

  const renderCompareBills = () => (
    <>
      <div>
        <h2>Compare Bills</h2>
        <div className={css.selectHeader}>{renderMonthSelection()}</div>
        {arrangedCompareTableData ? (
          <section>
            <BillDetailsTable bill={arrangedCompareTableData} compareTable />
          </section>
        ) : (
          <Info
            message={
              getCompareBillListLength() === 0
                ? 'You do not have any bills at this time.'
                : 'You only have one bill to view at this time.'
            }
          />
        )}
      </div>
    </>
  )

  const getCompareBillListLength = () =>
    Object.keys(compareBillList.data).length

  return (
    <div>
      {compareBillList.isLoading ? (
        <Loading />
      ) : compareBillList.error ? (
        <Info
          type="error"
          message="Failed to fetch the data. Please try again later."
        />
      ) : getCompareBillListLength() > 1 ? (
        renderCompareBills()
      ) : (
        <Info
          message={
            getCompareBillListLength() === 0
              ? 'You do not have any bills at this time.'
              : 'You only have one bill to view at this time.'
          }
        />
      )}
    </div>
  )
}

export default CompareBillComponent
