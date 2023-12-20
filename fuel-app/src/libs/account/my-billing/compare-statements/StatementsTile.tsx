import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Skeleton, Typography, Button } from 'src/blitz'
import clx from 'classnames'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  createStyles,
  makeStyles,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import colors from 'src/styles/theme/colors'
import { Bill, Section, BillDetails } from 'src/redux/types/billTypes'
import ErrorMessage from 'src/libs/account/shared/ErrorMessage'
import { LeftArrowIcon } from '@/shared-ui/react-icons'
import { fetchCompareBills } from 'src/redux/slicers/bills'
import { CardWithTitle } from 'src/blitz/components/Card/Card'
import { Statements as StatementsLables } from './sitecore-mock'
import CompareStatementsHeader from './CompareStatementsHeader'
import CompareStatementsSummary from './CompareStatementsSummary'
import {
  useActiveAccountId,
  useBillList,
  useBillDetailsByDate,
  useAccountList,
} from 'src/selector-hooks'
import { useRouter } from 'next/router'
import { AppRoutes } from 'src/constants'
import { formatAmountInDollar } from 'src/utils/amount'

const StatementsTile = () => {
  const classes = useStyles()
  const router = useRouter()
  const dispatch = useDispatch()
  const { somethingWentWrong, noStatement, backToHistory } = StatementsLables
  const { isLoading: isAccountsLoading } = useAccountList()
  const [selectedStatementPrimary, setSelectedStatementPrimary] =
    useState<Bill | null>(null)
  const [selectedStatementSecondry, setSelectedStatementSecondry] =
    useState<Bill | null>(null)
  const activeAccountId = useActiveAccountId()
  const statements = useBillList()
  const detailedStatements = useBillDetailsByDate()
  const getStatementFromDate = (date: string) => {
    return statements.data?.find((obj: Bill) => obj.date === date) ?? null
  }
  useEffect(() => {
    if (
      !statements.isLoading &&
      statements.data.length &&
      !selectedStatementPrimary &&
      !selectedStatementSecondry
    ) {
      // Get the query string from window.location
      const queryString = window.location.search

      const params = new URLSearchParams(queryString)
      const primaryDate = params.get('primary') ?? ''
      const secondryDate = params.get('secondry') ?? ''
      if (
        Boolean(getStatementFromDate(primaryDate)) &&
        Boolean(getStatementFromDate(secondryDate))
      ) {
        setSelectedStatementPrimary(getStatementFromDate(primaryDate))
        setSelectedStatementSecondry(getStatementFromDate(secondryDate))
        dispatch(fetchCompareBills(activeAccountId, primaryDate, secondryDate))
      } else {
        setSelectedStatementPrimary(statements?.data[0])
        setSelectedStatementSecondry(statements?.data[1])
        dispatch(
          fetchCompareBills(
            activeAccountId,
            statements?.data[0].date,
            statements?.data[1]?.date,
          ),
        )
      }
    }
  }, [statements])

  useEffect(() => {
    if (selectedStatementPrimary && selectedStatementSecondry) {
      dispatch(
        fetchCompareBills(
          activeAccountId,
          selectedStatementPrimary?.date,
          selectedStatementSecondry?.date,
        ),
      )
    }
  }, [selectedStatementPrimary, selectedStatementSecondry])
  const onPrimaryStatementSelect = (statement: Bill) => {
    setSelectedStatementPrimary(statement)
  }

  const onSecondryStatementSelect = (statement: Bill) => {
    setSelectedStatementSecondry(statement)
  }

  const getMonthName = (statementDate: string) => {
    const date = new Date(statementDate)
    const monthNameAbbreviated = date.toLocaleString('default', {
      month: 'short',
    })
    return monthNameAbbreviated
  }

  function getDescriptionValue(
    sectionHeading: string,
    description: string,
    data: Array<Section>,
  ): string | undefined {
    const section = data.find((section) => section.heading === sectionHeading)
    const row = section?.rows?.find((row) => row.description === description)
    return row ? row.value : undefined
  }

  const getHeadingValue = (key: string, data: Array<Section>) => {
    const row = data.find((section) => section.heading === key)
    return row ? row.heading_value : undefined
  }

  const getStatementsComparison = (
    selectedStatementDetails: BillDetails,
    selectedStatementDetailsSecondry: BillDetails,
  ) => {
    const headings1 = selectedStatementDetails.sections.map(
      (section) => section?.heading,
    )
    const headings2 = selectedStatementDetailsSecondry.sections.map(
      (section) => section?.heading,
    )

    const allHeadings = Array.from(new Set([...headings1, ...headings2]))

    const uniqueSuperset: {
      heading: string
      rows: { description: string }[]
    }[] = []

    allHeadings.forEach((heading) => {
      const descriptions1 = selectedStatementDetails?.sections
        .filter((section) => section?.heading === heading)
        .flatMap((section) => section?.rows?.map((row) => row.description))

      const descriptions2 = selectedStatementDetailsSecondry?.sections
        .filter((section) => section?.heading === heading)
        .flatMap((section) => section?.rows?.map((row) => row.description))

      const allDescriptions = Array.from(
        new Set([...descriptions1, ...descriptions2]),
      )

      const supersetEntry = {
        heading,
        rows: allDescriptions.map((description) => ({ description })),
      }

      uniqueSuperset.push(supersetEntry)
    })
    return uniqueSuperset
  }

  const renderStatement = () => {
    if (
      isAccountsLoading ||
      detailedStatements.isLoading ||
      statements.isLoading ||
      !activeAccountId ||
      !selectedStatementPrimary ||
      !selectedStatementSecondry
    )
      return (
        <>
          <Skeleton height={30} width={200} />
          <Skeleton height={30} width={150} />
        </>
      )
    else if (detailedStatements.error || !selectedStatementPrimary)
      return (
        <div className={classes.errorWrapper}>
          <ErrorMessage message={somethingWentWrong?.value} />
        </div>
      )
    else {
      const selectedStatementDetails =
        detailedStatements.data[selectedStatementPrimary?.date || '']
      const selectedStatementDetailsSecondry =
        detailedStatements.data[selectedStatementSecondry?.date || '']
      if (!selectedStatementDetails || !selectedStatementDetailsSecondry)
        return (
          <div className={classes.errorWrapper}>
            <ErrorMessage message={noStatement?.value} />
          </div>
        )
      if (selectedStatementDetails && selectedStatementDetailsSecondry) {
        const comparisionData = getStatementsComparison(
          selectedStatementDetails,
          selectedStatementDetailsSecondry,
        )
        return (
          <div className={classes.billSection}>
            <div className={clx(classes.monthsLabels)}>
              <div className={clx(classes.monthLabel)}>
                <Typography
                  className={clx(classes.monthTitle)}
                  styleType="p2"
                  tagType="div"
                  fontType="boldFont"
                >
                  {getMonthName(selectedStatementPrimary?.date)}
                </Typography>
              </div>
              <div className={clx(classes.monthLabel)}>
                <Typography
                  className={clx(classes.monthTitle)}
                  styleType="p2"
                  tagType="div"
                  fontType="boldFont"
                >
                  {getMonthName(selectedStatementSecondry?.date)}
                </Typography>
              </div>
            </div>
            {comparisionData.map((section, i) => (
              <Accordion
                key={`${i}-${section.heading}`}
                className={classes.root}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id={`panel1a-header-${i}`}
                  className={classes.accordianSummary}
                >
                  <Typography
                    className={clx(
                      classes.summaryHeading,
                      classes.headingSectionColumn,
                    )}
                    styleType="h6"
                    tagType="h5"
                  >
                    {section.heading}
                  </Typography>
                  <Typography
                    className={classes.headingSectionColumn}
                    styleType="h6"
                    tagType="div"
                  >
                    <>
                      {formatAmountInDollar(
                        getHeadingValue(
                          section?.heading,
                          selectedStatementDetails?.sections,
                        ),
                      )}
                    </>
                  </Typography>
                  <Typography
                    className={classes.headingSectionColumn}
                    styleType="h6"
                    tagType="div"
                  >
                    <>
                      {formatAmountInDollar(
                        getHeadingValue(
                          section?.heading,
                          selectedStatementDetailsSecondry?.sections,
                        ),
                      )}
                    </>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.accordianDetails}>
                  {section.rows &&
                    section.rows.map((row, j) => (
                      <div
                        key={`${j}-${row.description}`}
                        className={classes.sectionRow}
                      >
                        <Typography
                          className={classes.sectionColumn}
                          styleType="p2"
                          tagType="div"
                        >
                          {row?.description}
                        </Typography>
                        <Typography
                          className={classes.sectionColumn}
                          styleType="p2"
                          tagType="div"
                        >
                          <>
                            {formatAmountInDollar(
                              getDescriptionValue(
                                section?.heading,
                                row?.description,
                                selectedStatementDetails?.sections,
                              ),
                            )}
                          </>
                        </Typography>
                        <Typography
                          className={classes.sectionColumn}
                          styleType="p2"
                          tagType="div"
                        >
                          <>
                            {formatAmountInDollar(
                              getDescriptionValue(
                                section?.heading,
                                row?.description,
                                selectedStatementDetailsSecondry?.sections,
                              ),
                            )}
                          </>
                        </Typography>
                      </div>
                    ))}
                </AccordionDetails>
              </Accordion>
            ))}
            <CompareStatementsSummary
              selectedStatementPrimary={selectedStatementDetails}
              selectedStatementSecondry={selectedStatementDetailsSecondry}
            />

            <Button
              className={classes.btn}
              buttonSize="large"
              text={
                <div className={classes.btnLabel}>
                  <LeftArrowIcon color={colors.main.white} />
                  <div>{backToHistory?.value}</div>
                </div>
              }
              type="button"
              onClick={() => {
                let query = undefined
                if (router.query.account) {
                  query = { account: router.query.account }
                }
                router.push({
                  pathname: AppRoutes.BillingHistory,
                  query,
                })
              }}
            />
          </div>
        )
      }
    }
  }

  const renderCurrentBill = () => {
    return (
      <>
        <CompareStatementsHeader
          selectedStatementPrimary={selectedStatementPrimary}
          onStatementSelectPrimary={onPrimaryStatementSelect}
          selectedStatementSecondry={selectedStatementSecondry}
          onStatementSelectSecondry={onSecondryStatementSelect}
        />
        {renderStatement()}
      </>
    )
  }
  return <CardWithTitle styleType="h5">{renderCurrentBill()}</CardWithTitle>
}

