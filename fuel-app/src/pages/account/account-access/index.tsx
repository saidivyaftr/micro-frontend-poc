import MainLayout from 'src/layouts/MainLayout'
import AccountLayout from 'src/layouts/AccountLayout'
import customStaticProps from 'src/utils/appData'
import AccountHero from 'src/libs/account/shared/AccountHero'
import AccountAccessContainer from 'src/libs/account/access-access/account-access'
import {
  useAccountPageLoadEvents,
  useAppData,
  useBreadcrumbParser,
} from '@/shared-ui/hooks/index'
import { useAccountList, useActiveAccountId } from 'src/selector-hooks'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchUsersLinkedToAccount } from 'src/redux/slicers/accountAccess'
import { ACCOUNT_ACCESS, AppRoutes } from 'src/constants'

interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}

function AccountAccess(props: PageProps): JSX.Element {
  const dispatch = useDispatch()
  const hero = useAppData('heroBannerSitecore', true)

  const breadCrumbData = useBreadcrumbParser(hero?.breadcrumb?.targetItems)
  const accountList = useAccountList()?.data
  const activeAccountId = useActiveAccountId()

  useAccountPageLoadEvents(ACCOUNT_ACCESS)

  useEffect(() => {
    if (accountList?.length > 0 && activeAccountId) {
      const serviceId = accountList?.find(
        (item) => item.accountNumber === activeAccountId,
      )?.serviceDetails?.id
      if (serviceId) {
        dispatch(fetchUsersLinkedToAccount(serviceId))
      }
    }
  }, [activeAccountId, accountList])

  return (
    <MainLayout {...props}>
      <AccountLayout {...props}>
        <AccountHero
          title={hero?.title?.value || 'ACCOUNT ACCESS'}
          breadcrumb={breadCrumbData}
          showAccountsDropdown
          pageContent={<AccountAccessContainer />}
        />
      </AccountLayout>
    </MainLayout>
  )
}

export const getStaticProps = customStaticProps(AppRoutes.AccountAccess)

export default AccountAccess
