import customStaticProps from 'src/utils/appData'
import {
  VISITOR,
  UNVERIFIED_SERVICE_AREA,
  EXPRESS_PAY_PAGE,
} from 'src/constants'
import MainLayout from 'src/layouts/MainLayout'
import { usePageLoadEvents } from 'src/hooks'
import { ExpressPay } from 'src/libs/expresspay'

interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}

function ExpressPayPage(props: PageProps): JSX.Element {
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: EXPRESS_PAY_PAGE,
      eVar22: VISITOR,
      eVar49: UNVERIFIED_SERVICE_AREA,
    },
  })

  return (
    <MainLayout {...props}>
      <ExpressPay />
    </MainLayout>
  )
}
export const getStaticProps = customStaticProps('/expresspay')

export default ExpressPayPage
