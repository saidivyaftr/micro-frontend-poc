import MainLayout from '@/shared-ui/layouts/main'
import customStaticProps from 'src/utils/appData'
import {
  Hero,
  ACPAcknowledgement,
  InfoMessage,
} from 'src/libs/discount-programs/affordable-connectivity-program/acknowledgement'
import { useSelector } from 'react-redux'
import { State } from 'src/redux/types'
import { usePageLoadEvents } from 'src/hooks'
import {
  ACP_ACKNOWLEDGEMENT_PAGE,
  UNVERIFIED_SERVICE_AREA,
  VISITOR,
} from 'src/constants'
import { useRouter } from 'next/router'

interface PageProps {
  data: any
  success: boolean
}

const Acknowledgement = (props: PageProps) => {
  const { query } = useRouter()
  const { a: accountUuid } = query
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: ACP_ACKNOWLEDGEMENT_PAGE,
      eVar22: VISITOR,
      eVar49: UNVERIFIED_SERVICE_AREA,
      events: 'event1',
      eVar2: ACP_ACKNOWLEDGEMENT_PAGE,
      eVar98: accountUuid as string,
    },
  })
  const step = useSelector((state: State) => {
    return state?.dpAck?.step
  })

  const contentRenderer = () => {
    switch (step) {
      case 'confirm':
        return (
          <>
            <Hero />
            <ACPAcknowledgement />
          </>
        )
      case 'success':
        return <InfoMessage componentName="ThankYouContent" />
      case 'error':
        return <InfoMessage componentName="ErrorContent" />
    }
  }

  return (
    <MainLayout {...props} showChat={true}>
      {contentRenderer()}
    </MainLayout>
  )
}

export const getStaticProps = customStaticProps(
  '/discount-programs/affordable-connectivity-program/acknowledgement',
)

export default Acknowledgement
