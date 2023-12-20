import MainLayout from '@/shared-ui/layouts/main'
import EquipmentReturnsSteps from 'src/libs/resources/equipment-returns/EquipmentReturnSteps'
import HaveQuestions from 'src/libs/resources/equipment-returns/HaveQuestions'
import HeroBanner from 'src/libs/resources/equipment-returns/HeroBanner'
import ReturnProcedure from 'src/libs/resources/equipment-returns/ReturnProcedure'
import ReturnsPolicy from 'src/libs/resources/equipment-returns/ReturnsPolicy'
import EquipmentTable from 'src/libs/resources/equipment-returns/EquipmentTable'

import customStaticProps from 'src/utils/appData'
import { usePageLoadEvents } from '@/shared-ui/hooks/index'
import {
  EQUIPMENT_RETURNS,
  UNVERIFIED_SERVICE_AREA,
  VISITOR,
} from 'src/constants'

interface PageProps {
  data: any
  success: boolean
}
function SSR(props: PageProps): JSX.Element {
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    shouldTriggerInvoca: false,
    eventData: {
      pageName: EQUIPMENT_RETURNS,
      eVar22: VISITOR,
      eVar49: UNVERIFIED_SERVICE_AREA,
    },
  })

  return (
    <MainLayout {...props}>
      <HeroBanner />
      <EquipmentReturnsSteps />

      <EquipmentTable />
      <ReturnProcedure />
      <HaveQuestions />
      <ReturnsPolicy />
    </MainLayout>
  )
}

export const getStaticProps = customStaticProps('/resources/equipment-returns')

export default SSR
