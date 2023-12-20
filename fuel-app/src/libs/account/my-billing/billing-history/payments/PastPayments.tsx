import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  makeStyles,
} from '@material-ui/core'
import { useState, useEffect, useMemo } from 'react'
import { CardWithTitle } from '@/shared-ui/components/Card/Card'
import { Typography } from '@/shared-ui/components'
import Pagination from 'src/libs/account/payments/shared/Pagination'
import colors from '@/shared-ui/colors'
import TableSkeleton from 'src/libs/account/shared/TableSkeleton'
import { IPastPayments, IPayment, PaymentTypes } from './types'
import clsx from 'classnames'
import { useWindowDimensions } from 'src/hooks'
import {
  StyledTableCell,
  StyledTableRow,
  StyledTableHeaderCell,
  RenderNoPayments,
} from './Table'
import { formPayments } from './helper'
import PaymentsAccordion from './PaymentsAccordion'
import { paymentsTable, errorMessages } from './sitecore-mock'
import ErrorMessage from 'src/libs/account/shared/ErrorMessage'
import moment from 'moment'
const PastedPaymentTable = ({
  historyPayments,
  failedPayments,
  loading,
  error,
}: IPastPayments) => {
  const { noPastPayments, pastPaymentsHeaders, pastPayments, returnedPayment } =
    paymentsTable
  const classes = useStyles()
  const { width } = useWindowDimensions()
  const isMobile = width <= 767
  const [currentPayments, setCurrentPayments] = useState([])
  const [paginationState, setPaginationState] = useState({
    currentPage: 1,
    paymentsPerPage: 10,
    loading: false,
  })
  const paginate = (pageNum: number) => {
    const updatePaginateState = {
      ...paginationState,
      currentPage: pageNum,
    }
    setPaginationState(updatePaginateState)
  }
  const payments = useMemo(() => {
    const history =
      historyPayments?.map((payment: any) =>
        formPayments(PaymentTypes.SchedulePayments, payment),
      ) || []
    const failed =
      failedPayments?.map((payment: any) =>
        formPayments(PaymentTypes.FailedPayments, payment),
      ) || []
    const sortedPayments = [...failed, ...history]
    sortedPayments.sort(
      (a: IPayment, b: IPayment) =>
        moment(b.rawDate).valueOf() - moment(a.rawDate).valueOf(),
    )
    return sortedPayments
  }, [historyPayments, failedPayments])
  const totalPayments = payments?.length ? payments.length : 0
  const paymentsPerPage = paginationState.paymentsPerPage

  useEffect(() => {
    const indexOfLastPayment =
      paginationState.currentPage * paginationState.paymentsPerPage
    const indexOfFirstPayment =
      (paginationState.currentPage - 1) * paginationState.paymentsPerPage
    if (payments && payments.length > 0) {
      const historyPaymentTemp: any = [...payments]
      setCurrentPayments(
        historyPaymentTemp.slice(indexOfFirstPayment, indexOfLastPayment),
      )
    }
  }, [payments, paginationState])

  const renderPaymentsTable = () => {
    if (currentPayments.length === 0)
      return <RenderNoPayments description={noPastPayments?.value} />
    if (isMobile)
      return (
        <PaymentsAccordion data={payments} type={PaymentTypes.PastPayments} />
      )
    return (
      <Table size="medium" aria-label="pasted payments">
        <TableHead>
          <TableRow>
            {pastPaymentsHeaders.map((s: any, i: number) => (
              <StyledTableHeaderCell component={'th'} key={`sp_${i}`}>
                <Typography fontType="boldFont">{s?.value}</Typography>
              </StyledTableHeaderCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPayments.map((payment: IPayment, i: number) => {
            return (
              <StyledTableRow key={`spd_${i}`}>
                <StyledTableCell>
                  <Typography>{payment?.date}</Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography
                    className={clsx({
                      [classes.declined]: payment.status === 'Declined',
                    })}
                  >
                    {payment.status}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography>
                    {payment.status == 'Chargeback'
                      ? returnedPayment?.value
                      : payment?.method}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography>{payment.amount}</Typography>
                </StyledTableCell>
              </StyledTableRow>
            )
          })}
        </TableBody>
      </Table>
    )
  }

  return (
    <CardWithTitle
      title={pastPayments?.value}
      className={classes.card}
      classNameTitle={classes.cardTitle}
      styleType="h5"
      tagType="h5"
    >
      <>
        {loading ? (
          <div className={classes.loadingCtrl}>
            <TableSkeleton rows={2} />
          </div>
        ) : error ? (
          <div className={classes.error}>
            <ErrorMessage message={errorMessages?.fetchFailed?.value} />
          </div>
        ) : (
          renderPaymentsTable()
        )}
        {paymentsPerPage < totalPayments && (
          <Pagination
            paymentsPerPage={paymentsPerPage}
            totalPayments={totalPayments}
            paginate={paginate}
            currentPage={paginationState.currentPage}
          />
        )}
      </>
    </CardWithTitle>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  loadingCtrl: {
    padding: '2rem',
  },
  error: {
    padding: '0rem 2rem',
    [breakpoints.down('xs')]: {
      padding: '1rem',
    },
  },
  card: {
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
  declined: {
    color: colors.main.inputError,
  },
  tableSpan: {
    fontStyle: 'italic',
    fontSize: '12px',
    color: colors.main.gray,
  },
  noPayments: {
    textAlign: 'center',
  },
}))

export default PastedPaymentTable
