import { useRouter } from 'next/router'
import { LinearProgress } from '@material-ui/core'
import { VISITOR, UNVERIFIED_SERVICE_AREA } from 'src/constants'
import customStaticProps, { fetchPlaceholderData } from 'src/utils/appData'
import { useAlterChatRedirects, usePageLoadEvents } from 'src/hooks'
import MainLayout from '@/shared-ui/layouts/main'
import DynamicComponent from 'src/libs/shop'
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
    shouldTriggerInvoca: true,
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
      {dynamicComponents?.map((compData: any, i: number) => {
        return <DynamicComponent data={compData} key={i} />
      })}
    </MainLayout>
  )
}

const ignoredPages = [
  'streaming-services',
  'tv/international-channels',
  'tv/dish-tv',
  'tv/channels',
  'tv/channels/international-channels',
  'tv/channels/nba-league-pass',
  'tv/channels/nfl-redzone',
  'tv/channels/showtime',
  'tv/channels/max',
]

export const getStaticPaths = async () => {
  let paths: any = [
    {
      params: {
        page: [],
      },
    },
  ]
  try {
    const {
      shop: { pages = [] },
    } = await fetchPlaceholderData('resources', 'en', 'pageList')
    const allPages: any = []
    const getPaths = (newArr: any, pages: any) => {
      pages.forEach((page: any) => {
        const { pages: subPages = [], name } = page
        const newPaths = [...newArr, name]
        allPages.push(newPaths)
        if (subPages.length > 0) {
          getPaths(newPaths, subPages)
        }
      })
    }
    getPaths([], pages)
    paths = allPages.reduce((params: any, page: any) => {
      if (!ignoredPages.includes(page.join('/')))
        params.push({
          params: {
            page,
          },
        })
      return params
    }, [])
  } catch (e) {
    paths = [
      {
        params: {
          page: [],
        },
      },
    ]
  }
  return {
    paths,
    fallback: true,
  }
}

interface ContextProps {
  params: {
    page: any
  }
}

//Need to use server side props for dynamic pages
export const getStaticProps = async (context: ContextProps) => {
  return await customStaticProps(
    `/shop/${context.params.page.join('/')}`,
    true,
  )(context)
}

export default SSR
