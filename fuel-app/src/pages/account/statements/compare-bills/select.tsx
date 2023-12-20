import {
  COMPARE_BILL_SELECT_PAGE,
  UNVERIFIED_SERVICE_AREA,
  VISITOR,
} from 'src/constants'
import { AppRoutes } from 'src/constants/appRoutes'
import { usePageLoadEvents } from 'src/hooks'
import AccountLayout from 'src/layouts/AccountLayout'
import MainLayout from 'src/layouts/MainLayout'
import { BillListCompareSelect } from 'src/libs/account/statements/compare-bills/BillListCompareSelect'
import customStaticProps from 'src/utils/appData'

interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}

function CompareBillsSelectionPage(props: PageProps): JSX.Element {
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: COMPARE_BILL_SELECT_PAGE,
      eVar22: VISITOR,
      eVar49: UNVERIFIED_SERVICE_AREA,
    },
  })

  return (
    <MainLayout {...props}>
      <AccountLayout {...props} pageTitle="My Bills">
        <BillListCompareSelect />
      </AccountLayout>
    </MainLayout>
  )
}

export const getStaticProps = customStaticProps(AppRoutes.CompareBillSelectPage)

export default CompareBillsSelectionPage
