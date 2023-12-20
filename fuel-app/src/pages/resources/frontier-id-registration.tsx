import customStaticProps from 'src/utils/appData'
import MainLayout from '@/shared-ui/layouts/main'

import {
  HeroSection,
  DownloadApp,
  CreateAccount,
  ThreeTiles,
} from 'src/libs/resources/frontier-id-registration'

interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}

function SSR(props: PageProps): JSX.Element {
  return (
    <div>
      <MainLayout {...props}>
        <HeroSection />
        <ThreeTiles />
        <CreateAccount />
        <DownloadApp />
      </MainLayout>
    </div>
  )
}

export const getStaticProps = customStaticProps(
  '/resources/frontier-id-registration',
)

export default SSR
