import {
  COMPARE_BILL_PAGE,
  UNVERIFIED_SERVICE_AREA,
  VISITOR,
} from 'src/constants'
import { usePageLoadEvents } from 'src/hooks'
import AccountLayout from 'src/layouts/AccountLayout'
import MainLayout from 'src/layouts/MainLayout'
import { CompareBillsComponent } from 'src/libs/account/statements/compare-bills'
import customStaticProps from 'src/utils/appData'
import { AppRoutes } from 'src/constants/appRoutes'

interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}

function CompareBillsPage(props: PageProps): JSX.Element {
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: COMPARE_BILL_PAGE,
      eVar22: VISITOR,
      eVar49: UNVERIFIED_SERVICE_AREA,
    },
  })

  return (
    <MainLayout {...props}>
      <AccountLayout {...props} pageTitle="My Bills">
        <CompareBillsComponent />
      </AccountLayout>
    </MainLayout>
  )
}
export const getStaticProps = customStaticProps(AppRoutes.CompareBillPage)

export default CompareBillsPage
