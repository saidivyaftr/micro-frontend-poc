import customStaticProps from 'src/utils/appData'
import MainLayout from '@/shared-ui/layouts/main'
import { OrderLogin } from 'src/libs/third-party-verification'
import { usePageLoadEvents } from 'src/hooks'
import { VERIFY, VISITOR } from 'src/constants'

interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}

function SSR(props: PageProps): JSX.Element {
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: VERIFY,
      eVar22: VISITOR,
    },
  })
  return (
    <MainLayout {...props}>
      <OrderLogin />
    </MainLayout>
  )
}
export const getStaticProps = customStaticProps('/verify')

export default SSR
