import customStaticProps from 'src/utils/appData'
import { useIsLoadingFromApp } from 'src/hooks'
import MainLayout from 'src/layouts/MainLayout'
import ServicesLayout from 'src/layouts/ServicesLayout'
import 'src/constants'
import { AppRoutes } from 'src/constants/'
import SessionTimeout from 'src/libs/services/shared/SessionTimeout'
import { CartContextProvider } from 'src/libs/services/CartContextProvider'
import CartPageComponent from 'src/libs/services/cart/CartPageComponent'

interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}

function CartPage(props: PageProps): JSX.Element {
  const isFromMobileApp = useIsLoadingFromApp()

  return (
    <SessionTimeout>
      <MainLayout
        hideHeader={isFromMobileApp}
        hideFooter={isFromMobileApp}
        {...props}
      >
        <ServicesLayout>
          <CartContextProvider>
            <CartPageComponent />
          </CartContextProvider>
        </ServicesLayout>
      </MainLayout>
    </SessionTimeout>
  )
}

export const getStaticProps = customStaticProps(AppRoutes.SelfServiceCartPage)

export default CartPage
