import MainLayout from 'src/layouts/MainLayout'
import AccountLayout from 'src/layouts/AccountLayout'
import customStaticProps from 'src/utils/appData'
import AccountHero from 'src/libs/account/shared/AccountHero'
import {
  useAccountPageLoadEvents,
  useAppData,
  useBreadcrumbParser,
} from '@/shared-ui/hooks/index'
import { LinkAccountContainer } from 'src/libs/account/access-access/link-account'
import { AppRoutes, LINK_ACCOUNT } from 'src/constants'

interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}

function AccountAccess(props: PageProps): JSX.Element {
  const hero = useAppData('heroBannerSitecore', true)
  const breadCrumbData = useBreadcrumbParser(hero?.breadcrumb?.targetItems)
  useAccountPageLoadEvents(LINK_ACCOUNT)

  return (
    <MainLayout {...props}>
      <AccountLayout {...props}>
        <AccountHero
          title={hero?.title?.value || 'LINK ACCOUNT'}
          breadcrumb={breadCrumbData}
          showAccountsDropdown
          pageContent={<LinkAccountContainer />}
        />
      </AccountLayout>
    </MainLayout>
  )
}

export const getStaticProps = customStaticProps(AppRoutes.LinkAccount)

export default AccountAccess
