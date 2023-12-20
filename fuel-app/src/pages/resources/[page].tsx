import { makeStyles } from '@material-ui/core'
import { useRouter } from 'next/router'
import { LinearProgress } from '@material-ui/core'
import { VISITOR, UNVERIFIED_SERVICE_AREA } from 'src/constants'
import { DynamicComponent } from 'src/libs/resources'
import customStaticProps, {
  customStaticPropsfromAzure,
} from 'src/utils/appData'
import { usePageLoadEvents } from 'src/hooks'
import { ScrollTop } from '@/shared-ui/components'
import MainLayout from '@/shared-ui/layouts/main'
import { fetchPlaceholderData } from 'src/utils/appData/fetcher'
import { locales, TRANSLATIONS_ENABLED_PAGES } from 'src/locales'
import { dataParserForDynamic } from 'src/utils/appData/data-parser'
import { useMemo } from 'react'
interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

function SSR(props: PageProps): JSX.Element {
  const { data } = props
  const router = useRouter()
  const classes = useStyle()
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

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) return <LinearProgress />
  return (
    <MainLayout data={nonDynamicComponents} success={props.success}>
      <div className={data?.addBottomSpace?.value && classes.wrapper}>
        {dynamicComponents?.map((compData: any, i: number) => (
          <DynamicComponent data={compData} key={i} />
        ))}
      </div>
      <ScrollTop />
    </MainLayout>
  )
}

const getPath = (subPath: string) => `/resources/${subPath}`
const ignoredPages = [
  'cpni',
  'california-emergency',
  'autopay',
  'multifamily',
  'myfrontier-mobile-app',
  'pay-bill-online',
  'verification-confirmation',
  'frontier-id-registration',
  'cancel-service',
  'wifi-connection',
  'emergency-preparation',
  'accessibility',
  'equipment-returns',
  'bill-redesign',
]
export const getStaticPaths = async () => {
  let paths = []
  try {
    const {
      resources: { pages = [] },
    } = await fetchPlaceholderData('resources', 'en', 'pageList')
    paths = pages
      .filter(({ name: page }: any = {}) => !ignoredPages.includes(page))
      .reduce((pages: any, { name: page }: any = {}) => {
        const path = getPath(page)
        let localePaths: any[] = []
        if (TRANSLATIONS_ENABLED_PAGES.includes(path)) {
          localePaths = locales.map(({ code: locale }: any) => ({
            params: { page },
            locale,
          }))
        } else {
          localePaths.push({
            params: { page },
          })
        }
        return [...pages, ...localePaths]
      }, [])
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
    page: string
  }
}
const cdnPaths = ['/resources/movers']
//Need to use server side props for dynamic pages
export const getStaticProps = async (context: ContextProps) => {
  const resourcePath = getPath(context.params.page)
  if (cdnPaths.includes(resourcePath))
    return await customStaticPropsfromAzure(resourcePath, true)(context)
  else return await customStaticProps(resourcePath, true)(context)
}
const useStyle = makeStyles(({ breakpoints }) => ({
  wrapper: {
    marginBottom: 80,
    [breakpoints.down('sm')]: {
      marginBottom: 60,
    },
  },
}))
export default SSR
