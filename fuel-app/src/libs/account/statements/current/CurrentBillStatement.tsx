import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchCurrentBill } from 'src/redux/slicers/bills'
import Link from 'next/link'
import { CURRENT_BILL_INFO } from 'src/constants'
import { BillsHeader } from '../shared/BillsHeader'
import css from './current.module.scss'
import BillDetailsTable from '../shared/BillDetailsTable'
import { Loading } from 'src/blitz'
import { Info } from '../../shared/Info'
import { DocumentIcon } from 'src/blitz/assets/react-icons'
import { useActiveAccountId, useCurrentBill } from 'src/selector-hooks'

const CurrentStatementHeader = () => {
  const dispatch = useDispatch()

  const activeAccountId = useActiveAccountId()

  const currentBill = useCurrentBill()

  useEffect(() => {
    if (activeAccountId) dispatch(fetchCurrentBill(activeAccountId))
  }, [activeAccountId])

  const renderCurrentBill = () => {
    return (
      <div>
        <BillsHeader title="Current Bill" description={CURRENT_BILL_INFO} />
        <p>
          Billing Date:{' '}
          <span
            className={css.italicText}
          >{`${currentBill.data.statementDate}`}</span>
        </p>
        <section className={css.currentBillFlex}>
          <h2>
            <DocumentIcon /> Current Bill for{' '}
            {`${currentBill.data.statementPeriod}`}
          </h2>
          <Link href="./history" passHref>
            <a className={css.linkText}>View Billing History</a>
          </Link>
        </section>
        <div className={css.billDetailsTableWrapper}>
          <BillDetailsTable bill={currentBill.data} />
        </div>
      </div>
    )
  }

  return (
    <section>
      <div>
        {currentBill.isLoading ? (
          <Loading />
        ) : currentBill.error ? (
          <Info
            type="error"
            message="Failed to fetch the data. Please try again later."
          />
        ) : Object.keys(currentBill.data).length > 1 ? (
          renderCurrentBill()
        ) : null}
      </div>
    </section>
  )
}

export default CurrentStatementHeader
