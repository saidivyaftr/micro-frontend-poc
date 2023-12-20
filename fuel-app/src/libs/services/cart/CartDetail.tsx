import { useEffect, useState, Dispatch } from 'react'
import { makeStyles } from '@material-ui/core'
import { Button, Typography } from 'src/blitz'
import {
  COMPONENT_WRAPPER,
  QUANTITY_ACTIONS,
  SELF_SERVICE,
  SESSION_STORAGE,
} from 'src/constants'
import { useAppData, useChatState } from 'src/hooks'
import { CartLineItem, offerData, offersData } from '../shared/types'
import {
  formatAddress,
  priceFormatterWithoutDecimal,
  getProductVASCode,
} from '../shared/miscUtlis'
import { setApiErrorCode } from 'src/redux/slicers/apiErrors'
import { Loading } from '@/shared-ui/components'
import { useDispatch } from 'react-redux'
import colors from 'src/styles/theme/colors'
import classNames from 'classnames'
import InjectHTML from 'src/blitz/components/InjectHTML'
import CartAdditionalExtenders from './CartAdditionalExtenders'
import APIClient from 'src/api-client'
import {
  siteInteractionAnalytics,
  updateCartClickAnalytics,
} from '../shared/AnalyticsUtlis'
import CartDisclaimer from './CartDisclaimer'
interface CartDetailPropTypes {
  removeHandler: Dispatch<CartLineItem>
  cartData?: offersData
  handlePlaceOrder: () => void
  placeOrderLoading?: boolean
  setCartData: Dispatch<offersData>
}

