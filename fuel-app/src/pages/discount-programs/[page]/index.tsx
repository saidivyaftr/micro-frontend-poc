import { useRouter } from 'next/router'
import { LinearProgress } from '@material-ui/core'
import { VISITOR, UNVERIFIED_SERVICE_AREA } from 'src/constants'
import DynamicDiscountProgramsComponent from 'src/libs/discount-programs/page'
import customStaticProps from 'src/utils/appData'
import { usePageLoadEvents } from 'src/hooks'
import { ScrollTop } from '@/shared-ui/components'
import MainLayout from '@/shared-ui/layouts/main'
import { fetchPlaceholderData } from 'src/utils/appData/fetcher'
import { locales, TRANSLATIONS_ENABLED_PAGES } from 'src/locales'

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

  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: `ftr:${router.asPath.split('/').splice(1, 2).join('/')}`,
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
      {dynamicComponents?.map((compData: any) => (
        <DynamicDiscountProgramsComponent data={compData} key={compData.uid} />
      ))}

      <ScrollTop />
    </MainLayout>
  )
}
const ignoredPages = [
  'affordable-connectivity-program',
  'affordable-connectivity-program/acp-usage',
  'affordable-connectivity-program/availability',
  'affordable-connectivity-program/service-check',
  'california-teleconnect-fund',
  'lifeline-program',
  'affordable-connectivity-program/acknowledgement',
  'lifeline-program/acknowledgement',
]
const getPath = (subPath: string) => `/discount-programs/${subPath}`
export const getStaticPaths = async () => {
  let paths = []
  try {
    const {
      discountprogram: { pages = [] },
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
export const getStaticProps = async (context: ContextProps) => {
  return await customStaticProps(getPath(context.params.page), true)(context)
}

export default SSR
