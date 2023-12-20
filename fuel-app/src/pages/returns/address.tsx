import MainLayout from '@/shared-ui/layouts/main'
import ReturnsAddress from 'src/libs/returns/ReturnsAddress'
import customStaticProps from 'src/utils/appData'

interface PageProps {
  data: any
  success: boolean
}

function SSR(props: PageProps): JSX.Element {
  return (
    <MainLayout {...props}>
      <ReturnsAddress />
    </MainLayout>
  )
}

export const getStaticProps = customStaticProps('/returns')

export default SSR
