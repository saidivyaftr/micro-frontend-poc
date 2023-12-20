import { useDispatch, useSelector } from 'react-redux'
import customStaticProps from 'src/utils/appData'
import CartHero from 'src/libs/services/cart/CartHero'
import CartDetail from 'src/libs/services/cart/CartDetail'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import APIClient from 'src/api-client'
import { InjectHTML, Loading } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core/styles'
import EmptyCart from 'src/libs/services/cart/EmptyCart'
import YouMightAlsoLike from 'src/libs/services/shared/YouMightAlsoLike'
import { setApiErrorCode } from 'src/redux/slicers/apiErrors'
import ApiErrorModal from 'src/libs/services/shared/ApiErrorModal'
import {
  AppRoutes,
  COMPONENT_WRAPPER,
  SESSION_STORAGE,
  SELF_SERVICE,
  SELF_SERVICE_PAGES,
} from 'src/constants/'
import {
  cartPageViewAnalytics,
  updateCartClickAnalytics,
} from 'src/libs/services/shared/AnalyticsUtlis'
import { CartLineItem, offersData } from 'src/libs/services/shared/types'
import { useCartDataContext } from 'src/libs/services/CartContextProvider'
import useAppData from '@/shared-ui/hooks/useAppData'
import { getProductCode, getProductVAS } from '../shared/miscUtlis'

