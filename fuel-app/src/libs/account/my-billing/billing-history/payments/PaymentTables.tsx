import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchPaymentHistory } from 'src/redux/slicers/payment'
import {
  usePaymentList,
  useActiveAccount,
  useAccountList,
} from 'src/selector-hooks'
import PastPayments from './PastPayments'
import ScheduledPayments from './ScheduledPayments'

const PaymentTables = () => {
  const dispatch = useDispatch()
  const { isLoading: isActiveListLoading, error: accountsError } =
    useAccountList()
  const {
    data: activeAccount,
    isLoading: accountLoading,
    error: accountError,
  } = useActiveAccount()
  const {
    isLoading,
    data: { scheduled = [], failedPayments = [], history = [] },
    error: paymentsError,
  } = usePaymentList()
  useEffect(() => {
    if (activeAccount?.id) dispatch(fetchPaymentHistory(activeAccount?.id))
  }, [activeAccount])
  const loading = isLoading || accountLoading || isActiveListLoading
  const error = accountsError || accountError || paymentsError
  return (
    <>
      <ScheduledPayments
        scheduledPaymentData={scheduled}
        loading={loading}
        error={error}
      />
      <PastPayments
        historyPayments={history}
        failedPayments={failedPayments}
        loading={loading}
        error={error}
      />
    </>
  )
}

export default PaymentTables
