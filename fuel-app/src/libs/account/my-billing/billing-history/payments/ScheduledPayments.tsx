/* eslint-disable */
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  makeStyles,
} from '@material-ui/core'
import { CardWithTitle, Typography } from '@/shared-ui/components'
import { useMemo, useState } from 'react'
import { Edit, Delete } from '@/shared-ui/react-icons'
import colors from '@/shared-ui/colors'
import { paymentsTable, errorMessages } from './sitecore-mock'
import { PaymentPageModals, IPayment } from './types'
import PaymentModal from './PaymentModal'
import ErrorMessage from 'src/libs/account/shared/ErrorMessage'
import { PaymentHistory } from 'src/redux/types/payments'
import TableSkeleton from 'src/libs/account/shared/TableSkeleton'
import {
  StyledTableCell,
  StyledTableRow,
  StyledTableHeaderCell,
  RenderNoPayments,
} from './Table'
import { PaymentTypes } from './types'
import PaymentsAccordion from './PaymentsAccordion'
import { formPayments } from './helper'
import { useWindowDimensions } from 'src/hooks'
const ScheduledPayments = ({ scheduledPaymentData, loading, error }: any) => {
  const classes = useStyles()
  const { width } = useWindowDimensions()
  const isMobile = width <= 767
  const [modal, setModal] = useState<PaymentPageModals>(PaymentPageModals.Init)
  const [payment, setPayment] = useState<PaymentHistory>()

  const cancelPayment = (data: PaymentHistory) => {
    setPayment(data)
    setModal(PaymentPageModals.CancelPayment)
  }

  const editPayment = (data: PaymentHistory) => {
    setPayment(data)
    setModal(PaymentPageModals.EditPayment)
  }

  const { noSchedulePayments, schedulePaymentHeaders, scheduledPayments } =
    paymentsTable

  const payments = useMemo(() => {
    return (
      scheduledPaymentData?.map((payment: any) =>
        formPayments(PaymentTypes.SchedulePayments, payment),
      ) || []
    )
  }, [scheduledPaymentData])

  const renderPaymentsTable = () => {
    if (scheduledPaymentData.length === 0)
      return <RenderNoPayments description={noSchedulePayments?.value} />
    if (isMobile)
      return (
        <PaymentsAccordion
          data={payments}
          type={PaymentTypes.SchedulePayments}
          editPayment={editPayment}
          cancelPayment={cancelPayment}
        />
      )
    return (
      <div className={classes.tableWrapper}>
        <Table size="medium" aria-label="schedule payments">
          <TableHead>
            <TableRow>
              {schedulePaymentHeaders?.map((s: any, i: number) => (
                <StyledTableHeaderCell component={'th'} key={`sp_${i}`}>
                  <Typography fontType="boldFont">{s?.value}</Typography>
                </StyledTableHeaderCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((s: IPayment, i: number) => (
              <StyledTableRow key={`spd_${i}`}>
                <StyledTableCell>
                  <Typography>{s?.date}</Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography>{s.status}</Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography>{s.method}</Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography>{s.amount}</Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography>
                    {!['Cancelled', 'Pending', 'In Process'].includes(
                      s?.status,
                    ) ? (
                      <div className={classes.actionsWrapper}>
                        <button
                          onClick={() => editPayment(s.payment)}
                          className={classes.transparentBtn}
                        >
                          <Edit />
                        </button>
                        <button
                          onClick={() => cancelPayment(s.payment)}
                          className={classes.transparentBtn}
                        >
                          <Delete />
                        </button>
                      </div>
                    ) : (
                      ''
                    )}
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }
  return (
    <>
      <CardWithTitle
        title={scheduledPayments?.value}
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
        </>
      </CardWithTitle>
      <PaymentModal
        modal={modal}
        setModal={setModal}
        payment={payment}
        setPayment={setPayment}
      />
    </>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  loadingCtrl: {
    padding: '2rem',
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
  tableWrapper: {
    maxHeight: '210px',
    overflowY: 'scroll',
  },
  noPayments: {
    textAlign: 'center',
    borderTop: `px solid ${colors.main.darkGray}`,
    borderBottom: `px solid ${colors.main.darkGray}`,
  },
  actionsWrapper: {
    display: 'flex',
    gap: '1rem',
  },
  transparentBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    '&:hover': {
      '& svg': {
        '& path': {
          fill: colors.main.brightRed,
        },
      },
    },
    '& svg': {
      width: 20,
    },
  },
  error: {
    padding: '0rem 2rem',
    [breakpoints.down('xs')]: {
      padding: '1rem',
    },
  },
}))

export default ScheduledPayments
