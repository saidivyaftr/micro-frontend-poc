import customStaticProps from 'src/utils/appData'
import MainLayout from '@/shared-ui/layouts/main'
import {
  ACPForm,
  Hero as FormHero,
} from 'src/libs/discount-programs/affordable-connectivity-program/service-check/form'
import { MoveARoo as Unserviceable } from 'src/libs/discount-programs/affordable-connectivity-program/service-check/unserviceable'
import {
  InfoMessage,
  // WhatHappens,
} from 'src/libs/discount-programs/affordable-connectivity-program/service-check/info-message'
import { useSelector } from 'react-redux'
import { State } from 'src/redux/types'
import { GTagPageLoadEvent, GTAG_ID } from 'src/utils/gtag'
import usePageLoadEvents from '@/shared-ui/hooks/usePageLoadEvents'
import {
  ACP_SERVICEABILITY_PAGE,
  UNVERIFIED_SERVICE_AREA,
  VISITOR,
} from 'src/constants'
interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}
function SSR(props: PageProps): JSX.Element {
  const step = useSelector((state: State) => state?.acp?.step)
  const contentRenderer = () => {
    switch (step) {
      case 'acp-form':
        return (
          <>
            <FormHero />
            <ACPForm />
          </>
        )
      case 'not-serviceable':
        return <Unserviceable />
      case 'success':
        return <InfoMessage componentName="ThankYouContent" />
      case 'error':
        return <InfoMessage componentName="ErrorContent" />
    }
  }
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    shouldTriggerInvoca: props?.success,
    eventData: {
      pageName: ACP_SERVICEABILITY_PAGE,
      eVar22: VISITOR,
      eVar49: UNVERIFIED_SERVICE_AREA,
    },
  })
  return (
    <>
      <GTagPageLoadEvent id={GTAG_ID} />
      <MainLayout {...props}>{contentRenderer()}</MainLayout>
    </>
  )
}

export const getStaticProps = customStaticProps(
  '/discount-programs/affordable-connectivity-program/service-check',
)

export default SSR
