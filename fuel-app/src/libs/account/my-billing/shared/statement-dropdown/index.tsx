import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Bill, BillList } from 'src/redux/types/billTypes'
import moment from 'moment'
import { useMemo } from 'react'
import { Dropdown } from 'src/ui-kit'

type StatementDropdownTypes = {
  statements: BillList | null
  selectedStatement: Bill | null
  onStatementSelect: (statement: Bill) => void
}

export default function StatementDropdown({
  selectedStatement,
  statements,
  onStatementSelect,
}: StatementDropdownTypes) {
  const classes = useStyles()

  const getRangeName = (date: any) => {
    const statementName = `${moment(date).format('MMM, YYYY')}`
    return statementName
  }

  const statementsDropdownOptions = useMemo(() => {
    return (
      statements?.map((statement) => ({
        label: getRangeName(new Date(statement?.date)),
        value: statement?.date,
      })) || []
    )
  }, [statements])

  const selectedDropdownValue = useMemo(() => {
    if (selectedStatement) {
      return {
        label: getRangeName(new Date(selectedStatement?.date)),
        value: selectedStatement?.date,
      }
    }
    return {
      label: '',
      value: '',
    }
  }, [selectedStatement])

  const setDropdownSelection = (value: string) => {
    const selection = statements?.find((statement) => statement.date === value)
    if (selection) {
      onStatementSelect(selection)
    }
  }

  return (
    <Dropdown
      className={classes.dropdown}
      value={selectedDropdownValue}
      options={statementsDropdownOptions}
      onChange={({ value }: any) => setDropdownSelection(value)}
    />
  )
}

const useStyles = makeStyles(({ breakpoints }) =>
  createStyles({
    dropdown: {
      minWidth: 180,
      [breakpoints.down('xs')]: {
        width: '100%',
      },
    },
  }),
)
