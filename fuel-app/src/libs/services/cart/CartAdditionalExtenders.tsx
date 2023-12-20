import { useState } from 'react' //Dispatch
import InfoIconRed from '@/shared-ui/react-icons/info-icon-red'
import colors from 'src/styles/theme/colors'
import ModalWrapper from 'src/libs/register/components/ModalWrapper'
import QuantityInput from 'src/components/QuantityInput'
import classNames from 'classnames'
import { useWindowDimensions, useAppData } from 'src/hooks'
import { makeStyles } from '@material-ui/core'
import { Typography, Tooltip, Button } from '@/shared-ui/components'
import {
  COMPONENT_WRAPPER,
  QUANTITY_ACTIONS,
  SELF_SERVICE,
} from 'src/constants'
import { replacer, priceFormatterWithoutDecimal } from '../shared/miscUtlis'
import { offersData } from '../shared/types'

interface AdditionalExtendersProps {
  cartData?: offersData
  getExtenderCartData: (
    action: string,
    itemCode: string,
    itemSequence: number,
    quantity: number,
    category: string,
    quantityAction: string,
  ) => void
  isExtendersInCart: boolean
  isWhwifiInCart: boolean
}
const CartAdditionalExtenders = ({
  cartData,
  getExtenderCartData,
}: AdditionalExtendersProps) => {
  const classes = useStyles()
  const { width } = useWindowDimensions()
  const isMobileOrTablet = width <= 1023

  const extenderData = cartData?.newItemsInCart.find(
    (item: { Category: string }) => item?.Category === SELF_SERVICE.EXTENDERS,
  )
  const extendersinOffersData = cartData?.Offers.find(
    (item: { Category: string }) => item.Category === SELF_SERVICE.EXTENDERS,
  )

  const extendersQtyValue =
    cartData?.ExtenderLimit?.TotalExtendersNewlyAdded || 0

  const extenderQuantity = extenderData?.Quantity || 0
  const [showModal, setShowModal] = useState(false)
  const CartAdditionalExtenders =
    useAppData('CartAdditionalExtenders', true) || {}

  const addExtenderPrice =
    (extenderData?.Price ?? 0) || (extendersinOffersData?.Price ?? 0)

  const updatePriceStr = (str: string, price: number) => {
    return replacer(
      str,
      '$AMOUNT$',
      price && priceFormatterWithoutDecimal(price),
    )
  }
  const handleClick = () => {
    isMobileOrTablet ? setShowModal(true) : ''
  }

  const ModalContent = () => (
    <div className={classes.root}>
      <div className={classes.warningMessage}>
        <Typography tagType="h3" styleType="h5" data-tid="modal-title">
          {CartAdditionalExtenders.upsellVersionTitle?.value}
        </Typography>
      </div>
      <div className={classes.description}>
        <Typography
          tagType="p"
          styleType="p1"
          className={classes.descriptionText}
        >
          {CartAdditionalExtenders.tooltipTextForCoverage?.value}
        </Typography>
      </div>
      <div className={classes.btnWrapper}>
        <Button
          type="button"
          variant="primary"
          hoverVariant="primary"
          text={CartAdditionalExtenders.actionButtonTitle?.value}
          onClick={() => setShowModal(false)}
        />
      </div>
    </div>
  )
  const handleIncrement = () => {
    extenderCart(
      SELF_SERVICE.ADD,
      extenderQuantity + 1,
      QUANTITY_ACTIONS.INCREMENT,
    )
  }
  const handleDecrement = () => {
    if (extenderQuantity - 1 === 0) {
      extenderCart(
        SELF_SERVICE.REMOVE,
        extenderQuantity,
        QUANTITY_ACTIONS.DECREMENT,
      )
    } else {
      extenderCart(
        SELF_SERVICE.ADD,
        extenderQuantity - 1,
        QUANTITY_ACTIONS.DECREMENT,
      )
    }
  }
  const extenderCart = (
    action: string,
    quantity: number,
    quantityAction: string,
  ) => {
    extendersinOffersData &&
      getExtenderCartData(
        action,
        extendersinOffersData.ItemCode,
        extendersinOffersData.ItemSequence,
        quantity,
        extendersinOffersData.Category,
        quantityAction,
      )
  }
  const maxLimit = cartData?.ExtenderLimit?.MaxLimit
  const IsWwifiAdded = cartData?.ExtenderLimit?.IsWwifiAdded
  const disablePlus = IsWwifiAdded
    ? extendersQtyValue + 2 === maxLimit
    : extendersQtyValue === maxLimit

  const upsellOrNormalValue =
    extendersQtyValue === 0
      ? CartAdditionalExtenders.upsellVersionTitle?.value
      : CartAdditionalExtenders.normalVersionTitle?.value
  return (
    <>
      <div className={classNames([classes.grid])}>
        <div onClick={handleClick}>
          <Typography styleType="p1" tagType="label" className={classes.title}>
            {upsellOrNormalValue}
          </Typography>
        </div>
        {!isMobileOrTablet && !extenderData && (
          <Tooltip
            tooltipText={CartAdditionalExtenders.tooltipTextForCoverage?.value}
            tooltipIcon={<InfoIconRed />}
            tooltipClassName={classes.toolTipIcon}
            tooltipContentClass={classes.toolTipContent}
            tooltipArrowClass={classes.tooltipArrow}
          />
        )}
        <div className={classes.rightAlign} />
        <Typography
          styleType="p1"
          tagType="h6"
          className={`${!extenderData && classes.priceOpacity}`}
        >
          {updatePriceStr(
            CartAdditionalExtenders.price?.value,
            extenderData?.Price || 0,
          )}
        </Typography>
      </div>
      {!extenderData && isMobileOrTablet && (
        <Typography styleType="p1" tagType="span">
          {updatePriceStr(
            CartAdditionalExtenders.price?.value,
            addExtenderPrice,
          ) +
            ' ' +
            CartAdditionalExtenders.priceSubHeading?.value}
        </Typography>
      )}
      <div className={classes.quantity}>
        <QuantityInput
          quantityValue={extenderQuantity}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
          disableMinus={extenderQuantity === 0}
          disablePlus={disablePlus}
        />
        {!extenderData && !isMobileOrTablet && (
          <div className={classes.price}>
            <Typography styleType="h5" tagType="p">
              {updatePriceStr(
                CartAdditionalExtenders.price?.value,
                addExtenderPrice,
              )}
            </Typography>
            <Typography
              styleType="p2"
              tagType="p"
              className={classes.priceExtender}
            >
              {CartAdditionalExtenders.priceSubHeading?.value}
            </Typography>
          </div>
        )}
      </div>

      <ModalWrapper
        isOpen={showModal}
        handleClose={() => setShowModal(false)}
        modalContent={<ModalContent />}
      />
    </>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    ...COMPONENT_WRAPPER,
    padding: '48px 0',
    width: 331,
    [breakpoints.up('sm')]: {
      width: '100%',
    },
  },

  title: {
    textDecoration: 'underline',
    [breakpoints.up('sm')]: {
      textDecoration: 'none',
    },
  },
  quantity: {
    [breakpoints.up('sm')]: {
      width: 292,
      margin: '0px 16px 0px 0px',
    },
    margin: '6px 16px 0px 0px',
    width: 131,
    display: 'flex',
  },
  grid: {
    display: 'flex',
    alignItems: 'center',
    margin: '-32px 0px -20px',
  },
  priceExtender: { margin: 0 },
  rightAlign: {
    flex: '1 1 auto',
  },
  price: { marginLeft: 16 },
  toolTipIcon: {
    '& svg': {
      width: 16,
      height: 16,
    },
  },
  priceOpacity: {
    [breakpoints.up('sm')]: {
      opacity: 0.6,
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
      margin: 4,
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
    textAlign: 'center',
  },
  btnWrapper: {
    width: 246,
    margin: '2rem auto 0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}))

export default CartAdditionalExtenders
