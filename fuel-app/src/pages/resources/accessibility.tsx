import { customStaticPropsfromAzure } from 'src/utils/appData'
import MainLayout from '@/shared-ui/layouts/main'

import {
  Hero,
  ImageWithTextPanelWrapper,
  FAQ,
} from 'src/libs/resources/accessibility'

interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}

function SSR(props: PageProps): JSX.Element {
  return (
    <div>
      <MainLayout {...props}>
        <Hero />
        <ImageWithTextPanelWrapper />
        <FAQ />
      </MainLayout>
    </div>
  )
}

export const getStaticProps = customStaticPropsfromAzure(
  '/resources/accessibility',
)

export default SSR
