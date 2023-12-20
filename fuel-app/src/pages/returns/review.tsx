import MainLayout from '@/shared-ui/layouts/main'
import ReturnsReview from 'src/libs/returns/ReturnsReview'
import customStaticProps from 'src/utils/appData'

interface PageProps {
  data: any
  success: boolean
}

function SSR(props: PageProps): JSX.Element {
  return (
    <MainLayout {...props}>
      <ReturnsReview />
    </MainLayout>
  )
}

export const getStaticProps = customStaticProps('/returns')

export default SSR
