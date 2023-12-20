import { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import BillingHeader from './BillingHeader'
import clsx from 'classnames'
import { Skeleton, Typography } from 'src/blitz'
import {
  Accordion,
  AccordionDetails,
  createStyles,
  makeStyles,
  withStyles,
} from '@material-ui/core'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import moment from 'moment'
import colors from 'src/styles/theme/colors'
import { Bill } from 'src/redux/types/billTypes'
import ErrorMessage from 'src/libs/account/shared/ErrorMessage'
import { fetchStatementsByDate } from 'src/redux/slicers/bills'
import { CardWithTitle } from 'src/blitz/components/Card/Card'
import { useAppData } from 'src/hooks'
import { MyBillTitle, SomethingWentWrong } from 'src/constants/billing'
import { pick } from 'src/utils/appData/dataExtractor'
import {
  useActiveAccountId,
  useBillList,
  useBillDetailsByDate,
  useCurrentBill,
  useAccountList,
  useActiveAccount,
} from 'src/selector-hooks'

const CurrentStatementHeader = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const billingConstants = useAppData('autoPayCard', false)
  const { isLoading: isAccountsLoading, error: isAccountsError } =
    useAccountList()
  const { isLoading: isAccountLoading, error: isAccountError } =
    useActiveAccount()
  const [selectedStatement, setSelectedStatement] = useState<Bill | null>(null)
  const activeAccountId = useActiveAccountId()
  const detailedStatements = useBillDetailsByDate()
  const currentBill = useCurrentBill()
  const statements = useBillList()
  const currentBillFound = Object.keys(currentBill?.data).length > 0

  useEffect(() => {
    if (
      !statements.isLoading &&
      statements.data?.length > 0 &&
      !statements.error &&
      !selectedStatement
    ) {
      onStatementSelect(statements.data[0], true)
    }
  }, [statements])

  const selectedStatementDetails = useMemo(() => {
    let selectedStatementDetails =
      detailedStatements.data[selectedStatement?.date || '']
    if (statements.data.length === 0 && currentBillFound) {
      selectedStatementDetails = currentBill.data
    }
    return selectedStatementDetails
  }, [currentBillFound, selectedStatement, detailedStatements])

  const onStatementSelect = (statement: Bill, stopTracking = false) => {
    const STATEMENT_DATE_EVENT_NAME = 'my account:change statement date'
    if (!stopTracking) {
      DTMClient.triggerEvent(
        {
          events: 'event14',
          eVar14: STATEMENT_DATE_EVENT_NAME,
        },
        'tl_o',
        STATEMENT_DATE_EVENT_NAME,
      )
    }
    setSelectedStatement(statement)
    dispatch(fetchStatementsByDate(activeAccountId, statement.date))
  }

  const error =
    isAccountError ||
    detailedStatements.error ||
    statements.error ||
    currentBill.error ||
    isAccountsError

  const loading =
    isAccountsLoading ||
    isAccountLoading ||
    detailedStatements.isLoading ||
    statements.isLoading ||
    currentBill.isLoading

  const renderStatement = () => {
    if (loading)
      return (
        <>
          <Skeleton height={30} />
          <Skeleton height={30} />
          <Skeleton height={30} />
        </>
      )
    else if (error)
      return (
        <div className={classes.errorMessageWrapper}>
          <ErrorMessage
            message={pick(SomethingWentWrong, billingConstants)}
            styleType="p2"
          />
        </div>
      )
    else {
      if (selectedStatementDetails) {
        return (
          <div className={classes.billSection}>
            <div className={classes.accordionSummary}>
              <Typography styleType="h5" tagType="h5">
                <>
                  {moment(
                    new Date(
                      selectedStatementDetails.statementPeriod.split('to')[0],
                    ),
                  ).format('MMM DD')}{' '}
                  -{' '}
                  {moment(
                    new Date(
                      selectedStatementDetails.statementPeriod.split('to')[1],
                    ),
                  ).format('MMM DD, yyyy')}
                </>
              </Typography>
              <Typography
                styleType="h5"
                tagType="h5"
                className={classes.totalAmount}
              >
                <>${selectedStatementDetails.totals.current}</>
              </Typography>
            </div>
            {selectedStatementDetails.sections.map((section, i) => (
              <Accordion
                key={`${i}-${section.heading}`}
                className={classes.root}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id={`panel1a-header-${i}`}
                  className={classes.accordionSummary}
                >
                  <Typography
                    className={classes.summaryHeading}
                    styleType="h6"
                    tagType="h5"
                  >
                    {section.heading}
                  </Typography>
                  <Typography styleType="h6" tagType="div">
                    <>$ {section.heading_value}</>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.accordianDetails}>
                  {section.rows &&
                    section.rows.map((row, i) => (
                      <div
                        key={`${i}-${row.description}`}
                        className={clsx(classes.sectionRow, {
                          [classes.lastRow]: section.rows?.length !== i + 1,
                        })}
                      >
                        <Typography styleType="p2" tagType="div">
                          {row.description}
                        </Typography>
                        <Typography styleType="p2" tagType="div">
                          <>${row.value}</>
                        </Typography>
                      </div>
                    ))}
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        )
      } else {
        return (
          <div className={classes.errorMessageWrapper}>
            <ErrorMessage
              message={pick('noStatement', billingConstants)}
              styleType="p2"
            />
          </div>
        )
      }
    }
  }

  const renderCurrentBill = () => {
    return (
      <>
        <BillingHeader
          selectedStatement={selectedStatement}
          onStatementSelect={onStatementSelect}
        />
        {renderStatement()}
      </>
    )
  }

  return (
    <CardWithTitle title={pick(MyBillTitle, billingConstants)} styleType="h5">
      {renderCurrentBill()}
    </CardWithTitle>
  )
}

export default CurrentStatementHeader

const AccordionSummary = withStyles({
  root: {},
  content: {
    '& $expanded': {
      margin: '1.5rem 0 1rem 0',
    },
  },
  expandIcon: {
    margin: '0px -0.25rem 0 0.5rem',
    padding: 0,
  },
})(MuiAccordionSummary)

const useStyles = makeStyles(({ breakpoints }) =>
  createStyles({
    root: {
      boxShadow: 'none',
      borderTop: 'none',
      borderRadius: 0,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderBottom: `1px solid ${colors.main.grey}`,
      '&::before': {
        display: 'none',
      },
      '&:last-child': {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      },
    },
    loaderContainer: {
      margin: '20px 0 0 0',
    },
    totalAmount: {
      paddingRight: '28px',
    },
    accordionSummary: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      textTransform: 'capitalize',
      textAlign: 'left',
      padding: 0,
      borderTop: 'none',
      '& svg': {
        fill: colors.main.midnightExpress,
        '&:hover': {
          fill: colors.main.brightRed,
        },
      },
      '& .MuiAccordionSummary-content': {
        margin: '1.5rem 0 1rem 0',
      },
    },
    accordianDetails: {
      background: colors.main.backgroundGray,
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 32px 24px 32px',
      [breakpoints.down('sm')]: {
        padding: '16px 32px 16px 32px',
      },
    },
    sectionRow: {
      display: 'flex',
      justifyContent: 'space-between',
      textTransform: 'capitalize',
      textAlign: 'left',
      padding: '0',
    },
    lastRow: {
      marginBottom: '0.5rem',
    },
    summaryHeading: {
      flex: 1,
      textAlign: 'left',
    },
    billSection: {
      padding: '2rem 0 1rem 0',
      [breakpoints.down('xs')]: {
        padding: '1rem 0 1rem 0',
      },
    },
    errorMessageWrapper: {
      paddingTop: '2rem',
      [breakpoints.down('xs')]: {
        paddingTop: '1rem',
      },
    },
  }),
)
