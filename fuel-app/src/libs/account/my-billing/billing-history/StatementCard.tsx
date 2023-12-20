import { makeStyles } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { CardWithTitle } from 'src/blitz/components/Card/Card'
import { Button, Typography } from 'src/blitz'
import { fetchAvailableBills } from 'src/redux/slicers/bills'
import { DownloadIcon } from 'src/blitz/assets/react-icons'
import { PP_OBJECT_SANS } from 'src/constants/fontFamilyNames'
import moment from 'moment'
import useWindowDimensions from '@/shared-ui/hooks/useWindowDimensions'
import { AppRoutes } from 'src/constants/appRoutes'
import { saveAs } from 'file-saver'
import clx from 'classnames'
import colors from '@/shared-ui/colors'
import APIClient from 'src/api-client'
import { useAppData } from 'src/hooks'
import { Checkbox } from 'src/ui-kit'
import { CheckboxCheck, CheckboxUnCheck } from '@/shared-ui/react-icons/index'
import {
  useActiveAccount,
  useBillList,
  useAccountList,
} from 'src/selector-hooks'
import ErrorMessage from 'src/libs/account/shared/ErrorMessage'
import { useRouter } from 'next/router'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import TableSkeleton from '../../shared/TableSkeleton'
import { formatAmountInDollar } from 'src/utils/amount'
import { SITE_ERROR } from 'src/constants'

export const StatementCard: React.FC = () => {
  const classes = useStyles()

  return (
    <CardWithTitle
      url={AppRoutes.BillingHistory}
      styleType="h5"
      className={classes.cardWrapper}
      classNameTitle={classes.statementCard}
    >
      <RenderStatements />
    </CardWithTitle>
  )
}

