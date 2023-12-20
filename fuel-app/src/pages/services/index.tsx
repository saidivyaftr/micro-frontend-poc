import { AppRoutes } from 'src/constants/'
import customStaticProps from 'src/utils/appData'
import { useIsLoadingFromApp } from 'src/hooks'
import MainLayout from 'src/layouts/MainLayout'
import ServicesLayout from 'src/layouts/ServicesLayout'
import SessionTimeout from 'src/libs/services/shared/SessionTimeout'
import { CartContextProvider } from 'src/libs/services/CartContextProvider'
import AdditionalServicesComponent from 'src/libs/services/additional-services/AdditionalServicesComponent'
interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}

function AdditionalServices(props: PageProps): JSX.Element {
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
            <AdditionalServicesComponent />
          </CartContextProvider>
        </ServicesLayout>
      </MainLayout>
    </SessionTimeout>
  )
}

export const getStaticProps = customStaticProps(AppRoutes.AdditionalServices)

export default AdditionalServices
