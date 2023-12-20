import { makeStyles } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { CardWithTitle } from 'src/blitz/components/Card/Card'
import { Button, Typography } from 'src/blitz'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { DownloadIcon } from 'src/blitz/assets/react-icons'
import { PP_OBJECT_SANS } from 'src/constants/fontFamilyNames'
import moment from 'moment'
import useWindowDimensions from '@/shared-ui/hooks/useWindowDimensions'
import { AppRoutes } from 'src/constants/appRoutes'
import { saveAs } from 'file-saver'
import clx from 'classnames'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'
import { pick } from 'src/utils/appData/dataExtractor'
import { Download } from 'src/constants/billing'
import APIClient from 'src/api-client'
import {
  useActiveAccount,
  useBillList,
  useAccountList,
} from 'src/selector-hooks'
import TableSkeleton from 'src/libs/account/shared/TableSkeleton'
import ErrorMessage from 'src/libs/account/shared/ErrorMessage'
import { formatAmountInDollar } from 'src/utils/amount'
import { SITE_ERROR } from 'src/constants'
export const StatementCard: React.FC = () => {
  const classes = useStyles()
  const { width } = useWindowDimensions()
  const statementCard = useAppData('statementCard', true)
  const { title, manageStatements, somethingWentWrong, compareStatements } =
    statementCard
  const isMobileOrTablet = width <= 1023
  const billingConstants = useAppData('autoPayCard', false)
  const [mobileView, setMobileView] = useState(false)
  const { isLoading: isAccountsLoading } = useAccountList()
  const {
    isLoading: accountLoading,
    data: activeAccount,
    error: accountError,
  } = useActiveAccount()
  const bills = useBillList()
  const statements = bills.data.slice(0, 3)
  const loading = accountLoading || bills.isLoading || isAccountsLoading
  const error = accountError || bills.error
  useEffect(() => {
    setMobileView(isMobileOrTablet)
  }, [isMobileOrTablet])
  const downloadStatement = async (pdfLink: string, statementName: string) => {
    try {
      const fileName = statementName + '.pdf'
      const response: any = await APIClient.downloadStatments(
        activeAccount.id,
        {
          pdfLink,
        },
      )
      const pdfBlob: any = new Blob([response.data])
      saveAs(pdfBlob, fileName)

      DTMClient.triggerEvent(
        {
          events: 'event14,event16',
          eVar14: DOWNLOAD_STATEMENTS,
          eVar16: fileName,
          prop16: fileName,
        },
        'tl_o',
        DOWNLOAD_STATEMENTS,
      )
    } catch {
      DTMClient.triggerEvent(
        {
          events: 'event88',
          eVar2: DOWNLOAD_STATEMENTS,
          eVar88: 'Failed to download statements',
        },
        'tl_o',
        SITE_ERROR,
      )
    }
  }
  const renderStatments = () => {
    if (loading) return <TableSkeleton rows={5} height={40} />
    else if (error) return <ErrorMessage message={somethingWentWrong?.value} />
    else
      return (
        <>
          {statements?.map((bill: any, index: number) => {
            const statementName = `${moment(bill?.date).format('MMM, YYYY')}`
            const lastRow = index === statements?.length - 1
            return (
              <div
                key={bill.date}
                className={clx(classes.row, {
                  [classes.lastRow]: lastRow,
                })}
              >
                <Typography
                  styleType="p3"
                  tagType="div"
                  className={clx(classes.statementText, {
                    [classes.statementTitleEllipsis]: mobileView,
                  })}
                >
                  {statementName}
                </Typography>
                <Typography
                  styleType="p3"
                  tagType="div"
                  className={clx(classes.statementText, classes.billAmount)}
                >
                  <>{formatAmountInDollar(bill.amount)}</>
                </Typography>
                <div>
                  {mobileView ? (
                    <button
                      type="button"
                      className={classes.mobileDownloadBtn}
                      onClick={() =>
                        downloadStatement(bill.pdfLink, statementName)
                      }
                    >
                      <DownloadIcon width="24" height="24" />
                    </button>
                  ) : (
                    <div className={classes.btnWrapper}>
                      <button
                        type="button"
                        onClick={() =>
                          downloadStatement(bill.pdfLink, statementName)
                        }
                        className={clx(
                          classes.statementDownload,
                          classes.statementTextWrapper,
                          classes.statementText,
                        )}
                      >
                        <DownloadIcon />
                        <Typography
                          styleType="p3"
                          tagType="div"
                          fontType="boldFont"
                          className={`${classes.downloadText}`}
                        >
                          {pick(Download, billingConstants)}
                        </Typography>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
          <Button
            type="link"
            href={AppRoutes.StatementComparison}
            text={compareStatements?.value}
            variant="secondary"
            className={classes.compareBtn}
            triggerEvent={true}
            interactionType={COMPARE_STATEMENTS}
            eventObj={{
              events: 'event14',
              eVar14: COMPARE_STATEMENTS,
            }}
          />
        </>
      )
  }
  if (!loading && !error && bills.data?.length === 0) return null
  return (
    <CardWithTitle
      title={title?.value}
      labelLink={manageStatements?.value}
      url={AppRoutes.BillingHistory}
      className={classes.arrowLinkText}
      styleType="h5"
      classNameTitle={classes.statementCard}
    >
      {renderStatments()}
    </CardWithTitle>
  )
}
const COMPARE_STATEMENTS = 'my account:compare statements'
const DOWNLOAD_STATEMENTS = 'my account:download statement'
const useStyles = makeStyles(({ breakpoints }) => ({
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 0',
    borderColor: `${colors.main.borderGrey}`,
    borderStyle: `solid`,
    borderWidth: '1px 0px 0px',
  },
  lastRow: {
    borderWidth: '1px 0px 1px',
  },
  mobileDownloadBtn: {
    border: `none`,
    backgroundColor: colors.main.white,
  },
  statementDownload: {
    border: `1px solid ${colors.main.midnightExpress}`,
    backgroundColor: colors.main.white,
    cursor: 'pointer',
    display: 'flex',
    padding: '6px 2rem',
    alignItems: 'center',
    borderRadius: '4rem',
    '&:hover': {
      border: `1px solid ${colors.main.brightRed}`,
      backgroundColor: colors.main.brightRed,
      color: colors.main.white,
      '& div': {
        color: colors.main.white,
      },
      '& svg path': {
        fill: colors.main.white,
      },
    },
  },
  statementCard: {
    marginBottom: '2rem',
  },
  downloadText: {
    textTransform: 'uppercase',
    marginLeft: '0.5rem',
  },
  billAmount: {
    textAlign: 'left',
  },
  statementText: {
    fontSize: '16px',
    lineHeight: '1.5rem',
    fontWeight: 400,
    fontFamily: PP_OBJECT_SANS,
    minWidth: 100,
    [breakpoints.down('sm')]: {
      fontSize: '14px',
      lineHeight: '1.125rem',
    },
  },
  statementTitleEllipsis: {
    whiteSpace: 'nowrap',
    width: 160,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'block',
  },
  btnWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  statementTextWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  arrowLinkText: {
    '& .ArrowLink_wrapper__kUP0Y': {
      '& .Typography_h5__S_Ttr': {
        fontSize: '1rem',
      },
    },
  },
  compareBtn: {
    marginTop: '2rem',
  },
}))
