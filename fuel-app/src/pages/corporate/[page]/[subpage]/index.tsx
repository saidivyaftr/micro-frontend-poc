import { useRouter } from 'next/router'
import { LinearProgress } from '@material-ui/core'
import { VISITOR, UNVERIFIED_SERVICE_AREA } from 'src/constants'
import customStaticProps, { fetchPlaceholderData } from 'src/utils/appData'
import { useAlterChatRedirects, usePageLoadEvents } from 'src/hooks'
import DynamicComponent from 'src/libs/corporate/'
import MainLayout from '@/shared-ui/layouts/main'
import { dataParserForDynamic } from 'src/utils/appData/data-parser'
import { useMemo } from 'react'
interface PageProps {
  data: any
  success: boolean
}

interface NonDynamicComponentType {
  [key: string]: boolean
}

const NON_DYNAMIC_COMPONENTS: NonDynamicComponentType = {
  HeaderUpdated: true,
  'Sticky Navigation': true,
  ChatWithUs: true,
  newFooter: true,
  Alerts: true,
  LegalDescription: true,
}

function SSR({ data, success }: PageProps): JSX.Element {
  const router = useRouter()
  useAlterChatRedirects(!!data)
  const { nonDynamicComponents = {}, dynamicComponents = [] } = useMemo(() => {
    return dataParserForDynamic(data?.items, NON_DYNAMIC_COMPONENTS)
  }, [data])

  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: `ftr:${router.asPath.split('/').splice(1, 2).join('/')}`,
      eVar22: VISITOR,
      eVar49: UNVERIFIED_SERVICE_AREA,
    },
  })

  if (router.isFallback) return <LinearProgress />

  return (
    <MainLayout data={nonDynamicComponents} success={success}>
      {dynamicComponents?.map((compData: any, i: number) => (
        <DynamicComponent data={compData} key={i} />
      ))}
    </MainLayout>
  )
}
const ignoredPages = ['privacy-policy-california']
export const getStaticPaths = async () => {
  const {
    corporate: { pages = [] },
  } = await fetchPlaceholderData('resources', 'en', 'pageList')
  const paths = pages
    .filter(({ name: page }: any = {}) => !ignoredPages.includes(page))
    .reduce((path: any, { name: page, subPages = [] }: any = {}) => {
      const subPagesPaths = subPages?.map(({ name: subPage }: any) => ({
        params: { page, subPage },
      }))
      return [...path, ...subPagesPaths]
    }, [])
  return {
    paths,
    fallback: true,
  }
}

interface ContextProps {
  params: {
    page: string
    subpage: string
  }
}

//Need to use server side props for dynamic pages
export const getStaticProps = async (context: ContextProps) => {
  return await customStaticProps(
    `/corporate/${context.params.page}/${context.params.subpage}`,
    true,
  )(context)
}

export default SSR
