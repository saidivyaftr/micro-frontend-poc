import MainLayout from '@/shared-ui/layouts/main'
import customStaticProps from 'src/utils/appData'
import { fetchPlaceholderData } from 'src/utils/appData/fetcher'
import { locales, TRANSLATIONS_ENABLED_PAGES } from 'src/locales'
import DynamicComponent from 'src/libs/channel-updates/channel'
import usePageLoadEvents from '@/shared-ui/hooks/usePageLoadEvents'
import { UNVERIFIED_SERVICE_AREA, VISITOR } from 'src/constants'
import { useRouter } from 'next/router'

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
  const router = useRouter()

  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: `ftr:${router.asPath.split('/').splice(1, 3).join('/')}`,
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

const ignoredPages = ['main']

const getPath = (subPath: string) => `/channel-updates/${subPath}`
export const getStaticPaths = async () => {
  const {
    channelUpdates: { pages = [] },
  } = await fetchPlaceholderData('resources', 'en', 'pageList')

  const paths = pages
    .filter(({ name: channel }: any = {}) => !ignoredPages.includes(channel))
    .reduce((pages: any, { name: channel }: any = {}) => {
      const path = getPath(channel)
      let localePaths: any[] = []
      if (TRANSLATIONS_ENABLED_PAGES.includes(path)) {
        localePaths = locales.map(({ code: locale }: any) => ({
          params: { channel },
          locale,
        }))
      } else {
        localePaths.push({
          params: { channel },
        })
      }
      return [...pages, ...localePaths]
    }, [])
  return {
    paths,
    fallback: true,
  }
}

interface ContextProps {
  params: {
    channel: string
  }
}

export const getStaticProps = async (context: ContextProps) => {
  return await customStaticProps(getPath(context.params.channel), true)(context)
}

export default SSR
