import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import ServicesHero from './ServicesHero'
import ServiceStickyBar from './ServiceStickyBar'
import APIClient from 'src/api-client'
import { setApiErrorCode } from 'src/redux/slicers/apiErrors'
import { SELF_SERVICE, SESSION_STORAGE } from 'src/constants'
import { updateCartClickAnalytics } from 'src/libs/services/shared/AnalyticsUtlis'
import { SelfServicesHeaderTypes, offerData } from '../types'
import { useCartDataContext } from 'src/libs/services/CartContextProvider'
import { formatUrl } from 'src/utils/urlHelpers'

function SelfServiceHeader(props: SelfServicesHeaderTypes): JSX.Element {
  const {
    sourceId,
    pageCode,
    getOfferData,
    pdpOffersData,
    cartItemCount,
    setCartItemCount,
    isViewedMatching,
    setIsViewedMatching,
    servicesHeaderSitecoreData,
    clickEventName,
    productPriceSubText,
    openExtenderModal = false,
    setOpenExtenderModal,
    setShowSpinner,
  } = props

  const dispatch = useDispatch()

  const [showAddCartButton, setShowAddCartButton] = useState(true)
  const [showButtonLoading, setShowButtonLoading] = useState(false)
  const { contextCartData, setContextCartData } = useCartDataContext()

  const remainingQuantity = contextCartData?.ExtenderLimit?.RemainingQuantity
  const extenderData = contextCartData?.Offers.find(
    (item: any) => item?.Category === SELF_SERVICE.EXTENDERS,
  )
  const isExtenderAvailable = extenderData && remainingQuantity !== 0
  const newItemsInCartArr = contextCartData?.newItemsInCart?.length

  // When the user is on the product page and the same product is already added to the cart, then the sticky cart menu shall display copy that the product is added to cart along with 'Go to cart' CTA
  useEffect(() => {
    if (cartItemCount === 0 || newItemsInCartArr === 0) {
      setShowAddCartButton(true)
    } else if (cartItemCount !== 0 && isViewedMatching === false) {
      setShowAddCartButton(true)
    } else {
      setShowAddCartButton(false)
    }
  }, [cartItemCount, isViewedMatching, newItemsInCartArr, contextCartData])

  useEffect(() => {
    if (contextCartData?.CartLineItems?.length > 0) {
      const cartItems = contextCartData.CartLineItems.filter(
        (item: { Type: string }) => item.Type === 'New',
      )
      setCartItemCount(cartItems.length)
      const itemsInCart = cartItems.find(
        (item: { ItemCode: string }) => item.ItemCode === pageCode,
      )
      setIsViewedMatching(!!itemsInCart)

      const offerInfo = contextCartData?.Offers.find(
        (item: offerData) => item?.ItemCode === pageCode,
      )
      if (!offerInfo) {
        window.location.href = formatUrl('/account/services#addOns')
        setShowSpinner?.(true)
      }
    }
  }, [contextCartData])

  const addToCartHandler = async () => {
    // Call API and in response update the animation.
    setShowButtonLoading(true)

    try {
      const response: any = await APIClient.updateCartSelfService({
        body: {
          sCaseID: pdpOffersData?.sCaseID,
          ItemCode: pageCode,
          ItemSequence: getOfferData?.ItemSequence,
          Action: SELF_SERVICE.ADD,
          Quantity: 1,
        },
        sourceId,
      })
      setCartItemCount(1)
      setIsViewedMatching(true)
      setShowButtonLoading(false)
      sessionStorage.setItem(
        SESSION_STORAGE.CART_DATA,
        JSON.stringify(response.data),
      )
      let productString = clickEventName
      // The empty semicolons, because we are not returning Quantity, Price, or Events with an Add to Cart event.
      productString += ';' // Quantity
      productString += ';' // Price
      productString += ';' // Event
      updateCartClickAnalytics(
        cartItemCount,
        productString,
        'ADD',
        SELF_SERVICE.PRODUCT_DETAIL_PAGE,
      )
      setContextCartData(response.data)
      if (
        pageCode === SELF_SERVICE.PRODUCT_WHWIFI_PAGE_CODE &&
        response.data.ExtenderLimit?.RemainingQuantity > 0
      ) {
        setOpenExtenderModal?.(isExtenderAvailable)
      }
      return response.data
    } catch (error: any) {
      dispatch(
        setApiErrorCode({
          module: 'cartApi',
          errorCode: error?.response?.status,
        }),
      )
      setShowButtonLoading(false)
    }
  }
  return (
    <>
      <ServiceStickyBar
        cartStickyBarContent={servicesHeaderSitecoreData}
        showAddCartButton={showAddCartButton}
        addToCartHandler={addToCartHandler}
        pdpOfferData={getOfferData}
        showButtonLoading={showButtonLoading}
      />
      <ServicesHero
        cartStickyBarContent={servicesHeaderSitecoreData}
        showAddCartButton={showAddCartButton}
        addToCartHandler={addToCartHandler}
        pdpOfferData={getOfferData}
        showButtonLoading={showButtonLoading}
        productPriceSubText={productPriceSubText}
        pageCode={pageCode}
        openExtenderModal={openExtenderModal}
        setOpenExtenderModal={(val) => setOpenExtenderModal?.(val)}
        sourceId={sourceId || '213'}
      />
    </>
  )
}

export default SelfServiceHeader
