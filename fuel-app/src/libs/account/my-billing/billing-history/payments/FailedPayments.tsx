import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  makeStyles,
} from '@material-ui/core'
import { CardWithTitle } from '@/shared-ui/components/Card/Card'
import { paymentsTable } from 'src/libs/account/my-billing/billing-history/payments/sitecore-mock'
import { IFailedPaymentHistory } from 'src/redux/types/payments'
import { IFailedPayments, PaymentTypes, IPayment } from './types'
import { Typography } from '@/shared-ui/components'
import { StyledTableCell, StyledTableRow, StyledTableHeaderCell } from './Table'
import { useMemo } from 'react'
import { formPayments } from './helper'
import { useWindowDimensions } from 'src/hooks'
import PaymentsAccordion from './PaymentsAccordion'
import colors from '@/shared-ui/colors'
const FailedPayments = ({ data, loading }: IFailedPayments) => {
  const classes = useStyles()
  const { failedPaymentsHeaders, failedPayments } = paymentsTable
  const { width } = useWindowDimensions()
  const isMobile = width <= 767
  const payments = useMemo(() => {
    return (
      data?.map((payment: IFailedPaymentHistory) =>
        formPayments(PaymentTypes.FailedPayments, payment),
      ) || []
    )
  }, [data])
  if (loading || payments?.length === 0) return null
  return (
    <CardWithTitle
      title={failedPayments?.value}
      className={classes.root}
      classNameTitle={classes.cardTitle}
      styleType="h5"
      tagType="h5"
    >
      {isMobile ? (
        <PaymentsAccordion data={payments} type={PaymentTypes.FailedPayments} />
      ) : (
        <Table size="medium" aria-label="failed payments">
          <TableHead>
            <TableRow>
              {failedPaymentsHeaders.map((s: any, i: number) => (
                <StyledTableHeaderCell component={'th'} key={`sp_${i}`}>
                  <Typography fontType="boldFont">{s?.value}</Typography>
                </StyledTableHeaderCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {payments?.map((payment: IPayment, i: number) => {
              return (
                <StyledTableRow key={`spd_${i}`}>
                  <StyledTableCell>
                    <Typography styleType="p2">{payment.date}</Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography>{payment?.method}</Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography>{payment?.message}</Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography>{payment.amount}</Typography>
                  </StyledTableCell>
                </StyledTableRow>
              )
            })}
          </TableBody>
        </Table>
      )}
    </CardWithTitle>
  )
}
const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    padding: 0,
    paddingBottom: '2rem',
  },
  cardTitle: {
    padding: '1rem 2rem',
    [breakpoints.down('xs')]: {
      padding: '1rem',
      borderBottom: `1px solid ${colors.main.borderGrey}`,
    },
  },
}))
export default FailedPayments
