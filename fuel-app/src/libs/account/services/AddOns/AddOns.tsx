import { useState, useEffect, MouseEventHandler } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AddOnsTile from './AddOnsTile'
import { useAppData, useWindowDimensions } from 'src/hooks'
import { InjectHTML, Loading } from '@/shared-ui/components'
import {
  COMPONENT_WRAPPER,
  CUSTOMER,
  RESIDENTIAL_CUSTOMER,
  SELF_SERVICE,
  SERVICEABLE,
  SERVICES_ADD_ONS_TAB,
  SESSION_STORAGE,
} from 'src/constants/'
import APIClient from 'src/api-client'
import { setApiErrorCode } from 'src/redux/slicers/apiErrors'
import { useDispatch, useSelector } from 'react-redux'
import { formatUrl } from 'src/utils/urlHelpers'
import { offersData, offerData, tileData } from 'src/libs/services/shared/types'
import {
  PP_OBJECT_SANS,
  PP_OBJECT_SANS_BOLD,
} from 'src/constants/fontFamilyNames'
import colors from '@/shared-ui/colors'
import NoOfferInfo from 'src/libs/services/additional-services/NoOfferInfo'
import { State } from 'src/redux/types'
import { useSessionState } from 'src/selector-hooks'
import { useCartDataContext } from 'src/libs/services/CartContextProvider'
import SystemError from 'src/libs/services/shared/ErrorModal'
import ApiErrorModal from 'src/libs/services/shared/ApiErrorModal'
import { getICase } from '../../helper'
import AddExtenderModal from 'src/libs/services/shared/AddExtenderModal'
import { IButtonVariant } from '@/shared-ui/components/Button'
import { IButtonHoverVariant } from '@/shared-ui/components/Button/types'
import { getProductCode } from 'src/libs/services/shared/miscUtlis'
import {
  pageViewAnalytics,
  updateCartClickAnalytics,
} from 'src/libs/services/shared/AnalyticsUtlis'

type activeAccountDataType = {
  accountStatusNew?: string
  id?: string
  accountType?: string
  accountUuid?: string
}

export interface OfferListItemType {
  title: string
  description: string
  icon: JSX.Element
  itemSequence: number
  button?: {
    buttonHoverVariant?: IButtonHoverVariant | undefined
    type?: string
    text?: string
    href?: string
    variant?: IButtonVariant
    onClick?: MouseEventHandler<HTMLAnchorElement> | undefined
    objectID?: string
  }
  href?: string
  objectID?: string
  subTitle?: string
  itemCode?: string
  category?: string
  ExtenderLimit?: {
    MaxLimit: number
    TotalExtendersNewlyAdded: number
    RemainingQuantity: number
  }
  RemoveFromCartButton?: {
    text: string
  }
  WHWFinOffersDescription: string
  AddToCartButton: {
    text: string
    onClick: (a: any, b: string) => void
  }
  addMeshExtender: {
    value: string
  }
  LearnMoreButton: {
    text: string
    onClick: () => void
    href: string
    objectID: string
  }
}

