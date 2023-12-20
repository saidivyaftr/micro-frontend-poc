import { useRouter } from 'next/router'
import { LinearProgress } from '@material-ui/core'
import { VISITOR, UNVERIFIED_SERVICE_AREA } from 'src/constants'
import customStaticProps, { fetchPlaceholderData } from 'src/utils/appData'
import { useAlterChatRedirects, usePageLoadEvents } from 'src/hooks'
import DynamicCityComponent from 'src/libs/local/state/city'
import MainLayout from '@/shared-ui/layouts/main'
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
}

function SSR({ data, success }: PageProps): JSX.Element {
  const router = useRouter()
  useAlterChatRedirects(!!data)
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: `ftr:${router.asPath.split('/').splice(1, 3).join('/')}`,
      eVar22: VISITOR,
      eVar49: UNVERIFIED_SERVICE_AREA,
    },
  })

  if (router.isFallback) return <LinearProgress />
  const dynamicComponents =
    data?.items?.filter(
      ({ componentName }: any) => !NON_DYNAMIC_COMPONENTS[componentName],
    ) || []

  return (
    <MainLayout data={data?.parsed} success={success}>
      {dynamicComponents?.map((compData: any, i: number) => (
        <DynamicCityComponent data={compData} key={i} />
      ))}
    </MainLayout>
  )
}

export const getStaticPaths = async () => {
  let paths = []
  try {
    const {
      local: { statePages = [] },
    } = await fetchPlaceholderData('resources', 'en', 'pageList')
    paths = statePages.reduce(
      (path: any, { name: state, cityPages = [] }: any = {}) => {
        const citiesPaths = cityPages?.map(({ name: city }: any) => ({
          params: { state, city },
        }))
        return [...path, ...citiesPaths]
      },
      [],
    )
  } catch {
    paths = []
  }
  return {
    paths,
    fallback: true,
  }
}

interface ContextProps {
  params: {
    state: string
    city: string
  }
}

//Need to use server side props for dynamic pages
export const getStaticProps = async (context: ContextProps) => {
  return await customStaticProps(
    `/local/${context.params.state}/${context.params.city}`,
    true,
  )(context)
}

export default SSR
