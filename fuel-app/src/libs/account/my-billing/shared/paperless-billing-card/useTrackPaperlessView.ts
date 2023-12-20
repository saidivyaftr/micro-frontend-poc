import { useEffect, useState } from 'react'
import { INTERNET_OR_PHONE, RESIDENTIAL_CUSTOMER } from 'src/constants'
import { useActiveAccount, useSessionState } from 'src/selector-hooks'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'

type prevTriggeredStateType = 'MANAGE' | 'ENABLED' | 'DISABLED' | null

export const useTrackPaperlessView = (
  openModal: boolean,
  currentPreference: string,
  status: string,
) => {
  const { data: activeAccount } = useActiveAccount()
  const { data: sessionState } = useSessionState()
  const [prevTriggeredState, setPrevTriggeredState] =
    useState<prevTriggeredStateType>(null)

  useEffect(() => {
    if (openModal) {
      if (status === 'init' || status === 'success') {
        let pageName = 'ftr:account/manage paperless'
        let newTriggerState: prevTriggeredStateType = 'MANAGE'
        let events: any = undefined
        if (status === 'success') {
          pageName =
            currentPreference === 'active'
              ? 'ftr:account/paperless enabled'
              : 'ftr:account/paperless disabled'
          newTriggerState =
            currentPreference === 'active' ? 'ENABLED' : 'DISABLED'
          if (currentPreference !== 'active') {
            events = 'event18'
          }
        }

        if (newTriggerState === prevTriggeredState) {
          return
        }

        if (Boolean(activeAccount?.accountType)) {
          const trackingProps = {
            pageName,
            events,
            eVar21: sessionState?.fidUuid,
            eVar22: RESIDENTIAL_CUSTOMER,
            eVar51: activeAccount?.usi,
            eVar60: INTERNET_OR_PHONE,
            eVar66: activeAccount?.accountType,
            eVar100: activeAccount?.accountUID,
          }
          DTMClient.triggerEvent(trackingProps)
          setPrevTriggeredState(newTriggerState)
        }
      }
    } else {
      setPrevTriggeredState(null)
    }
  }, [openModal, activeAccount, status, currentPreference, prevTriggeredState])
}