const AddOns = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { accountInfoOnLoad } =
    useSelector((state: State) => state?.account) || {}
  const sourceId = '213'
  const { width } = useWindowDimensions()
  const isMobile = width <= 768
  const { tileList } = useAppData('ServicesList', true)
  const whwfDisclaimer = useAppData('whwfDisclaimer', true)

  const [offerList, setOfferList] = useState<OfferListItemType[]>([])
  const [accountBtn, setBtn] = useState<any>()
  const [pdpOffersData, setPdpOffersData] = useState<offersData>()
  const [showLoading, setShowLoading] = useState<boolean>(true)
  const [showButtonLoading, setShowButtonLoading] = useState<boolean>(false)
  const [selectedTileTitle, setSelectedTileTitle] = useState<string>('')
  const { setContextCartData, contextCartData } = useCartDataContext()
  const [cartData, setCartData] = useState<offersData>(contextCartData)
  const [cartItemCount, setCartItemCount] = useState(0)

  const [isWHWFinOffers, setIsWHWFinOffers] = useState<boolean>()
  const [productListString, setProductListString] = useState<string>('')
  const [activeAccountData, setActiveAccountData] =
    useState<activeAccountDataType>()
  const { data: sessionState } = useSessionState()
  const [errorCode, setErrorCode] = useState<number>(0)

  const { list, activeAccount } =
    useSelector((state: State) => state?.account) || {}
  const [openExtenderModal, setOpenExtenderModal] = useState<boolean>(false)

  useEffect(() => {
    if (activeAccount.id !== '') {
      const data: activeAccountDataType =
        list?.data?.find((item: any) => item.id === activeAccount.id) || {}
      setActiveAccountData(data)
    }
  }, [activeAccount.id, list])

  useEffect(() => {
    if (
      productListString !== '' &&
      productListString !== ';' &&
      activeAccountData
    ) {
      const eventData = {
        pageName: SERVICES_ADD_ONS_TAB,
        eVar21: sessionState?.fidUuid, //fidUuid
        eVar22:
          activeAccountData.accountType === 'Residential'
            ? RESIDENTIAL_CUSTOMER
            : CUSTOMER, //userType
        eVar51: activeAccount?.details?.data?.usi,
        eVar60: '',
        eVar66: activeAccountData.accountType, //CustomerType
        eVar100: activeAccountData.accountUuid, // AccountUUID
        events: 'event176',
        products: productListString,
        eVar49: SERVICEABLE,
        eVar33: SELF_SERVICE.VAS_ADD_ONS,
      }
      pageViewAnalytics(eventData)
    }
  }, [productListString, activeAccountData])

  useEffect(() => {
    if (cartData?.CartLineItems) {
      const cartItems = cartData.CartLineItems.filter(
        (item) => item.Type === 'New',
      )
      setCartItemCount(cartItems.length)
      setPdpOffersData(cartData)
    }
  }, [cartData])

  useEffect(() => {
    if (contextCartData) {
      setCartData(contextCartData)
    }
  }, [contextCartData])

  useEffect(() => {
    if (
      accountInfoOnLoad.data.btn &&
      accountInfoOnLoad.data.btn !== accountBtn
    ) {
      accountInfoOnLoad.data.btn && setBtn(accountInfoOnLoad.data.btn)
    }
  }, [accountInfoOnLoad.data.btn])

  useEffect(() => {
    const getData = async () => {
      setShowLoading(true)

      const ICID =
        sessionStorage.getItem(SESSION_STORAGE.ICID) ||
        (await getICase(accountBtn))
      const response = await getOffersSelfService(accountBtn, ICID, sourceId)
      if (response?.redirectToLogin) {
        sessionStorage.clear()
        window.location.href = '../login'
      } else {
        setShowLoading(false)
        setPdpOffersData(response)
        sessionStorage.setItem(
          SESSION_STORAGE.CART_DATA,
          JSON.stringify(response || {}),
        )
        setContextCartData(response)
        sessionStorage.setItem(SESSION_STORAGE.SID, '213')
      }
    }
    accountBtn && !cartData.CartLineItems && getData()
  }, [accountBtn, cartData])

  const getOffersSelfService = async (
    accountBtn: string,
    icaseId: string,
    sourceId: string,
  ) => {
    try {
      const response: any = await APIClient.getOffersSelfService(
        accountBtn,
        icaseId,
        sourceId,
      )
      return response.data
    } catch (error: any) {
      setErrorCode(error?.response?.status)
      dispatch(
        setApiErrorCode({
          module: 'myServices',
          errorCode: error?.response?.status,
        }),
      )
    }
  }

  useEffect(() => {
    if (pdpOffersData?.Offers) {
      const filteredByOffers = tileList?.list.filter((tile: tileData) => {
        return (
          pdpOffersData?.Offers.filter(
            (offer: offerData) => offer?.Category === tile?.id?.value,
          ).length > 0
        )
      })
      // Merging both Array based in Id, so we can get price and other data from both array
      const mergeById = filteredByOffers?.map((item1: tileData) => ({
        ...pdpOffersData?.Offers.find(
          (item2: offerData) => item2?.Category === item1?.id?.value,
        ),
        ...item1,
      }))
      // Matching Data, and showing the left over item/s in related items
      const list = mergeById.map((tile: tileData) => {
        return {
          itemCode: tile.ItemCode,
          category: tile.Category,
          addMeshExtender: tile.addMeshExtender,
          itemSequence: tile.ItemSequence,
          title: tile?.title?.value,
          subTitle: getPriceString(tile?.Price, tile?.ItemCode),
          WHWFinOffersDescription: tile?.WHWFinOffersDescription?.value,
          description: tile?.description?.value,
          icon: <InjectHTML value={tile?.icon?.rendered} />,
          LearnMoreButton: {
            text: tile?.buttonText?.value,
            href: formatUrl(tile?.href?.value),
          },
          AddToCartButton: {
            text: tile?.addToCartButtonText.rendered,
            onClick: updateCartHandler,
          },
          RemoveFromCartButton: {
            text: 'Remove From Cart',
            onClick: updateCartHandler,
          },
        }
      })

      setOfferList(list)
      setShowLoading(false)

      // Send List to Analytics
      let productString = ';'
      mergeById.map((item: offerData, index: number) => {
        switch (item.ItemCode) {
          case SELF_SERVICE.PRODUCT_WHWIFI_PAGE_CODE:
            productString += SELF_SERVICE.PRODUCT_WHWIFI
            break
          case SELF_SERVICE.PRODUCT_MPTP_PAGE_CODE:
            productString += SELF_SERVICE.PRODUCT_MPTP
            break
          case SELF_SERVICE.PRODUCT_FSWFI_PAGE_CODE:
            productString += SELF_SERVICE.PRODUCT_EEROSECURE
            break
          case SELF_SERVICE.PRODUCT_YTTVE_PAGE_CODE:
            productString += SELF_SERVICE.PRODUCT_YTTVE
            break
          case SELF_SERVICE.PRODUCT_FTRTS_PAGE_CODE:
            productString += SELF_SERVICE.PRODUCT_FTRTS
            break
        }
        if (item.Category === SELF_SERVICE.EXTENDERS) {
          productString += SELF_SERVICE.PRODUCT_EXTENDERS
        }
        // The empty semicolons, because we are not returning Quantity, Price, or Events with an Add to Cart event.
        //productString += ';' // Quantity
        //productString += ';' // Price
        //productString += ';' // Event
        // Adding , to separate the products
        if (index + 1 !== mergeById.length) {
          productString += ',;' // if more product
        }
      })
      //My Account VAS Add-Ons
      setProductListString(productString)
    }
  }, [pdpOffersData])

  useEffect(() => {
    if (offerList.length > 0) {
      const filteredWHWFData = offerList?.find(
        (item: any) => item.itemCode === SELF_SERVICE.PRODUCT_WHWIFI_PAGE_CODE,
      )
      setIsWHWFinOffers(!!filteredWHWFData)
    }
  }, [offerList])

  const updateSelectedTile = (title: string) => {
    setSelectedTileTitle(title)
    setShowButtonLoading(title ? true : false)
  }

  const updateCart = async (item: OfferListItemType, action: string) => {
    updateSelectedTile(item.title)
    try {
      const response: any = await APIClient.updateCartSelfService({
        body: {
          sCaseID: pdpOffersData?.sCaseID,
          ItemCode: item.itemCode,
          ItemSequence: item.itemSequence,
          Action: action === 'ADD' ? 'Add' : 'Remove',
          Quantity: 1,
        },
        sourceId,
      })
      sessionStorage.setItem(
        SESSION_STORAGE.CART_DATA,
        JSON.stringify(response.data),
      )
      setCartData(response.data)
      setContextCartData(response.data)
      updateSelectedTile('')
      return response.data
    } catch (error: any) {
      dispatch(
        setApiErrorCode({
          module: 'cartApi',
          errorCode: error?.response?.status,
        }),
      )
      updateSelectedTile('')
    }
  }

  const updateCartHandler = (item: any, action: string) => {
    let productString = getProductCode(item.itemCode, item.Category)
    // The empty semicolons, because we are not returning Quantity, Price, or Events with an Add to Cart event.
    if (action === 'ADD' || action === 'ADD_EXTENDER') {
      productString += ';' // Quantity
      productString += ';' // Price
      productString += ';' // Event
    }
    updateCartClickAnalytics(
      cartItemCount,
      productString,
      action,
      SELF_SERVICE.PRODUCT_LISTING_PAGE,
    )
    if (action === 'ADD_EXTENDER') {
      setOpenExtenderModal(true)
    } else {
      const sessionData =
        sessionStorage.getItem(SESSION_STORAGE.PDP_PAGEVIEW) || ''
      const pageViewCount = sessionData ? Number(sessionData) + 1 : 0
      sessionStorage.setItem(
        SESSION_STORAGE.PDP_PAGEVIEW,
        pageViewCount.toString(),
      )
      updateCart(item, action)
    }
  }

  /* eslint-disable @typescript-eslint/indent */
  const getPriceString = (price: string, itemCode?: string) => {
    return isMobile
      ? `<span style="font-size:30px;font-family: '${PP_OBJECT_SANS_BOLD}'">$${price}</span><span style="font-size:14px;font-family: '${PP_OBJECT_SANS}'">/mo. ${
          itemCode === 'YTTVE' ? '+taxes' : ''
        }</span>`
      : `<span style="font-size:56px;font-family: '${PP_OBJECT_SANS_BOLD}'">$${price}</span><span style="font-size:16px;font-family: '${PP_OBJECT_SANS}'">/mo. ${
          itemCode === 'YTTVE' ? '+taxes' : ''
        }</span>`
  }
  return (
    <>
      <SystemError />
      <ApiErrorModal showCloseBtn={true} hideFor403={true} />
      {showLoading ? (
        <Loading className={classes.loaderArea} />
      ) : errorCode === 403 ||
        (offerList.length === 0 && pdpOffersData?.Offers?.length === 0) ? (
        <NoOfferInfo
          sessionState={sessionState}
          activeAccountData={activeAccountData}
          activeAccount={activeAccount}
        />
      ) : (
        offerList && (
          <div>
            {offerList?.map((item: OfferListItemType, i: number) => (
              <div key={i} className={classes.addonBox}>
                <AddOnsTile
                  tile={item}
                  showButtonLoading={showButtonLoading}
                  cartData={cartData}
                  selectedTileTitle={selectedTileTitle}
                  isWHWFinOffers={isWHWFinOffers}
                />
                {item?.category === 'EXTENDERS' && (
                  <AddExtenderModal
                    itemCategory={item?.category}
                    openExtenderModal={openExtenderModal}
                    setOpenExtenderModal={setOpenExtenderModal}
                    sourceId={sourceId}
                    setCartData={setCartData}
                    cartItemCount={cartItemCount}
                  />
                )}
              </div>
            ))}
            <div className={classes.descriptionDiv}>
              {isWHWFinOffers && (
                <InjectHTML
                  styleType="legal"
                  tagType="div"
                  color="default"
                  className={classes.space}
                  value={whwfDisclaimer?.description?.value}
                />
              )}
            </div>
          </div>
        )
      )}
    </>
  )
}

export default AddOns

const useStyles = makeStyles(({ breakpoints }) => ({
  addonBox: {
    backgroundColor: colors.main.white,
    width: '98%',
    minHeight: 260,
    borderRadius: 16,
    margin: 10,
    padding: 32,
    display: 'inline-block',
    verticalAlign: 'top',
    [breakpoints.up('sm')]: {
      width: '48%',
    },
  },
  loaderArea: {
    ...COMPONENT_WRAPPER,
    height: 100,
  },
  descriptionDiv: {
    ...COMPONENT_WRAPPER,
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
    marginTop: 60,
  },
}))
