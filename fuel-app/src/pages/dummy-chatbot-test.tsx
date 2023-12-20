import customStaticProps from 'src/utils/appData'
import MainLayout from '@/shared-ui/layouts/main'
import { Typography } from '@/shared-ui/components'
interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}

function SSR(props: PageProps): JSX.Element {
  return (
    <>
      <MainLayout {...props} showDotcomChatbot={true}>
        <Typography tagType="h1" styleType="h2">
          Chatbot test in progress
        </Typography>
      </MainLayout>
    </>
  )
}
export const getStaticProps = customStaticProps('/')

export default SSR
