import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { AppRoutes } from 'src/constants/appRoutes'
import { useAppData } from 'src/hooks'
import customStaticProps from 'src/utils/appData'
import MainLayout from 'src/layouts/MainLayout'
import ServicesLayout from 'src/layouts/ServicesLayout'
import SelfServiceHeader from 'src/libs/services/shared/selfServiceHeader'
import YouMightAlsoLike from 'src/libs/services/shared/YouMightAlsoLike'
import ProductDetails from 'src/libs/services/ProductDetails'
import SystemError from 'src/libs/services/shared/ErrorModal'
import ExpertSupport from 'src/libs/services/shared/ExpertSupport'
import WhyPremiumTechPro from 'src/libs/services/shared/WhyChoose'
import { offersData, offerData } from 'src/libs/services/shared/types'
import ApiErrorModal from 'src/libs/services/shared/ApiErrorModal'
import useIsLoadingFromApp from '@/shared-ui/hooks/useIsLoadingFromApp'
import { SELF_SERVICE, SESSION_STORAGE } from 'src/constants'
import { updateProductViewAnalytics } from 'src/libs/services/shared/AnalyticsUtlis'
// import { shouldRedirect } from 'src/libs/services/shared/miscUtlis'
import SessionTimeout from 'src/libs/services/shared/SessionTimeout'
import { useSelector } from 'react-redux'
import { CartContextProvider } from 'src/libs/services/CartContextProvider'

interface OfferProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}

function SelfServicePDP(props: OfferProps): JSX.Element {
  const router = useRouter()
  //const { s } = router.query
  //const sourceId = s as string
  const pageCode = SELF_SERVICE.PRODUCT_MPTP_PAGE_CODE
  const servicesHeaderSitecoreData = useAppData('servicePageHero', true)

  const [pdpOffersData, setPdpOffersData] = useState<offersData>()
  const [sourceId, setSourceId] = useState<string>('')
  const [cartItemCount, setCartItemCount] = useState<number>(0)
  const [isViewedMatching, setIsViewedMatching] = useState<boolean>(false)
  const [cartData, setCartData] = useState<any>()

  const hasDTMLLoaded = useSelector(
    (state: any) => state?.appConfig?.configs?.['DTM'],
  )
  useEffect(() => {
    if (hasDTMLLoaded) {
      updateProductViewAnalytics(pageCode)
    }
  }, [hasDTMLLoaded])

  useEffect(() => {
    /** 
      Adding/Updating Session Storage to check A user visit count for a VAS Product Detail Page. 
    **/
    if (router.isReady) {
      // const authFromSession = sessionStorage.getItem(
      //   SESSION_STORAGE.TOKEN,
      // ) as string
      const sourceIdSession = sessionStorage.getItem(
        SESSION_STORAGE.SID,
      ) as string
      setSourceId(sourceIdSession)
      // shouldRedirect(authFromSession)
      const sessionData =
        sessionStorage.getItem(SESSION_STORAGE.PDP_PAGEVIEW) || ''
      const pageViewCount = sessionData ? Number(sessionData) + 1 : 0
      sessionStorage.setItem(
        SESSION_STORAGE.PDP_PAGEVIEW,
        pageViewCount.toString(),
      )
      const cartData = JSON.parse(
        sessionStorage.getItem(SESSION_STORAGE.CART_DATA) || '{}',
      )
      if (!cartData) {
        sessionStorage.clear()
        window.location.href = '../login'
      }
      setCartData(cartData)
    }
  }, [router.isReady])

  useEffect(() => {
    if (cartData?.CartLineItems?.length > 0) {
      const cartItems = cartData.CartLineItems.filter(
        (item: { Type: string }) => item.Type === 'New',
      )
      setCartItemCount(cartItems.length)
      const itemsInCart = cartItems.find(
        (item: { ItemCode: string }) => item.ItemCode === pageCode,
      )
      setIsViewedMatching(!!itemsInCart)
      setPdpOffersData(cartData)
    }
  }, [cartData])

  const isFromMobileApp = useIsLoadingFromApp()
  return (
    <SessionTimeout>
      <MainLayout
        hideHeader={isFromMobileApp}
        hideFooter={isFromMobileApp}
        {...props}
      >
        <ServicesLayout>
          <SystemError />
          <ApiErrorModal />
          {pdpOffersData && pdpOffersData.Offers?.length !== 0 && (
            <>
              <CartContextProvider>
                <SelfServiceHeader
                  sourceId={sourceId}
                  pageCode={pageCode}
                  pdpOffersData={pdpOffersData}
                  cartItemCount={cartItemCount}
                  setCartItemCount={setCartItemCount}
                  isViewedMatching={isViewedMatching}
                  setIsViewedMatching={setIsViewedMatching}
                  clickEventName={SELF_SERVICE.PRODUCT_MPTP}
                  servicesHeaderSitecoreData={servicesHeaderSitecoreData}
                  getOfferData={pdpOffersData?.Offers.find(
                    (item: offerData) => item?.ItemCode === pageCode,
                  )}
                />
                <ExpertSupport
                  cartStickyBarContent={servicesHeaderSitecoreData}
                />
                <WhyPremiumTechPro />
                <ProductDetails />
                <YouMightAlsoLike
                  pageCode={pageCode}
                  pdpOffersData={pdpOffersData?.Offers}
                />
              </CartContextProvider>
            </>
          )}
        </ServicesLayout>
      </MainLayout>
    </SessionTimeout>
  )
}

export const getStaticProps = customStaticProps(
  AppRoutes.SelfServicePremiumTechPro,
)

export default SelfServicePDP
