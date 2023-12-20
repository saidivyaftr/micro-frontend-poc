import { AppRoutes } from 'src/constants/'
import customStaticProps from 'src/utils/appData'
// import { useSelector } from 'react-redux'
// import { State } from 'src/redux/types'
import { useBreadcrumbParser, useIsLoadingFromApp } from 'src/hooks'
import SessionTimeout from 'src/libs/services/shared/SessionTimeout'
import MainLayout from 'src/layouts/MainLayout'
import MyServicesHero from 'src/libs/account/services/MyServiceHero/MyServiceHero'
import MyServicesTabbedPanel from 'src/libs/account/services/MyServicesTabbedPanel/MyServicesTabbedPanel'
import AccountLayout from 'src/layouts/AccountLayout'
import { MyServicesContextProvider } from 'src/libs/account/services/MyServicesContextProvider'
import { CartContextProvider } from 'src/libs/services/CartContextProvider'
import { useAppData } from 'src/hooks'

https: interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}

function MyServices(props: PageProps): JSX.Element {
  const heroBannerSitecore = useAppData('heroBannerSitecore', true)
  // const { accountInfoOnLoad, activeAccount } =
  //   useSelector((state: State) => state?.account) || {}
  const isFromMobileApp = useIsLoadingFromApp()
  const breadCrumbData = useBreadcrumbParser(
    heroBannerSitecore?.breadcrumb?.targetItems,
  )

  return (
    <SessionTimeout>
      <MainLayout
        hideHeader={isFromMobileApp}
        hideFooter={isFromMobileApp}
        {...props}
      >
        <AccountLayout {...props}>
          <CartContextProvider>
            <MyServicesContextProvider>
              <MyServicesHero
                title={heroBannerSitecore?.title?.value}
                breadcrumb={breadCrumbData}
                showCheckoutButton={true}
              />
              <MyServicesTabbedPanel />
            </MyServicesContextProvider>
          </CartContextProvider>
        </AccountLayout>
      </MainLayout>
    </SessionTimeout>
  )
}

export const getStaticProps = customStaticProps(AppRoutes.MyServices)

export default MyServices
