import { useEffect, useState } from 'react'
import colors from '@/shared-ui/colors'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Dialog from '@material-ui/core/Dialog'
import { makeStyles } from '@material-ui/core'
import { Typography, Button, Tooltip } from '@/shared-ui/components'
import {
  SELF_SERVICE,
  SESSION_STORAGE,
  COMPONENT_WRAPPER,
  SELF_SERVICE_PAGES,
  QUANTITY_ACTIONS,
} from 'src/constants'
import { useAppData, useWindowDimensions } from 'src/hooks'
import { ModalType } from './HeroCartIcon'
import { CartLineItem, offerData, offersData } from './types'
import {
  getProductVAS,
  replacer,
  priceFormatterWithoutDecimal,
  getProductCode,
} from '../shared/miscUtlis'
import { Loading } from '@/shared-ui/components'
import InfoIconRed from '@/shared-ui/react-icons/info-icon-red'
import QuantityInput from 'src/components/QuantityInput'
import APIClient from 'src/api-client'
import ModalWrapper from 'src/libs/register/components/ModalWrapper'
import { useDispatch, useSelector } from 'react-redux'
import {
  cartPageViewAnalytics,
  siteInteractionAnalytics,
  updateCartClickAnalytics,
} from './AnalyticsUtlis'
import { useCartDataContext } from '../CartContextProvider'
import { setApiErrorCode } from 'src/redux/slicers/apiErrors'
import { formatUrl } from 'src/utils/urlHelpers'

