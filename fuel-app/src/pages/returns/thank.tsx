import MainLayout from '@/shared-ui/layouts/main'
import ReturnsThank from 'src/libs/returns/ReturnsThank'
import customStaticProps from 'src/utils/appData'

interface PageProps {
  data: any
  success: boolean
}

function SSR(props: PageProps): JSX.Element {
  return (
    <MainLayout {...props}>
      <ReturnsThank />
    </MainLayout>
  )
}

export const getStaticProps = customStaticProps('/returns')

export default SSR
