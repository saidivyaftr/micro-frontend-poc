/* eslint-disable @typescript-eslint/indent */
// eslint-disable-next-line
// @ts-no

import {
  PageLoadEventType,
  EventDataType,
} from '@/shared-ui/hooks/usePageLoadEvents'
import { CUSTOMER } from 'src/constants'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import InvocaClient from 'src/utils/invoca'

export const handlePageViewAnalytics = (
  pageName: string,
  prop10Str: string,
) => {
  if (pageName !== '') {
    if (pageName === 'contact-verification/start') {
      pageViewAnalytics({
        pageName: pageName,
        prop10: prop10Str,
        eVar22: CUSTOMER,
      })
    } else {
      pageViewAnalytics({
        pageName: pageName,
        eVar22: CUSTOMER,
      })
    }
  }
}

export const handleSiteInteractionAnalytics = (
  eVar14Str: string,
  interactionStr: string,
) => {
  const preFix = 'contact-verification:'
  submitClickAnalytics(
    {
      events: 'event14',
      eVar14: `${preFix}${eVar14Str}`,
    },
    interactionStr,
  )
}

export const pageLoadAnalytics = (eventData: PageLoadEventType) => {
  DTMClient.triggerEvent(eventData.eventData)
  InvocaClient.pageLoadEvent()
}

export const pageViewAnalytics = (eventData: EventDataType) => {
  DTMClient.triggerEvent(eventData)
}

export const submitClickAnalytics = (
  eventData: EventDataType,
  ctaTag: string,
) => {
  DTMClient.triggerEvent(eventData, 'tl_o', ctaTag)
}

export const apiErrorModalAnalytics = (eventData: EventDataType) => {
  DTMClient.triggerEvent(eventData)
}
