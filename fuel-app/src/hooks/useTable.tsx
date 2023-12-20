/* eslint-disable @typescript-eslint/indent */
import React, { useState } from 'react'
import {
  makeStyles,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  TableProps,
  TableHeadProps,
  Paper,
  TableContainer,
  withStyles,
  TableRowProps,
} from '@material-ui/core'
import colors from 'src/styles/theme/colors'

const useStyles = makeStyles(() => ({
  table: {
    '& thead th': {
      fontWeight: '600',
    },
    '& thead th .MuiTableSortLabel-root': {
      '&:hover': {
        color: colors.main.opaqueWhite,
        '& .MuiTableSortLabel-icon': {
          color: colors.main.opaqueWhite,
        },
      },
      '&.MuiTableSortLabel-active.MuiTableSortLabel-root.MuiTableSortLabel-active':
        {
          color: colors.main.white,
          '& .MuiTableSortLabel-icon': {
            color: colors.main.opaqueWhite,
          },
          '&:hover': {
            color: colors.main.opaqueWhite,
            '& .MuiTableSortLabel-icon': {
              color: colors.main.opaqueWhite,
            },
          },
        },
    },
    '& thead th .MuiTableSortLabel-root.MuiTableSortLabel-active.MuiTableSortLabel-root.MuiTableSortLabel-active':
      {
        color: colors.main.white,
        '& .MuiTableSortLabel-icon': {
          color: 'rgba(255,255,255,0.6)',
        },
        '&:hover': {
          color: 'rgba(255,255,255,0.6)',
          '& .MuiTableSortLabel-icon': {
            color: 'rgba(255,255,255,0.6)',
          },
        },
      },
  },
}))

type HeadCell = { id: string; label: string; sortable?: boolean }

type Records<G> = () => Array<G>

type Comparator<R> = (
  a: R,
  b: R,
  order?: 'asc' | 'desc',
  orderBy?: string,
) => number

type UseTableReturnType<R> = {
  FrontierTable: React.FC<TableProps>
  FrontierTableHead: React.FC<TableHeadProps>
  FrontierTableCell: typeof FrontierTableCell
  FrontierTableRow: React.FC<TableRowProps> | typeof StripedTableRow
  recordsToRender: Records<R>
}

const FrontierTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell)

const StripedTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow)

export default function useTable<T>(
  records: Array<T>,
  headCells: Array<HeadCell>,
  stripedTable = false,
  comparator?: Comparator<T>,
): UseTableReturnType<T> {
  const classes = useStyles()
  const [order, setOrder] = useState<'asc' | 'desc'>()
  const [orderBy, setOrderBy] = useState<string | undefined>()

  const FrontierTable: React.FC<TableProps> = ({
    className,
    stickyHeader,
    children,
    ...rest
  }) => (
    <TableContainer component={Paper}>
      <Table
        className={`${classes.table} ${className}`}
        stickyHeader={stickyHeader}
        {...rest}
      >
        {children}
      </Table>
    </TableContainer>
  )

  const FrontierTableHead: React.FC<TableHeadProps> = (props) => {
    const handleSortRequest = (cellId: string) => {
      const isAsc = orderBy === cellId && order === 'asc'
      setOrder(isAsc ? 'desc' : 'asc')
      setOrderBy(cellId)
    }

    return (
      <TableHead {...props}>
        <TableRow>
          {headCells.map(({ id, label, sortable }) => (
            <FrontierTableCell
              key={id}
              sortDirection={orderBy === id ? order : undefined}
            >
              {sortable ? (
                <TableSortLabel
                  active={orderBy === id}
                  direction={orderBy === id ? order : 'asc'}
                  onClick={() => {
                    handleSortRequest(id)
                  }}
                >
                  {label}
                </TableSortLabel>
              ) : (
                label
              )}
            </FrontierTableCell>
          ))}
        </TableRow>
      </TableHead>
    )
  }

  const tableSort = (list: typeof records, comparator: Comparator<T>) => {
    const listWithIndex: Array<[T, number]> = list.map((el, index) => [
      el,
      index,
    ])
    listWithIndex.sort((a, b) => {
      const ordered = comparator(a[0], b[0], order, orderBy)
      if (ordered !== 0) return ordered
      return a[1] - b[1]
    })
    return listWithIndex.map((el) => el[0])
  }

  const sortedRecords = () => {
    return comparator ? tableSort(records, comparator) : records
  }

  return {
    FrontierTable,
    FrontierTableHead,
    FrontierTableCell,
    FrontierTableRow: stripedTable ? StripedTableRow : TableRow,
    recordsToRender: sortedRecords,
  }
}
