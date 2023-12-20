import customStaticProps from 'src/utils/appData'
import { HOME_PAGE, VISITOR, UNVERIFIED_SERVICE_AREA } from 'src/constants'
import dynamic from 'next/dynamic'
const BannerCarousal = dynamic(() => import('src/libs/home/BannerCarousal'))
const QuickAccess = dynamic(() => import('src/libs/home/QuickAccess'))
const PopularHelp = dynamic(() => import('src/libs/home/PopularHelp'))
const OrgSchema = dynamic(() => import('src/libs/home/OrgSchema'))
const MobileApp = dynamic(() => import('src/libs/home/MobileApp'))
const SwiperContent = dynamic(
  () => import('src/components/SwiperContent/SwiperContent'),
)
import { usePageLoadEvents } from 'src/hooks'
import { useEffect } from 'react'
import MainLayout from '@/shared-ui/layouts/main'
import { useSelector } from 'react-redux'
interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}

function SSR(props: PageProps): JSX.Element {
  // const { publicRuntimeConfig } = getConfig()
  const { configs } = useSelector((state: any) => state?.appConfig)
  // const [addScript, setAddScript] = useState(false)
  useEffect(() => {
    if (configs?.isChatOpen) {
      // setAddScript(true)
    }
  }, [configs])

  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: HOME_PAGE,
      eVar22: VISITOR,
      eVar49: UNVERIFIED_SERVICE_AREA,
    },
  })

  return (
    <>
      <MainLayout {...props}>
        <OrgSchema />
        <BannerCarousal />
        <QuickAccess />
        <PopularHelp />
        <SwiperContent />
        <MobileApp />
      </MainLayout>
    </>
  )
}
export const getStaticProps = customStaticProps('/')

export default SSR
