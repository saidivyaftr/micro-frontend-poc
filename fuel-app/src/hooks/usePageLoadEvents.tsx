import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import InvocaClient from 'src/utils/invoca'
import { useCidParameter } from 'src/hooks'

export type EventDataType = {
  pageName?: string
  pageUrl?: string
  pageType?: string
  events?: string
  products?: string
  eVar21?: string
  eVar22?: string
  eVar49?: string
  eVar14?: string
  eVar50?: string
  eVar52?: string
  eVar60?: string
  eVar69?: string
  eVar2?: string
  eVar76?: string
  eVar66?: string
  eVar68?: string
  eVar98?: string
  eVar100?: string
  eVar33?: string
  eVar43?: string
  prop31?: string
  prop10?: string
  contextData?: {
    campaign?: string[]
  }
  buyflow?: string
}

export type PageLoadEventType = {
  shouldTriggerDTMEvent?: boolean
  shouldInvokeDTMPageLoadEvent?: boolean
  shouldTriggerInvoca?: boolean
  eventData?: EventDataType
}

const usePageLoadEvents = (data: PageLoadEventType) => {
  const cid = useCidParameter()
  if (cid) {
    const cidData = {
      contextData: {
        campaign: cid,
      },
    }
    Object.assign(data, { eventData: cidData })
  }
  const shouldTriggerDTMEvent = data?.shouldTriggerDTMEvent || false
  const shouldInvokeDTMPageLoadEvent =
    data?.shouldInvokeDTMPageLoadEvent || true
  const shouldTriggerInvoca = data?.shouldTriggerInvoca || false
  const hasDTMLLoaded = useSelector(
    (state: any) => state?.appConfig?.configs?.['DTM'],
  )
  const hasINVOCALoaded = useSelector(
    (state: any) => state?.appConfig?.configs?.['INVOCA'],
  )
  useEffect(() => {
    if (hasDTMLLoaded && shouldTriggerDTMEvent) {
      DTMClient.triggerEvent(data?.eventData)
    }
  }, [hasDTMLLoaded, shouldTriggerDTMEvent])

  useEffect(() => {
    if (hasDTMLLoaded && shouldInvokeDTMPageLoadEvent) {
      DTMClient.pageLoadEvent()
    }
  }, [hasDTMLLoaded, shouldInvokeDTMPageLoadEvent])

  useEffect(() => {
    if (hasINVOCALoaded && shouldTriggerInvoca) {
      InvocaClient.pageLoadEvent()
    }
  }, [hasINVOCALoaded])
}

export default usePageLoadEvents
