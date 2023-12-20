import { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Typography, ToggleButton } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import APIClient from 'src/api-client'
import { useActiveAccountId } from 'src/selector-hooks'
import { useDispatch, useSelector } from 'react-redux'
import { profileSlice } from 'src/redux/slicers'
import { useAppData } from 'src/hooks'
import { CategoryType } from './NotificationCategory'
import { AccountUpdatesEmailModal } from './AccountUpdatesEmailModal'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { selectNotificationSettings } from 'src/redux/slicers/profile'

export const NotificationToggle = ({
  title,
  value,
  settingType,
  type,
}: {
  title: string
  value: boolean
  settingType: 'email' | 'sms'
  type: CategoryType
}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const activeAccountId = useActiveAccountId()
  const notificationSettingsData = useAppData('notificationSettingsData', true)
  const { enrolled } = useSelector(selectNotificationSettings)

  const [isOn, setIsOn] = useState(value)
  const [state, setState] = useState<undefined | 'SAVING' | 'SAVED' | 'FAILED'>(
    undefined,
  )
  const [showModal, setShowModal] = useState(false)

  const onToggleChange = async (newValue: boolean) => {
    if (
      !showModal &&
      !newValue &&
      settingType === 'email' &&
      type === 'accountInformation'
    ) {
      setShowModal(true)
      return
    } else {
      setShowModal(false)
    }

    const serviceType =
      settingType === 'email' ? 'emailPreferences' : 'mobilePreferences'
    const shouldAlsoUpdateBillPreference =
      serviceType === 'emailPreferences' && type === 'accountInformation'
    const body = {
      [serviceType]: {
        [type]: newValue,
      },
    }
    if (shouldAlsoUpdateBillPreference) {
      body['emailPreferences']['billReadyNotification'] = newValue
    }

    try {
      setIsOn(newValue)
      setState('SAVING')
      if (enrolled) {
        await APIClient.updateNotification(activeAccountId!, body)
      } else {
        await APIClient.postNotificationSettings(activeAccountId!, body)
      }
      setState('SAVED')
      dispatch(
        profileSlice.actions.toggleNotificationSetting({
          key: `${serviceType}.${type}` as any,
          value: newValue,
        }),
      )
      if (shouldAlsoUpdateBillPreference) {
        dispatch(
          profileSlice.actions.toggleNotificationSetting({
            key: `emailPreferences.billReadyNotification` as any,
            value: newValue,
          }),
        )
      }
      dispatch(profileSlice.actions.toggleNotificationEnrolled(true))
      let category = 'notification settings'
      if (type === 'accountInformation') {
        category = 'billing and account updates'
      }
      if (type === 'marketingPromotions') {
        category = 'product releases'
      }
      const setting = `${newValue ? 'enabled' : 'disabled'} ${
        serviceType === 'emailPreferences' ? 'email' : 'sms'
      } toggle`
      DTMClient.triggerEvent(
        {
          events: 'event14',
          eVar14: `my profile:${category}:${setting}`,
        },
        'tl_o',
        `my profile:${category}:${setting}`,
      )
    } catch (error) {
      setState('FAILED')
      setIsOn(!newValue)
    }
    setTimeout(() => {
      setState(undefined)
    }, 5000)
  }

  const getMessage = () => {
    switch (state) {
      case 'SAVING':
        return notificationSettingsData?.updatingSettings?.value
      case 'SAVED':
        return notificationSettingsData?.settingsUpdated?.value
      case 'FAILED':
        return notificationSettingsData?.updateFailed?.value
      default:
        return ''
    }
  }

  return (
    <div>
      <div className={classes.toggleContainer}>
        <Typography>{title}</Typography>
        <div className={classes.toggleChangeContainer}>
          <Typography styleType="p4">{getMessage()}</Typography>
          <ToggleButton onClickToggle={onToggleChange} isChecked={isOn} />
        </div>
      </div>
      <AccountUpdatesEmailModal
        isOpen={showModal}
        handleClose={() => setShowModal(false)}
        handleSave={() => onToggleChange(false)}
      />
    </div>
  )
}

const useStyles = makeStyles(() => ({
  toggleContainer: {
    borderRadius: 16,
    backgroundColor: colors.main.newBackgroundGray,
    padding: 16,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleChangeContainer: {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
  },
}))
