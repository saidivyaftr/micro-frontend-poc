import MainLayout from '@/shared-ui/layouts/main'
import ReturnsList from 'src/libs/returns/ReturnsList'
import customStaticProps from 'src/utils/appData'

interface PageProps {
  data: any
  success: boolean
}

function SSR(props: PageProps): JSX.Element {
  return (
    <MainLayout {...props}>
      <ReturnsList />
    </MainLayout>
  )
}

export const getStaticProps = customStaticProps('/returns')

export default SSR