export default StatementsTile

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
      marginTop: '1rem',
      '&:last-child': {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      },
    },
    loaderContainer: {
      margin: '20px 0 0 0',
    },
    accordianSummary: {
      width: '100%',
      display: 'flex',
      minHeight: '64px',
      justifyContent: 'flex-end',
      textTransform: 'capitalize',
      textAlign: 'right',
      padding: 0,
      borderTop: 'none',
      [breakpoints.down('xs')]: {
        paddingRight: '.5rem',
      },
      '& .MuiButtonBase-root': {
        [breakpoints.down('xs')]: {
          padding: 0,
        },
      },
      '& .MuiAccordionSummary-content': {
        margin: '16px 0',
        [breakpoints.down('xs')]: {
          margin: 0,
        },
      },
    },
    accordianDetails: {
      background: colors.main.grey,
      borderRadius: '.5rem',
      display: 'flex',
      flexDirection: 'column',
      [breakpoints.down('xs')]: {
        gap: '.5rem',
        padding: '1rem 1.5rem 1rem .5rem',
      },
    },
    sectionRow: {
      display: 'flex',
      justifyContent: 'flex-end',
      textAlign: 'right',
      textTransform: 'capitalize',
      padding: '1rem 1rem 0 0',
      [breakpoints.down('xs')]: {
        padding: 0,
        gap: '.5rem',
      },
    },
    sectionColumn: {
      flex: 1,
      alignSelf: 'center',
      justifyContent: 'flex-end',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      textAlign: 'right',
      '&:first-child': {
        flex: 3,
        textAlign: 'left',
        [breakpoints.down('xs')]: {
          flex: 2,
        },
      },
    },
    headingSectionColumn: {
      flex: 1,
      minWidth: '80px',
      alignSelf: 'center',
      '&:first-child': {
        flex: 3,
        textAlign: 'left',
        [breakpoints.down('xs')]: {
          flex: 2,
        },
      },
    },
    summaryHeading: {
      flex: 1,
      textAlign: 'left',
    },
    billSection: {
      padding: '2rem 0 2rem 0',
      [breakpoints.down('xs')]: {
        padding: '1rem 0 1rem 0',
      },
    },
    btn: { marginTop: '2rem' },
    btnLabel: {
      display: 'flex',
      gap: '1rem',
      alignItems: 'center',
    },
    errorWrapper: {
      marginTop: '2rem',
    },
    monthsLabels: {
      display: 'none',
      width: '100%',

      [breakpoints.down('xs')]: {
        display: 'flex',
        justifyContent: 'flex-end',
      },
    },
    monthLabel: {
      width: '25%',
      display: 'flex',
      justifyContent: 'flex-end',
      alignContent: 'center',
      textAlign: 'center',
      paddingRight: '.5rem',
    },
    monthTitle: {
      border: `1px solid ${colors.main.borderGrey}`,
      maxWidth: '4.375rem',
      width: '4.375rem',
      height: '1.625rem',
      borderRadius: '1rem',
      padding: '.25rem',
    },
  }),
)
