import MainLayout from '@/shared-ui/layouts/main'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import {
  LIFELINE_PROGRAM_ACKNOWLEDGEMENT_PAGE,
  UNVERIFIED_SERVICE_AREA,
  VISITOR,
} from 'src/constants'
import { usePageLoadEvents } from 'src/hooks'
import {
  Hero,
  InfoMessage,
  LifeLineAcknowledgement,
} from 'src/libs/discount-programs/lifeline-program/acknowledgement'
import { State } from 'src/redux/types'
import customStaticProps from 'src/utils/appData'

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
      pageName: LIFELINE_PROGRAM_ACKNOWLEDGEMENT_PAGE,
      eVar22: VISITOR,
      eVar49: UNVERIFIED_SERVICE_AREA,
      events: 'event1',
      eVar2: LIFELINE_PROGRAM_ACKNOWLEDGEMENT_PAGE,
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
            <LifeLineAcknowledgement />
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
  '/discount-programs/lifeline-program/acknowledgement',
)

export default Acknowledgement
