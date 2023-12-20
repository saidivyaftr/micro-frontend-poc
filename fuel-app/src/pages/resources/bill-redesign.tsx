import { customStaticPropsfromAzure } from 'src/utils/appData'
import MainLayout from '@/shared-ui/layouts/main'
import { usePageLoadEvents } from 'src/hooks'
import { UNVERIFIED_SERVICE_AREA, VISITOR } from 'src/constants'
import HeroSection from 'src/libs/resources/bill-redesign/HeroSection'
import SwiperSection from 'src/libs/resources/bill-redesign/SwiperSection'
import BillRedeisgnFAQ from 'src/libs/resources/bill-redesign/Faq'
import { useRouter } from 'next/router'

interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}

function SSR(props: PageProps): JSX.Element {
  const router = useRouter()

  const pageName = router.asPath
    .split('/')
    .filter((x) => x)
    .join('/')

  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: `ftr:${pageName}`,
      eVar22: VISITOR,
      eVar49: UNVERIFIED_SERVICE_AREA,
    },
  })
  return (
    <MainLayout {...props}>
      <HeroSection />
      <SwiperSection />
      <BillRedeisgnFAQ />
    </MainLayout>
  )
}
export const getStaticProps = customStaticPropsfromAzure(
  '/resources/bill-redesign',
)

export default SSR
