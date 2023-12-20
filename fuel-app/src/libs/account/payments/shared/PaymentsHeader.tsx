import { useActiveAccount } from 'src/selector-hooks'
import { accountIdRegex } from 'src/utils/regex-helper'
import css from '../payments.module.scss'

const PaymentsHeader = () => {
  const activeAccount = useActiveAccount()
  const accountId = accountIdRegex(activeAccount.data.accountNumber ?? '')
  const fullName = `${activeAccount.data.firstName} ${activeAccount.data.lastName}.`
  return (
    <section>
      <div className={css.paymentsFlex}>
        <p className={css.paymentText}>My Payments</p>
        <p className={css.accountInfo}>
          {accountId} {fullName}
        </p>
      </div>
    </section>
  )
}

export default PaymentsHeader
