import { useSelector } from 'react-redux'
import {
  selectAccountList,
  selectActiveAccount,
  selectActiveAccountId,
  selectActiveAccountUuid,
  selectAccountInfoOnLoad,
  selectVacationServicesInfo,
} from 'src/redux/slicers/account'
import {
  selectBillDetailsByDate,
  selectBillList,
  selectCurrentBill,
  selectSelectedBillDatesForCompare,
} from 'src/redux/slicers/bills'
import {
  selectAutopayDetails,
  selectShowAutoPayEditForm,
  selectDSTConfigDetails,
  selectPaymentConfirmation,
  selectPaymentList,
  selectPaymentMethods,
  selectPostPaymentDetails,
} from 'src/redux/slicers/payment'
import {
  selectProfileData,
  selectIsValidSession,
  selectProfileServices,
  selectIsSessionLoading,
  selectSessionState,
} from 'src/redux/slicers/session'
import {
  selectServiceList,
  selectServiceLoading,
} from 'src/redux/slicers/service'
import { selectProductDetails } from 'src/redux/slicers/products'
import { BillingAddress, ServiceAddress } from 'src/redux/types/accountTypes'
import {
  selectCCPAReviews,
  selectPhoneNumbers,
  selectEmailAddresses,
} from 'src/redux/slicers/profile'
import {
  selectAccountUsers,
  selectDiscoverIdentity,
} from 'src/redux/slicers/accountAccess'

import { selectTickets, selectOrder } from 'src/redux/slicers/orderTicket'
import {
  getSelectedUnprovisionedService,
  selectUnprovisionedList,
  selectUnprovisionedListLoading,
  selectWelcomePageData,
} from 'src/redux/slicers/welcome'

export const useAccountList = () => useSelector(selectAccountList)
export const useActiveAccountId = () => useSelector(selectActiveAccountId)
export const useActiveAccountUuid = () => useSelector(selectActiveAccountUuid)
export const useActiveAccount = () => useSelector(selectActiveAccount)
export const useAccountInfoOnLoad = () => useSelector(selectAccountInfoOnLoad)
export const useAccountTickets = () => useSelector(selectTickets)
export const useOrderData = () => useSelector(selectOrder)
export const useVacationServicesInfo = () =>
  useSelector(selectVacationServicesInfo)
export const useServiceAddress = () => {
  const accountList = useAccountList().data
  const activeAccountId = useActiveAccountId()
  const activeAccountServiceDetails = accountList.find(
    (acc) => acc.id === activeAccountId,
  )
  return (
    activeAccountServiceDetails?.serviceDetails?.details?.serviceAddress ??
    ({} as ServiceAddress)
  )
}

export const useBillList = () => useSelector(selectBillList)
export const useBillDetailsByDate = () => useSelector(selectBillDetailsByDate)
export const useCurrentBill = () => useSelector(selectCurrentBill)
export const useSelectedBillDatesCompare = () =>
  useSelector(selectSelectedBillDatesForCompare)

export const usePaymentList = () => useSelector(selectPaymentList)
export const usePaymentConfirmation = () =>
  useSelector(selectPaymentConfirmation)
export const useAutopayDetails = () => useSelector(selectAutopayDetails)
export const useShowAutoPayEditForm = () =>
  useSelector(selectShowAutoPayEditForm)
export const usePaymentMethods = () => useSelector(selectPaymentMethods)
export const usePostPaymentDetails = () => useSelector(selectPostPaymentDetails)
export const useDSTConfigDetails = () => useSelector(selectDSTConfigDetails)

export const useProductDetails = () => useSelector(selectProductDetails)

export const useSessionState = () => useSelector(selectSessionState)

export const useBillingAddress = () => {
  const accountList = useAccountList().data
  const activeAccountId = useActiveAccountId()
  const activeAccount = accountList.find((acc) => acc.id === activeAccountId)
  return (
    activeAccount?.serviceDetails?.details?.billingAddress ??
    ({} as BillingAddress)
  )
}

export const useProfileData = () => useSelector(selectProfileData)
export const useServicesFromSession = () => useSelector(selectProfileServices)
export const useServicesData = () => useSelector(selectServiceList)
export const useIsValidSession = () => useSelector(selectIsValidSession)
export const useIsSessionLoading = () => useSelector(selectIsSessionLoading)
export const useIsServicesLoading = () => useSelector(selectServiceLoading)

export const useCCPAReviews = () => useSelector(selectCCPAReviews)
export const useProfilePhoneNumbers = () => useSelector(selectPhoneNumbers)
export const useProfileEmailAddresses = () => useSelector(selectEmailAddresses)

export const useSelectAccountUsers = () => useSelector(selectAccountUsers)
export const useSelectDiscoverIdentity = () =>
  useSelector(selectDiscoverIdentity)

export const useUnprovisionedServices = () =>
  useSelector(selectUnprovisionedList)
export const useUnprovisionedServicesLoading = () =>
  useSelector(selectUnprovisionedListLoading)
export const useSelectedUnprovisionedService = () =>
  useSelector(getSelectedUnprovisionedService)
export const useWelcomePageData = () => useSelector(selectWelcomePageData)
