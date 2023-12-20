import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'

export const apiErrorLogger = (error, apiName) => {
  let trackingString = `status-${error?.response?.status}:`
  trackingString += error?.response?.message
    ? JSON.stringify(error?.response?.message)
    : apiName + '-error-no-message-shown'
  DTMClient.triggerEvent({
    events: 'event88',
    eVar88: trackingString,
  })
}
