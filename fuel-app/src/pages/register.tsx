import customStaticProps from 'src/utils/appData'
import MainLayout from '@/shared-ui/layouts/main'
import { Register } from 'src/libs/register'

interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}

function SSR(props: PageProps): JSX.Element {
  return (
    <MainLayout {...props} miniFooter>
      <Register />
    </MainLayout>
  )
}
export const getStaticProps = customStaticProps('/register')

export default SSR
