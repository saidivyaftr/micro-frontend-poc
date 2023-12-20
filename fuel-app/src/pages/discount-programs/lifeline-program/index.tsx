import MainLayout from '@/shared-ui/layouts/main'
import { usePageLoadEvents } from 'src/hooks'
import customStaticProps from 'src/utils/appData'
import {
  ApplyLifeline,
  Hero,
  WhatsLifeline,
  LifeLineHelp,
  StateSelection,
  ConnectLifeline,
  LifelineFAQ,
} from 'src/libs/discount-programs/lifeline-program'
import {
  LIFELINE_PROGRAM_LANDING_PAGE,
  SERVICEABLE,
  VISITOR,
} from 'src/constants'

interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}

function SSR(props: PageProps): JSX.Element {
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    shouldTriggerInvoca: props?.success,
    eventData: {
      pageName: LIFELINE_PROGRAM_LANDING_PAGE,
      eVar22: VISITOR,
      eVar49: SERVICEABLE,
    },
  })
  return (
    <>
      <MainLayout {...props}>
        <Hero />
        <WhatsLifeline />
        <ApplyLifeline />
        <LifeLineHelp />
        <StateSelection />
        <ConnectLifeline />
        <LifelineFAQ />
      </MainLayout>
    </>
  )
}
export const getStaticProps = customStaticProps(
  '/discount-programs/lifeline-program',
)

export default SSR
