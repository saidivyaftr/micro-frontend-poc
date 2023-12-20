import customStaticProps from 'src/utils/appData'
import { AppRoutes, PAYMENT_ACTIVITY_PAGE } from 'src/constants'
import MainLayout from 'src/layouts/MainLayout'
import AccountLayout from 'src/layouts/AccountLayout'
import AccountHero from 'src/libs/account/shared/AccountHero'
import { useBreadcrumbParser, useAccountPageLoadEvents } from 'src/hooks'
import { HistoryContainer } from 'src/libs/account/my-billing/billing-history/payments'
import {
  hero,
  billingTabs,
} from 'src/libs/account/my-billing/billing-history/payments/sitecore-mock'
import { fetchAutopayDetails } from 'src/redux/slicers/payment'
import { useMemo, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useActiveAccount } from 'src/selector-hooks'
interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}

function PaymentActivityPage(props: PageProps): JSX.Element {
  const breadCrumbData = useBreadcrumbParser(hero?.breadcrumb)
  useAccountPageLoadEvents(PAYMENT_ACTIVITY_PAGE)

  const isEnrolledInAutopay = (autopayType: string | boolean) =>
    !(autopayType === false || autopayType === 'false')

  const dispatch = useDispatch()
  const { data: activeAccount } = useActiveAccount()

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

  const { title } = hero
  const items = billingTabs?.list?.targetItems || []

  const tabs = useMemo(() => {
    return items?.map(({ title, url }: any, index: number) => ({
      title: title?.value,
      url: url?.value,
      component: index === 1 ? <HistoryContainer /> : null,
    }))
  }, [items])

  return (
    <MainLayout {...props}>
      <AccountLayout {...props}>
        <AccountHero
          title={title?.value}
          breadcrumb={breadCrumbData}
          showAccountsDropdown
          tabs={tabs}
        />
      </AccountLayout>
    </MainLayout>
  )
}
export const getStaticProps = customStaticProps(AppRoutes.BillingPage)

export default PaymentActivityPage
