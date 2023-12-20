import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import APIClient from 'src/api-client'
import { Typography, Button, InjectHTML } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import { useCartDataContext } from 'src/libs/services/CartContextProvider'
import { SELF_SERVICE, QUANTITY_ACTIONS, SESSION_STORAGE } from 'src/constants'
import { useAppData } from 'src/hooks'
import QuantityInput from 'src/components/QuantityInput'
import { setApiErrorCode } from 'src/redux/slicers/apiErrors'
import { formatUrl } from 'src/utils/urlHelpers'
import { findAndReplace } from 'src/utils/replaceString'
import { offerData, offersData } from './types'
import { getProductCode, priceFormatterWithoutDecimal } from './miscUtlis'
import {
  siteInteractionAnalytics,
  updateCartClickAnalytics,
} from './AnalyticsUtlis'
interface AddExtenderModalProps {
  itemCategory: string
  openExtenderModal: boolean
  setOpenExtenderModal: Dispatch<SetStateAction<boolean>>
  sourceId: string
  setCartData?: Dispatch<SetStateAction<offersData>>
  cartItemCount: number
}

const AddExtenderModal = ({
  itemCategory,
  openExtenderModal,
  setOpenExtenderModal,
  sourceId,
  setCartData,
  cartItemCount,
}: AddExtenderModalProps) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const isExtender = itemCategory === 'EXTENDERS'
  const addExtenderModalContent =
    useAppData(
      isExtender ? 'wiFiUpgradeModalContent' : 'additionalExtenderModalContent',
      true,
    ) || {}

  const { contextCartData, setContextCartData } = useCartDataContext() || {}

  const extenderData = contextCartData?.Offers.find(
    (item: offerData) => item?.Category === 'EXTENDERS',
  )
  const bundleData = contextCartData?.Offers.find(
    (item: offerData) => item?.Category === itemCategory,
  )
  const [quantity, setQuantity] = useState(
    contextCartData?.ExtenderLimit?.TotalExtendersNewlyAdded,
  )
  // Quantity when Page/popup opens
  const [originalQuantity, setOriginalQuantity] = useState(
    contextCartData?.ExtenderLimit?.TotalExtendersNewlyAdded,
  )
  useEffect(() => {
    setQuantity(contextCartData?.ExtenderLimit?.TotalExtendersNewlyAdded)
    setOriginalQuantity(
      contextCartData?.ExtenderLimit?.TotalExtendersNewlyAdded,
    )
  }, [openExtenderModal])
  const addExtenderPrice = extenderData?.Price * quantity
  const minQtyLimit = 0
  const maxLimit = contextCartData?.ExtenderLimit?.MaxLimit
  const isAddedNew =
    contextCartData?.ExtenderLimit?.TotalExtendersNewlyAdded > 0 ? true : false
  const disabled = quantity === 0
  const [isFirstClick, setIsFirstClick] = useState<boolean>(true)
  const handleQuantity = (action: string) => {
    if (isFirstClick) {
      setIsFirstClick(false)
      // Call Analytics for First Click
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
    setQuantity(
      action === QUANTITY_ACTIONS.INCREMENT ? quantity + 1 : quantity - 1,
    )
  }

  const closeModal = () => {
    setIsFirstClick(true)
    setOpenExtenderModal(false)
  }

  const disablePlus = contextCartData?.ExtenderLimit?.IsWwifiAdded
    ? quantity + 2 === maxLimit
    : quantity === maxLimit

  const updateCart = async (action: string) => {
    try {
      const response: any = await APIClient.updateCartSelfService({
        body: {
          sCaseID: contextCartData?.sCaseID,
          ItemCode: extenderData.ItemCode,
          ItemSequence: extenderData?.ItemSequence,
          Action: disabled ? 'Remove' : 'Add',
          Quantity: disabled ? 1 : quantity,
        },
        sourceId,
      })
      sessionStorage.setItem(
        SESSION_STORAGE.CART_DATA,
        JSON.stringify(response.data),
      )
      let productString = getProductCode(
        extenderData.itemCode,
        extenderData.Category,
      )
      if (originalQuantity !== quantity) {
        // The empty semicolons, because we are not returning Quantity, Price, or Events with an Add to Cart event.
        productString += ';' // Quantity
        productString += ';' // Price
        productString += ';' // Event
        updateCartClickAnalytics(
          cartItemCount,
          productString,
          quantity === 0 ? SELF_SERVICE.REMOVE_CODE : SELF_SERVICE.ADD_CODE,
          SELF_SERVICE.PRODUCT_LISTING_PAGE,
          quantity,
          quantity,
        )
      }
      isExtender && setCartData?.(response.data)
      setContextCartData(response.data)
      action === 'CheckOut' &&
        (window.location.href = `${formatUrl('/services/cart')}${
          window.location.search
        }`)

      closeModal()
      return response.data
    } catch (error: any) {
      dispatch(
        setApiErrorCode({
          module: 'cartApi',
          errorCode: error?.response?.status,
        }),
      )
      closeModal()
    }
  }
  const pricePerMonthInfo = findAndReplace(
    addExtenderModalContent.priceInfo?.value,
    '$PRICE_PER_MONTH$',
    priceFormatterWithoutDecimal(extenderData?.Price, true),
  )
  return (
    <Dialog
      open={openExtenderModal}
      fullWidth={true}
      maxWidth={'sm'}
      classes={{ paper: classes.paper }}
    >
      <IconButton
        aria-label="close"
        className={classes.closeIcon}
        onClick={closeModal}
      >
        <CloseIcon />
      </IconButton>

      <div className={classes.container}>
        <Typography
          tagType="h4"
          styleType="h4"
          fontType="boldFont"
          className={classes.modalHeading}
        >
          {addExtenderModalContent.modalHeading?.value}
        </Typography>
        <InjectHTML
          value={
            isExtender
              ? addExtenderModalContent.rangeInfo?.value
              : pricePerMonthInfo
          }
          className={classes.rangeInfo}
          tagType="p"
          styleType="p1"
        />
        <InjectHTML
          value={
            isExtender
              ? pricePerMonthInfo
              : addExtenderModalContent.rangeInfo?.value
          }
          className={classes.rangeInfo}
          tagType="p"
          styleType="p1"
        />
        <Typography
          tagType="h5"
          styleType="p1"
          fontType="boldFont"
          className={classes.modalHeading}
        >
          {addExtenderModalContent.askCount?.value}
        </Typography>
        {/* Add extender Quantity Input Component */}
        <div className={classes.qtyWrapper}>
          <QuantityInput
            quantityValue={quantity}
            handleIncrement={() => handleQuantity(QUANTITY_ACTIONS.INCREMENT)}
            handleDecrement={() => handleQuantity(QUANTITY_ACTIONS.DECREMENT)}
            disableMinus={quantity === minQtyLimit}
            disablePlus={disablePlus}
          />
        </div>
        <hr className={classes.hline} />
        <div className={classes.itemSection}>
          <div className={disabled ? classes.itemDisabled : classes.itemList}>
            <Typography styleType="p1" tagType="label">
              {addExtenderModalContent.extendersLabel?.value}
            </Typography>
            <Typography styleType="p1" tagType="span">
              {priceFormatterWithoutDecimal(addExtenderPrice, true)}
            </Typography>
          </div>
          {!isExtender && (
            <div className={classes.itemList}>
              <Typography styleType="p1" tagType="label">
                {bundleData?.Description}
              </Typography>
              <Typography styleType="h6" tagType="span">
                {priceFormatterWithoutDecimal(bundleData?.Price, true)}
              </Typography>
            </div>
          )}
        </div>
        <div className={classes.bottomSection}>
          <Button
            type="button"
            variant="primary"
            hoverVariant="primary"
            text={
              isExtender
                ? addExtenderModalContent.checkoutCTA?.value
                : addExtenderModalContent.updateCartCTA?.value
            }
            onClick={() => updateCart('CheckOut')}
            disabled={
              contextCartData?.ExtenderLimit?.TotalExtendersNewlyAdded === 0 &&
              disabled
            }
          />

          <Button
            type="button"
            variant="tertiary"
            hoverVariant="primary"
            text={
              isExtender
                ? addExtenderModalContent.continueCTA?.value
                : addExtenderModalContent.skipCTA?.value
            }
            onClick={
              (disabled && !isAddedNew) || !isExtender
                ? closeModal
                : () => updateCart('Continue')
            }
          />
        </div>
      </div>
    </Dialog>
  )
}

