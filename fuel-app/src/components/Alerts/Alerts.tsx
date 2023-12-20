import { useState, useEffect } from 'react'
import { LOCAL_STORAGE_KEYS } from 'src/constants'
import { useAppData } from 'src/hooks'
import { Alert } from '@/shared-ui/components'
import { ITypographyStyleType } from '@/shared-ui/components/Typography'
import { ITypographyFontType } from '@/shared-ui/components/Typography/types'
let isAlertsParsed = false

interface AlertType {
  id: string
  message: string
  strongText: string
  isSuccess: boolean
  backgroundColor: string
  hideClose: boolean
  textColor: string
  closeIconColor: string
  textAlign: string
  messageStyleType: ITypographyStyleType
  messageFontType: ITypographyFontType
}

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const Alerts = () => {
  const alertsData = useAppData('AlertsList', true)
  const [alerts, setAlerts] = useState([])

  const parseAlerts = () => {
    try {
      const closedAlerts = JSON.parse(
        sessionStorage.getItem(LOCAL_STORAGE_KEYS.CLOSED_ALERTS) || '[]',
      )

      const alerts =
        alertsData?.list?.targetItems?.map(
          ({
            id,
            message,
            messageType,
            strongText,
            backgroundColor,
            hideCloseButton,
            textColor,
            closeIconColor,
            textAlign,
            messageTagStyleType,
            messageFontType,
          }: any) => ({
            id,
            message: message?.value,
            strongText: strongText?.value,
            isSuccess: messageType?.type?.type?.value === 'Success',
            backgroundColor: backgroundColor?.targetItem?.Color?.value,
            hideClose: hideCloseButton?.value,
            textColor: textColor?.targetItem?.Color?.value,
            closeIconColor: closeIconColor?.targetItem?.Color?.value,
            textAlign: textAlign?.targetItem?.value?.value,
            messageStyleType: messageTagStyleType?.targetItem?.value?.value,
            messageFontType: messageFontType?.targetItem?.type?.value,
          }),
        ) || []

      const filteredAlerts = alerts?.filter(
        ({ id }: any) => !closedAlerts?.find((alertId: any) => alertId === id),
      )

      setAlerts(filteredAlerts)
    } catch (error) {
      console.error('Error parsing alerts')
    }
  }

  const handleAlertClose = (id: string) => {
    const existingClosedAlerts = JSON.parse(
      sessionStorage.getItem(LOCAL_STORAGE_KEYS.CLOSED_ALERTS) || '[]',
    )
    existingClosedAlerts.push(id)
    sessionStorage.setItem(
      LOCAL_STORAGE_KEYS.CLOSED_ALERTS,
      JSON.stringify(existingClosedAlerts),
    )
    parseAlerts()
  }

  useEffect(() => {
    if (!isAlertsParsed && alertsData?.list) {
      parseAlerts()
      isAlertsParsed = true
    }
  }, [alertsData])

  return (
    <>
      {alerts?.map(
        ({
          id,
          message,
          strongText,
          isSuccess,
          backgroundColor,
          hideClose,
          textColor,
          closeIconColor,
          textAlign,
          messageStyleType,
          messageFontType,
        }: AlertType) => {
          return (
            <div key={id}>
              <Alert
                message={message}
                isSuccess={isSuccess}
                strongText={strongText}
                handleClose={() => handleAlertClose(id)}
                backgroundColor={backgroundColor}
                hideClose={hideClose}
                textColor={textColor}
                closeIconColor={closeIconColor}
                textAlign={textAlign}
                messageStyleType={messageStyleType}
                messageFontType={messageFontType}
              />
            </div>
          )
        },
      )}
    </>
  )
}

export default Alerts