const IntermediateCart = ({
  showIntermediateCart,
  handleCloseModal,
  setModalType,
}: {
  showIntermediateCart: boolean
  handleCloseModal: () => void
  setModalType: (modalType: ModalType) => void
}) => {
  const cartTextData = useAppData('intermediateCart', true) || {}
  const dispatch = useDispatch()
  const classes = useStyles()

  const [showLoading, setShowLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [extendersOffer, setExtenderOffer] = useState<offerData>()
  const { width } = useWindowDimensions()
  const isMobile = width <= 767
  const [productsStringForAnalytics, setProductsStringForAnalytics] =
    useState<string>('')
  const sourceId = sessionStorage.getItem(SESSION_STORAGE.SID) as string
  const { setContextCartData, contextCartData } = useCartDataContext()
  const [cartData, setCartData] = useState<offersData>(contextCartData)
  const [isFirstClick, setIsFirstClick] = useState<boolean>(true)
  const [originalQuantity] = useState<number>(
    contextCartData?.ExtenderLimit?.TotalExtendersNewlyAdded,
  )

  const extendersQtyValue =
    contextCartData?.ExtenderLimit?.TotalExtendersNewlyAdded
  const hasDTMLLoaded = useSelector(
    (state: any) => state?.appConfig?.configs?.['DTM'],
  )
  const isWhwifiInCart = cartData.newServicesInCart?.some((cartItem) => {
    return cartItem.ItemCode === SELF_SERVICE.PRODUCT_WHWIFI_PAGE_CODE
  })
  const isExtendersInCart = cartData.newServicesInCart?.some((cartItem) => {
    return cartItem.Category === SELF_SERVICE.EXTENDERS
  })

  useEffect(() => {
    if (hasDTMLLoaded && productsStringForAnalytics !== '') {
      cartPageViewAnalytics(
        SELF_SERVICE_PAGES.CART_PAGE,
        productsStringForAnalytics,
      )
    }
  }, [hasDTMLLoaded, productsStringForAnalytics])

  const handleExtenderQuantity = (action: string) => {
    const newExtendersCount =
      action === QUANTITY_ACTIONS.INCREMENT
        ? extendersQtyValue + 1
        : extendersQtyValue - 1
    if (isFirstClick) {
      setIsFirstClick(false)
      if (action === QUANTITY_ACTIONS.INCREMENT) {
        siteInteractionAnalytics(
          'my services:add additional extenders click',
          'add additional extenders click',
        )
      } else {
        siteInteractionAnalytics(
          'my services:remove additional extenders click',
          'remove additional extenders click',
        )
      }
    }
    updateQuantityToCart(newExtendersCount)
  }
  const handleClick = () => {
    isMobile ? setShowModal(true) : ''
  }
  const updateQuantityToCart = async (newExtendersCount: number) => {
    if (extendersOffer) {
      const itemData = {
        ItemCode: extendersOffer?.ItemCode,
        ItemSequence: extendersOffer?.ItemSequence,
        Category: extendersOffer?.Category,
        quantity: newExtendersCount,
      }
      if (
        newExtendersCount !==
        contextCartData?.ExtenderLimit?.TotalExtendersNewlyAdded
      ) {
        if (newExtendersCount === 0) {
          await updateCartHandler(itemData, SELF_SERVICE.REMOVE_CODE)
        } else {
          await updateCartHandler(itemData, SELF_SERVICE.ADD_CODE)
        }
      }
    }
  }

  useEffect(() => {
    if (cartData) {
      setShowLoading(false)
    }
  }, [cartData])

  useEffect(() => {
    if (contextCartData) {
      setCartData(contextCartData)
    }
  }, [contextCartData])

  useEffect(() => {
    const extendersData = cartData.Offers?.find(
      (item: offerData) => item.Category === SELF_SERVICE.EXTENDERS,
    )
    setExtenderOffer(extendersData)
    // Updaing the Analytics once we have Cart Data, When Page Loads
    const newCartItems: CartLineItem[] = cartData.newItemsInCart
    if (newCartItems) {
      const filteredCartItems = cartData.newServicesInCart
      const productsString = getProductVAS(
        newCartItems,
        filteredCartItems,
      ).join(',')
      setProductsStringForAnalytics(productsString)
    }
  }, [cartData])

  const updateCartHandler = async (
    item: {
      ItemCode: string
      ItemSequence: number
      Category: string
      quantity?: number
    },
    action: string,
  ) => {
    setShowLoading(true)
    try {
      const { data }: any = await APIClient.updateCartSelfService({
        body: {
          sCaseID: cartData?.sCaseID,
          ItemCode: item.ItemCode,
          ItemSequence: item.ItemSequence,
          Action:
            action === SELF_SERVICE.ADD_CODE
              ? SELF_SERVICE.ADD
              : SELF_SERVICE.REMOVE,
          Quantity:
            item.Category === SELF_SERVICE.EXTENDERS
              ? item.quantity === 0 && action === SELF_SERVICE.REMOVE_CODE
                ? 1 // If user set quantity to 0, we are setting default one
                : item.quantity
              : 1,
        },
        sourceId,
      })
      setShowLoading(false)
      sessionStorage.setItem(SESSION_STORAGE.CART_DATA, JSON.stringify(data))
      setCartData(data)
      setContextCartData(data)
      if (item.Category !== SELF_SERVICE.EXTENDERS) {
        updateCartClickAnalytics(
          1,
          getProductCode(item?.ItemCode, item?.Category),
          action,
          SELF_SERVICE.PRODUCT_CART_PAGE,
        )
      }
      if (item.Category === SELF_SERVICE.EXTENDERS && item.quantity === 0) {
        updateAnalyticsForExtendersAddToCart(item.quantity)
      }
      if (data.newItemsInCart && data.newItemsInCart.length === 0) {
        setModalType('EMPTY_CART')
      }
      return data
    } catch (error: any) {
      dispatch(
        setApiErrorCode({
          module: 'cartApi',
          errorCode: error?.response?.status,
        }),
      )
      setShowLoading(false)
    }
  }

  const updateAnalyticsForExtendersAddToCart = (quantity: number) => {
    cartData.newServicesInCart?.map((item: CartLineItem) => {
      if (
        item.Category === SELF_SERVICE.EXTENDERS &&
        originalQuantity !== quantity
      ) {
        updateCartClickAnalytics(
          1,
          getProductCode(item?.ItemCode, item?.Category),
          quantity === 0 ? SELF_SERVICE.REMOVE_CODE : SELF_SERVICE.ADD_CODE,
          SELF_SERVICE.PRODUCT_CART_PAGE,
          quantity.toString(),
          quantity.toString(),
        )
      }
    })
  }

  const handleCheckoutCTA = () => {
    updateAnalyticsForExtendersAddToCart(extendersQtyValue)
    window.location.href = `${formatUrl('/services/cart')}${
      window.location.search
    }`
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
  const modalContinueShopping = () => {
    handleCloseModal()
    setShowModal(false)
  }
  const ModalContent = () => (
    <div className={classes.root}>
      <div className={classes.warningMessage}>
        <Typography tagType="h3" styleType="h5" data-tid="modal-title">
          {cartTextData.deviceUpSellText?.value}
        </Typography>
      </div>
      <div className={classes.description}>
        <Typography
          tagType="p"
          styleType="p1"
          className={classes.descriptionText}
        >
          {cartTextData.deviceUpSellToolTip?.value}
        </Typography>
      </div>
      <div className={classes.bottomSection}>
        <Button
          type="button"
          variant="primary"
          hoverVariant="primary"
          buttonSize="large"
          text={cartTextData.goBackCTAText?.value}
          onClick={() => setShowModal(false)}
        />

        <Button
          type="button"
          variant="tertiary"
          hoverVariant="primary"
          buttonSize="large"
          text={cartTextData.continueShoppingCTAText?.value}
          onClick={() => modalContinueShopping()}
        />
      </div>
    </div>
  )
  return (
    <>
      <Dialog
        open={showIntermediateCart}
        fullWidth={true}
        maxWidth={'sm'}
        classes={{ paper: classes.paper }}
      >
        <IconButton
          aria-label="close"
          className={classes.closeIcon}
          onClick={() => {
            handleCloseModal()
          }}
        >
          <CloseIcon />
        </IconButton>

        <div className={classes.container}>
          <Typography
            styleType="h5"
            tagType="span"
            className={classes.modalHeading}
          >
            {cartTextData.title?.value}
          </Typography>
          {showLoading ? (
            <Loading className={classes.loaderArea} />
          ) : (
            cartData && (
              <div>
                {cartData.newServicesInCart?.map(
                  (item: CartLineItem, index: number) => {
                    return (
                      <div key={`serviceList${index}`}>
                        {item.Category !== SELF_SERVICE.EXTENDERS && (
                          <>
                            <div>
                              <Typography
                                styleType="p1"
                                tagType="label"
                                className={classes.title}
                              >
                                {item.Description}
                              </Typography>
                              <Typography
                                styleType="p1"
                                tagType="span"
                                className={classes.floatRight}
                              >
                                {priceFormatterWithoutDecimal(
                                  item.Price,
                                  item.Recurring,
                                )}
                              </Typography>
                            </div>
                            {item.Recurring && (
                              <div className={classes.removeLink}>
                                <Typography
                                  fontType="boldFont"
                                  onClick={() =>
                                    updateCartHandler(
                                      item,
                                      SELF_SERVICE.REMOVE_CODE,
                                    )
                                  }
                                  styleType="p2"
                                  tagType="span"
                                >
                                  {SELF_SERVICE.REMOVE}
                                </Typography>
                              </div>
                            )}
                          </>
                        )}
                        {showQuantityInput(item) && (
                          <>
                            <div onClick={handleClick}>
                              <Typography
                                styleType="p1"
                                tagType="span"
                                className={classes.extenderTitle}
                              >
                                {extendersQtyValue === 0
                                  ? cartTextData.deviceUpSellText?.value
                                  : cartTextData.AddedExtenders?.value}
                              </Typography>
                              {extendersQtyValue === 0 ? (
                                <Typography
                                  styleType="p1"
                                  tagType="span"
                                  className={classes.priceOpacity}
                                >
                                  {priceFormatterWithoutDecimal(
                                    0,
                                    item.Recurring,
                                  )}
                                </Typography>
                              ) : (
                                <Typography
                                  styleType="p1"
                                  tagType="span"
                                  className={classes.floatRight}
                                >
                                  {priceFormatterWithoutDecimal(
                                    Number(extendersOffer?.Price) *
                                      extendersQtyValue,
                                    item.Recurring,
                                  )}
                                </Typography>
                              )}
                              {!isMobile && (
                                <Tooltip
                                  tooltipText={
                                    cartTextData.deviceUpSellToolTip?.value
                                  }
                                  tooltipIcon={<InfoIconRed />}
                                  tooltipClassName={classes.toolTipIcon}
                                  tooltipContentClass={classes.toolTipContent}
                                  tooltipArrowClass={classes.tooltipArrow}
                                />
                              )}
                            </div>

                            {isMobile && (
                              <div className={classes.priceExtender}>
                                <Typography styleType="p1" tagType="span">
                                  {replacer(
                                    cartTextData.devicePrice?.value,
                                    '$AMOUNT$',
                                    extendersOffer?.Price,
                                  )}
                                </Typography>
                                <Typography styleType="p2" tagType="label">
                                  {cartTextData.devicePriceText?.value}
                                </Typography>
                              </div>
                            )}

                            <div className={classes.qtyWrapper}>
                              <QuantityInput
                                quantityValue={extendersQtyValue}
                                disableMinus={extendersQtyValue === 0}
                                disablePlus={
                                  !contextCartData?.ExtenderLimit
                                    ?.RemainingQuantity
                                }
                                handleDecrement={() =>
                                  handleExtenderQuantity(
                                    QUANTITY_ACTIONS.DECREMENT,
                                  )
                                }
                                handleIncrement={() =>
                                  handleExtenderQuantity(
                                    QUANTITY_ACTIONS.INCREMENT,
                                  )
                                }
                              />
                              {!isMobile && (
                                <div className={classes.price}>
                                  <Typography styleType="h5" tagType="p">
                                    {replacer(
                                      cartTextData.devicePrice?.value,
                                      '$AMOUNT$',
                                      extendersOffer?.Price,
                                    )}
                                  </Typography>
                                  <Typography
                                    styleType="p2"
                                    tagType="p"
                                    className={classes.priceExtender}
                                  >
                                    {cartTextData.devicePriceText?.value}
                                  </Typography>
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    )
                  },
                )}
                <div className={classes.greyLine} />
                <div>
                  <Typography
                    fontType="regularFont"
                    styleType="h5"
                    tagType="span"
                  >
                    {cartTextData.totalCartText?.value}
                  </Typography>
                  <Typography
                    styleType="h5"
                    tagType="span"
                    className={classes.floatRight}
                  >
                    {priceFormatterWithoutDecimal(
                      cartData?.newServicesTotal,
                      true,
                    )}
                  </Typography>
                </div>
                <div className={classes.bottomSection}>
                  <Button
                    type="button"
                    buttonSize="large"
                    text={cartTextData?.checkoutCTAText?.value}
                    onClick={handleCheckoutCTA}
                  />
                  <Button
                    type="button"
                    buttonSize="large"
                    variant="tertiary"
                    text={cartTextData?.continueShoppingCTAText?.value}
                    onClick={() => {
                      updateAnalyticsForExtendersAddToCart(extendersQtyValue)
                      handleCloseModal()
                    }}
                  />
                </div>
              </div>
            )
          )}
        </div>
      </Dialog>
      <ModalWrapper
        isOpen={showModal}
        handleClose={() => setShowModal(false)}
        modalContent={<ModalContent />}
      />
    </>
  )
}

export default IntermediateCart

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    ...COMPONENT_WRAPPER,
    padding: '48px 0',
    [breakpoints.down('sm')]: {
      width: 331,
    },
  },

  container: {
    padding: '30px 0 0 0',
    backgroundColor: colors.main.white,
    display: 'flex',
    flexDirection: 'column',
    [breakpoints.up('sm')]: {
      padding: 40,
    },
  },
  warningMessage: {
    margin: '20px 48px',
    marginBottom: 0,
    textAlign: 'center',
  },
  description: {
    margin: '1.25rem 1rem 0 1rem',
  },
  descriptionText: {
    fontWeight: 400,
    textAlign: 'center',
  },
  extenderTitle: {
    textDecoration: 'underline',
    [breakpoints.up('sm')]: {
      textDecoration: 'none',
    },
  },
  priceExtender: {
    [breakpoints.up('sm')]: {
      margin: 0,
    },
    marginTop: 8,
  },
  loaderArea: {
    minHeight: 300,
  },
  bottomSection: {
    display: 'block',
    [breakpoints.up('sm')]: {
      display: 'flex',
      justifyContent: 'center',
      margin: '10px 8px',
    },
    '& button': {
      margin: '10px auto',
      [breakpoints.up('sm')]: {
        margin: '0 8px 10px 8px',
      },
    },
  },
  toolTipIcon: {
    display: 'inline-flex',
    left: 6,
    top: -2,
    '& svg': {
      width: 16,
      height: 16,
    },
  },

  tooltipArrow: {
    transform: 'rotate(138deg)',
    top: 5,
    left: 18,
    width: 8,
    height: 8,
  },
  toolTipContent: {
    top: -20,
    left: '22px !important',
    borderRadius: 8,
    right: '140px !important',
    boxShadow: `0px 2px 15px ${colors.main.shadowBlack}`,
    minWidth: 280,
    bottom: 'auto',
    '& > div': {
      margin: 8,
    },
  },
  closeIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  greyLine: {
    borderTop: `1px solid ${colors.main.gray}`,
    margin: '16px 0px',
    [breakpoints.up('sm')]: {
      margin: '20px 0px',
    },
  },
  title: {
    marginBottom: 16,
    [breakpoints.up('sm')]: {
      marginBottom: 32,
    },
  },
  modalHeading: {
    textAlign: 'center',
    marginBottom: 16,
    [breakpoints.up('sm')]: {
      textAlign: 'left',
    },
  },
  priceOpacity: {
    opacity: 0.6,
    float: 'right',
  },
  removeLink: {
    textDecoration: 'underline',
    cursor: 'pointer',
    margin: '0px 0px 16px',
    [breakpoints.up('sm')]: {
      margin: '16px 0px',
    },
  },
  floatRight: { float: 'right' },
  price: { marginLeft: 16 },
  qtyWrapper: {
    [breakpoints.up('sm')]: {
      width: 292,
      paddingTop: 16,
    },
    paddingTop: 8,
    width: 131,
    display: 'flex',
  },
  paper: {
    borderRadius: 10,
    padding: 20,
    margin: 0,
    width: 'calc(100% - 32px)',
    [breakpoints.up('sm')]: {
      borderRadius: 32,
      padding: 20,
      width: 'calc(100% - 64px)',
    },
  },
}))
