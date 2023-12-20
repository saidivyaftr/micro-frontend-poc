import { useEffect } from 'react'
import SearchForm, { FOUND } from './SearchForm'
import { useRouter } from 'next/router'
import ResultCard from './ResultCard'
import TicketPageModal from './OrderTicketModal'
import { fetchAccounts } from 'src/redux/slicers/account'
import { useDispatch } from 'react-redux'
import {
  useActiveAccountUuid,
  useIsValidSession,
  useAccountTickets,
} from 'src/selector-hooks'
import {
  fetchOrderTickets,
  fetchAccountTickets,
} from 'src/redux/slicers/orderTicket'
const OrderTicketContainer = () => {
  const router = useRouter()
  const isLoggedIn = useIsValidSession()
  const dispatch = useDispatch()
  const activeAccountUuid = useActiveAccountUuid()
  const { found } = useAccountTickets()
  useEffect(() => {
    if (isLoggedIn) {
      const { lName = '', id = '', zip = '' } = router.query
      if (!lName || !id || !zip) {
        dispatch(fetchAccounts())
      } else {
        const payload = {
          lastName: String(lName),
          orderOrTTNumber: String(id),
          zipCode: String(zip),
        }
        dispatch(fetchOrderTickets(payload))
      }
    }
  }, [router, isLoggedIn])
  useEffect(() => {
    if (activeAccountUuid)
      dispatch(fetchAccountTickets(activeAccountUuid, true))
  }, [activeAccountUuid])

  return (
    <>
      {found === FOUND ? <ResultCard /> : <SearchForm />}
      <TicketPageModal />
    </>
  )
}

export default OrderTicketContainer
