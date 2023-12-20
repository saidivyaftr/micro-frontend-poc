//import AppRoutes from 'src/constants/appRoutes'
import MainLayout from 'src/layouts/MainLayout'
import customStaticProps from 'src/utils/appData'
import { CUSTOMER, SERVICEABLE, YTTV_CONFIRMATION_PAGE } from 'src/constants'
import { ConfirmationHero, YoutubeTvFAQ } from 'src/libs/youtubetv'
import { usePageLoadEvents } from 'src/hooks'
import { AppRoutes } from 'src/constants'
interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}

function ConfirmationYTTV(props: PageProps): JSX.Element {
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    shouldTriggerInvoca: props?.success,
    eventData: {
      pageName: YTTV_CONFIRMATION_PAGE,
      eVar22: CUSTOMER,
      eVar49: SERVICEABLE,
      events: 'event173',
    },
  })

  return (
    <MainLayout {...props}>
      <ConfirmationHero />
      <YoutubeTvFAQ />
    </MainLayout>
  )
}

export const getStaticProps = customStaticProps(
  AppRoutes.YoutubeTvConfirmationPage,
)

export default ConfirmationYTTV
