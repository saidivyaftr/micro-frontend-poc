import customStaticProps from 'src/utils/appData'
import MainLayout from '@/shared-ui/layouts/main'
import {
  CONTACT_US_PAGE,
  VISITOR,
  UNVERIFIED_SERVICE_AREA,
} from 'src/constants'
import { usePageLoadEvents } from 'src/hooks'

import DynamicComponent from 'src/libs/channel-updates/main'

interface PageProps {
  data: any
  success: boolean
}

interface NonDynamicComponentType {
  [key: string]: boolean
}

const NON_DYNAMIC_COMPONENTS: NonDynamicComponentType = {
  Alerts: true,
  'Sticky Navigation': true,
  newFooter: true,
  LegalDescription: true,
  HeaderUpdated: true,
  ChatWithUs: true,
}

function SSR({ data, success }: PageProps): JSX.Element {
  const currentPageUrl =
    (typeof window !== 'undefined' && window?.location?.href) || ''
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: CONTACT_US_PAGE,
      pageUrl: currentPageUrl,
      eVar22: VISITOR,
      eVar49: UNVERIFIED_SERVICE_AREA,
    },
  })

  const dynamicComponents =
    data?.items?.filter(
      ({ componentName }: any) => !NON_DYNAMIC_COMPONENTS[componentName],
    ) || []

  return (
    <MainLayout data={data?.parsed} success={success}>
      {dynamicComponents?.map((compData: any, i: number) => (
        <DynamicComponent data={compData} key={i} />
      ))}
    </MainLayout>
  )
}

interface ContextProps {
  params: {
    state: string
  }
}

export const getStaticProps = async (context: ContextProps) => {
  return await customStaticProps(`/channel-updates/main`, true)(context)
}
export default SSR
