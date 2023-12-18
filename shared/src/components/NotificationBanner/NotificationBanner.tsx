import React from 'react'
import { Button, InjectHTML } from '@/shared-ui/components'
import css from './NotificationBanner.module.scss'
import { INotificationBannerProps } from './types'

const NotificationBanner: React.FC<INotificationBannerProps> = ({
  showBanner = false,
  notificationBannerText = '',
  buttonName = '',
  buttonLink = '',
}) => {
  const isBannerPresent = showBanner && notificationBannerText.length > 0
  return isBannerPresent ? (
    <div className={css.headerBanner}>
      <InjectHTML
        enableClick={true}
        tagType="p"
        styleType="p3"
        fontType="boldFont"
        testId="test-banner-content"
        className={css.bannerText}
        value={notificationBannerText}
      />
      {buttonName && buttonLink && (
        <Button
          className={css.planBtn}
          type="link"
          text={buttonName}
          href={buttonLink}
          variant="secondary"
        />
      )}
    </div>
  ) : null
}

export default NotificationBanner
