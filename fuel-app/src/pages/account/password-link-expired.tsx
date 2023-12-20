import customStaticProps from 'src/utils/appData'
import MainLayout from '@/shared-ui/layouts/main'
import { usePageLoadEvents, useIsLoadingFromApp } from 'src/hooks'
import { UNVERIFIED_SERVICE_AREA, VISITOR } from 'src/constants'
import InfoMessage from 'src/libs/account/password-link-expired/InfoMessage'
interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}

function SSR(props: PageProps): JSX.Element {
  const isFromMobileApp = useIsLoadingFromApp()
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: `/account/password-link-expired`,
      eVar22: VISITOR,
      eVar49: UNVERIFIED_SERVICE_AREA,
    },
  })
  return (
    <MainLayout
      hideHeader={isFromMobileApp}
      hideFooter={isFromMobileApp}
      {...props}
      success
      miniFooter
      showChat={false}
    >
      <InfoMessage />
    </MainLayout>
  )
}
export const getStaticProps = customStaticProps(
  '/account/password-link-expired',
)

export default SSR