const CartDetail = ({
  cartData,
  removeHandler,
  handlePlaceOrder,
  placeOrderLoading,
  setCartData,
}: CartDetailPropTypes) => {
  const classes = useStyles()
  const {
    newService,
    monthlyTotalText,
    existingServiceText,
    totalBillText,
    oneTimeChargesText,
    totalOneTimeChargeText,
    addressTitle,
    addressSubTitle,
    chatLinkText,
    changeAddressText,
    orderButtonText,
    specialSavingsText,
    includesExtenders,
  } = useAppData('cartData', true) || {}

  const {
    newServicesInCart,
    exisitingServicesTotal,
    newServicesTotal,
    monthlyRecurringChargesTotal,
    oneTimeChargesInCart,
    oneTimeChargesTotal,
  } = cartData || {}
  const { setChatState, setChatParams } = useChatState()
  const dispatch = useDispatch()
  const [showLoading, setShowLoading] = useState(false)
  const [pdpOffersData, setPdpOffersData] = useState<offersData>()
  const [extendersOffer, setExtenderOffer] = useState<offerData>()
  const [isFirstClickOnAddExtender, setIsFirstClickOnAddExtender] =
    useState<boolean>(true)
  const [isFirstClickOnRemoveExtender, setIsFirstClickOnRemoveExtender] =
    useState<boolean>(true)

  const isWhwifiInCart =
    cartData?.newServicesInCart?.some((cartItem) => {
      return cartItem.ItemCode === SELF_SERVICE.PRODUCT_WHWIFI_PAGE_CODE
    }) || false
  const isExtendersInCart =
    cartData?.newServicesInCart?.some((cartItem) => {
      return cartItem.Category === SELF_SERVICE.EXTENDERS
    }) || false

  useEffect(() => {
    if (cartData?.CartLineItems) {
      setPdpOffersData(cartData)
    }
    const extendersData = cartData?.Offers?.find(
      (item: offerData) => item.Category === SELF_SERVICE.EXTENDERS,
    )
    setExtenderOffer(extendersData)
  }, [cartData])

  useEffect(() => {
    const extendersData = cartData?.Offers?.find(
      (item: offerData) => item.Category === SELF_SERVICE.EXTENDERS,
    )
    setExtenderOffer(extendersData)
  }, [])

  const sourceId = '213'
  // const extendersinOffersData = cartData?.Offers.find(
  //   (item: { Category: string }) => item.Category === SELF_SERVICE.EXTENDERS,
  // )
  const getExtenderCartData = async (
    action: string,
    itemCode: string,
    itemSequence: number,
    quantity: number,
    category: string,
    quantityAction: string,
  ) => {
    if (pdpOffersData?.sCaseID) {
      setShowLoading(true)
      try {
        const response: any = await APIClient.updateCartSelfService({
          body: {
            sCaseID: pdpOffersData?.sCaseID,
            ItemCode: itemCode,
            ItemSequence: itemSequence,
            Action: action,
            Quantity: quantity,
          },
          sourceId,
        })
        sessionStorage.setItem(
          SESSION_STORAGE.CART_DATA,
          JSON.stringify(response.data),
        )
        setCartData(response.data)
        if (
          isFirstClickOnAddExtender &&
          quantityAction === QUANTITY_ACTIONS.INCREMENT
        ) {
          setIsFirstClickOnAddExtender(false)
          siteInteractionAnalytics(
            'my services:add additional extenders click',
            'add additional extenders click',
          )
        }
        if (
          isFirstClickOnRemoveExtender &&
          quantityAction === QUANTITY_ACTIONS.DECREMENT
        ) {
          setIsFirstClickOnRemoveExtender(false)
          siteInteractionAnalytics(
            'my services:remove additional extenders click',
            'remove additional extenders click',
          )
        }
        setShowLoading(false)
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
  }

  const showQuantityInput = (item: offerData) => {
    // Is WHWIFI in Cart
    if (
      isWhwifiInCart &&
      item.ItemCode === SELF_SERVICE.PRODUCT_WHWIFI_PAGE_CODE
    ) {
      return true
    }
    if (
      !isWhwifiInCart &&
      isExtendersInCart &&
      item.Category === SELF_SERVICE.EXTENDERS
    ) {
      return true
    }
    return false
  }

  return (
    <div className={classes.root}>
      <div className={classes.innerWrapper}>
        <Typography styleType="h5" tagType="h5" className={classes.space20}>
          {newService?.value}
        </Typography>
        {newServicesInCart &&
          newServicesInCart.length > 0 &&
          newServicesInCart.map((item: CartLineItem, index: number) => {
            return (
              <>
                <div
                  key={`serviceList${index}`}
                  className={classNames(classes.space20)}
                >
                  {item.Category !== 'EXTENDERS' && (
                    <>
                      <div
                        className={classNames([classes.grid, classes.space12])}
                      >
                        <Typography styleType="p1" tagType="label">
                          {item?.Description}
                        </Typography>
                        <div className={classes.rightAlign} />
                        <div>
                          <Typography styleType="p1" tagType="span">
                            {priceFormatterWithoutDecimal(
                              item?.Price,
                              item?.Recurring,
                            )}
                          </Typography>
                        </div>
                      </div>
                      {item.ItemCode ===
                        SELF_SERVICE.PRODUCT_WHWIFI_PAGE_CODE && (
                        <Typography styleType="p2" tagType="label">
                          {includesExtenders?.value}
                        </Typography>
                      )}
                      {item?.Recurring && (
                        <div
                          className={classNames([classes.grid, classes.space8])}
                        >
                          <Button
                            variant="lite"
                            type="button"
                            hoverVariant="primary"
                            buttonSize="small"
                            onClick={() => removeHandler(item)}
                            text="Remove"
                            className={classes.removeLink}
                          />

                          <div className={classes.rightAlign} />
                          <div className={classes.textRight}>
                            {item.ItemCode ===
                              SELF_SERVICE.PRODUCT_YTTVE_PAGE_CODE && (
                              <InjectHTML
                                styleType="p3"
                                value={specialSavingsText?.value}
                              />
                            )}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
                {showQuantityInput(item) && (
                  <>
                    {extendersOffer && (
                      <>
                        {showLoading ? (
                          <Loading className={classes.loaderArea} />
                        ) : (
                          <CartAdditionalExtenders
                            cartData={cartData}
                            getExtenderCartData={getExtenderCartData}
                            isExtendersInCart={isExtendersInCart}
                            isWhwifiInCart={isWhwifiInCart}
                          />
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            )
          })}

        <div className={classNames([classes.grid, classes.space20])}>
          <Typography styleType="h6" tagType="label">
            {monthlyTotalText?.value}
          </Typography>
          <div className={classes.rightAlign} />
          <div>
            <Typography styleType="h6" tagType="span">
              {priceFormatterWithoutDecimal(newServicesTotal, true)}
            </Typography>
          </div>
        </div>
        <hr className={classes.margin32} />
        <div className={classNames([classes.grid, classes.space20])}>
          <Typography styleType="p1" tagType="label">
            {existingServiceText?.value}
          </Typography>
          <div className={classes.rightAlign} />
          <div>
            <Typography styleType="p1" tagType="span">
              {priceFormatterWithoutDecimal(exisitingServicesTotal, true)}
            </Typography>
          </div>
        </div>
        <div className={classNames([classes.grid, classes.space20])}>
          <Typography styleType="h6" tagType="label">
            {totalBillText?.value}
          </Typography>
          <div className={classes.rightAlign} />
          <div>
            <Typography styleType="h6" tagType="span">
              {priceFormatterWithoutDecimal(monthlyRecurringChargesTotal, true)}
            </Typography>
          </div>
        </div>
        <hr className={classes.margin32} />
        {oneTimeChargesInCart && oneTimeChargesInCart.length > 0 && (
          <>
            <div className={classNames([classes.grid, classes.space20])}>
              <Typography styleType="h6" tagType="label">
                {oneTimeChargesText?.value}
              </Typography>
            </div>
            {oneTimeChargesInCart.map((item: CartLineItem, index: number) => {
              return (
                <div
                  key={`oneTimeChargesList${index}`}
                  className={classes.space20}
                >
                  <div className={classes.grid}>
                    <Typography styleType="p1" tagType="label">
                      {item?.Description}
                    </Typography>
                    <div className={classes.rightAlign} />
                    <div>
                      <Typography styleType="p1" tagType="span">
                        {priceFormatterWithoutDecimal(item?.Price)}
                      </Typography>
                    </div>
                  </div>
                </div>
              )
            })}

            <div className={classNames([classes.grid, classes.space20])}>
              <Typography styleType="h6" tagType="label">
                {totalOneTimeChargeText?.value}
              </Typography>
              <div className={classes.rightAlign} />
              <div>
                <Typography styleType="h6" tagType="span">
                  {priceFormatterWithoutDecimal(oneTimeChargesTotal)}
                </Typography>
              </div>
            </div>
          </>
        )}
        {newServicesInCart?.some(
          (item) => item.ItemCode === SELF_SERVICE.PRODUCT_WHWIFI_PAGE_CODE,
        ) && (
          <div
            className={classNames([classes.addressSection, classes.space20])}
          >
            <div className={classes.addressTitle}>
              <Typography styleType="h6" tagType="h6">
                {addressTitle?.value}
              </Typography>
            </div>

            <Typography styleType="p1" tagType="p">
              {addressSubTitle?.value}
            </Typography>

            <Typography styleType="p1" tagType="p">
              {formatAddress({
                AddressLine1: cartData?.AddressLine1 || '',
                AddressLine2: cartData?.AddressLine2,
                City: cartData?.City || '',
                State: cartData?.State || '',
                ZipCode: cartData?.ZipCode || '',
              })}
            </Typography>
            <Typography styleType="p3" tagType="p">
              <>
                {`${changeAddressText?.value} `}
                <Button
                  variant="lite"
                  type="button"
                  hoverVariant="primary"
                  buttonSize="small"
                  onClick={() => {
                    setChatParams({
                      launchOption: SELF_SERVICE.CART_CHAT_LAUNCH_OPTION,
                      iCaseId: sessionStorage.getItem(
                        SESSION_STORAGE.ICID,
                      ) as string,
                      sCaseID: cartData?.sCaseID,
                      btn: sessionStorage.getItem(
                        SESSION_STORAGE.VALID,
                      ) as string,
                      serviceAddress: formatAddress({
                        AddressLine1: cartData?.AddressLine1 || '',
                        AddressLine2: cartData?.AddressLine2,
                        City: cartData?.City || '',
                        State: cartData?.State || '',
                        ZipCode: cartData?.ZipCode || '',
                      }),
                    })
                    setChatState(true)
                  }}
                  text={chatLinkText?.value}
                  className={classes.btnClassName}
                />
              </>
            </Typography>
          </div>
        )}
        <div className={classes.space20}>
          <CartDisclaimer />
        </div>
        <div className={classes.gridClass}>
          <div className={classes.rightAlign} />
          <Button
            type="button"
            buttonSize="large"
            text={orderButtonText?.value}
            className={classNames([classes.orderButton, classes.space20])}
            onClick={handlePlaceOrder}
            isBusy={placeOrderLoading}
          />
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    ...COMPONENT_WRAPPER,
    margin: 'auto 20.625rem',
    padding: '42px 0 125px 0',
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
  loaderArea: {
    ...COMPONENT_WRAPPER,
    height: 500,
  },
  innerWrapper: {
    [breakpoints.up('sm')]: {
      padding: '2.5rem 3rem',
      width: 795,
    },
    backgroundColor: colors.main.white,
    borderRadius: '1rem',
    padding: 24,
    width: '100%',
  },
  grid: {
    display: 'flex',
    alignItems: 'center',
    gap: 42,
    [breakpoints.down('xs')]: {
      gap: 22,
    },
  },
  rightAlign: {
    flex: '1 1 auto',
  },
  textRight: {
    textAlign: 'right',
  },
  space20: {
    marginTop: 20,
    marginBottom: 20,
  },
  space12: {
    marginTop: 12,
  },
  space8: {
    marginTop: 8,
  },
  margin32: {
    margin: '32px 0px',
  },
  gridClass: {
    alignItems: 'center',
    display: 'flex',
  },
  removeLink: {
    textDecoration: 'underline',
    cursor: 'pointer',
    fontWeight: 400,
  },
  orderButton: {
    minWidth: 276,
  },
  addressSection: {
    paddingTop: 32,
    paddingBottom: 32,
    marginTop: 32,
    marginBottom: 32,
    borderTop: '1px solid #ccc',
    borderBottom: '1px solid #ccc',
    '& p': {
      margin: '0 0 16px 0',
    },
  },
  addressTitle: {
    marginBottom: 32,
  },
  btnClassName: {
    fontFamily: 'PP Object Sans Bold',
    textDecoration: 'underline',
  },
}))

export default CartDetail
