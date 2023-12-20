import AccountLayout from 'src/layouts/AccountLayout'
import MainLayout from 'src/layouts/MainLayout'
import AccountHero from 'src/libs/account/shared/AccountHero'
import customStaticProps from 'src/utils/appData'
import { useAccountPageLoadEvents } from 'src/hooks'
import { fetchAvailableBills } from 'src/redux/slicers/bills'
import { useActiveAccountId, useActiveAccount } from 'src/selector-hooks'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useMemo } from 'react'
import { AppRoutes, BILLING_COMPARE_HISTORY } from 'src/constants'
import {
  fetchPaymentMethods,
  fetchAutopayDetails,
} from 'src/redux/slicers/payment'
import { useAppData } from 'src/hooks'
import { useBreadcrumbParser } from 'src/hooks'
import HistoryContainer from 'src/libs/account/my-billing/billing-history/HistoryContainer'
interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}

function CompareStatements(props: PageProps): JSX.Element {
  const hero = useAppData('heroBannerSitecore', true)
  const billingTabs = useAppData('billingTabs', true)
  const dispatch = useDispatch()
  const activeAccountId = useActiveAccountId()
  const { data: activeAccount } = useActiveAccount()

  useAccountPageLoadEvents(BILLING_COMPARE_HISTORY)

  useEffect(() => {
    if (activeAccountId) {
      dispatch(fetchPaymentMethods(activeAccountId))
      dispatch(fetchAvailableBills(activeAccountId))
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
  }, [activeAccount.id, activeAccount.autopayType])

  const { title, breadcrumb } = hero
  const breadCrumbData = useBreadcrumbParser(breadcrumb)
  const items = billingTabs?.list?.targetItems || []
  const tabs = useMemo(() => {
    return items?.map(({ title, url }: any, index: number) => ({
      title: title?.value,
      url: url?.value,
      component: index === 0 ? <HistoryContainer /> : null,
    }))
  }, [items])

  return (
    <MainLayout {...props}>
      <AccountLayout {...props}>
        <AccountHero
          title={title?.value}
          dashboard={false}
          breadcrumb={breadCrumbData}
          showAccountsDropdown={true}
          tabs={tabs}
        />
      </AccountLayout>
    </MainLayout>
  )
}

export const getStaticProps = customStaticProps(AppRoutes.BillingHistory)

export default CompareStatements
