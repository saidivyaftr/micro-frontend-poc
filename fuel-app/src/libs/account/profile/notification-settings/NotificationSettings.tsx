import { InjectHTML, Skeleton } from '@/shared-ui/components'
import { useActiveAccountId } from 'src/selector-hooks'
import { NotificationCategory } from './NotificationCategory'
import { useAppData } from 'src/hooks'
import { useSelector } from 'react-redux'
import { selectNotificationSettings } from 'src/redux/slicers/profile'
import ErrorMessage from '../../shared/ErrorMessage'

export const NotificationSettings = () => {
  const activeAccountId = useActiveAccountId()
  const { isLoading, errorFetching, emailPreferences, mobilePreferences } =
    useSelector(selectNotificationSettings)
  const errorMessages = useAppData('errorMessages', true)
  const notificationSettingsData = useAppData('notificationSettingsData', true)

  if (!activeAccountId || isLoading) {
    return <NotificationSettingsSkeleton />
  }

  if (errorFetching) {
    return <ErrorMessage message={errorMessages?.fetchFailed?.value} />
  }

  return (
    <div>
      <NotificationCategory
        title={notificationSettingsData?.essentialAlerts?.value}
        description={
          notificationSettingsData?.essentialAlertsDescription?.value
        }
        type="serviceUpdates"
        email={!!emailPreferences?.serviceUpdates}
        sms={!!mobilePreferences?.serviceUpdates}
      />
      <NotificationCategory
        title={notificationSettingsData?.accountNotices?.value}
        description={notificationSettingsData?.accountNoticesDescription?.value}
        type="accountInformation"
        email={
          !!emailPreferences?.accountInformation &&
          !!emailPreferences?.billReadyNotification
        }
        sms={!!mobilePreferences?.accountInformation}
      />
      <NotificationCategory
        title={notificationSettingsData?.productUpdates?.value}
        description={notificationSettingsData?.productUpdatesDescription?.value}
        type="marketingPromotions"
        email={!!emailPreferences?.marketingPromotions}
        sms={!!mobilePreferences?.marketingPromotions}
      />
      <div>
        <InjectHTML
          styleType="legal"
          addAnchorStyles
          value={notificationSettingsData?.cardLegal?.value}
        />
      </div>
    </div>
  )
}

const NotificationSettingsSkeleton = () => {
  return (
    <div>
      <Skeleton width={'90%'} height={60} />
      <Skeleton width={'90%'} height={60} />
      <Skeleton width={'90%'} height={60} />
    </div>
  )
}
