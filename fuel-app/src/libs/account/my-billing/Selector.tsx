import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Typography } from 'src/blitz'
import { Bill, BillList } from 'src/redux/types/billTypes'
import moment from 'moment'
import { useAppData } from 'src/hooks'
import { pick } from 'src/utils/appData/dataExtractor'
import { StatementDate } from 'src/constants/billing'
import colors from '@/shared-ui/colors'
import { saveAs } from 'file-saver'
import APIClient from 'src/api-client'
import { useMemo, useState } from 'react'
import { Download } from 'src/constants/billing'
import DownloadIcon from 'src/blitz/assets/react-icons/download'
import clx from 'classnames'
import { useActiveAccount } from 'src/selector-hooks'
import { StatementDropdown } from 'src/libs/account/my-billing/shared'
import { SITE_ERROR } from 'src/constants'

type StatementSelectorTypes = {
  selectedStatement: Bill | null
  statements: BillList | null
  onStatementSelect: (statement: Bill) => void
}

export default function StatementSelector({
  statements,
  selectedStatement,
  onStatementSelect,
}: StatementSelectorTypes) {
  const classes = useStyles()
  const [downloading, setDownloading] = useState(false)
  const billingConstants = useAppData('autoPayCard')
  const { data: activeAccount } = useActiveAccount()

  const { statementName, pdfLink } = useMemo(() => {
    const selected: any = selectedStatement || statements?.[0] || {}
    return {
      pdfLink: selected?.pdfLink || '',
      statementName: selected?.date
        ? `${moment(selected?.date).format('MMM, YYYY')}.pdf`
        : '',
    }
  }, [])

  const downloadStatement = async () => {
    if (!pdfLink || !statementName) return
    const DOWNLOAD_STATEMENTS = 'my account:download statement'
    try {
      setDownloading(true)
      const response: any = await APIClient.downloadStatments(
        activeAccount.id,
        {
          pdfLink,
        },
      )
      const pdfBlob: any = new Blob([response.data])
      saveAs(pdfBlob, statementName)

      DTMClient.triggerEvent(
        {
          events: 'event14,event16',
          eVar14: DOWNLOAD_STATEMENTS,
          eVar16: statementName,
          prop16: statementName,
        },
        'tl_o',
        DOWNLOAD_STATEMENTS,
      )
    } catch {}
    setDownloading(false)
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

  return (
    <div className={classes.root}>
      <Typography
        styleType="p2"
        tagType="h6"
        fontType="boldFont"
        className={classes.statementLabel}
      >
        {pick(StatementDate, billingConstants)}
      </Typography>
      <div className={classes.statementTitle}>
        <StatementDropdown
          statements={statements}
          selectedStatement={selectedStatement}
          onStatementSelect={onStatementSelect}
        />
        <button
          type="button"
          disabled={downloading}
          onClick={() => downloadStatement()}
          className={clx(classes.statementDownload, 'statementDownload')}
        >
          <DownloadIcon />
          <Typography
            styleType="p3"
            tagType="div"
            fontType="boldFont"
            className={classes.downloadText}
          >
            {pick(Download, billingConstants)}
          </Typography>
        </button>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    statementLabel: {
      margin: 0,
      marginBottom: 4,
    },
    paper: {
      minWidth: '300px',
      maxHeight: '500px',
    },
    dropdown: {
      minWidth: 180,
      [breakpoints.down('xs')]: {
        width: '100%',
      },
    },
    selectWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '180px',
      padding: '5px 20px',
      borderRadius: '20px',
      border: `1px solid ${colors.main.midnightExpress}`,
      cursor: 'pointer',
      alignItems: 'center',
      height: '3rem',
      color: colors.main.midnightExpress,
      '& svg': {
        marginLeft: '2rem',
      },
    },
    statementTitle: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      [breakpoints.down('xs')]: {
        gap: 16,
        flexDirection: 'column',
        alignItems: 'flex-start',
      },
    },
    statementDownload: {
      border: `1px solid ${colors.main.midnightExpress}`,
      backgroundColor: colors.main.white,
      cursor: 'pointer',
      display: 'flex',
      padding: '6px 2rem',
      alignItems: 'center',
      borderRadius: '4rem',
      height: '2rem',
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
      '&:disabled': {
        opacity: 0.5,
      },
    },
    downloadText: {
      textTransform: 'uppercase',
      marginLeft: ' 0.5rem',
    },
  }),
)