function CartPageComponent(): JSX.Element {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [cartData, setCartData] = useState<offersData>()
  const [sourceId, setSourceId] = useState('')
  const [showLoading, setShowLoading] = useState(true)
  const [placeOrderLoading, setPlaceOrderLoading] = useState(false)
  const router = useRouter()
  const [newCartItems, setNewCartItems] = useState<CartLineItem[]>()
  const [newServices, setNewServices] = useState<CartLineItem[]>([])
  const [productsStringForAnalytics, setProductsStringForAnalytics] =
    useState('')
  const { setCartDataFromSession } = useCartDataContext()
  const youtubeTvDisclaimer = useAppData('youtubeTvDisclaimer', true)
  const hasDTMLLoaded = useSelector(
    (state: any) => state?.appConfig?.configs?.['DTM'],
  )
  const curCartData = JSON.parse(
    sessionStorage.getItem(SESSION_STORAGE.CART_DATA) || 'null',
  )
  useEffect(() => {
    if (hasDTMLLoaded && productsStringForAnalytics !== '') {
      cartPageViewAnalytics(
        SELF_SERVICE_PAGES.CHECKOUT_PAGE,
        productsStringForAnalytics,
        'scCheckout',
        SELF_SERVICE.CHECKOUT,
        curCartData.oneTimeChargesTotal === 0 ? 'no fees' : 'with fees',
      )
    }
  }, [hasDTMLLoaded, productsStringForAnalytics])
  const filterYTTVInCart = newCartItems?.filter(
    (item) => item.ItemCode === SELF_SERVICE.PRODUCT_YTTVE_PAGE_CODE,
  )
  const isYTTVinCart = filterYTTVInCart && filterYTTVInCart.length > 0

  useEffect(() => {
    const sourceIdSession = sessionStorage.getItem(
      SESSION_STORAGE.SID,
    ) as string
    setSourceId(sourceIdSession)

    if (!curCartData) {
      window.location.href = '../login'
    } else {
      setCartData(curCartData)
      // Updaing the Analytics once we have Cart Data, When Page Loads
      const newCartItems: CartLineItem[] = curCartData.newItemsInCart

      if (newCartItems) {
        const filteredCartItems = curCartData.newServicesInCart
        const productsString = getProductVAS(
          newCartItems,
          filteredCartItems,
        ).join(',')
        setProductsStringForAnalytics(productsString)
      }
    }
  }, [])

  useEffect(() => {
    if (cartData) {
      setNewCartItems(cartData?.newItemsInCart)
      setNewServices(cartData?.newServicesInCart)
      setShowLoading(false)
    }
  }, [cartData])

  const removeFromCartHandler = async (itemData: any) => {
    // Call API and in response update the animation.
    setShowLoading(true)
    try {
      const response: any = await APIClient.updateCartSelfService({
        body: {
          sCaseID: cartData?.sCaseID,
          ItemCode: itemData?.ItemCode,
          ItemSequence: itemData?.ItemSequence,
          Action: SELF_SERVICE.REMOVE,
          Quantity: 1,
        },
        sourceId,
      })
      setShowLoading(false)
      sessionStorage.setItem(
        SESSION_STORAGE.CART_DATA,
        JSON.stringify(response.data),
      )
      setCartDataFromSession(response.data)
      setCartData(response.data)
      updateCartClickAnalytics(
        1,
        getProductCode(itemData?.ItemCode, itemData?.Category),
        'REMOVE',
        SELF_SERVICE.PRODUCT_CART_PAGE,
        '1',
        '1',
      )

      const newCartItems: CartLineItem[] = response.data.newItemsInCart
      const filteredCartItems = response.data.newServicesInCart
      const productsString = getProductVAS(
        newCartItems,
        filteredCartItems,
      ).join(',')
      setProductsStringForAnalytics(productsString)
      return response.data
    } catch (error: any) {
      setShowLoading(false)
      dispatch(
        setApiErrorCode({
          module: 'cartApi',
          errorCode: error?.response?.status,
        }),
      )
    }
  }

  const handlePlaceOrder = async () => {
    setPlaceOrderLoading(true)

    // TODO - After new cart implementation, below logic need to check again
    if (!newCartItems || !newCartItems?.length) return

    const orderData = newServices.map((item: CartLineItem) => {
      return {
        sCaseID: cartData?.sCaseID,
        ItemCode: item.ItemCode,
        Quantity: 1,
      }
    })
    try {
      const response: any = await APIClient.placeOrderSelfService({
        body: [...orderData],
        sourceId,
      })
      sessionStorage.setItem(
        SESSION_STORAGE.ORDER_DATA,
        JSON.stringify(response.data),
      )
      router.push(
        `${AppRoutes.SelfServiceConfirmationPage}${window.location.search}`,
      )
    } catch (error: any) {
      setShowLoading(false)
      setPlaceOrderLoading(false)
      dispatch(
        setApiErrorCode({
          module: 'placeOrderApi',
          errorCode: error?.response?.status,
        }),
      )
    }
  }

  return (
    <>
      <ApiErrorModal />
      <CartHero />
      {showLoading ? (
        <Loading className={classes.loaderArea} />
      ) : (
        <>
          {!newCartItems || newCartItems.length === 0 ? (
            <>
              <EmptyCart />
              <YouMightAlsoLike
                pageCode={''}
                pdpOffersData={cartData?.Offers}
              />
            </>
          ) : (
            <>
              <CartDetail
                removeHandler={removeFromCartHandler}
                cartData={cartData}
                handlePlaceOrder={handlePlaceOrder}
                placeOrderLoading={placeOrderLoading}
                setCartData={setCartData}
              />

              <div className={classes.descriptionDiv}>
                {isYTTVinCart && (
                  <InjectHTML
                    styleType="legal"
                    tagType="div"
                    color="default"
                    className={classes.space}
                    value={youtubeTvDisclaimer?.descriptionYoutubeTv?.value}
                  />
                )}
              </div>
            </>
          )}
        </>
      )}
    </>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  loaderArea: {
    ...COMPONENT_WRAPPER,
    height: 500,
  },
  descriptionDiv: {
    maxWidth: '75rem',
    margin: 'auto',
    padding: '64px 0 0 0',
    [breakpoints.down('md')]: {
      margin: 'auto 8.125rem',
      padding: '42px 0 68px 0',
    },
    [breakpoints.down('sm')]: {
      margin: 'auto 2.125rem',
    },
    [breakpoints.down('xs')]: {
      margin: 'auto 1rem',
    },
  },
  space: {
    fontSize: 11,
    marginTop: 20,
  },
  space20: {
    marginTop: 20,
  },
}))

export const getStaticProps = customStaticProps(AppRoutes.SelfServiceCartPage)

export default CartPageComponent
