import { useEffect } from 'react'
import AccountLayout from 'src/layouts/AccountLayout'
import MainLayout from 'src/layouts/MainLayout'
import AccountHero from 'src/libs/account/shared/AccountHero'
import {
  useAccountPageLoadEvents,
  useAppData,
  useBreadcrumbParser,
} from 'src/hooks'
import { MAKE_A_PAYMENT, AppRoutes } from 'src/constants'
import customStaticProps from 'src/utils/appData'
import {
  fetchAutopayDetails,
  fetchDSTAuthDetails,
  fetchPaymentHistory,
  fetchPaymentMethods,
} from 'src/redux/slicers/payment'
import { useDispatch } from 'react-redux'
import { useActiveAccount, useActiveAccountId } from 'src/selector-hooks'
import { fetchNotificationPreferences } from 'src/redux/slicers/profile'
import { PaymentContainer } from 'src/libs/account/payments/PaymentContainer'

interface PageProps {
  data: any
  success: boolean
}

function SSR(props: PageProps): JSX.Element {
  const dispatch = useDispatch()
  const activeAccountId = useActiveAccountId()
  const { data: activeAccount } = useActiveAccount()
  const hero = useAppData('heroBannerSitecore', true)

  useAccountPageLoadEvents(MAKE_A_PAYMENT)

  useEffect(() => {
    if (activeAccountId) {
      dispatch(fetchDSTAuthDetails(activeAccountId))
      dispatch(fetchPaymentHistory(activeAccountId))
      dispatch(fetchPaymentMethods(activeAccountId))
      dispatch(fetchNotificationPreferences(activeAccountId))
    }
  }, [activeAccountId])

  const isEnrolledInAutopay = (autopayType: string | boolean) =>
    !(autopayType === false || autopayType === 'false')

  useEffect(() => {
    if (activeAccount.id && isEnrolledInAutopay(activeAccount.autopayType)) {
      dispatch(
        fetchAutopayDetails(
          activeAccount.id,
          activeAccount.autopayType as string,
        ),
      )
    }
  }, [activeAccount.id])

  const breadCrumbData = useBreadcrumbParser(hero?.breadcrumb?.targetItems)

  return (
    <MainLayout {...props}>
      <AccountLayout {...props}>
        <AccountHero
          title={hero?.title?.value || 'MAKE A PAYMENT'}
          breadcrumb={breadCrumbData}
          showAccountsDropdown
          dashboard={false}
          pageContent={<PaymentContainer />}
        />
      </AccountLayout>
    </MainLayout>
  )
}

export const getStaticProps = customStaticProps(AppRoutes.MakeAPaymentPage)

export default SSR
