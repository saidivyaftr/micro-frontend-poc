import { Fragment, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { LinearProgress } from '@material-ui/core'
import { VISITOR, UNVERIFIED_SERVICE_AREA, SITE_ERROR } from 'src/constants'
import customStaticProps from 'src/utils/appData'
import PageHead from 'src/components/PageHead'
import {
  usePageLoadEvents,
  useAppData,
  useIsLoadingFromApp,
  useMainLayoutEffects,
} from 'src/hooks'
import DynamicArticleComponent from 'src/libs/helpcenter/category/article'
import BreadCrumbAndSearchBar from 'src/libs/helpcenter/category/article/components/BreadCrumbAndSearchBar'
import ComponentWrapper, {
  LeftWrapper,
  RightWrapper,
} from 'src/libs/helpcenter/category/article/components/ComponentWrapper'
import SomethingWrong from 'src/components/SomethingWrong'
import { appDataSlice } from 'src/redux/slicers'
import MedalliaFeedback from 'src/libs/helpcenter/category/article/components/MedalliaFeedback'
import SocialMedia from 'src/libs/helpcenter/category/article/components/SocialMedia'
import { FindWhatYouNeed } from 'src/libs/helpcenter/common'
import { useDispatch, useSelector } from 'react-redux'
import dataParser from 'src/utils/appData/data-parser'
import APIClient from 'src/api-client'
import { fetchPlaceholderData } from 'src/utils/appData/fetcher'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
const RenderChat = dynamic(() => import('src/utils/RenderChat'))
//@ts-ignore
import SmartBanner from 'react-smartbanner'
import { getSmartBannerUrlMap } from 'src/utils/deepLink'

const NewHeader = dynamic(() => import('src/components/NewHeader'))
const NewFooter = dynamic(() => import('src/components/NewFooter'))

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
  contactUs: true,
}

const RIGHT_LAYOUT_COMPONENT: NonDynamicComponentType = {
  jumpLinks: true,
  social_media_links: true,
}

function SSR({ data, success }: PageProps): JSX.Element {
  const router = useRouter()
  const dispatch = useDispatch()
  const { sessionValid } = useSelector((state: any) => state?.session)
  const { chatType } = useMainLayoutEffects({
    showChat: true,
    isLoading: !data,
  })
  const { showSmartBanner, title, author, redirectUrl }: any = useAppData(
    'smartBanner',
    true,
  )

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [userAccountStatus, setUserAccountStatus] = useState<any>()
  const pageName = router.asPath
    .split('/')
    .filter((x) => x)
    .join('/')

  const isFromMobileApp = useIsLoadingFromApp()

  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: `ftr:${pageName}`,
      eVar22: VISITOR,
      eVar49: UNVERIFIED_SERVICE_AREA,
    },
  })

  useEffect(() => {
    const parsedData = dataParser({
      sitecore: {
        route: {
          placeholders: {
            json: data?.items || [],
          },
        },
      },
    })
    dispatch(appDataSlice.actions.setData(parsedData))
  }, [dispatch, data])

  useEffect(() => {
    if (document) {
      document.body.style.overflow = 'unset'
    }
    if (sessionValid) getUserAccountInformation()
  }, [sessionValid])

  const getUserAccountInformation = async () => {
    try {
      const { data: userAccountInformation } =
        await APIClient.quickLinksMetaData()
      if (userAccountInformation) {
        setUserAccountStatus(userAccountInformation)
      }
    } catch (error) {
      DTMClient.triggerEvent(
        {
          events: 'event88',
          eVar2: 'user account information',
          eVar88: 'Failed to retrieve user account',
        },
        'tl_o',
        SITE_ERROR,
      )
      console.log(error)
    }
  }

  const getComponent = (field: string) =>
    data?.items?.find(({ componentName }: any) => componentName === field)

  const getComponentData = (field: string) => {
    return data?.items?.find(
      ({ componentName }: any) => componentName === field,
    )?.fields?.data?.datasource
  }

  // Fixed layout items
  const headerData: any = getComponentData('HeaderUpdated')
  const footerData: any = getComponentData('newFooter')
  const legalData: any = getComponentData('LegalDescription')
  const stickyData: any = getComponentData('Sticky Navigation')
  const alertData: any = getComponentData('Alerts')
  const contactData: any = getComponentData('ChatWithUs')

  // Right fixed layout items
  const jumpLinks: any = getComponent('jumpLinks')
  const socialMediaLinks: any = getComponent('social_media_links')
  const rightElements = [jumpLinks, socialMediaLinks]

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) return <LinearProgress />
  const dynamicComponents =
    data?.items?.filter(
      ({ componentName }: any) =>
        !NON_DYNAMIC_COMPONENTS[componentName] &&
        !RIGHT_LAYOUT_COMPONENT[componentName],
    ) || []

  if (!success) return <SomethingWrong />

  return (
    <Fragment>
      <PageHead />
      {headerData && (
        <NewHeader
          headerData={headerData}
          stickyData={stickyData}
          alertData={alertData}
        />
      )}
      {!isFromMobileApp && showSmartBanner?.value && (
        <SmartBanner
          title={title?.value}
          daysHidden={60}
          daysReminder={0}
          position={'top'}
          author={author?.value}
          url={redirectUrl?.value && getSmartBannerUrlMap(redirectUrl.value)}
        />
      )}
      <BreadCrumbAndSearchBar />
      <ComponentWrapper>
        <LeftWrapper>
          {dynamicComponents?.map((compData: any, i: number) => {
            return <DynamicArticleComponent data={compData} key={i} />
          })}
          <SocialMedia
            data={socialMediaLinks?.fields?.data?.datasource}
            hideOnLargeDisplays
          />
          <MedalliaFeedback />
        </LeftWrapper>
        <RightWrapper>
          {rightElements?.map((compData: any, i: number) => (
            <DynamicArticleComponent data={compData} key={i} />
          ))}
        </RightWrapper>
      </ComponentWrapper>
      {contactData && <FindWhatYouNeed data={contactData} />}
      {footerData && <NewFooter data={footerData} legalData={legalData} />}
      <RenderChat chatType={chatType} />
    </Fragment>
  )
}
const ignoredPages = [
  'account',
  'billing',
  'phone',
  'frontier-installation',
  'internet',
  'order-ticket-status',
  'tv',
]
export const getStaticPaths = async () => {
  let paths = []
  try {
    const {
      helpcenter: { category = [] },
    } = await fetchPlaceholderData('resources', 'en', 'pageList')
    paths = category
      .filter(({ name }: any = {}) => !ignoredPages.includes(name))
      .map(({ name: category }: any = {}) => ({
        params: { category },
      }))
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
    category: string
  }
}

// Need to use server side props for dynamic pages
export const getStaticProps = async (context: ContextProps) => {
  return await customStaticProps(
    `/helpcenter/${context.params.category}`,
    true,
  )(context)
}

export default SSR
