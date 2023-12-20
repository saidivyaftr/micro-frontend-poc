import customStaticProps from 'src/utils/appData'
import {
  CURRENT_BILL_PAGE,
  VISITOR,
  UNVERIFIED_SERVICE_AREA,
} from 'src/constants'
import MainLayout from 'src/layouts/MainLayout'
import AccountLayout from 'src/layouts/AccountLayout'
import { usePageLoadEvents } from 'src/hooks'
import { AppRoutes } from 'src/constants/appRoutes'
import { CurrentBillStatement } from 'src/libs/account/statements/current'
interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}

function CurrentBillPage(props: PageProps): JSX.Element {
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: CURRENT_BILL_PAGE,
      eVar22: VISITOR,
      eVar49: UNVERIFIED_SERVICE_AREA,
    },
  })

  return (
    <MainLayout {...props}>
      <AccountLayout {...props} pageTitle="My Bills">
        <CurrentBillStatement />
      </AccountLayout>
    </MainLayout>
  )
}
export const getStaticProps = customStaticProps(AppRoutes.CurrentBillPage)

export default CurrentBillPage
