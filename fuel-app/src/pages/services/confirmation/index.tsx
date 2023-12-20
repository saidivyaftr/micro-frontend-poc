import { makeStyles } from '@material-ui/core'
import {
  AppRoutes,
  COMPONENT_WRAPPER,
  SELF_SERVICE_PAGES,
  SESSION_STORAGE,
} from 'src/constants/'
import customStaticProps from 'src/utils/appData'
import { useAppData, useIsLoadingFromApp } from 'src/hooks'
import MainLayout from 'src/layouts/MainLayout'
import ServicesLayout from 'src/layouts/ServicesLayout'
import ConfirmationHero from 'src/libs/services/Confirmation/ConfirmationHero'
import OrderSummary from 'src/libs/services/Confirmation/OrderSummary'
import AccountInformation from 'src/libs/services/Confirmation/AccountInformation'
import NextSteps from 'src/libs/services/Confirmation/NextSteps'
import colors from 'src/styles/theme/colors'
import { useEffect, useState } from 'react'
import { CartLineItem, offersData } from 'src/libs/services/shared/types'
import { InjectHTML, Tile } from '@/shared-ui/components'
import SessionTimeout from 'src/libs/services/shared/SessionTimeout'
import {
  formatAddress,
  getProductVASCode,
} from 'src/libs/services/shared/miscUtlis'
import { handlePageViewAnalyticsWithPlaceOrder } from 'src/libs/services/shared/AnalyticsUtlis'
import { useSelector } from 'react-redux'
import CartDisclaimer from 'src/libs/services/cart/CartDisclaimer'

interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}

