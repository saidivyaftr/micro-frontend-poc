export interface INotificationBannerProps
  extends React.HTMLAttributes<JSX.Element> {
  showBanner?: boolean
  notificationBannerText?: string
  buttonName?: string
  buttonLink?: string
}
