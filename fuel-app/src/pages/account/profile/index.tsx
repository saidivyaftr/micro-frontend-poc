import { useEffect } from 'react'
import AccountLayout from 'src/layouts/AccountLayout'
import MainLayout from 'src/layouts/MainLayout'
import AccountHero from 'src/libs/account/shared/AccountHero'
import { useAccountPageLoadEvents, useBreadcrumbParser } from 'src/hooks'
import { ACCOUNT_PROFILE, AppRoutes } from 'src/constants'
import customStaticProps from 'src/utils/appData'
import ProfileContainer from 'src/libs/account/profile'
import { fetchPaymentMethods } from 'src/redux/slicers/payment'
import { useDispatch } from 'react-redux'
import { useActiveAccountId } from 'src/selector-hooks'
import {
  fetchCCPAReviews,
  fetchNotificationPreferences,
  fetchEmailAddresses,
  fetchPhoneNumbers,
} from 'src/redux/slicers/profile'
import { useAppData } from 'src/hooks'

interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}

function SSR(props: PageProps): JSX.Element {
  const dispatch = useDispatch()
  const activeAccountId = useActiveAccountId()
  const hero = useAppData('heroBannerSitecore', true)
  const breadCrumbData = useBreadcrumbParser(hero?.breadcrumb?.targetItems)

  useAccountPageLoadEvents(ACCOUNT_PROFILE)

  useEffect(() => {
    if (activeAccountId) {
      dispatch(fetchPaymentMethods(activeAccountId))
      dispatch(fetchNotificationPreferences(activeAccountId))
      dispatch(fetchCCPAReviews(activeAccountId))
      dispatch(fetchEmailAddresses(activeAccountId))
      dispatch(fetchPhoneNumbers(activeAccountId))
    }
  }, [activeAccountId])

  return (
    <MainLayout {...props}>
      <AccountLayout {...props}>
        <AccountHero
          title={hero?.title?.value || 'MY PROFILE'}
          breadcrumb={breadCrumbData}
          showAccountsDropdown
          pageContent={<ProfileContainer />}
        />
      </AccountLayout>
    </MainLayout>
  )
}

export const getStaticProps = customStaticProps(AppRoutes.ProfilePage)

export default SSR
