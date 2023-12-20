// declared typescript nocheck to get around accordionClickHandler and yttvCtaClickHandler and yttvErrorsHandler and yttvPageLoadHandler
// eslint-disable-next-line
// @ts-no

import { EventDataType } from '@/shared-ui/hooks/usePageLoadEvents'
import { FAQ_EXPAND, SITE_INTERACTION, SITE_ERROR } from 'src/constants'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import InvocaClient from 'src/utils/invoca'

export const accordionClickHandler = (isExpanded: boolean, title: any) => {
  if (!isExpanded) return
  const description = FAQ_EXPAND.replace(
    '{TITLE}',
    `tv-faq:${title.toLowerCase()}`,
  )
  DTMClient.triggerEvent(
    { events: 'event14', eVar14: description },
    'tl_o',
    SITE_INTERACTION,
  )
}

export const yttvCtaClickHandler = (
  pageName: string,
  component: string,
  ctaName: string,
) => {
  DTMClient.triggerEvent(
    {
      events: 'event14',
      eVar14: `${pageName}:${component}:${ctaName}`,
    },
    'tl_o',
    'site interaction',
  )
}

export const yttvErrorsHandler = (errorMsg: string, pageName: string) => {
  DTMClient.triggerEvent(
    {
      pageName: pageName,
      events: 'event88',
      eVar2: pageName,
      eVar88: errorMsg,
    },
    'tl_o',
    SITE_ERROR,
  )
}

export const yttvPageLoadAnalytics = (eventData: EventDataType) => {
  DTMClient.triggerEvent(eventData)
  InvocaClient.pageLoadEvent()
}
