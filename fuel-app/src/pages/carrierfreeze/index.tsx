import MainLayout from '@/shared-ui/layouts/main'
import customStaticProps from 'src/utils/appData'
import { State } from 'src/redux/types'
import {
  FreezeHero,
  FreezeForm,
  FreezeLegal,
  FreezeThankYou,
} from 'src/libs/carrierfreeze'
import { useSelector } from 'react-redux'
import { usePageLoadEvents } from '../../hooks'
import {
  CARRIER_FREEZE,
  CARRIER_FREEZE_PAGE,
  UNVERIFIED_SERVICE_AREA,
  VISITOR,
} from 'src/constants'

interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}

function SSR(props: PageProps): JSX.Element {
  const { isSuccess } = useSelector((state: State) => state?.freeze)

  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      events: 'event1',
      pageName: CARRIER_FREEZE_PAGE,
      eVar2: CARRIER_FREEZE,
      eVar22: VISITOR,
      eVar49: UNVERIFIED_SERVICE_AREA,
    },
  })

  return (
    <MainLayout {...props}>
      {isSuccess ? (
        <FreezeThankYou />
      ) : (
        <>
          <FreezeHero />
          <FreezeForm />
          <FreezeLegal />
        </>
      )}
    </MainLayout>
  )
}

export const getStaticProps = customStaticProps('/carrierfreeze')

export default SSR
