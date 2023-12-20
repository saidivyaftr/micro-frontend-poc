import customStaticProps from 'src/utils/appData'
import { PAST_BILL_PAGE, VISITOR, UNVERIFIED_SERVICE_AREA } from 'src/constants'
import MainLayout from 'src/layouts/MainLayout'
import AccountLayout from 'src/layouts/AccountLayout'
import { usePageLoadEvents } from 'src/hooks'
import { AppRoutes } from 'src/constants/appRoutes'
import { BillsHeader } from 'src/libs/account/statements/shared/BillsHeader'
import { StatementsHistoryTable } from 'src/libs/account/statements/StatementsHistoryTable'
import { DownloadNote } from 'src/libs/account/statements/shared/DownloadNote'

interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}

function StatementsHistoryPage(props: PageProps): JSX.Element {
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: PAST_BILL_PAGE,
      eVar22: VISITOR,
      eVar49: UNVERIFIED_SERVICE_AREA,
    },
  })

  return (
    <MainLayout {...props}>
      <AccountLayout {...props} pageTitle="My Bills">
        <BillsHeader
          title="Past Bills"
          description="You can download each bill below as a PDF file. Click each bill to save it to your computer or print for your records."
        />
        <StatementsHistoryTable />
        <DownloadNote />
      </AccountLayout>
    </MainLayout>
  )
}
export const getStaticProps = customStaticProps(AppRoutes.PastBillPage)

export default StatementsHistoryPage
