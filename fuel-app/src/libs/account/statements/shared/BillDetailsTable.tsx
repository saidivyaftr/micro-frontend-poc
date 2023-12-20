import { useState } from 'react'
import {
  Table,
  TableRow,
  TableCell,
  TableContainer,
  withStyles,
  makeStyles,
} from '@material-ui/core'
import TableBody from '@material-ui/core/TableBody'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import HyphenIcon from '@material-ui/icons/Remove'
import colors from 'src/styles/theme/colors'
import { BillDetails } from 'src/redux/types/billTypes'
import { formatAmountInDollar } from 'src/utils/amount'

const useStyles = makeStyles(() => ({
  totalsRow: {
    background: colors.main.backgroundGray,
  },
  totalsCell: {
    padding: 10,
  },
  totalAmountCell: {
    fontSize: 18,
    fontWeight: 600,
  },
  expandableRow: {
    cursor: 'pointer',
  },
  totalValueCell: {
    color: colors.main.brightRed,
  },
}))

const SectionRowCell = withStyles((theme) => ({
  root: {
    fontSize: '18px',
    textTransform: 'uppercase',
    padding: '5px 10px',
  },
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {},
}))(TableCell)

const ExpandedRowCell = withStyles((theme) => ({
  root: {
    border: 'none',
    padding: '5px 10px',
  },
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {},
}))(TableCell)

const TotalsCell = withStyles(() => ({
  root: {
    borderBottom: '1px solid #ddd',
    borderTop: '1px solid #ddd',
    padding: '10px',
  },
}))(TableCell)

const StyledTable = withStyles(() => ({
  root: {
    border: '1px solid #ccc',
  },
}))(Table)

const TotalsRow = withStyles(() => ({
  root: {
    borderBottom: '1px solid #ddd',
    background: colors.main.backgroundGray,
    borderTop: '1px solid #ddd',
    padding: '10px',
  },
}))(TableRow)

type BillDetailsProps = {
  bill: BillDetails
  compareTable?: boolean
}

const BillDetailsTable: React.FC<BillDetailsProps> = ({
  bill,
  compareTable,
}) => {
  const classes = useStyles()

  const ExpandableTableRow = (props: any) => {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
      <>
        <TableRow
          className={classes.expandableRow}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <TableCell padding="checkbox">
            <IconButton>{isExpanded ? <HyphenIcon /> : <AddIcon />}</IconButton>
          </TableCell>
          {props.children}
        </TableRow>
        {isExpanded &&
          props.expandedRows.map((row: any, i: number) => (
            <TableRow key={`${i}-${row.description}`}>
              <ExpandedRowCell padding="checkbox" />
              <ExpandedRowCell align="left">{row.description}</ExpandedRowCell>
              <ExpandedRowCell align="right">
                {formatAmountInDollar(row.value)}
              </ExpandedRowCell>
              {compareTable && (
                <ExpandedRowCell align="right">
                  {formatAmountInDollar(row.value2)}
                </ExpandedRowCell>
              )}
            </TableRow>
          ))}
      </>
    )
  }

  const renderTotalRows = () => {
    return (
      <>
        <TotalsRow>
          <TotalsCell></TotalsCell>
          <TotalsCell>Balance Forward</TotalsCell>
          <TotalsCell className={classes.totalValueCell} align="right">
            {formatAmountInDollar(bill.totals?.prior)}
          </TotalsCell>
          {compareTable && (
            <TotalsCell className={classes.totalValueCell} align="right">
              {formatAmountInDollar(bill.totals?.prior2)}
            </TotalsCell>
          )}
        </TotalsRow>
        <TotalsRow>
          <TotalsCell></TotalsCell>
          <TotalsCell>New Charges</TotalsCell>
          <TotalsCell className={classes.totalValueCell} align="right">
            {formatAmountInDollar(bill.totals?.current)}
          </TotalsCell>
          {compareTable && (
            <TotalsCell className={classes.totalValueCell} align="right">
              {formatAmountInDollar(bill.totals?.current2)}
            </TotalsCell>
          )}
        </TotalsRow>
        <TotalsRow>
          <TotalsCell></TotalsCell>
          <TotalsCell>Total Bill Amount</TotalsCell>
          <TotalsCell
            className={`${classes.totalAmountCell} ${classes.totalValueCell}`}
            align="right"
          >
            {formatAmountInDollar(bill.due?.amount)}
          </TotalsCell>
          {compareTable && (
            <TotalsCell
              className={`${classes.totalAmountCell} ${classes.totalValueCell}`}
              align="right"
            >
              {formatAmountInDollar(bill.due?.amount2)}
            </TotalsCell>
          )}
        </TotalsRow>
      </>
    )
  }
  return (
    <TableContainer>
      <StyledTable>
        <TableBody>
          {bill.sections.map((section) => (
            <ExpandableTableRow
              key={section.heading}
              expandedRows={section.rows}
            >
              <>
                <SectionRowCell align="left">{section.heading}</SectionRowCell>
                <SectionRowCell align="right">
                  ${section.heading_value}
                </SectionRowCell>
                {compareTable && (
                  <SectionRowCell align="right">
                    ${section.heading_value2}
                  </SectionRowCell>
                )}
              </>
            </ExpandableTableRow>
          ))}
          {renderTotalRows()}
        </TableBody>
      </StyledTable>
    </TableContainer>
  )
}

export default BillDetailsTable
