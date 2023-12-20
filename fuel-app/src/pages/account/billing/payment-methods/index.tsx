import { useEffect, useLayoutEffect } from 'react'
import MainLayout from 'src/layouts/MainLayout'
import AccountLayout from 'src/layouts/AccountLayout'
import customStaticProps from 'src/utils/appData'
import AccountHero from 'src/libs/account/shared/AccountHero'
import PaymentMethodsContainer from 'src/libs/account/my-billing/payment-methods/PaymentMethodsContainer'
import {
  useAccountPageLoadEvents,
  useAppData,
  useBreadcrumbParser,
} from '@/shared-ui/hooks/index'
import { useActiveAccount, useActiveAccountId } from 'src/selector-hooks'
import {
  fetchAutopayDetails,
  fetchDSTAuthDetails,
  fetchPaymentHistory,
  fetchPaymentMethods,
} from 'src/redux/slicers/payment'
import { useDispatch } from 'react-redux'
import { AppRoutes, MANAGE_PAYMENT_METHODS } from 'src/constants'

interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}

function PaymentMethods(props: PageProps): JSX.Element {
  const dispatch = useDispatch()
  const hero = useAppData('heroBannerSitecore', true)
  const breadCrumbData = useBreadcrumbParser(hero?.breadcrumb?.targetItems)
  const { data: activeAccount } = useActiveAccount()

  useAccountPageLoadEvents(MANAGE_PAYMENT_METHODS)

  const activeAccountId = useActiveAccountId()
  const autoPayType =
    typeof activeAccount.autopayType !== 'boolean'
      ? activeAccount.autopayType
      : ''

  useLayoutEffect(() => {
    if (activeAccountId && activeAccount && autoPayType) {
      dispatch(fetchAutopayDetails(activeAccountId, autoPayType))
    }
  }, [activeAccountId, activeAccount])

  useEffect(() => {
    if (activeAccountId) {
      dispatch(fetchPaymentMethods(activeAccountId))
      dispatch(fetchDSTAuthDetails(activeAccountId))
      dispatch(fetchPaymentHistory(activeAccountId))
    }
  }, [activeAccountId])

  return (
    <MainLayout {...props}>
      <AccountLayout {...props}>
        <AccountHero
          title={hero?.title?.value || 'PAYMENT METHODS'}
          breadcrumb={breadCrumbData}
          showAccountsDropdown
          pageContent={<PaymentMethodsContainer />}
        />
      </AccountLayout>
    </MainLayout>
  )
}

export const getStaticProps = customStaticProps(AppRoutes.PaymentMethodsPage)

export default PaymentMethods
