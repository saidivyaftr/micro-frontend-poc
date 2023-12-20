/* eslint-disable */
import clsx from 'classnames'
import { paymentsTable } from 'src/libs/account/my-billing/billing-history/payments/sitecore-mock'
import colors from 'src/styles/theme/colors'
import { Typography } from '@/shared-ui/components'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Edit, Delete } from '@/shared-ui/react-icons'
import {
  Accordion,
  AccordionDetails,
  makeStyles,
  AccordionSummary,
} from '@material-ui/core'
import { IPayment, PaymentTypes } from './types'
import useAppData from '@/shared-ui/hooks/useAppData'
type IPaymentAccordion = {
  data: IPayment[]
  type: PaymentTypes
  editPayment?: any
  cancelPayment?: any
}
const PaymentsAccordion = ({
  data,
  editPayment,
  cancelPayment,
  type,
}: IPaymentAccordion) => {
  const classes = useStyles()
  const paymentsData: any = paymentsTable
  const { schedulePaymentHeaders } = useAppData(
    'paymentsTable',
    false,
    paymentsData,
  )
  return (
    <>
      {data?.map((payment: IPayment, i: number) => {
        return (
          <Accordion className={clsx({
            [classes.lastAccordion]: (i === data.length - 1)
          })} key={`panel1a-header-${i}`} classes={{
            root:classes.root,
            expanded: classes.accordionExpanded
          }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id={`panel1a-header-${i}`}
              classes={{
                root:classes.accordionSummary,
                content: classes.accordionSummaryContent,
                expanded: classes.accordionSummaryExpanded,
                expandIcon: classes.expandIcon,
              }}
            >
              <Typography styleType="p3" tagType="h6" fontType="boldFont">
                {schedulePaymentHeaders?.[0]?.value}
              </Typography>
              <Typography styleType="p3" tagType="p">
                {payment?.date}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
              <div className={classes.paymentWrapper}>
                <Typography styleType="p3" tagType="h6" fontType="boldFont">{schedulePaymentHeaders?.[1]?.value}
                </Typography>
                <Typography
                  styleType="p3"
                  tagType="p"
                  className={clsx({
                    [classes.declined]: payment.status === 'Declined',
                  })}
                >
                  {payment?.status}
                </Typography>
              </div>
              <div className={classes.paymentWrapper}>
                <Typography styleType="p3" tagType="h6" fontType="boldFont">
                  {schedulePaymentHeaders?.[2]?.value}
                </Typography>
                <Typography styleType="p3" tagType="p">
                  {payment?.method}
                </Typography>
              </div>
              <div className={classes.paymentWrapper}>
                <Typography styleType="p3" tagType="h6" fontType="boldFont">
                  {schedulePaymentHeaders?.[3]?.value}
                </Typography>
                <Typography styleType="p3" tagType="p">
                  {payment?.amount}
                </Typography>
              </div>
              {type === PaymentTypes.SchedulePayments &&
                payment.status !== 'Cancelled' &&
                payment.status !== 'Pending' && (
                  <div className={classes.paymentWrapper}>
                    <Typography styleType="p3" tagType="h6" fontType="boldFont">
                      {schedulePaymentHeaders?.[4]?.value}
                    </Typography>
                    <Typography>
                      <div className={classes.actionsWrapper}>
                        <button
                          onClick={() => editPayment(payment?.payment)}
                          className={classes.transparentBtn}
                        >
                          <Edit />
                        </button>
                        <button
                          onClick={() => cancelPayment(payment.payment)}
                          className={classes.transparentBtn}
                        >
                          <Delete />
                        </button>
                      </div>
                    </Typography>
                  </div>
                )}
            </AccordionDetails>
          </Accordion>
        )
      })}
    </>
  )
}
const useStyles = makeStyles(({breakpoints}) => ({
  root: {
    boxShadow: 'none',
    borderTop: 'none',
    borderRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottom: `1px solid ${colors.main.borderGrey}`,
    margin:'0',
    '&::before': {
      display: 'none',
    },
    '&:last-child': {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
  },
  accordionExpanded:{
    margin:'0 !important',
  },
  lastAccordion:{
    borderBottom: `none`,
  },
  accordionDetails: {
    flexDirection: 'column',
    gap: '1rem',
    padding: '0 1rem 1rem',
  },
  accordionSummary:{
    position:"relative",
    padding:"1rem",
    justifyContent: 'space-between',
  },
  accordionSummaryContent:{
    justifyContent: 'space-between',
    gap: '1rem',
    margin: 0,
    '&$expanded': {
      margin: 0,
    },
    '& h6,p': {
      width: "calc(50% - 0.5rem)",
      margin: 0,
    },
    '& p':{
      marginRight: "auto"
    }
  },
  accordionSummaryExpanded:{
    margin: '0 !important',
    minHeight: "auto !important",
  },
  declined: {
    color: colors.main.inputError,
  },
  paymentWrapper: {
    display: 'flex',
    gap: '1rem',
    '& h6,p': {
      margin: 0,
      width:'calc(50% - .5rem)'
    },
  },
  actionsWrapper: {
    display: 'flex',
    gap: '1rem',
    [breakpoints.down("xs")]:{
      gap: '2rem',
    }
  },
  expandIcon:{
    position: "absolute",
    margin: 0,
    right: 0
  },
  transparentBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    '&:hover': {
      '& svg': {
        '& path': {
          fill: colors.main.brightRed,
        },
      },
    },
    '& svg': {
      width: 20,
      height: 20,
    },
  },
}))
export default PaymentsAccordion
