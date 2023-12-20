/* eslint-disable @typescript-eslint/indent */
// eslint-disable-next-line
// @ts-no

import {
  PageLoadEventType,
  EventDataType,
} from '@/shared-ui/hooks/usePageLoadEvents'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import InvocaClient from 'src/utils/invoca'
import {
  SELF_SERVICE,
  CUSTOMER,
  SERVICEABLE,
  SELF_SERVICE_PAGES,
  SESSION_STORAGE,
} from 'src/constants'

export const updateProductViewAnalytics = (pageCode: string) => {
  const productString =
    pageCode === SELF_SERVICE.PRODUCT_MPTP_PAGE_CODE
      ? SELF_SERVICE.PRODUCT_MPTP
      : pageCode === SELF_SERVICE.PRODUCT_WHWIFI_PAGE_CODE
      ? SELF_SERVICE.PRODUCT_WHWIFI
      : pageCode === SELF_SERVICE.PRODUCT_FSWFI_PAGE_CODE
      ? SELF_SERVICE.PRODUCT_EEROSECURE
      : pageCode === SELF_SERVICE.PRODUCT_YTTVE_PAGE_CODE
      ? SELF_SERVICE.PRODUCT_YTTVE
      : pageCode === SELF_SERVICE.PRODUCT_FTRTS_PAGE_CODE
      ? SELF_SERVICE.PRODUCT_FTRTS
      : ''
  const sessionData = sessionStorage?.getItem('PDP_PAGEVIEW') || ''
  const pageViewCount = sessionData ? Number(sessionData) : 0
  if (pageViewCount === 0) {
    // Sending Data to Analytics - PDP Page View for the first view.
    pageViewAnalytics({
      events: `event35:${Math.floor(
        Math.random() * 10000000,
      )}, event33, prodView`,
      eVar33: SELF_SERVICE.VAS_ADD_ONS,
      products: `;${productString}`,
    })
  } else {
    // Sending Data to Analytics - PDP Page View for the subsequent view.
    pageViewAnalytics({
      events: `event33, prodView`,
      products: `;${productString}`,
    })
  }
}

export const updatePageLoadAnalytics = (
  productsLength: number,
  pageName: string,
  success: boolean,
) => {
  pageLoadAnalytics({
    shouldTriggerDTMEvent: true,
    shouldTriggerInvoca: success,
    eventData: {
      pageName: SELF_SERVICE_PAGES.PRODUCT_DETAIL_PAGE.replace(
        '/{NAME}',
        pageName,
      ),
      eVar22: CUSTOMER,
      eVar49: SERVICEABLE,
      prop10: productsLength === 0 ? 'VAS Not Visible' : 'VAS Visible',
    },
  })
}

export const handlePageViewAnalytics = (pageName: string) => {
  pageViewAnalytics({
    pageName: pageName,
    eVar22: CUSTOMER,
    eVar49: SERVICEABLE,
  })
}

export const handlePageViewAnalyticsWithPlaceOrder = (
  productString: string,
  pageName: string,
) => {
  pageViewAnalytics({
    pageName: pageName,
    eVar22: CUSTOMER,
    eVar49: SERVICEABLE,
    events: `event31,event90:${Math.floor(Math.random() * 10000000)}`,
    eVar33: SELF_SERVICE.VAS_ADD_ONS,
    products: productString,
  })
}

export const updateCartClickAnalytics = (
  cartItemCount: number,
  productName: string,
  action: string,
  sourcePage: string,
  event181Value = '1',
  eVar97Value = '1',
) => {
  const sessionData = sessionStorage?.getItem('PDP_PAGEVIEW') || ''
  let pageViewCount = sessionData ? Number(sessionData) : 0
  if (action === 'ADD') {
    let eventsValue = ''
    const event35Value = Math.floor(Math.random() * 10000000)
    if (pageViewCount === 0) {
      pageViewCount += 1
      eventsValue =
        cartItemCount === 0
          ? `event35:${event35Value},scAdd,scOpen`
          : `event35:${event35Value},scAdd`
    } else {
      pageViewCount += 1
      eventsValue = cartItemCount === 0 ? `scAdd,scOpen` : `scAdd`
    }
    sessionStorage.setItem(
      SESSION_STORAGE.PDP_PAGEVIEW,
      pageViewCount.toString(),
    )
    triggerClickAnalytics(
      {
        events: eventsValue,
        eVar33: SELF_SERVICE.VAS_ADD_ONS,
        products: `;${productName}event181=${event181Value};eVar43=${sourcePage}|eVar97=${eVar97Value}`,
        eVar22: CUSTOMER,
      },
      'Add to Cart',
    )
  } else if (action === 'REMOVE') {
    triggerClickAnalytics(
      {
        events: 'scRemove',
        eVar33: SELF_SERVICE.VAS_ADD_ONS,
        products: `;${productName}`,
        eVar22: CUSTOMER,
      },
      'Remove from Cart',
    )
  }
}

export const siteInteractionAnalytics = (
  eVar14Str: string,
  interactionStr: string,
) => {
  triggerClickAnalytics(
    {
      events: 'event14',
      eVar14: eVar14Str,
    },
    interactionStr,
  )
}

export const VASProductListAnalytics = (productList: string) => {
  pageViewAnalytics({
    pageName: SELF_SERVICE_PAGES.SELF_SERVICE_PAGE,
    events: 'event176',
    products: productList,
    eVar22: CUSTOMER,
    eVar49: SERVICEABLE,
    eVar33: SELF_SERVICE.VAS_ADD_ONS,
  })
}

export const pageLoadAnalytics = (eventData: PageLoadEventType) => {
  DTMClient.triggerEvent(eventData.eventData)
  InvocaClient.pageLoadEvent()
}

export const pageViewAnalytics = (eventData: EventDataType) => {
  DTMClient.triggerEvent(eventData)
}

export const triggerClickAnalytics = (
  eventData: EventDataType,
  ctaTag: string,
) => {
  DTMClient.triggerEvent(eventData, 'tl_o', ctaTag)
}

export const apiErrorModalAnalytics = (eventData: EventDataType) => {
  DTMClient.triggerEvent(eventData)
}

export const cartPageViewAnalytics = (
  pageName: string,
  productString: string,
  scViewValue = 'scView',
  sourcePage = '',
  feeString = '',
) => {
  // Sending Data to Analytics -
  pageViewAnalytics({
    pageName: pageName,
    events: scViewValue,
    eVar33: SELF_SERVICE.VAS_ADD_ONS,
    products: productString,
    ...(sourcePage === SELF_SERVICE.CHECKOUT && {
      prop72: `${SELF_SERVICE.VAS_SHIPPING_FEE}|${feeString}`,
    }),
  })
}
