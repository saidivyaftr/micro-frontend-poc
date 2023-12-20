/* eslint-disable @typescript-eslint/indent */
import { makeStyles } from '@material-ui/core'
import { createStyles } from '@material-ui/styles'
import { Skeleton, Typography } from 'src/blitz'
import colors from 'src/styles/theme/colors'
import { Bill } from 'src/redux/types/billTypes'
import { useAppData } from 'src/hooks'
import { pick } from 'src/utils/appData/dataExtractor'
import { SomethingWentWrong } from 'src/constants/billing'
import { useAccountList, useBillList } from 'src/selector-hooks'
import ErrorMessage from 'src/libs/account/shared/ErrorMessage'
import { Statements } from './sitecore-mock'
import { StatementDropdown } from 'src/libs/account/my-billing/shared'

type BillingHeaderProps = {
  selectedStatementPrimary: Bill | null
  onStatementSelectPrimary: (statement: Bill) => void
  selectedStatementSecondry: Bill | null
  onStatementSelectSecondry: (statement: Bill) => void
}

const CompareStatementsHeader = ({
  selectedStatementPrimary,
  onStatementSelectPrimary,
  selectedStatementSecondry,
  onStatementSelectSecondry,
}: BillingHeaderProps) => {
  const classes = useStyles()
  const billingConstants = useAppData('billing')
  const { isLoading: isAccountsLoading } = useAccountList()
  const statements = useBillList()
  const isLoading = isAccountsLoading || statements.isLoading
  const { compareStatements } = Statements

  if (isLoading)
    return (
      <Skeleton
        height={10}
        width={'100%'}
        className={classes.loaderContainer}
      />
    )
  else if (statements.error)
    return <ErrorMessage message={pick(SomethingWentWrong, billingConstants)} />
  else if (statements.data.length > 0) {
    return (
      <div className={classes.headerContainer}>
        <div className={classes.selectContainer}>
          <Typography
            styleType="h5"
            tagType="div"
            className={classes.headerLeftSection}
          >
            {compareStatements?.value}
          </Typography>
          <div className={classes.headerRightSection}>
            <StatementDropdown
              statements={statements.data}
              selectedStatement={selectedStatementPrimary}
              onStatementSelect={onStatementSelectPrimary}
            />
            <StatementDropdown
              statements={statements.data}
              selectedStatement={selectedStatementSecondry}
              onStatementSelect={onStatementSelectSecondry}
            />
          </div>
        </div>
      </div>
    )
  } else return <></>
}

export default CompareStatementsHeader

const useStyles = makeStyles(({ breakpoints }) =>
  createStyles({
    root: {
      display: 'flex',
    },
    paper: {
      marginRight: '10px',
    },
    headerContainer: {
      paddingBottom: '2rem',
      display: 'block',
    },
    heading: {
      textAlign: 'left',
      display: 'flex',
      '& svg': {
        marginRight: '0.5rem',
      },
    },
    loaderContainer: {
      margin: '2rem 0 0',
    },
    selectContainer: {
      width: '100%',
      display: 'flex',
      marginTop: '2rem',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '.5rem',
      '& .selectWrapper': {
        minWidth: 'unset',
        height: '2.5rem',
        [breakpoints.down('xs')]: {
          minWidth: '300px',
        },
        '& svg': {
          marginLeft: '.5rem',
        },
      },
      '& .selectText': {
        [breakpoints.up('sm')]: {
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          width: '6rem',
        },
      },
      '& .statementDownload': {
        display: 'none',
      },
      [breakpoints.down('xs')]: {
        flexDirection: 'column',
        gap: '2rem',
      },
    },
    headerLeftSection: {
      flex: 1,
      [breakpoints.down('xs')]: {
        alignSelf: 'start',
      },
    },
    headerRightSection: {
      display: 'flex',
      gap: '.5rem',
      [breakpoints.down('xs')]: {
        flexDirection: 'column',
        gap: '1rem',
        width: '100%',
      },
    },

    select: {
      border: 'none',
      width: '100%',
      '&:focus': {
        border: 'none',
      },
    },
    '& select:focus': {
      border: 'none !important',
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
    statementTitle: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  }),
)
