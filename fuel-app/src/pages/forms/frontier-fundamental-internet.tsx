import customStaticProps from 'src/utils/appData'
import MainLayout from '@/shared-ui/layouts/main'
import { FrontierFundamentalInternetForm } from 'src/libs/forms/frontier-fundamental-internet'

interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}

function SSR(props: PageProps): JSX.Element {
  return (
    <div>
      <MainLayout {...props}>
        <FrontierFundamentalInternetForm />
      </MainLayout>
    </div>
  )
}

export const getStaticProps = customStaticProps(
  '/forms/frontier-fundamental-internet',
)

export default SSR
