import colors from '@/shared-ui/colors'
import { makeStyles } from '@material-ui/core/styles'
import { Button, InjectHTML } from '@/shared-ui/components'
import { ErrorTriangeOutline } from '@/shared-ui/react-icons/index'
import { useActiveAccount } from 'src/selector-hooks'
import { extractBill } from 'src/libs/account/helper'

const SuspendedTile = ({ textData }: any) => {
  const classes = useStyles()
  const { data: activeAccountDetails } = useActiveAccount()
  const billInfo = extractBill(activeAccountDetails)
  const replaceDynamicValues = (str: string) => {
    // TODO - Update this Date() with data & amount from API
    let updatedStr = str.replace('@@DATE@@', Date().toString())
    updatedStr = updatedStr.replace(
      '@@AMOUNT@@',
      billInfo?.pastDueBalanceAmount,
    )
    return updatedStr
  }

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <ErrorTriangeOutline height="32px" width="32px" />
        <InjectHTML
          styleType={'p2'}
          color={'default'}
          className={classes.title}
          value={replaceDynamicValues(textData?.suspended?.value)}
        />
        <Button
          type="link"
          variant="primary"
          text={textData?.makeAPayment?.value}
          href={textData?.makeAPayment?.link}
          hoverVariant="primary"
        />
      </div>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  root: { paddingBottom: 32 },
  wrapper: {
    background: colors.main.blushRed,
    border: `2px solid ${colors.main.darkRed}`,
    borderRadius: 16,
    padding: 32,
  },
  title: {
    marginTop: 16,
    marginBottom: 32,
  },
}))
export default SuspendedTile
