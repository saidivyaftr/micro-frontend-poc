import customStaticProps from 'src/utils/appData'
import MainLayout from '@/shared-ui/layouts/main'
import { usePageLoadEvents } from 'src/hooks'
import { UNVERIFIED_SERVICE_AREA, VISITOR } from 'src/constants'
import InfoMessage from 'src/libs/account/frontier-id-disabled/InfoMessage'
interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}

function SSR(props: PageProps): JSX.Element {
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: `/account/fontier-id-disabled`,
      eVar22: VISITOR,
      eVar49: UNVERIFIED_SERVICE_AREA,
    },
  })
  return (
    <MainLayout {...props}>
      <InfoMessage />
    </MainLayout>
  )
}
export const getStaticProps = customStaticProps('/account/frontier-id-disabled')

export default SSR