const RenderStatements = () => {
  const statementCard = useAppData('statementCard', true)
  const classes = useStyles()
  const router = useRouter()
  const { width } = useWindowDimensions()
  const {
    somethingWentWrong,
    compareStatements,
    Date,
    Balance,
    Action,
    Cancel,
    ShowComparison,
    downloadText,
  } = statementCard

  const isMobileOrTablet = width <= 1023
  const initialState: Array<string> = []
  const [selectedStatements, setSelectedStatements] = useState(initialState)
  const [mobileView, setMobileView] = useState(false)
  const [isCompareStateSubmitted, setCompareStateSubmitted] = useState(false)
  const [isCompareStatementEnabled, setCompareStatement] = useState(false)
  const { isLoading: isAccountsLoading } = useAccountList()
  const {
    isLoading: accountLoading,
    data: activeAccount,
    error: accountError,
  } = useActiveAccount()
  const bills = useBillList()
  const statements = bills.data
  const dispatch = useDispatch()

  useEffect(() => {
    if (activeAccount.id) {
      dispatch(fetchAvailableBills(activeAccount.id))
    }
  }, [activeAccount])

  useEffect(() => {
    setMobileView(isMobileOrTablet)
  }, [isMobileOrTablet])

  const handelCompareStatements = async () => {
    setCompareStatement(true)
    if (selectedStatements.length >= 2) {
      const COMPARE_STATEMENT_EVENT = `my account:compare statements`
      DTMClient.triggerEvent(
        {
          events: 'event14',
          eVar14: COMPARE_STATEMENT_EVENT,
        },
        'tl_o',
        COMPARE_STATEMENT_EVENT,
      )

      setCompareStateSubmitted(true)
      await router.push({
        pathname: AppRoutes.StatementComparison,
        query: {
          ...(router.query || {}),
          account: activeAccount.id,
          primary: selectedStatements[0],
          secondry: selectedStatements[1],
        },
      })
      setCompareStateSubmitted(false)
    }
  }

  const closeCompareStatements = () => {
    setCompareStatement(false)
    setSelectedStatements([])
    setCompareStateSubmitted(false)
  }

  const updateCompareStatement = (
    date: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.checked) {
      setSelectedStatements([...selectedStatements, date])
    } else {
      setSelectedStatements([
        ...selectedStatements.filter((item) => item !== date),
      ])
    }
  }

  const disableCheckBoxes = (date: string) => {
    return selectedStatements.length >= 2 && !selectedStatements.includes(date)
  }

  const isCheckboxSelected = (date: string) => {
    return selectedStatements.includes(date)
  }

  const downloadStatement = async (pdfLink: string, statementName: string) => {
    const DOWNLOAD_STATEMENTS = 'my account:download statement'
    try {
      const response: any = await APIClient.downloadStatments(
        activeAccount.id,
        {
          pdfLink,
        },
      )
      const pdfBlob: any = new Blob([response.data])
      saveAs(pdfBlob, statementName + '.pdf')

      DTMClient.triggerEvent(
        {
          events: 'event14,event16',
          eVar14: DOWNLOAD_STATEMENTS,
          eVar16: statementName + '.pdf',
          prop16: statementName + '.pdf',
        },
        'tl_o',
        DOWNLOAD_STATEMENTS,
      )
    } catch (e) {
      console.log(e)
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

  if (accountLoading || bills.isLoading || isAccountsLoading) {
    return (
      <div className={classes.tableWrapper}>
        <TableSkeleton rows={3} height={40} margin={'0 0 30px 0'} />
      </div>
    )
  }

  if (accountError || !Boolean(bills?.data?.length)) {
    return (
      <div className={classes.errorWrapper}>
        <ErrorMessage message={somethingWentWrong?.value} />
      </div>
    )
  }

  return (
    <>
      <div
        className={clx(classes.row, {
          [classes.deskTopHeading]: !mobileView,
          [classes.mobileHeading]: mobileView,
        })}
      >
        <div className={clx(classes.rowStatement)}>
          <Typography
            styleType="p1"
            tagType="div"
            fontType="boldFont"
            className={clx(classes.headingCol)}
          >
            {Date?.value}
          </Typography>
          <Typography
            styleType="p1"
            tagType="div"
            fontType="boldFont"
            className={clx(classes.headingCol)}
          >
            {Balance?.value}
          </Typography>
          <Typography
            styleType="p1"
            tagType="div"
            fontType="boldFont"
            className={clx(classes.headingCol)}
          >
            {Action?.value}
          </Typography>
        </div>
      </div>
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
            {isCompareStatementEnabled && mobileView && (
              <div
                className={clx(classes.compareCheckbox, {
                  [classes.disableCheckbox]: disableCheckBoxes(bill.date),
                })}
              >
                <Checkbox
                  checked={isCheckboxSelected(bill.date)}
                  setValue={(event) => {
                    updateCompareStatement(bill.date, event)
                    return ''
                  }}
                  label=""
                  checkedIcon={<CheckboxCheck />}
                  uncheckedIcon={<CheckboxUnCheck />}
                  name={bill.date}
                />
              </div>
            )}
            <div className={clx(classes.rowStatement)}>
              <div className={clx(classes.statementText, classes.compareView)}>
                {isCompareStatementEnabled && !mobileView && (
                  <div
                    className={clx(classes.compareCheckbox, {
                      [classes.disableCheckbox]: disableCheckBoxes(bill.date),
                    })}
                  >
                    <Checkbox
                      checked={isCheckboxSelected(bill.date)}
                      setValue={(event) => {
                        updateCompareStatement(bill.date, event)
                        return ''
                      }}
                      label=""
                      checkedIcon={<CheckboxCheck />}
                      uncheckedIcon={<CheckboxUnCheck />}
                      name={bill.date}
                    />
                  </div>
                )}
                <Typography
                  styleType="p2"
                  tagType="div"
                  fontType="boldFont"
                  className={clx({
                    [classes.statementTitle]: !mobileView,
                    [classes.statementMobileTitle]: mobileView,
                  })}
                >
                  {Date?.value}
                </Typography>
                <Typography styleType="p2" tagType="div">
                  {statementName}
                </Typography>
              </div>
              <div className={clx(classes.statementText, classes.billLabel)}>
                <Typography
                  styleType="p2"
                  tagType="div"
                  fontType="boldFont"
                  className={clx({
                    [classes.statementTitle]: !mobileView,
                    [classes.statementMobileTitle]: mobileView,
                  })}
                >
                  {Balance?.value}
                </Typography>
                <Typography styleType="p2" tagType="div">
                  <> {formatAmountInDollar(bill.amount)}</>
                </Typography>
              </div>
              <div>
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
                      tagType="div"
                      fontType="boldFont"
                      className={`${classes.downloadText} `}
                    >
                      {downloadText?.value}
                    </Typography>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      })}
      <div className={classes.navigationWrapper}>
        <Button
          type="button"
          isBusy={isCompareStateSubmitted}
          text={
            !isCompareStatementEnabled
              ? compareStatements?.value
              : ShowComparison?.value
          }
          variant="primary"
          disabled={isCompareStatementEnabled && selectedStatements.length < 2}
          onClick={handelCompareStatements}
        />
        {isCompareStatementEnabled && (
          <Button
            type="link"
            text={
              <Typography
                styleType="p2"
                tagType="div"
                className={classes.cancelButtonText}
              >
                {Cancel?.value}
              </Typography>
            }
            variant="lite"
            buttonSize="small"
            onClick={closeCompareStatements}
            className={classes.cancelButton}
          />
        )}
      </div>
    </>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: `${colors.main.borderGrey} `,
    borderStyle: `solid`,
    borderWidth: '0px 0px 1px',
    padding: '1.5rem 2rem',
    gap: '1rem',
    [breakpoints.down('sm')]: {
      alignItems: 'baseline',
      padding: '1.5rem 1rem',
    },
  },
  rowStatement: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      gap: '1rem',
      alignItems: 'start',
    },
  },
  lastRow: {
    borderWidth: '1px 0px 1px',
  },
  mobileDownloadBtn: {
    border: `none`,
    backgroundColor: colors.main.white,
  },
  statementDownload: {
    border: `1px solid ${colors.main.midnightExpress} `,
    backgroundColor: colors.main.white,
    cursor: 'pointer',
    display: 'flex',
    padding: '6px 2rem',
    alignItems: 'center',
    borderRadius: '4rem',
    '&:hover': {
      border: `1px solid ${colors.main.brightRed} `,
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
    fontSize: '0.875rem',
    lineHeight: '0.875rem',
  },
  statementText: {
    display: 'flex',
    gap: '.5rem',
    fontSize: '16px',
    lineHeight: '1.5rem',
    fontWeight: 400,
    fontFamily: PP_OBJECT_SANS,
    [breakpoints.down('sm')]: {
      fontSize: '14px',
      lineHeight: '1.125rem',
    },
  },
  statementTitle: {
    display: 'none',
  },
  statementMobileTitle: {
    width: 56,
  },
  btnWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  statementTextWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  billLabel: {
    gap: '1rem',
  },
  cancelButton: {
    textAlign: 'center',
    textDecoration: 'underline',
  },
  cancelButtonText: {
    width: 'fit-content',
    [breakpoints.down('sm')]: {
      width: 'unset',
    },
  },
  navigationWrapper: {
    marginTop: '2rem',
    display: 'flex',
    gap: '2rem',
    padding: '1.5rem 2rem',
    alignItems: 'center',
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      padding: '1.5rem 1rem',
      gap: '1rem',
    },
  },
  disableCheckbox: {
    opacity: '0.5',
    pointerEvents: 'none',
    cursor: 'not - allowed',
  },
  compareCheckbox: {
    '& .label': {
      marginLeft: 0,
      marginRight: 0,
    },
    '& .MuiIconButton-root ': {
      padding: 0,
    },
  },
  deskTopHeading: {
    alignItems: 'start',
    padding: '1rem 2rem',
  },
  mobileHeading: {
    display: 'none',
    border: 'none',
  },
  headingCol: {
    textAlign: 'center',
    paddingLeft: '.5rem',
    borderLeft: `1px solid ${colors.main.borderGrey}`,
    '&:first-child': {
      width: '16.875rem',
      textAlign: 'start',
      border: 'none',
      paddingLeft: 0,
    },
    '&:last-child': {
      width: '12rem',
      textAlign: 'start',
    },
  },
  compareView: {
    width: '16.875rem',
    gap: '1rem',
    alignItems: 'center',
  },
  cardWrapper: {
    padding: 0,
  },
  errorWrapper: {
    padding: '2rem',
    [breakpoints.down('xs')]: {
      padding: '1rem',
    },
  },
  tableWrapper: {
    padding: '2rem',
    [breakpoints.down('xs')]: {
      padding: '1rem',
    },
  },
}))