function ConfirmationPage(props: PageProps): JSX.Element {
  const hasDTMLLoaded = useSelector(
    (state: any) => state?.appConfig?.configs?.['DTM'],
  )

  const getProductVAS = (
    cartItems: CartLineItem[],
    filteredCartItems: CartLineItem[],
    withDetail = false,
  ) => {
    const products: string[] = []
    filteredCartItems.map((serviceItem: CartLineItem) => {
      let productVASName = `${getProductVASCode(
        serviceItem.ItemCode,
        serviceItem.Category,
      )}`
      if (withDetail) {
        productVASName += `;1` // Quantity
        // From serviceItem where ever we find one time charges, updating those charges in Analytics String
        if (serviceItem.SummaryLevel === 'One Time Charges') {
          productVASName +=
            serviceItem.Price !== 0 ? `;${serviceItem.Price}` : '0.00' // Price
        } else {
          productVASName += ';0' // Price
        }

        if (serviceItem.Recurring === true) {
          productVASName += `;event31=${serviceItem.Price}`
        }
        // TODO - Right now no product with discount coming from API so code commented
        if (serviceItem.Discounts) {
          productVASName += `|event32=${serviceItem.Discounts}`
        }
      }
      products.push(productVASName)
    })
    return products
  }

  const classes = useStyles()

  const { PageNotAvailableErrorTitle, ButtonText, ButtonLink } = useAppData(
    'ErrorPage',
    true,
  )
  const isFromMobileApp = useIsLoadingFromApp()
  const [orderInfo, setOrderInfo] = useState<offersData>()
  const [newServices, setNewServices] = useState<CartLineItem[]>([])
  const [tileData, setTileData] = useState<any>()
  useEffect(() => {
    if (orderInfo) {
      const newCartItems: CartLineItem[] = orderInfo?.newItemsInCart
      const newServices = orderInfo?.newServicesInCart
      if (hasDTMLLoaded) {
        const productsString = getProductVAS(
          newCartItems,
          newServices,
          true,
        ).join(',')
        handlePageViewAnalyticsWithPlaceOrder(
          productsString,
          SELF_SERVICE_PAGES.CONFIRMATION_PAGE,
        )
      }
    }
  }, [hasDTMLLoaded, orderInfo])

  useEffect(() => {
    if (!sessionStorage.getItem(SESSION_STORAGE.ORDER_DATA)) {
      window.location.href = '../login'
    }
    setOrderInfo(
      JSON.parse(sessionStorage.getItem(SESSION_STORAGE.ORDER_DATA) || '{}'),
    )
  }, [])

  useEffect(() => {
    const _tileData = {
      title: {
        children: PageNotAvailableErrorTitle?.value,
        tagType: 'h4',
        styleType: 'h4',
      },
      ctas: [
        {
          href: `${ButtonLink?.url}${window.location.search}`,
          label: ButtonText?.value,
          variant: 'primary',
          type: 'link',
          hoverVariant: 'primary',
        },
      ],
    }
    setTileData(_tileData)
  }, [PageNotAvailableErrorTitle, ButtonLink])

  useEffect(() => {
    if (orderInfo) {
      setNewServices(orderInfo.newServicesInCart)
      sessionStorage.clear()
    }
  }, [orderInfo])
  const filterYTTVInCart = newServices?.filter(
    (item) => item.ItemCode === 'YTTVE',
  )
  const isYTTVinCart = filterYTTVInCart && filterYTTVInCart.length > 0
  const youtubeTvDisclaimer = useAppData('youtubeTvDisclaimer', true)

  return (
    <SessionTimeout>
      <MainLayout
        hideHeader={isFromMobileApp}
        hideFooter={isFromMobileApp}
        {...props}
      >
        <ServicesLayout>
          {orderInfo && orderInfo?.CartLineItems?.length > 0 ? (
            <>
              <ConfirmationHero />
              <div className={classes.innerWrapper}>
                <div className={classes.leftSection}>
                  <OrderSummary
                    newServices={newServices}
                    oneTimeChargesList={orderInfo.oneTimeChargesInCart}
                    monthlyRecurringCharges={
                      orderInfo?.monthlyRecurringChargesTotal
                    }
                    newServicesTotal={orderInfo?.newServicesTotal}
                    oneTimeChargesTotal={orderInfo?.oneTimeChargesTotal}
                    existingServicesTotal={orderInfo?.exisitingServicesTotal}
                  />
                  {orderInfo && (
                    <NextSteps
                      emailAddress={orderInfo.Email}
                      isYTTVinCart={isYTTVinCart}
                    />
                  )}
                </div>
                <div className={classes.rightSection}>
                  <AccountInformation
                    serviceAddressValue={formatAddress({
                      AddressLine1: orderInfo?.AddressLine1 || '',
                      AddressLine2: orderInfo?.AddressLine2,
                      City: orderInfo?.City || '',
                      State: orderInfo?.State || '',
                      ZipCode: orderInfo?.ZipCode || '',
                    })}
                    emailAddress={orderInfo?.Email}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className={classes.tileRoot}>
              <Tile
                title={tileData?.title}
                ctas={tileData?.ctas}
                className={classes.tileWrapper}
              />
            </div>
          )}
          <div className={classes.descriptionDiv}>
            <div className={classes.space20}>
              <CartDisclaimer />
            </div>
            {isYTTVinCart && (
              <>
                <InjectHTML
                  styleType="legal"
                  tagType="div"
                  color="default"
                  className={classes.space}
                  value={youtubeTvDisclaimer?.descriptionYoutubeTv?.value}
                />
              </>
            )}
          </div>
        </ServicesLayout>
      </MainLayout>
    </SessionTimeout>
  )
}
const useStyles = makeStyles(({ breakpoints }) => ({
  innerWrapper: {
    ...COMPONENT_WRAPPER,
    paddingTop: 42,
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: '6rem',
    [breakpoints.down('sm')]: {
      display: 'block',
      paddingTop: 16,
      paddingBottom: '4.25rem',
    },
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
  leftSection: {
    width: 868,
    [breakpoints.down('md')]: {
      width: 'inherit',
    },
    [breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  rightSection: {
    width: 316,
    marginLeft: 16,
    [breakpoints.down('md')]: {
      width: 'inherit',
    },
    [breakpoints.down('sm')]: {
      width: '100%',
      marginTop: 16,
      marginLeft: 0,
    },
  },
  tileRoot: {
    backgroundColor: colors.main.white,
    paddingTop: '3rem',
    paddingBottom: '3rem',
  },
  tileWrapper: {
    ...COMPONENT_WRAPPER,
  },
  space20: {
    margin: '20px 0 0 0',
  },
  space: {
    margin: '20px 0 0 0',
    fontSize: 11,
  },
}))

export const getStaticProps = customStaticProps(
  AppRoutes.SelfServiceConfirmationPage,
)

export default ConfirmationPage
