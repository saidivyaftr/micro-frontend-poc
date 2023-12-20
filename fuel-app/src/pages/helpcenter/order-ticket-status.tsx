import customStaticProps from 'src/utils/appData'
import MainLayout from '@/shared-ui/layouts/main'
import {
  Hero,
  TrackOrders,
  OrderTicketContainer,
} from 'src/libs/helpcenter/order-ticket-status'
interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}

function SSR(props: PageProps): JSX.Element {
  return (
    <MainLayout showChat={false} {...props}>
      <Hero />
      <OrderTicketContainer />
      <TrackOrders />
    </MainLayout>
  )
}
export const getStaticProps = customStaticProps(
  '/helpcenter/order-ticket-status',
)

export default SSR
