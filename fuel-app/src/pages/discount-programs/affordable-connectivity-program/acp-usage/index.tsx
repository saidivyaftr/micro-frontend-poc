import MainLayout from '@/shared-ui/layouts/main'
import customStaticProps from 'src/utils/appData'
import {
  Hero,
  UsageConfirmation,
  InfoMessage,
} from 'src/libs/discount-programs/affordable-connectivity-program/acp-usage'
import { useSelector } from 'react-redux'
import { State } from 'src/redux/types'
import { usePageLoadEvents } from 'src/hooks'
import {
  ACP_CERTIFY_USAGE_PAGE,
  UNVERIFIED_SERVICE_AREA,
  VISITOR,
} from 'src/constants'

interface PageProps {
  data: any
  success: boolean
}

const ACPUsage = (props: PageProps) => {
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: ACP_CERTIFY_USAGE_PAGE,
      eVar22: VISITOR,
      eVar49: UNVERIFIED_SERVICE_AREA,
    },
  })
  const step = useSelector((state: State) => {
    return state?.acpUsage?.step
  })

  const contentRenderer = () => {
    switch (step) {
      case 'confirm':
        return (
          <>
            <Hero />
            <UsageConfirmation />
          </>
        )
      case 'success':
        return <InfoMessage componentName="ThankYouContent" />
      case 'error':
        return <InfoMessage componentName="ErrorContent" />
    }
  }

  return <MainLayout {...props}>{contentRenderer()}</MainLayout>
}

export const getStaticProps = customStaticProps(
  '/discount-programs/affordable-connectivity-program/acp-usage',
)

export default ACPUsage