export default AddExtenderModal

const useStyles = makeStyles(({ breakpoints }) => ({
  container: {
    padding: '30px 0 0 0',
    backgroundColor: colors.main.white,
    [breakpoints.up('sm')]: {
      padding: 40,
    },
  },
  closeIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  modalHeading: {
    marginBottom: 16,
    [breakpoints.up('sm')]: {
      marginBottom: 32,
    },
  },
  qtyWrapper: {
    width: 132,
  },
  rangeInfo: {
    marginBottom: 16,
    [breakpoints.up('sm')]: {
      marginBottom: 32,
    },
  },
  bottomSection: {
    display: 'block',
    [breakpoints.up('sm')]: {
      display: 'flex',
      justifyContent: 'center',
      margin: '0 8px',
    },
    '& button': {
      margin: '10px auto',
      [breakpoints.up('sm')]: {
        margin: '0 8px 10px 8px',
      },
    },
  },
  itemSection: {
    padding: 0,
  },
  itemList: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 16,
    [breakpoints.up('sm')]: {
      marginBottom: 40,
    },
  },
  itemDisabled: {
    display: 'flex',
    justifyContent: 'space-between',
    opacity: 0.5,
    marginBottom: 16,
    [breakpoints.up('sm')]: {
      marginBottom: 40,
    },
  },
  hline: {
    margin: '16px 0',
    [breakpoints.up('sm')]: {
      margin: '40px 0',
    },
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
