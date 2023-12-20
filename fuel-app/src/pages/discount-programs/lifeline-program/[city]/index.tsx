import { useRouter } from 'next/router'
import { LinearProgress } from '@material-ui/core'
import { VISITOR, UNVERIFIED_SERVICE_AREA } from 'src/constants'
import customStaticProps, { fetchPlaceholderData } from 'src/utils/appData'

import { useAlterChatRedirects, usePageLoadEvents } from 'src/hooks'
import DynamicLifelineCityComponent from 'src/libs/discount-programs/lifeline-program/city'
import MainLayout from '@/shared-ui/layouts/main'
import { locales, TRANSLATIONS_ENABLED_PAGES } from 'src/locales'
interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}

interface NonDynamicComponentType {
  [key: string]: boolean
}

const NON_DYNAMIC_COMPONENTS: NonDynamicComponentType = {
  'Sticky Navigation': true,
  newFooter: true,
  LegalDescription: true,
  HeaderUpdated: true,
}

function SSR(props: PageProps): JSX.Element {
  const { data } = props
  const router = useRouter()
  useAlterChatRedirects(!!data)

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
    <MainLayout data={data?.parsed} success={props.success}>
      {dynamicComponents?.map((compData: any, i: number) => (
        <DynamicLifelineCityComponent data={compData} key={i} />
      ))}
    </MainLayout>
  )
}

const ignoredPages = ['acknowledgement']

const getPath = (subPath: string) =>
  `/discount-programs/lifeline-program/${subPath}`

export const getStaticPaths = async () => {
  let paths = []
  try {
    const {
      lifelineprogram: { state = [] },
    } = await fetchPlaceholderData('resources', 'en', 'pageList')
    paths = state
      .filter(({ name: city }: any = {}) => !ignoredPages.includes(city))
      .reduce((pages: any, { name: city }: any = {}) => {
        const path = getPath(city)
        let localePaths: any[] = []
        if (TRANSLATIONS_ENABLED_PAGES.includes(path)) {
          localePaths = locales.map(({ code: locale }: any) => ({
            params: { city },
            locale,
          }))
        } else {
          localePaths.push({
            params: { city },
          })
        }
        return [...pages, ...localePaths]
      }, [])
  } catch (e) {}
  return {
    paths,
    fallback: true,
  }
}

interface ContextProps {
  params: {
    city: string
  }
}

//Need to use server side props for dynamic pages
export const getStaticProps = async (context: ContextProps) => {
  return await customStaticProps(getPath(context.params.city), true)(context)
}

export default SSR
