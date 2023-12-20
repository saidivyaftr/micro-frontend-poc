import customStaticProps from 'src/utils/appData'
import MainLayout from '@/shared-ui/layouts/main'
import { GTagPageLoadEvent, GTAG_ID } from 'src/utils/gtag'
import {
  Hero,
  BreadcrumbNav,
  RichTextCaliforniaTeleconnect,
} from 'src/libs/discount-programs/california-teleconnect-fund'
interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}
function SSR(props: PageProps): JSX.Element {
  return (
    <>
      <GTagPageLoadEvent id={GTAG_ID} />
      <MainLayout {...props}>
        <Hero />
        <BreadcrumbNav />
        <RichTextCaliforniaTeleconnect />
      </MainLayout>
    </>
  )
}

export const getStaticProps = customStaticProps(
  '/discount-programs/california-teleconnect-fund',
)

export default SSR
