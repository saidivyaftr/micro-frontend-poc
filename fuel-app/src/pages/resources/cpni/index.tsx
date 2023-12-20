import customStaticProps from 'src/utils/appData'
import MainLayout from '@/shared-ui/layouts/main'
import {
  HeroCPNI,
  RichContent,
  CPNIForm,
  CPNIThankYou,
} from 'src/libs/resources/cpni'
import { State } from 'src/redux/types'
import { useSelector } from 'react-redux'
import { usePageLoadEvents } from 'src/hooks'
import {
  CPNI_FORM,
  CPNI_PAGE,
  UNVERIFIED_SERVICE_AREA,
  VISITOR,
} from 'src/constants'

interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}

function SSR(props: PageProps): JSX.Element {
  const isSuccess = useSelector((state: State) => state?.cpni?.isSuccess)

  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      events: 'event1',
      pageName: CPNI_PAGE,
      eVar2: CPNI_FORM,
      eVar22: VISITOR,
      eVar49: UNVERIFIED_SERVICE_AREA,
    },
  })

  return (
    <MainLayout {...props}>
      {isSuccess ? (
        <CPNIThankYou />
      ) : (
        <>
          <HeroCPNI />
          <RichContent />
          <CPNIForm />
        </>
      )}
    </MainLayout>
  )
}

export const getStaticProps = customStaticProps('/resources/cpni')

export default SSR
