/* eslint-disable @typescript-eslint/indent */
import { makeStyles } from '@material-ui/core'
import { createStyles } from '@material-ui/styles'
import colors from 'src/styles/theme/colors'
import Selector from './Selector'
import { Bill } from 'src/redux/types/billTypes'
import {
  useAccountList,
  useActiveAccount,
  useBillList,
} from 'src/selector-hooks'

type BillingHeaderProps = {
  selectedStatement: Bill | null
  onStatementSelect: (statement: Bill) => void
}

const BillingHeader = ({
  selectedStatement,
  onStatementSelect,
}: BillingHeaderProps) => {
  const classes = useStyles()
  const { isLoading: isAccountsLoading } = useAccountList()
  const statements = useBillList()
  const { isLoading: accountLoading } = useActiveAccount()
  const isLoading = accountLoading || isAccountsLoading || statements.isLoading
  if (isLoading) return null
  else if (statements.data.length > 0) {
    return (
      <div className={classes.headerContainer}>
        <div className={classes.selectContainer}>
          <Selector
            statements={statements.data}
            selectedStatement={selectedStatement}
            onStatementSelect={onStatementSelect}
          />
        </div>
      </div>
    )
  } else return <></>
}

export default BillingHeader

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
    },
    paper: {
      marginRight: '10px',
    },
    headerContainer: {
      paddingBottom: '2rem',
      borderBottom: `1px solid ${colors.main.borderGrey}`,
    },
    heading: {
      textAlign: 'left',
      display: 'flex',
      '& svg': {
        marginRight: '0.5rem',
      },
    },
    selectContainer: {
      width: '100%',
      marginTop: '2rem',
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
  }),
)
