import colors from '@/shared-ui/colors'
import { Typography } from '@/shared-ui/components'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  withStyles,
  makeStyles,
} from '@material-ui/core'

export const StyledTableRow = withStyles(() => ({
  root: {
    '&:last-child': {
      '& td': {
        borderBottom: 'none',
      },
    },
  },
}))(TableRow)

export const StyledTableCell = withStyles(({ breakpoints }) => ({
  root: {
    padding: '0.5rem 0.5rem 0.5rem 1rem',
    '&:first-child': {
      paddingLeft: '2rem',
    },
    '&:last-child': {
      paddingRight: '2rem',
    },
    [breakpoints.down('xs')]: {
      '&:first-child': {
        paddingLeft: '1rem',
      },
      '&:last-child': {
        paddingRight: '1rem',
      },
    },
  },
}))(TableCell)

export const StyledTableHeaderCell = withStyles(() => ({
  root: {
    padding: '1rem',
    '&:not(:first-child)': {
      '& div:before': {
        content: '""',
        position: 'relative',
        borderLeft: `1px solid ${colors.main.borderGrey}`,
        left: '-1rem',
      },
    },
    '&:first-child': {
      paddingLeft: '2rem',
    },
    '&:last-child': {
      paddingRight: '2rem',
    },
  },
}))(TableCell)

export const StyledHeaderTableCell = withStyles(() => ({
  root: {
    padding: 8,
  },
}))(TableCell)

const useStyles = makeStyles(() => ({
  noPayments: {
    borderTop: `1px solid ${colors.main.borderGrey}`,
  },
}))

export const RenderNoPayments = ({ description = '' }: any) => {
  const classes = useStyles()
  return (
    <Table size="medium" aria-label="description">
      <TableBody>
        <StyledTableRow>
          <StyledTableCell className={classes.noPayments}>
            <Typography styleType="p2">{description}</Typography>
          </StyledTableCell>
        </StyledTableRow>
      </TableBody>
    </Table>
  )
}
