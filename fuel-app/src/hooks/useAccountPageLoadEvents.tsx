import {
  useActiveAccount,
  useActiveAccountId,
  useProductDetails,
  useSessionState,
  useVacationServicesInfo,
} from 'src/selector-hooks'
import usePageLoadEvents from './usePageLoadEvents'
import { useMemo } from 'react'
import {
  INTERNET_OR_PHONE,
  MAKE_A_PAYMENT,
  RESIDENTIAL_CUSTOMER,
} from 'src/constants'

const useAccountPageLoadEvents = (pageName: string, trackProducts = false) => {
  const isMakeAPaymentPage = pageName === MAKE_A_PAYMENT

  const accountId = useActiveAccountId()
  const { data: activeAccount } = useActiveAccount()
  const { data: productDetails, error } = useProductDetails()
  const { data: sessionState } = useSessionState()
  const { data: vacationServicesInfo } = useVacationServicesInfo()

  const DTMProps: any = useMemo(() => {
    let trackingProps: any = {}
    if (activeAccount.accountType) {
      trackingProps = {
        shouldTriggerDTMEvent: Boolean(activeAccount.accountType),
        eventData: {
          pageName: pageName,
          eVar21: sessionState?.fidUuid,
          eVar22: RESIDENTIAL_CUSTOMER,
          eVar51: activeAccount?.usi,
          eVar60: INTERNET_OR_PHONE,
          eVar66: activeAccount?.accountType,
          eVar100: activeAccount?.accountUID,
          prop5: vacationServicesInfo?.vacationStatus,
        },
      }
      if (isMakeAPaymentPage) {
        trackingProps.eventData.events = 'event9'
      }
    }

    if (trackProducts && !error) {
      if (
        Object.keys(trackingProps)?.length > 0 &&
        productDetails.hasOwnProperty('displayOrder')
      ) {
        const productKeys = Object.keys(productDetails?.map)
        let productSKUs: any = []
        for (const item of productKeys) {
          if (item === 'yytv' && productDetails?.map?.[item]?.enabled) {
            productSKUs.push(';YouTube_TV')
          } else {
            const productLine = productDetails?.map?.[item]
            if (
              productLine &&
              productLine?.enabled &&
              productLine?.items?.length > 0
            ) {
              const lineSKUs = productLine?.items.map(
                (prod: any) => `;${prod.sku}`,
              )
              productSKUs = [...productSKUs, ...lineSKUs]
            }
          }
        }
        // @ts-ignore
        trackingProps.eventData = {
          // @ts-ignore
          ...trackingProps.eventData,
          events: 'event101',
          products: productSKUs?.join(',') ?? '',
        }
      } else {
        return {}
      }
    }

    return trackingProps
  }, [
    activeAccount.accountType,
    accountId,
    trackProducts,
    productDetails,
    sessionState,
  ])

  usePageLoadEvents(DTMProps)
}

export default useAccountPageLoadEvents
