import MainLayout from '@/shared-ui/layouts/main'
import ReturnsFind from 'src/libs/returns/ReturnsFind'
import customStaticProps from 'src/utils/appData'

interface PageProps {
  data: any
  success: boolean
}

function SSR(props: PageProps): JSX.Element {
  return (
    <MainLayout {...props}>
      <ReturnsFind />
    </MainLayout>
  )
}

export const getStaticProps = customStaticProps('/returns')

export default SSR
